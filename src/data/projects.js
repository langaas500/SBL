// Prosjekter som vises på /prosjekter.
//
// Slik legger du til et nytt prosjekt: kopier en blokk og fyll ut.
//   title       – navn på prosjektet
//   category    – f.eks. "Nettside", "App", "Digitalt system"
//   description – 1–3 setninger: hvilket problem løste du, og hvordan?
//   tags        – korte stikkord (valgfritt)
//   image       – ett bilde i public/projects/, f.eks. "/projects/navn.webp" (valgfritt)
//   images      – flere bilder du kan sveipe mellom: [{ src, alt }, …] (valgfritt, 1200×1200 passer best)
//   url         – lenke til live-løsning (valgfritt)
//   visual      – "reports" bruker innebygd illustrasjon når du ikke har bilde (valgfritt)
export const projects = [
  {
    title: "Servicerapport",
    category: "Digitalt system",
    description:
      "Jeg ble lei av tungvinte Excel-skjemaer på arbeidsplassen og bygde min egen digitale løsning. Den fungerte så godt at lederen min også begynte å bruke den, og jeg bygde den videre med administrasjon og godkjenning av rapporter. Appen finnes på norsk og polsk.",
    tags: ["Rapportering", "Administrasjon", "Godkjenning"],
    image: "/projects/servicerapport.webp",
  },
  {
    title: "Pelican Beach Roleplay",
    category: "Nettside",
    description:
      "Nettside for et roleplay-fellesskap. Den samler guider til jobber, biler og bolig, og leder nye spillere videre til Discord. Mobiltilpasset fra start.",
    tags: ["Community", "Guider", "Mobiltilpasset"],
    images: [
      { src: "/projects/pelican-1-logo.webp", alt: "Forsiden til Pelican Beach Roleplay med logo" },
      { src: "/projects/pelican-2-hjem.webp", alt: "Hjemmesiden med Get started og Join our Discord" },
      { src: "/projects/pelican-3-bolig.webp", alt: "Oversikt over biler, verksted og bolig på nettbrett" },
      { src: "/projects/pelican-4-jobber.webp", alt: "Guide til jobben Trucking og transport" },
    ],
    url: "https://pelicanbeachrp.com",
  },
];
