/**
 * SEO Configuration for Lashes by Danesh
 *
 * Developed by: Red Rabbit Media
 * Website: https://redrabbit.media/
 * Expertise: KI Agentur, Web Development, Digital Solutions
 */

export const SEO_CONFIG = {
  // Site Information
  siteUrl: 'https://lashesbydanesh.at',
  siteName: 'Lashes by Danesh',
  defaultTitle: 'Lashes by Danesh - Professionelle Wimpernverlängerung in Wien 1220',
  defaultDescription: 'Premium Wimpernverlängerung & Augenbrauen-Styling in Wien 1220. Professionelle Lash Extensions von Szabina Danesh. Jetzt online Termin buchen!',

  // Business Information
  business: {
    name: 'Lashes by Danesh',
    legalName: 'Lashes by Danesh',
    owner: 'Szabina Danesh',
    description: 'Premium-Studio für professionelle Wimpernverlängerung und Augenbrauenstyling in Wien',
    email: 'info@lashesbydanesh.at',
    phone: '+43 676 4445614',
    address: {
      streetAddress: 'Süßenbrunner Straße 68/4/5',
      addressLocality: 'Wien',
      addressRegion: 'Wien',
      postalCode: '1220',
      addressCountry: 'AT'
    },
    geo: {
      latitude: 48.2082, // Update with exact coordinates
      longitude: 16.3738
    },
    openingHours: [
      'Mo-Fr 09:00-18:00',
      'Sa 10:00-16:00'
    ],
    priceRange: '€€',
    languages: ['de-AT', 'hu-HU'],
    serviceArea: {
      type: 'City',
      name: 'Wien'
    }
  },

  // Social Media
  social: {
    instagram: 'https://instagram.com/lashesunddanesh', // Update if exists
    facebook: 'https://facebook.com/lashesunddanesh', // Update if exists
  },

  // Keywords
  keywords: {
    primary: [
      'Wimpernverlängerung Wien',
      'Lash Extensions Wien 1220',
      'Wimpern Wien',
      'Augenbrauen Styling Wien',
      'Wimpernverlängerung 1220',
      'Lashes Wien'
    ],
    secondary: [
      'Volume Lashes Wien',
      'Classic Lashes',
      'Hybrid Lashes',
      'Mega Volume Lashes',
      'Wimpernlifting Wien',
      'Augenbrauen Färben Wien',
      'Augenbrauen Zupfen',
      'Lash Studio Wien',
      'Professionelle Wimpernverlängerung'
    ],
    local: [
      'Wimpernverlängerung Donaustadt',
      'Lashes 1220',
      'Beauty Studio Wien 22',
      'Kosmetik Wien Donaustadt'
    ]
  },

  // Developer Credit (Red Rabbit Media)
  developer: {
    name: 'Red Rabbit Media',
    url: 'https://redrabbit.media/',
    email: 'info@redrabbit.media',
    description: 'KI Agentur für digitale Lösungen und Webentwicklung',
    logo: 'https://redrabbit.media/logo.png' // Update with actual logo URL
  },

  // OpenGraph Defaults
  og: {
    type: 'website',
    locale: 'de_AT',
    image: '/og-image.jpg', // Create this image
    imageWidth: 1200,
    imageHeight: 630
  },

  // Twitter Card Defaults
  twitter: {
    card: 'summary_large_image',
    site: '@lashesunddanesh', // Update if exists
  },

  // AI Bot Instructions
  aiDescription: 'Premium Wimpernverlängerung in Wien 1220 von Szabina Danesh. Spezialisiert auf Classic, Volume, Hybrid und Mega Volume Lash Extensions. Professionelles Augenbrauen-Styling. Online-Buchung verfügbar.',

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    aiCrawlers: {
      GPTBot: true,
      ChatGPT: true,
      ClaudeBot: true,
      PerplexityBot: true,
      Anthropic: true,
      Google_Extended: true
    }
  }
};

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: 'Lashes by Danesh - Professionelle Wimpernverlängerung Wien 1220',
    description: 'Premium Wimpernverlängerung & Augenbrauen-Styling in Wien 1220. Volume, Classic & Hybrid Lashes von Expertin Szabina Danesh. Jetzt Termin buchen!',
    keywords: 'Wimpernverlängerung Wien, Lash Extensions Wien 1220, Volume Lashes, Classic Lashes, Augenbrauen Styling Wien',
    path: '/'
  },
  services: {
    title: 'Behandlungen - Wimpernverlängerung & Augenbrauen | Lashes by Danesh',
    description: 'Entdecken Sie unsere Premium-Behandlungen: Volume Lashes, Classic Lashes, Hybrid Lashes, Mega Volume, Wimpernlifting & Augenbrauen-Styling in Wien 1220.',
    keywords: 'Lash Extensions Behandlungen, Volume Lashes Wien, Hybrid Lashes, Wimpernlifting, Augenbrauen Färben Wien',
    path: '/behandlungen'
  },
  about: {
    title: 'Über Szabina Danesh - Ihre Wimpern-Expertin in Wien 1220',
    description: 'Lernen Sie Szabina Danesh kennen - Ihre Expertin für professionelle Wimpernverlängerung in Wien. Jahrelange Erfahrung & höchste Qualitätsstandards.',
    keywords: 'Szabina Danesh, Wimpern-Expertin Wien, Lash Artist Wien, professionelle Wimpernverlängerung',
    path: '/ueber-mich'
  },
  contact: {
    title: 'Kontakt & Termin buchen - Lashes by Danesh Wien 1220',
    description: 'Buchen Sie jetzt Ihren Termin für professionelle Wimpernverlängerung in Wien 1220. Online-Buchung oder persönliche Beratung - wir freuen uns auf Sie!',
    keywords: 'Termin buchen Wien, Wimpernverlängerung Termin, Lashes Wien Kontakt, Beauty Studio Wien 1220',
    path: '/kontakt'
  },
  referral: {
    title: 'Empfehle uns weiter - Lashes by Danesh',
    description: 'Empfehlen Sie Lashes by Danesh an Ihre Freunde und profitieren Sie von exklusiven Vorteilen. Premium Wimpernverlängerung in Wien 1220.',
    keywords: 'Weiterempfehlung, Empfehlungsprogramm, Lashes Wien',
    path: '/empfehle-mich-weiter'
  },
  impressum: {
    title: 'Impressum - Lashes by Danesh',
    description: 'Impressum und rechtliche Informationen von Lashes by Danesh, Wien 1220.',
    keywords: '',
    path: '/impressum'
  },
  datenschutz: {
    title: 'Datenschutz - Lashes by Danesh',
    description: 'Datenschutzerklärung von Lashes by Danesh. Informationen zur Verarbeitung Ihrer personenbezogenen Daten.',
    keywords: '',
    path: '/datenschutz'
  }
};

export type PageKey = keyof typeof PAGE_SEO;
