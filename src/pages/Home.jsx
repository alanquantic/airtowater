import React from 'react';
import { Link } from 'react-router-dom';
import {
  IcoPrimary,
  IcoSpiral,
  IcoSeal,
  IcoDrop,
  IcoFilled,
} from '../components/IcosahedronMarks.jsx';
import { Wordmark } from '../components/Lockups.jsx';
import { PRODUCTS } from '../data/products.js';
import { CONTACT } from '../data/contact.js';
import '../styles/home.css';

const PAPER = '#f5f1e8';
const MIST = '#a9c4d4';
const GOLD = '#b8954a';
const OCEAN = '#1d3a5f';

const COVERS = {
  primary: IcoPrimary,
  spiral: IcoSpiral,
  seal: IcoSeal,
  drop: IcoDrop,
  filled: IcoFilled,
};

const TECH_STEPS = [
  {
    n: '01',
    cover: 'primary',
    title: 'Captura',
    desc: 'El generador toma humedad del aire ambiente — la atmósfera contiene 6× más agua que todos los ríos del mundo combinados.',
  },
  {
    n: '02',
    cover: 'spiral',
    title: 'Condensación',
    desc: 'Un intercambio térmico de alta eficiencia condensa el vapor en agua líquida, sin químicos ni desperdicio.',
  },
  {
    n: '03',
    cover: 'seal',
    title: 'Filtración',
    desc: 'Filtros multi-etapa + UV + mineralización entregan agua pura, fresca y con balance ideal de minerales.',
  },
];

const WHY = [
  {
    cover: 'primary',
    title: 'Agua donde no hay infraestructura',
    desc: 'Independencia total de pozos, redes hídricas o transporte de pipas.',
  },
  {
    cover: 'drop',
    title: 'Cero plástico, cero residuos',
    desc: 'Adiós a las botellas y garrafones — agua continua sin huella plástica.',
  },
  {
    cover: 'seal',
    title: 'Tecnología israelí de vanguardia',
    desc: 'Watergen es líder mundial en generación atmosférica de agua, certificada y operando en 90+ países.',
  },
  {
    cover: 'spiral',
    title: 'Soporte técnico en México',
    desc: 'Instalación, mantenimiento y servicio post-venta directo, en español, en todo el país.',
  },
];

function SectionHead({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <div className={`section-head ${align}`}>
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </div>
  );
}

