# The Responsive Contract

A formal description of expected behavior across viewport and content conditions.

## Purpose
The Responsive Contract defines how an interface *should* behave before any repairs are attempted. It helps the agent distinguish between an intentional design choice (like a horizontally scrolling data table) and an unintentional layout failure (like the whole page scrolling).

## Structure
When analyzing a component or page, formulate a contract using these guidelines:

### Minimum Supported Viewport
*   Generally 320px, unless defined otherwise.

### Mobile Behavior (< 768px typically)
*   Navigation typically collapses into a hamburger menu.
*   Multi-column grids collapse to a single column.
*   Sidebars move below the main content or hide behind a toggle.
*   Data tables may scroll horizontally *inside* their container (intentional overflow).

### Tablet Behavior (768px - 1024px)
*   Navigation may remain usable or use a condensed format.
*   Cards typically use two columns.
*   Sidebars remain visible if space permits.

### Desktop Behavior (> 1024px)
*   Cards use three or more columns.
*   Maximum readable width is enforced for text content to prevent excessive line length.

### Universal Principles
*   No unintended horizontal overflow at the document/page level.
*   No clipped content (text or interactive elements must be fully visible).
*   Images must preserve their aspect ratio.
*   Text must remain readable without zooming.
*   Interactive controls (buttons, links) must remain usable and accessible.
