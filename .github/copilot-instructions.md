# Copilot / AI agent instructions for Buddiz

This file contains concise, actionable guidance for AI coding agents working in this repository.

- Project type: Next.js (App Router) using `src/app` layout and client components.
- Key files:
  - `package.json` — scripts: `npm run dev` (uses `next dev --turbopack`), `build`, `start`.
  - `src/app/layout.js` — global layout, imports `globals.css`, `Navbar`, `I18nProvider`.
  - `src/app/globals.css` — global CSS; uses Tailwind via `@tailwind base/components/utilities` (project currently on Tailwind v3 in deps).
  - `tailwind.config.js` — custom colors live here (see `main_bordeau`, `main_rose`), ensure `content` paths include `src/components` and `src/app`.
  - `postcss.config.mjs` — PostCSS plugins configuration.
  - `src/components/*` — reusable UI components (Navbar, Button, I18nProvider).
  - `src/i18n.js` — i18n initialization (imported by client provider).

Essential context and architecture
- App Router: routing is file-system based under `src/app`. Each folder with a `page.js` is a route (e.g. `src/app/profile/page.js` → `/profile`).
- i18n: `react-i18next` + `i18next` used. `I18nProvider` is a very small client wrapper that simply imports `../i18n` and returns children — translation keys live under `public/locales/{en,fr}/translation.json`.
- Leaflet map is used in `src/app/page.js` and imported as a client-only dependency (dynamic import pattern required due to `window`-dependency).
- PWA: `next-pwa` is configured in `next.config.js` — service worker and manifest appear under `public/`.

Build / dev / troubleshooting notes (project-specific)
- Development uses Turbopack by default: `npm run dev` runs `next dev --turbopack`. Turbopack may require `@tailwindcss/postcss` plugin for Tailwind v4; the repository currently pins Tailwind v3 in `devDependencies` but you may see `@tailwindcss/postcss` installed. If you hit PostCSS plugin errors, prefer using `tailwindcss: {}` in `postcss.config.mjs` for Tailwind v3, or install `@tailwindcss/postcss` for Turbopack/Tailwind v4.
- When swapping Tailwind versions, ensure `globals.css` lines match the installed Tailwind version (`@tailwind base/components/utilities` for v3; v4 uses `@import "tailwindcss/preflight"` and `@import "tailwindcss/utilities"`).
- Common caching issues: remove `.next` and `node_modules` then `npm install` if you encounter locked/strange build artifacts. On Windows, ensure Node processes are stopped (taskkill /F /IM node.exe) before removing `node_modules`.

Conventions & patterns to follow
- Styling: Tailwind utility classes used across components. Custom palette is defined in `tailwind.config.js` under `theme.extend.colors`. Use kebab or simple names (avoid unusual characters) — e.g. `bg-main-bordeau` or `bg-mainbordeau` (project currently used `bg-main_bordeau` in components; if classes don't generate, check `tailwind.config.js` keys and `content` paths).
- Client vs Server components: files that use browser-only APIs must be client components (add `"use client"`; examples: `Navbar.js`, map components). Imports of browser-dependent libraries (leaflet) should be dynamically imported inside `useEffect` to avoid server-side `window` errors.
- i18n: use `t("key")` from `react-i18next` inside client components; translation JSONs live in `public/locales`.

Where to look for changes and tests
- No unit tests found in repository. Focus on manual verification by running `npm run dev` and visiting pages.
- For UI changes, inspect `src/components` and `src/app/*` routes.

Examples & snippets (from repo)
- Navbar color example: `<nav className="flex items-center justify-between p-4 bg-main_bordeau text-white">` — if this class renders white or not at all, check `tailwind.config.js` for the `main_bordeau` entry and ensure `content` includes `src/components`.
- Leaflet dynamic import pattern (use inside `useEffect`):
  ```js
  useEffect(() => {
    import('leaflet').then(L => { /* create map */ });
  }, []);
  ```

Safety & limits
- Do not modify `package.json` scripts without confirming with the maintainer; Turbopack is enabled intentionally.
- Avoid large dependency upgrades without running a full dev build and verifying PWA/service-worker behavior.

If anything above is unclear or you'd like agent rules tightened (e.g., tests to run, files to avoid), tell me which areas to expand and I'll update this file.