function ProductCover({ product }) {
  const [imgError, setImgError] = React.useState(false);
  const Cover = COVERS[product.cover] ?? IcoPrimary;

  return (
    <div className="product-cover">
      {product.image && !imgError ? (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="product-cover-fallback">
          <Cover size={200} stroke={PAPER} inner={MIST} accent={GOLD} sw={2} />
          <div className="product-cover-tag">137 · 432 · 9</div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <ProductCover product={product} />
      <div className="product-meta">
        <div className="product-row">
          <span className="eyebrow">{product.eyebrow}</span>
          <span className="capacity">{product.capacity}</span>
        </div>
        <div className="product-name">{product.name}</div>
        <p className="product-summary">{product.summary}</p>
        <div className="product-audience">{product.audience}</div>
        <ul className="product-features">
          {product.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="product-actions">
          <a className="btn btn-primary" href={`#contacto?model=${product.id}`}>
            Solicitar info
          </a>
          <a className="btn btn-ghost" href={product.pdf} target="_blank" rel="noreferrer">
            Ver brochure ↗
          </a>
        </div>
      </div>
    </article>
  );
}

function buildMailto({ name, email, phone, company, model, message }) {
  const subject = `Solicitud de información — ${model || 'airtowater.mx'}`;
  const body =
    `Nombre: ${name}\n` +
    `Email: ${email}\n` +
    `Teléfono: ${phone}\n` +
    `Empresa / organización: ${company || '—'}\n` +
    `Modelo de interés: ${model}\n\n` +
    `Mensaje:\n${message || '—'}`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildWhatsapp({ name, model, message }) {
  const text =
    `Hola airtowater.mx, soy ${name || ''}.\n` +
    `Estoy interesado en: ${model}.\n\n` +
    `${message || 'Quisiera recibir más información.'}`;
  return `https://wa.me/${CONTACT.whatsappE164}?text=${encodeURIComponent(text)}`;
}

function ContactForm() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    model: '',
    message: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onEmailSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.model) return;
    window.location.href = buildMailto(form);
    setSubmitted(true);
  };

  const onWhatsappClick = () => {
    if (!form.model) return;
    window.open(buildWhatsapp(form), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-success">
        <div className="eyebrow">Gracias</div>
        <h3>Tu solicitud fue enviada</h3>
        <p>
          Si no se abrió tu cliente de email o WhatsApp automáticamente, escríbenos directo a{' '}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
        <button type="button" className="btn btn-ghost" onClick={() => setSubmitted(false)}>
          Enviar otra
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onEmailSubmit}>
      <div className="grid-2">
        <label className="field">
          <span>Nombre completo *</span>
          <input
            type="text"
            value={form.name}
            onChange={update('name')}
            required
            autoComplete="name"
          />
        </label>
        <label className="field">
          <span>Email *</span>
          <input
            type="email"
            value={form.email}
            onChange={update('email')}
            required
            autoComplete="email"
          />
        </label>
        <label className="field">
          <span>WhatsApp / Teléfono</span>
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            autoComplete="tel"
            placeholder="+52 55 0000 0000"
          />
        </label>
        <label className="field">
          <span>Empresa / organización</span>
          <input
            type="text"
            value={form.company}
            onChange={update('company')}
            autoComplete="organization"
          />
        </label>
      </div>
      <label className="field">
        <span>Modelo de interés *</span>
        <select value={form.model} onChange={update('model')} required>
          <option value="" disabled>
            Selecciona un modelo
          </option>
          {PRODUCTS.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name} — {p.eyebrow}
            </option>
          ))}
          <option value="No estoy seguro">No estoy seguro — quiero asesoría</option>
        </select>
      </label>
      <label className="field">
        <span>Mensaje</span>
        <textarea
          rows={5}
          value={form.message}
          onChange={update('message')}
          placeholder="Cuéntanos sobre tu proyecto, ubicación, demanda estimada de agua…"
        />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Enviar por email →
        </button>
        <button type="button" className="btn btn-ghost" onClick={onWhatsappClick}>
          O por WhatsApp ↗
        </button>
      </div>
      <p className="form-note">
        Al enviar abrimos tu cliente de email/WhatsApp con la solicitud lista. También puedes
        escribirnos directo a <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>
    </form>
  );
}

