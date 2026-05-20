// Manifest of PDFs surfaced on the /pdfs page.
//
// To add a new PDF:
//   1. Drop the file in `public/pdfs/<filename>.pdf`.
//   2. Append an entry below with `file: '/pdfs/<filename>.pdf'`.
//
// Filename convention: kebab-case, lowercase, ASCII only (no spaces, no `+`,
// no accents). This avoids URL-encoding edge cases on static hosts (Vercel
// decodes `+` as space → 404 for raw `+` in paths).
//
// `cover` selects which icosahedron variant decorates the card:
// 'primary' | 'spiral' | 'seal' | 'drop' | 'filled'.

const PDFS = [
  // ── Company / overview ────────────────────────────────────────────────
  {
    id: 'watergen-company-profile',
    eyebrow: 'Overview · Company',
    title: 'Watergen Company Profile',
    description:
      'Visión general de Watergen, la tecnología de agua del aire y su impacto global.',
    file: '/pdfs/watergen-company-profile.pdf',
    cover: 'primary',
  },
  {
    id: 'evolution-genny-plus',
    eyebrow: 'Tecnología · GENNY+',
    title: 'The Evolution of Watergen Technology',
    description:
      'Historia técnica del sistema GENNY+ y la evolución de la tecnología air-to-water.',
    file: '/pdfs/evolution-of-watergen-technology-genny-plus.pdf',
    cover: 'spiral',
  },

  // ── GEN-M Pro ─────────────────────────────────────────────────────────
  {
    id: 'gen-m-pro-brochure',
    eyebrow: 'GEN-M Pro · Brochure',
    title: 'GEN-M Pro · Brochure',
    description:
      'Folleto comercial del modelo GEN-M Pro: capacidad, casos de uso y escala industrial.',
    file: '/pdfs/gen-m-pro-brochure.pdf',
    cover: 'primary',
  },
  {
    id: 'gen-m-pro-spec',
    eyebrow: 'GEN-M Pro · Spec',
    title: 'GEN-M Pro · Specification',
    description:
      'Hoja técnica detallada del GEN-M Pro: dimensiones, consumo, condiciones operativas.',
    file: '/pdfs/gen-m-pro-spec.pdf',
    cover: 'seal',
  },
  {
    id: 'gen-m-pro-performance',
    eyebrow: 'GEN-M Pro · Performance',
    title: 'GEN-M Pro · Performance',
    description:
      'Curvas de rendimiento del GEN-M Pro frente a temperatura y humedad relativa.',
    file: '/pdfs/gen-m-pro-performance.pdf',
    cover: 'filled',
  },

  // ── GEN-L ─────────────────────────────────────────────────────────────
  {
    id: 'gen-l-brochure',
    eyebrow: 'GEN-L · Brochure',
    title: 'GEN-L · Brochure',
    description: 'Folleto comercial del GEN-L para aplicaciones de gran escala.',
    file: '/pdfs/gen-l-brochure.pdf',
    cover: 'primary',
  },
  {
    id: 'gen-l-spec',
    eyebrow: 'GEN-L · Spec',
    title: 'GEN-L · Specification',
    description:
      'Hoja técnica del GEN-L: especificaciones eléctricas, hidráulicas y de instalación.',
    file: '/pdfs/gen-l-spec.pdf',
    cover: 'seal',
  },
  {
    id: 'gen-l-performance',
    eyebrow: 'GEN-L · Performance',
    title: 'GEN-L · Performance',
    description: 'Curvas de rendimiento del GEN-L bajo distintas condiciones climáticas.',
    file: '/pdfs/gen-l-performance.pdf',
    cover: 'filled',
  },

  // ── GEN-M1 ────────────────────────────────────────────────────────────
  {
    id: 'gen-m1-brochure',
    eyebrow: 'GEN-M1 · Brochure',
    title: 'GEN-M1 · Brochure',
    description:
      'Folleto del modelo GEN-M1, generación versátil para aplicaciones medianas.',
    file: '/pdfs/gen-m1-brochure.pdf',
    cover: 'primary',
  },
  {
    id: 'gen-m1-spec',
    eyebrow: 'GEN-M1 · Spec',
    title: 'GEN-M1 · Specification',
    description: 'Hoja técnica del GEN-M1 con todos los parámetros de operación.',
    file: '/pdfs/gen-m1-spec.pdf',
    cover: 'seal',
  },

  // ── GENNY+ ────────────────────────────────────────────────────────────
  {
    id: 'genny-plus-spec',
    eyebrow: 'GENNY+ · Spec',
    title: 'GENNY+ · Specification',
    description:
      'Hoja técnica del GENNY+, generador residencial de agua atmosférica.',
    file: '/pdfs/genny-plus-spec.pdf',
    cover: 'drop',
  },

  // ── Comercial ─────────────────────────────────────────────────────────
  {
    id: 'distributor-pricelist',
    eyebrow: 'Comercial · Pricelist',
    title: 'Distributor Pricelist',
    description:
      'Lista de precios para distribuidores autorizados y condiciones comerciales.',
    file: '/pdfs/watergen-distributor-pricelist.pdf',
    cover: 'spiral',
  },
];

export { PDFS };
