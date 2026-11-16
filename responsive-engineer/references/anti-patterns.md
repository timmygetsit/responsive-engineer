# Responsive Anti-Patterns

When implementing responsive repairs, **DO NOT** do the following:

1. **Adding random media queries until the problem disappears.**
   Do not layer media query over media query to fix symptoms. Diagnose the root cause (like a fixed min-width) and fix that instead.

2. **Using device names as the only breakpoint strategy.**
   Don't just think "mobile, tablet, desktop." Breakpoints should be determined by where the layout actually breaks (content-driven), not arbitrary device widths.

3. **Hiding content just to make overflow disappear.**
   Setting `display: none` on important content just because it doesn't fit is a failure. Rethink the layout instead.

4. **Setting `overflow-x: hidden` on the `body` or `html` as a generic fix.**
   This hides the symptom (horizontal scrolling) without fixing the broken layout architecture causing the overflow. Users may still lose access to clipped content.

5. **Shrinking text until it technically fits.**
   Text must remain readable. Do not use `font-size: 8px` to force a table into a small viewport. Allow horizontal scrolling on the table instead.

6. **Removing important functionality on mobile without justification.**
   Mobile users need full functionality. Do not disable features just because they are hard to fit on the screen.

7. **Fixing screenshots without fixing underlying layout behavior.**
   Making the UI look good at exactly 375px but leaving it completely broken at 400px is not a fix. Use fluid design.

8. **Declaring success without re-testing.**
   You must visually or programmatically verify that your changes did not introduce regressions at other viewport sizes.

9. **Making desktop layouts worse in order to fix mobile.**
   Ensure that a change for small screens is scoped inside a media query (or fluid constraint) so it does not destroy the desktop layout.

10. **Introducing unnecessary JavaScript for problems CSS can solve.**
    Do not use JS window resize listeners to change layouts if CSS Grid, Flexbox, media queries, or container queries can achieve the same result.
