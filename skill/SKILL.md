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

## Real-World Evaluation Modes
**MODE A — KNOWN BUG REPAIR**
You receive a specific user-facing problem (e.g., "The dashboard is unusable on mobile"). You must independently discover, reproduce, diagnose, classify, repair, and verify. Do not guess the root cause without evidence.

**MODE B — OPEN-ENDED RESPONSIVE AUDIT**
You receive a general audit request (e.g., "Audit this application for responsive behavior"). You must evaluate viewports, find what is broken, what is intentional, and what requires transformation. You may legitimately conclude no repair is needed.

## Real-World Failure Classification
Every discovered condition must be classified as exactly one primary category:
1. `STRUCTURAL_BUG`
2. `INTERACTION_MODEL_BUG`
3. `VISUAL_UX_ISSUE`
4. `ACCESSIBILITY_ISSUE`
5. `INTENTIONAL_BEHAVIOR`
6. `NO_ISSUE`
7. `NEEDS_HUMAN_REVIEW`
8. `BLOCKED_INCOMPLETE_OBSERVABILITY`

Do not force every audit to produce a repair. A successful evaluation may result in zero code changes.

## Core Responsive Adaptation Categories
Responsive engineering has three distinct categories of adaptation. You must evaluate which category applies:

**Category A — Fluid Adaptation**
The same component and interaction model remain, but the geometry adapts.
Examples: Fluid widths, fluid containers, flex/text wrapping, grid column reduction, responsive images, reduced gaps/padding, card width adaptation, `max-width: 100%`.

**Category B — Interaction Transformation**
The existing desktop interaction model is no longer appropriate and must change to remain usable.
Examples: Desktop navigation → hamburger menu, sidebar → drawer, desktop toolbar → overflow menu, large modal → bottom sheet, dense control group → compact mobile interaction.

**Category C — Content & Composition Adaptation**
The content remains functionally present, but its visual composition, hierarchy, density, spacing, or presentation changes to remain usable on mobile. 
Examples:
- Large desktop card padding → compact mobile card padding.
- Excessive page margins → reduced mobile margins.
- Nested horizontal padding → consolidated mobile spacing.
- Long desktop button label → contextually shorter visible mobile label.
- Long button + social icons → separate mobile action groups.
- Horizontal actions → vertical or grouped composition.
- Dense metadata → reordered or deprioritized presentation.
- Large heading → controlled responsive wrapping.
- Multiple desktop card columns → single-column mobile composition.
- Desktop content hierarchy → mobile-first hierarchy.
- Secondary content → collapsed or progressive disclosure where appropriate.

This category is NOT equivalent to simply adding media queries. The agent must reason about the relationship between available viewport width, content width, hierarchy, spacing, and usability.

## Content Density & Mobile Space Efficiency

**Core Principle:** Responsive engineering is not merely the prevention of overflow. A layout may technically fit within the viewport and still be non-responsive from a usability perspective. The agent must distinguish Structural correctness, Visual usability, Content readability, Interaction suitability, Space efficiency, Accessibility, and Information hierarchy.

**Available Content Width:**
The agent should reason about:
Viewport Width - Page Horizontal Padding - Container Margins - Card Padding - Nested Container Padding - Internal Gaps = Effective Content Width.
The agent must investigate whether excessive spacing creates an unnecessarily narrow content area. Evaluate effective content width, not only scrollWidth. Do not automatically minimize all whitespace; preserve intentional visual breathing room where it contributes to hierarchy and readability (Usable density, not maximum density).

**Mobile Space Efficiency:**
Identify disproportionate horizontal or vertical space consumption caused by:
- Excessive outer margins, page padding, card padding, nested container padding.
- Excessive gaps between controls, oversized buttons, long labels consuming unnecessary width.
- Social icons separated by excessive spacing, components occupying disproportionate viewport area.
Distinguish between **Intentional whitespace** (improves hierarchy, readability, scannability, visual grouping, touch usability) and **Wasteful whitespace** (unnecessarily reduces content width, causes avoidable wrapping, forces controls into awkward layouts, makes cards feel empty, pushes important content below the fold, creates poor mobile composition). Optimize for usable content density.

## Content Composition Decision Framework
For every major mobile component, evaluate:
1. **Does it fit?** If no: Diagnose structural layout constraints.
2. **Does it remain usable?** If no: Apply fluid adaptation or composition adaptation.
3. **Does the interaction model still make sense?** If no: Apply interaction transformation.
4. **Is the content readable?** If no: Consider reflow, wrapping, typography adjustment, content hierarchy, selective restructuring.
5. **Is spacing consuming disproportionate viewport width?** If yes: Investigate page padding, card padding, nested padding, gaps, margins. Reduce only where evidence supports it.
6. **Is the content hierarchy preserved?** If no: Recompose the mobile layout.
7. **Does the result feel intentionally designed for mobile?** If no: Treat the problem as a composition issue rather than merely a CSS sizing issue.

