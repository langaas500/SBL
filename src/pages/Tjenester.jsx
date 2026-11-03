import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

const offers = [
  { n: '01', title: 'Nettside', desc: 'En nettside som presenterer bedriften din og fungerer for de som skal bruke den.' },
  { n: '02', title: 'App', desc: 'Trenger du noe kundene eller de ansatte kan bruke i hverdagen, kan løsningen bli en app.' },
  { n: '03', title: 'Kundedatabase', desc: 'Kundekort og historikk samlet på ett sted, i stedet for mapper og filer spredt rundt på PC-en.' },
  { n: '04', title: 'Digitalt system', desc: 'Sliter dere med tungvinte arbeidsprosesser, som Excel-skjemaer og manuelle rapporter? Rapportering, administrasjon og godkjenning kan gjøres enkelt og digitalt.' },
]

// Hva en kundedatabase kan gjøre. Beskriver hva jeg kan bygge, ikke tall eller resultater.
const crm = [
  'Et kundekort per kunde med navn, kontaktperson, telefon, e-post og adresse',
  'Historikk per kunde, slik at du ser hva som er gjort og når',
  'Alt i én søkbar oversikt i stedet for mapper med filer på PC-en',
  'Tilgang for de som trenger det, med innlogging og roller',
  'Kan hentes inn fra det dere har i dag, for eksempel Excel-lister',
]

const steps = [
  { title: 'Du forteller om ideen eller problemet', desc: 'Hva er tungvint i hverdagen din? Hva skulle du ønske var enklere?' },
  { title: 'Jeg bygger en fungerende prototype', desc: 'Jeg bruker moderne teknologi og kunstig intelligens aktivt, og kommer raskt fra idé til noe du kan prøve.' },
  { title: 'Vi bygger det videre sammen', desc: 'Du forholder deg hele tiden direkte til meg, som utvikler løsningen.' },
]

export default function Tjenester() {
  return (
    <div className="page">
      <SiteNav />
      <main className="page-main">
        <div className="eyebrow">Tjenester</div>
        <h1 className="page-title">Nettside, app eller <span className="grad">digitalt system.</span></h1>
        <p className="page-lead">
          Jeg bygger det som faktisk løser et problem hos deg, basert på hvordan ting fungerer ute i bedrifter.
        </p>

        <div className="cards cards-2">
          {offers.map((o) => (
            <div className="card" key={o.n}>
              <div className="card-num">{o.n}</div>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
            </div>
          ))}
        </div>

        <section className="crm">
          <div className="crm-text">
            <div className="section-label crm-label">Kundedatabase</div>
            <h2 className="crm-title">Slutt med mapper på PC-en.</h2>
            <p>
              Mange bedrifter har kundeinformasjon spredt i mapper, Excel-ark og e-post. Jeg kan bygge en ordentlig
              database med kundekort og historikk, så alle finner det de trenger på ett sted.
            </p>
            <p>
              Et eksempel er Servicerapport-appen, der hver rapport er koblet til et kundekort og kan finnes igjen
              senere. <Link to="/prosjekter/servicerapport">Se prosjektet</Link>
            </p>
          </div>
          <ul className="crm-list">
            {crm.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>

        <p className="unsure">
          <b>Usikker på hva du trenger?</b> Du trenger ikke vite hvordan det kan løses. Fortell meg om ideen eller
          problemet, så finner vi ut av det sammen.
        </p>

        <div className="section-label">Slik jobber jeg</div>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.title}><h3>{s.title}</h3><p>{s.desc}</p></li>
          ))}
        </ol>

        <div className="cta-row">
          <Link to="/kontakt" className="btn primary">Snakk med Martin →</Link>
          <Link to="/om" className="btn">Les mer om meg</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
