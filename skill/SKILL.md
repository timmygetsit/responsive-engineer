---
name: responsive-engineer
description: "Autonomously inspects, evaluates, implements, repairs, and verifies responsive behavior in web interfaces using a formal verification loop."
category: ui-engineering
risk: low
source: local
tags: "[frontend, responsive, css, ui, audit, repair]"
date_added: "2026-07-28"
---

# Responsive Engineer (v0.6)

## Purpose
Responsive Engineer empowers AI agents to establish durable, architecturally sound responsive layouts. Instead of blindly applying CSS breakpoint patches to fix symptoms, it uses a formal loop to discover intended layout behavior (the Responsive Contract), test viewports, diagnose root causes, prioritize issues, and verify repairs objectively across entire applications.

## When to Use This Skill
Activate this skill when asked to:
- "Make this application properly responsive across mobile, tablet, and desktop."
- "Run Responsive Engineer in full-site audit mode."
- "Audit this interface for mobile issues."
- "Fix the horizontal overflow."
- ANY task explicitly related to responsive behavior, CSS media queries, or layout failure.

## Real-World Evaluation Modes

**MODE A — KNOWN BUG REPAIR**
You receive a specific user-facing problem. You must independently discover, reproduce, diagnose, classify, repair, and verify.

**MODE B — OPEN-ENDED RESPONSIVE AUDIT**
You receive a general audit request for a specific component or page. You must evaluate viewports, find what is broken, what is intentional, and what requires transformation.

**MODE C — FULL-SITE RESPONSIVE AUDIT & REPAIR**
The primary operating mode for real production applications. You must independently discover, diagnose, prioritize, repair, and verify responsive issues across the entire application. Do not stop at the first visible problem. Inspect the entire accessible application surface.

## Full-Site Audit Workflow
When operating in Mode C, execute this formal workflow:
`DISCOVER → INVENTORY → RECONSTRUCT RESPONSIVE CONTRACT → MAP ROUTES → MAP SHARED COMPONENTS → AUDIT VIEWPORTS → CLASSIFY FINDINGS → PRIORITIZE → PLAN REPAIRS → IMPLEMENT → VERIFY → REGRESSION TEST → REPORT`

### 1. Application Reconnaissance
Before auditing, identify the application's:
- Framework, Routing architecture, Rendering model, CSS architecture, Design system/component library, Breakpoint system.
- Shared components: Layouts, Navigation, Cards, Buttons, Typography, Forms, Tables, Modals, Drawers, Footers, Reusable action groups, Third-party embedded components.
- Surfaces: Dynamic routes, Data dependencies, Authentication-dependent surfaces, API-dependent surfaces.

Create an inventory and distinguish coverage as: `OBSERVED`, `INFERRED`, `UNVERIFIED`, or `BLOCKED`. Do not allow partial observability to produce false confidence.

### 2. Full Responsive Viewport Matrix
Establish and test against this standard viewport matrix:
- **Mobile**: 320px, 375px, 390px, 430px
- **Tablet**: 600px, 768px, 834px, 1024px
- **Desktop**: 1280px, 1440px
- **Transition Thresholds**: Evaluate 767px vs 768px, 1023px vs 1024px, 1279px vs 1280px.
Do not assume framework breakpoints are automatically correct. Content density determines appropriateness.

## Universal Responsive Audit Categories

**Category A — Fluid Adaptation**
Identify whether the layout can fluidly adapt without changing its interaction model.
Evaluate: Width constraints, min-width, max-width, flex shrink behavior, flex wrapping, grid behavior, intrinsic sizing, `min-width: auto`, fixed dimensions/heights, hardcoded margins/padding, container widths, nested container spacing.

**Category B — Interaction Transformation**
Determine whether desktop interactions remain usable on smaller screens.
Evaluate: Desktop navigation, hamburger navigation, drawers, sidebars, filters, search, toolbars, action groups, multi-column controls, dropdowns, modal behavior.
*Rule:* Do not introduce a hamburger menu merely because the viewport is narrow. The decision must consider spatial density, readability, touch interaction, content hierarchy, number of elements, and available horizontal space. Distinguish FLUID_ADAPTATION from INTERACTION_TRANSFORMATION.

**Category C — Content & Composition Adaptation**
Evaluate composition efficiency and usability.
Audit: Card padding, card margins, container padding, nested container padding, excessive whitespace, content width, typography scaling, heading wrapping, paragraph line length, button label wrapping, CTA groups, social icon groups, button + icon compositions, footer compositions, image sizing, aspect ratios, content hierarchy.
*Rule:* Calculate **Available Content Width** = viewport width - outer margins - container padding - card padding - internal spacing. Maximize usable content area while preserving breathing room, hierarchy, and visual quality.

