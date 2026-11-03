import { useState } from 'react'
import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav'

export default function Kontakt() {
  const [form, setForm] = useState({ navn: '', epost: '', telefon: '', melding: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, kilde: 'kontaktskjema' }),
      })
      if (!res.ok) throw new Error('Feil ved sending')
      setStatus('sent')
      setForm({ navn: '', epost: '', telefon: '', melding: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="kontakt-root" style={{ minHeight: "100vh", background: "transparent", color: "#fff", fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
                        .cta-btn { padding: 12px 28px; border-radius: 50px; border: none; background: #6d5dfc; color: #fff; font-weight: 600; font-size: 0.82rem; font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.3s ease; }
        .cta-btn:hover { background: #7b6dff; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(109,93,252,0.28); }
        @media (max-width: 1040px) {
          .kontakt-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 700px) {
          .sub-hero { padding: 100px 20px 48px !important; }
          .sub-content { padding: 0 20px 80px !important; }
          .sub-footer { padding: 24px 20px !important; }
        }
      `}</style>

      <SiteNav />

      <section className="sub-hero" style={{ padding: "112px 48px 56px", maxWidth: "1200px", margin: "0 auto" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#A9B4FF", letterSpacing: "0.2em", textTransform: "uppercase" }}>KONTAKT</span>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", marginTop: "10px", lineHeight: 1.05 }}>
          Fortell meg om ideen<span style={{ color: "#A9B4FF" }}>.</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", maxWidth: "500px", lineHeight: 1.7, marginTop: "20px" }}>
          Har du en idé eller et problem du ikke helt vet hvordan du skal løse digitalt? Det er helt greit. Send meg noen linjer, så tar jeg kontakt.
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
                onFocus={e => e.target.style.borderColor = "rgba(143,156,255,0.3)"}
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
                onFocus={e => e.target.style.borderColor = "rgba(143,156,255,0.3)"}
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
                onFocus={e => e.target.style.borderColor = "rgba(143,156,255,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace", marginBottom: "6px", letterSpacing: "0.05em" }}>Melding</label>
              <textarea
                required rows={5} value={form.melding} onChange={e => setForm({ ...form, melding: e.target.value })}
                placeholder="Hva er tungvint i dag, eller hva vil du ha til å fungere?"
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: "0.85rem", fontFamily: "'Outfit', sans-serif", outline: "none",
                  resize: "vertical", transition: "border-color 0.3s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(143,156,255,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <button type="submit" className="cta-btn" disabled={status === 'sending'} style={{ alignSelf: "flex-start", marginTop: "8px", opacity: status === 'sending' ? 0.6 : 1 }}>
              {status === 'sending' ? 'Sender...' : status === 'sent' ? '✓ Sendt' : 'Send melding →'}
            </button>
            {status === 'sent' && (
              <p role="status" style={{ fontSize: "0.8rem", color: "#34D399" }}>Takk! Jeg tar kontakt.</p>
            )}
            {status === 'error' && (
              <p role="alert" style={{ fontSize: "0.8rem", color: "#F87171" }}>
                Noe gikk galt. Prøv igjen, eller send e-post til martin@solutionsbylangaas.com.
              </p>
            )}
          </form>

          {/* Kontaktinfo */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", paddingTop: "8px" }}>
            <div style={{ padding: "28px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
              <div style={{ fontSize: "0.6rem", color: "#A9B4FF", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>E-post</div>
              <a href="mailto:martin@solutionsbylangaas.com" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", textDecoration: "none" }}>
                martin@solutionsbylangaas.com
              </a>
            </div>

            <div style={{ padding: "28px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
              <div style={{ fontSize: "0.6rem", color: "#A9B4FF", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>Direkte</div>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>Du snakker med personen som bygger løsningen</span>
            </div>

            <div style={{ padding: "28px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
              <div style={{ fontSize: "0.6rem", color: "#A9B4FF", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>Hvem svarer</div>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>Martin Langaas, Solutions by Langaas</span>
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
