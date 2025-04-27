import { auth } from '../firebase/config';
import type { AppraisalPost } from '@/lib/types/dashboard';
import type { DashboardFilters } from '@/lib/types/dashboard';

const WP_API_URL = import.meta.env.VITE_WP_API_URL || 'https://resources.appraisily.com/wp-json';

export async function fetchAppraisals(
  email: string | null = null,
  filters: DashboardFilters
): Promise<AppraisalPost[]> {
  // Use Firebase auth user email if no email provided
  if (!email) {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error('No authenticated user found');
    }
    email = user.email;
  }

  console.log(`[Dashboard API] Fetching appraisals for ${email}`);

  // Build query parameters
  const queryParams = new URLSearchParams({
    user_email: email,
    status: filters.status,
    ...(filters.sortBy && { sort_by: filters.sortBy }),
    ...(filters.sortOrder && { sort_order: filters.sortOrder }),
    ...(filters.category && { category: filters.category }),
    ...(filters.search && { search: filters.search }),
  });

  try {
    const response = await fetch(`${WP_API_URL}/appraisily/v1/appraisals?${queryParams.toString()}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error (${response.status}): Failed to fetch appraisals`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[Dashboard API] Error fetching appraisals:', error);
    throw error;
  }
}