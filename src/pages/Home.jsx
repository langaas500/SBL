import { Link } from "react-router-dom";
import SiteNav from "../components/SiteNav";
import AIChatWidget from "../components/AIChatWidget";

// ─── Kort 1: FØR – tungvint Excel-skjema ────────────────────
const BeforeCard = () => (
  <div className="home-card home-before" aria-hidden="true">
    <div className="home-card-bar">
      <i style={{ background: "#FF5F57" }} /><i style={{ background: "#FEBC2E" }} /><i style={{ background: "#28C840" }} />
      <span className="home-url">FØR · Excel-skjema</span>
    </div>
    <div className="home-sheet">
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i} className={i < 4 ? "head" : ""} />
      ))}
    </div>
  </div>
);

// ─── Kort 2: ETTER – egen digital løsning ───────────────────
const AfterCard = () => (
  <div className="home-card home-shot" aria-hidden="true">
    <span className="home-tag">ETTER · EGEN LØSNING</span>
    <div className="home-app-head">Rapporter</div>
    {[
      { t: "Servicerapport", s: "Godkjent", ok: true },
      { t: "Avviksmelding", s: "Venter", ok: false },
      { t: "Timeliste", s: "Godkjent", ok: true },
    ].map((r) => (
      <div className="home-app-row" key={r.t}>
        <span className="home-app-dot" />
        <span className="home-app-title">{r.t}</span>
        <span className={`home-chip${r.ok ? " ok" : ""}`}>{r.ok ? "✓ " : ""}{r.s}</span>
      </div>
    ))}
  </div>
);

