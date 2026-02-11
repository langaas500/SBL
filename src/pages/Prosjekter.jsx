import { Link } from 'react-router-dom'

export default function Prosjekter() {
  const projects = [
    { icon: "🍔", category: "Restaurant", title: "Diner 22", desc: "Interaktiv neon-meny for en retro foodtruck. Bestilling og menyvisning.", gradient: "linear-gradient(135deg, #E879F9, #F59E0B)", href: "https://diner22-dlof.vercel.app/meny" },
    { icon: "🔧", category: "Håndverker", title: "Snekker Nord", desc: "Portefølje og kontaktside for en snekker i Nord-Norge.", gradient: "linear-gradient(135deg, #38BDF8, #34D399)" },
    { icon: "⚖️", category: "AI-plattform", title: "harjegkravpå.no", desc: "Juridisk AI-plattform som hjelper folk å forstå sine rettigheter.", gradient: "linear-gradient(135deg, #A855F7, #E879F9)" },
  ]

  return (
    <div style={{ minHeight: "100vh", background: "#171516", color: "#fff", fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #171516; }
        .gradient-text { background: linear-gradient(135deg, #E879F9 0%, #F0ABFC 30%, #C084FC 60%, #A855F7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .nav-link { color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.78rem; font-family: 'Outfit', sans-serif; transition: color 0.3s; font-weight: 400; letter-spacing: 0.02em; }
        .nav-link:hover { color: #E879F9; }
        .cta-btn { padding: 12px 28px; border-radius: 50px; border: none; background: linear-gradient(135deg, #E879F9, #A855F7); color: #fff; font-weight: 600; font-size: 0.82rem; font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.3s ease; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(232,121,249,0.3); }
        @media (max-width: 768px) {
          .sub-nav { padding: 12px 20px !important; }
          .sub-nav-links { display: none !important; }
          .sub-nav-right { gap: 0 !important; }
          .sub-hero { padding: 100px 20px 60px !important; }
          .sub-content { padding: 0 20px 80px !important; }
          .sub-grid-3 { grid-template-columns: 1fr !important; }
          .sub-footer { padding: 24px 20px !important; }
        }
      `}</style>

      <nav className="sub-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(20,18,19,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "0.08em" }}>
            <span className="gradient-text">SBL</span>
          </div>
        </Link>
        <div className="sub-nav-right" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          <Link to="/tjenester" className="nav-link sub-nav-links">Tjenester</Link>
          <Link to="/prosjekter" className="nav-link sub-nav-links" style={{ color: "#E879F9" }}>Prosjekter</Link>
          <Link to="/priser" className="nav-link sub-nav-links">Priser</Link>
          <Link to="/kontakt" className="cta-btn" style={{ padding: "8px 20px", fontSize: "0.75rem", textDecoration: "none" }}>Kontakt meg</Link>
        </div>
      </nav>

      <section className="sub-hero" style={{ padding: "140px 48px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#38BDF8", letterSpacing: "0.2em", textTransform: "uppercase" }}>PROSJEKTER</span>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", marginTop: "10px", lineHeight: 1.05 }}>
          Se hva jeg har bygd<span style={{ color: "#38BDF8" }}>.</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", maxWidth: "500px", lineHeight: 1.7, marginTop: "20px" }}>
          Håndskrevet kode for hver kunde. Ingen maler, ingen dra-og-slipp.
        </p>
      </section>

      <section className="sub-content" style={{ padding: "0 48px 120px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="sub-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
          {projects.map((p, i) => {
            const Tag = p.href ? "a" : "div"
            const linkProps = p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {}
            return (
              <Tag key={i} {...linkProps} style={{ display: "block", borderRadius: "16px", background: p.gradient, padding: "1.5px", cursor: "pointer", textDecoration: "none", color: "inherit" }}>
                <div style={{ borderRadius: "15px", background: "#171516", padding: "28px 24px", height: "100%" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "14px" }}>{p.icon}</div>
                  <div style={{ fontSize: "0.6rem", color: "#E879F9", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>{p.category}</div>
                  <div style={{ fontSize: "1.1rem", fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#fff", lineHeight: 1.3, marginBottom: "10px" }}>{p.title}</div>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </Tag>
            )
          })}
        </div>
      </section>

      <footer className="sub-footer" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "36px 48px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.15)", fontFamily: "'JetBrains Mono', monospace" }}>
          © 2026 Solutions by Langaas. Org nr 936 977 774.
        </p>
      </footer>
    </div>
  )
}
