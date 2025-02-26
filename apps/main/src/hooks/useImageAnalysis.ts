import { useState } from 'react';

const API_URL = 'https://appraisals-web-services-backend-856401495068.us-central1.run.app/upload-temp';

interface TempUploadResponse {
  success: boolean;
  sessionId: string;
  tempUrl: string;
  message?: string;
}

export function useImageAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data: TempUploadResponse = await response.json();

      if (!data.success) {
        throw new Error('Upload failed');
      }
      
      // Redirect to screener domain
      window.location.href = `https://screener.appraisily.com/?sessionId=${data.sessionId}`;
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadImage,
    loading,
    error,
  };
}