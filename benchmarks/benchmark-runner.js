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
        accessibility: null
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
    
    await browser.close();
})();
