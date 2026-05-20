// SVG logo marks for airtowater.mx
// All marks live in a 200x200 viewBox unless noted. Use `color` prop for primary stroke.

const PHI = 1.6180339887;
const GOLDEN_ANGLE = 137.50776; // degrees

// ----- Unity glyph: circle / square / triangle nested -----
const UnityGlyph = ({ size = 40, stroke = "currentColor", sw = 1 }) => (
  <svg width={size} height={size} viewBox="-50 -50 100 100" fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round">
    <circle r="40" />
    <rect x="-28.28" y="-28.28" width="56.56" height="56.56" />
    <polygon points="0,-32 27.71,16 -27.71,16" />
    <circle r="3" fill={stroke} stroke="none" />
  </svg>
);

// ----- Spiral genesis: air→water phi spiral with 9 spokes + unity center -----
const SpiralMark = ({ size = 220, air = "#a9c4d4", water = "#1d3a5f", accent = "#b8954a", bg = "transparent" }) => {
  // Phi spiral sampled
  const turns = 1.37;
  const steps = 220;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const theta = t * turns * Math.PI * 2;
    const r = 4 * Math.pow(PHI, theta / (Math.PI / 2)) * 0.55;
    pts.push([Math.cos(theta) * r, Math.sin(theta) * r]);
  }
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");

  // 9 radial spokes at golden angle increments
  const spokes = Array.from({ length: 9 }, (_, i) => i * GOLDEN_ANGLE);

  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" fill="none">
      {bg !== "transparent" && <rect x="-100" y="-100" width="200" height="200" fill={bg} />}
      {/* outer mandala ring */}
      <circle r="92" stroke={air} strokeWidth="0.5" opacity="0.6" />
      <circle r="80" stroke={air} strokeWidth="0.3" opacity="0.4" />
      {/* 9 spokes */}
      {spokes.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const x1 = Math.cos(rad) * 26;
        const y1 = Math.sin(rad) * 26;
        const x2 = Math.cos(rad) * 86;
        const y2 = Math.sin(rad) * 86;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={air} strokeWidth="0.4" opacity={0.45 + (i / 9) * 0.45} />;
      })}
      {/* air half of spiral - thin */}
      <path d={path} stroke={air} strokeWidth="0.8" transform="rotate(-90)" />
      {/* water spiral - mirrored, thicker, flowing */}
      <path d={path} stroke={water} strokeWidth="2.2" strokeLinecap="round" transform="rotate(90) scale(1,-1)" />
      {/* center unity glyph */}
      <g>
        <circle r="18" stroke={water} strokeWidth="1" />
        <rect x="-12.73" y="-12.73" width="25.46" height="25.46" stroke={water} strokeWidth="0.8" />
        <polygon points="0,-14.4 12.47,7.2 -12.47,7.2" stroke={water} strokeWidth="0.8" />
        <circle r="1.8" fill={accent} />
      </g>
    </svg>
  );
};

// ----- Icosahedron mark: flat projection of 20-face polyhedron -----
const IcosahedronMark = ({ size = 220, stroke = "#1d3a5f", fill = "none", accent = "#b8954a", inner = "#4a7a9a" }) => {
  // Top-down icosahedron projection: pentagon outer, pentagon inner (rotated 36°), center point
  const R = 78; // outer pentagon radius
  const r = 42; // inner pentagon radius
  const outer = Array.from({ length: 5 }, (_, i) => {
    const a = (-Math.PI / 2) + (i * 2 * Math.PI) / 5;
    return [Math.cos(a) * R, Math.sin(a) * R];
  });
  const inner_pts = Array.from({ length: 5 }, (_, i) => {
    const a = (-Math.PI / 2) + Math.PI / 5 + (i * 2 * Math.PI) / 5;
    return [Math.cos(a) * r, Math.sin(a) * r];
  });

  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" fill={fill} stroke={stroke} strokeWidth="1" strokeLinejoin="round">
      {/* outer pentagon connections */}
      <polygon points={outer.map(p => p.join(",")).join(" ")} strokeWidth="1.2" />
      {/* inner pentagon */}
      <polygon points={inner_pts.map(p => p.join(",")).join(" ")} stroke={inner} strokeWidth="0.8" />
      {/* connect outer points to two nearest inner points (icosahedron edges) */}
      {outer.map((o, i) => {
        const a = inner_pts[i];
        const b = inner_pts[(i + 4) % 5];
        return (
          <g key={i}>
            <line x1={o[0]} y1={o[1]} x2={a[0]} y2={a[1]} stroke={inner} strokeWidth="0.7" />
            <line x1={o[0]} y1={o[1]} x2={b[0]} y2={b[1]} stroke={inner} strokeWidth="0.7" />
            {/* center spoke */}
            <line x1={o[0]} y1={o[1]} x2="0" y2="0" stroke={inner} strokeWidth="0.3" opacity="0.4" />
          </g>
        );
      })}
      {/* center water-drop hint */}
      <circle r="14" stroke={stroke} strokeWidth="0.8" fill="none" />
      <circle r="3.2" fill={accent} stroke="none" />
    </svg>
  );
};

