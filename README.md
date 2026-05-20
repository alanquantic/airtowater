# airtowater.mx — brand system

Vite + React migration of the original Babel-standalone prototypes for the airtowater.mx brand identity (icosahedron + phi-spiral logo system).

## Stack

- React 18, React Router 6
- Vite 5
- Pure SVG marks; Marcellus + JetBrains Mono via Google Fonts

## Routes

- `/` — landing with links to every view.
- `/logos` — original logo exploration (9 marks · lockups · color treatments · applications).
- `/icosahedron` — icosahedron refinement with live tweaks panel.
- `/final/` — static brand manual (copied from `air to water/final/`).

## Local development

```bash
npm install
npm run dev
```

Opens at http://localhost:5173.

## Production build

```bash
npm run build
npm run preview
```

Output goes to `dist/`.

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel — it auto-detects the Vite preset.
3. `vercel.json` already includes the SPA rewrite (excluding `/final/*` and built `/assets/*`) so React Router routes resolve correctly while the static brand manual stays static.

## Project layout

```
.
├── index.html              Vite entry
├── public/final/           Static brand manual + SVG assets
├── src/
│   ├── main.jsx
│   ├── App.jsx             Router
│   ├── styles/             Per-page CSS
│   ├── components/         DesignCanvas, Marks, IcosahedronMarks, Lockups, TweaksPanel
│   └── pages/              Home, Logos, Icosahedron
├── air to water/           Legacy prototypes (kept as reference)
└── vercel.json             SPA rewrite for production
```

## Brand tokens

| Token  | Hex       | Use                          |
| ------ | --------- | ---------------------------- |
| Ocean  | `#1d3a5f` | primary stroke               |
| Deep   | `#0e2238` | deep background              |
| Water  | `#3a6a8a` | inner stroke                 |
| Mist   | `#a9c4d4` | air / light accent           |
| Mint   | `#4a8c7a` | flow / harmony               |
| Gold   | `#b8954a` | transcendence accent         |
| Silver | `#c9cdd2` | transcendence accent         |
| Paper  | `#f5f1e8` | warm background              |

Numerology integrated in the system: 137 · 432 · 9.
