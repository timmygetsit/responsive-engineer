# Dynamic Content Benchmark

## Initial Broken State
A user profile card is displayed with standard padding and a fixed aspect ratio. However, a user with a very long email address (`user.name.with.very.long.email.address@some-extremely-long-subdomain.com`) registers. 
This long string lacks whitespace, so the browser doesn't know where to break it.

## Responsive Contract
*   The profile card should not exceed 100% of the viewport width.
*   Text should break gracefully.
*   No horizontal scroll.

## Expected Repairs
- Add `overflow-wrap: anywhere;` or `word-break: break-all;` to the text container or email element.
