import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─── AI CHAT ─────────────────────────────────────────────────
const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hei! 👋 Spør meg om nettsider, priser eller hva jeg kan gjøre for din bedrift!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEnd = useRef(null);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIsTyping(true);
    setTimeout(() => {
      const lowerMsg = userMsg.toLowerCase();
      let reply = "Takk for meldingen! AI-chatten er i demo-modus. Ta kontakt på hei@solutionsbylangaas.no 😊";
      if (lowerMsg.includes("pris") || lowerMsg.includes("kost")) reply = "Profesjonelle nettsider fra kun 2.999 kr! Kontakt meg for et skreddersydd tilbud.";
      if (lowerMsg.includes("nettside") || lowerMsg.includes("web")) reply = "Jeg bygger moderne, raske nettsider for alle enheter. Alt fra én-sides til avanserte løsninger.";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed", bottom: "90px", right: "20px", width: "370px", maxWidth: "calc(100vw - 40px)",
      height: "480px", maxHeight: "calc(100vh - 120px)", borderRadius: "18px",
      background: "rgba(20,18,19,0.97)", border: "1px solid rgba(232,121,249,0.15)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(232,121,249,0.08)",
      display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 1000,
      animation: "chatSlideUp 0.3s ease", backdropFilter: "blur(20px)",
    }}>
      <div style={{
        padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E879F9", boxShadow: "0 0 8px #E879F9", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#fff", fontSize: "0.85rem" }}>AI Assistent</span>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1.3rem" }}>×</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "82%",
            padding: "9px 13px", borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
            background: msg.role === "user" ? "linear-gradient(135deg, #E879F9, #A855F7)" : "rgba(255,255,255,0.06)",
            color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.85)", fontSize: "0.8rem",
            fontFamily: "'Outfit', sans-serif", lineHeight: 1.5,
          }}>{msg.text}</div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: "flex-start", padding: "9px 16px", borderRadius: "14px 14px 14px 4px", background: "rgba(255,255,255,0.06)", display: "flex", gap: "4px" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#E879F9", animation: `typingDot 1.4s ease infinite ${i*0.2}s` }} />)}
          </div>
        )}
        <div ref={messagesEnd} />
      </div>
      <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "8px" }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Skriv en melding..." style={{
            flex: 1, padding: "9px 12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: "0.8rem", fontFamily: "'Outfit', sans-serif", outline: "none",
          }}
        />
        <button onClick={sendMessage} style={{
          padding: "9px 14px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #E879F9, #A855F7)",
          color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "0.8rem",
        }}>→</button>
      </div>
    </div>
  );
};

// ─── TECH CYCLER ────────────────────────────────────────────
const TechCycler = () => {
  const techs = [
    { name: "Tailwind", color: "#38BDF8" },
    { name: "CSS", color: "#264DE4" },
    { name: "React", color: "#61DAFB" },
    { name: "Vite", color: "#BD34FE" },
    { name: "Framer", color: "#E879F9" },
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "AI", color: "#34D399" },
    { name: "Node.js", color: "#68A063" },
    { name: "SEO", color: "#F59E0B" },
    { name: "Figma", color: "#A259FF" },
  ];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % techs.length);
        setFade(true);
      }, 300);
    }, 2000);
    return () => clearInterval(iv);
  }, []);
  return (
    <span style={{ color: techs[index].color, transition: "opacity 0.3s ease, color 0.3s ease", opacity: fade ? 1 : 0 }}>
      {techs[index].name}
    </span>
  );
};

