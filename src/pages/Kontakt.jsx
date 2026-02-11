import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Kontakt() {
  const [form, setForm] = useState({ navn: '', epost: '', telefon: '', melding: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Henvendelse fra ${form.navn}`)
    const body = encodeURIComponent(`Navn: ${form.navn}\nTelefon: ${form.telefon}\n\n${form.melding}`)
    window.location.href = `mailto:hei@solutionsbylangaas.no?subject=${subject}&body=${body}`
    setSent(true)
  }

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
          .kontakt-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
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
          <Link to="/priser" className="nav-link sub-nav-links">Priser</Link>
          <Link to="/kontakt" className="cta-btn" style={{ padding: "8px 20px", fontSize: "0.75rem", textDecoration: "none" }}>Kontakt meg</Link>
        </div>
      </nav>

      <section className="sub-hero" style={{ padding: "140px 48px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#E879F9", letterSpacing: "0.2em", textTransform: "uppercase" }}>KONTAKT</span>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", marginTop: "10px", lineHeight: 1.05 }}>
          La oss snakke<span style={{ color: "#E879F9" }}>.</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", maxWidth: "500px", lineHeight: 1.7, marginTop: "20px" }}>
          Klar for en ny nettside? Send meg en melding, så tar jeg kontakt innen 24 timer.
        </p>
      </section>

      <section className="sub-content" style={{ padding: "0 48px 120px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="kontakt-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
          {/* Skjema */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace", marginBottom: "6px", letterSpacing: "0.05em" }}>Navn</label>
              <input
                type="text" required value={form.navn} onChange={e => setForm({ ...form, navn: e.target.value })}
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: "0.85rem", fontFamily: "'Outfit', sans-serif", outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(232,121,249,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace", marginBottom: "6px", letterSpacing: "0.05em" }}>E-post</label>
              <input
                type="email" required value={form.epost} onChange={e => setForm({ ...form, epost: e.target.value })}
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: "0.85rem", fontFamily: "'Outfit', sans-serif", outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(232,121,249,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace", marginBottom: "6px", letterSpacing: "0.05em" }}>Telefon (valgfritt)</label>
              <input
                type="tel" value={form.telefon} onChange={e => setForm({ ...form, telefon: e.target.value })}
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: "0.85rem", fontFamily: "'Outfit', sans-serif", outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(232,121,249,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace", marginBottom: "6px", letterSpacing: "0.05em" }}>Melding</label>
              <textarea
                required rows={5} value={form.melding} onChange={e => setForm({ ...form, melding: e.target.value })}
                placeholder="Fortell meg litt om prosjektet ditt..."
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: "0.85rem", fontFamily: "'Outfit', sans-serif", outline: "none",
                  resize: "vertical", transition: "border-color 0.3s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(232,121,249,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <button type="submit" className="cta-btn" style={{ alignSelf: "flex-start", marginTop: "8px" }}>
              {sent ? "✓ Åpnet e-postklient" : "Send melding →"}
            </button>
          </form>

          {/* Kontaktinfo */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", paddingTop: "8px" }}>
            <div style={{ padding: "28px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "12px" }}>📧</div>
              <div style={{ fontSize: "0.6rem", color: "#E879F9", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>E-post</div>
              <a href="mailto:hei@solutionsbylangaas.no" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", textDecoration: "none" }}>
                hei@solutionsbylangaas.no
              </a>
            </div>

            <div style={{ padding: "28px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "12px" }}>📍</div>
              <div style={{ fontSize: "0.6rem", color: "#E879F9", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>Lokasjon</div>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>Mysen, Indre Østfold</span>
            </div>

            <div style={{ padding: "28px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "12px" }}>⚡</div>
              <div style={{ fontSize: "0.6rem", color: "#E879F9", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>Responstid</div>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>Svar innen 24 timer</span>
            </div>
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
