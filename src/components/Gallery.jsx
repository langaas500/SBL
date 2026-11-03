import { useEffect, useRef, useState } from 'react'

// Sveipbar bildeserie: scroll-snap gir naturlig sveip på mobil, piler og prikker på PC.
// Trykk på et bilde åpner det stort.
export default function Gallery({ title, images }) {
  const ref = useRef(null)
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(null)
  const dialogRef = useRef(null)
  const count = images.length

  // Åpne/lukke stor visning med <dialog> (Esc og klikk utenfor lukker)
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