## Component-Specific Responsive Rules

**Cards:** Check screen margin, width, internal/nested padding, image dimensions, text width, heading wrapping, CTA placement, card height, clipping. Optimize according to content density and design intent, avoiding universal padding values.
**Buttons:** Evaluate label wrapping, minimum touch target (44x44px), width, padding, icon alignment, long labels, full-width behavior, button groups. Consider fluid width, text wrapping, reduced padding, or icon+text composition before arbitrarily truncating meaningful labels.
**Button + Social Icon Groups:** Determine appropriate mobile composition (single row, wrapped row, two-row, stacked, etc.). Preserve action hierarchy, touch targets, and visual balance.
**Typography:** Check fixed font sizes, heading wrapping, line length/height, clipping, overflow, vertical expansion. Prefer responsive typography strategies.
**Tables:** Distinguish intentional table overflow from page blowout. Use localized scrolling containers. Never solve by blindly applying `overflow-x: hidden` to the body.
**Images and SVG:** Check hardcoded/intrinsic dimensions, max-width, aspect ratio, responsive scaling, image loading failures. Do not misclassify asset-loading failures as CSS bugs.
**Modals and Drawers:** Check viewport height/width, content overflow, scroll behavior, close controls, touch targets, keyboard interaction, focus behavior.

## Finding Prioritization System
Every finding must have: Severity, Category, Root cause, Affected routes/components, Affected viewports, Confidence, Blast radius, Recommended repair.
- **P0 (Critical):** Application unusable or inaccessible.
- **P1 (Major):** Core interaction or content significantly broken.
- **P2 (Moderate):** Responsive behavior degraded but usable.
- **P3 (Minor):** Spacing, typography, or visual polish issue.
- **P4 (Informational):** Potential improvement with no clear defect.
Prioritize structural and interaction failures before cosmetic adjustments.

## Shared Component Blast Radius
Before modifying a shared component, determine where it is used, dependent routes, and intentional behaviors. After modification, re-test all affected contexts. A repair that fixes one page but damages another is a regression.

## Full-Site Repair Strategy
Do not fix findings randomly. Repair in this order:
1. Critical structural overflow.
2. Broken interaction models.
3. Shared component defects.
4. Content density failures.
5. Responsive typography.
6. Component spacing.
7. Visual polish.

Group related findings when they share a root cause. Avoid: `overflow-x: hidden` as a default, arbitrary media queries, duplicate CSS overrides, breakpoint proliferation, hardcoded device hacks, unnecessary component rewrites.

## Multi-Layer Verification
Every repair must be verified across:
1. **Structural:** scrollWidth, clientWidth, Bounding boxes, Overflow, Clipping.
2. **Visual:** Screenshots, Layout composition, Z-index collisions, Text overlap, Hierarchy.
3. **Interaction:** Navigation, Menus, Drawers, Buttons, Forms, Action groups.
4. **Accessibility:** Semantic controls, Keyboard navigation, Focus behavior, Accessible names, ARIA state, 44x44px min touch targets.
5. **Content Usability:** Readability, Heading hierarchy, Content density, Card composition, Button labels, Action grouping.
6. **Regression:** Other routes, components, Desktop, Tablet, Mobile.

## Full-Site Responsive Health Report
Output the final report to `reports/v0.6-responsive-health-report.md`.
Format must contain:
- **Executive Summary:** Overall responsive health.
- **Coverage:** Routes evaluated, blocked, components evaluated, unverified.
- **Viewport Matrix:** Document every tested viewport.
- **Findings:** ID, Route, Component, Viewport, Category, Severity, Root cause, Evidence, Repair recommendation, Confidence.
- **Interaction Transformations:** List all models changed.
- **Content Composition Findings:** List excessive padding, wasteful whitespace, typography issues, button/card density issues.
- **Intentional Overflow:** Document preserved overflow.
- **Blocked Observability:** API, auth, environment limits.
- **Regression Analysis:** Shared-component impacts.
- **Final Status:** [PASS | PASS_WITH_WARNINGS | NEEDS_HUMAN_REVIEW | BLOCKED | FAIL]

## References
For detailed methodologies, refer to the documentation in `skill/references/`:
- `responsive-contract.md` - Defining responsive intent.
- `responsive-navigation.md` - Framework for fluid vs interaction transformation (mobile menus).
- `failure-taxonomy.md` - Classifying layout errors.
- `repair-strategy.md` - The hierarchy of fixes.
- `anti-patterns.md` - What NOT to do.
