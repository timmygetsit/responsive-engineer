const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('file:///Users/newuser/Programming/responsiveness-skill/benchmarks/broken-dashboard/index.html');
    
    // Get widths of all major elements
    const elements = await page.evaluate(() => {
        const result = {};
        const tags = ['body', '.header', '.layout-wrapper', '.sidebar', '.main-content', '.card-grid', '.table-section', '.table-wrapper', '.data-table'];
        tags.forEach(tag => {
            const el = document.querySelector(tag);
            if (el) {
                result[tag] = el.getBoundingClientRect().width;
            } else {
                result[tag] = 'Not found';
            }
        });
        // check grid columns
        const grid = document.querySelector('.card-grid');
        if (grid) {
            result['grid-computed-cols'] = window.getComputedStyle(grid).gridTemplateColumns;
        }
        return result;
    });
    
    console.log(elements);
    await browser.close();
})();
