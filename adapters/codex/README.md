# OpenAI Codex / CLI Integration

## Usage

Provide the skill instructions in your context or system prompt:

```bash
codex --instruction "$(cat responsive-engineer/SKILL.md)" "Audit and fix responsive issues in src/"
```

## Recommended Workflow

1. Direct the model to run `node benchmarks/verify-all.js` to reproduce layout failures.
2. Instruct the model to follow `responsive-engineer/references/repair-strategy.md`.
3. Re-run verification commands to confirm zero horizontal overflow at 320px.
