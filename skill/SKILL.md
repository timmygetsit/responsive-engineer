---
name: responsive-engineer
description: "Autonomously inspects, evaluates, implements, repairs, and verifies responsive behavior in web interfaces using a formal verification loop."
category: ui-engineering
risk: low
source: local
tags: "[frontend, responsive, css, ui, audit, repair]"
date_added: "2026-07-27"
---

# Responsive Engineer

## Purpose
Responsive Engineer empowers AI agents to establish durable, architecturally sound responsive layouts. Instead of blindly applying CSS breakpoint patches to fix symptoms, it uses a formal loop to discover intended layout behavior (the Responsive Contract), test viewports, diagnose root causes, and verify repairs objectively.

## When to Use This Skill
Activate this skill when asked to:
- "Make this dashboard responsive."
- "Audit this interface for mobile issues."
- "Fix the horizontal overflow."
- "Ensure this UI works across all viewports."
- ANY task explicitly related to responsive behavior, CSS media queries, or layout failure.

## Core Workflow (The Repair Loop)
When tasked with responsive work, you MUST execute the following loop:

1. **DISCOVER**: Inspect the HTML/CSS/components and observe the current UI.
2. **UNDERSTAND**: Read `skill/references/responsive-contract.md` to establish the intended behavior.
3. **TEST**: Use browser automation (or visual tools) to check the UI against the standard Viewport Matrix (320px to 1440px).
4. **DIAGNOSE**: Identify layout failures. Distinguish root causes (e.g., fixed-widths) from symptoms (e.g., clipping). Consult `skill/references/failure-taxonomy.md`.
5. **PLAN**: Choose the smallest, most structural fix based on the Repair Hierarchy (see `skill/references/repair-strategy.md`).
6. **IMPLEMENT**: Modify the codebase. Avoid anti-patterns (see `skill/references/anti-patterns.md`).
7. **VERIFY**: Re-render the interface and re-test the viewports.
8. **ITERATE**: If tests fail, repeat from step 4. DO NOT declare success if verification fails.
9. **REPORT**: Generate a Verification Report.

## Operating Instructions

### Step 1: Establish Scope and Contract
Determine if the user wants to BUILD, AUDIT, or REPAIR.
Write down a temporary "Responsive Contract" for the component(s) in question. This defines how it *should* behave (e.g., "Table should scroll horizontally", "Sidebar should collapse below 768px").

### Step 2: Understand
Before changing code, answer these questions:
1. Is the overflow unintentional (e.g., page-level blowout) or **intentional** (e.g., scrollable data tables, code blocks, carousels)? Do not attempt to "fix" intentional component-level overflow.
2. At exactly what viewport width does the layout break? Identify the specific transition threshold (e.g., test 768px, 767px, 769px).
3. Which element is the root cause? Use DOM inspector geometry.
4. What happens when the content is surprisingly long (e.g., an unbroken URL)?
5. Does the failure stem from a deceptive CSS property (e.g., `min-width: auto` on a flex child preventing shrinking)?
6. **Intrinsic Deceptions**: Is the overflow caused by hardcoded dimensions on uncontrollable elements (e.g., `<svg width="1000">`, or 3rd-party `<iframe>`)?
7. **Shared Components**: If the fix requires editing a shared CSS file or component, will it cause regressions on other pages? Measure the blast radius.

### Step 3: Testing
Determine the test matrix. At a minimum, test at [320, 375, 768, 1024, 1440]. Look for transition points where the layout fails.
Use available browser tools (e.g., Playwright) to measure page width vs viewport width (horizontal overflow detection).

### Step 4: Diagnosis
Do not immediately add a media query. 
If an element is overflowing, check its parent tree for rigid `width` or `min-width` declarations, or inflexible Grid/Flexbox properties.

### Step 4: Repair
Apply the Repair Hierarchy:
1. Fix DOM structure.
2. Fix layout model (flex/grid). **Ensure parent flex containers have sufficient `flex-basis` and properties that allow them to wrap under space constraints.**
3. Remove fixed dimensions.
4. Correct min/max widths.
5. Use intrinsic/fluid sizing.
6. Only use breakpoint state changes as a last resort.

### Step 5: Verification and Reporting (Multi-Layer)
Prove the fix works objectively. DOM geometry is necessary but not sufficient.
1. Use browser automation (Playwright) or `browser_subagent` to render the page.
2. Check the **failure threshold**: Test widths immediately before and after the expected breakpoint transition.
3. Check **regression**: Ensure the original failing viewport is fixed, BUT ALSO verify that previous passing widths (e.g., desktop 1024px, tablet 768px) remain intact. A repair that breaks desktop is a failed repair.
4. Check **cross-component blast radius**: Test other pages that consume the shared component.
5. Check **accessibility**: Ensure elements are keyboard focusable, text scales cleanly at 200% zoom, and interactable touch targets are ≥44px.
6. Check **page geometry**: Ensure `document.body.scrollWidth <= window.innerWidth`.
7. **Visual Regression Triage**: Compare screenshots before and after. A visual difference is NOT automatically a failure. Distinguish between *expected responsive changes* (e.g., intended wrapping) and *unexpected layout shifts* (e.g., z-index collisions, clipping). Visual regression is evidence, not the sole source of truth.
8. Ensure no intentional component-level overflow (like a table) or uncontrollable iframe behavior was forcibly suppressed with anti-patterns.

You MUST NOT complete the task without generating a report.
Format the final report as follows:
```
RESPONSIVE ENGINEER — VERIFICATION REPORT
Project: [Name]
Scope: [Scope]
Results:
[Viewport] [PASS/FAIL] (include regression and threshold tests)
Fixed: [List of structural fixes]
Verified: [Checklist of verification criteria]
Intentional Overflow: [List of intentional overflows correctly preserved]
Final Status: PASS
```

## References
For detailed methodologies, you MUST refer to the documentation in `skill/references/`:
- `responsive-contract.md` - Defining responsive intent.
- `failure-taxonomy.md` - Classifying layout errors.
- `repair-strategy.md` - The hierarchy of fixes.
- `anti-patterns.md` - What NOT to do.
