// Prosjekter som vises på /prosjekter og som egne detaljsider på /prosjekter/<slug>.
//
// Slik legger du til et nytt prosjekt: kopier en blokk og fyll ut. Skriv bare det som er sant og dokumentert.
//
// Felles (kortet på /prosjekter):
//   slug        – URL-navn, små bokstaver og bindestrek
//   title       – navn på prosjektet
//   category    – f.eks. "Nettside", "Digitalt system"
//   summary     – 1–2 korte setninger til kortet
//   tags        – korte stikkord (valgfritt)
//   images      – bilder du kan sveipe mellom: [{ src, alt }, …] i public/projects/ (1200×1200 passer best)
//   url, urlLabel – lenke til live-løsning eller demo, og teksten på knappen (valgfritt)
//
// Detaljsiden:
//   lead        – ingress øverst
//   about       – avsnitt under «Om prosjektet»
//   features    – kort liste under «Hva det gjør»
//   tech        – teknologier under «Teknologi» (valgfritt)
//   note        – merknad som vises fremhevet, f.eks. hvorfor noe ikke vises live (valgfritt)
export const projects = [
  {
    slug: 'servicerapport',
    title: 'Servicerapport',
    category: 'Digitalt system',
    summary:
      'Mobilapp for servicerapporter. Teknikerne fyller ut rapporten ute hos kunden, og appen lager ferdig PDF og Excel-fil.',
    tags: ['Mobilapp (PWA)', 'PDF og Excel', 'Admin', 'Norsk og polsk'],
    images: [
      { src: '/projects/servicerapport.webp', alt: 'Innloggingen i Servicerapport-appen med valg mellom norsk og polsk' },
      { src: '/projects/servicerapport-2-pdf-side1.webp', alt: 'Side 1 av en ferdig PDF-rapport med kundeinfo, oppsummering og avviksliste (fiktive eksempeldata)' },
      { src: '/projects/servicerapport-3-pdf-side2.webp', alt: 'Side 2 av PDF-rapporten med bilder per avvik og tilstandsvurdering (fiktive eksempeldata)' },
    ],
    url: 'https://serviceappen-demo.vercel.app',
    urlLabel: 'Prøv demoen',
    lead:
      'En mobilapp som erstatter tungvinte Excel-skjemaer. Teknikerne fyller ut rapporten på telefonen mens de er ute hos kunden, og kontoret får en ferdig PDF og Excel-fil.',
    note:
      'Den ferdige appen for kunden vises ikke live på grunn av sensitiv informasjon. Demoen bruker fiktive data, og du kan logge inn med hva som helst.',
    about: [
      'Jeg ble lei av tungvinte Excel-skjemaer på arbeidsplassen og bygde min egen digitale løsning. Den fungerte så godt at lederen min også begynte å bruke den, og jeg bygde den videre.',
      'Teknikerne fyller ut kunde, anlegg og servicebesøk, og registrerer hvert avvik med plassering, produkt, feil, prioritet og bilder. Når rapporten sendes, lager appen en ferdig PDF-rapport og en utfylt Excel-fil som går til kontoret.',
      'Administrator har en egen oversikt der rapportene kan gjennomgås, rettes og behandles.',
    ],
    features: [
      'Skjema for kunde, anlegg og servicebesøk, med valg av kunde fra en kundeliste',
      'Avvik med plassering, produkt, status, feil, prioritet og bilder fra kamera eller galleri',
      'Kopiering av forrige avvik for raskere utfylling',
      'Automatisk PDF-rapport med oppsummering, avviksliste, bilder, tilstandsvurdering og kostnadsestimat',
      'Utfylt Excel-fil og rapport på e-post til kontoret',
      'Utkast lagres automatisk på telefonen, og skjemaet kan fylles ut uten nett',
      'Norsk og polsk for teknikerne',
      'Innlogging med roller for tekniker og admin',
      'Admin kan rette rapporter, justere timer, tillegg og priser, sette status og laste ned PDF og Excel',
      'Automatisk opprydding av gamle rapporter',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PWA', 'Postgres (Neon)', 'Vercel Blob', 'react-pdf', 'Resend'],
  },
  {
    slug: 'refleksjonsrommet',
    title: 'Refleksjonsrommet',
    category: 'Nettside',
    summary:
      'Nettside for podcasten Refleksjonsrommet. Episodene hentes automatisk fra RSS, med Spotify, nyhetsbrev og adminpanel.',
    tags: ['Podcast', 'RSS', 'Spotify', 'Adminpanel'],
    images: [
      { src: '/projects/refleksjonsrommet-1-kombinert.webp', alt: 'Refleksjonsrommet på nettbrett og mobil' },
      { src: '/projects/refleksjonsrommet-2-nettbrett.webp', alt: 'Forsiden til Refleksjonsrommet på nettbrett med Spotify-spiller' },
      { src: '/projects/refleksjonsrommet-3-mobil-forside.webp', alt: 'Forsiden til Refleksjonsrommet på mobil' },
      { src: '/projects/refleksjonsrommet-4-mobil-episoder.webp', alt: 'Episodeoversikten på mobil med siste episode' },
    ],
    url: 'https://www.refleksjonsrommet.com',
    urlLabel: 'Åpne nettsiden',
    lead:
      'Nettside for podcasten Refleksjonsrommet av Joakim Hove. Forsiden presenterer podcasten, og episodene hentes automatisk fra podcastens RSS-feed.',
    about: [
      'Forsiden presenterer podcasten under «Perspektiver som utfordrer», og episodesiden samler alle episodene med avspilling via Spotify. Hver episode har sin egen side.',
      'Nye episoder dukker opp av seg selv, uten at noen må legge dem inn manuelt. Lyttere kan melde seg på som «Refleksjonist» og får e-post når en ny episode kommer ut.',
      'Bak siden ligger et adminpanel der innholdet kan redigeres, blant annet forsiden, «Om podcasten», favorittepisoder og live-sending.',
    ],
    features: [
      'Episoder hentes automatisk fra RSS-feed, med egen side per episode',
      'Spotify-spiller og en fast spiller nederst på siden',
      'Sider for gjester, om podcasten, sponsorer og kontakt, med kontaktskjema',
      'Påmelding til nyhetsbrev, og daglig sjekk som sender e-post når en ny episode er ute',
      'Støtteside med forhåndsvalgte beløp og betaling med Stripe',
      'Live-visning når podcasten sender direkte',
      'Adminpanel for forside, om-tekster, favoritter og live-status, med bildeopplasting',
      'Mørkt design som fungerer på mobil, nettbrett og PC',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Resend', 'Upstash Redis', 'Vercel Blob', 'Buttondown'],
  },
  {
    slug: 'pelican-beach-roleplay',
    title: 'Pelican Beach Roleplay',
    category: 'Nettside',
    summary:
      'Nettside for et roleplay-fellesskap med guider til jobber, biler og bolig, og lenke til Discord.',
    tags: ['Community', 'Guider', 'Responsivt'],
    images: [
      { src: '/projects/pelican-1-logo.webp', alt: 'Forsiden til Pelican Beach Roleplay med logo' },
      { src: '/projects/pelican-2-hjem.webp', alt: 'Hjemmesiden med Get started og Join our Discord' },
      { src: '/projects/pelican-3-bolig.webp', alt: 'Oversikt over biler, verksted og bolig på nettbrett' },
      { src: '/projects/pelican-4-jobber.webp', alt: 'Guide til jobben Trucking og transport' },
    ],
    url: 'https://pelicanbeachrp.com',
    urlLabel: 'Åpne nettsiden',
    lead:
      'Nettside for et roleplay-fellesskap. Den viser livet i byen og tar nye spillere videre til Discord.',
    about: [
      'Forsiden presenterer fellesskapet med «Your city. Your story.» og har tydelige knapper for å komme i gang og for å bli med på Discord.',
      'Under «Life in the city» finnes oversikter over jobber, biler og verksted, og bolig. Hver av dem har egne guidesider. Guiden for Trucking & transport forklarer for eksempel steg for steg hvordan en ny spiller kommer i gang med sin første jobb.',
      'Designet er mørkt og varmt, med solnedgangsbilder, og fungerer på mobil, nettbrett og PC.',
    ],
    features: [
      'Forside med tydelig vei til å komme i gang og til Discord',
      'Oversikt over livet i byen: jobber, biler og verksted, og bolig',
      'Guidesider med steg-for-steg-forklaringer, for eksempel for jobben Trucking & transport',
      'Mørkt design med egen logo og bilder som passer stemningen',
      'Fungerer på mobil, nettbrett og PC',
    ],
  },
]
