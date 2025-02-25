// Types for the Appraiser Directory

export interface Appraiser {
  id: string;
  name: string;
  slug: string;
  title?: string;
  bio: string;
  credentials: string[];
  specialties: string[];
  location: Location;
  contactInfo: ContactInfo;
  image?: string;
  featured?: boolean;
}

export interface Location {
  city: string;
  state: string;
  country: 'US' | 'Canada';
  citySlug: string;
  stateSlug: string;
  latitude?: number;
  longitude?: number;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
}

export interface Specialty {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export interface City {
  name: string;
  slug: string;
  state: string;
  stateSlug: string;
  country: 'US' | 'Canada';
  numberOfAppraisers: number;
  featured?: boolean;
}

export interface State {
  name: string;
  slug: string;
  country: 'US' | 'Canada';
  numberOfAppraisers: number;
  cities: City[];
} 