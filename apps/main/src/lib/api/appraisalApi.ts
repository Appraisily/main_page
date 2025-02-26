import { AppraisalRequest, AppraisalResponse } from '../types/appraisal';

const API_URL = 'https://payment-processor-856401495068.us-central1.run.app';

export const submitAppraisal = async (
  data: AppraisalRequest,
  onProgress?: (progress: number) => void
): Promise<AppraisalResponse> => {
  const formData = new FormData();
  
  // Add metadata
  formData.append('session_id', data.session_id);
  formData.append('customer_email', data.customer_email);
  if (data.customer_name) formData.append('customer_name', data.customer_name);
  if (data.description) formData.append('description', data.description);

  // Add images
  formData.append('main', data.images.main);
  if (data.images.signature) formData.append('signature', data.images.signature);
  if (data.images.age) formData.append('age', data.images.age);

  try {
    const response = await fetch(`${API_URL}/api/appraisals`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Upload failed');
  }
};