## Component Responsiveness Rules

**Card Responsiveness Rules**
Inspect distance from viewport edge to card, distance from card edge to content, card internal padding, nested container padding, card content width, heading wrapping, body text width, button width, image dimensions, metadata density. Consider whether desktop spacing values are excessive at mobile widths. Do NOT mandate specific pixel values; derive appropriate spacing from viewport width, content density, design system, spacing scale, and component hierarchy.

**Long Button and Action Composition Rules**
Consider a shorter visible label on mobile ONLY when:
1. The shortened label preserves meaning.
2. The user can still understand the destination.
3. The full semantic meaning remains available to assistive technology where appropriate.
4. The interaction remains discoverable.
5. The change does not introduce ambiguity.
Do not blindly shorten labels or hide meaningful content solely to make a layout fit. Where appropriate, use responsive visible labels, accessible names, tooltips, `aria-label`, icon+text combinations, or contextually shorter labels. Verify accessibility after any content transformation.

**Button + Social Icon Composition**
When a long action button shares a row with social icons or other controls, evaluate the entire composition as a group (Total group width, button width, icon group width, gap between groups, alignment, visual hierarchy, touch targets, wrapping behavior).
Possible mobile strategies include separate rows, button full-width, social icons grouped beneath, social icons aligned independently, reduced gaps, contextually shorter visible label, stacked action composition. Select the strategy that best preserves hierarchy, usability, accessibility, and design intent. Do not introduce arbitrary layouts simply to satisfy a geometry check.

## Core Workflow (The Repair Loop)
When tasked with responsive work, you MUST execute the following loop:

1. **DISCOVER**: Inspect the HTML/CSS/components and observe the current UI.
2. **UNDERSTAND**: Read `skill/references/responsive-contract.md` to establish the intended behavior.
3. **TEST**: Use browser automation (or visual tools) to check the UI against the standard Viewport Matrix (including CSS viewports: 320px, 375px, 390px, 393px, 430px, 768px, 1024px, 1440px).
4. **DIAGNOSE**: Identify layout failures. Distinguish root causes (e.g., fixed-widths) from symptoms (e.g., clipping). Consult `skill/references/failure-taxonomy.md`.
5. **CLASSIFY ADAPTATION TYPE**: Decide if the component needs Fluid Adaptation, Interaction Transformation, Hybrid, or if it is Unknown.
6. **PLAN**: Choose the smallest, most structural fix based on the Repair Hierarchy (see `skill/references/repair-strategy.md` and `responsive-navigation.md`).
7. **IMPLEMENT**: Modify the codebase. Avoid anti-patterns (see `skill/references/anti-patterns.md`).
8. **VERIFY STRUCTURE**: Ensure no unintended page overflow and layout reflows correctly.
9. **VERIFY INTERACTION**: Ensure appropriate density, touch targets, and controls.
10. **VERIFY ACCESSIBILITY**: Ensure semantic controls, aria-expanded, keyboard operation, and focus behavior are intact.
11. **VERIFY REGRESSIONS**: Check other viewports and shared components.
12. **REPORT**: Generate a Verification Report.

**CRITICAL RULE**: Responsive engineering is not complete when the page merely stops overflowing. A layout may be geometrically valid but interactionally inappropriate. The agent must evaluate whether the interface remains usable and whether the interaction model should transform at smaller viewports.

**CRITICAL RULE**: Do not force a hamburger menu solely because the viewport is small. Choose the simplest interaction model that preserves usability, accessibility, and the intended product behavior.

## Operating Instructions

### Step 1: Establish Scope and Contract
Determine if the user wants to BUILD, AUDIT, or REPAIR.
Write down a temporary "Responsive Contract" for the component(s) in question. This defines how it *should* behave.
The contract MUST include Geometry, Layout, Overflow, Breakpoints, Accessibility, and the **Interaction Model** (Desktop, Tablet, Mobile models; Expected transformation point; Trigger behavior; Expanded/collapsed behavior; Preservation of functionality).
The contract must now include:
- **Content Density**: Document effective content width, outer spacing, internal spacing, card density, action density, text wrapping, content hierarchy.
- **Composition**: Document desktop, tablet, and mobile compositions. Document components that remain unchanged, fluidly adapt, transform, or recompose.
- **Content Adaptation**: Document whether content remains unchanged, wraps, reorders, condenses, uses shorter visible labels, or uses progressive disclosure.

