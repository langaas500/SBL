// AI Chat Widget – Claude API + lead e-post
// Konvertert fra TSX til JSX for Vite

import { useState, useEffect, useRef } from "react";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hei! 👋 Lurer du på nettside for bedriften din, eller bare ser deg rundt?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Parse lead-data fra Claude-respons
  const extractLeadData = (text) => {
    const leadMatch = text.match(/\[LEAD_DATA\]([\s\S]*?)\[\/LEAD_DATA\]/);
    if (!leadMatch) return { cleanText: text, leadData: null };

    try {
      const leadData = JSON.parse(leadMatch[1]);
      const cleanText = text.replace(/\[LEAD_DATA\][\s\S]*?\[\/LEAD_DATA\]/, "").trim();
      return { cleanText, leadData };
    } catch {
      return { cleanText: text, leadData: null };
    }
  };

  // Send lead-epost
  const sendLeadEmail = async (leadData, samtale) => {
    if (leadSent) return;

    try {
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadData,
          samtale: samtale.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (res.ok) {
        setLeadSent(true);
        console.log("✅ Lead sendt til lead@solutionsbylangaas.com");
      }
    } catch (err) {
      console.error("❌ Feil ved sending av lead:", err);
    }
  };

  // Send melding til Claude
  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", text: userMsg }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });

      if (!res.ok) throw new Error("API feil");

      const data = await res.json();
      const rawText = data.content?.[0]?.text || data.text || "Beklager, noe gikk galt. Prøv igjen!";

      const { cleanText, leadData } = extractLeadData(rawText);

      const updatedMessages = [...newMessages, { role: "assistant", text: cleanText }];
      setMessages(updatedMessages);

      if (leadData) {
        await sendLeadEmail(leadData, updatedMessages);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          text: "Oops, noe gikk galt! Prøv igjen, eller ring Maxi direkte 😊",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed", bottom: "20px", right: "20px", width: "52px", height: "52px",
          borderRadius: "50%", border: "none", background: "linear-gradient(135deg, #E879F9, #A855F7)",
          color: "#fff", fontSize: "1.3rem", cursor: "pointer",
          boxShadow: "0 4px 20px rgba(232,121,249,0.3)", zIndex: 999,
          transition: "all 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(232,121,249,0.4)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,121,249,0.3)"; }}
      >
        💬
      </button>
    );
  }

  return (
    <>
      <div style={{
        position: "fixed", bottom: "88px", right: "20px", width: "370px",
        maxWidth: "calc(100vw - 40px)", height: "470px", maxHeight: "calc(100vh - 120px)",
        borderRadius: "20px", background: "#1C1A1D", border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
        display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 1000,
        animation: "chatSlideUp 0.3s ease",
      }}>
        {/* Header */}
        <div style={{
          padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(255,255,255,0.03)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34D399", boxShadow: "0 0 8px rgba(52,211,153,0.4)", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#F2ECE6", fontSize: "0.85rem" }}>Langaas AI</span>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>online</span>
          </div>
          <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1.3rem", padding: "0 4px" }}>×</button>
        </div>

        {/* Meldinger */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "82%",
              padding: "10px 14px",
              borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: msg.role === "user" ? "linear-gradient(135deg, #E879F9, #A855F7)" : "rgba(255,255,255,0.06)",
              color: msg.role === "user" ? "#fff" : "#D4CBC2",
              fontSize: "0.82rem", fontFamily: "'Outfit', sans-serif", lineHeight: 1.5,
            }}>{msg.text}</div>
          ))}
          {isTyping && (
            <div style={{ alignSelf: "flex-start", padding: "10px 16px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.06)", display: "flex", gap: "4px" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#E879F9", animation: `typingDot 1.4s ease infinite ${i * 0.2}s` }} />
              ))}
            </div>
          )}
          <div ref={messagesEnd} />
        </div>

        {/* Input */}
        <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "8px" }}>
          <input
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Skriv her..."
            style={{
              flex: 1, padding: "10px 14px", borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)",
              color: "#F2ECE6", fontSize: "0.82rem", fontFamily: "'Outfit', sans-serif", outline: "none",
            }}
          />
          <button onClick={sendMessage} disabled={isTyping} style={{
            padding: "10px 16px", borderRadius: "12px", border: "none",
            background: isTyping ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #E879F9, #A855F7)",
            color: "#fff", fontWeight: 600, cursor: isTyping ? "not-allowed" : "pointer", fontSize: "0.85rem",
          }}>→</button>
        </div>
      </div>

      {/* Lukke-knapp */}
      <button onClick={() => setIsOpen(false)} style={{
        position: "fixed", bottom: "20px", right: "20px", width: "52px", height: "52px",
        borderRadius: "50%", border: "none", background: "linear-gradient(135deg, #E879F9, #A855F7)",
        color: "#fff", fontSize: "1.5rem", cursor: "pointer",
        boxShadow: "0 4px 20px rgba(232,121,249,0.3)", zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>×</button>

      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
