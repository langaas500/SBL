// Vercel Serverless Function – Send lead e-post via Resend
// Krever: RESEND_API_KEY i Vercel Environment Variables

import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { navn, bedrift, bransje, telefon, epost, facebook, plattformer, innvending, samtale } = req.body;

    const now = new Date().toLocaleString("nb-NO", { timeZone: "Europe/Oslo" });

    const htmlContent = `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #171516; color: #F2ECE6; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #E879F9, #A855F7); padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 20px; color: #fff;">🔔 Ny Lead fra Nettsiden!</h1>
          <p style="margin: 4px 0 0; font-size: 13px; color: rgba(255,255,255,0.8);">${now}</p>
        </div>
        <div style="padding: 24px 32px;">
          <h2 style="font-size: 15px; color: #E879F9; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Kontaktinfo</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${navn ? `<tr><td style="padding: 8px 0; color: #A39485; width: 100px;">Navn</td><td style="padding: 8px 0; color: #F2ECE6; font-weight: 600;">${navn}</td></tr>` : ""}
            ${bedrift ? `<tr><td style="padding: 8px 0; color: #A39485;">Bedrift</td><td style="padding: 8px 0; color: #F2ECE6; font-weight: 600;">${bedrift}</td></tr>` : ""}
            ${bransje ? `<tr><td style="padding: 8px 0; color: #A39485;">Bransje</td><td style="padding: 8px 0; color: #F2ECE6; font-weight: 600;">${bransje}</td></tr>` : ""}
            ${telefon ? `<tr><td style="padding: 8px 0; color: #A39485;">Telefon</td><td style="padding: 8px 0;"><a href="tel:${telefon}" style="color: #38BDF8; font-weight: 600; text-decoration: none;">${telefon}</a></td></tr>` : ""}
            ${epost ? `<tr><td style="padding: 8px 0; color: #A39485;">E-post</td><td style="padding: 8px 0;"><a href="mailto:${epost}" style="color: #38BDF8; font-weight: 600; text-decoration: none;">${epost}</a></td></tr>` : ""}
            ${facebook ? `<tr><td style="padding: 8px 0; color: #A39485;">Facebook</td><td style="padding: 8px 0;"><a href="${facebook.startsWith("http") ? facebook : "https://facebook.com/" + facebook}" style="color: #38BDF8; font-weight: 600; text-decoration: none;">${facebook}</a></td></tr>` : ""}
          </table>
        </div>
        ${plattformer || innvending || bransje ? `
        <div style="padding: 0 32px 24px;">
          <h2 style="font-size: 15px; color: #34D399; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Innsikt fra samtalen</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${plattformer ? `<tr><td style="padding: 8px 0; color: #A39485; width: 120px;">Plattformer</td><td style="padding: 8px 0; color: #F2ECE6;">${Array.isArray(plattformer) ? plattformer.join(", ") : plattformer}</td></tr>` : ""}
            ${innvending ? `<tr><td style="padding: 8px 0; color: #A39485;">Innvending</td><td style="padding: 8px 0; color: #F2ECE6;">${innvending}</td></tr>` : ""}
          </table>
        </div>
        ` : ""}
        ${samtale && samtale.length > 0 ? `
        <div style="padding: 0 32px 24px;">
          <h2 style="font-size: 15px; color: #F59E0B; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Samtalelogg</h2>
          <div style="background: rgba(255,255,255,0.04); border-radius: 8px; padding: 16px; max-height: 400px; overflow-y: auto;">
            ${samtale.map((msg) => `
              <div style="margin-bottom: 8px;">
                <span style="font-size: 11px; color: ${msg.role === "user" ? "#38BDF8" : "#E879F9"}; text-transform: uppercase; letter-spacing: 0.5px;">
                  ${msg.role === "user" ? "Besøkende" : "Langaas AI"}
                </span>
                <p style="margin: 2px 0 0; font-size: 13px; color: #D4CBC2; line-height: 1.5;">${msg.text}</p>
              </div>
            `).join("")}
          </div>
        </div>
        ` : ""}
        <div style="padding: 20px 32px; background: rgba(255,255,255,0.03); text-align: center;">
          ${telefon ? `<a href="tel:${telefon}" style="display: inline-block; padding: 10px 24px; background: linear-gradient(135deg, #E879F9, #A855F7); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Ring ${navn || "kunden"} nå →</a>` : ""}
          <p style="margin: 12px 0 0; font-size: 11px; color: #A39485;">Denne leaden ble samlet inn av Langaas AI på solutionsbylangaas.no</p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Langaas AI <ai@solutionsbylangaas.no>",
      to: ["lead@solutionsbylangaas.com"],
      subject: `🔔 Ny lead: ${navn || "Ukjent"} – ${bedrift || bransje || "Bedrift ikke oppgitt"}`,
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
