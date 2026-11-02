import { useState } from "react";
import { Link } from "react-router-dom";
import SiteNav from "../components/SiteNav";
import AIChatWidget from "../components/AIChatWidget";

// Gjør et bedriftsnavn om til noe som ligner et domenenavn
const toSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9æøå]+/g, "").slice(0, 20) || "dinbedrift";

// ─── Kort 1: live-demo – skriv bedriftsnavnet ditt ──────────
const DemoCard = () => {
  const [name, setName] = useState("");
  const shown = name.trim() || "Din Bedrift";
  return (
    <div className="home-card home-demo">
      <div className="home-card-bar">
        <i style={{ background: "#FF5F57" }} /><i style={{ background: "#FEBC2E" }} /><i style={{ background: "#28C840" }} />
        <span className="home-url">{toSlug(name)}.no</span>
      </div>
      <div className="home-demo-body">
        <label className="home-demo-input">
          <span>Prøv selv</span>
          <input
            type="text" value={name} maxLength={24} placeholder="Skriv bedriftsnavnet ditt…"
            onChange={(e) => setName(e.target.value)} aria-label="Skriv bedriftsnavnet ditt for å se en forhåndsvisning"
          />
        </label>
        <div className="home-preview" aria-live="polite">
          <div className="home-preview-nav"><b>{shown}</b><em /><em /><em /></div>
          <div className="home-preview-title">Velkommen til <span className="gradient-text">{shown}</span></div>
          <div className="home-preview-btn">Kontakt oss</div>
        </div>
      </div>
    </div>
  );
};

// ─── Kort 2: AI-assistenten ─────────────────────────────────
const ChatCard = () => (
  <div className="home-card home-chat">
    <div className="home-chat-head"><span className="home-chat-icon">✦</span> LANGAAS AI <span className="home-chat-dots">•••</span></div>
    <div className="home-bubble home-bubble-user">Hva koster en nettside?</div>
    <div className="home-bubble home-bubble-ai">Fra 2.999 kr, og ferdig på under en uke.</div>
    <div className="home-chat-row"><code>analyse</code> bransje: restaurant <b>✓</b></div>
    <div className="home-chat-row"><code>forslag</code> Enkel · 2.999 kr <b>✓</b></div>
  </div>
);

