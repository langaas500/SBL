import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import { projects } from '../data/projects'

const ReportsMock = () => (
  <div className="mock-reports" aria-hidden="true">
    <b>Rapporter</b>
    <div className="mock-row"><i /><span>Rapport</span><em className="ok">✓ Godkjent</em></div>
    <div className="mock-row"><i /><span>Rapport</span><em>Venter</em></div>
    <div className="mock-row"><i /><span>Rapport</span><em className="ok">✓ Godkjent</em></div>
  </div>
)

const visuals = { reports: ReportsMock }

function ProjectCard({ p }) {
  const Visual = p.visual ? visuals[p.visual] : null
  const Tag = p.url ? 'a' : 'div'
  const linkProps = p.url ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <Tag className="proj" {...linkProps}>
      <div className="proj-visual">
        {p.image
          ? <img src={p.image} alt={`Skjermbilde av ${p.title}`} loading="lazy" />
          : Visual && <Visual />}
      </div>
      <div className="proj-body">
        <div className="proj-cat">{p.category}</div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        {p.tags?.length > 0 && (
          <div className="proj-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
        )}
        {p.url && <span className="proj-link">Se løsningen →</span>}
      </div>
    </Tag>
  )
}

export default function Prosjekter() {
  return (
    <div className="page">
      <SiteNav />
      <main className="page-main">
        <div className="eyebrow">Prosjekter</div>
        <h1 className="page-title">Noe av det jeg har <span className="grad">bygd.</span></h1>
        <p className="page-lead">
          Løsninger som er laget for å brukes i hverdagen, fra tungvinte prosesser til noe som faktisk fungerer.
        </p>

        <div className="proj-grid">
          {projects.map((p) => <ProjectCard key={p.title} p={p} />)}

          <div className="proj proj-more">
            <div className="proj-cat">Neste prosjekt</div>
            <h3>Har du en idé eller et problem?</h3>
            <p>Fortell meg om det, så ser vi på hva som kan bygges.</p>
            <Link to="/kontakt" className="btn primary" style={{ marginTop: 6 }}>Snakk med Martin →</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
