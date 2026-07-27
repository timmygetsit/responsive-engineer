# Accessibility Benchmark

## Initial Broken State
A mobile navigation bar has a "hamburger" icon to open the menu. 
However:
- The icon is a `<div>` with an `onclick` handler but no `tabindex`, making it unreachable by keyboard.
- The touch target (padding) is `5px`, which is far below the recommended `44x44px` minimum for mobile devices.

## Responsive Contract
*   The page must be fully usable via keyboard.
*   The page must be usable by touch on mobile.

## Expected Repairs
- Change the `<div>` to a `<button>`.
- Increase padding to ensure a minimum `44x44px` touch target.
