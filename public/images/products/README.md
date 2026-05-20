# Product photography

Drop product photos here using these exact filenames so the landing picks them up automatically:

- `genny-plus.jpg` — GENNY+ (residencial)
- `gen-m1.jpg` — GEN-M1 (comercial)
- `gen-m-pro.jpg` — GEN-M Pro (profesional)
- `gen-l.jpg` — GEN-L (industrial)

If a file is missing the card falls back to a stylized icosahedron cover, so the landing always renders cleanly. Update the filenames or paths in `src/data/products.js` if you prefer different conventions.

Recommended specs:
- Aspect ratio close to 4:3 (the cover area is `aspect-ratio: 4/3`).
- Width ≥ 1200 px for sharp display on retina screens.
- Format: JPG (smaller) or WebP (best quality/size). PNG works too if transparent backgrounds matter.
