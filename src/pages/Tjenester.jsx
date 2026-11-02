import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

const offers = [
  { n: '01', title: 'Nettside', desc: 'En nettside som presenterer bedriften din og fungerer for de som skal bruke den.' },
  { n: '02', title: 'App', desc: 'Trenger du noe kundene eller de ansatte kan bruke i hverdagen, kan løsningen bli en app.' },
  { n: '03', title: 'Digitalt system', desc: 'Sliter dere med tungvinte arbeidsprosesser, som Excel-skjemaer og manuelle rapporter? Rapportering, administrasjon og godkjenning kan gjøres enkelt og digitalt.' },
  { n: '04', title: 'Usikker på hva du trenger?', desc: 'Du trenger ikke vite hvordan det kan løses. Fortell meg om ideen eller problemet, så finner vi ut av det sammen.' },
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

        <div className="cards">
          {offers.map((o) => (
            <div className="card" key={o.n}>
              <div className="card-num">{o.n}</div>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
            </div>
          ))}
        </div>

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
