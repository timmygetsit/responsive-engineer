# Responsive Navigation & Interaction Transformation

This document outlines the decision framework for determining when and how a component should transform its interaction model at smaller viewports.

## The Mobile Navigation Principle
A navigation should transition to a compact interaction model when the desktop navigation cannot remain comfortably usable within the available viewport, even if the navigation technically fits without causing horizontal overflow.

A navigation that technically fits but is cramped, awkward, or difficult to operate should be treated as a potential responsive UX failure.

However: Do not automatically convert every mobile navigation into a hamburger menu. A simple navigation with a small number of short links may remain fully visible on mobile if it is demonstrably usable. The correct decision must be evidence-based.

## Interaction Transformation vs. Fluid Adaptation

Before inventing a mobile navigation implementation, the agent must determine which category is appropriate:

**Category A — Fluid Adaptation**
The existing desktop interaction model is appropriate for the available viewport.
Example: A 3-item navigation that fluidly scales down or naturally wraps on mobile without getting cramped.

**Category B — Interaction Transformation**
The existing desktop interaction model is no longer appropriate and must change to remain usable.
Example: A 6-item dense navigation that becomes unusable on mobile and requires a hamburger menu or drawer.

## Decision Tree

```text
Does the component fit?
        |
        v
      No
        |
        v
Can it fluidly adapt while remaining usable?
        |
      Yes ---------------- No
       |                    |
       v                    v
Fluid adaptation     Interaction transformation
                           |
                           v
                 Is there an existing mobile
                 interaction architecture?
                           |
                    Yes -------- No
                     |            |
                     v            v
                Repair/use    Design minimal
                existing      appropriate pattern
```

For navigation specifically:

```text
Full desktop navigation
        |
        v
Evaluate viewport
        |
        v
Does full navigation remain usable?
        |
   Yes  |  No
    |   |
    |   v
    |   Is wrapping acceptable?
    |      |
    |   Yes|No
    |    |  |
    |    |  v
    |    |  Transform interaction model
    |    |
    v    v
Keep   Compact navigation
full   / hamburger / drawer
```

## Evaluation Criteria

When evaluating if a full navigation remains usable, consider the following:

**Geometry**
* Does the navigation fit within the viewport?
* Does `scrollWidth` exceed the viewport?
* Does the navigation force parent expansion?
* Does the logo collide with navigation items?

**Readability**
* Is navigation text readable?
* Are labels excessively compressed?
* Does wrapping create awkward multi-line navigation?
* Are labels clipped?

**Interaction**
* Are interactive elements sufficiently separated?
* Are touch targets sufficiently large? (e.g. 44px min for mobile)
* Is the navigation easy to operate with one hand?
* Does the interaction require excessive precision?

**Density**
* How many primary navigation items exist?
* How much horizontal space do they require?
* Does the navigation contain secondary actions?
* Does the navigation include authentication controls or other actions?

## Existing Architecture First
Before inventing a mobile navigation implementation, inspect whether the application already contains:
* A mobile menu.
* A hamburger trigger.
* A drawer.
* A navigation dialog.
* Responsive utility classes.
* Existing breakpoint-specific navigation logic.
* Mobile-specific components.
* Existing design-system primitives.

**Prefer repairing or completing an existing intended architecture over inventing a new one.**

## Accessibility Requirements for Transformed Menus
When a navigation transforms into a hamburger or compact menu, verify:
* The trigger is a semantic `<button>`.
* The trigger has an accessible name.
* The trigger has an appropriate touch target.
* The expanded/collapsed state is exposed through `aria-expanded` where appropriate.
* The controlled menu is associated appropriately.
* Keyboard users can operate it.
* Focus behavior is reasonable.
* Focus is not lost unexpectedly.
* The menu can be closed.
* Escape behavior is implemented where appropriate.
* The navigation remains accessible without relying solely on hover.
* All primary navigation destinations remain reachable.
