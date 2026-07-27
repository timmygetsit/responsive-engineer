# Negative Test Benchmark

## Initial State
This layout features a horizontally scrollable carousel and a code block. 
Both components have **intentional, localized horizontal overflow**. 

## Responsive Contract
*   The page-level document body MUST NOT scroll horizontally at any viewport width.
*   The carousel and code block MUST retain their internal horizontal scrollability.
*   Agents must NOT apply `overflow-x: hidden` to the body or force text wrapping on the code block that breaks its preformatted nature.

## Verification
This is a negative test. A successful "repair" means leaving these components alone while ensuring the page wrapper doesn't overflow.
