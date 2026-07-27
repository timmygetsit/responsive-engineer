# Antigravity Integration

Antigravity natively supports agent tools like `browser_subagent` and `run_command`.

## Installation
1. Move the `skill` directory contents into `.gemini/skills/responsive-engineer/`.
2. Antigravity will auto-discover the `SKILL.md`.

## Execution
When prompted for responsive work, Antigravity should prioritize the `browser_subagent` to visibly inspect layout overflow and then run the internal loop. It should also use `run_command` with Playwright (if available) to programmatically verify bounds.