export default function Home() {
  return (
    <div className="home">
      <style>{`
        .home { position: relative; min-height: 100dvh; display: flex; flex-direction: column; overflow-x: hidden; }
        .home-main {
          flex: 1; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); align-items: center;
          gap: clamp(24px, 4vw, 64px); padding: 96px clamp(20px, 4vw, 56px) 24px; width: 100%; max-width: 1400px; margin: 0 auto;
        }
        .home-eyebrow { display: flex; align-items: center; gap: 14px; font-family: var(--mono); font-size: .72rem; letter-spacing: .2em; color: #a89bff; text-transform: uppercase; animation: fadeInUp .6s ease both; }
        .home-eyebrow::before { content: ""; width: 28px; height: 1px; background: #a89bff; }
        .home-title {
          font-weight: 800; letter-spacing: -.04em; line-height: .98; margin: 22px 0 0;
          font-size: clamp(2.5rem, min(6.2vw, 9.5vh), 5.6rem); animation: fadeInUp .6s ease .1s both;
        }
        .home-title .grad { background: linear-gradient(95deg, #a78bfa 0%, #f0abfc 40%, #fdba74 75%, #bef264 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .home-sub { max-width: 470px; color: var(--muted); font-size: clamp(.95rem, 1.5vh + .4rem, 1.12rem); line-height: 1.65; font-weight: 300; margin: clamp(16px, 3vh, 30px) 0; animation: fadeInUp .6s ease .25s both; }
        .home-sub b { color: #38bdf8; font-weight: 500; }
        .home-pills { display: flex; flex-wrap: wrap; gap: 12px; animation: fadeInUp .6s ease .4s both; }
        .home-pill {
          display: inline-flex; align-items: center; gap: 10px; padding: 12px 20px; border-radius: 999px; text-decoration: none;
          border: 1px solid var(--line); background: rgba(255,255,255,.06); backdrop-filter: blur(10px);
          font-size: .9rem; font-weight: 500; transition: transform .3s, border-color .3s, background .3s;
        }
        .home-pill i { font-style: normal; font-family: var(--mono); font-size: .65rem; color: #a89bff; }
        .home-pill:hover { transform: translateY(-2px); border-color: rgba(232,121,249,.45); background: rgba(232,121,249,.1); }
        .home-pill.primary { background: linear-gradient(135deg, #e879f9, #a855f7); border-color: transparent; }
        .home-pill.primary i { color: rgba(255,255,255,.75); }

        /* Scene til høyre */
        .home-stage { position: relative; justify-self: end; width: min(100%, 620px, calc((100dvh - 190px) * 1.12)); aspect-ratio: 1.12 / 1; animation: fadeInUp .8s ease .35s both; }
        .home-card { position: absolute; border-radius: 16px; border: 1px solid rgba(255,255,255,.1); background: rgba(24,20,42,.82); backdrop-filter: blur(14px); box-shadow: 0 24px 60px rgba(0,0,0,.45); overflow: hidden; }
        .home-shot { top: 24%; right: 0; width: 76%; aspect-ratio: 1.42 / 1; animation: float 7s ease-in-out infinite; }
        .home-shot img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .home-shot::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 55%, rgba(14,12,23,.55)); }
        .home-tag { position: absolute; top: 12px; right: 12px; z-index: 2; padding: 4px 10px; border-radius: 6px; background: #5b3df5; font-family: var(--mono); font-size: .6rem; letter-spacing: .08em; }
        .home-demo { top: 0; left: 4%; width: 58%; animation: float 8s ease-in-out -2s infinite; z-index: 3; }
        .home-chat { right: 3%; bottom: 0; width: 56%; padding: 14px; animation: float 9s ease-in-out -4s infinite; z-index: 4; }

        .home-card-bar { display: flex; align-items: center; gap: 5px; padding: 9px 12px; border-bottom: 1px solid rgba(255,255,255,.06); }
        .home-card-bar i { width: 7px; height: 7px; border-radius: 50%; }
        .home-url { margin-left: 8px; font-family: var(--mono); font-size: .62rem; color: rgba(255,255,255,.45); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .home-demo-body { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
        .home-demo-input { display: block; }
        .home-demo-input span { display: block; font-family: var(--mono); font-size: .58rem; letter-spacing: .12em; text-transform: uppercase; color: #a89bff; margin-bottom: 5px; }
        .home-demo-input input { width: 100%; padding: 8px 12px; border-radius: 9px; border: 1px dashed rgba(168,155,255,.5); background: rgba(124,92,255,.1); color: #fff; font: 500 .82rem var(--font); outline: none; }
        .home-demo-input input:focus { border-style: solid; border-color: var(--pink); }
        .home-demo-input input::placeholder { color: rgba(255,255,255,.4); }
        .home-preview { border-radius: 10px; background: rgba(8,6,16,.7); border: 1px solid rgba(255,255,255,.06); padding: 10px 12px 12px; }
        .home-preview-nav { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
        .home-preview-nav b { flex: 1; font-size: .7rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .home-preview-nav em { width: 14px; height: 3px; border-radius: 2px; background: rgba(255,255,255,.2); }
        .home-preview-title { font-weight: 800; font-size: 1.05rem; line-height: 1.15; letter-spacing: -.02em; overflow-wrap: anywhere; }
        .home-preview-btn { display: inline-block; margin-top: 10px; padding: 4px 12px; border-radius: 999px; font-size: .6rem; font-weight: 600; background: linear-gradient(135deg,#e879f9,#a855f7); }

        .home-chat-head { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: .58rem; letter-spacing: .12em; color: rgba(255,255,255,.5); margin-bottom: 10px; }
        .home-chat-icon { width: 20px; height: 20px; border-radius: 6px; background: #5b3df5; display: grid; place-items: center; color: #fff; font-size: .65rem; }
        .home-chat-dots { margin-left: auto; }
        .home-bubble { padding: 8px 12px; border-radius: 12px; font-size: .74rem; line-height: 1.4; margin-bottom: 7px; max-width: 92%; }
        .home-bubble-user { background: #5b3df5; margin-left: auto; border-bottom-right-radius: 4px; }
        .home-bubble-ai { background: rgba(255,255,255,.08); border-bottom-left-radius: 4px; }
        .home-chat-row { display: flex; align-items: center; gap: 8px; padding: 6px 10px; margin-top: 5px; border-radius: 8px; background: rgba(255,255,255,.05); font-size: .62rem; color: rgba(255,255,255,.6); }
        .home-chat-row code { font-family: var(--mono); color: #a89bff; background: rgba(124,92,255,.18); padding: 1px 6px; border-radius: 4px; }
        .home-chat-row b { margin-left: auto; width: 16px; height: 16px; border-radius: 50%; background: #bef264; color: #14210a; display: grid; place-items: center; font-size: .6rem; }

        /* Bunnlinje */
        .home-foot { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 18px clamp(20px, 4vw, 56px) 22px; padding-right: max(96px, 4vw); margin: 0 auto; width: 100%; max-width: 1400px; border-top: 1px solid var(--line); font-family: var(--mono); font-size: .68rem; letter-spacing: .15em; color: rgba(255,255,255,.4); text-transform: uppercase; }
        .home-foot ul { list-style: none; display: flex; flex-wrap: nowrap; gap: 14px; overflow: hidden; white-space: nowrap; }
        .home-foot li + li::before { content: "✦"; color: #7c5cff; margin-right: 14px; }
        .home-foot-loc { white-space: nowrap; }

        /* Hele forsiden skal passe på én skjerm uten scrolling */
        @media (min-width: 901px) and (min-height: 600px) {
          .home { height: 100dvh; overflow: hidden; }
        }

        @media (max-width: 900px) {
          .home-main { grid-template-columns: 1fr; align-content: center; gap: 22px; padding-top: 84px; }
          .home-title { font-size: clamp(2.3rem, min(11vw, 7.2vh), 3.6rem); margin-top: 14px; }
          .home-stage { justify-self: stretch; width: 100%; aspect-ratio: auto; height: clamp(150px, 31vh, 300px); }
          .home-demo, .home-chat { display: none; }
          .home-shot { position: relative; top: 0; width: 100%; height: 100%; aspect-ratio: auto; animation: none; }
          .home-pills { gap: 10px; }
          .home-pill { padding: 11px 16px; font-size: .85rem; }
          .home-foot { padding: 14px 84px 18px 20px; }
          .home-foot-loc { display: none; }
        }
        @media (max-width: 900px) and (max-height: 700px) { .home-stage { display: none; } }
      `}</style>

      <SiteNav />

      <main className="home-main">
        <section>
          <div className="home-eyebrow">Lokalt · Håndskrevet · AI-klar</div>
          <h1 className="home-title">
            Nettsider som<br />
            gjør inntrykk<br />
            <span className="grad">for din bedrift.</span>
          </h1>
          <p className="home-sub">
            Moderne, raske nettsider for restauranter, håndverkere og lokale bedrifter – levert på under en uke, fra <b>2.999 kr</b>.
          </p>
          <div className="home-pills">
            <Link to="/prosjekter" className="home-pill primary"><i>01</i> Se prosjektene</Link>
            <Link to="/kontakt" className="home-pill"><i>02</i> Gratis konsultasjon</Link>
          </div>
        </section>

        <div className="home-stage" aria-hidden="false">
          <DemoCard />
          <div className="home-card home-shot">
            <span className="home-tag">NY NETTSIDE</span>
            <img src="/hero-mockup.png" alt="Laptop og mobil med nettsider laget av Solutions by Langaas" />
          </div>
          <ChatCard />
        </div>
      </main>

      <footer className="home-foot">
        <ul>
          <li>Webdesign</li><li>Utvikling</li><li>SEO</li><li>AI-chat</li><li>Hosting</li><li>Vedlikehold</li>
        </ul>
        <span className="home-foot-loc">Mysen · Indre Østfold</span>
      </footer>

      <AIChatWidget />
    </div>
  );
}
