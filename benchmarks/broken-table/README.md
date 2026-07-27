# Broken Table Benchmark

## Initial Broken State
This benchmark evaluates how well an agent can distinguish between intentional local overflow (scrolling a table) and unintentional page-level overflow.
- **Wide columns:** Fixed min-widths on headers.
- **Long values:** Table cells with UUIDs or email addresses that cannot break.
- **No overflow strategy:** The table lacks an `overflow-x: auto` wrapper.
- **Small viewport failure:** Forces the entire page to scroll horizontally at 320px.

## Responsive Contract
*   **Minimum Viewport:** 320px
*   **Mobile (< 768px):** The table should be scrollable horizontally within its own container. The page itself should not scroll horizontally.
*   **Tablet/Desktop (> 768px):** The table may be fully visible if space permits, otherwise it scrolls.
*   **Universal:** Data must remain readable. Do not set `font-size: 8px` to force it to fit. No page-level overflow.

## Expected Failures
- The `body` element expands to the width of the table.
- Horizontal scrollbar appears at the bottom of the browser window.

## Expected Repairs
- Create a structural fix by wrapping the `table` in a `div` (or utilizing an existing parent) and applying `overflow-x: auto`.
- Ensure `border-collapse`, spacing, and cell wrapping rules do not compromise table legibility.

## Verification Criteria
- [ ] No page-level horizontal scroll at 320px.
- [ ] Table can be scrolled horizontally via touch/mouse wheel.
- [ ] Table text is legible (font size not drastically reduced).

## Responsive Engineer Verification Report

### What was broken
- The `log-table` had long unbroken strings and rigid structure, forcing the entire `.container` and `body` to exceed the 320px viewport width.

### How Responsive Engineer identified it
Playwright automation highlighted that the `table` bounds were extending up to 1773px, pulling the `body` width along with it.

### What changes it made
- Wrapped the `.log-table` element in a new `<div class="table-wrapper">` inside the HTML.
- Styled `.table-wrapper` with `width: 100%; overflow-x: auto;`.

### Why those changes were chosen
This is the standard structural pattern for complex data tables. It isolates the table's rigid grid inside a scrollable localized viewport, preventing the document-level horizontal scrollbar while keeping the table data fully intact and readable.

### How the fixes were verified
Tests confirmed that at a 320px screen width, the `body` width stayed at 320px. The `.table-wrapper` calculated to a 240px client width, while the inner `.log-table` expanded to 1773px, verifying independent horizontal scroll capability.