**Evaluation Coverage Tracking:**
As part of the Responsive Contract, you must explicitly track coverage for each decision (e.g. OBSERVED, INFERRED, UNVERIFIED, or BLOCKED):
- **Observed**: Behaviors verified through actual rendering.
- **Inferred**: Behaviors inferred from source code rather than observed in a browser.
- **Unverified**: Behaviors that could not be evaluated.
- **Blocked**: Behaviors that could not be rendered due to external dependencies.

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
Determine the test matrix. Test at minimum:
- **Mobile**: 320px, 375px, 390px, 393px, 430px
- **Tablet**: 768px, 820px, 1024px
- **Desktop**: 1280px, 1440px
Where relevant, include short-height viewports to expose vertical overflow and modal problems. Do not assume standard breakpoints are sufficient. Look for transition points where the layout fails or interaction density becomes unusable.
Use available browser tools (e.g., Playwright) to measure page width vs viewport width (horizontal overflow detection) and verify interaction usability.

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

### Step 6: Handling Incomplete Observability (API-Blocked Reconnaissance)
When an application cannot fully render because external APIs, databases, or integrations are unavailable, DO NOT immediately classify it as a responsive failure. You must attempt recovery:
- **Level 1 (Local Data)**: Inspect for fixtures, mock data, or JSON seeds.
- **Level 2 (UI Components)**: Render components independently via Storybook, demo pages, or direct imports.
- **Level 3 (Test Infrastructure)**: Look for Playwright/Cypress fixtures or MSW mocks.
- **Level 4 (Temporary Harness)**: Create an isolated evaluation harness if components exist but lack a usable route.
- **Level 5 (Stop)**: If the UI cannot be meaningfully reconstructed, stop and document the limitation.

### Step 7: Verification and Reporting (Multi-Layer)
Prove the fix works objectively using Visual Responsiveness Verification:
- **Structural Responsiveness**: No unintended page overflow; elements fit containers; layout reflows correctly.
- **Interaction Responsiveness**: Appropriate navigation model, controls, density, and touch targets.
- **Content Usability Verification**: Content has sufficient usable width; cards are not excessively padded; nested containers do not waste viewport width; text remains readable; headings wrap naturally; buttons remain usable; long labels do not create awkward compositions; action groups maintain clear hierarchy; social controls remain discoverable; important content is not unnecessarily pushed below the fold.
- **Visual Responsiveness**: Header balanced, logo visible, navigation not cramped, controls don't collide, mobile menu hierarchy clear, desktop appearance preserved.
- **Accessibility**: Ensure keyboard focusable, text scales cleanly, touch targets ≥44px. For transformed components (e.g., hamburger menu): semantic `<button>`, accessible name, `aria-expanded`, keyboard/escape operation, and focus retention.

Other checks:
1. Use browser automation (Playwright) or `browser_subagent` to render the page.
2. Check the **failure threshold**: Test widths immediately before and after the expected breakpoint transition.
3. Check **regression**: Ensure the original failing viewport is fixed, BUT ALSO verify that previous passing widths remain intact.
4. Check **cross-component blast radius**: Test other pages that consume the shared component.
5. Check **page geometry**: Ensure `document.body.scrollWidth <= window.innerWidth`.
6. Ensure no intentional component-level overflow or uncontrollable iframe behavior was forcibly suppressed with anti-patterns.

You MUST NOT complete the task without generating a report.
**No False Confidence Rule:** Never interpret the absence of detected responsive failures as evidence that the entire application is responsive when significant portions of the application were not rendered or evaluated. Always distinguish "No bug found" from "No bug could be evaluated".

Format the final report as follows:
```
RESPONSIVE ENGINEER — VERIFICATION REPORT
Project: [Name]
Coverage Status: [FULL | PARTIAL | BLOCKED | UNKNOWN]
Responsive Coverage Summary:
  Full Coverage: [List elements]
  Partial Coverage: [List elements]
  Blocked: [List elements]
  Reason: [e.g., Shopify integration unavailable]
  Evaluation Confidence: [FULL | PARTIAL | UNKNOWN]
Results:
[Viewport] [PASS/FAIL]
Fixed: [List of structural fixes]
Verified: [Checklist of verification criteria]
Final Status: PASS
```

## References
For detailed methodologies, you MUST refer to the documentation in `skill/references/`:
- `responsive-contract.md` - Defining responsive intent.
- `responsive-navigation.md` - Framework for fluid vs interaction transformation (mobile menus).
- `failure-taxonomy.md` - Classifying layout errors.
- `repair-strategy.md` - The hierarchy of fixes.
- `anti-patterns.md` - What NOT to do.
