# Contributing to Responsive Engineer

Thank you for your interest in contributing to Responsive Engineer! This framework is designed to give AI coding agents and human engineers an objective methodology for responsive auditing, repairs, and verification.

## Development Principles

1. **Mandatory 320px Stress Testing**: All mobile audits and synthetic tests must validate against 320px × 568px.
2. **Root Cause Analysis**: Prioritize removing excessive padding and margins before altering typography or hiding overflow.
3. **Intentionality**: Distinguish between intentional scroll areas (e.g. data tables) and accidental document-level blowouts.
4. **Preserve Desktop Fidelity**: Mobile optimizations must not degrade desktop layouts at 1024px+.

## How to Contribute

- **Agent Skill Improvements**: Update `responsive-engineer/SKILL.md` and associated references in `responsive-engineer/references/`.
- **Synthetic Benchmarks**: Add new failure modes and test cases under `benchmarks/`.
- **Agent Platform Adapters**: Enhance compatibility guides under `adapters/` for different AI coding agents.
- **Real-World Trials**: Submit empirical validation runs under `reports/`.

## Running Benchmarks

```bash
# Run baseline verification
npm test

# Run advanced multi-viewport runner
npm run test:advanced
```

## Pull Request Guidelines

1. Ensure all benchmarks pass cleanly at 320px and 1024px.
2. Follow semantic commit messages (`feat:`, `fix:`, `docs:`, `chore:`, `test:`).
3. Update `CHANGELOG.md` when introducing new features or breaking changes.
