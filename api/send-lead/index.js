// Vercel Serverless Function – Send lead e-post via Resend
// Brukes av både AI-chatten og kontaktskjemaet.
// Krever: RESEND_API_KEY i Vercel Environment Variables

import { Resend } from "resend";
import { getIp, rateLimit, isSameOrigin, escapeHtml as esc, str } from "../_lib/security.js";

const MAX_LOG_MESSAGES = 30;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isSameOrigin(req)) {
    return res.status(403).json({ error: "Forbudt" });
  }

  // Maks 5 leads per IP per time
  if (!rateLimit(`lead:${getIp(req)}`, 5, 60 * 60 * 1000)) {
    return res.status(429).json({ error: "For mange forespørsler. Prøv igjen senere." });
  }

  try {
    const body = req.body || {};
    const navn = str(body.navn, 100);
    const bedrift = str(body.bedrift, 100);
    const bransje = str(body.bransje, 100);
    const telefon = str(body.telefon, 30);
    const epost = str(body.epost, 150);
    const facebook = str(body.facebook, 200);
    const innvending = str(body.innvending, 300);
    const melding = str(body.melding, 3000);
    const kilde = body.kilde === "kontaktskjema" ? "kontaktskjema" : "chat";
    const plattformer = Array.isArray(body.plattformer)
      ? body.plattformer.slice(0, 10).map((p) => str(p, 40)).filter(Boolean)
      : [];
    const samtale = Array.isArray(body.samtale)
      ? body.samtale
          .slice(-MAX_LOG_MESSAGES)
          .map((m) => ({ role: m?.role === "user" ? "user" : "assistant", text: str(m?.text, 1000) }))
          .filter((m) => m.text)
      : [];

    // Må ha minst ett kontaktpunkt
    if (!telefon && !epost && !facebook) {
      return res.status(400).json({ error: "Mangler kontaktinfo" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const now = new Date().toLocaleString("nb-NO", { timeZone: "Europe/Oslo" });

    const telHref = telefon.replace(/[^\d+]/g, "");
    const fbHref = /^https?:\/\//i.test(facebook)
      ? facebook
      : "https://facebook.com/" + encodeURIComponent(facebook);
    const mailHref = encodeURIComponent(epost);

    const row = (label, value, width) =>
      `<tr><td style="padding: 8px 0; color: #A39485; ${width ? `width: ${width};` : ""}">${label}</td><td style="padding: 8px 0; color: #F2ECE6; font-weight: 600;">${value}</td></tr>`;

    const htmlContent = `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #171516; color: #F2ECE6; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #E879F9, #A855F7); padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 20px; color: #fff;">🔔 Ny lead fra ${kilde === "kontaktskjema" ? "kontaktskjemaet" : "nettsiden"}!</h1>
          <p style="margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,0.8);">${esc(now)}</p>
        </div>
        <div style="padding: 24px 32px;">
          <h2 style="font-size: 15px; color: #E879F9; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Kontaktinfo</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${navn ? row("Navn", esc(navn), "100px") : ""}
            ${bedrift ? row("Bedrift", esc(bedrift)) : ""}
            ${bransje ? row("Bransje", esc(bransje)) : ""}
            ${telefon ? row("Telefon", `<a href="tel:${esc(telHref)}" style="color: #38BDF8; text-decoration: none;">${esc(telefon)}</a>`) : ""}
            ${epost ? row("E-post", `<a href="mailto:${esc(mailHref)}" style="color: #38BDF8; text-decoration: none;">${esc(epost)}</a>`) : ""}
            ${facebook ? row("Facebook", `<a href="${esc(fbHref)}" style="color: #38BDF8; text-decoration: none;">${esc(facebook)}</a>`) : ""}
          </table>
        </div>
        ${melding ? `
        <div style="padding: 0 32px 24px;">
          <h2 style="font-size: 15px; color: #E879F9; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 1px;">Melding</h2>
          <p style="margin: 0; font-size: 14px; color: #D4CBC2; line-height: 1.6; white-space: pre-wrap;">${esc(melding)}</p>
        </div>
        ` : ""}
        ${plattformer.length || innvending ? `
        <div style="padding: 0 32px 24px;">
          <h2 style="font-size: 15px; color: #34D399; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Innsikt fra samtalen</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${plattformer.length ? `<tr><td style="padding: 8px 0; color: #A39485; width: 120px;">Plattformer</td><td style="padding: 8px 0; color: #F2ECE6;">${esc(plattformer.join(", "))}</td></tr>` : ""}
            ${innvending ? `<tr><td style="padding: 8px 0; color: #A39485;">Innvending</td><td style="padding: 8px 0; color: #F2ECE6;">${esc(innvending)}</td></tr>` : ""}
          </table>
        </div>
        ` : ""}
        ${samtale.length > 0 ? `
        <div style="padding: 0 32px 24px;">
          <h2 style="font-size: 15px; color: #F59E0B; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Samtalelogg</h2>
          <div style="background: rgba(255,255,255,0.04); border-radius: 8px; padding: 16px;">
            ${samtale.map((msg) => `
              <div style="margin-bottom: 8px;">
                <span style="font-size: 11px; color: ${msg.role === "user" ? "#38BDF8" : "#E879F9"}; text-transform: uppercase; letter-spacing: 0.5px;">
                  ${msg.role === "user" ? "Besøkende" : "Langaas AI"}
                </span>
                <p style="margin: 2px 0 0; font-size: 13px; color: #D4CBC2; line-height: 1.5;">${esc(msg.text)}</p>
              </div>
            `).join("")}
          </div>
        </div>
        ` : ""}
        <div style="padding: 20px 32px; background: rgba(255,255,255,0.03); text-align: center;">
          ${telHref ? `<a href="tel:${esc(telHref)}" style="display: inline-block; padding: 10px 24px; background: linear-gradient(135deg, #E879F9, #A855F7); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Ring ${esc(navn || "kunden")} nå →</a>` : ""}
          <p style="margin: 12px 0 0; font-size: 11px; color: #A39485;">Samlet inn via ${kilde === "kontaktskjema" ? "kontaktskjemaet" : "Langaas AI"} på solutionsbylangaas.no</p>
        </div>
      </div>
    `;

    // Fjern linjeskift i emnefeltet (hindrer header-injeksjon)
    const subjectName = (navn || "Ukjent").replace(/[\r\n]+/g, " ");
    const subjectCo = (bedrift || bransje || "Bedrift ikke oppgitt").replace(/[\r\n]+/g, " ");

    const { data, error } = await resend.emails.send({
      from: "Langaas AI <ai@solutionsbylangaas.no>",
      to: ["lead@solutionsbylangaas.com"],
      // Svar går rett til kunden når e-post er oppgitt og ser gyldig ut
      ...(/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(epost) ? { replyTo: epost } : {}),
      subject: `🔔 Ny lead: ${subjectName} – ${subjectCo}`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Feil ved sending" });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Serverfeil" });
  }
}
