import React from 'react';
import { Link } from 'react-router-dom';
import { IcoPrimary } from '../components/IcosahedronMarks.jsx';
import { Wordmark } from '../components/Lockups.jsx';
import '../styles/home.css';

const OCEAN = '#1d3a5f';
const WATER = '#3a6a8a';
const GOLD = '#b8954a';

const cards = [
  {
    href: '/logos',
    tag: 'Exploration',
    title: 'Logo system',
    desc: '9 marks across sacred-geometry concepts, lockups, and color treatments.',
    type: 'route',
  },
  {
    href: '/icosahedron',
    tag: 'Refinement',
    title: 'Icosaedro',
    desc: 'Refinamiento del símbolo elegido con panel de tweaks en vivo.',
    type: 'route',
  },
  {
    href: '/final/',
    tag: 'Deliverable',
    title: 'Manual de marca',
    desc: 'Sistema final entregable: SVG, lockups, paleta, reglas de uso.',
    type: 'static',
  },
];

function Home() {
  return (
    <div className="home">
      <header>
        <div>
          <div className="eyebrow">137 · 432 · 9</div>
          <h1 style={{ marginTop: 14 }}>
            airtowater<span style={{ color: GOLD, fontFamily: "'JetBrains Mono', monospace", fontSize: 36 }}>.mx</span>
          </h1>
          <p className="muted" style={{ marginTop: 18, maxWidth: 520, fontSize: 14, lineHeight: 1.7 }}>
            Sistema de identidad de marca centrado en el icosaedro — el sólido platónico del agua —
            en proyección vértice-primero, con pentágonos concéntricos en proporción áurea exacta (1/φ).
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <IcoPrimary size={140} stroke={OCEAN} inner={WATER} accent={GOLD} sw={2.4} />
          <div className="num">
            137<br />432<br />9
          </div>
        </div>
      </header>

      <section>
        <div className="eyebrow">Vistas</div>
        <h2 style={{ marginTop: 8 }}>Explora el sistema</h2>
        <div className="grid">
          {cards.map((c) => {
            const inner = (
              <>
                <div className="tag">{c.tag}</div>
                <div className="title">{c.title}</div>
                <div className="desc">{c.desc}</div>
                <div className="arrow">Ver →</div>
              </>
            );
            return c.type === 'route' ? (
              <Link key={c.href} className="card" to={c.href}>
                {inner}
              </Link>
            ) : (
              <a key={c.href} className="card" href={c.href}>
                {inner}
              </a>
            );
          })}
        </div>
      </section>

      <footer>
        <div>
          <Wordmark color={OCEAN} accent={GOLD} size={14} />
        </div>
        <div>agua del aire · sacred geometry</div>
      </footer>
    </div>
  );
}

export default Home;
