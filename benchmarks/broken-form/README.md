# Broken Form Benchmark

## Initial Broken State
This benchmark focuses on form layouts that use rigid dimensions which fail gracefully.
- **Multi-column form:** A grid layout that forces 2 columns regardless of viewport.
- **Fixed-width inputs:** Input fields with `width: 400px`.
- **Long labels:** Labels that are long and don't wrap correctly.
- **Buttons that wrap incorrectly:** A button group using flexbox without wrap or gap, causing buttons to squish or overflow.

## Responsive Contract
*   **Minimum Viewport:** 320px
*   **Mobile (< 768px):** Form fields should stack in a single column. Inputs should take up 100% of their container (or use `max-width: 100%`). Button groups should stack or wrap.
*   **Tablet/Desktop (> 768px):** Multi-column layout is acceptable.
*   **Universal:** Form inputs must remain accessible and not overlap. Labels must be readable.

## Expected Failures
- Horizontal overflow caused by `width: 400px`.
- Two-column grid forces content off-screen on mobile.
- Button group overflow.

## Expected Repairs
- Change fixed input widths to `width: 100%` or use `max-width: 100%`.
- Use CSS Grid `minmax()` or flex-wrap to allow the 2-column layout to collapse into 1 column.
- Update button group to use `flex-wrap: wrap`.

## Verification Criteria
- [ ] No page-level horizontal scroll at 320px.
- [ ] Inputs do not overflow their parent containers.
- [ ] Form displays as a single column on 320px screens.
- [ ] Buttons are fully visible.

## Responsive Engineer Verification Report

### What was broken
- `.form-container` had a rigid `min-width: 800px`.
- `.form-grid` utilized a rigid `grid-template-columns: 1fr 1fr;`.
- Inputs had a fixed `width: 400px`.
- `.button-group` forced `flex-wrap: nowrap`.
- Missing universal `box-sizing: border-box`.

### How Responsive Engineer identified it
Playwright detected significant page overflow, with the `body` width expanding well beyond the 320px boundary, caused by multiple fixed-pixel constraints nested within the form.

### What changes it made
- Added `box-sizing: border-box` to prevent padding from expanding containers past 100%.
- Converted container min-width to `width: 100%; max-width: 800px;`.
- Converted grid to `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`.
- Set inputs to `width: 100%; max-width: 400px;`.
- Allowed labels to wrap.
- Switched button group to `flex-wrap: wrap;`.

### Why those changes were chosen
Applying CSS intrinsic sizing (`minmax()`) and fluid boundaries (`max-width`) allows the form to seamlessly collapse from 2 columns to 1 column and shrink inputs dynamically based on the exact viewport size, adhering to the Repair Hierarchy.

### How the fixes were verified
Automated Playwright tests confirmed the document `body` perfectly matched the 320px viewport width, indicating all form fields and grid columns successfully collapsed or wrapped.