// ----- Hexapentakis mandala: 60-fold harmonic radial -----
const HexapentakisMark = ({ size = 220, stroke = "#1d3a5f", accent = "#b8954a", mid = "#4a8c7a" }) => {
  // Pentakis dodecahedron projected as 60 triangular facets — render as radial harmonic flower
  const rays = 30; // half of 60 for visual density
  const inner = 22;
  const mid_r = 58;
  const outer = 88;

  const lines = [];
  for (let i = 0; i < rays; i++) {
    const a = (i * 2 * Math.PI) / rays;
    const a2 = ((i + 0.5) * 2 * Math.PI) / rays;
    const x1 = Math.cos(a) * inner, y1 = Math.sin(a) * inner;
    const x2 = Math.cos(a) * outer, y2 = Math.sin(a) * outer;
    const mx = Math.cos(a2) * mid_r, my = Math.sin(a2) * mid_r;
    lines.push({ x1, y1, x2, y2, mx, my });
  }

  // 5-petal phi rosette overlay
  const petals = [];
  for (let i = 0; i < 5; i++) {
    const a = (-Math.PI / 2) + (i * 2 * Math.PI) / 5;
    petals.push([Math.cos(a) * mid_r * 0.78, Math.sin(a) * mid_r * 0.78]);
  }

  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" fill="none">
      <circle r="92" stroke={stroke} strokeWidth="0.4" opacity="0.5" />
      <circle r={outer} stroke={stroke} strokeWidth="0.5" />
      <circle r={mid_r} stroke={mid} strokeWidth="0.5" opacity="0.6" />
      <circle r={inner} stroke={stroke} strokeWidth="0.8" />
      {/* triangular facets */}
      {lines.map((l, i) => (
        <g key={i}>
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={mid} strokeWidth="0.4" opacity="0.7" />
          <line x1={l.x1} y1={l.y1} x2={l.mx} y2={l.my} stroke={stroke} strokeWidth="0.35" opacity="0.55" />
          <line x1={l.x2} y1={l.y2} x2={l.mx} y2={l.my} stroke={stroke} strokeWidth="0.35" opacity="0.55" />
        </g>
      ))}
      {/* 5-petal phi rosette */}
      {petals.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="14" stroke={accent} strokeWidth="0.6" opacity="0.7" />
      ))}
      {/* center triangle */}
      <polygon points="0,-12 10.39,6 -10.39,6" stroke={stroke} strokeWidth="0.9" />
      <circle r="2" fill={accent} />
    </svg>
  );
};

// ----- Flow drop: water-drop silhouette filled with sacred geometry -----
const FlowDropMark = ({ size = 220, stroke = "#1d3a5f", accent = "#b8954a", water = "#3a6a8a" }) => {
  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" fill="none">
      <defs>
        <clipPath id="drop-clip">
          <path d="M0,-78 C28,-40 56,-8 56,28 C56,58 28,78 0,78 C-28,78 -56,58 -56,28 C-56,-8 -28,-40 0,-78 Z" />
        </clipPath>
      </defs>
      {/* drop outline */}
      <path d="M0,-78 C28,-40 56,-8 56,28 C56,58 28,78 0,78 C-28,78 -56,58 -56,28 C-56,-8 -28,-40 0,-78 Z"
            stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
      <g clipPath="url(#drop-clip)">
        {/* phi spiral inside drop */}
        {(() => {
          const pts = [];
          const turns = 1.37;
          for (let i = 0; i <= 200; i++) {
            const t = i / 200;
            const theta = t * turns * Math.PI * 2;
            const r = 4 * Math.pow(PHI, theta / (Math.PI / 2)) * 0.45;
            pts.push([Math.cos(theta) * r, Math.sin(theta) * r + 10]);
          }
          const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
          return <path d={d} stroke={water} strokeWidth="1" />;
        })()}
        {/* radial harmonic lines */}
        {Array.from({ length: 9 }, (_, i) => {
          const a = (i * GOLDEN_ANGLE * Math.PI) / 180;
          return <line key={i} x1="0" y1="10" x2={Math.cos(a) * 90} y2={Math.sin(a) * 90 + 10} stroke={water} strokeWidth="0.3" opacity="0.5" />;
        })}
        {/* nested triangle */}
        <polygon points="0,-20 17.32,10 -17.32,10" transform="translate(0,10)" stroke={stroke} strokeWidth="0.8" />
      </g>
      <circle cx="0" cy="10" r="2.2" fill={accent} />
    </svg>
  );
};

// ----- Monoline minimal: single-weight spiral mark -----
const MonolineMark = ({ size = 220, stroke = "#1d3a5f", accent = "#b8954a" }) => {
  const turns = 1.37;
  const pts = [];
  for (let i = 0; i <= 240; i++) {
    const t = i / 240;
    const theta = t * turns * Math.PI * 2;
    const r = 3.5 * Math.pow(PHI, theta / (Math.PI / 2)) * 0.55;
    pts.push([Math.cos(theta) * r, Math.sin(theta) * r]);
  }
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");

  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" fill="none" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle r="86" />
      <path d={d} transform="rotate(45)" />
      <circle r="20" />
      <polygon points="0,-14 12.12,7 -12.12,7" strokeWidth="1" />
      <circle r="2.2" fill={accent} stroke="none" />
    </svg>
  );
};

window.UnityGlyph = UnityGlyph;
window.SpiralMark = SpiralMark;
window.IcosahedronMark = IcosahedronMark;
window.HexapentakisMark = HexapentakisMark;
window.FlowDropMark = FlowDropMark;
window.MonolineMark = MonolineMark;
