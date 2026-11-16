# Failure Taxonomy

Identify layout issues by mapping them to these categories.

## 1. Layout
*   **Horizontal overflow:** The page scrolls side-to-side unintentionally.
*   **Clipping:** Content is cut off by hidden overflow constraints.
*   **Overlap:** Elements collide or overlap each other incorrectly.
*   **Broken flex/grid:** Items don't wrap when they should, or columns squash too tightly.
*   **Fixed-width content:** An element with `width: 500px` fails on a 375px screen.
*   **Inappropriate minimum width:** `min-width: 400px` breaking mobile layouts.

## 2. Spatial & Composition (Category C & D)
*   **SPATIAL_RECOMPOSITION_BUG:** A desktop spatial arrangement remains structurally intact at mobile widths even though the content hierarchy, density, or interaction model requires a different composition.
*   **RESPONSIVE_GRID_COMPOSITION_BUG:** A multi-column card or content grid fails to transition into an appropriate mobile grid or stacked composition.
*   **Padding explosion:** Nested containers compounding horizontal padding, removing usable width on mobile.

## 3. Typography
*   **Heading overflow:** Large titles pushing bounds.
*   **Text clipping:** Text cut off horizontally or vertically.
*   **Unnatural wrapping:** Words breaking at awkward places.
*   **Excessive line length:** Desktop text that is too wide to read comfortably (ideal is ~60-80 characters).

## 3. Navigation & Components
*   **Navigation collision:** Inline menu links overlapping before they collapse to a hamburger.
*   **Card collapse:** Cards becoming too narrow to display their inner content.
*   **Modal overflow:** Modals that exceed the viewport height and lack internal scrolling.
*   **Table usability failure:** Data tables that squish text into unreadable columns instead of overflowing intentionally.

## 5. Media & Interaction
*   **Image distortion:** Images squished or stretched (lacking `object-fit` or `height: auto`).
*   **Touch target too small:** Buttons shrinking too much on mobile.
*   **Sticky element obscuring content:** Fixed headers taking up too much vertical space on landscape mobile.
*   **MOBILE_INPUT_FOCUS_BUG:** A form control or its container produces an undesirable mobile focus behavior, including unintended application-level overflow, unstable layout, or inappropriate control sizing during focus.
*   **MOBILE_BROWSER_ZOOM_BEHAVIOR:** A mobile browser changes zoom behavior during input focus due to browser behavior or control typography, requiring careful diagnosis before modification.

## 6. Content & Accessibility
*   **Long string overflow:** Unbroken text (URLs, long usernames) breaking containers.
*   **Focus order failure:** Off-canvas menus that are hidden visually but still focusable by keyboard.
