// Product line manifest — used by the landing's products section and the
// "Ver brochure" CTA on each card.
//
// `image` is optional: if the file exists in `public/images/products/`, it
// replaces the icosahedron-mark fallback inside the card cover. Drop your
// real product photography there using the filenames listed below.
//
// `cover` selects the icosahedron variant rendered as fallback when the
// image is missing: 'primary' | 'spiral' | 'seal' | 'drop' | 'filled'.
//
// Capacity numbers are aproximaciones; ajusta con las cifras exactas del
// datasheet correspondiente (linkado en `pdf`).

const PRODUCTS = [
  {
    id: 'genny-plus',
    eyebrow: 'Residencial',
    name: 'GENNY+',
    capacity: 'Hasta 30 L / día',
    summary: 'Agua pura para tu hogar directamente del aire que respiras.',
    audience: 'Hogares · oficinas pequeñas',
    features: [
      'Filtración multi-etapa con UV',
      'Operación silenciosa',
      'App de monitoreo en tiempo real',
      'Diseño elegante para interiores',
    ],
    image: '/images/products/genny-plus.jpg',
    pdf: '/pdfs/GENNY+%20Spec.pdf',
    cover: 'drop',
  },
  {
    id: 'gen-m1',
    eyebrow: 'Comercial',
    name: 'GEN-M1',
    capacity: 'Hasta 220 L / día',
    summary: 'Versátil para pequeñas empresas, oficinas y comercios.',
    audience: 'PyMEs · oficinas · comercios',
    features: [
      'Capacidad media-alta',
      'Bajo consumo energético',
      'Mantenimiento sencillo',
      'Puede operar en climas variables',
    ],
    image: '/images/products/gen-m1.jpg',
    pdf: '/pdfs/GEN-M1%20Brochure.pdf',
    cover: 'primary',
  },
  {
    id: 'gen-m-pro',
    eyebrow: 'Profesional',
    name: 'GEN-M Pro',
    capacity: 'Hasta 900 L / día',
    summary: 'Ideal para escuelas, hospitales, comunidades y proyectos medianos.',
    audience: 'Escuelas · hospitales · comunidades',
    features: [
      'Alta producción diaria',
      'Resistente para uso continuo',
      'Calidad sanitaria certificada',
      'Telemetría y diagnóstico remoto',
    ],
    image: '/images/products/gen-m-pro.jpg',
    pdf: '/pdfs/GEN-M%20Pro%20Brochure.pdf',
    cover: 'seal',
  },
  {
    id: 'gen-l',
    eyebrow: 'Industrial',
    name: 'GEN-L',
    capacity: 'Hasta 6,000 L / día',
    summary: 'Solución industrial para grandes comunidades, plantas y proyectos de infraestructura.',
    audience: 'Industria · municipios · agro',
    features: [
      'Capacidad de gran escala',
      'Modular y escalable',
      'Diseño robusto para exterior',
      'Integración con plantas de tratamiento',
    ],
    image: '/images/products/gen-l.jpg',
    pdf: '/pdfs/GEN-L-Brochure.pdf',
    cover: 'filled',
  },
];

export { PRODUCTS };
