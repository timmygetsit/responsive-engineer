# Responsive Engineer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-v0.8.0-emerald.svg)](CHANGELOG.md)
[![Playwright Verified](https://img.shields.io/badge/Playwright-Automated_Verification-brightgreen.svg)](benchmarks/)
[![Mandatory 320px](https://img.shields.io/badge/Stress_Test-320px_Mandatory-orange.svg)](responsive-engineer/SKILL.md)
[![Agent Compatibility](https://img.shields.io/badge/Agents-Claude_Code_|_Antigravity_|_Cursor_|_Codex-purple.svg)](adapters/)

**Responsive Engineer** is an autonomous AI agent capability and universal audit framework for inspecting, evaluating, and repairing responsive web interfaces.

Rather than applying fragile breakpoint patches, shrinking fonts to unreadable sizes, or slapping `overflow-x: hidden` onto `body`, Responsive Engineer equips AI coding agents with a formal verification loop: discovering intended layout behavior, stress-testing against narrow viewports (mandating 320px), analyzing usable width chains, and verifying durable architectural fixes with automated browser testing.

---

## Table of Contents

- [The Core Problem](#the-core-problem)
- [The Responsive Principle & Width Chain](#the-responsive-principle--width-chain)
- [Operating Modes](#operating-modes)
- [Mandatory 320px Stress Test](#mandatory-320px-stress-test)
- [Universal Audit Categories](#universal-audit-categories)
- [The 8-Step Decision Hierarchy](#the-8-step-decision-hierarchy)
- [Agent Platform Adapters](#agent-platform-adapters)
- [Synthetic Benchmarks & Verification](#synthetic-benchmarks--verification)
- [Repository Structure](#repository-structure)
- [Contributing & License](#contributing--license)

---

## The Core Problem

When traditional AI coding assistants attempt to fix mobile layout issues, they frequently commit predictable anti-patterns:

1. **Band-Aid Overflow Hiding**: Adding `overflow-x: hidden` to `body` or container wrappers, which hides horizontal scrollbars while leaving content permanently clipped off-screen.
2. **Aggressive Font Shrinkage**: Shrinking typography to microscopic sizes (e.g. 9px) to force elements into cramped horizontal rows rather than restructuring layout flow.
3. **Fragile Breakpoint Proliferation**: Injecting arbitrary `@media (max-width: 412px)` patches that break on the next device dimension or cause regressions on desktop viewports.
4. **Nested Padding Starvation**: Allowing parent containers, sections, and inner cards to compound horizontal padding until the usable content width drops to near zero.

Responsive Engineer replaces this guesswork with an objective, contract-driven engineering discipline.

---

## The Responsive Principle & Width Chain

Responsive layout optimization focuses on the complete horizontal space chain:

$$\text{Viewport} \longrightarrow \text{Page Gutter} \longrightarrow \text{Container Padding} \longrightarrow \text{Card Padding} \longrightarrow \text{Usable Content Area} \longrightarrow \text{Readable Typography}$$

A layout is not responsive merely because it avoids horizontal scroll. A view with zero horizontal overflow is still broken if excessive gutters compress the readable content into an unreadable 120px column.

### Content Density Guardrail

Reclaiming wasted space must never turn into content compression. Responsive Engineer enforces:
- Maintain accessible touch targets ($\ge 44 \times 44\text{px}$).
- Preserve visual hierarchy and component boundaries.
- Reduce spacing only when it is excessive, redundant, or causing content starvation.

---

## Operating Modes

| Mode | Name | Description |
| :--- | :--- | :--- |
| **Mode A** | **Known Bug Repair** | Targeted debugging: Reproduce a reported symptom at a specific breakpoint, trace root cause, apply structural repair, and regression-test. |
| **Mode B** | **Open-Ended Audit** | Single component or page audit: Stress-test across the standard viewport matrix, classify defect severity (P0–P4), and formulate a remediation plan. |
| **Mode C** | **Full-Site Audit & Repair** | Autonomous production workflow: `DISCOVER → INVENTORY → RECONSTRUCT CONTRACT → MAP ROUTES → MAP SHARED COMPONENTS → AUDIT VIEWPORTS → CLASSIFY → PRIORITIZE → REPAIR → VERIFY → REGRESSION TEST → REPORT`. |

---

## Mandatory 320px Stress Test

Every audit mandates evaluation against the **320px × 568px** mobile stress test. If an interface remains readable, usable, and structured at 320px, it naturally scales with high resilience to larger screens.

### Standard Viewport Matrix

- **Primary Mobile Stress Test:** `320px × 568px` (Mandatory baseline)
- **Secondary Mobile Viewports:** `375px`, `390px`, `430px`
- **Tablet Viewports:** `600px`, `768px`, `834px`, `1024px`
- **Desktop Regression Baselines:** `1280px`, `1440px`, `1920px`

---

## Universal Audit Categories

Responsive Engineer classifies and evaluates layouts across six universal categories:

- **Category A — Fluid Adaptation & Grid Blowout Detection**: Width constraints, `min-width: 0` on flex/grid children, flex-basis wrapping.
- **Category B — Interaction Transformation**: Determining when desktop controls should shift to mobile patterns (drawers, action sheets) vs. remaining fluid.
- **Category C — Content & Composition Adaptation**: Calculating usable width chains and eliminating nested padding explosions.
- **Category D — Spatial Recomposition**: Transforming layouts from horizontal multi-column grids to vertical single-column stacks while preserving semantic hierarchy.
- **Category E — Mobile Input & Focus Stability**: Preventing mobile auto-zoom by enforcing $\ge 16\text{px}$ font sizes on form controls and ensuring full touch boundaries.
- **Category F — Mobile Content Utilization**: Systematic audit of whitespace efficiency to maximize readable typography.

---

## The 8-Step Decision Hierarchy

When repairing narrow-viewport layout defects, agents must follow this explicit decision sequence:

```
[1] Reduce unnecessary outer margins / page gutters
  │
  ▼
[2] Reduce unnecessary container / card padding
  │
  ▼
[3] Reduce excessive gaps between layout items
  │
  ▼
[4] Shift layout axis from horizontal to vertical (flex-direction: column)
  │
  ▼
[5] Reduce grid columns (e.g. grid-template-columns: 1fr)
  │
  ▼
[6] Enable natural wrapping on text and action clusters
  │
  ▼
[7] Moderately adjust typography scale (preserving readability)
  │
  ▼
[8] Introduce specialized mobile interaction or localized scroll container
```

---

## Agent Platform Adapters

Responsive Engineer provides adapters for popular agentic environments:

- **Google Antigravity**: Configured under `adapters/antigravity/` for native tool calling and subagent delegation.
- **Claude Code**: Setup instructions under `adapters/claude-code/` with terminal commands and Playwright verification.
- **Cursor / Windsurf**: Rules configured in `adapters/cursor/` for IDE agent workflows.
- **OpenAI Codex / CLI**: Adapter patterns in `adapters/codex/`.

---

## Synthetic Benchmarks & Verification

The repository includes a comprehensive benchmark suite covering real-world layout failures:

- `benchmarks/broken-navigation`: Over-constrained desktop menus vs. responsive drawers.
- `benchmarks/broken-table`: Distinguishing document blowout from intentional container scrolling.
- `benchmarks/broken-form`: Fixed-width inputs vs. fluid form containers.
- `benchmarks/broken-modal`: Viewport overflow in dialog overlays.
- `benchmarks/mobile-content-utilization`: Content density and usable width stress tests.
- `benchmarks/responsive-content-composition`: 10 targeted card and action toolbar benchmarks.
- `benchmarks/responsive-spatial-recomposition`: 10 structural grid collapse test cases.

### Running Verification Tests

```bash
# Install dependencies
npm install

# Run quick verification suite
npm test

# Run full multi-viewport Playwright benchmark harness
npm run test:advanced
```

---

## Repository Structure

```
responsive-engineer/
├── responsive-engineer/      # Core Agent Skill definition
│   ├── SKILL.md              # Main skill instructions (v0.8.0)
│   └── references/           # Detailed engineering references
│       ├── anti-patterns.md
│       ├── failure-taxonomy.md
│       ├── repair-strategy.md
│       ├── responsive-contract.md
│       └── responsive-navigation.md
├── adapters/                 # Agent platform adapters (Antigravity, Claude Code, etc.)
├── benchmarks/               # Synthetic test suites & Playwright runners
├── reports/                  # Benchmark runs & real-world validation trials
├── test-repos/               # Submodule fixtures for full-site audits
├── SPEC.md                   # Product specification
├── RESEARCH.md               # Empirical research & cross-agent baseline data
├── CHANGELOG.md              # Version history
└── package.json              # Top-level manifest and scripts
```

---

## Contributing & License

Contributions, new benchmark cases, and adapter configurations are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

Released under the [MIT License](LICENSE). Copyright &copy; 2026 Timmy.
