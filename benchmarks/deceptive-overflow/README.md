# Deceptive Overflow Benchmark

## Initial Broken State
This benchmark features a seemingly simple flexbox layout (a sidebar and a main content area). 
However, the main content area contains a long URL.
Because flex items have an implicit `min-width: auto`, the long URL forces the main content area to expand, blowing out the entire page width, even though `flex: 1` and `overflow-wrap: break-word` are set.

## Responsive Contract
*   The layout must not overflow the page.
*   The long URL must wrap within the main content area.

## Expected Repairs
- The agent must recognize the root cause is `min-width: auto` on the flex child.
- Fix: Apply `min-width: 0` (or `overflow: hidden`) to the flex child (`.main-content`), allowing `overflow-wrap` to take effect.
