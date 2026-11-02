// Prosjekter som vises på /prosjekter.
//
// Slik legger du til et nytt prosjekt: kopier en blokk og fyll ut.
//   title       – navn på prosjektet
//   category    – f.eks. "Nettside", "App", "Digitalt system"
//   description – 1–3 setninger: hvilket problem løste du, og hvordan?
//   tags        – korte stikkord (valgfritt)
//   image       – ett bilde i public/projects/, f.eks. "/projects/navn.webp" (valgfritt)
//   images      – flere bilder du kan sveipe mellom: [{ src, alt }, …] (valgfritt, 1200×1200 passer best)
//   url         – lenke til live-løsning eller demo (valgfritt)
//   urlLabel    – tekst på lenken, standard «Se løsningen →» (valgfritt)
//   note        – kort merknad under beskrivelsen, f.eks. hvorfor noe ikke vises live (valgfritt)
//   visual      – "reports" bruker innebygd illustrasjon når du ikke har bilde (valgfritt)
export const projects = [
  {
    title: "Servicerapport",
    category: "Digitalt system",
    description:
      "Jeg ble lei av tungvinte Excel-skjemaer og bygde en app teknikerne fyller ut på mobilen, rett ute hos kunden. De registrerer avvik med bilder, og appen lager en ferdig PDF-rapport og en utfylt Excel-fil som sendes til kontoret. Admin går gjennom, justerer og behandler rapportene. Appen virker uten nett og finnes på norsk og polsk.",
    note: "Den ferdige appen for kunden vises ikke live på grunn av sensitiv informasjon. Demoen bruker fiktive data, og du kan logge inn med hva som helst.",
    tags: ["Mobilapp (PWA)", "PDF og Excel", "Admin", "Norsk og polsk", "Offline"],
    images: [
      { src: "/projects/servicerapport.webp", alt: "Innloggingen i Servicerapport-appen med valg mellom norsk og polsk" },
      { src: "/projects/servicerapport-2-pdf-side1.webp", alt: "Side 1 av en ferdig PDF-rapport med kundeinfo, oppsummering og avviksliste (fiktive eksempeldata)" },
      { src: "/projects/servicerapport-3-pdf-side2.webp", alt: "Side 2 av PDF-rapporten med bilder per avvik og tilstandsvurdering (fiktive eksempeldata)" },
    ],
    url: "https://serviceappen-demo.vercel.app",
    urlLabel: "Prøv demoen →",
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
  {
    title: "Refleksjonsrommet",
    category: "Nettside",
    description:
      "Nettside for podcasten Refleksjonsrommet. Forsiden presenterer podcasten, og en egen episodeside samler alle episodene med avspilling via Spotify. Den har også sider for gjester, om podcasten og sponsorer, og fungerer på mobil, nettbrett og PC.",
    tags: ["Podcast", "Episodeoversikt", "Spotify", "Responsivt"],
    images: [
      { src: "/projects/refleksjonsrommet-1-kombinert.webp", alt: "Refleksjonsrommet på nettbrett og mobil" },
      { src: "/projects/refleksjonsrommet-2-nettbrett.webp", alt: "Forsiden til Refleksjonsrommet på nettbrett med Spotify-spiller" },
      { src: "/projects/refleksjonsrommet-3-mobil-forside.webp", alt: "Forsiden til Refleksjonsrommet på mobil" },
      { src: "/projects/refleksjonsrommet-4-mobil-episoder.webp", alt: "Episodeoversikten på mobil med siste episode" },
    ],
    url: "https://www.refleksjonsrommet.com",
  },
];
