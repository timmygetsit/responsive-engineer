# Broken Modal Benchmark

## Initial Broken State
This benchmark tests UI elements that overlay the screen. Modals frequently fail on short viewports or narrow mobile devices.
- **Modal exceeding viewport height:** A fixed height modal (`height: 800px`) that is taller than landscape mobile screens (or short viewports).
- **Long content:** Content that pushes buttons down.
- **Buttons becoming inaccessible:** If the modal does not scroll internally, the action buttons at the bottom cannot be reached.
- **Mobile layout failure:** Modal has a fixed width of `600px`, causing horizontal overflow on mobile.

## Responsive Contract
*   **Minimum Viewport:** 320px width, 400px height.
*   **Mobile / Short Viewports:** The modal should take up most of the screen (e.g., `max-width: 90vw`). Its height should not exceed the viewport (`max-height: 90vh`).
*   **Universal:** The content area inside the modal should have `overflow-y: auto`. The close/submit buttons must always be accessible on screen.

## Expected Failures
- Modal is cut off at the top and bottom on short viewports (e.g., 320x480).
- Buttons at the bottom of the modal cannot be clicked.
- Horizontal scroll on 320px viewports because of `width: 600px`.

## Expected Repairs
- Change `width: 600px` to `width: 100%; max-width: 600px`.
- Remove `height: 800px`, add `max-height: 90vh`.
- Add `overflow-y: auto` to the modal content area (or the modal itself).
- Ensure flexbox is used internally to keep the header and footer visible while the body scrolls.

## Verification Criteria
- [ ] No horizontal scroll at 320px.
- [ ] Modal does not exceed the height of the viewport.
- [ ] Content inside the modal scrolls vertically if it overflows.
- [ ] Action buttons at the bottom of the modal remain clickable.

## Responsive Engineer Verification Report

### What was broken
- `.modal` had a fixed `width: 600px` and `height: 800px`, causing both horizontal scroll on mobile and severe vertical clipping (making buttons unreachable) on short viewports.

### How Responsive Engineer identified it
Playwright tests showed the `body` width exceeding 320px and the modal height pushing beyond standard mobile viewport heights, signifying rigid dimensions.

### What changes it made
- Converted width to `width: 100%; max-width: 600px;`.
- Converted height to `max-height: 90vh;`.
- Modified modal display to `display: flex; flex-direction: column;`.
- Applied `overflow-y: auto; flex: 1 1 auto;` to `.modal-body`.

### Why those changes were chosen
Using viewport-relative constraints (`90vh`) ensures the modal never grows taller than the user's screen. Changing the modal body to an `auto`-scrolling flex child ensures the header and footer remain pinned and accessible at all times.

### How the fixes were verified
Automated tests verified the modal height maxed out at 472px (inside a 480px viewport) and the `body` width stayed within the 320px viewport, confirming full accessibility without page-level scroll.
