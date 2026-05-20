// Manifest of PDFs surfaced on the /pdfs page.
//
// To add a new PDF:
//   1. Drop the file in `public/pdfs/<filename>.pdf`.
//   2. Append an entry below with `file: '/pdfs/<filename>.pdf'`.
//      Spaces in filenames must be URL-encoded as `%20` so the iframe and
//      the download link resolve correctly.
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
    file: '/pdfs/Watergen%20Company%20Profile.pdf',
    cover: 'primary',
  },
  {
    id: 'evolution-genny-plus',
    eyebrow: 'Tecnología · GENNY+',
    title: 'The Evolution of Watergen Technology',
    description:
      'Historia técnica del sistema GENNY+ y la evolución de la tecnología air-to-water.',
    file: '/pdfs/The%20Evolution%20of%20Watergen%20Technology%20GENNY+.pdf',
    cover: 'spiral',
  },

  // ── GEN-M Pro ─────────────────────────────────────────────────────────
  {
    id: 'gen-m-pro-brochure',
    eyebrow: 'GEN-M Pro · Brochure',
    title: 'GEN-M Pro · Brochure',
    description:
      'Folleto comercial del modelo GEN-M Pro: capacidad, casos de uso y escala industrial.',
    file: '/pdfs/GEN-M%20Pro%20Brochure.pdf',
    cover: 'primary',
  },
  {
    id: 'gen-m-pro-spec',
    eyebrow: 'GEN-M Pro · Spec',
    title: 'GEN-M Pro · Specification',
    description:
      'Hoja técnica detallada del GEN-M Pro: dimensiones, consumo, condiciones operativas.',
    file: '/pdfs/Watergen%20GEN-M%20Pro%20Spec.pdf',
    cover: 'seal',
  },
  {
    id: 'gen-m-pro-performance',
    eyebrow: 'GEN-M Pro · Performance',
    title: 'GEN-M Pro · Performance',
    description:
      'Curvas de rendimiento del GEN-M Pro frente a temperatura y humedad relativa.',
    file: '/pdfs/Gen%20M%20Pro%20Performance.pdf',
    cover: 'filled',
  },

  // ── GEN-L ─────────────────────────────────────────────────────────────
  {
    id: 'gen-l-brochure',
    eyebrow: 'GEN-L · Brochure',
    title: 'GEN-L · Brochure',
    description: 'Folleto comercial del GEN-L para aplicaciones de gran escala.',
    file: '/pdfs/GEN-L-Brochure.pdf',
    cover: 'primary',
  },
  {
    id: 'gen-l-spec',
    eyebrow: 'GEN-L · Spec',
    title: 'GEN-L · Specification',
    description:
      'Hoja técnica del GEN-L: especificaciones eléctricas, hidráulicas y de instalación.',
    file: '/pdfs/Watergen%20GEN-L%20Spec.pdf',
    cover: 'seal',
  },
  {
    id: 'gen-l-performance',
    eyebrow: 'GEN-L · Performance',
    title: 'GEN-L · Performance',
    description: 'Curvas de rendimiento del GEN-L bajo distintas condiciones climáticas.',
    file: '/pdfs/GEN-L%20Performance.pdf',
    cover: 'filled',
  },

  // ── GEN-M1 ────────────────────────────────────────────────────────────
  {
    id: 'gen-m1-brochure',
    eyebrow: 'GEN-M1 · Brochure',
    title: 'GEN-M1 · Brochure',
    description:
      'Folleto del modelo GEN-M1, generación versátil para aplicaciones medianas.',
    file: '/pdfs/GEN-M1%20Brochure.pdf',
    cover: 'primary',
  },
  {
    id: 'gen-m1-spec',
    eyebrow: 'GEN-M1 · Spec',
    title: 'GEN-M1 · Specification',
    description: 'Hoja técnica del GEN-M1 con todos los parámetros de operación.',
    file: '/pdfs/Watergen%20GEN-M1%20Spec.pdf',
    cover: 'seal',
  },

  // ── GENNY+ ────────────────────────────────────────────────────────────
  {
    id: 'genny-plus-spec',
    eyebrow: 'GENNY+ · Spec',
    title: 'GENNY+ · Specification',
    description:
      'Hoja técnica del GENNY+, generador residencial de agua atmosférica.',
    file: '/pdfs/GENNY+%20Spec.pdf',
    cover: 'drop',
  },

  // ── Comercial ─────────────────────────────────────────────────────────
  {
    id: 'distributor-pricelist',
    eyebrow: 'Comercial · Pricelist',
    title: 'Distributor Pricelist',
    description:
      'Lista de precios para distribuidores autorizados y condiciones comerciales.',
    file: '/pdfs/Watergen%20Distributor%20Pricelist.pdf',
    cover: 'spiral',
  },
];

export { PDFS };
