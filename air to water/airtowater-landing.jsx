import { useState, useEffect, useRef } from "react";

const SECTIONS = {
  hero: "hero",
  tech: "tecnologia",
  apps: "aplicaciones",
  why: "por-que",
  capacity: "capacidad",
  plans: "esquemas",
  contact: "contacto",
};

// ─── Icon Components ───
const Drop = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <defs>
      <linearGradient id="dropGrad" x1="0" y1="0" x2="32" y2="32">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>
    <path d="M16 3C16 3 8 13 8 20a8 8 0 0016 0c0-7-8-17-8-17z" fill="url(#dropGrad)" opacity=".85" />
  </svg>
);

const icons = {
  wind: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7A2.5 2.5 0 1019 10.5H2M9.6 4.6A2 2 0 1011 6.5H2M12.6 19.4A2 2 0 1014 17.5H2"/></svg>
  ),
  droplet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
  ),
  filter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
  ),
  hotel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 7v14M21 7v14M6 11h4v4H6zM14 11h4v4h-4zM9 3h6l3 4H6z"/></svg>
  ),
  music: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/><path d="M8 17.5V5l12-2v12.5"/></svg>
  ),
  factory: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M4 20V10l4 3V8l4 3V6l4 3V4h4v16"/></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V18h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/></svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  tool: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.73 12.73l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
};

// ─── Intersection Observer Hook ───
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Animated Section Wrapper ───
function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ─── Stats Data ───
const stats = [
  { value: "20–6,000", unit: "L/día", label: "Capacidad de producción" },
  { value: "6+", unit: "etapas", label: "Filtración + UV-C" },
  { value: "IoT", unit: "24/7", label: "Monitoreo remoto" },
  { value: "Solar", unit: "ready", label: "Energía renovable" },
];

// ─── Process Steps ───
const steps = [
  { icon: icons.wind, title: "Captación", desc: "El equipo aspira aire ambiente y lo filtra de partículas, polvo y contaminantes antes de procesarlo." },
  { icon: icons.droplet, title: "Condensación", desc: "Un ciclo de refrigeración de alta eficiencia enfría el aire hasta su punto de rocío, extrayendo el vapor de agua." },
  { icon: icons.filter, title: "Purificación", desc: "Múltiples etapas de filtración con carbón activado, sedimentos, membrana y lámpara UV-C." },
  { icon: icons.sparkle, title: "Mineralización", desc: "El agua se remineraliza para equilibrar pH y sabor, lista para consumo humano." },
];

// ─── Applications ───
const apps = [
  { icon: icons.hotel, title: "Hospitalidad y turismo", desc: "Hoteles, resorts y restaurantes eliminan garrafones y botellas PET con producción propia de agua sustentable." },
  { icon: icons.music, title: "Eventos y producción", desc: "Conciertos, ferias, eventos deportivos y sets de filmación con agua pura on-site sin logística de reabastecimiento." },
  { icon: icons.factory, title: "Industrial y manufactura", desc: "Plantas, almacenes y centros de distribución con fuente de agua autónoma e independiente de red municipal." },
  { icon: icons.building, title: "Corporativo e institucional", desc: "Oficinas, universidades, hospitales y espacios públicos reduciendo huella plástica con tecnología de punto de uso." },
  { icon: icons.home, title: "Residencial premium", desc: "Hogares y desarrollos inmobiliarios de alta gama con generador doméstico compacto integrado." },
  { icon: icons.users, title: "Comunidades y gobierno", desc: "Soluciones escalables para zonas con estrés hídrico, comunidades rurales y programas de acceso al agua." },
];

