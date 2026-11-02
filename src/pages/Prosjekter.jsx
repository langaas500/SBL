import { useEffect, useRef, useState } from 'react'
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

// Sveipbar bildeserie: scroll-snap gir naturlig sveip på mobil
function Gallery({ title, images }) {
  const ref = useRef(null)
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(null)
  const dialogRef = useRef(null)
  const count = images.length

  // Åpne/lukke bildet i stor visning med <dialog> (Esc og klikk utenfor lukker)
  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (zoom && !d.open) d.showModal()
    if (!zoom && d.open) d.close()
  }, [zoom])

  const goTo = (i) => {
    const el = ref.current
    if (!el) return
    const next = Math.max(0, Math.min(count - 1, i))
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = ref.current
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1) }
  }

  return (
    <div className="gallery" role="group" aria-roledescription="bildeserie" aria-label={`Bilder fra ${title}`}>
      <div className="gallery-track" ref={ref} onScroll={onScroll} onKeyDown={onKeyDown} tabIndex={count > 1 ? 0 : -1}>
        {images.map((img, i) => (
          <img
            key={img.src} src={img.src} alt={img.alt || `Bilde ${i + 1} fra ${title}`}
            loading={i === 0 ? 'eager' : 'lazy'} draggable={false}
            onClick={() => setZoom(img)}
          />
        ))}
      </div>
      <dialog
        ref={dialogRef} className="lightbox" aria-label={zoom?.alt || 'Stort bilde'}
        onClose={() => setZoom(null)} onClick={(e) => { if (e.target === e.currentTarget) setZoom(null) }}
      >
        {zoom && <img src={zoom.src} alt={zoom.alt} />}
        <button type="button" className="lightbox-close" aria-label="Lukk" onClick={() => setZoom(null)}>×</button>
      </dialog>
      {count > 1 && (
        <>
          <button type="button" className="gallery-arrow prev" aria-label="Forrige bilde" onClick={() => goTo(index - 1)} disabled={index === 0}>‹</button>
          <button type="button" className="gallery-arrow next" aria-label="Neste bilde" onClick={() => goTo(index + 1)} disabled={index === count - 1}>›</button>
          <div className="gallery-dots">
            {images.map((_, i) => (
              <button
                key={i} type="button" className={i === index ? 'is-on' : ''}
                aria-label={`Vis bilde ${i + 1} av ${count}`} aria-current={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ProjectCard({ p }) {
  const Visual = p.visual ? visuals[p.visual] : null
  const images = p.images?.length ? p.images : p.image ? [{ src: p.image, alt: `Skjermbilde av ${p.title}` }] : []
  return (
    <article className="proj">
      <div className="proj-visual">
        {images.length > 0 ? <Gallery title={p.title} images={images} /> : Visual && <Visual />}
      </div>
      <div className="proj-body">
        <div className="proj-cat">{p.category}</div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        {p.tags?.length > 0 && (
          <div className="proj-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
        )}
        {p.url && (
          <a className="proj-link" href={p.url} target="_blank" rel="noopener noreferrer">Se løsningen →</a>
        )}
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
