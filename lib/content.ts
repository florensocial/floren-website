export type Lang = "de" | "en";

export type Package = {
  id: string;
  badge?: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
  popular?: boolean;
};

export const packages: Package[] = [
  {
    id: "2-week-trial",
    badge: "KOSTENLOSES ANGEBOT",
    name: "2-Wochen Testpaket",
    price: "€0",
    description:
      "Lernen Sie unsere Arbeitsweise ohne Risiko kennen und überzeugen Sie sich selbst von unserer Qualität.",
    features: [
      "Profil- & Bio-Optimierung",
      "Content-Plan für 2 Wochen",
      "2 Probe-Reels & 2 Probe-Posts",
      "Visuelles Moodboard",
      "Ergebnis-Auswertung am Ende",
    ],
    cta: "Jetzt anfragen",
    featured: true,
  },
  {
    id: "starter",
    name: "Starter",
    price: "€490 / Monat",
    description: "Der perfekte Einstieg für lokale Unternehmen und Gründer.",
    features: [
      "Content-Plan & Kalender",
      "4 Reels & 4 Posts pro Monat",
      "Bis zu 12 Stories",
      "Basis-Videomontage & Untertitel",
      "Laufender Support via Messenger",
    ],
    cta: "Paket wählen",
  },
  {
    id: "growth",
    badge: "AM BELIEBTESTEN",
    name: "Growth",
    price: "€790 / Monat",
    description:
      "Für Marken, die ihre Online-Präsenz ernsthaft skalieren wollen.",
    features: [
      "Content-Plan (PDF) & Strategie",
      "8 Reels & 6 Posts pro Monat",
      "Bis zu 20 Stories pro Monat",
      "Hashtag- & Keyword-Optimierung",
      "3 Story-Highlights",
      "Laufender Support & Beratung",
    ],
    cta: "Jetzt durchstarten",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "€1190 / Monat",
    description: "Das All-Inclusive-Paket für maximale Sichtbarkeit.",
    features: [
      "Komplexe Strategie & Konkurrenzanalyse",
      "12 Reels & 8 Posts pro Monat",
      "Bis zu 30 Stories pro Monat",
      "Umfassendes monatliches Reporting & Analyse",
      "Individuelles Feed-Design & Branding",
      "Bis zu 5 Story-Highlights",
      "Priority Support & Strategie-Calls",
    ],
    cta: "Paket wählen",
  },
];

export const dictionary = {
  de: {
    nav: { home: "Home", services: "Services", contact: "Kontakt" },
    hero: {
      eyebrow: "Premium Social Media Agency · Austria",
      title: "Elegante Social-Media-Systeme für Marken mit Anspruch.",
      text: "Floren verbindet Strategie, Editorial Design und präzise Umsetzung zu einem Auftritt, der hochwertig wirkt, Vertrauen aufbaut und Anfragen erzeugt.",
      cta: "Projekt anfragen",
      secondary: "Pakete ansehen",
      metricOne: "Strategie",
      metricTwo: "Content",
      metricThree: "Wachstum",
    },
    intro: {
      eyebrow: "Handcrafted Presence",
      title: "Ein digitaler Auftritt, der nicht lauter wirkt — sondern wertvoller.",
      text: "Wir entwickeln Social-Media-Präsenzen mit ruhiger Luxusästhetik, klaren Botschaften und einem Prozess, der jedes Detail vom ersten Eindruck bis zur Anfrage bewusst führt.",
      points: ["Positionierung", "Content-Systeme", "Creative Direction"],
    },
    services: {
      eyebrow: "IHRE SOCIAL MEDIA AGENTUR",
      titleStart: "Social Media, das",
      titleHighlight: "wirkt.",
      text: "Keine leeren Versprechen, nur messbare Ergebnisse. Starten Sie mit unserer Testphase oder wählen Sie das Paket, das zu Ihrem Wachstum passt.",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Bereit für einen Auftritt, der Premium ausstrahlt?",
      text: "Teilen Sie uns kurz mit, wo Ihre Marke heute steht. Wir melden uns persönlich mit einer klaren Empfehlung für den nächsten Schritt.",
      package: "Ausgewähltes Paket",
      name: "Name",
      email: "E-Mail",
      phone: "Telefon",
      message: "Nachricht",
      messagePlaceholder: "Was möchten Sie mit Floren erreichen?",
      send: "Anfrage senden",
      sending: "Wird gesendet…",
      success: "Vielen Dank. Ihre Anfrage wurde gesendet.",
      error: "Bitte prüfen Sie Ihre Eingaben oder versuchen Sie es erneut.",
    },
    footer: { legal: "Rechtliches", privacy: "Datenschutz", imprint: "Impressum" },
  },
  en: {
    nav: { home: "Home", services: "Services", contact: "Contact" },
    hero: {
      eyebrow: "Premium Social Media Agency · Austria",
      title: "Elegant social media systems for ambitious brands.",
      text: "Floren combines strategy, editorial design and precise execution into a presence that feels premium, builds trust and converts attention into enquiries.",
      cta: "Start a project",
      secondary: "View packages",
      metricOne: "Strategy",
      metricTwo: "Content",
      metricThree: "Growth",
    },
    intro: {
      eyebrow: "Handcrafted Presence",
      title: "A digital presence that does not feel louder — it feels more valuable.",
      text: "We create social media presences with calm luxury aesthetics, clear messaging and a process that guides every detail from first impression to qualified enquiry.",
      points: ["Positioning", "Content systems", "Creative direction"],
    },
    services: {
      eyebrow: "YOUR SOCIAL MEDIA AGENCY",
      titleStart: "Social media that",
      titleHighlight: "works.",
      text: "No empty promises, only measurable results. Start with our trial phase or choose the package that fits your growth.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Ready for a presence that feels premium?",
      text: "Tell us briefly where your brand stands today. We will reply personally with a clear recommendation for the next step.",
      package: "Selected package",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      messagePlaceholder: "What would you like to achieve with Floren?",
      send: "Send enquiry",
      sending: "Sending…",
      success: "Thank you. Your enquiry has been sent.",
      error: "Please check your details or try again.",
    },
    footer: { legal: "Legal", privacy: "Privacy Policy", imprint: "Imprint" },
  },
} as const;
