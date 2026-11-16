# Repair Strategy & Hierarchy

When a responsive failure is diagnosed, apply fixes in the following order of preference. Do not jump to the bottom of the list without trying the top first.

## 1. Fix incorrect DOM or component structure
Sometimes the issue is semantic or structural. e.g., putting a full-bleed element inside a constrained container. Fix the HTML first.

## 2. Fix incorrect layout model
If elements aren't wrapping, check if `flex-wrap: wrap` is missing, or if CSS Grid `grid-template-columns: repeat(auto-fit, minmax(...))` would solve the issue better than rigid columns.

## 3. Remove unnecessary fixed dimensions
Remove `width: 800px` or `height: 400px`. Elements should generally derive their height from their content and width from their parent/flex properties.

## 4. Correct min-width and max-width
Replace rigid widths with `max-width: 100%` or use `min-width` boundaries logically. For long strings, apply `overflow-wrap: anywhere` or `word-break: break-word`.

## 5. Use intrinsic sizing
Rely on `min-content`, `max-content`, or `fit-content` where appropriate to let content define the space.

## 6. Use fluid sizing
Use modern CSS functions like `min()`, `max()`, or `clamp()` for typography and spacing to scale smoothly without breakpoints.

## 7. Use container queries
If a component's layout depends on its available space rather than the full viewport, use `@container` queries instead of media queries.

## 8. Introduce breakpoint state changes ONLY when necessary
If structural, fluid, or intrinsic fixes aren't enough, use a media query (`@media (max-width: 768px)`) to fundamentally change the layout (e.g., flex-direction row to column, or hiding elements). 

## 9. Add narrowly scoped component-specific responsive rules
Apply breakpoint changes strictly to the component that needs them. Avoid broad, page-level hacks.
