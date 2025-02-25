import { LocationData } from '../pages/LocationPage';

// Define a more specific type for appraiser data
interface AppraiserSchema {
  id?: string;
  name: string;
  image?: string;
  about?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  phone?: string;
  email?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Array<{
    rating: number;
    author?: string;
    date?: string;
    content?: string;
    comment?: string;
    name?: string;
  }>;
  services?: Array<{
    name: string;
    description?: string;
    price?: string;
  }>;
  businessHours?: Array<{
    day: string;
    hours: string;
  }>;
  specialties?: string[];
}

export function generateAppraiserSchema(appraiser: AppraiserSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": appraiser.name,
    "image": appraiser?.image || "",
    "description": appraiser?.about || "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": appraiser?.address ? appraiser.address.split(',')[0]?.trim() : "",
      "addressRegion": appraiser?.address ? appraiser.address.split(',')[1]?.trim() : "",
      "addressCountry": "US"
    },
    "geo": appraiser?.latitude && appraiser?.longitude ? {
      "@type": "GeoCoordinates",
      "latitude": appraiser.latitude,
      "longitude": appraiser.longitude
    } : undefined,
    "url": appraiser?.website || "",
    "telephone": appraiser?.phone || "",
    "email": appraiser?.email || "",
    "aggregateRating": appraiser?.rating && appraiser?.reviewCount ? {
      "@type": "AggregateRating",
      "ratingValue": appraiser.rating.toString(),
      "reviewCount": appraiser.reviewCount.toString()
    } : undefined,
    "review": appraiser?.reviews?.map((review) => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString()
      },
      "author": {
        "@type": "Person",
        "name": review.author || review.name || "Customer"
      },
      "datePublished": review.date || new Date().toISOString().split('T')[0],
      "reviewBody": review.content || review.comment || ""
    })),
    "makesOffer": appraiser?.services?.map((service) => ({
      "@type": "Offer",
      "name": service.name,
      "description": service.description || "",
      "price": service.price ? service.price.replace(/[^0-9]/g, '') : "0",
      "priceCurrency": "USD"
    })),
    "openingHoursSpecification": appraiser?.businessHours?.map((hours) => {
      const timeParts = hours.hours.split(' - ');
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": hours.day,
        "opens": timeParts[0] || "9:00 AM",
        "closes": timeParts[1] || "5:00 PM"
      };
    })
  };
}

export function generateLocationSchema(locationData: LocationData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Art Appraisal Services in ${locationData?.city || ""}`,
    "serviceType": "Art Appraisal",
    "areaServed": {
      "@type": "City",
      "name": locationData?.city || "",
      "state": locationData?.state || ""
    },
    "provider": locationData?.appraisers?.map((appraiser) => ({
      "@type": "LocalBusiness",
      "name": appraiser?.name || "",
      "image": appraiser?.image || "",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": locationData?.city || "",
        "addressRegion": locationData?.state || "",
        "addressCountry": "US"
      }
    })) || []
  };
}

export function generateFAQSchema(appraiser: AppraiserSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What services does ${appraiser.name} offer?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": appraiser?.services?.map((s) => s.name).join(', ') || "Art appraisal services"
        }
      },
      {
        "@type": "Question",
        "name": `What are ${appraiser.name}'s specialties?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": appraiser?.specialties?.join(', ') || "Fine art appraisal"
        }
      }
    ]
  };
}