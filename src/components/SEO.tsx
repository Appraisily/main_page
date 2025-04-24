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

interface ServiceDetail {
  name: string;
  description: string;
  url: string;
  price?: string;
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
  type?: 'Organization' | 'LocalBusiness' | 'Product' | 'Service' | 'Article';
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  datePublished?: string;
  dateModified?: string;
  services?: ServiceDetail[];
  articleDetails?: {
    author: string;
    headline: string;
    keywords?: string[];
    wordCount?: number;
  };
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
  dateModified,
  services,
  articleDetails
}: SEOProps) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://appraisily.com';
  const defaultImage = `${siteUrl}/og-image.jpg`;
  const currentUrl = url || siteUrl;
  const currentDate = new Date().toISOString().split('T')[0];

  // Create expanded organization data
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': type === 'LocalBusiness' ? 'LocalBusiness' : 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Appraisily',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: 'https://ik.imagekit.io/appraisily/WebPage/logo_new.png',
      width: '128',
      height: '128'
    },
    sameAs: [
      'https://www.facebook.com/appraisily',
      'https://twitter.com/appraisily',
      'https://www.instagram.com/appraisily',
      'https://www.linkedin.com/company/appraisily'
    ],
    description: 'Professional online art and antique appraisals. Get accurate valuations from certified experts within 48 hours.',
    ...(type === 'LocalBusiness' && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Appraisal Way',
        addressLocality: 'New York',
        addressRegion: 'NY',
        postalCode: '10001',
        addressCountry: 'US'
      },
      telephone: '+1-555-123-4567',
      priceRange: '$$',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00'
        }
      ]
    })
  };

  // Create structured data for the current page, including ratings if provided
  const mainEntityData = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${currentUrl}#${type.toLowerCase()}`,
    name: title.replace(' | Appraisily', '').replace('Appraisily | ', ''),
    url: currentUrl,
    description,
    provider: {
      '@id': `${siteUrl}/#organization`
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image || defaultImage
      }
    }),
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
    ...(datePublished ? { datePublished } : { datePublished: currentDate }),
    ...(dateModified ? { dateModified } : { dateModified: currentDate })
  };

  // Create article-specific data if type is Article
  const articleData = (type === 'Article' && articleDetails) ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${currentUrl}#article`,
    headline: articleDetails.headline || title,
    description,
    image: image || defaultImage,
    author: {
      '@type': 'Person',
      name: articleDetails.author
    },
    publisher: {
      '@id': `${siteUrl}/#organization`
    },
    datePublished: datePublished || currentDate,
    dateModified: dateModified || currentDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl
    },
    ...(articleDetails.keywords && { keywords: articleDetails.keywords.join(', ') }),
    ...(articleDetails.wordCount && { wordCount: articleDetails.wordCount })
  } : null;

  // Create service schema for either a single service page or list of services
  const serviceData = (type === 'Service' || services) ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${currentUrl}#service`,
    serviceType: title.replace(' | Appraisily', '').replace('Appraisily | ', ''),
    provider: {
      '@id': `${siteUrl}/#organization`
    },
    description,
    ...(services && services.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Appraisal Services',
        itemListElement: services.map((service, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
            url: service.url
          },
          ...(service.price && { price: service.price, priceCurrency: 'USD' })
        }))
      }
    })
  } : null;

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
    organizationData,
    mainEntityData,
    ...(articleData ? [articleData] : []),
    ...(serviceData ? [serviceData] : []),
    ...(breadcrumbData ? [breadcrumbData] : []),
    ...(faqData ? [faqData] : [])
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'Article' ? 'article' : 'website'} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content="Appraisily" />
      {datePublished && <meta property="article:published_time" content={datePublished} />}
      {dateModified && <meta property="article:modified_time" content={dateModified} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@appraisily" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Additional SEO */}
      <link rel="canonical" href={currentUrl} />
      <meta name="robots" content="index, follow" />
      {articleDetails?.keywords && <meta name="keywords" content={articleDetails.keywords.join(', ')} />}

      {/* Structured Data for Google Rich Snippets */}
      {structuredDataArray.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}