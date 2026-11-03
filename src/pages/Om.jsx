import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import Reveal from '../components/Reveal'

// Utviklingen fra et praktisk problem til en fungerende løsning, slik den er fortalt i historien.
const flow = [
  'Tungvinte Excel-skjemaer',
  'Min egen digitale løsning',
  'Tatt i bruk av lederen min',
  'Videreutviklet med flere funksjoner',
]

export default function Om() {
  return (
    <div className="page om">
      <SiteNav calm />

      <main>
        {/* ── Hero ── */}
        <section className="om-hero">
          <Reveal className="om-wrap">
            <div className="om-label">Mennesket bak SBL</div>
            <h1 className="om-title">
              <span className="om-title-soft">Håndverker av yrke.</span>
              <span className="om-title-main">
                <span className="om-grad">Teknologientusiast</span> av lidenskap.
              </span>
            </h1>
          </Reveal>

          <div className="om-wrap om-hero-grid">
            <Reveal className="om-intro" delay={120}>
              <p className="om-name">Jeg heter Martin Langaas.</p>
              <p>
                I over ti år har jeg jobbet i tekniske fag, blant annet syv år som bas. Men ved siden av jobben har jeg
                hatt en annen stor lidenskap: IT og teknologi.
              </p>
              <p>
                I 17 år har jeg brukt fritiden min på det som interesserer meg aller mest. Jeg elsker å forstå hvordan
                teknologi fungerer, utforske mulighetene og finne nye måter å løse problemer på.
              </p>
            </Reveal>

            <Reveal className="om-portrait" delay={220}>
              <img
                src="/om/martin-langaas.webp"
                alt="Portrett av Martin Langaas"
                width="1000" height="1250"
                fetchPriority="high"
              />
            </Reveal>
          </div>

          <Reveal className="om-wrap" delay={200}>
            <dl className="om-facts">
              <div><dt>17 år</dt><dd>med IT og teknologi på fritiden</dd></div>
              <div><dt>10+ år</dt><dd>i tekniske fag</dd></div>
              <div><dt>7 år</dt><dd>som bas</dd></div>
            </dl>
          </Reveal>
        </section>

        {/* ── Historien ── */}
        <section className="om-section">
          <Reveal className="om-panel">
            <div className="om-panel-text">
              <div className="om-label">Historien</div>
              <h2 className="om-h2">Når to verdener møtes.</h2>
              <p>Etter hvert begynte de to verdenene å møtes.</p>
              <p>
                Jeg så hvor mye tid som gikk med til tungvinte Excel-skjemaer og manuelle arbeidsprosesser. Så jeg bygde
                min egen digitale løsning. Den fungerte så godt at lederen min begynte å bruke den, og jeg videreutviklet
                den med flere funksjoner.
              </p>
              <p className="om-pull">Det ga meg lyst til å ta interessen et steg videre.</p>
            </div>

            <div className="om-panel-visual">
              <figure className="om-shot">
                <img
                  src="/projects/servicerapport.webp"
                  alt="Innloggingen i Servicerapport-appen jeg bygde, på mobil"
                  width="600" height="600" loading="lazy"
                />
                <figcaption>
                  Servicerapport-appen. <Link to="/prosjekter">Se prosjektet</Link>
                </figcaption>
              </figure>
              <ol className="om-flow" aria-label="Fra problem til løsning">
                {flow.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
          </Reveal>
        </section>

        {/* ── Starten på reisen ── */}
        <section className="om-journey">
          <Reveal className="om-wrap om-journey-in">
            <div className="om-label om-label-center">Solutions by Langaas</div>
            <h2 className="om-h2 om-h2-xl">Solutions by Langaas er starten på den reisen.</h2>
            <p className="om-journey-text">
              Jeg bygger nå gradvis opp mitt eget firma, hvor jeg kombinerer praktisk erfaring fra arbeidslivet med min
              mangeårige interesse for teknologi.
            </p>
          </Reveal>
          <Reveal className="om-wrap om-goal-wrap" delay={160}>
            <p className="om-goal-lead">Målet er enkelt:</p>
            <p className="om-goal">
              Å skape nettsider, apper og digitale systemer som løser <span className="om-grad">virkelige problemer.</span>
            </p>
          </Reveal>
        </section>

        {/* ── Avslutning ── */}
        <section className="om-section om-end">
          <Reveal className="om-cta">
            <h2 className="om-h2">Har du noe du vil gjøre enklere?</h2>
            <p>
              Enten du trenger en moderne nettside eller har en idé til et digitalt verktøy, tar jeg gjerne en
              uforpliktende prat.
            </p>
            <div className="om-cta-row">
              <Link to="/kontakt" className="btn primary">La oss ta en prat</Link>
              <Link to="/tjenester" className="btn">Se hva jeg tilbyr</Link>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
