# Cross-Component Regression Benchmark

## Initial Broken State
A shared header component (`shared-header.css`) is used across `page1.html` and `page2.html`.
On `page1.html`, there is a large navigation list that blows out the container.
On `page2.html`, there is a small title that fits perfectly.

## Responsive Contract
*   The header must not blow out the page on mobile for `page1.html`.
*   The layout of `page2.html` must remain stable and unbroken.

## Expected Repairs
- Apply `flex-wrap: wrap;` in `shared-header.css`.
- If the agent hardcodes widths or hides overflow, it might break `page2.html`.
