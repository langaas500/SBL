import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

const story = [
  { title: 'Lei av Excel-skjemaene', desc: 'På arbeidsplassen min var arbeidsprosessene tungvinte, med Excel-skjemaer som tok unødvendig mye tid.' },
  { title: 'Bygde min egen løsning', desc: 'I stedet for å fortsette med et tungvint system, bygde jeg en digital løsning selv.' },
  { title: 'Lederen tok den i bruk', desc: 'Den fungerte så godt til formålet at lederen min også begynte å bruke den.' },
  { title: 'Videreutviklet den', desc: 'Jeg bygde den videre med administrasjon og godkjenning av rapporter.' },
]

const strengths = [
  { n: '01', title: 'Teknisk forståelse', desc: 'Mange års erfaring fra teknisk arbeid og service, så jeg vet hvordan ting faktisk fungerer ute i bedrifter.' },
  { n: '02', title: 'Kreativitet', desc: 'Jeg bruker moderne teknologi og kunstig intelligens aktivt for å utvikle raskere, fra idé til fungerende prototype på kort tid.' },
  { n: '03', title: 'Praktiske løsninger', desc: 'Ser jeg en tungvint arbeidsprosess, begynner jeg å tenke på hvordan den kan gjøres enklere.' },
]

export default function Om() {
  return (
    <div className="page">
      <SiteNav />
      <main className="page-main">
        <div className="eyebrow">Om Martin</div>
        <h1 className="page-title">Jeg vet hvordan ting <span className="grad">fungerer i praksis.</span></h1>
        <p className="page-lead">
          Jeg er Martin Langås. Jeg har mange års erfaring fra teknisk arbeid og service, og kommer ikke fra en rent teoretisk bakgrunn. Jeg er en praktisk problemløser.
        </p>

        <div className="section-label">Historien som sier mest</div>
        <ol className="steps">
          {story.map((s) => (
            <li key={s.title}><h3>{s.title}</h3><p>{s.desc}</p></li>
          ))}
        </ol>

        <div className="section-label">Det jeg bringer med meg</div>
        <div className="cards">
          {strengths.map((s) => (
            <div className="card" key={s.n}>
              <div className="card-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="section-label">Direkte kontakt</div>
        <p className="page-lead" style={{ marginTop: 0 }}>
          Solutions by Langås er et lite firma. Du forholder deg direkte til personen som utvikler løsningen.
        </p>

        <div className="cta-row">
          <Link to="/kontakt" className="btn primary">Fortell meg om ideen din →</Link>
          <Link to="/tjenester" className="btn">Se hva jeg bygger</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
