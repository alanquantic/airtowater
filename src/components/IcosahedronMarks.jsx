// Refined Icosahedron marks for airtowater.mx
// Vertex-first projection: pentagonal symmetry — the most elegant sacred-geometry view
// of the Platonic water solid (20 faces).

import React from 'react';

const PHI_ICO = 1.6180339887;
const GA = 137.50776; // golden angle in degrees

// Compute vertex positions for vertex-first icosahedron projection
const icoVerts = (Router, Rinner) => {
  const outer = Array.from({ length: 5 }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return [Math.cos(a) * Router, Math.sin(a) * Router];
  });
  const inner = Array.from({ length: 5 }, (_, i) => {
    const a = -Math.PI / 2 + Math.PI / 5 + (i * 2 * Math.PI) / 5;
    return [Math.cos(a) * Rinner, Math.sin(a) * Rinner];
  });
  return { outer, inner };
};

// ---------- 01 — Primary refined icosahedron ----------
const IcoPrimary = ({ size = 240, stroke = "#1d3a5f", accent = "#b8954a", inner = "#3a6a8a", sw = 2.4 }) => {
  // True icosahedron vertex-first ratio: inner/outer = 1/phi
  const Router = 82;
  const Rinner = Router / PHI_ICO; // ≈ 50.68
  const { outer, inner: innerPts } = icoVerts(Router, Rinner);

  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round">
      {outer.map((p, i) => {
        const next = outer[(i + 1) % 5];
        return <line key={`o${i}`} x1={p[0]} y1={p[1]} x2={next[0]} y2={next[1]} />;
      })}
      {innerPts.map((p, i) => {
        const next = innerPts[(i + 1) % 5];
        return <line key={`i${i}`} x1={p[0]} y1={p[1]} x2={next[0]} y2={next[1]} stroke={inner} strokeWidth={sw * 0.85} />;
      })}
      {outer.map((o, i) => {
        const a = innerPts[i];
        const b = innerPts[(i + 4) % 5];
        return (
          <g key={`e${i}`} stroke={inner} strokeWidth={sw * 0.78}>
            <line x1={o[0]} y1={o[1]} x2={a[0]} y2={a[1]} />
            <line x1={o[0]} y1={o[1]} x2={b[0]} y2={b[1]} />
          </g>
        );
      })}
      <circle r="4" fill={accent} stroke="none" />
    </svg>
  );
};

// ---------- 02 — Icosahedron with phi spiral inscribed ----------
const IcoSpiral = ({ size = 240, stroke = "#1d3a5f", accent = "#b8954a", inner = "#3a6a8a", spiral = "#a9c4d4", sw = 2.2 }) => {
  const Router = 82;
  const Rinner = Router / PHI_ICO;
  const { outer, inner: innerPts } = icoVerts(Router, Rinner);

  const pts = [];
  const turns = 1.37;
  for (let i = 0; i <= 220; i++) {
    const t = i / 220;
    const theta = t * turns * Math.PI * 2;
    const r = 3.2 * Math.pow(PHI_ICO, theta / (Math.PI / 2)) * 0.5;
    pts.push([Math.cos(theta) * r, Math.sin(theta) * r]);
  }
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");

  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" fill="none">
      <path d={path} stroke={spiral} strokeWidth="1.4" transform="rotate(-90)" />
      <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round">
        {outer.map((p, i) => {
          const next = outer[(i + 1) % 5];
          return <line key={`o${i}`} x1={p[0]} y1={p[1]} x2={next[0]} y2={next[1]} />;
        })}
      </g>
      <g stroke={inner} strokeWidth={sw * 0.78} strokeLinejoin="round" strokeLinecap="round">
        {innerPts.map((p, i) => {
          const next = innerPts[(i + 1) % 5];
          return <line key={`i${i}`} x1={p[0]} y1={p[1]} x2={next[0]} y2={next[1]} />;
        })}
        {outer.map((o, i) => {
          const a = innerPts[i];
          const b = innerPts[(i + 4) % 5];
          return (
            <g key={`e${i}`}>
              <line x1={o[0]} y1={o[1]} x2={a[0]} y2={a[1]} />
              <line x1={o[0]} y1={o[1]} x2={b[0]} y2={b[1]} />
            </g>
          );
        })}
      </g>
      <circle r="3" fill={accent} stroke="none" />
    </svg>
  );
};

