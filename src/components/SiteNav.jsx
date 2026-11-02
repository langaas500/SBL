import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Hjem" },
  { to: "/tjenester", label: "Tjenester" },
  { to: "/om", label: "Om Martin" },
  { to: "/kontakt", label: "Kontakt" },
];

// Bakgrunn med glød og prikkrutenett, felles for alle sider
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

// Topplinje med logo og hamburger + fullskjermsmeny
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Lukk menyen når siden byttes
  useEffect(() => { setOpen(false); }, [pathname]);

  // Esc lukker, og siden bak kan ikke scrolle mens menyen er åpen
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
      <header className="sbl-bar">
        <Link to="/" className="sbl-logo" aria-label="SBL – til forsiden">
          <span className="gradient-text">SBL</span>
        </Link>
        <div className="sbl-bar-right">
          <span className="sbl-domain">SOLUTIONSBYLANGAAS.NO</span>
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
        </div>
      </header>

      <nav id="sbl-menu" className={`sbl-menu${open ? " is-open" : ""}`} aria-label="Hovedmeny" aria-hidden={!open}>
        <ul>
          {LINKS.map((l, i) => (
            <li key={l.to} style={{ "--i": i }}>
              <Link
                to={l.to}
                tabIndex={open ? 0 : -1}
                className={pathname === l.to ? "is-active" : ""}
                aria-current={pathname === l.to ? "page" : undefined}
              >
                <span className="sbl-menu-num">0{i + 1}</span>
                <span className="sbl-menu-label">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="sbl-menu-foot">
          <a href="mailto:hei@solutionsbylangaas.no" tabIndex={open ? 0 : -1}>hei@solutionsbylangaas.no</a>
          <span>Solutions by Langaas</span>
        </div>
      </nav>
    </>
  );
}