// ─── Kort 3: idé → prototype ────────────────────────────────
const IdeaCard = () => (
  <div className="home-card home-chat" aria-hidden="true">
    <div className="home-chat-head"><span className="home-chat-icon">✦</span> FRA IDÉ TIL PROTOTYPE <span className="home-chat-dots">•••</span></div>
    <div className="home-bubble home-bubble-user">Excel-skjemaene tar altfor mye tid.</div>
    <div className="home-bubble home-bubble-ai">Da bygger vi noe enklere. Fortell mer.</div>
    <div className="home-chat-row"><code>idé</code> Digitale rapporter <b>✓</b></div>
    <div className="home-chat-row"><code>prototype</code> Klar til å teste <b>✓</b></div>
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
          font-size: clamp(2.4rem, min(5.8vw, 9vh), 5.2rem); animation: fadeInUp .6s ease .1s both;
        }
        .home-title .grad { background: linear-gradient(95deg, #a78bfa 0%, #f0abfc 40%, #fdba74 75%, #bef264 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .home-sub { max-width: 500px; color: var(--muted); font-size: clamp(.95rem, 1.5vh + .4rem, 1.12rem); line-height: 1.65; font-weight: 300; margin: clamp(16px, 3vh, 30px) 0; animation: fadeInUp .6s ease .25s both; }
        .home-sub b { color: #fff; font-weight: 500; }
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
        .home-before { top: 0; left: 2%; width: 50%; animation: float 8s ease-in-out -2s infinite; z-index: 3; }
        .home-shot { top: 28%; right: 0; width: 72%; padding: 44px 16px 14px; animation: float 7s ease-in-out infinite; }
        .home-chat { right: 3%; bottom: 0; width: 58%; padding: 14px; animation: float 9s ease-in-out -4s infinite; z-index: 4; }

        .home-card-bar { display: flex; align-items: center; gap: 5px; padding: 9px 12px; border-bottom: 1px solid rgba(255,255,255,.06); }
        .home-card-bar i { width: 7px; height: 7px; border-radius: 50%; }
        .home-url { margin-left: 8px; font-family: var(--mono); font-size: .62rem; color: rgba(255,255,255,.45); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .home-sheet { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3px; padding: 12px; background: rgba(255,255,255,.02); }
        .home-sheet span { height: 14px; border-radius: 2px; background: rgba(255,255,255,.07); }
        .home-sheet span.head { background: rgba(255,255,255,.16); }

        .home-tag { position: absolute; top: 12px; left: 16px; font-family: var(--mono); font-size: .6rem; letter-spacing: .12em; color: #a89bff; }
        .home-app-head { font-weight: 700; font-size: 1rem; margin-bottom: 10px; }
        .home-app-row { display: flex; align-items: center; gap: 10px; padding: 9px 11px; margin-bottom: 6px; border-radius: 10px; background: rgba(255,255,255,.05); font-size: .78rem; }
        .home-app-dot { width: 8px; height: 8px; border-radius: 50%; background: #7c5cff; flex: none; }
        .home-app-title { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .home-chip { font-size: .62rem; padding: 3px 9px; border-radius: 999px; background: rgba(253,186,116,.16); color: #fdba74; white-space: nowrap; }
        .home-chip.ok { background: rgba(190,242,100,.15); color: #bef264; }
        .home-app-foot { margin-top: 10px; font-family: var(--mono); font-size: .58rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.35); }

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
        .home-foot { display: flex; align-items: center; gap: 20px; padding: 18px clamp(20px, 4vw, 56px) 22px; padding-right: max(96px, 4vw); margin: 0 auto; width: 100%; max-width: 1400px; border-top: 1px solid var(--line); font-family: var(--mono); font-size: .68rem; letter-spacing: .15em; color: rgba(255,255,255,.4); text-transform: uppercase; }
        .home-foot ul { list-style: none; display: flex; flex-wrap: nowrap; gap: 14px; overflow: hidden; white-space: nowrap; }
        .home-foot li + li::before { content: "✦"; color: #7c5cff; margin-right: 14px; }

        /* Hele forsiden skal passe på én skjerm uten scrolling */
        @media (min-width: 901px) and (min-height: 600px) {
          .home { height: 100dvh; overflow: hidden; }
        }

        @media (max-width: 900px) {
          .home-main { grid-template-columns: 1fr; align-content: center; gap: 20px; padding-top: 80px; }
          .home-eyebrow { font-size: .6rem; letter-spacing: .12em; white-space: nowrap; }
          .home-eyebrow::before { width: 16px; }
          .home-title { font-size: clamp(2.2rem, min(10.5vw, 7vh), 3.5rem); margin-top: 14px; }
          .home-stage { justify-self: stretch; width: 100%; aspect-ratio: auto; height: clamp(140px, 22vh, 240px); }
          .home-before, .home-chat { display: none; }
          .home-shot { position: relative; top: 0; width: 100%; height: 100%; animation: none; padding-top: 38px; }
          .home-app-row:nth-of-type(n+3) { display: none; }
          .home-pills { gap: 10px; }
          .home-pill { padding: 11px 16px; font-size: .85rem; }
          .home-foot { padding: 14px 84px 18px 20px; }
        }
        @media (max-width: 900px) and (max-height: 700px) { .home-stage { display: none; } }
      `}</style>

      <SiteNav />

      <main className="home-main">
        <section>
          <div className="home-eyebrow">Nettsider · Apper · Digitale systemer</div>
          <h1 className="home-title">
            Har du en idé<br />
            eller et problem?<br />
            <span className="grad">Jeg løser det digitalt.</span>
          </h1>
          <p className="home-sub">
            Jeg er Martin Langås. Med bakgrunn fra teknisk arbeid og service vet jeg hvordan ting faktisk fungerer ute i bedrifter. <b>Du snakker direkte med den som bygger løsningen.</b>
          </p>
          <div className="home-pills">
            <Link to="/kontakt" className="home-pill primary"><i>01</i> Snakk med Martin</Link>
            <Link to="/om" className="home-pill"><i>02</i> Slik jobber jeg</Link>
          </div>
        </section>

        <div className="home-stage">
          <BeforeCard />
          <AfterCard />
          <IdeaCard />
        </div>
      </main>

      <footer className="home-foot">
        <ul>
          <li>Nettsider</li><li>Apper</li><li>Digitale systemer</li><li>Enklere arbeidsprosesser</li><li>AI-assistert utvikling</li>
        </ul>
      </footer>

      <AIChatWidget />
    </div>
  );
}