// ─── Value Props ───
const whyUs = [
  { icon: icons.shield, title: "Regulatorio resuelto en México", desc: "Operamos bajo COFEPRIS y NOM-201 para agua purificada. Cumplimiento normativo desde el día uno." },
  { icon: icons.award, title: "Certificaciones internacionales", desc: "Equipos que cumplen los estándares más exigentes del mercado global para agua potable y seguridad alimentaria." },
  { icon: icons.zap, title: "Alta eficiencia energética", desc: "Hasta 5 litros por kWh consumido. Opera con humedad ambiental desde 20%." },
  { icon: icons.tool, title: "Soporte técnico local", desc: "Equipo en Ciudad de México con cobertura nacional. Instalación, puesta en marcha y capacitación incluidas." },
  { icon: icons.layers, title: "Modelos flexibles", desc: "Compra, renta o Water-as-a-Service. Adaptamos el esquema financiero a tu operación." },
  { icon: icons.monitor, title: "Monitoreo IoT en tiempo real", desc: "Supervisión remota de producción, consumo, alertas y filtros desde cualquier dispositivo." },
  { icon: icons.sun, title: "Compatible con energía solar", desc: "Integración fotovoltaica para operación 100% renovable en sitios off-grid o con metas net-zero." },
];

// ─── Capacity Tiers ───
const capacities = [
  { tier: "Compacto", liters: "20 L/día", use: "Hogares, oficinas pequeñas y puntos de hidratación individuales.", accent: "#38bdf8" },
  { tier: "Medio", liters: "220 L/día", use: "Restaurantes, oficinas corporativas y espacios comerciales medianos.", accent: "#0ea5e9" },
  { tier: "Alto volumen", liters: "1,000 L/día", use: "Hoteles, hospitales, plantas industriales y eventos de mediana escala.", accent: "#0284c7" },
  { tier: "Industrial", liters: "6,000 L/día", use: "Manufactura, comunidades, infraestructura y operaciones de gran escala.", accent: "#0369a1" },
];

// ─── Plans ───
const plans = [
  { name: "Compra directa", desc: "Adquiere el equipo y opera con plena autonomía. Incluye instalación, capacitación y garantía.", highlight: false },
  { name: "Renta de equipo", desc: "Pago mensual fijo sin inversión inicial. Mantenimiento preventivo incluido en el contrato.", highlight: true },
  { name: "Water-as-a-Service", desc: "Modelo llave en mano. Nosotros instalamos, operamos y mantenemos. Tú solo consumes agua pura.", highlight: false },
];

