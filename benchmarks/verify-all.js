const { chromium } = require('playwright');
const path = require('path');

async function checkPage(benchmark, url) {
    console.log(`\n--- Checking ${benchmark} ---`);
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 320, height: 480 });
    await page.goto('file://' + path.resolve(__dirname, url));
    
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    console.log(`${benchmark} Body Width: ${bodyWidth}px (Viewport: ${windowWidth}px) -> ${bodyWidth <= windowWidth ? 'PASS' : 'FAIL'}`);

    if (benchmark === 'table') {
        const tableWidth = await page.evaluate(() => document.querySelector('.log-table').scrollWidth);
        const wrapperWidth = await page.evaluate(() => document.querySelector('.table-wrapper').clientWidth);
        console.log(`Table Width: ${tableWidth}px, Wrapper Width: ${wrapperWidth}px -> ${tableWidth > wrapperWidth ? 'PASS (Scrolls)' : 'FAIL'}`);
    }

    if (benchmark === 'modal') {
        const modalHeight = await page.evaluate(() => document.querySelector('.modal').scrollHeight);
        const windowHeight = await page.evaluate(() => window.innerHeight);
        console.log(`Modal Height: ${modalHeight}px (Viewport: ${windowHeight}px) -> ${modalHeight <= windowHeight ? 'PASS' : 'FAIL'}`);
    }

    await browser.close();
}

(async () => {
    await checkPage('navigation', 'broken-navigation/index.html');
    await checkPage('table', 'broken-table/index.html');
    await checkPage('form', 'broken-form/index.html');
    await checkPage('modal', 'broken-modal/index.html');
})();