function Home() {
  return (
    <div className="landing">
      {/* ─────────────── HERO ─────────────── */}
      <header className="hero">
        <nav className="topnav">
          <Wordmark color={PAPER} accent={GOLD} size={20} />
          <div className="topnav-links">
            <a href="#tecnologia">Tecnología</a>
            <a href="#productos">Productos</a>
            <Link to="/pdfs">Documentación</Link>
            <a href="#contacto" className="btn btn-pill">
              Cotizar
            </a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">{CONTACT.tagline}</div>
            <h1>
              Generamos agua pura
              <br />
              <span className="accent">del aire que respiras</span>
            </h1>
            <p className="hero-lede">
              Tecnología Watergen para hogares, comercios, comunidades e industria. Sin tubería, sin
              botellas, sin transporte — agua continua y limpia generada en sitio.
            </p>
            <div className="hero-cta">
              <a href="#contacto" className="btn btn-primary">
                Solicitar cotización →
              </a>
              <a href="#tecnologia" className="btn btn-ghost-light">
                Conocer la tecnología
              </a>
            </div>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <IcoSeal size={460} stroke={PAPER} inner={MIST} accent={GOLD} sw={1.6} />
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">90+</div>
            <div className="stat-lbl">Países usando Watergen</div>
          </div>
          <div className="stat">
            <div className="stat-num">6,000 L</div>
            <div className="stat-lbl">Producción diaria por unidad GEN-L</div>
          </div>
          <div className="stat">
            <div className="stat-num">0</div>
            <div className="stat-lbl">Botellas plásticas · cero residuo</div>
          </div>
          <div className="stat">
            <div className="stat-num">100%</div>
            <div className="stat-lbl">Renovable y sostenible</div>
          </div>
        </div>
      </header>

      {/* ─────────────── TECNOLOGÍA ─────────────── */}
      <section id="tecnologia" className="tech">
        <SectionHead
          eyebrow="Tecnología"
          title="De la atmósfera a tu vaso"
          subtitle="Tres pasos para convertir el aire en agua potable de calidad superior."
        />
        <div className="tech-steps">
          {TECH_STEPS.map((s) => {
            const Mark = COVERS[s.cover] ?? IcoPrimary;
            return (
              <article key={s.n} className="tech-step">
                <div className="tech-step-mark">
                  <Mark size={140} stroke={OCEAN} inner="#3a6a8a" accent={GOLD} sw={2.2} />
                </div>
                <div className="tech-step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ─────────────── PRODUCTOS ─────────────── */}
      <section id="productos" className="products">
        <SectionHead
          eyebrow="Línea de producto"
          title="Un modelo para cada necesidad"
          subtitle="Desde 30 hasta 6,000 litros diarios. Encuentra el equipo que se adapta a tu escala."
        />
        <div className="product-grid">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ─────────────── DIFERENCIADORES ─────────────── */}
      <section className="why">
        <SectionHead eyebrow="Por qué airtowater" title="Agua sin compromisos" align="center" />
        <div className="why-grid">
          {WHY.map((w) => {
            const Mark = COVERS[w.cover] ?? IcoPrimary;
            return (
              <article key={w.title} className="why-card">
                <Mark size={64} stroke={GOLD} inner={MIST} accent={GOLD} sw={2.6} />
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ─────────────── DOCS TEASER ─────────────── */}
      <section className="docs-teaser">
        <div>
          <div className="eyebrow">Documentación</div>
          <h2>Specs, brochures y curvas de rendimiento</h2>
          <p>
            Toda la documentación técnica y comercial de Watergen disponible en línea, con visor
            inline y descarga directa.
          </p>
        </div>
        <Link to="/pdfs" className="btn btn-primary">
          Ver documentación →
        </Link>
      </section>

      {/* ─────────────── FORMULARIO ─────────────── */}
      <section id="contacto" className="contact">
        <SectionHead
          eyebrow="Contacto"
          title="Solicita información"
          subtitle="Cuéntanos sobre tu proyecto. Respondemos en menos de 24 horas hábiles."
        />
        <ContactForm />
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Wordmark color={PAPER} accent={GOLD} size={22} />
            <p>Distribuidor autorizado Watergen en {CONTACT.city}.</p>
            <div className="numerology">137 · 432 · 9</div>
          </div>
          <div className="footer-col">
            <div className="footer-eyebrow">Navegación</div>
            <a href="#tecnologia">Tecnología</a>
            <a href="#productos">Productos</a>
            <Link to="/pdfs">Documentación</Link>
            <a href="#contacto">Contacto</a>
          </div>
          <div className="footer-col">
            <div className="footer-eyebrow">Contacto</div>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={`https://wa.me/${CONTACT.whatsappE164}`} target="_blank" rel="noreferrer">
              WhatsApp {CONTACT.whatsappDisplay}
            </a>
            <span>{CONTACT.instagram}</span>
            <span>{CONTACT.city}</span>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {CONTACT.brandName}</span>
          <span>agua del aire · sacred geometry</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
