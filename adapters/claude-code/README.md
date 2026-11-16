# Claude Code Integration

## Installation

1. Copy the `responsive-engineer/` directory into your project's `.claude/skills/responsive-engineer/` or global `~/.claude/skills/responsive-engineer/`.
2. Claude Code will load `SKILL.md` when executing responsive and UI layout tasks.

## Execution

Claude Code executes tasks via terminal commands and file modifications:
1. Run `node benchmarks/verify-all.js` to reproduce layout defects.
2. Apply structural DOM and CSS fixes according to `responsive-engineer/SKILL.md`.
3. Re-run verification commands to confirm zero horizontal overflow at 320px without desktop regressions.
