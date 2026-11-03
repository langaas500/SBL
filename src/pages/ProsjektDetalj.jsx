import { Link, Navigate, useParams } from 'react-router-dom'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import Gallery from '../components/Gallery'
import Reveal from '../components/Reveal'
import { projects } from '../data/projects'

export default function ProsjektDetalj() {
  const { slug } = useParams()
  const i = projects.findIndex((p) => p.slug === slug)
  if (i < 0) return <Navigate to="/prosjekter" replace />

  const p = projects[i]
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]

  return (
    <div className="page pd">
      <SiteNav />
      <main className="page-main pd-main">
        <Link to="/prosjekter" className="pd-back">← Alle prosjekter</Link>

        <div className="pd-top">
          <Reveal className="pd-intro">
            <div className="eyebrow">{p.category}</div>
            <h1 className="pd-title">{p.title}</h1>
            <p className="pd-lead">{p.lead}</p>
            <div className="pd-actions">
              {p.url && (
                <a className="btn primary" href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.urlLabel || 'Åpne'} ↗
                </a>
              )}
              <Link to="/kontakt" className="btn">Jeg vil ha noe lignende</Link>
            </div>
            {p.note && <p className="proj-note pd-note">{p.note}</p>}
          </Reveal>

          <Reveal className="pd-visual" delay={120}>
            <Gallery title={p.title} images={p.images} />
          </Reveal>
        </div>

        <div className="pd-cols">
          <Reveal as="section" className="pd-about">
            <h2 className="pd-h2">Om prosjektet</h2>
            {p.about.map((para) => <p key={para}>{para}</p>)}
          </Reveal>

          <Reveal as="section" className="pd-features" delay={120}>
            <h2 className="pd-h2">Hva det gjør</h2>
            <ul className="pd-list">
              {p.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </Reveal>
        </div>

        {p.tech?.length > 0 && (
          <Reveal as="section" className="pd-tech">
            <h2 className="pd-h2">Teknologi</h2>
            <div className="proj-tags">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
          </Reveal>
        )}

        {projects.length > 1 && (
          <nav className="pd-pager" aria-label="Flere prosjekter">
            <Link to={`/prosjekter/${prev.slug}`} className="pd-pager-link">
              <span>← Forrige prosjekt</span>
              <b>{prev.title}</b>
            </Link>
            <Link to={`/prosjekter/${next.slug}`} className="pd-pager-link pd-pager-next">
              <span>Neste prosjekt →</span>
              <b>{next.title}</b>
            </Link>
          </nav>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
