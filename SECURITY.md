# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.8.x   | :white_check_mark: |
| < 0.8   | :x:                |

## Reporting Vulnerabilities

If you discover a security concern or vulnerability in this repository, please report it via private vulnerability reporting on GitHub or by contacting the maintainer directly at `omitunde0710@gmail.com`.

Please do not open public issues for sensitive security matters.

## Agent Safety Constraints

Responsive Engineer runs inside AI coding agent workspaces. The skill instructions enforce safe execution boundaries:
- DOM and stylesheet modifications are scoped strictly to responsive layout properties.
- Automated browser testing is executed locally via headless Playwright without transmitting code to external services.
