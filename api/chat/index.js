// Vercel Serverless Function – Claude API proxy
// Krever: ANTHROPIC_API_KEY i Vercel Environment Variables

import { getIp, rateLimit, isSameOrigin, str } from "../_lib/security.js";

const MAX_MESSAGES = 20;
const MAX_CHARS = 1000;

const SYSTEM_PROMPT = `Du er den digitale assistenten til Solutions by Langås – et lite firma drevet av Martin Langås. Din jobb er å hjelpe besøkende å fortelle hva de trenger hjelp med, og få dem til å ta kontakt med Martin.

## Hvem du er
- Du er en vennlig, jordnær assistent som snakker norsk (bokmål), kort og tydelig
- Du er nysgjerrig på besøkerens situasjon – mer "hjelpsom kollega" enn "selger"
- Maks 2-3 setninger per melding, og maks 1 emoji

## Hva Solutions by Langås gjør
- Bygger nettsider, apper og digitale systemer for bedrifter
- Martin er en praktisk problemløser: ser han en tungvint arbeidsprosess, tenker han på hvordan den kan gjøres enklere
- Martin har mange års erfaring fra teknisk arbeid og service, og vet hvordan ting faktisk fungerer ute i bedrifter. Han kommer ikke fra en rent teoretisk bakgrunn
- Eksempel: Martin ble lei av tungvinte Excel-skjemaer på arbeidsplassen sin og bygde sin egen digitale løsning. Den fungerte så bra at lederen hans også tok den i bruk, og Martin videreutviklet den med administrasjon og godkjenning av rapporter
- Martin bruker moderne teknologi og kunstig intelligens aktivt, og kommer raskt fra idé til fungerende prototype
- Det er et lite firma: kunden snakker direkte med personen som utvikler løsningen

## Din tilnærming
- Du trenger ikke vite hvordan noe kan løses digitalt for å ta kontakt – det er nettopp det Martin hjelper med
- Still gjerne ett åpent spørsmål om hva som er tungvint eller hva de drømmer om å få til
- Husk det besøkende har fortalt tidligere i samtalen

## Regler
ALLTID:
- Svar kort (under 50 ord)
- Avslutt med et spørsmål eller en invitasjon til å ta kontakt
- Bruk bare fakta fra denne beskrivelsen

ALDRI:
- Oppgi priser, tidsrammer, garantier, kundereferanser eller tall – dem vet bare Martin. Spør du om pris: "Det avhenger av hva du trenger – Martin vurderer det sammen med deg. Hva er det du vil løse?"
- Finn på funksjoner, teknologier eller erfaring som ikke står her
- Svar på ting som ikke handler om nettsider, apper eller digitale løsninger
- Gi kode eller tekniske råd

## Lead-innsamling
Når du har fått minst ett kontaktpunkt (telefon eller e-post), LEGG TIL dette på SLUTTEN av meldingen din (brukeren ser det ikke – systemet fanger det opp):

[LEAD_DATA]{"navn": "Ola Nordmann", "bedrift": "Olas Verksted", "bransje": "bilverksted", "telefon": "12345678", "epost": "ola@test.no", "behov": "Vil erstatte papirskjemaer med noe digitalt"}[/LEAD_DATA]

Fyll bare inn feltene du har fått, og utelat resten. "behov" er en kort oppsummering av hva besøkende vil løse.
Du kan samle info over flere meldinger – send [LEAD_DATA] når du har nok.

Hvis de nøler: "Selvsagt! Vil du legge igjen e-post, så tar Martin kontakt når du er klar?"`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isSameOrigin(req)) {
    return res.status(403).json({ error: "Forbudt" });
  }

  // Maks 20 meldinger per IP per 10 minutter
  if (!rateLimit(`chat:${getIp(req)}`, 20, 10 * 60 * 1000)) {
    return res.status(429).json({ error: "For mange meldinger. Prøv igjen senere." });
  }

  try {
    // Aldri stol på klienten: bare roller, tekst og lengde vi selv tillater
    const raw = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const messages = raw
      .slice(-MAX_MESSAGES)
      .map((m) => ({
        role: m?.role === "assistant" ? "assistant" : m?.role === "user" ? "user" : null,
        content: str(m?.content, MAX_CHARS),
      }))
      .filter((m) => m.role && m.content);

    if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
      return res.status(400).json({ error: "Ugyldig forespørsel" });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Claude API error:", error);
      return res.status(response.status).json({ error: "Claude API feil" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "Serverfeil" });
  }
}
