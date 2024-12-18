import { AppraisalPost, DashboardFilters } from '../types/dashboard';

const API_URL = 'https://resources.appraisily.com/wp-json/wp/v2';

export const fetchAppraisals = async (email: string, filters?: DashboardFilters): Promise<AppraisalPost[]> => {
  try {
    console.log('Fetching appraisals for email:', email);
    console.log('Using filters:', filters);

    // Build query parameters
    const params = new URLSearchParams({      
      'meta_key': 'customer_email',
      'meta_value': email,
      per_page: '100',
      _fields: 'id,date,title,status,acf'
    });

    // Add filters if provided
    if (filters?.status) {
      params.append('status', filters.status);
    }
    if (filters?.sortBy) {
      params.append('orderby', filters.sortBy);
      params.append('order', filters.sortOrder || 'desc');
    }

    const url = `${API_URL}/appraisals?${params.toString()}`;
    console.log('Making request to:', url);

    const response = await fetch(`${API_URL}/appraisals?${params.toString()}`);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.error('API request failed:', response.statusText);
      throw new Error('Failed to fetch appraisals');
    }

    const data = await response.json();
    console.log('API response data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching appraisals:', error);
    throw error;
  }
};