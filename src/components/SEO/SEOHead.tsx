/**
 * SEO Head Component
 *
 * Developed by: Red Rabbit Media
 * Website: https://redrabbit.media/
 */

import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '@/config/seo.config';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  canonical?: string;
  structuredData?: object | object[];
}

export const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noindex = false,
  canonical,
  structuredData
}: SEOHeadProps) => {
  const fullTitle = title || SEO_CONFIG.defaultTitle;
  const fullDescription = description || SEO_CONFIG.defaultDescription;
  const fullUrl = url ? `${SEO_CONFIG.siteUrl}${url}` : SEO_CONFIG.siteUrl;
  const fullImage = image ? `${SEO_CONFIG.siteUrl}${image}` : `${SEO_CONFIG.siteUrl}${SEO_CONFIG.og.image}`;
  const canonicalUrl = canonical || fullUrl;

  // Primary keywords from config
  const keywordString = keywords || SEO_CONFIG.keywords.primary.join(', ');

  // Robots content
  const robotsContent = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywordString} />

      {/* Author & Creator (Red Rabbit Media) */}
      <meta name="author" content={SEO_CONFIG.developer.name} />
      <meta name="creator" content={`${SEO_CONFIG.developer.name} - ${SEO_CONFIG.developer.url}`} />
      <meta name="publisher" content={SEO_CONFIG.developer.name} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Language & Region */}
      <meta name="language" content="de-AT" />
      <meta name="geo.region" content="AT-9" />
      <meta name="geo.placename" content="Wien" />
      <meta name="geo.position" content={`${SEO_CONFIG.business.geo.latitude};${SEO_CONFIG.business.geo.longitude}`} />
      <meta name="ICBM" content={`${SEO_CONFIG.business.geo.latitude}, ${SEO_CONFIG.business.geo.longitude}`} />

      {/* Robots Meta Tags */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />

      {/* AI Crawlers */}
      <meta name="GPTBot" content="index, follow" />
      <meta name="ChatGPT-User" content="index, follow" />
      <meta name="PerplexityBot" content="index, follow" />
      <meta name="ClaudeBot" content="index, follow" />
      <meta name="Anthropic-AI" content="index, follow" />
      <meta name="Google-Extended" content="index, follow" />

      {/* AI-Friendly Description */}
      <meta name="description:ai" content={SEO_CONFIG.aiDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content={SEO_CONFIG.og.imageWidth.toString()} />
      <meta property="og:image:height" content={SEO_CONFIG.og.imageHeight.toString()} />
      <meta property="og:locale" content={SEO_CONFIG.og.locale} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content={SEO_CONFIG.twitter.card} />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={fullImage} />
      {SEO_CONFIG.twitter.site && (
        <meta property="twitter:site" content={SEO_CONFIG.twitter.site} />
      )}

      {/* Developer Links (Red Rabbit Media - Hidden in HTML head) */}
      <link rel="author" href={SEO_CONFIG.developer.url} />
      <link rel="designer" href={SEO_CONFIG.developer.url} />
      <link rel="developer" href={SEO_CONFIG.developer.url} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])}
        </script>
      )}
    </Helmet>
  );
};
