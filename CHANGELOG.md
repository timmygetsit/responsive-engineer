# Changelog - Responsive Engineer

## [v0.3-planning] - Current Phase
### Objectives
- **Real-World Evaluation:** Test the responsive repair methodology on 10-20 unfamiliar, complex open-source frontend codebases representing a mix of frameworks (React, Vue, Vanilla) and CSS strategies (Tailwind, Modules).
- **Cross-Agent Validation:** Verify skill portability across different AI agents (Antigravity, Codex, Claude Code).
- **Mode Validation:** Validate both "Known Bug Repair" (Mode A) and "Open-Ended Responsive Audit" (Mode B).
- **Error Metric Tracking:** Measure Detection Rate, Root-Cause Accuracy, Repair Success, Regression Rate, and Human-Review dependencies in unscripted environments.

## [v0.2] - 2026-07-27 (Baseline Frozen)
### Added
- Multi-layer verification loop integrating DOM geometry, accessibility checks, and visual regression tracking (`benchmark-runner.js` powered by Playwright and `pixelmatch`).
- Intermediate viewport testing to correctly map failure transition thresholds instead of standard viewport snapshots.
- New benchmark suite categories prioritizing deception and edge cases:
  - **Negative Testing:** Prevented the agent from incorrectly "repairing" intentional overflow (e.g., carousels, tables).
  - **Deceptive Overflow:** Handled implicit flexbox `min-width: auto` behaviors.
  - **Dynamic Content:** Enforced word-break containment for unbroken text strings.
  - **Accessibility Touch Targets:** Mandated strict ≥44px clickable areas on mobile.
  - **Cross-Component / Iframe / SVG:** Prevented blast-radius regressions on shared assets and handled intrinsic hard-coded sizes.
- **100-Point Scoring Matrix:** Replaced naive success/fail with graded evaluations covering Root Cause, Intentional Overflows, Minimality, Desktop Regression, and Visual Handling.

### Results
- The v0.2 methodology actively detected edge cases missed by v0.1. By incorporating touch-target padding (12px), it successfully exposed related flex container blowouts, forcing the agent to combine accessibility compliance with structural flex-wrapping.
- Scored perfectly (50/50 on all new structural tests) during final validation checks.

### Known Limitations
- The visual regression evaluation remains simplistic and heavily dependent on human/agent triage ("Expected Responsive Change" vs "Unexpected Shift").
- Hardcoded touch-target rules can collide with pre-existing design systems and complex flex architectures.

## [v0.1] - 2026-07-26
### Added
- Core agent directives for Build, Audit, and Repair scenarios.
- The "Responsive Contract" concept for layout definitions.
- The "Repair Hierarchy" prioritizing intrinsic and fluid sizing over brittle media query overrides.
- Initial failure taxonomy and geometry-first (`scrollWidth` > `innerWidth`) baseline verification script.
