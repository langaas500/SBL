import { Link } from 'react-router-dom'

export default function Tjenester() {
  const services = [
    { icon: "🍽️", title: "Restaurant-sider", desc: "Interaktive menyer, booking-systemer og atmosfærisk design som får gjester i døren. Vi bygger nettsider som speiler stemningen i restauranten din.", accent: "#E879F9", href: "https://showcase-hub-black.vercel.app/restauranter" },
    { icon: "🔨", title: "Håndverker-sider", desc: "Profesjonelle nettsider som viser frem arbeidet ditt og genererer leads. Bildegallerier, referanser og enkel kontakt.", accent: "#38BDF8" },
    { icon: "🏪", title: "Butikk & Retail", desc: "Moderne nettsider som synliggjør produkter, åpningstider og lokasjon. Få kunder inn i butikken.", accent: "#34D399" },
    { icon: "🤖", title: "AI-integrasjoner", desc: "Smarte chatboter og AI-verktøy som gir kundene dine svar 24/7. Automatiser kundeservice og spar tid.", accent: "#F59E0B" },
    { icon: "🎨", title: "Webdesign", desc: "Skreddersydd design som reflekterer merkevaren din. Ingen maler — alt bygges fra bunnen av.", accent: "#A855F7" },
    { icon: "📈", title: "SEO & Synlighet", desc: "Bli funnet på Google. Vi optimaliserer nettsiden din for søkemotorer slik at kundene finner deg.", accent: "#34D399" },
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
      `}</style>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(20,18,19,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "0.08em" }}>
            <span className="gradient-text">SBL</span>
          </div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          <Link to="/tjenester" className="nav-link" style={{ color: "#E879F9" }}>Tjenester</Link>
          <Link to="/prosjekter" className="nav-link">Prosjekter</Link>
          <Link to="/priser" className="nav-link">Priser</Link>
          <button className="cta-btn" style={{ padding: "8px 20px", fontSize: "0.75rem" }}>Kontakt meg</button>
        </div>
      </nav>

      <section style={{ padding: "140px 48px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#E879F9", letterSpacing: "0.2em", textTransform: "uppercase" }}>TJENESTER</span>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", marginTop: "10px", lineHeight: 1.05 }}>
          Alt din bedrift<br />trenger på nett<span style={{ color: "#E879F9" }}>.</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", maxWidth: "500px", lineHeight: 1.7, marginTop: "20px" }}>
          Fra design til utvikling og lansering. Jeg leverer komplette løsninger tilpasset din bedrift.
        </p>
      </section>

      <section style={{ padding: "0 48px 120px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
          {services.map((s, i) => {
            const Tag = s.href ? "a" : "div"
            const linkProps = s.href ? { href: s.href, target: "_blank", rel: "noopener noreferrer" } : {}
            return (
              <Tag key={i} {...linkProps} style={{
                padding: "36px 30px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.015)", transition: "all 0.4s ease", cursor: "pointer", textDecoration: "none", color: "inherit",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.accent}30`; e.currentTarget.style.background = `${s.accent}06`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.background = "rgba(255,255,255,0.015)"; }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "1.15rem", marginBottom: "10px", color: "#fff" }}>{s.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{s.desc}</p>
              </Tag>
            )
          })}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "36px 48px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.15)", fontFamily: "'JetBrains Mono', monospace" }}>
          © 2026 Solutions by Langaas. Org nr 936 977 774.
        </p>
      </footer>
    </div>
  )
}
