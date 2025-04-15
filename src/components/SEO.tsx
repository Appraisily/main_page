import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  ratings?: {
    ratingValue: number;
    ratingCount: number;
    reviewCount?: number;
  };
  type?: 'Organization' | 'LocalBusiness' | 'Product' | 'Service';
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  datePublished?: string;
  dateModified?: string;
}

export default function SEO({ 
  title, 
  description, 
  image, 
  url, 
  ratings, 
  type = 'Organization',
  breadcrumbs,
  faqs,
  datePublished,
  dateModified
}: SEOProps) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://appraisily.com';
  const defaultImage = `${siteUrl}/og-image.jpg`;
  const currentUrl = url || siteUrl;

  // Create structured data for the entity, including ratings if provided
  const mainEntityData = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${currentUrl}#${type.toLowerCase()}`,
    name: 'Appraisily',
    url: currentUrl,
    logo: {
      '@type': 'ImageObject',
      url: 'https://ik.imagekit.io/appraisily/WebPage/logo_new.png',
      width: '128',
      height: '128'
    },
    description,
    ...(ratings && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: ratings.ratingValue,
        ratingCount: ratings.ratingCount,
        ...(ratings.reviewCount && { reviewCount: ratings.reviewCount }),
        bestRating: 5,
        worstRating: 1
      }
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified })
  };

  // Create breadcrumb structured data if breadcrumbs are provided
  const breadcrumbData = breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.name
      }
    }))
  } : null;

  // Create FAQ structured data if FAQs are provided
  const faqData = faqs ? {
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
  } : null;

  // Combine all structured data into an array
  const structuredDataArray = [
    mainEntityData,
    ...(breadcrumbData ? [breadcrumbData] : []),
    ...(faqData ? [faqData] : [])
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Structured Data for Google Rich Snippets */}
      {structuredDataArray.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}

      {/* Additional SEO */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
}