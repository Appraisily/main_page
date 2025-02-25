// This file serves as a data adapter between the appraiser app and the main app
// It reexports and/or transforms data from the original appraiser repo

import { 
  fetchAllCities as fetchLocations, 
  fetchAppraisersByCity as fetchAppraisersByLocation, 
  fetchAppraiserBySlug as fetchAppraiserId 
} from '../../../pages/appraisers/api';
import type { Appraiser as ApiAppraiser, City, Location as ApiLocation } from '../../../pages/appraisers/types';

// Define local types that match what the components expect
export interface Location {
  city: string;
  citySlug: string;
  state: string;
  stateSlug: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    schema?: {
      areaServed?: {
        name?: string;
      };
      [key: string]: any;
    };
  };
}

export interface Appraiser {
  id: string;
  name: string;
  specialties: string[];
  city: string;
  state: string;
  phone: string;
  website: string;
  // Add properties needed by components
  services_offered?: string[] | string;
  certifications?: string[];
  years_in_business?: string;
  notes?: string;
  pricing?: string;
  // Additional fields needed by UI
  image?: string;
  rating?: number;
  reviewCount?: number;
  address?: string;
  email?: string;
  about?: string;
  businessHours?: { day: string; hours: string }[];
  services?: { name: string; description: string }[];
  reviews?: { name: string; rating: number; date: string; comment: string }[];
  // SEO related fields
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    schema?: any;
  };
}

// Transform data from API format to local format
const transformCity = (city: City): Location => ({
  city: city.name,
  citySlug: city.slug,
  state: city.state,
  stateSlug: city.stateSlug,
  // Add SEO data
  seo: {
    title: `Art Appraisers in ${city.name}, ${city.state} | Expert Art Valuation Services`,
    description: `Find certified art appraisers in ${city.name}, ${city.state}. Get expert art valuations, authentication services, and professional advice for your art collection.`,
    keywords: [
      `art appraisers ${city.name.toLowerCase()}`,
      `art valuation ${city.name.toLowerCase()}`,
      `art authentication ${city.state.toLowerCase()}`,
      `fine art appraisal ${city.name.toLowerCase()}`
    ]
  }
});

const transformAppraiser = (appraiser: ApiAppraiser): Appraiser => ({
  id: appraiser.id,
  name: appraiser.name,
  specialties: appraiser.specialties,
  city: appraiser.location.city,
  state: appraiser.location.state,
  phone: appraiser.contactInfo.phone || '',
  website: appraiser.contactInfo.website || '',
  // Add certifications from credentials
  certifications: appraiser.credentials || [],
  // Convert bio to notes and about
  notes: appraiser.bio,
  about: appraiser.bio,
  // Additional UI fields with defaults
  image: appraiser.image || 'https://placehold.it/300x200?text=No+Image',
  rating: 4.8,
  reviewCount: 25,
  address: appraiser.contactInfo.address || `${appraiser.location.city}, ${appraiser.location.state}`,
  email: appraiser.contactInfo.email || 'contact@example.com',
  // Add additional fields
  services_offered: appraiser.specialties, // Use specialties as services offered
  years_in_business: '10+ years', // Default value
  // Add more fields for UI components
  businessHours: [
    { day: 'Monday - Friday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: 'By appointment' },
    { day: 'Sunday', hours: 'Closed' }
  ],
  services: appraiser.specialties.map(specialty => ({
    name: specialty,
    description: `Professional ${specialty} appraisal services provided by ${appraiser.name}`
  })),
  reviews: [
    { 
      name: 'John D.', 
      rating: 5, 
      date: '2023-10-15',
      comment: 'Excellent service and very professional. Highly recommended!'
    },
    {
      name: 'Sarah M.',
      rating: 4,
      date: '2023-09-22',
      comment: 'Very knowledgeable and provided a detailed appraisal report.'
    }
  ],
  // SEO data
  seo: {
    title: `${appraiser.name} - Art Appraiser in ${appraiser.location.city}, ${appraiser.location.state}`,
    description: appraiser.bio,
    keywords: [
      `art appraiser ${appraiser.location.city.toLowerCase()}`,
      ...appraiser.specialties.map(s => s.toLowerCase())
    ]
  }
});

// Adapter functions
export const getLocations = async (): Promise<Location[]> => {
  const cities = await fetchLocations();
  return cities.map(transformCity);
};

export const getAppraisersByLocation = async (citySlug: string): Promise<Appraiser[]> => {
  const appraisers = await fetchAppraisersByLocation(citySlug);
  return appraisers.map(transformAppraiser);
};

export const getAppraiserById = async (id: string): Promise<Appraiser | null> => {
  const appraiser = await fetchAppraiserId(id);
  return appraiser ? transformAppraiser(appraiser) : null;
};

// Add any additional data transformation or caching logic here
// For example, you could add caching:

const locationCache = new Map<string, Location[]>();

export const getCachedLocations = async (): Promise<Location[]> => {
  if (locationCache.has('all')) {
    return locationCache.get('all') as Location[];
  }
  
  const locations = await getLocations();
  locationCache.set('all', locations);
  return locations;
};

const appraiserCache = new Map<string, Appraiser>();

export const getCachedAppraiserById = async (id: string): Promise<Appraiser | null> => {
  if (appraiserCache.has(id)) {
    return appraiserCache.get(id) as Appraiser;
  }
  
  const appraiser = await getAppraiserById(id);
  if (appraiser) {
    appraiserCache.set(id, appraiser);
  }
  
  return appraiser;
}; 