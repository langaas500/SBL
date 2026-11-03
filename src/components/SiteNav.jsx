import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Hjem" },
  { to: "/tjenester", label: "Tjenester" },
  { to: "/prosjekter", label: "Prosjekter" },
  { to: "/om", label: "Om Martin" },
  { to: "/kontakt", label: "Kontakt" },
];

// Rolig bakgrunn med dempet glød og prikkrutenett, felles for alle sider
export function Backdrop() {
  return (
    <div className="sbl-backdrop" aria-hidden="true">
      <div className="sbl-glow sbl-glow-a" />
      <div className="sbl-glow sbl-glow-b" />
      <div className="sbl-glow sbl-glow-c" />
      <div className="sbl-dots" />
    </div>
  );
}

// PC og nettbrett: fast sidemeny til venstre. Mobil: topplinje med hamburger og fullskjermsmeny.
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = (to) => pathname === to || (to !== "/" && pathname.startsWith(to + "/"));

  // Lukk mobilmenyen når siden byttes
  useEffect(() => { setOpen(false); }, [pathname]);

  // Esc lukker, og siden bak kan ikke scrolle mens mobilmenyen er åpen
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <Backdrop />

      {/* ── PC og nettbrett: sidemeny ── */}
      <aside className="side">
        <Link to="/" className="side-logo" aria-label="SBL – til forsiden">
          SB<span>L</span>
        </Link>
        <nav className="side-nav" aria-label="Hovedmeny">
          <ul>
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={isActive(l.to) ? "is-active" : ""}
                  aria-current={isActive(l.to) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="side-foot">
          <a href="mailto:martin@solutionsbylangaas.com">martin@solutionsbylangaas.com</a>
          <span>Solutions by Langaas</span>
        </div>
      </aside>
      {pathname !== "/kontakt" && (
        <Link to="/kontakt" className="side-cta">Ta kontakt</Link>
      )}

      {/* ── Mobil: topplinje og hamburger ── */}
      <header className="sbl-bar">
        <Link to="/" className="sbl-logo" aria-label="SBL – til forsiden">
          SB<span>L</span>
        </Link>
        <button
          type="button"
          className={`sbl-burger${open ? " is-open" : ""}`}
          aria-label={open ? "Lukk meny" : "Åpne meny"}
          aria-expanded={open}
          aria-controls="sbl-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </header>

      <nav id="sbl-menu" className={`sbl-menu${open ? " is-open" : ""}`} aria-label="Mobilmeny" aria-hidden={!open}>
        <ul>
          {LINKS.map((l, i) => (
            <li key={l.to} style={{ "--i": i }}>
              <Link
                to={l.to}
                tabIndex={open ? 0 : -1}
                className={isActive(l.to) ? "is-active" : ""}
                aria-current={isActive(l.to) ? "page" : undefined}
              >
                <span className="sbl-menu-num">0{i + 1}</span>
                <span className="sbl-menu-label">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="sbl-menu-foot">
          <a href="mailto:martin@solutionsbylangaas.com" tabIndex={open ? 0 : -1}>martin@solutionsbylangaas.com</a>
          <span>Solutions by Langaas</span>
        </div>
      </nav>
    </>
  );
}
