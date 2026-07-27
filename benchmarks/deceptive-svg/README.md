# SVG Intrinsic Deception Benchmark

## Initial Broken State
An SVG illustration is placed directly inside a main content column. The SVG has hardcoded `<svg width="800" height="600">`.
Because it's intrinsic, the SVG won't shrink on mobile, causing massive page overflow.

## Responsive Contract
*   The SVG should scale proportionally and not break the container.
*   The layout must not overflow the page on mobile.

## Expected Repairs
- Add `max-width: 100%; height: auto;` to the SVG. (Do NOT use `overflow: hidden` on the parent).