// ---------- 03 — Solid / filled triangular facets ----------
const IcoFilled = ({ size = 240, stroke = "#0e2238", accent = "#b8954a", lightTone = "#e8f0f5", midTone = "#a9c4d4", deepTone = "#3a6a8a" }) => {
  const Router = 82;
  const Rinner = Router / PHI_ICO;
  const { outer, inner: innerPts } = icoVerts(Router, Rinner);

  // Build 10 triangular facets that form the "visible" surface from vertex-first view
  const facets = [];
  for (let i = 0; i < 5; i++) {
    const o = outer[i];
    const a = innerPts[i];
    const b = innerPts[(i + 4) % 5];
    facets.push({ pts: [o, a, b], tone: i % 2 === 0 ? midTone : lightTone });
  }
  for (let i = 0; i < 5; i++) {
    const inP = innerPts[i];
    const a = outer[i];
    const b = outer[(i + 1) % 5];
    facets.push({ pts: [inP, a, b], tone: i % 2 === 0 ? lightTone : midTone });
  }

  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" stroke={stroke} strokeWidth="0.6" strokeLinejoin="round">
      {facets.map((f, i) => (
        <polygon key={i} points={f.pts.map(p => p.join(",")).join(" ")} fill={f.tone} />
      ))}
      <polygon points={outer.map(p => p.join(",")).join(" ")} fill="none" stroke={stroke} strokeWidth="1.4" />
      <circle r="3" fill={accent} stroke="none" />
    </svg>
  );
};

// ---------- 04 — Icosahedron inside drop silhouette ----------
const IcoDrop = ({ size = 240, stroke = "#1d3a5f", accent = "#b8954a", inner = "#3a6a8a", sw = 2.2 }) => {
  const Router = 64;
  const Rinner = Router / PHI_ICO;
  const { outer, inner: innerPts } = icoVerts(Router, Rinner);

  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" fill="none">
      <path d="M0,-86 C30,-44 60,-8 60,30 C60,62 30,84 0,84 C-30,84 -60,62 -60,30 C-60,-8 -30,-44 0,-86 Z"
            stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      <g transform="translate(0,10)" stroke={inner} strokeWidth={sw * 0.7} strokeLinejoin="round" strokeLinecap="round">
        {outer.map((p, i) => {
          const next = outer[(i + 1) % 5];
          return <line key={`o${i}`} x1={p[0]} y1={p[1]} x2={next[0]} y2={next[1]} stroke={stroke} strokeWidth={sw * 0.9} />;
        })}
        {innerPts.map((p, i) => {
          const next = innerPts[(i + 1) % 5];
          return <line key={`i${i}`} x1={p[0]} y1={p[1]} x2={next[0]} y2={next[1]} />;
        })}
        {outer.map((o, i) => {
          const a = innerPts[i];
          const b = innerPts[(i + 4) % 5];
          return (
            <g key={`e${i}`}>
              <line x1={o[0]} y1={o[1]} x2={a[0]} y2={a[1]} />
              <line x1={o[0]} y1={o[1]} x2={b[0]} y2={b[1]} />
            </g>
          );
        })}
        <circle r="2.4" fill={accent} stroke="none" />
      </g>
    </svg>
  );
};

// ---------- 05 — Hairline + outer ring ("seal") ----------
const IcoSeal = ({ size = 240, stroke = "#1d3a5f", accent = "#b8954a", inner = "#3a6a8a", sw = 1.6 }) => {
  const Router = 68;
  const Rinner = Router / PHI_ICO;
  const { outer, inner: innerPts } = icoVerts(Router, Rinner);

  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" fill="none">
      <circle r="92" stroke={stroke} strokeWidth={sw * 0.75} />
      <circle r="86" stroke={stroke} strokeWidth={sw * 0.5} opacity="0.5" />
      {Array.from({ length: 9 }, (_, i) => {
        const a = (i * GA * Math.PI) / 180 - Math.PI / 2;
        const x1 = Math.cos(a) * 86, y1 = Math.sin(a) * 86;
        const x2 = Math.cos(a) * 92, y2 = Math.sin(a) * 92;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth="1.2" strokeLinecap="round" />;
      })}
      <g stroke={stroke} strokeWidth={sw * 1.4} strokeLinejoin="round" strokeLinecap="round">
        {outer.map((p, i) => {
          const next = outer[(i + 1) % 5];
          return <line key={`o${i}`} x1={p[0]} y1={p[1]} x2={next[0]} y2={next[1]} />;
        })}
      </g>
      <g stroke={inner} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round">
        {innerPts.map((p, i) => {
          const next = innerPts[(i + 1) % 5];
          return <line key={`i${i}`} x1={p[0]} y1={p[1]} x2={next[0]} y2={next[1]} />;
        })}
        {outer.map((o, i) => {
          const a = innerPts[i];
          const b = innerPts[(i + 4) % 5];
          return (
            <g key={`e${i}`}>
              <line x1={o[0]} y1={o[1]} x2={a[0]} y2={a[1]} />
              <line x1={o[0]} y1={o[1]} x2={b[0]} y2={b[1]} />
            </g>
          );
        })}
      </g>
      <circle r="2.6" fill={accent} stroke="none" />
    </svg>
  );
};

// ---------- 06 — Reversed (white/gold on dark) version of primary ----------
const IcoReverse = ({ size = 240, ...rest }) => (
  <IcoPrimary size={size} {...rest} />
);

export { IcoPrimary, IcoSpiral, IcoFilled, IcoDrop, IcoSeal, IcoReverse };
