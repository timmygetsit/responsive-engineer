# Cursor Integration

## Installation

1. Copy the `responsive-engineer` directory into your project's `.cursor/rules/` or reference it directly in `.cursorrules`.
2. Add the following rule snippet to your `.cursorrules`:

```markdown
# Responsive Engineering
Always adhere to the Responsive Engineer principles defined in `responsive-engineer/SKILL.md`.
- Strictly enforce the 320px x 568px mobile stress test.
- Follow the 8-step Responsive Decision Hierarchy before modifying typography.
- Never use `overflow-x: hidden` on body or top-level containers to mask layout overflow.
```

## Verification

Run Playwright verification in the integrated terminal:
```bash
npm test
```
