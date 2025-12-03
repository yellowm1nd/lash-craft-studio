/**
 * Structured Data (JSON-LD) Generator
 *
 * Developed by: Red Rabbit Media
 * Website: https://redrabbit.media/
 */

import { SEO_CONFIG } from '@/config/seo.config';

interface Review {
  id: string;
  name: string;
  text: string;
  stars: number;
}

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface Price {
  name: string;
  price: string;
  duration?: string;
}

// Local Business Schema
export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  '@id': `${SEO_CONFIG.siteUrl}/#organization`,
  name: SEO_CONFIG.business.name,
  legalName: SEO_CONFIG.business.legalName,
  description: SEO_CONFIG.business.description,
  url: SEO_CONFIG.siteUrl,
  logo: `${SEO_CONFIG.siteUrl}/logo.png`,
  image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.og.image}`,
  email: SEO_CONFIG.business.email,
  telephone: SEO_CONFIG.business.phone,
  priceRange: SEO_CONFIG.business.priceRange,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SEO_CONFIG.business.address.streetAddress,
    addressLocality: SEO_CONFIG.business.address.addressLocality,
    addressRegion: SEO_CONFIG.business.address.addressRegion,
    postalCode: SEO_CONFIG.business.address.postalCode,
    addressCountry: SEO_CONFIG.business.address.addressCountry
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SEO_CONFIG.business.geo.latitude,
    longitude: SEO_CONFIG.business.geo.longitude
  },
  openingHoursSpecification: SEO_CONFIG.business.openingHours.map(hours => {
    const [days, time] = hours.split(' ');
    const [open, close] = time.split('-');
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days,
      opens: open,
      closes: close
    };
  }),
  areaServed: {
    '@type': SEO_CONFIG.business.serviceArea.type,
    name: SEO_CONFIG.business.serviceArea.name
  },
  // Red Rabbit Media as Provider/Creator
  provider: {
    '@type': 'ProfessionalService',
    '@id': `${SEO_CONFIG.developer.url}/#organization`,
    name: SEO_CONFIG.developer.name,
    url: SEO_CONFIG.developer.url,
    description: SEO_CONFIG.developer.description,
    email: SEO_CONFIG.developer.email
  },
  creator: {
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.developer.url}/#organization`,
    name: SEO_CONFIG.developer.name,
    url: SEO_CONFIG.developer.url
  },
  sameAs: [
    SEO_CONFIG.social.instagram,
    SEO_CONFIG.social.facebook
  ].filter(Boolean)
});

// Service Schema
export const getServiceSchema = (service: Service, prices?: Price[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SEO_CONFIG.siteUrl}/behandlungen/${service.id}`,
  name: service.title,
  description: service.description,
  image: service.imageUrl,
  provider: {
    '@id': `${SEO_CONFIG.siteUrl}/#organization`
  },
  serviceType: service.title,
  areaServed: {
    '@type': 'City',
    name: 'Wien'
  },
  ...(prices && prices.length > 0 && {
    offers: prices.map(price => ({
      '@type': 'Offer',
      name: price.name,
      price: price.price.replace(/[€\s]/g, ''),
      priceCurrency: 'EUR',
      ...(price.duration && { duration: price.duration })
    }))
  })
});

// Review/Rating Schema
export const getReviewSchema = (reviews: Review[]) => {
  if (reviews.length === 0) return null;

  const totalRating = reviews.reduce((sum, review) => sum + review.stars, 0);
  const averageRating = totalRating / reviews.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1'
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.name
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.stars,
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: review.text
    }))
  };
};

// Breadcrumb Schema
export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SEO_CONFIG.siteUrl}${item.url}`
  }))
});

// Website Schema
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SEO_CONFIG.siteUrl}/#website`,
  url: SEO_CONFIG.siteUrl,
  name: SEO_CONFIG.siteName,
  description: SEO_CONFIG.defaultDescription,
  publisher: {
    '@id': `${SEO_CONFIG.siteUrl}/#organization`
  },
  // Red Rabbit Media as Creator
  creator: {
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.developer.url}/#organization`,
    name: SEO_CONFIG.developer.name,
    url: SEO_CONFIG.developer.url
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SEO_CONFIG.siteUrl}/behandlungen?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
});

// Image Object Schema
export const getImageSchema = (images: { url: string; caption?: string; alt?: string }[]) =>
  images.map(image => ({
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: image.url,
    ...(image.caption && { caption: image.caption }),
    ...(image.alt && { description: image.alt }),
    creator: {
      '@type': 'Organization',
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
      name: SEO_CONFIG.business.name
    }
  }));

// FAQ Schema
export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

// Person Schema (for About page)
export const getPersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SEO_CONFIG.business.owner,
  jobTitle: 'Lash Artist & Beauty Specialist',
  worksFor: {
    '@id': `${SEO_CONFIG.siteUrl}/#organization`
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: SEO_CONFIG.business.address.addressLocality,
    addressRegion: SEO_CONFIG.business.address.addressRegion,
    addressCountry: SEO_CONFIG.business.address.addressCountry
  }
});

// Organization Schema (Complete)
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SEO_CONFIG.siteUrl}/#organization`,
  name: SEO_CONFIG.business.name,
  url: SEO_CONFIG.siteUrl,
  logo: `${SEO_CONFIG.siteUrl}/logo.png`,
  description: SEO_CONFIG.business.description,
  email: SEO_CONFIG.business.email,
  telephone: SEO_CONFIG.business.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SEO_CONFIG.business.address.streetAddress,
    addressLocality: SEO_CONFIG.business.address.addressLocality,
    addressRegion: SEO_CONFIG.business.address.addressRegion,
    postalCode: SEO_CONFIG.business.address.postalCode,
    addressCountry: SEO_CONFIG.business.address.addressCountry
  },
  // Red Rabbit Media as Provider
  provider: {
    '@type': 'Organization',
    '@id': `${SEO_CONFIG.developer.url}/#organization`,
    name: SEO_CONFIG.developer.name,
    url: SEO_CONFIG.developer.url,
    description: SEO_CONFIG.developer.description
  }
});
