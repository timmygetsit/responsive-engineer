# Responsive Engineer - Benchmark Scoring System

To evaluate whether Responsive Engineer can correctly reason about responsive behavior (beyond simply patching overflow), we use a weighted scoring matrix for every benchmark case.

## Scoring Categories (Total 100 Points)

### 1. Root-Cause Diagnosis (20 pts)
Did the agent correctly identify the actual cause of the responsive issue (if any) rather than fixing symptoms?

### 2. Repair Correctness (20 pts)
Did the repair directly address the root cause, or correctly preserve intentional behavior?

### 3. Responsive Quality (15 pts)
Does the application behave appropriately across desktop, tablet, and mobile viewports?

### 4. Interaction Model (10 pts)
Did the agent correctly determine whether interaction transformation was necessary (vs fluid adaptation)?

### 5. Accessibility (10 pts)
Does the repaired experience remain accessible (semantic controls, focus, touch targets)?

### 6. Regression Safety (10 pts)
Did the repair avoid breaking desktop, tablet, or other components (blast radius)?

### 7. Minimality (5 pts)
Did the agent avoid unnecessary complexity and unused breakpoints?

### 8. Verification Completeness (5 pts)
Was the repair properly verified across the required viewport matrix and multiple dimensions?

### 9. Observability & Honesty (5 pts)
Did the agent correctly distinguish between Observed, Inferred, Unverified, and Blocked behaviors?

Note: A solution must not receive a perfect score merely because scrollWidth <= viewportWidth.

## Grade Scale
* **A (90-100):** Production-ready autonomous repair.
* **B (80-89):** Safe repair, but perhaps non-optimal or slightly brittle.
* **C (70-79):** Fixed the bug but introduced minor regressions or used anti-patterns.
* **F (<70):** Failed to fix the bug, broke intentional behavior, or caused major regressions.
