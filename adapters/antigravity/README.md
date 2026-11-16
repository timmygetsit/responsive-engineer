# Antigravity Integration

Antigravity natively supports agent tools like `browser_subagent` and `run_command`.

## Installation

1. Copy the `responsive-engineer/` directory into `.gemini/skills/responsive-engineer/`.
2. Antigravity will automatically discover the `SKILL.md` frontmatter and trigger it when responsive tasks arise.

## Execution

When prompted for responsive work, Antigravity should:
1. Inspect layout overflow using `browser_subagent` or Playwright runner scripts via `run_command`.
2. Follow the 8-step Responsive Decision Hierarchy in `responsive-engineer/SKILL.md`.
3. Verify fixes at 320px, 768px, and 1024px+ using `node benchmarks/verify-all.js`.
