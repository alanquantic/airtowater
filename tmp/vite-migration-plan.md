# Migration plan: Babel-standalone HTML → Vite + React

## Current state
- `air to water/*.html` load React 18 + Babel-standalone via CDN.
- `air to water/*.jsx` files attach components to `window.*` for cross-script sharing.
- `air to water/final/index.html` is a fully static HTML manual (no JSX).
- No build pipeline, no `package.json`, no version control yet.

## Final state
- Vite 5 + React 18 SPA with `react-router-dom` v6.
- 4 routes: `/`, `/logos`, `/icosahedron`, `/final/` (static).
- Components live in `src/components/` as ES modules with `import React from 'react'` and named exports.
- Pages live in `src/pages/` and replace the inline `<script type="text/babel">` from each HTML.
- Static deliverable (`final/`) copied to `public/final/` so Vite serves it untouched.
- `vercel.json` rewrites SPA paths but lets `/final/*` and `/assets/*` resolve to real files.
- Original `air to water/` folder stays in place as legacy reference (gitignored or kept).

## Files to change / create

### New
- `package.json` — deps: react, react-dom, react-router-dom; devDeps: vite, @vitejs/plugin-react.
- `vite.config.js` — React plugin, `base: '/'`.
- `.gitignore` — node_modules, dist, .vercel, build state files.
- `vercel.json` — SPA rewrite with negative lookahead for static folders.
- `index.html` — Vite entry pointing to `/src/main.jsx`.
- `README.md` — how to run dev/build/deploy.
- `src/main.jsx` — ReactDOM.createRoot bootstrap.
- `src/App.jsx` — `<BrowserRouter>` + `<Routes>`.
- `src/styles/tokens.css` — CSS variables for the palette (shared).
- `src/styles/home.css` — landing styles.
- `src/styles/logos.css` — extracted from `airtowater logos.html`.
- `src/styles/icosahedron.css` — extracted from `airtowater icosahedron.html`.
- `src/components/DesignCanvas.jsx` — ported from `design-canvas.jsx`, exports `DesignCanvas`, `DCSection`, `DCArtboard`, `DCPostIt`.
- `src/components/Marks.jsx` — exports `UnityGlyph`, `SpiralMark`, `IcosahedronMark`, `HexapentakisMark`, `FlowDropMark`, `MonolineMark`.
- `src/components/IcosahedronMarks.jsx` — exports `IcoPrimary`, `IcoSpiral`, `IcoFilled`, `IcoDrop`, `IcoSeal`, `IcoReverse`.
- `src/components/Lockups.jsx` — exports `Wordmark`, `HorizontalLockup`, `StackedLockup`.
- `src/components/TweaksPanel.jsx` — exports `useTweaks`, `TweaksPanel`, `TweakSection`, `TweakRow`, `TweakSlider`, `TweakToggle`, `TweakRadio`, `TweakSelect`, `TweakText`, `TweakNumber`, `TweakColor`, `TweakButton`.
- `src/pages/Home.jsx` — landing with links to `/logos`, `/icosahedron`, `/final/`.
- `src/pages/Logos.jsx` — App body from `airtowater logos.html`.
- `src/pages/Icosahedron.jsx` — App body from `airtowater icosahedron.html`.
- `public/final/` — copy of `air to water/final/`.

### Migration rules
1. Replace bottom `Object.assign(window, { ... })` / `window.X = X` with `export { ... }`.
2. Add `import React from 'react'` (and `import ReactDOM from 'react-dom'` only in DesignCanvas which uses `createPortal`).
3. Replace `React.X` references with named imports where idiomatic (kept as `React.X` to minimize diff).
4. Keep `window.parent.postMessage` calls as-is — they're no-ops outside the omelette host but harmless.
5. The `fetch('./.design-canvas.state.json')` call returns 404 in production; existing `.catch(() => {})` already handles it.
6. Split inline HTML `<style>` blocks into per-page CSS files imported by the page component.

## Task checklist
- [ ] Create `tmp/` plan, `package.json`, `vite.config.js`, `.gitignore`, `vercel.json`, `index.html`.
- [ ] Port the 5 `.jsx` components to `src/components/` as ES modules.
- [ ] Build 3 page components in `src/pages/`.
- [ ] Set up routing in `src/App.jsx`.
- [ ] Copy `air to water/final/` → `public/final/`.
- [ ] Run `npm install` then `npm run dev`; verify `/`, `/logos`, `/icosahedron`, `/final/` all render.
- [ ] Run `npm run build` and verify `dist/` output.
