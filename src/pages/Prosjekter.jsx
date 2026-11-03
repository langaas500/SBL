import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import Gallery from '../components/Gallery'
import { projects } from '../data/projects'

function ProjectCard({ p }) {
  return (
    <article className="proj">
      <div className="proj-visual">
        <Gallery title={p.title} images={p.images} />
      </div>
      <div className="proj-body">
        <div className="proj-cat">{p.category}</div>
        <h3><Link to={`/prosjekter/${p.slug}`}>{p.title}</Link></h3>
        <p>{p.summary}</p>
        {p.tags?.length > 0 && (
          <div className="proj-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
        )}
        <div className="proj-links">
          <Link className="proj-link" to={`/prosjekter/${p.slug}`}>Se detaljer →</Link>
          {p.url && (
            <a className="proj-link proj-link-soft" href={p.url} target="_blank" rel="noopener noreferrer">
              {p.urlLabel || 'Åpne'} ↗
            </a>
          )}
        </div>
      </div>
    </article>
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
          {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}

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
