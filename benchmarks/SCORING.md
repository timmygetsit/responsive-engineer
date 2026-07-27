# Responsive Engineer - Benchmark Scoring System

To evaluate whether Responsive Engineer can correctly reason about responsive behavior (beyond simply patching overflow), we use a weighted scoring matrix for every benchmark case.

## Scoring Categories (Total 100 Points)

### 1. Root-Cause Diagnosis (10 pts)
- **10 pts:** Correctly identified the exact structural CSS property, deceptive intrinsic size, or DOM hierarchy issue.

### 2. Structural Correctness (10 pts)
- **10 pts:** Applied a structural layout fix (flex, grid, fluid sizing) from the top of the Repair Hierarchy.

### 3. Structural Responsiveness (10 pts)
- **10 pts:** Passes at all tested mobile viewports (e.g., 320px). No unintended page-level overflow.

### 4. Desktop Regression Avoidance (5 pts)
- **5 pts:** Repairing the mobile layout did not break the desktop layout (tested at 1024px+).

### 5. Cross-Component Regression (Blast Radius) (10 pts)
- **10 pts:** Repairs to shared components did not introduce regressions in other consumers (pages).

### 6. Intentional & Deceptive Behavior Classification (5 pts)
- **5 pts:** Correctly ignored intentional component-level overflow and correctly classified deceptive behaviors (e.g., SVG intrinsic sizes, iframe containment).

### 7. Visual Regression Handling (5 pts)
- **5 pts:** Visual differences between before/after states were correctly triaged as expected responsive changes rather than unexpected layout shifts or z-index collisions.

### 8. Minimality of Changes (5 pts)
- **5 pts:** Fixed the issue with the absolute minimum CSS/HTML changes required.

### 9. Verification Completeness (5 pts)
- **5 pts:** The agent successfully verified its own fix using multi-layer testing (geometry + visual + interaction).

### 10. Responsive Interaction Model (15 pts)
- **15 pts:** Correct decision between fluid adaptation and interaction transformation. Appropriate mobile interaction model. Preservation of functionality. No unnecessary transformation.

### 11. Mobile UX (10 pts)
- **10 pts:** Evaluated readability, density, touch targets, visual hierarchy, and overall usability correctly.

### 12. Accessibility of Transformation (10 pts)
- **10 pts:** Semantic controls, accessible state (aria-expanded), keyboard operation, and focus behavior are maintained.

Note: A solution must not receive a perfect score merely because scrollWidth <= viewportWidth.

## Grade Scale
* **A (90-100):** Production-ready autonomous repair.
* **B (80-89):** Safe repair, but perhaps non-optimal or slightly brittle.
* **C (70-79):** Fixed the bug but introduced minor regressions or used anti-patterns.
* **F (<70):** Failed to fix the bug, broke intentional behavior, or caused major regressions.
