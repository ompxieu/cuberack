> High Priority:
- Confirm all `navBillingRedirect` labels are translated and loaded from locale dictionaries.
- Add localized folder-based routes such as `/about/lang` and ensure route generation works with `getDictionary`.
- Harden locale fallback behavior for invalid or missing locale paths.
- Persist preferred language across redirects and consent flows.

> Optimization / Stability
- Keep runtime JSON validation with Zod and remove any remaining cast workarounds.
- Audit `next/image` usage across the app and optimize static assets.
- Confirm top-level layout and shared components are not re-rendering unnecessarily on locale changes.
- Improve mobile nav accessibility, focus handling, and keyboard interactions.
- Optimize page transitions and menu motion for smoother mobile/desktop UX.

> Future / Nice-to-Have
- Add unit/integration tests for locale switching, cookie consent, mobile menu behavior, and route redirects.
- Audit metadata and OG image generation for every locale.
- Extract shared design tokens for glassmorphism, spacing, colors, and animation states.
- Add route-level loading states or graceful fallback UI for slower locale dictionary loads.
- Review performance budget for homepage assets and bundle size impact.


13h until comp.