# Broken Navigation Benchmark

## Initial Broken State
This benchmark tests an implementation of a header and navigation that fails on smaller screens.
- **Navigation collision:** The flex container does not wrap or collapse, causing long menu labels to collide or overflow the page.
- **Long menu labels:** Links with lengthy text force the container to expand past the viewport.
- **Mobile overflow:** At 320px, the header is far too wide.
- **Dropdown extending beyond viewport:** A dropdown menu positioned absolutely is cut off on the right edge of small screens.

## Responsive Contract
*   **Minimum Viewport:** 320px
*   **Mobile (< 768px):** The navigation should transition to a mobile-friendly pattern (e.g., a hamburger menu or vertically stacked links if no JS is used). Dropdowns should not overflow horizontally.
*   **Tablet/Desktop (> 768px):** Inline horizontal navigation.
*   **Universal:** No page-level horizontal overflow. All links accessible. Dropdowns must remain within the viewport bounds.

## Expected Failures
- Horizontal scroll appears at viewports below 800px.
- Dropdown menu clipped at smaller widths or positioned off-screen.

## Expected Repairs
- Add a media query to stack navigation links vertically below the breakpoint, or introduce a hamburger menu (simulated with CSS or wrapping).
- Remove rigid widths preventing flex shrinking.
- Adjust dropdown positioning (e.g., `right: 0` instead of `left: 0`, or make it full width on mobile) to ensure it stays within bounds.

## Verification Criteria
- [ ] No page-level horizontal scroll at 320px.
- [ ] Navigation links are fully readable and do not overlap at 320px.
- [ ] Dropdown content is fully visible on a 320px screen when open.

## Responsive Engineer Verification Report

### What was broken
- The `navbar` used `flex-wrap: nowrap`, preventing links from wrapping and causing horizontal overflow.
- The `dropdown-content` was positioned `left: 0`, making it render off-screen to the right on narrow viewports.

### How Responsive Engineer identified it
Using Playwright, the agent detected page-level horizontal overflow at 320px viewport width, indicating rigid constraints in the header.

### What changes it made
- Applied `flex-wrap: wrap;` to `.navbar` and `.nav-links`.
- Changed `.dropdown-content` absolute positioning to `right: 0;`.

### Why those changes were chosen
By utilizing `flex-wrap`, the layout natively adjusts to any viewport without needing media query breakpoints. By aligning the dropdown to the right, we guarantee it grows inward toward the page center rather than bleeding off the right edge.

### How the fixes were verified
Automated tests confirmed the `body` bounding client width matched the 320px viewport, indicating no page-level overflow. The UI reflowed cleanly.
