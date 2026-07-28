const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Install pixelmatch and pngjs if missing for visual diffs
try {
    require.resolve('pixelmatch');
    require.resolve('pngjs');
} catch (e) {
    console.log('Installing pixelmatch and pngjs for visual diff triage...');
    execSync('npm install pixelmatch pngjs', { stdio: 'inherit' });
}
const pixelmatch = require('pixelmatch');
const PNG = require('pngjs').PNG;

const VIEWPORTS = {
    mobile: 320,
    threshold_pre: 767,
    threshold: 768,
    threshold_post: 769,
    tablet: 1024,
    desktop: 1440
};

async function checkGeometry(page, width, height = 800) {
    await page.setViewportSize({ width, height });
    // Wait for reflow
    await page.waitForTimeout(100);
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    return {
        width,
        bodyWidth,
        windowWidth,
        hasPageOverflow: bodyWidth > windowWidth
    };
}

async function runBenchmark(browser, name, url, options = {}) {
    console.log(`\n▶ Running Advanced Benchmark: ${name}`);
    const page = await browser.newPage();
    await page.goto('file://' + path.resolve(__dirname, url));

    const results = {
        name,
        viewports: {},
        intentionalOverflowMaintained: null,
        accessibility: null,
        interactionTransformation: null
    };

    let mobilePass = true;
    let regression = false;

    for (const [vpName, vpWidth] of Object.entries(VIEWPORTS)) {
        const geo = await checkGeometry(page, vpWidth);
        results.viewports[vpWidth] = geo;
        
        console.log(`  [${vpWidth}px]: Body ${geo.bodyWidth}px -> ${geo.hasPageOverflow ? 'FAIL' : 'PASS'}`);
        
        if (vpWidth <= 768 && geo.hasPageOverflow) mobilePass = false;
        // If desktop is suddenly broken, that's a regression
        if (vpWidth > 768 && geo.hasPageOverflow) regression = true;
    }

    if (options.checkInputFocus) {
        await page.setViewportSize({ width: 320, height: 480 });
        const focusResults = await page.evaluate(async () => {
            const input = document.querySelector('input');
            if (!input) return { error: "No input found" };
            
            // Focus the input
            input.focus();
            
            // Wait for any browser zoom/layout shift (simulated)
            await new Promise(r => setTimeout(r, 100));
            
            const bodyWidth = document.body.scrollWidth;
            const windowWidth = window.innerWidth;
            const rect = input.getBoundingClientRect();
            
            return {
                isZoomed: windowWidth < 320, // Naive heuristic for zoom
                hasOverflow: bodyWidth > windowWidth,
                inputWidth: rect.width,
                windowWidth: windowWidth
            };
        });
        
        results.focusState = focusResults;
        const focusPass = !focusResults.hasOverflow;
        console.log(`  Focus State Overflow: ${focusPass ? 'PASS' : 'FAIL'} (Input width: ${focusResults.inputWidth}px, Overflow: ${focusResults.hasOverflow})`);
        
        if (!focusPass) mobilePass = false;
    }

    if (options.checkIntentionalOverflow) {
        const { selector } = options.checkIntentionalOverflow;
        const overflowStatus = await page.evaluate((sel) => {
            const el = document.querySelector(sel);
            if (!el) return false;
            return el.scrollWidth > el.clientWidth;
        }, selector);
        results.intentionalOverflowMaintained = overflowStatus;
        console.log(`  Intentional Overflow on ${selector}: ${overflowStatus ? 'PRESERVED' : 'BROKEN'}`);
    }

    // Capture Desktop Baseline Screenshot
    await page.setViewportSize({ width: 1440, height: 800 });
    const screenshotPath = path.resolve(__dirname, `screenshots/${name.replace(/\s+/g, '_')}_baseline.png`);
    if (!fs.existsSync(path.dirname(screenshotPath))) fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    await page.screenshot({ path: screenshotPath });
    console.log(`  Visual Baseline Captured: ${path.basename(screenshotPath)}`);

    // Accessibility check (Touch Targets & Visibility)
    await page.setViewportSize({ width: 320, height: 480 });
    const a11yPass = await page.evaluate(() => {
        const interactables = document.querySelectorAll('button, a, input, select');
        for (let el of interactables) {
            // Check computed style
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
            
            // Check ancestor visibility
            let parent = el.parentElement;
            let isHidden = false;
            while(parent) {
                const pStyle = window.getComputedStyle(parent);
                if (pStyle.display === 'none') {
                    isHidden = true;
                    break;
                }
                parent = parent.parentElement;
            }
            if (isHidden) continue;

            const rect = el.getBoundingClientRect();
            // Skip off-canvas
            if (rect.right < 0 || rect.bottom < 0 || rect.left > window.innerWidth) continue;
            if (rect.width === 0 || rect.height === 0) continue;

            // Mobile touch target size check
            if (window.innerWidth <= 768) {
                if (rect.width < 44 || rect.height < 44) {
                    if (style.display === 'inline') continue; // Inline text links are exempted
                    return false;
                }
            }
        }
        return true;
    });
    results.accessibility = a11yPass;
    console.log(`  Accessibility (Touch Targets): ${a11yPass ? 'PASS' : 'FAIL'}`);

    if (options.checkInteractionTransformation) {
        // Evaluate Desktop Behavior
        await page.setViewportSize({ width: 1024, height: 800 });
        const desktopPass = await page.evaluate(() => {
            const nav = document.querySelector('.nav-links');
            if (!nav) return false;
            const style = window.getComputedStyle(nav);
            // On desktop, the navigation should be fully visible, not hidden behind a hamburger
            return style.display !== 'none' && style.visibility !== 'hidden';
        });

        // Evaluate Mobile Behavior & Accessibility
        await page.setViewportSize({ width: 390, height: 844 });
        
        const mobileResults = await page.evaluate(() => {
            const nav = document.querySelector('.nav-links');
            const hamburger = document.querySelector('button[aria-expanded], button[aria-controls], .hamburger, button.menu-toggle');
            
            if (!hamburger) return { error: "No semantic hamburger button found" };
            
            const btnTag = hamburger.tagName.toLowerCase() === 'button';
            const hasAria = hamburger.hasAttribute('aria-expanded');
            const hasAccessibleName = hamburger.hasAttribute('aria-label') || hamburger.innerText.trim().length > 0;
            
            const navStyle = window.getComputedStyle(nav);
            // On mobile, the navigation should be hidden initially (or placed in a drawer)
            const isInitiallyHidden = navStyle.display === 'none' || navStyle.visibility === 'hidden' || navStyle.opacity === '0' || nav.getBoundingClientRect().width === 0;
            
            return {
                hasHamburger: !!hamburger,
                isButton: btnTag,
                hasAria: hasAria,
                hasAccessibleName: hasAccessibleName,
                isInitiallyHidden: isInitiallyHidden
            };
        });

        const interactionPass = desktopPass && mobileResults.hasHamburger && mobileResults.isButton && mobileResults.hasAria && mobileResults.isInitiallyHidden;
        results.interactionTransformation = interactionPass;
        console.log(`  Interaction Transformation: ${interactionPass ? 'PASS' : 'FAIL'} (Desktop visible: ${desktopPass}, Mobile btn: ${mobileResults.hasHamburger}, Semantic: ${mobileResults.isButton}, Aria: ${mobileResults.hasAria})`);
    }

    if (options.checkNoTransformation) {
        // Evaluate Mobile Behavior
        await page.setViewportSize({ width: 320, height: 480 });
        
        const mobileResults = await page.evaluate(() => {
            const nav = document.querySelector('.nav-links');
            const hamburger = document.querySelector('button[aria-expanded], button[aria-controls], .hamburger, button.menu-toggle');
            
            const navStyle = window.getComputedStyle(nav);
            // On mobile, the navigation should be visible and not hidden
            const isVisible = navStyle.display !== 'none' && navStyle.visibility !== 'hidden' && navStyle.opacity !== '0' && nav.getBoundingClientRect().width > 0;
            
            let hasHamburgerVisible = false;
            if (hamburger) {
                const btnStyle = window.getComputedStyle(hamburger);
                hasHamburgerVisible = btnStyle.display !== 'none' && btnStyle.visibility !== 'hidden' && btnStyle.opacity !== '0';
            }
            
            return {
                hasHamburgerVisible: hasHamburgerVisible,
                isVisible: isVisible
            };
        });

        const noTransformationPass = !mobileResults.hasHamburgerVisible && mobileResults.isVisible;
        results.interactionTransformation = noTransformationPass;
        console.log(`  No Interaction Transformation: ${noTransformationPass ? 'PASS' : 'FAIL'} (Mobile btn visible: ${mobileResults.hasHamburgerVisible}, Nav visible: ${mobileResults.isVisible})`);
    }

    await page.close();

    // Calculate score
    let score = 0;
    // Assuming root cause/correctness is manually graded, we calculate the automated parts:
    // Mobile Responsiveness (15)
    if (mobilePass) score += 15;
    // Desktop Regression Avoidance (15)
    if (!regression) score += 15;
    // Intentional Overflow (10)
    if (options.checkIntentionalOverflow) {
        if (results.intentionalOverflowMaintained) score += 10;
    } else {
        score += 10; // Free points if N/A
    }
    // Accessibility (10)
    if (results.accessibility) score += 10;
    
    // Interaction Transformation (15 - simulated grading impact)
    if (options.checkInteractionTransformation || options.checkNoTransformation) {
        if (results.interactionTransformation) score += 15;
    }

    console.log(`  Automated Score: ${score}/50`);
    return { results, score, mobilePass, regression };
}