// ─── Main Component ───
export default function AirToWaterLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", empresa: "", email: "", telefono: "", aplicacion: "", consumo: "", ciudad: "", mensaje: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <div style={{ fontFamily: "'Outfit', 'DM Sans', system-ui, sans-serif", background: "#060d1b", color: "#c1d0e0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(14,165,233,.3); color: #fff; }
        .glow-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(56,189,248,.4), transparent); }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrolled ? "rgba(6,13,27,.95)" : "rgba(6,13,27,.5)",
        backdropFilter: "blur(20px)", borderBottom: `1px solid rgba(255,255,255,${scrolled ? ".06" : ".02"})`,
        transition: "all .4s"
      }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: ".6rem", textDecoration: "none" }}>
          <Drop size={28} />
          <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff", letterSpacing: ".3px", fontFamily: "Outfit" }}>Air to Water</span>
          <span style={{ fontSize: ".7rem", color: "#64748b", fontWeight: 400, marginLeft: "-.25rem" }}>MX</span>
        </a>
        <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
          {[["Tecnología", SECTIONS.tech], ["Aplicaciones", SECTIONS.apps], ["Capacidad", SECTIONS.capacity]].map(([label, id]) => (
            <a key={id} href={`#${id}`} style={{ color: "#94a3b8", textDecoration: "none", fontSize: ".85rem", fontWeight: 500, transition: "color .3s", fontFamily: "Outfit" }}
              onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>
              {label}
            </a>
          ))}
          <a href={`#${SECTIONS.contact}`} style={{
            background: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
            color: "#fff", padding: ".55rem 1.4rem", borderRadius: "100px",
            fontSize: ".85rem", fontWeight: 600, textDecoration: "none", fontFamily: "Outfit",
            transition: "transform .2s, box-shadow .3s"
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 8px 25px rgba(14,165,233,.35)"; }}
            onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}>
            Solicitar info
          </a>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id={SECTIONS.hero} style={{
        position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "8rem 2rem 5rem", overflow: "hidden", textAlign: "center"
      }}>
        {/* Orbs */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "#0ea5e9", filter: "blur(140px)", opacity: .1, top: "-5%", right: "-8%", animation: "float 22s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "#38bdf8", filter: "blur(120px)", opacity: .08, bottom: "10%", left: "-3%", animation: "float 18s ease-in-out infinite reverse" }} />
        <style>{`@keyframes float{0%,100%{transform:translate(0,0)}50%{transform:translate(25px,-35px)}}`}</style>

        <FadeIn>
          <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: ".5rem",
              padding: ".45rem 1.1rem", borderRadius: "100px",
              background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.2)",
              fontSize: ".75rem", color: "#38bdf8", fontWeight: 500, letterSpacing: ".8px", textTransform: "uppercase",
              marginBottom: "2rem", fontFamily: "Outfit"
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38bdf8", animation: "pulse 2s ease-in-out infinite" }} />
              Infraestructura hídrica de nueva generación
            </div>
            <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.6)}}`}</style>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.6rem, 6.5vw, 5rem)", color: "#fff", lineHeight: 1.08, fontWeight: 400, marginBottom: "1.4rem" }}>
              Agua pura,<br />directo del{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(135deg, #0ea5e9, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>aire</em>
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "#7e8fa6", maxWidth: 560, margin: "0 auto 2.5rem", lineHeight: 1.75, fontWeight: 300, fontFamily: "Outfit" }}>
              Infraestructura de generación atmosférica de agua para empresas, hoteles, eventos y comunidades en México. Sin pipas, sin garrafones. Solo aire y electricidad.
            </p>
            <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`#${SECTIONS.contact}`} style={{
                background: "linear-gradient(135deg, #0ea5e9, #38bdf8)", color: "#fff",
                padding: ".85rem 2.2rem", borderRadius: "100px", fontWeight: 600, fontSize: ".95rem",
                textDecoration: "none", fontFamily: "Outfit", display: "inline-flex", alignItems: "center", gap: ".4rem",
                transition: "transform .2s, box-shadow .3s"
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 35px rgba(14,165,233,.3)"; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}>
                Solicitar cotización <span style={{ width: 16, height: 16, display: "inline-flex" }}>{icons.send}</span>
              </a>
              <a href={`#${SECTIONS.tech}`} style={{
                background: "rgba(255,255,255,.04)", color: "#fff",
                padding: ".85rem 2.2rem", borderRadius: "100px", fontWeight: 500, fontSize: ".95rem",
                textDecoration: "none", fontFamily: "Outfit", border: "1px solid rgba(255,255,255,.08)",
                transition: "background .3s, border-color .3s"
              }}
                onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,.08)"; e.target.style.borderColor = "rgba(255,255,255,.15)"; }}
                onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,.04)"; e.target.style.borderColor = "rgba(255,255,255,.08)"; }}>
                Cómo funciona
              </a>
            </div>
            <div style={{ marginTop: "3rem", display: "inline-flex", alignItems: "center", color: "#475569", fontSize: ".8rem", gap: ".3rem", fontFamily: "Outfit" }}>
              <span style={{ width: 14, height: 14, display: "inline-flex" }}>{icons.chevron}</span>
              Scroll para explorar
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ STATS ═══ */}
      <FadeIn>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, maxWidth: 880, margin: "-2rem auto 0",
          background: "rgba(255,255,255,.03)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,.05)",
          position: "relative", zIndex: 2
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: "1.75rem 1.25rem", textAlign: "center", background: "rgba(6,13,27,.7)" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#fff", lineHeight: 1.2 }}>
                <span style={{ background: "linear-gradient(135deg, #0ea5e9, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</span>
              </div>
              <div style={{ fontSize: ".65rem", color: "#38bdf8", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", fontFamily: "Outfit", marginTop: 2 }}>{s.unit}</div>
              <div style={{ fontSize: ".72rem", color: "#64748b", fontFamily: "Outfit", fontWeight: 400, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* ═══ TECH ═══ */}
      <section id={SECTIONS.tech} style={{ padding: "7rem 2rem", maxWidth: 1050, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 2.5, color: "#38bdf8", fontWeight: 600, marginBottom: ".75rem", fontFamily: "Outfit" }}>Tecnología</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff", lineHeight: 1.15, marginBottom: ".75rem", fontWeight: 400 }}>
            ¿Cómo se genera agua del aire?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#7e8fa6", maxWidth: 520, lineHeight: 1.7, fontWeight: 300, fontFamily: "Outfit", marginBottom: "3rem" }}>
            Un proceso de cuatro fases que no requiere lluvia, pozos ni red municipal. Solo humedad ambiental y electricidad.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.05)",
                borderRadius: 18, padding: "2rem 1.5rem", transition: "all .4s", position: "relative", overflow: "hidden", height: "100%"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,.2)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.05)"; e.currentTarget.style.transform = ""; }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(14,165,233,.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", color: "#38bdf8" }}>
                  <div style={{ width: 22, height: 22 }}>{s.icon}</div>
                </div>
                <div style={{ fontSize: ".65rem", color: "#38bdf8", fontWeight: 600, letterSpacing: 1, fontFamily: "Outfit", marginBottom: ".4rem" }}>FASE {i + 1}</div>
                <h3 style={{ fontSize: "1.05rem", color: "#fff", fontWeight: 600, marginBottom: ".6rem", fontFamily: "Outfit" }}>{s.title}</h3>
                <p style={{ fontSize: ".88rem", color: "#7e8fa6", lineHeight: 1.6, fontFamily: "Outfit", fontWeight: 300 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="glow-line" />

      {/* ═══ APPLICATIONS ═══ */}
      <section id={SECTIONS.apps} style={{ padding: "7rem 2rem", maxWidth: 1050, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 2.5, color: "#38bdf8", fontWeight: 600, marginBottom: ".75rem", fontFamily: "Outfit" }}>Aplicaciones</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff", lineHeight: 1.15, marginBottom: ".75rem", fontWeight: 400 }}>
            Agua donde la necesitas
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#7e8fa6", maxWidth: 500, lineHeight: 1.7, fontWeight: 300, fontFamily: "Outfit", marginBottom: "3rem" }}>
            Solo requiere electricidad para producir agua pura de forma continua, en cualquier escala y sector.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {apps.map((a, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div style={{
                padding: "2rem 1.5rem", borderRadius: 16, background: "rgba(255,255,255,.015)",
                border: "1px solid rgba(255,255,255,.04)", transition: "all .3s", height: "100%"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.035)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.015)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.04)"; }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(14,165,233,.07)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.15rem", color: "#38bdf8" }}>
                  <div style={{ width: 20, height: 20 }}>{a.icon}</div>
                </div>
                <h3 style={{ fontSize: "1rem", color: "#fff", fontWeight: 600, marginBottom: ".5rem", fontFamily: "Outfit" }}>{a.title}</h3>
                <p style={{ fontSize: ".88rem", color: "#7e8fa6", lineHeight: 1.6, fontFamily: "Outfit", fontWeight: 300 }}>{a.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="glow-line" />

      {/* ═══ WHY US ═══ */}
      <section id={SECTIONS.why} style={{ padding: "7rem 2rem", maxWidth: 1050, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 2.5, color: "#38bdf8", fontWeight: 600, marginBottom: ".75rem", fontFamily: "Outfit" }}>Ventajas</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff", lineHeight: 1.15, marginBottom: "3rem", fontWeight: 400 }}>
            ¿Por qué Air to Water MX?
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {whyUs.map((w, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.5rem", borderRadius: 14, background: "rgba(255,255,255,.015)", border: "1px solid rgba(255,255,255,.04)", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.04)"; }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(14,165,233,.07)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38bdf8", flexShrink: 0 }}>
                  <div style={{ width: 18, height: 18 }}>{w.icon}</div>
                </div>
                <div>
                  <h3 style={{ fontSize: ".95rem", color: "#fff", fontWeight: 600, marginBottom: ".35rem", fontFamily: "Outfit" }}>{w.title}</h3>
                  <p style={{ fontSize: ".85rem", color: "#7e8fa6", lineHeight: 1.6, fontFamily: "Outfit", fontWeight: 300 }}>{w.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="glow-line" />

      {/* ═══ CAPACITY ═══ */}
      <section id={SECTIONS.capacity} style={{ padding: "7rem 2rem", maxWidth: 1050, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 2.5, color: "#38bdf8", fontWeight: 600, marginBottom: ".75rem", fontFamily: "Outfit" }}>Capacidades</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff", lineHeight: 1.15, marginBottom: "3rem", fontWeight: 400 }}>
            Equipos para cada escala
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
          {capacities.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                padding: "2rem 1.5rem", borderRadius: 18,
                background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.05)",
                textAlign: "center", transition: "all .4s", position: "relative", overflow: "hidden"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent + "44"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.05)"; e.currentTarget.style.transform = ""; }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: c.accent + "12", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                  <Drop size={24} />
                </div>
                <div style={{ fontSize: ".7rem", color: c.accent, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", fontFamily: "Outfit", marginBottom: ".25rem" }}>{c.tier}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "#fff", marginBottom: ".75rem" }}>{c.liters}</div>
                <p style={{ fontSize: ".85rem", color: "#7e8fa6", lineHeight: 1.55, fontFamily: "Outfit", fontWeight: 300 }}>{c.use}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="glow-line" />

      {/* ═══ PLANS ═══ */}
      <section id={SECTIONS.plans} style={{ padding: "7rem 2rem", maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 2.5, color: "#38bdf8", fontWeight: 600, marginBottom: ".75rem", fontFamily: "Outfit", textAlign: "center" }}>Esquemas</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff", lineHeight: 1.15, marginBottom: "3rem", fontWeight: 400, textAlign: "center" }}>
            Elige tu modelo de servicio
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {plans.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                padding: "2.5rem 1.75rem", borderRadius: 18, textAlign: "center",
                background: p.highlight ? "linear-gradient(135deg, rgba(14,165,233,.08), rgba(56,189,248,.04))" : "rgba(255,255,255,.02)",
                border: `1px solid ${p.highlight ? "rgba(14,165,233,.2)" : "rgba(255,255,255,.05)"}`,
                transition: "all .3s"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
                {p.highlight && <div style={{ fontSize: ".65rem", color: "#38bdf8", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", fontFamily: "Outfit", marginBottom: ".75rem" }}>Popular</div>}
                <h3 style={{ fontSize: "1.15rem", color: "#fff", fontWeight: 700, marginBottom: ".75rem", fontFamily: "Outfit" }}>{p.name}</h3>
                <p style={{ fontSize: ".9rem", color: "#7e8fa6", lineHeight: 1.65, fontFamily: "Outfit", fontWeight: 300 }}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="glow-line" />

      {/* ═══ CONTACT ═══ */}
      <section id={SECTIONS.contact} style={{ padding: "7rem 2rem", maxWidth: 1050, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }}>
          <FadeIn>
            <div>
              <p style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 2.5, color: "#38bdf8", fontWeight: 600, marginBottom: ".75rem", fontFamily: "Outfit" }}>Contacto</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#fff", lineHeight: 1.15, marginBottom: "1rem", fontWeight: 400 }}>
                Cuéntanos tu proyecto
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#7e8fa6", lineHeight: 1.7, fontWeight: 300, fontFamily: "Outfit", marginBottom: "2rem" }}>
                Evaluamos cada caso para recomendar la tecnología y el esquema de servicio óptimo. Sin compromiso.
              </p>
              {[
                ["Regulatorio resuelto en México", icons.shield],
                ["Soporte técnico local", icons.check],
                ["Compra, renta o WaaS", icons.layers],
                ["Compatible con energía solar", icons.sun],
                ["Respuesta en 48 horas", icons.send],
              ].map(([text, icon], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".6rem" }}>
                  <div style={{ width: 16, height: 16, color: "#38bdf8" }}>{icon}</div>
                  <span style={{ fontSize: ".85rem", color: "#94a3b8", fontFamily: "Outfit" }}>{text}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{
              background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)",
              borderRadius: 22, padding: "2.5rem", position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: "-40%", right: "-30%", width: 250, height: 250, background: "rgba(14,165,233,.04)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
              <div onSubmit={handleSubmit} style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".85rem", marginBottom: ".85rem" }}>
                  {[["Nombre", "nombre", "text", "Tu nombre"], ["Empresa", "empresa", "text", "Tu empresa"]].map(([label, key, type, ph]) => (
                    <div key={key}>
                      <label style={{ display: "block", fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 1, color: "#64748b", marginBottom: ".35rem", fontWeight: 500, fontFamily: "Outfit" }}>{label}</label>
                      <input type={type} placeholder={ph}
                        value={formData[key]}
                        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                        style={{ width: "100%", padding: ".75rem 1rem", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, color: "#fff", fontSize: ".9rem", fontFamily: "Outfit", outline: "none", transition: "border-color .3s" }}
                        onFocus={e => e.target.style.borderColor = "rgba(14,165,233,.4)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.08)"} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".85rem", marginBottom: ".85rem" }}>
                  {[["Email", "email", "email", "correo@empresa.com"], ["Teléfono", "telefono", "tel", "+52 (55) 0000-0000"]].map(([label, key, type, ph]) => (
                    <div key={key}>
                      <label style={{ display: "block", fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 1, color: "#64748b", marginBottom: ".35rem", fontWeight: 500, fontFamily: "Outfit" }}>{label}</label>
                      <input type={type} placeholder={ph}
                        value={formData[key]}
                        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                        style={{ width: "100%", padding: ".75rem 1rem", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, color: "#fff", fontSize: ".9rem", fontFamily: "Outfit", outline: "none", transition: "border-color .3s" }}
                        onFocus={e => e.target.style.borderColor = "rgba(14,165,233,.4)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.08)"} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".85rem", marginBottom: ".85rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 1, color: "#64748b", marginBottom: ".35rem", fontWeight: 500, fontFamily: "Outfit" }}>Aplicación</label>
                    <select value={formData.aplicacion} onChange={e => setFormData({ ...formData, aplicacion: e.target.value })}
                      style={{ width: "100%", padding: ".75rem 1rem", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, color: formData.aplicacion ? "#fff" : "#64748b", fontSize: ".9rem", fontFamily: "Outfit", outline: "none", appearance: "none", cursor: "pointer" }}>
                      <option value="" disabled>Seleccionar</option>
                      {["Hospitalidad / Turismo", "Eventos / Producción", "Industrial / Manufactura", "Corporativo / Institucional", "Residencial", "Gobierno / Comunidades", "Otro"].map(o => <option key={o} value={o} style={{ background: "#0f172a" }}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 1, color: "#64748b", marginBottom: ".35rem", fontWeight: 500, fontFamily: "Outfit" }}>Consumo estimado</label>
                    <select value={formData.consumo} onChange={e => setFormData({ ...formData, consumo: e.target.value })}
                      style={{ width: "100%", padding: ".75rem 1rem", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, color: formData.consumo ? "#fff" : "#64748b", fontSize: ".9rem", fontFamily: "Outfit", outline: "none", appearance: "none", cursor: "pointer" }}>
                      <option value="" disabled>Litros por día</option>
                      {["20–100 L/día", "100–500 L/día", "500–2,000 L/día", "2,000–6,000 L/día", "+6,000 L/día", "No estoy seguro"].map(o => <option key={o} value={o} style={{ background: "#0f172a" }}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: ".85rem" }}>
                  <label style={{ display: "block", fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 1, color: "#64748b", marginBottom: ".35rem", fontWeight: 500, fontFamily: "Outfit" }}>Ciudad</label>
                  <input type="text" placeholder="Ciudad de México" value={formData.ciudad}
                    onChange={e => setFormData({ ...formData, ciudad: e.target.value })}
                    style={{ width: "100%", padding: ".75rem 1rem", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, color: "#fff", fontSize: ".9rem", fontFamily: "Outfit", outline: "none", transition: "border-color .3s" }}
                    onFocus={e => e.target.style.borderColor = "rgba(14,165,233,.4)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.08)"} />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: ".7rem", textTransform: "uppercase", letterSpacing: 1, color: "#64748b", marginBottom: ".35rem", fontWeight: 500, fontFamily: "Outfit" }}>Mensaje <span style={{ fontWeight: 300, textTransform: "none", letterSpacing: 0 }}>(opcional)</span></label>
                  <textarea placeholder="Cuéntanos brevemente sobre tu proyecto..." rows={3} value={formData.mensaje}
                    onChange={e => setFormData({ ...formData, mensaje: e.target.value })}
                    style={{ width: "100%", padding: ".75rem 1rem", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, color: "#fff", fontSize: ".9rem", fontFamily: "Outfit", outline: "none", resize: "vertical", minHeight: 80, transition: "border-color .3s" }}
                    onFocus={e => e.target.style.borderColor = "rgba(14,165,233,.4)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.08)"} />
                </div>
                <button onClick={handleSubmit}
                  style={{
                    width: "100%", padding: ".9rem",
                    background: formSent ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #0ea5e9, #38bdf8)",
                    color: "#fff", borderRadius: 12, fontWeight: 600, fontSize: ".95rem", border: "none", cursor: "pointer",
                    fontFamily: "Outfit", transition: "all .3s"
                  }}>
                  {formSent ? "✓ Solicitud enviada" : "Enviar solicitud →"}
                </button>
                <p style={{ fontSize: ".72rem", color: "#475569", marginTop: ".75rem", textAlign: "center", fontFamily: "Outfit" }}>
                  Responderemos dentro de 48 horas hábiles. Tu información es confidencial.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.04)", padding: "2.5rem 2rem", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: ".5rem", marginBottom: ".75rem" }}>
          <Drop size={20} />
          <span style={{ fontFamily: "Outfit", fontWeight: 600, color: "#fff", fontSize: ".95rem" }}>Air to Water MX</span>
        </div>
        <p style={{ fontSize: ".78rem", color: "#475569", lineHeight: 2, fontFamily: "Outfit" }}>
          contacto@airtowater.mx · Ciudad de México, México<br />
          Operado por <strong style={{ color: "#64748b" }}>Alpha Tauro Leasing S.A. de C.V.</strong> · RFC: ATL230515LB8
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: ".6rem", marginTop: ".75rem" }}>
          {["COFEPRIS / NOM-201", "México y LATAM"].map(tag => (
            <span key={tag} style={{
              fontSize: ".65rem", color: "#38bdf8", padding: ".3rem .75rem", borderRadius: 100,
              border: "1px solid rgba(56,189,248,.15)", fontFamily: "Outfit", fontWeight: 500, letterSpacing: .5
            }}>{tag}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}