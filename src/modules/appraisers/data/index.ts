// This file serves as a data adapter between the appraiser app and the main app
// It reexports and/or transforms data from the original appraiser repo

import { getLocations, getAppraisersByLocation, getAppraiserById } from '../../../pages/appraisers/api';
import type { Appraiser, Location } from '../../../pages/appraisers/types';

// Re-export types and data functions
export type { Appraiser, Location };
export { getLocations, getAppraisersByLocation, getAppraiserById };

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