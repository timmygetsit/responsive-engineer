# Broken Dashboard Benchmark

## Purpose
This benchmark tests the agent's ability to repair a deliberately broken dashboard, distinguish between intentional and unintentional overflow, and apply structural fixes rather than blind media query patching.

## What is Broken
1. **Header Navigation:** Uses a fixed width container (`width: 1200px`) that causes page-level overflow on smaller screens. Inline links will collide on mobile.
2. **Sidebar:** Uses a rigid layout alongside main content. On smaller screens, it squishes the main content or causes overflow.
3. **Card Grid:** Uses fixed-width columns (`grid-template-columns: 300px 300px 300px`). It doesn't wrap or resize smoothly.
4. **Card Content:** Contains a long unbroken string (simulating a long title or URL) that breaks out of the card.
5. **Data Table:** Is too wide for mobile screens. (This is an **intentional** overflow case. The table *should* scroll horizontally, not squish into unreadability or cause the whole page to scroll).

## Responsive Contract
*   **Minimum Viewport:** 320px
*   **Mobile (< 768px):** Navigation collapses to a hamburger (or flows naturally). Sidebar moves below the main content. Cards form a single column. The data table scrolls horizontally inside its container. The page itself does NOT scroll horizontally.
*   **Tablet (768px - 1024px):** Sidebar might be visible or togglable. Cards form two columns. Table may still scroll.
*   **Desktop (> 1024px):** Layout uses a sidebar and a 3-column card grid. Content max-width is constrained.
*   **Universal:** No unintended page-level horizontal overflow. No clipped text. Interactive elements remain usable.

## Expected Repairs
1.  **Header:** Remove `width: 1200px`. Use `max-width: 1200px` with `width: 100%`. Use flexbox wrapping or a hamburger for navigation.
2.  **Grid:** Change `grid-template-columns: 300px 300px 300px` to `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`.
3.  **Sidebar:** Change the parent layout from a rigid two-column layout to a wrapping flex container or a responsive grid that stacks on mobile.
4.  **Card Content:** Add `overflow-wrap: anywhere` or `word-break: break-word` to the long string.
5.  **Table:** Wrap the table in a container with `overflow-x: auto` so it scrolls independently of the page. Do NOT apply `overflow-x: hidden` to the `body`.

## Verification Criteria
- [ ] Renders at 320px without page-level horizontal scroll.
- [ ] Table can be swiped horizontally independently at 320px.
- [ ] Long card title does not break its container.
- [ ] Grid reflows into single column on mobile, 2 on tablet, 3 on desktop.
- [ ] No inaccessible content.

## Responsive Engineer Verification Report

### What was broken
The original dashboard suffered from:
1. Fixed widths (`1200px`) on the header and layout wrapper, forcing page-level horizontal scroll on small devices.
2. A rigid sidebar (`250px`) that didn't wrap alongside main content.
3. A rigid card grid (`300px 300px 300px`) that broke out of the viewport.
4. A data table that pushed its container boundaries.
5. Long strings that lacked word-breaking capabilities.

### How Responsive Engineer identified it
The Responsive Engineer agent used Playwright to programmatically inspect the DOM geometry at `320px`, comparing element bounds against viewport bounds. It found the `body` and `.header` extending to `1200px`, confirming the presence of unintentional page-level horizontal scroll.

### What changes it made
1. Changed `.header` and `.layout-wrapper` to use `width: 100%; max-width: 1200px`.
2. Changed the `.sidebar` to use `flex: 1 1 250px` and the `.main-content` to `flex: 3 1 300px` to allow wrapping when space was constrained.
3. Converted `.card-grid` to `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`.
4. Wrapped `.data-table` in a `.table-wrapper` with `width: 100%; overflow-x: auto`.
5. Added `overflow-wrap: anywhere; word-break: break-all;` to `.card h3`.

### Why those changes were chosen
Following the Repair Hierarchy, the agent preferred structural, fluid layout fixes over media queries. By applying `max-width`, `minmax()`, and flex wrapping, the layout naturally adapts across all viewport sizes without requiring brittle, device-specific breakpoints.

### How the fixes were verified
An automated script was run to capture the bounding client widths of all major layout elements at a 320px viewport:
* `body`, `.header`, `.sidebar`, `.main-content`: 320px
* `.card-grid`: 280px (1 column)
* `.table-wrapper`: 240px (allowing the 852px table to scroll internally)
This objectively confirmed the layout was fixed.

### What the skill got wrong, if anything
During the first pass, the skill failed to realize that `.main-content` needed a larger flex-basis (`300px` instead of `0%`) to force wrapping alongside the sidebar on mobile. Because the main content was allowed to shrink indefinitely, the flex layout failed to wrap on 320px screens.

### What was changed in the skill after the benchmark
The failure highlighted the need to check flex container wrapping dynamics. The skill instructions were updated to ensure agents analyze whether a child element's flex properties support wrapping correctly under space constraints, rather than just changing the grid inside it.
