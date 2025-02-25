import { Appraiser, City, Specialty, State } from './types';

// This is a placeholder. In a real implementation, you would:
// 1. Import your data from JSON files
// 2. OR fetch from an API endpoint
// 3. OR connect to a database

// Sample data, replace with actual data from your appraiser repository
const sampleAppraisers: Appraiser[] = [
  {
    id: '1',
    name: 'Jane Smith',
    slug: 'jane-smith',
    title: 'Senior Art Appraiser',
    bio: 'Jane Smith is a certified appraiser with over 20 years of experience specializing in modern and contemporary art. She holds degrees from Yale University and has worked with major museums and auction houses.',
    credentials: ['ISA Certified', 'AAA Member'],
    specialties: ['Modern Art', 'Contemporary Paintings', 'Sculptures'],
    location: {
      city: 'Los Angeles',
      state: 'California',
      country: 'US',
      citySlug: 'los-angeles',
      stateSlug: 'california',
    },
    contactInfo: {
      email: 'jane@example.com',
      phone: '(213) 555-1234',
      website: 'www.janesmith.com',
    },
    featured: true,
  },
  {
    id: '2',
    name: 'Robert Johnson',
    slug: 'robert-johnson',
    title: 'Fine Art Specialist',
    bio: 'Robert Johnson specializes in European paintings and decorative arts from the 18th and 19th centuries. With extensive training from Sotheby\'s Institute, he provides detailed valuations for insurance, estate, and donation purposes.',
    credentials: ['USPAP Compliant', 'Fine Art Specialist'],
    specialties: ['European Paintings', 'Decorative Arts', 'Antique Furniture'],
    location: {
      city: 'Los Angeles',
      state: 'California',
      country: 'US',
      citySlug: 'los-angeles',
      stateSlug: 'california',
    },
    contactInfo: {
      email: 'robert@example.com',
      phone: '(213) 555-5678',
    },
  },
];

const sampleCities: City[] = [
  {
    name: 'Los Angeles',
    slug: 'los-angeles',
    state: 'California',
    stateSlug: 'california',
    country: 'US',
    numberOfAppraisers: 2,
    featured: true,
  },
  {
    name: 'New York',
    slug: 'new-york',
    state: 'New York',
    stateSlug: 'new-york',
    country: 'US',
    numberOfAppraisers: 0,
    featured: true,
  },
];

const sampleStates: State[] = [
  {
    name: 'California',
    slug: 'california',
    country: 'US',
    numberOfAppraisers: 2,
    cities: [sampleCities[0]],
  },
  {
    name: 'New York',
    slug: 'new-york',
    country: 'US',
    numberOfAppraisers: 0,
    cities: [sampleCities[1]],
  },
];

const sampleSpecialties: Specialty[] = [
  {
    id: '1',
    name: 'Modern Art',
    slug: 'modern-art',
    description: 'Appraisers specializing in modern art from the late 19th century through the 1970s.',
  },
  {
    id: '2',
    name: 'European Paintings',
    slug: 'european-paintings',
    description: 'Specialists in European paintings from all periods, including Old Masters.',
  },
];

// API functions to fetch data

export async function fetchAllAppraisers(): Promise<Appraiser[]> {
  // In a real app, this would be an API call
  return Promise.resolve(sampleAppraisers);
}

export async function fetchAppraisersByCity(citySlug: string): Promise<Appraiser[]> {
  // In a real app, this would be an API call with filtering
  return Promise.resolve(
    sampleAppraisers.filter(appraiser => appraiser.location.citySlug === citySlug)
  );
}

export async function fetchAppraiserBySlug(slug: string): Promise<Appraiser | null> {
  // In a real app, this would be an API call with a lookup
  const appraiser = sampleAppraisers.find(a => a.slug === slug);
  return Promise.resolve(appraiser || null);
}

export async function fetchAllCities(): Promise<City[]> {
  return Promise.resolve(sampleCities);
}

export async function fetchCityBySlug(slug: string): Promise<City | null> {
  const city = sampleCities.find(c => c.slug === slug);
  return Promise.resolve(city || null);
}

export async function fetchAllStates(): Promise<State[]> {
  return Promise.resolve(sampleStates);
}

export async function fetchStateBySlug(slug: string): Promise<State | null> {
  const state = sampleStates.find(s => s.slug === slug);
  return Promise.resolve(state || null);
}

export async function fetchAllSpecialties(): Promise<Specialty[]> {
  return Promise.resolve(sampleSpecialties);
}

export async function fetchSpecialtyBySlug(slug: string): Promise<Specialty | null> {
  const specialty = sampleSpecialties.find(s => s.slug === slug);
  return Promise.resolve(specialty || null);
}

export async function fetchAppraisersBySpecialty(specialtySlug: string): Promise<Appraiser[]> {
  return Promise.resolve(
    sampleAppraisers.filter(appraiser => 
      appraiser.specialties.some(specialty => 
        specialty.toLowerCase().replace(/\s+/g, '-') === specialtySlug
      )
    )
  );
} 