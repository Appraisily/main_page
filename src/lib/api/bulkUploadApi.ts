import { BulkUploadResponse } from '../types/appraisal';

const API_URL = 'https://payment-processor-856401495068.us-central1.run.app';

export const updateSessionEmail = async (sessionId: string, email: string): Promise<void> => {
  if (!sessionId) {
    throw new Error('Session ID is required');
  }

  if (!email) {
    throw new Error('Email is required');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  const response = await fetch(`${API_URL}/api/bulk-appraisals/session/${sessionId}/email`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Email update failed:', {
      status: response.status,
      statusText: response.statusText,
      error: errorText
    });
    throw new Error(`Failed to update session email: ${errorText}`);
  }

  // Save to localStorage
  const sessionData = localStorage.getItem('bulkAppraisalSession');
  if (sessionData) {
    const data = JSON.parse(sessionData);
    localStorage.setItem('bulkAppraisalSession', JSON.stringify({
      ...data,
      email
    }));
  }
};

export const initBulkSession = async (): Promise<{ session_id: string; expires_at: string }> => {
  const response = await fetch(`${API_URL}/api/bulk-appraisals/init`, {
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error('Failed to initialize bulk session');
  }

  return response.json();
};

export const restoreSession = async (sessionId: string): Promise<BulkUploadResponse> => {
  // Add retry logic with exponential backoff
  const maxRetries = 3;
  const baseDelay = 1000; // 1 second

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(`${API_URL}/api/bulk-appraisals/session/${sessionId}`, {
        method: 'GET'
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to restore session');
      }

      const data = await response.json();

      // Validate response data
      if (!data.items || !Array.isArray(data.items)) {
        throw new Error('Invalid session data');
      }

      // Clean and validate items
      data.items = data.items.map(item => ({
        item_id: item.item_id || crypto.randomUUID(),
        file_url: item.file_url || '',
        description: item.description || '',
        category: item.category || '',
        status: item.status || 'pending'
      })).filter(item => item.file_url); // Only keep items with valid URLs

      return data;
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error;
      }
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, baseDelay * Math.pow(2, attempt)));
    }
  }

  throw new Error('Failed to restore session after multiple attempts');
};

export const uploadFile = async (
  sessionId: string,
  file: File,
  description?: string,
  category?: string,
  appraisalType?: 'regular' | 'insurance' | 'tax'
): Promise<{ file_id: string; url: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  // Add required position parameter based on timestamp to maintain order
  formData.append('position', Date.now().toString());

  if (description) formData.append('description', description);
  if (category) formData.append('category', category);
  if (appraisalType) formData.append('appraisal_type', appraisalType);

  try {
    const response = await fetch(`${API_URL}/api/bulk-appraisals/upload/${sessionId}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Upload failed');
    }

    const data = await response.json();
    console.log('Upload response:', data);
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Upload failed');
  }
};

export const finalizeBulkUpload = async (
  sessionId: string,
  appraisalType: 'regular' | 'insurance' | 'tax'
): Promise<void> => {
  try {
    // Send finalization request to backend
    const response = await fetch(`${API_URL}/api/bulk-appraisals/finalize/${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        appraisal_type: appraisalType
      })
    });

    if (!response.ok) {
      throw new Error('Failed to finalize session');
    }
  } catch (error) {
    console.error('Finalization error:', error);
    throw error;
  }
};

export const getStripeCheckoutUrl = (
  sessionId: string,
  appraisalType: 'regular' | 'insurance' | 'tax'
): string => {
  // Get Stripe payment link based on appraisal type
  const paymentLinks = {
    regular: 'https://buy.stripe.com/9AQaIKd925jC6Ag6pQ',
    insurance: 'https://buy.stripe.com/7sI2ce2uo13m4s87tW',
    tax: 'https://buy.stripe.com/6oE2cefha3bu1fW15z'
  };

  const paymentLink = paymentLinks[appraisalType];
  if (!paymentLink) throw new Error('Invalid appraisal type');

  // Add promo code and client reference parameters
  const params = new URLSearchParams({
    prefilled_promo_code: 'FRIENDS20',
    client_reference_id: `bulk_${sessionId}`
  });

  return `${paymentLink}?${params.toString()}`;
}

export const updateItemDescription = async (
  sessionId: string,
  itemId: string,
  description: string,
  imageId: string
): Promise<void> => {
  if (!sessionId) {
    const error = 'Session ID is required';
    console.error('Description update error:', error);
    throw new Error(error);
  }

  if (!itemId || !imageId) {
    const error = 'Item ID or Image ID is missing';
    console.error('Description update error:', error);
    throw new Error(error);
  }

  const requestData = { 
    session_id: sessionId,
    item_id: itemId,
    description,
    image_id: imageId
  };

  console.log('Sending description update request:', {
    url: `${API_URL}/api/bulk-appraisals/description`,
    data: requestData
  });

  const response = await fetch(`${API_URL}/api/bulk-appraisals/description`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Description update failed:', {
      request: requestData,
      status: response.status,
      statusText: response.statusText,
      error: errorText
    });
    throw new Error(`Failed to update item description: ${errorText}`);
  } else {
    console.log('Description update successful:', {
      request: requestData,
      status: response.status
    });
  }
};