// ─── COUNTER ─────────────────────────────────────────────────
const Counter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        let s = 0; const inc = end / (duration / 16);
        const t = setInterval(() => { s += inc; if (s >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, started]);
  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── CODE EDITOR ─────────────────────────────────────────────
const CodeEditor = () => {
  const [displayedLines, setDisplayedLines] = useState(0);
  const codeLines = [
    { indent: 0, tokens: [{ text: "<", c: "#7C7C7C" }, { text: "section", c: "#FF7B72" }, { text: ' class="', c: "#7C7C7C" }, { text: "hero", c: "#A5D6FF" }, { text: '"', c: "#7C7C7C" }, { text: ">", c: "#7C7C7C" }] },
    { indent: 1, tokens: [{ text: "<", c: "#7C7C7C" }, { text: "h1", c: "#FF7B72" }, { text: ">", c: "#7C7C7C" }, { text: "Din bedrift", c: "#E6EDF3" }, { text: "</", c: "#7C7C7C" }, { text: "h1", c: "#FF7B72" }, { text: ">", c: "#7C7C7C" }] },
    { indent: 1, tokens: [{ text: "<", c: "#7C7C7C" }, { text: "p", c: "#FF7B72" }, { text: ">", c: "#7C7C7C" }, { text: "Fortjener en", c: "#E6EDF3" }, { text: "</", c: "#7C7C7C" }, { text: "p", c: "#FF7B72" }, { text: ">", c: "#7C7C7C" }] },
    { indent: 1, tokens: [{ text: "<", c: "#7C7C7C" }, { text: "span", c: "#FF7B72" }, { text: ' class="', c: "#7C7C7C" }, { text: "accent", c: "#A5D6FF" }, { text: '"', c: "#7C7C7C" }, { text: ">", c: "#7C7C7C" }] },
    { indent: 2, tokens: [{ text: "moderne nettside", c: "#E879F9" }] },
    { indent: 1, tokens: [{ text: "</", c: "#7C7C7C" }, { text: "span", c: "#FF7B72" }, { text: ">", c: "#7C7C7C" }] },
    { indent: 0, tokens: [{ text: "</", c: "#7C7C7C" }, { text: "section", c: "#FF7B72" }, { text: ">", c: "#7C7C7C" }] },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedLines(prev => { if (prev >= codeLines.length) { setTimeout(() => setDisplayedLines(0), 2000); return prev; } return prev + 1; });
    }, 600);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ borderRadius: "10px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(18,17,19,0.9)", overflow: "hidden" }}>
      <div style={{ padding: "5px 8px", display: "flex", alignItems: "center", gap: "3px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#28C840" }} />
        <span style={{ marginLeft: "6px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.35rem", color: "rgba(255,255,255,0.25)" }}>index.html</span>
      </div>
      <div style={{ padding: "8px", minHeight: "85px" }}>
        {codeLines.slice(0, displayedLines).map((line, i) => (
          <div key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.4rem", lineHeight: 2, display: "flex", paddingLeft: `${line.indent * 9}px`, animation: "fadeInUp 0.3s ease both" }}>
            <span style={{ color: "rgba(255,255,255,0.12)", width: "12px", display: "inline-block", userSelect: "none" }}>{i + 1}</span>
            {line.tokens.map((tok, j) => <span key={j} style={{ color: tok.c }}>{tok.text}</span>)}
          </div>
        ))}
        {displayedLines < codeLines.length && (
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.4rem", lineHeight: 2, paddingLeft: `${(codeLines[displayedLines]?.indent || 0) * 9 + 12}px` }}>
            <span style={{ display: "inline-block", width: "4px", height: "7px", background: "#E879F9", animation: "cursorBlink 1s step-end infinite" }} />
          </div>
        )}
      </div>
    </div>
  );
};

