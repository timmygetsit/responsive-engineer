---
name: responsive-engineer
description: "Autonomously inspects, evaluates, implements, repairs, and verifies responsive behavior using a formal verification loop with strict 320px mandatory stress-testing and Mobile Content Utilization auditing."
category: ui-engineering
risk: low
source: local
tags: "[frontend, responsive, css, ui, audit, repair, 320px]"
date_added: "2026-07-28"
---

# Responsive Engineer (v0.8.0)

## Purpose
Responsive Engineer empowers AI agents to establish durable, architecturally sound responsive layouts. Instead of blindly applying CSS breakpoint patches to fix symptoms, it uses a formal loop to discover intended layout behavior, stress-test viewports (mandating 320px), diagnose root causes (analyzing usable width chains), prioritize issues, and verify repairs objectively across entire applications.

## When to Use This Skill
Activate this skill when asked to:
- "Make this application properly responsive across mobile, tablet, and desktop."
- "Run Responsive Engineer in full-site audit mode."
- "Audit this interface for mobile issues."
- "Fix the horizontal overflow."
- ANY task explicitly related to responsive behavior, CSS media queries, or layout failure.

## 1. Core Responsive Principle
Responsive design must optimize for:
> **Available viewport width → usable container width → component width → content width → readable typography.**

Do not judge responsiveness only by whether an element technically remains inside the viewport. A page can have no horizontal overflow and still be poorly responsive because of excessive gutters, compounded nested padding, and typography that remains desktop-sized on narrow screens. The goal is to maximize useful content area without making the interface feel cramped.

## 2. Real-World Evaluation Modes
**MODE A — KNOWN BUG REPAIR**: You receive a specific user-facing problem. You must independently discover, reproduce, diagnose, classify, repair, and verify.
**MODE B — OPEN-ENDED RESPONSIVE AUDIT**: You receive a general audit request for a specific component/page. Evaluate viewports, find what is broken, what is intentional, and what requires transformation.
**MODE C — FULL-SITE RESPONSIVE AUDIT & REPAIR**: Execute the formal workflow: `DISCOVER → INVENTORY → RECONSTRUCT RESPONSIVE CONTRACT → MAP ROUTES → MAP SHARED COMPONENTS → AUDIT VIEWPORTS → CLASSIFY FINDINGS → PRIORITIZE → PLAN REPAIRS → IMPLEMENT → VERIFY → REGRESSION TEST → REPORT`.

## 3. Mandatory 320px Stress Test & Viewport Matrix
Every responsive audit MUST test against this standard viewport matrix. **320px is strictly mandatory and must never be treated as optional.** It is the primary mobile stress test used to enforce content-density behavior demonstrated in the benchmarks.
- **Primary Mobile Stress Test:** 320px × 568px
- **Secondary Mobile:** 375px, 390px, 430px
- **Tablet:** 600px, 768px, 834px, 1024px
- **Desktop Regression:** 1280px, 1440px, 1920px (where practical)

If the interface works at 320px while maintaining good readability and hierarchy, it is significantly more resilient at larger mobile widths. However, do not blindly force every component to maintain desktop dimensions at 320px. At 320px, components may need to stack, reduce padding/gaps, reduce typography, wrap buttons, or simplify navigation.

## 4. Universal Responsive Audit Categories

### Category A — Fluid Adaptation & Grid Blowout Detection
Identify whether the layout can fluidly adapt without changing its interaction model.
*Audit:* width constraints, flex wrapping, grid intrinsic sizing.
*Rule:* At narrow widths, inspect `min-width`, `flex-basis`, `flex-shrink`, and long flex children. A common fix is `min-width: 0` on flex/grid children. **Do not use `overflow-x: hidden` on the body as a band-aid.** Fix the offending width/padding/margin instead.

### Category B — Interaction Transformation
Determine whether desktop interactions remain usable on smaller screens.
*Rule:* Do not introduce a hamburger menu merely because the viewport is narrow. Base it on spatial density, readability, and touch targets.

### Category C — Content & Composition Adaptation (Usable Width Analysis)
Evaluate composition efficiency. Calculate the approximate usable width: `Viewport - Page padding - Container padding - Card padding = Actual content width`.
*Rule:* Do not allow multiple layers of spacing to unnecessarily consume the viewport (Nested Padding Detection).
- **Mobile Edge-to-Content Spacing:** If the distance between viewport edge and component border is unnecessarily large (e.g., 32px desktop padding on mobile), reduce it.
- **Container-to-Content Spacing:** Reduce excessive internal padding (card, section, form, hero) if the content area is unnecessarily narrow.
- **Visual Balance:** Do not reduce spacing to zero. Maintain enough visual breathing room.

### Category D — Spatial Recomposition & Layout Transformation
Recognize when a layout cannot be simply compressed. 
*Rule:* Do not blindly use `flex-direction: column` without verifying content hierarchy. If a two-column grid becomes cramped at 320px, `grid-template-columns: 1fr` is preferable. Base ordering on semantic and user-priority considerations.

### Category E — Mobile Input & Focus Stability
Ensure form controls behave correctly on mobile before and after focus.
*Rule:* If mobile auto-zoom occurs (e.g., iOS Safari), prefer bringing the focused control typography to 16px rather than disabling user zoom with accessibility-hostile viewport meta tags. Forms must maximize usable width (`width: 100%; box-sizing: border-box`).

