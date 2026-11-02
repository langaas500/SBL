// Prosjekter som vises på /prosjekter.
//
// Slik legger du til et nytt prosjekt: kopier en blokk og fyll ut.
//   title       – navn på prosjektet
//   category    – f.eks. "Nettside", "App", "Digitalt system"
//   description – 1–3 setninger: hvilket problem løste du, og hvordan?
//   tags        – korte stikkord (valgfritt)
//   image       – bilde i public/projects/, f.eks. "/projects/navn.png" (valgfritt)
//   url         – lenke til live-løsning (valgfritt)
//   visual      – "reports" bruker innebygd illustrasjon når du ikke har bilde (valgfritt)
export const projects = [
  {
    title: "Digitalt rapportsystem",
    category: "Digitalt system",
    description:
      "Jeg ble lei av tungvinte Excel-skjemaer på arbeidsplassen og bygde min egen digitale løsning. Den fungerte så godt at lederen min også begynte å bruke den, og jeg bygde den videre med administrasjon og godkjenning av rapporter.",
    tags: ["Rapportering", "Administrasjon", "Godkjenning"],
    visual: "reports",
  },
];