// ─── ANIMATED KEYBOARD ───────────────────────────────────────
const AnimatedKeyboard = () => {
  const [activeKey, setActiveKey] = useState(null);
  const rows = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"],
  ];
  const sequence = ["N","E","T","T","S","I","D","E"];

  useEffect(() => {
    let running = true;
    const playSequence = () => {
      let i = 0;
      const iv = setInterval(() => {
        if (!running) { clearInterval(iv); return; }
        setActiveKey(sequence[i]);
        setTimeout(() => setActiveKey(null), 220);
        i++;
        if (i >= sequence.length) { clearInterval(iv); if (running) setTimeout(playSequence, 2500); }
      }, 340);
    };
    setTimeout(playSequence, 800);
    return () => { running = false; };
  }, []);

  return (
    <div style={{ borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)", background: "linear-gradient(180deg, rgba(24,22,23,0.95), rgba(20,18,19,0.98))", padding: "8px 6px 6px" }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "flex", justifyContent: "center", gap: "2px", marginBottom: ri < rows.length - 1 ? "2px" : 0, paddingLeft: ri === 1 ? "5px" : ri === 2 ? "12px" : 0, paddingRight: ri === 1 ? "5px" : ri === 2 ? "12px" : 0 }}>
          {row.map(key => {
            const isActive = activeKey === key;
            return (
              <div key={key} style={{
                width: "15px", height: "15px", borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.3rem", fontWeight: 500,
                color: isActive ? "#fff" : "rgba(255,255,255,0.3)",
                background: isActive ? "linear-gradient(180deg, #E879F9, #A855F7)" : "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: isActive ? "1px solid #E879F9" : "1px solid rgba(255,255,255,0.05)",
                boxShadow: isActive ? "0 0 5px rgba(232,121,249,0.4), 0 1px 2px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
                transform: isActive ? "translateY(1px) scale(0.94)" : "translateY(0)",
                transition: "all 0.12s cubic-bezier(0.4, 0, 0.2, 1)",
              }}>{key}</div>
            );
          })}
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2px" }}>
        <div style={{ width: "85px", height: "13px", borderRadius: "3px", background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
      </div>
    </div>
  );
};

// ─── PORTFOLIO CARD ──────────────────────────────────────────
const PortfolioCard = ({ title, category, gradient, icon, delay, href }) => {
  const [hovered, setHovered] = useState(false);
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Wrapper {...wrapperProps} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "block", borderRadius: "16px", background: gradient, padding: "1.5px", animation: `fadeInUp 0.8s ease ${delay}s both`, cursor: "pointer", textDecoration: "none", color: "inherit" }}>
      <div style={{
        borderRadius: "15px", background: "#171516", padding: "28px 24px", height: "100%",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)", transform: hovered ? "scale(0.98)" : "scale(1)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: gradient, opacity: hovered ? 0.06 : 0, transition: "opacity 0.5s ease" }} />
        <div style={{ fontSize: "2.5rem", marginBottom: "14px", transition: "transform 0.5s ease", transform: hovered ? "scale(1.12) rotate(-5deg)" : "none" }}>{icon}</div>
        <div style={{ fontSize: "0.6rem", color: "#E879F9", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>{category}</div>
        <div style={{ fontSize: "1.1rem", fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>{title}</div>
      </div>
    </Wrapper>
  );
};

// ─── MAIN ────────────────────────────────────────────────────
export default function SolutionsByLangaasV2() {
  const [chatOpen, setChatOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const hm = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const hs = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", hm);
    window.addEventListener("scroll", hs);
    return () => { window.removeEventListener("mousemove", hm); window.removeEventListener("scroll", hs); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#171516", color: "#fff", fontFamily: "'Outfit', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #171516; }
        ::selection { background: #E879F9; color: #171516; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.15); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes chatSlideUp { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes typingDot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.3; } 30% { transform: translateY(-5px); opacity: 1; } }
        @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .hero-title { font-size: clamp(2.4rem, 6.5vw, 5.5rem); font-family: 'Outfit', sans-serif; font-weight: 800; line-height: 0.95; letter-spacing: -0.03em; }
        .gradient-text {
          background: linear-gradient(135deg, #E879F9 0%, #F0ABFC 30%, #C084FC 60%, #A855F7 100%);
          background-size: 200% 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; animation: gradientShift 5s ease infinite;
        }
        .accent2 { color: #38BDF8; }
        .accent3 { color: #34D399; }
        .nav-link { color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.78rem; font-family: 'Outfit', sans-serif; transition: color 0.3s; cursor: pointer; font-weight: 400; letter-spacing: 0.02em; }
        .nav-link:hover { color: #E879F9; }
        .cta-btn {
          padding: 12px 28px; border-radius: 50px; border: none;
          background: linear-gradient(135deg, #E879F9 0%, #A855F7 100%);
          color: #fff; font-weight: 600; font-size: 0.82rem; font-family: 'Outfit', sans-serif;
          cursor: pointer; transition: all 0.3s ease; letter-spacing: 0.01em;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(232,121,249,0.3); }
        .cta-outline {
          padding: 12px 28px; border-radius: 50px; border: 1px solid rgba(232,121,249,0.25);
          background: transparent; color: #E879F9; font-weight: 500; font-size: 0.82rem;
          font-family: 'Outfit', sans-serif; cursor: pointer; transition: all 0.3s ease;
        }
        .cta-outline:hover { background: rgba(232,121,249,0.06); border-color: #E879F9; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(232,121,249,0.2); border-radius: 3px; }
      `}</style>

      {/* Cursor glow */}
      <div style={{ position: "fixed", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,121,249,0.04) 0%, transparent 70%)", left: mousePos.x - 175, top: mousePos.y - 175, pointerEvents: "none", zIndex: 0, transition: "left 0.4s ease, top 0.4s ease" }} />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 36px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 50 ? "rgba(20,18,19,0.92)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.04)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "0.08em" }}>
          <span className="gradient-text">SBL</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          <Link to="/tjenester" className="nav-link">Tjenester</Link>
          <Link to="/prosjekter" className="nav-link">Prosjekter</Link>
          <Link to="/priser" className="nav-link">Priser</Link>
          <button className="cta-btn" style={{ padding: "8px 20px", fontSize: "0.75rem" }}>Kontakt meg</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "140px 48px 100px", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "linear-gradient(rgba(232,121,249,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(232,121,249,0.02) 1px, transparent 1px)", backgroundSize: "70px 70px", pointerEvents: "none" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "80px", width: "100%", position: "relative", zIndex: 1 }}>
          {/* Left */}
          <div style={{ flex: "1 1 50%" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 16px",
              borderRadius: "50px", border: "1px solid rgba(232,121,249,0.15)", background: "rgba(232,121,249,0.04)",
              marginBottom: "36px", width: "fit-content", animation: "fadeInUp 0.6s ease both",
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#E879F9", animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "#E879F9", letterSpacing: "0.04em" }}>
                Webdesign — For Lokale Bedrifter
              </span>
            </div>

            <h1 className="hero-title" style={{ animation: "fadeInUp 0.6s ease 0.1s both" }}>
              Jeg bygger<br />
              <span className="gradient-text">nettsider</span> som<br />
              gjør inntrykk<span style={{ color: "#E879F9" }}>.</span>
            </h1>

            <p style={{
              fontSize: "0.95rem", color: "rgba(255,255,255,0.4)", maxWidth: "440px", lineHeight: 1.8,
              margin: "32px 0 44px", animation: "fadeInUp 0.6s ease 0.25s both", fontWeight: 300,
            }}>
              Fra konsept til lansering på under en uke. Moderne, raske nettsider
              for restauranter, håndverkere og lokale bedrifter – fra <span style={{ color: "#38BDF8", fontWeight: 500 }}>2.999 kr</span>.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", animation: "fadeInUp 0.6s ease 0.4s both" }}>
              <button className="cta-btn">Se mine prosjekter →</button>
              <button className="cta-outline">Gratis konsultasjon</button>
            </div>
          </div>

          {/* Right: hero mockup image */}
          <div style={{
            flex: "1 1 45%",
            animation: "fadeInUp 0.8s ease 0.5s both",
            position: "relative",
          }}>
            {/* Glow behind image */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%", height: "80%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(232,121,249,0.08) 0%, rgba(56,189,248,0.04) 40%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }} />
            <img
              src="/hero-mockup.png"
              alt="Laptop og mobil med nettsider laget av Solutions by Langaas"
              style={{
                width: "100%",
                borderRadius: "16px",
                position: "relative",
                zIndex: 1,
                boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            />
            {/* Small floating badge on image */}
            <div style={{
              position: "absolute",
              bottom: "-14px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "50px",
              background: "rgba(23,21,22,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}>
              <span style={{ fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.5)" }}>
                Ekte prosjekter
              </span>
              <span style={{ fontSize: "0.5rem", color: "#E879F9" }}>●</span>
              <span style={{ fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.5)" }}>
                Ekte resultater
              </span>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "44px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", animation: "fadeInUp 1s ease 1s both" }}>
          <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em" }}>SCROLL</span>
          <div style={{ width: "1px", height: "36px", background: "linear-gradient(180deg, rgba(232,121,249,0.4), transparent)", animation: "pulse 2s infinite" }} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "16px 0" }}>
        <div style={{ display: "flex", gap: "60px", animation: "marquee 22s linear infinite", whiteSpace: "nowrap", width: "fit-content" }}>
          {[...Array(2)].map((_, rep) =>
            ["WEBDESIGN", "UTVIKLING", "SEO", "AI-CHAT", "RESPONSIVT", "RASK LEVERING", "HOSTING", "VEDLIKEHOLD"].map((text, i) => (
              <span key={`${rep}-${i}`} style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.2em",
                color: [0,2,4,6].includes(i) ? "rgba(255,255,255,0.1)" : [1,5].includes(i) ? "rgba(232,121,249,0.2)" : [3,7].includes(i) ? "rgba(56,189,248,0.2)" : "rgba(52,211,153,0.2)",
                display: "flex", alignItems: "center", gap: "16px",
              }}>
                {text}<span style={{ fontSize: "0.35rem", color: "rgba(232,121,249,0.2)" }}>◆</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── STATS ── */}
      <section style={{ padding: "90px 48px", maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(255,255,255,0.04)", borderRadius: "16px", overflow: "hidden" }}>
        {[
          { tech: true, label: "Teknologier", color: "#E879F9" },
          { num: 7, suffix: " dager", label: "Snitt levering", color: "#38BDF8" },
          { num: 2999, suffix: " kr", label: "Startpris", color: "#34D399" },
          { num: 100, suffix: "%", label: "Fornøyde kunder", color: "#F59E0B" },
        ].map((stat, i) => (
          <div key={i} style={{ background: "#171516", padding: "36px 20px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "2.1rem", color: stat.color, marginBottom: "6px" }}>
              {stat.tech ? <TechCycler /> : <Counter end={stat.num} suffix={stat.suffix} />}
            </div>
            <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: "120px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "48px", marginBottom: "56px" }}>
          <div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#E879F9", letterSpacing: "0.2em", textTransform: "uppercase" }}>TJENESTER</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem, 5vw, 4rem)", marginTop: "10px", lineHeight: 1.05 }}>
              Alt din bedrift<br />trenger på nett<span style={{ color: "#E879F9" }}>.</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxWidth: "240px" }}>
            <CodeEditor />
            <AnimatedKeyboard />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
          {[
            { icon: "🍽️", title: "Restaurant-sider", desc: "Interaktive menyer, booking og atmosfærisk design som får gjester i døren.", accent: "#E879F9", href: "https://showcase-hub-black.vercel.app/restauranter" },
            { icon: "🔨", title: "Håndverker-sider", desc: "Profesjonelle sider som viser frem arbeidet ditt og genererer leads.", accent: "#38BDF8" },
            { icon: "🏪", title: "Butikk & Retail", desc: "Moderne nettsider som synliggjør produkter, åpningstider og lokasjon.", accent: "#34D399" },
            { icon: "🤖", title: "AI-integrasjoner", desc: "Smarte chatboter og AI-verktøy som gir kundene dine svar 24/7.", accent: "#F59E0B" },
          ].map((s, i) => {
            const Tag = s.href ? "a" : "div";
            const linkProps = s.href ? { href: s.href, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <Tag key={i} {...linkProps} style={{
                padding: "32px 28px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.015)", transition: "all 0.4s ease", cursor: "pointer", textDecoration: "none", color: "inherit",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.accent}30`; e.currentTarget.style.background = `${s.accent}06`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.background = "rgba(255,255,255,0.015)"; }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "14px" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "1.05rem", marginBottom: "8px" }}>{s.title}</h3>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{s.desc}</p>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* ── TRUST IMAGE ── */}
      <section style={{ padding: "0 48px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          height: "340px",
        }}>
          <img
            src="/trust-handshake.png"
            alt="Fornøyd kunde og utvikler tar hverandre i hånda foran en laptop"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              display: "block",
            }}
          />
          {/* Dark overlay */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(135deg, rgba(23,21,22,0.7) 0%, rgba(23,21,22,0.3) 50%, rgba(23,21,22,0.7) 100%)",
          }} />
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "50px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <span style={{ fontSize: "0.9rem" }}>🤝</span>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 500,
            }}>
              Fra første prat til ferdig nettside — jeg er med deg hele veien
            </span>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section style={{ padding: "80px 48px 120px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#38BDF8", letterSpacing: "0.2em", textTransform: "uppercase" }}>PROSJEKTER</span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.8rem)", marginTop: "10px", lineHeight: 1.1 }}>
            Se hva jeg har bygd<span style={{ color: "#38BDF8" }}>.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", marginTop: "12px", lineHeight: 1.6 }}>
            Håndskrevet kode for hver kunde. Ingen maler, ingen dra-og-slipp.
          </p>
        </div>

        {/* Bottom: cards side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
          <PortfolioCard icon="🍔" category="Restaurant" title="Diner 22 — Interaktiv neon-meny" gradient="linear-gradient(135deg, #E879F9, #F59E0B)" delay={0.1} href="https://diner22-dlof.vercel.app/meny" />
          <PortfolioCard icon="🔧" category="Håndverker" title="Snekker Nord — Portefølje & kontakt" gradient="linear-gradient(135deg, #38BDF8, #34D399)" delay={0.2} />
          <PortfolioCard icon="⚖️" category="AI-plattform" title="harjegkravpå.no — Juridisk AI" gradient="linear-gradient(135deg, #A855F7, #E879F9)" delay={0.3} />
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: "120px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#34D399", letterSpacing: "0.2em", textTransform: "uppercase" }}>PRISER</span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.8rem)", marginTop: "10px" }}>
            Enkelt og transparent<span style={{ color: "#34D399" }}>.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", alignItems: "stretch" }}>
          {/* Starter */}
          <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", padding: "36px 28px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>STARTER</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "2.5rem", lineHeight: 1 }}>
              2.999<span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)" }}> kr</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", margin: "10px 0 22px" }}>Perfekt for oppstart</p>
            {["Én-sides nettside", "Mobiloptimalisert", "Kontaktskjema", "Google Maps", "Levert på 5–7 dager"].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
                <span style={{ color: "#34D399", fontSize: "0.6rem" }}>✓</span>{f}
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <button className="cta-outline" style={{ width: "100%", marginTop: "28px", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>Velg Starter</button>
          </div>
          {/* Pro */}
          <div style={{
            borderRadius: "16px", border: "1px solid rgba(232,121,249,0.25)", padding: "36px 28px",
            background: "linear-gradient(135deg, rgba(232,121,249,0.08) 0%, rgba(20,18,19,1) 100%)",
            position: "relative", display: "flex", flexDirection: "column", boxShadow: "0 0 36px rgba(232,121,249,0.06)",
          }}>
            <div style={{
              position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)",
              padding: "3px 14px", borderRadius: "0 0 8px 8px", background: "linear-gradient(135deg, #E879F9, #A855F7)",
              color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.1em",
            }}>MEST POPULÆR</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#E879F9", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>PRO</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "2.5rem", lineHeight: 1 }}>
              4.999<span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)" }}> kr</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", margin: "10px 0 22px" }}>For bedrifter som vil vokse</p>
            {["Alt i Starter +", "Flersides design", "SEO-optimalisering", "Sosiale medier", "Interaktive elementer", "Analytics dashboard"].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(232,121,249,0.05)", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>
                <span style={{ color: "#E879F9", fontSize: "0.6rem" }}>✓</span>{f}
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <button className="cta-btn" style={{ width: "100%", marginTop: "28px" }}>Velg Pro</button>
          </div>
          {/* Enterprise */}
          <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", padding: "36px 28px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>ENTERPRISE</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "2.5rem", lineHeight: 1 }}>Tilbud</div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", margin: "10px 0 22px" }}>Skreddersydde løsninger</p>
            {["Alt i Pro +", "AI-chatbot", "Booking-system", "Betalingsløsning", "Dedikert support", "Ubegrenset endringer"].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
                <span style={{ color: "#38BDF8", fontSize: "0.6rem" }}>✓</span>{f}
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <button className="cta-outline" style={{ width: "100%", marginTop: "28px", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>Kontakt meg</button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "120px 48px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.1, marginBottom: "20px" }}>
          Klar for å ta bedriften<br />din <span className="gradient-text">på nett</span>?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", maxWidth: "440px", margin: "0 auto 36px", lineHeight: 1.6 }}>
          Book en gratis 15-minutters konsultasjon. Jeg finner ut hva som passer best for din bedrift.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="cta-btn" style={{ fontSize: "0.9rem", padding: "14px 36px" }}>Start prosjektet ditt →</button>
          <button className="cta-outline" onClick={() => setChatOpen(true)} style={{ fontSize: "0.9rem", padding: "14px 36px" }}>💬 Snakk med AI</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "56px 48px 36px", maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "40px" }}>
        <div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "3.9rem", marginBottom: "12px", letterSpacing: "0.08em" }}>
            <span className="gradient-text">SBL</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.78rem", maxWidth: "260px", lineHeight: 1.6 }}>
            Solutions By Langaas
          </p>
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.68rem", marginTop: "6px", fontFamily: "'JetBrains Mono', monospace" }}>
            Org nr 936 977 774
          </p>
        </div>
        <div style={{ display: "flex", gap: "56px" }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "14px" }}>Kontakt</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>
              <span>hei@solutionsbylangaas.no</span>
              <span>Mysen, Indre Østfold</span>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "14px" }}>Lenker</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>
              <span className="nav-link">Instagram</span>
              <span className="nav-link">Facebook</span>
            </div>
          </div>
        </div>
      </footer>
      <div style={{ textAlign: "center", padding: "20px 48px 36px", fontSize: "0.65rem", color: "rgba(255,255,255,0.15)", fontFamily: "'JetBrains Mono', monospace" }}>
        © 2026 Solutions by Langaas. Laget med ❤️ i Mysen.
      </div>

      {/* ── AI CHAT ── */}
      <AIChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <button onClick={() => setChatOpen(!chatOpen)} style={{
        position: "fixed", bottom: "20px", right: "20px", width: "52px", height: "52px", borderRadius: "50%",
        border: "none", background: "linear-gradient(135deg, #E879F9, #A855F7)", color: "#fff",
        fontSize: "1.3rem", cursor: "pointer", boxShadow: "0 4px 18px rgba(232,121,249,0.3)",
        zIndex: 999, transition: "all 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(232,121,249,0.45)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(232,121,249,0.3)"; }}
      >{chatOpen ? "×" : "💬"}</button>
    </div>
  );
}
