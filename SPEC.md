# Responsive Engineer - Product Specification

## Mission
Responsive Engineer is an agent capability that autonomously inspects, evaluates, implements, repairs, and verifies responsive behavior in web interfaces across viewport sizes, device contexts, and content conditions.

## Scope
This project provides a methodology and executable skill instructions for AI coding agents to ensure responsive web design. It moves agents away from blind "CSS patching" towards durable architectural fixes based on a formal Responsive Contract and objective browser verification.

## Operating Modes

### 1. BUILD Mode
*   **Purpose:** Build a new interface with responsive behavior from the beginning.
*   **Behavior:** The agent understands content hierarchy, identifies responsive states, uses fluid layout techniques, avoids fixed dimensions, and verifies the implementation.

### 2. AUDIT Mode
*   **Purpose:** Inspect an existing interface without automatically modifying it.
*   **Behavior:** The agent renders at representative viewports, identifies layout failures, classifies severity, diagnoses probable causes, and produces a structured report.

### 3. REPAIR Mode
*   **Purpose:** Autonomously audit, repair, and verify the interface.
*   **Workflow:**
    1. Inspect
    2. Establish Responsive Contract
    3. Test
    4. Identify failures
    5. Diagnose root cause
    6. Plan repair
    7. Modify implementation
    8. Re-render
    9. Re-test
    10. Repeat if necessary
    11. Produce verification report

## Responsive Contract
The Responsive Contract formally describes expected behavior across viewport and content conditions. It dictates what elements should collapse, wrap, scroll intentionally, or resize. It distinguishes between intentional overflow (e.g., a data table) and unintentional failure (e.g., page-level scrolling).

## Responsive Principles
1. Content-first responsiveness.
2. Breakpoints should respond to layout failure, not device names.
3. Prefer structural fixes (flex, grid, fluid sizing) over breakpoint patches.
4. Do not fix symptoms when the layout model is wrong.
5. Preserve visual hierarchy.
6. Intentional overflow is different from accidental overflow.
7. Responsive behavior includes text scaling, content length, and interactive states.

## Repair Hierarchy
Agents must apply fixes in this order of preference:
1. Fix incorrect DOM/component structure.
2. Fix incorrect layout model.
3. Remove unnecessary fixed dimensions.
4. Correct min-width/max-width.
5. Correct flex/grid constraints.
6. Use intrinsic sizing.
7. Use fluid sizing / clamp().
8. Use container queries.
9. Introduce breakpoint state changes only when necessary.
10. Add narrowly scoped responsive rules.

## Verification Requirements
The agent must never finish after editing code without testing.
*   **Verification Gate:** RENDER -> INSPECT -> COMPARE -> PASS?
*   A default viewport matrix must be tested (e.g., 320px to 1440px).
*   Output must be a documented Verification Report detailing what passed, what was fixed, and what was intentionally left unchanged.

## Agent Portability
The core methodology is environment-agnostic. Adapters will be provided for specific agent ecosystems (Antigravity, Codex, Claude Code, Cursor, etc.).
