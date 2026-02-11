import { Link } from 'react-router-dom'

export default function Priser() {
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
        .cta-outline { padding: 12px 28px; border-radius: 50px; border: 1px solid rgba(232,121,249,0.25); background: transparent; color: #E879F9; font-weight: 500; font-size: 0.82rem; font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.3s ease; }
        .cta-outline:hover { background: rgba(232,121,249,0.06); border-color: #E879F9; }
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
          <Link to="/prosjekter" className="nav-link sub-nav-links">Prosjekter</Link>
          <Link to="/priser" className="nav-link sub-nav-links" style={{ color: "#E879F9" }}>Priser</Link>
          <Link to="/kontakt" className="cta-btn" style={{ padding: "8px 20px", fontSize: "0.75rem", textDecoration: "none" }}>Kontakt meg</Link>
        </div>
      </nav>

      <section className="sub-hero" style={{ padding: "140px 48px 80px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#34D399", letterSpacing: "0.2em", textTransform: "uppercase" }}>PRISER</span>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", marginTop: "10px" }}>
          Enkelt og transparent<span style={{ color: "#34D399" }}>.</span>
        </h1>
      </section>

      <section className="sub-content" style={{ padding: "0 48px 120px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="sub-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", alignItems: "stretch" }}>
          {/* Starter */}
          <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", padding: "36px 28px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>STARTER</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "2.5rem", lineHeight: 1 }}>
              2.999<span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)" }}> kr</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", margin: "10px 0 22px" }}>Perfekt for oppstart</p>
            {["Én-sides nettside", "Mobiloptimalisert", "Kontaktskjema", "Google Maps", "Levert på 5–7 dager"].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
                <span style={{ color: "#34D399", fontSize: "0.6rem" }}>✓</span>{f}
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <button className="cta-outline" style={{ width: "100%", marginTop: "28px", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>Velg Starter</button>
          </div>
          {/* Pro */}
          <div style={{
            borderRadius: "16px", border: "1px solid rgba(232,121,249,0.25)", padding: "36px 28px",
            background: "linear-gradient(135deg, rgba(232,121,249,0.08) 0%, rgba(20,18,19,1) 100%)",
            position: "relative", display: "flex", flexDirection: "column", boxShadow: "0 0 36px rgba(232,121,249,0.06)",
          }}>
            <div style={{
              position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)",
              padding: "3px 14px", borderRadius: "0 0 8px 8px", background: "linear-gradient(135deg, #E879F9, #A855F7)",
              color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.1em",
            }}>MEST POPULÆR</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#E879F9", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>PRO</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "2.5rem", lineHeight: 1 }}>
              4.999<span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)" }}> kr</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", margin: "10px 0 22px" }}>For bedrifter som vil vokse</p>
            {["Alt i Starter +", "Flersides design", "SEO-optimalisering", "Sosiale medier", "Interaktive elementer", "Analytics dashboard"].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(232,121,249,0.05)", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>
                <span style={{ color: "#E879F9", fontSize: "0.6rem" }}>✓</span>{f}
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <button className="cta-btn" style={{ width: "100%", marginTop: "28px" }}>Velg Pro</button>
          </div>
          {/* Enterprise */}
          <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", padding: "36px 28px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>ENTERPRISE</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "2.5rem", lineHeight: 1 }}>Tilbud</div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", margin: "10px 0 22px" }}>Skreddersydde løsninger</p>
            {["Alt i Pro +", "AI-chatbot", "Booking-system", "Betalingsløsning", "Dedikert support", "Ubegrenset endringer"].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
                <span style={{ color: "#38BDF8", fontSize: "0.6rem" }}>✓</span>{f}
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <Link to="/kontakt" className="cta-outline" style={{ width: "100%", marginTop: "28px", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", textDecoration: "none", textAlign: "center", display: "block" }}>Kontakt meg</Link>
          </div>
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
