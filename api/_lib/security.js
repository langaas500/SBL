// Delte sikkerhetshjelpere for serverless-funksjonene.
// Mappen starter med "_" slik at Vercel ikke eksponerer den som et endepunkt.

// Best effort rate limit i minnet. Hver serverless-instans har sin egen teller,
// så dette stopper enkel misbruk, men er ikke en hard grense.
const buckets = new Map();

export function getIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  // Hindre at kartet vokser uendelig
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
    }
  }
  return true;
}

// Aksepterer bare kall fra samme domene som API-et ligger på.
// Nettlesere sender alltid Origin (eller Referer) på POST fra siden vår.
export function isSameOrigin(req) {
  const host = req.headers.host;
  const source = req.headers.origin || req.headers.referer;
  if (!host || !source) return false;
  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Gjør om til en trimmet streng med maks lengde. Returnerer "" for alt annet.
export function str(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
