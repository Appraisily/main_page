import { AppraisalPost, DashboardFilters } from '../types/dashboard';

const API_URL = 'https://resources.appraisily.com/wp-json/wp/v2';

export const fetchAppraisals = async (email: string, filters?: DashboardFilters): Promise<AppraisalPost[]> => {
  // Guard clause - return empty array if no email
  if (!email) return [];

  try {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    // Build query parameters
    const params = new URLSearchParams({
      'acf_customer_email': email,
      per_page: '100',
      _fields: 'id,date,title,status,acf,meta'
    });

    // Add filters if provided
    if (filters?.status) {
      params.append('post_status', filters.status);
    }
    if (filters?.sortBy) {
      params.append('orderby', filters.sortBy);
      params.append('order', filters.sortOrder || 'desc');
    }

    const url = `${API_URL}/appraisals?${params.toString()}`;

    const response = await fetch(url, requestConfig);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error('Failed to fetch appraisals');
    }

    const data = await response.json();
    
    // Filter results by customer email in ACF fields
    const filteredData = data.filter(post => 
      post.acf?.customer_email === email
    );

    return filteredData;
  } catch (error) {
    throw error;
  }
};