(async () => {
    const browser = await chromium.launch();
    
    // We will test the existing repaired benchmarks
    await runBenchmark(browser, 'Navigation', 'broken-navigation/index.html');
    await runBenchmark(browser, 'Table', 'broken-table/index.html', { checkIntentionalOverflow: { selector: '.table-wrapper' } });
    await runBenchmark(browser, 'Form', 'broken-form/index.html');
    await runBenchmark(browser, 'Modal', 'broken-modal/index.html');

    // New benchmarks
    await runBenchmark(browser, 'Negative Test', 'negative-tests/index.html', { checkIntentionalOverflow: { selector: '.carousel-wrapper' } });
    await runBenchmark(browser, 'Deceptive Overflow', 'deceptive-overflow/index.html');
    await runBenchmark(browser, 'Dynamic Content', 'dynamic-content/index.html');
    await runBenchmark(browser, 'Accessibility Nav', 'accessibility-nav/index.html');
    await runBenchmark(browser, 'Deceptive SVG', 'deceptive-svg/index.html');
    await runBenchmark(browser, 'Iframe Containment', 'iframe-containment/index.html');
    await runBenchmark(browser, 'Cross Component (P1)', 'cross-component/page1.html');
    await runBenchmark(browser, 'Cross Component (P2)', 'cross-component/page2.html');
    await runBenchmark(browser, 'Responsive Nav Transformation', 'responsive-navigation-transformation/index.html', { checkInteractionTransformation: true });
    await runBenchmark(browser, 'Responsive Nav No Transformation', 'responsive-navigation-no-transformation/index.html', { checkNoTransformation: true });
    
    // Content Composition Benchmarks
    await runBenchmark(browser, 'Over-Padded Card', 'responsive-content-composition/01-over-padded-card.html');
    await runBenchmark(browser, 'Nested Container Padding Explosion', 'responsive-content-composition/02-nested-container-padding.html');
    await runBenchmark(browser, 'Long Action + Social Icons', 'responsive-content-composition/03-long-action-social.html');
    await runBenchmark(browser, 'Long Button Label', 'responsive-content-composition/04-long-button-label.html');
    await runBenchmark(browser, 'Dense Action Toolbar', 'responsive-content-composition/05-dense-action-toolbar.html');
    await runBenchmark(browser, 'Card Content Hierarchy', 'responsive-content-composition/06-card-content-hierarchy.html');
    await runBenchmark(browser, 'Mobile Content Prioritization', 'responsive-content-composition/07-mobile-content-prioritization.html');
    await runBenchmark(browser, 'Long Heading and Metadata', 'responsive-content-composition/08-long-heading-metadata.html');
    await runBenchmark(browser, 'Multiple Horizontal Actions', 'responsive-content-composition/09-multiple-horizontal-actions.html');
    await runBenchmark(browser, 'No-Change Composition', 'responsive-content-composition/10-no-change-composition.html');

    // Spatial Recomposition Benchmarks
    await runBenchmark(browser, 'Broken Two Column Hero', 'responsive-spatial-recomposition/01-broken-two-column-hero.html');
    await runBenchmark(browser, 'Broken Sidebar Layout', 'responsive-spatial-recomposition/02-broken-sidebar-layout.html');
    await runBenchmark(browser, 'Broken Card Grid', 'responsive-spatial-recomposition/03-broken-card-grid.html');
    await runBenchmark(browser, 'Hero Priority Reordering', 'responsive-spatial-recomposition/04-hero-priority-reordering.html');
    await runBenchmark(browser, 'Nested Grid Collapse', 'responsive-spatial-recomposition/05-nested-grid-collapse.html');
    await runBenchmark(browser, 'Fixed Sidebar', 'responsive-spatial-recomposition/06-fixed-sidebar.html');
    await runBenchmark(browser, 'Mobile Input Auto-Zoom', 'responsive-spatial-recomposition/07-mobile-input-auto-zoom.html', { checkInputFocus: true });
    await runBenchmark(browser, 'Input Overflow', 'responsive-spatial-recomposition/08-input-overflow.html', { checkInputFocus: true });
    await runBenchmark(browser, 'Input Button Group', 'responsive-spatial-recomposition/09-input-button-group.html', { checkInputFocus: true });
    await runBenchmark(browser, 'Hero Card Action Cluster', 'responsive-spatial-recomposition/10-hero-card-action-cluster.html');

    await browser.close();
})();