### Category F — Mobile Content Utilization
Formally audit the usage of space to ensure maximum readable width on narrow screens.
*Audit:* Evaluate the spacing chain to determine the actual readable content width.
*Rule:* The skill must systematically inspect:
`Viewport → outer page spacing → section/container spacing → card spacing → content spacing → actual readable content width`. 
Remove layers of wasted space before resorting to reducing text size or scaling components.

### Mobile Density Guardrail
Content utilization must not become content compression.

Do not reduce spacing simply because space exists to be reclaimed.
Do not reduce typography simply because a smaller font creates more available width.

Do not reduce padding below a level that maintains:
- readable content separation
- comfortable touch targets
- visual hierarchy
- component boundaries
- accessibility
- intentional design rhythm

The objective is to remove EXCESSIVE space, not ALL space.

Before reducing a spacing value, determine whether the spacing is:
1. redundant,
2. excessive for the viewport,
3. causing measurable content starvation,
4. or intentionally part of the visual hierarchy.

Only reduce spacing when there is a responsive reason to do so.
Likewise, typography should only be reduced when structural optimization has been exhausted and the current type scale is genuinely too large for the available content width.

The final mobile layout should feel compact and efficient, not compressed or cramped.

## 5. Component-Specific 320px Rules

- **Typography & Readability:** Typography must adapt to the available width. Never solve responsiveness by making text unreadably small. Do NOT immediately shrink text whenever it wraps. First determine the cause (margin, padding, gap). Only reduce font size when the typography itself is too large for the available width.
- **Long Text Stress Testing:** At 320px, deliberately test long content (product names, email addresses, prices). Ensure it wraps appropriate (`overflow-wrap: anywhere; word-break: break-word; min-width: 0;`) without destroying layouts.
- **Cards:** Ensure cards use available width efficiently. Reduce excessive card padding and internal gaps. Allow titles to wrap. Keep buttons inside the card.
- **Buttons:** Text must fit, touch area must be adequate (44x44px min). If two buttons cannot fit side-by-side, wrap or stack them. Do not reduce text to microscopic sizes.
- **Headers & Footers:** Logo must fit, navigation accessible. Do not allow logo and nav to compete for more width than exists. Reduce unnecessary mobile spacing in footers (stack columns, avoid large gaps).
- **Images:** Images must never determine an unnecessarily large component width (`max-width: 100%; height: auto; object-fit: cover;`).
- **Tables:** Tables may legitimately require horizontal scrolling (`.table-responsive { overflow-x: auto; }`). Table overflow must NOT become entire page overflow. Ensure parent flex/grid children use `min-width: 0`.

## 6. Responsive Decision Hierarchy
When fixing a 320px issue, use this exact decision order before considering invasive solutions:
1. **Can unnecessary outer margin/gutter be reduced?**
2. **Can unnecessary container/card padding be reduced?**
3. **Can unnecessary gaps be reduced?**
4. **Can the layout change from horizontal to vertical?**
5. **Can the grid reduce its number of columns?**
6. **Can text wrap naturally?**
7. **Can typography be moderately reduced?**
8. **Does the component need a specialized mobile layout?**

*Priority Rule:* Remove unnecessary horizontal spacing > allow natural wrapping > adjust layout columns > reduce typography moderately > never make text tiny.

## 7. Multi-Layer Verification & Acceptance Criteria
Every repair must be verified. At 320px, the acceptance criteria are:
- No unintended horizontal page overflow.
- No text clipped, overlapping, or extending outside containers.
- No cards excessively narrow, surrounded by huge gutters, or overflowing.
- No typography unnecessarily oversized or unreadably small.
- No forms/buttons exceeding viewport width or becoming unusable.

*Preserve Desktop Design:* 320px optimization must not destroy larger layouts. After changes, regression-test 375px through 1920px. A fix is successful only when it improves narrow screens without causing regressions elsewhere.

## 8. Full-Site Responsive Health Report
When completing an audit, output the report (e.g., `reports/v0.7.0-responsive-health-report.md`) containing:
- **Viewports Tested:** List actual viewport sizes tested.
- **Overflow Issues:** List elements that caused horizontal overflow.
- **Spacing Issues:** List excessive outer margins, card padding, container padding, and gaps.
- **Typography Issues:** List headings/text that required responsive adjustment.
- **Layout Issues:** List grids, flex layouts, tables, and components that required restructuring.
- **Fixes:** Describe the actual changes made.
- **Regression Results:** Confirm larger viewport behavior.
- **Remaining Issues:** Only report genuine unresolved issues.

## Final Standard
The definition of responsive success is NOT: *"Everything fits inside 320px."*
The definition is: *"The interface uses the limited 320px viewport efficiently, preserves readable typography, minimizes unnecessary whitespace, maintains touch usability, prevents overflow, and still feels visually consistent with the original design."*

At 320px, prioritize:
`usable width > unnecessary whitespace`
`readability > desktop dimensions`
`content hierarchy > rigid layout preservation`
`intentional wrapping > overflow`
`smart spacing reduction > arbitrary shrinking`
`root-cause fixes > overflow hiding`
