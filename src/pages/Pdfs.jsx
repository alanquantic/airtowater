import React from 'react';
import BackHome from '../components/BackHome.jsx';
import {
  IcoPrimary,
  IcoSpiral,
  IcoSeal,
  IcoDrop,
  IcoFilled,
} from '../components/IcosahedronMarks.jsx';
import { PDFS } from '../data/pdfs.js';
import '../styles/pdfs.css';

const COVERS = {
  primary: IcoPrimary,
  spiral: IcoSpiral,
  seal: IcoSeal,
  drop: IcoDrop,
  filled: IcoFilled,
};

const GOLD = '#b8954a';
const PAPER = '#f5f1e8';
const MIST = '#a9c4d4';

function PdfCover({ variant, index }) {
  const Mark = COVERS[variant] ?? IcoPrimary;
  const num = String(index + 1).padStart(2, '0');
  return (
    <div className="cover">
      <span className="num-tag">{num} · 137 · 432 · 9</span>
      <Mark size={180} stroke={PAPER} inner={MIST} accent={GOLD} sw={2} />
      <span className="ext-tag">.pdf</span>
    </div>
  );
}

function PdfModal({ pdf, onClose }) {
  const [missing, setMissing] = React.useState(false);
  const frameRef = React.useRef(null);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  // Probe the file with HEAD: if the PDF isn't in `public/pdfs/` yet, render
  // an explicit "missing file" message instead of the browser's empty PDF
  // viewer (which silently shows a blank page).
  React.useEffect(() => {
    let cancelled = false;
    fetch(pdf.file, { method: 'HEAD' })
      .then((r) => {
        if (cancelled) return;
        if (!r.ok) setMissing(true);
      })
      .catch(() => {
        if (!cancelled) setMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [pdf.file]);

  return (
    <div
      className="pdf-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pdf-modal-header">
        <div className="lhs">
          <div className="eyebrow">{pdf.eyebrow}</div>
          <div className="title">{pdf.title}</div>
        </div>
        <div className="pdf-modal-actions">
          {!missing && (
            <a className="pdf-modal-btn" href={pdf.file} download target="_blank" rel="noreferrer">
              <span className="arrow">↓</span>
              <span>Descargar</span>
            </a>
          )}
          <button className="pdf-modal-btn" onClick={onClose}>
            <span className="arrow">×</span>
            <span>Cerrar</span>
          </button>
        </div>
      </div>
      <div className="pdf-modal-frame" ref={frameRef}>
        {missing ? (
          <div className="missing">
            <strong>Archivo no encontrado</strong>
            <div>
              No existe <code>{pdf.file}</code> todavía.
            </div>
            <div>
              Coloca el PDF en <code>public/pdfs/</code> con ese nombre exacto y recarga.
            </div>
          </div>
        ) : (
          <iframe src={pdf.file} title={pdf.title} />
        )}
      </div>
    </div>
  );
}

function Pdfs() {
  const [active, setActive] = React.useState(null);

  return (
    <div className="page-pdfs">
      <BackHome tone="light" />

      <header>
        <div>
          <div className="eyebrow">Documentos</div>
          <h1 style={{ marginTop: 14 }}>
            PDFs<span style={{ color: GOLD, fontFamily: "'JetBrains Mono', monospace", fontSize: 32 }}>
              .mx
            </span>
          </h1>
          <p className="muted" style={{ marginTop: 16, maxWidth: 560, fontSize: 14, lineHeight: 1.7 }}>
            Documentación técnica y comercial de los generadores Watergen — brochures, specs,
            curvas de rendimiento y lista de distribuidor. Click en cualquier card para abrir el
            documento en el visor inline; tecla <code>Esc</code> para cerrar.
          </p>
        </div>
        <div className="num">
          {PDFS.length.toString().padStart(2, '0')}<br />docs<br />total
        </div>
      </header>

      <section>
        <div className="grid">
          {PDFS.map((pdf, i) => (
            <button key={pdf.id} className="pdf-card" onClick={() => setActive(pdf)} aria-label={`Abrir ${pdf.title}`}>
              <PdfCover variant={pdf.cover} index={i} />
              <div className="meta">
                <div className="row">
                  <span className="eyebrow" style={{ color: GOLD }}>
                    {pdf.eyebrow}
                  </span>
                </div>
                <div className="title">{pdf.title}</div>
                <div className="desc">{pdf.description}</div>
                <div className="arrow">Abrir →</div>
              </div>
            </button>
          ))}
        </div>

        <div className="hint">
          ¿Quieres añadir un PDF? Colócalo en <code>public/pdfs/&lt;nombre&gt;.pdf</code> y agrega una entrada al
          manifest en <code>src/data/pdfs.js</code>. Si el archivo todavía no existe, la card abre un mensaje
          indicando exactamente qué falta.
        </div>
      </section>

      {active && <PdfModal pdf={active} onClose={() => setActive(null)} />}
    </div>
  );
}

export default Pdfs;
