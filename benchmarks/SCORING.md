# Responsive Engineer - Benchmark Scoring System

To evaluate whether Responsive Engineer can correctly reason about responsive behavior (beyond simply patching overflow), we use a weighted scoring matrix for every benchmark case.

## Scoring Categories (Total 100 Points)

### 1. Root-Cause Diagnosis (10 pts)
- **10 pts:** Correctly identified the exact structural CSS property, deceptive intrinsic size, or DOM hierarchy issue.

### 2. Structural Correctness (15 pts)
- **15 pts:** Applied a structural layout fix (flex, grid, fluid sizing) from the top of the Repair Hierarchy.

### 3. Mobile Responsiveness (10 pts)
- **10 pts:** Passes at all tested mobile viewports (e.g., 320px). No page-level overflow.

### 4. Desktop Regression Avoidance (10 pts)
- **10 pts:** Repairing the mobile layout did not break the desktop layout (tested at 1024px+).

### 5. Cross-Component Regression (Blast Radius) (15 pts)
- **15 pts:** Repairs to shared components did not introduce regressions in other consumers (pages).

### 6. Intentional & Deceptive Behavior Classification (10 pts)
- **10 pts:** Correctly ignored intentional component-level overflow and correctly classified deceptive behaviors (e.g., SVG intrinsic sizes, iframe containment).

### 7. Visual Regression Handling (10 pts)
- **10 pts:** Visual differences between before/after states were correctly triaged as expected responsive changes rather than unexpected layout shifts or z-index collisions.

### 8. Accessibility (10 pts)
- **10 pts:** The layout remains usable with keyboard navigation, 200% zoom, and touch targets (≥44px on mobile) are uncompromised for interactable elements.

### 9. Minimality of Changes (5 pts)
- **5 pts:** Fixed the issue with the absolute minimum CSS/HTML changes required.

### 10. Verification Completeness (5 pts)
- **5 pts:** The agent successfully verified its own fix using multi-layer testing (geometry + visual).

## Grade Scale
* **A (90-100):** Production-ready autonomous repair.
* **B (80-89):** Safe repair, but perhaps non-optimal or slightly brittle.
* **C (70-79):** Fixed the bug but introduced minor regressions or used anti-patterns.
* **F (<70):** Failed to fix the bug, broke intentional behavior, or caused major regressions.
