# Iframe Containment Benchmark

## Initial Broken State
A third-party map or widget iframe is embedded with fixed dimensions `width="800"`.
We cannot modify the HTML inside the iframe.

## Responsive Contract
*   The iframe should scale or be contained without blowing out the page.

## Expected Repairs
- Add `max-width: 100%;` to the iframe.
