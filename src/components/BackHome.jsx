// Floating "back to home" pill — icosahedron mark + label.
// Used on every secondary route so users always have a way back to the
// landing page that matches the brand language.

import React from 'react';
import { Link } from 'react-router-dom';
import { IcoPrimary } from './IcosahedronMarks.jsx';

// Both tones use the brand's "deep card" language (deep ocean + gold border
// + paper text) so the pill reads as a recognizable brand surface against
// any background.
const TONES = {
  dark: {
    fg: '#f5f1e8',
    accent: '#b8954a',
    inner: '#a9c4d4',
    bg: 'rgba(14,34,56,0.78)',
    bgHover: 'rgba(14,34,56,0.95)',
    border: 'rgba(184,149,74,0.55)',
    shadow: '0 6px 20px rgba(0,0,0,0.45)',
    shadowHover: '0 12px 30px rgba(0,0,0,0.6)',
  },
  light: {
    fg: '#f5f1e8',
    accent: '#b8954a',
    inner: '#a9c4d4',
    bg: 'rgba(14,34,56,0.95)',
    bgHover: '#0e2238',
    border: 'rgba(184,149,74,0.6)',
    shadow: '0 6px 20px rgba(14,34,56,0.25)',
    shadowHover: '0 12px 30px rgba(14,34,56,0.4)',
  },
};

function BackHome({ tone = 'dark', label = 'inicio' }) {
  const c = TONES[tone];
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      to="/"
      aria-label="Volver al inicio"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        top: 16,
        left: 16,
        zIndex: 200,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 16px 6px 8px',
        background: hover ? c.bgHover : c.bg,
        border: `0.5px solid ${c.border}`,
        borderRadius: 999,
        backdropFilter: 'blur(18px) saturate(160%)',
        WebkitBackdropFilter: 'blur(18px) saturate(160%)',
        textDecoration: 'none',
        color: c.fg,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.32em',
        textTransform: 'uppercase',
        boxShadow: hover ? c.shadowHover : c.shadow,
        transform: hover ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'transform .15s ease, box-shadow .15s ease, background .15s ease',
      }}
    >
      <IcoPrimary size={26} stroke={c.fg} inner={c.inner} accent={c.accent} sw={2.2} />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: c.accent }}>←</span>
        <span>{label}</span>
      </span>
    </Link>
  );
}

export default BackHome;
