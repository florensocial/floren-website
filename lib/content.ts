export type Lang = 'de' | 'en';

export const packages = [
  { id: '2-week-trial', name: '2 Week Trial', price: '€499', description: 'A focused two-week entry package to validate creative direction, publishing rhythm and social media potential before scaling into a long-term partnership.', features: ['Kickoff & channel audit', 'Content direction', 'Short-form content planning', 'Performance recap'] },
  { id: 'starter', name: 'Starter', price: '€990 / Monat', description: 'For brands that need a polished, consistent social media presence with strategic content and reliable execution.', features: ['Monthly content strategy', 'Content calendar', 'Creative production guidance', 'Community basics', 'Monthly reporting'] },
  { id: 'growth', name: 'Growth', price: '€1.790 / Monat', description: 'For ambitious companies ready to grow reach, engagement and trust through a stronger content engine and campaign-led execution.', features: ['Advanced strategy', 'Higher posting cadence', 'Reels & short-form concepts', 'Campaign planning', 'Optimization calls', 'Detailed reporting'] },
  { id: 'premium', name: 'Premium', price: '€2.990 / Monat', description: 'A premium social media partnership for brands that want a distinctive presence, high-touch creative direction and continuous growth.', features: ['Full-service social direction', 'Premium creative concepts', 'High-frequency content system', 'Brand storytelling', 'Priority support', 'Executive performance review'] },
];

export const dictionary = {
  de: {
    nav: { home: 'Home', services: 'Services', contact: 'Kontakt' },
    hero: { eyebrow: 'Premium Social Media Agency · Austria', title: 'Social Media, das sich wie eine Luxusmarke anfühlt.', text: 'Floren entwickelt elegante Content-Systeme, die Aufmerksamkeit in Vertrauen verwandeln — und Vertrauen in qualifizierte Anfragen.', cta: 'Projekt anfragen', secondary: 'Pakete ansehen' },
    intro: { title: 'Strategie, Ästhetik und Performance in einem ruhigen, präzisen Prozess.', text: 'Wir verbinden Editorial Design, datenbasierte Entscheidungen und klare Markenführung für Unternehmen, die online hochwertiger wirken und besser verkaufen möchten.' },
    services: { eyebrow: 'Services', title: 'Pakete für eine präzise Social-Media-Präsenz.', text: 'Alle Pakete basieren auf dem bereitgestellten Pricing-Referenzdokument. Wählen Sie den passenden Einstieg — wir melden uns mit einem klaren nächsten Schritt.', cta: 'Paket auswählen' },
    contact: { title: 'Lassen Sie uns über Ihr Wachstum sprechen.', text: 'Erzählen Sie uns kurz von Ihrer Marke. Wir antworten persönlich mit einer klaren Einschätzung.', package: 'Ausgewähltes Paket', noPackage: 'Kein Paket vorausgewählt', name: 'Name', company: 'Unternehmen', email: 'E-Mail', phone: 'Telefon', message: 'Nachricht', send: 'Anfrage senden', sending: 'Wird gesendet…', success: 'Vielen Dank. Ihre Anfrage wurde gesendet.', error: 'Bitte prüfen Sie Ihre Eingaben oder versuchen Sie es erneut.' },
    footer: { legal: 'Rechtliches', privacy: 'Datenschutz', imprint: 'Impressum' }
  },
  en: {
    nav: { home: 'Home', services: 'Services', contact: 'Contact' },
    hero: { eyebrow: 'Premium Social Media Agency · Austria', title: 'Social media with the presence of a luxury brand.', text: 'Floren builds elegant content systems that turn attention into trust — and trust into qualified client enquiries.', cta: 'Start a project', secondary: 'View packages' },
    intro: { title: 'Strategy, aesthetics and performance in one calm, precise process.', text: 'We combine editorial design, data-led decisions and clear brand direction for companies that want to look premium and convert better online.' },
    services: { eyebrow: 'Services', title: 'Packages for a precise social media presence.', text: 'Every package follows the supplied pricing reference. Choose the right starting point — we will respond with a clear next step.', cta: 'Select package' },
    contact: { title: 'Let’s talk about your growth.', text: 'Tell us a little about your brand. We will reply personally with a clear recommendation.', package: 'Selected package', noPackage: 'No package preselected', name: 'Name', company: 'Company', email: 'Email', phone: 'Phone', message: 'Message', send: 'Send enquiry', sending: 'Sending…', success: 'Thank you. Your enquiry has been sent.', error: 'Please check your details or try again.' },
    footer: { legal: 'Legal', privacy: 'Privacy Policy', imprint: 'Imprint' }
  }
} as const;
