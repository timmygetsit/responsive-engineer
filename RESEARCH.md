# Ecosystem Research

## 1. Visual Regression and Testing Tools

### Playwright
*   **Source:** Microsoft
*   **URL:** https://playwright.dev/
*   **What it does:** End-to-end testing for modern web apps. Can capture screenshots, emulate mobile devices, inspect DOM, and retrieve computed CSS.
*   **Capabilities:** Multi-viewport emulation, visual comparisons, DOM tree inspection, interaction simulation.
*   **Limitations:** Requires a testing environment and a running server. Not an AI by itself.
*   **Integration:** Responsive Engineer should use Playwright (or similar) as the verification engine to objectively test layouts.

### Percy (BrowserStack) / Applitools
*   **What they do:** Automated visual testing and review platforms.
*   **Capabilities:** Detect visual changes across builds.
*   **Limitations:** Mostly highlight visual diffs. They don't diagnose root CSS causes or fix them autonomously.
*   **Integration:** Reference their approach to visual diffing but extend it with diagnostic capabilities.

### Lighthouse / axe
*   **What they do:** Audit tools for performance, accessibility, and SEO.
*   **Integration:** Can be used alongside responsive checks to ensure fixes don't introduce accessibility regressions (e.g., tap target sizes).

## 2. AI Coding Agents and Skill Systems

### Cursor / Windsurf
*   **What they do:** AI-first code editors with agentic capabilities.
*   **Capabilities:** Cursor Rules (`.cursor/rules/*.mdc`) enforce specific workflows and design patterns.
*   **Limitations:** Relies on the user to visually test and prompt the AI when something is broken. Lack of autonomous browser verification loops built-in for responsive design out of the box.
*   **Integration:** Provide a generic adapter for `.mdc` rules that integrates our Responsive Contract methodology.

### Claude Code / Antigravity / Codex
*   **What they do:** CLI/IDE-based autonomous agent environments.
*   **Capabilities:** Can invoke shell commands, read files, edit code.
*   **Integration:** Responsive Engineer should be built as a skill for these platforms, instructing them to loop through: run tests -> analyze failures -> edit code -> verify.

## 3. Existing AI Responsive Solutions
*   **Framer AI / v0 by Vercel:** Generate responsive UI from prompts.
    *   **Limitation:** Excellent for generating *new* code, but not for diagnosing and repairing *existing* complex web applications in a codebase.
*   **Agent-Responsive Design:** Concept of optimizing sites for AI consumption.
    *   **Integration:** We focus on human-responsive design, but clean semantic HTML (which we promote) helps agents as well.

## Conclusion & Gap Analysis
Current AI agents are good at generating CSS or fixing a specific issue *when a human describes it* (e.g., "The header is overlapping on mobile"). However, there is a gap in autonomous *discovery, diagnosis, and verification*. Responsive Engineer fills this gap by formalizing a "Responsive Contract" and giving the agent the workflow to test it objectively using browser automation, rather than relying on human visual QA.
