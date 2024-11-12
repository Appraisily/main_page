import { useState } from 'react';

interface UploadResponse {
  success: boolean;
  customerImageUrl: string;
  similarImageUrls: string[];
  sessionId: string;
}

interface AnalysisResponse {
  success: boolean;
  analysis: string;
}

interface EnhancedAnalysisResponse {
  success: boolean;
  enhancedAnalysis: string;
  offerText: string;
}

interface Report {
  imageUrl: string;
  analysis: string;
  enhancedAnalysis: string;
  offerText: string;
  similarImages: string[];
}

export function useImageAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);

  const uploadImage = async (file: File) => {
    setLoading(true);
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('https://appraisals-web-services-backend-856401495068.us-central1.run.app/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data: UploadResponse = await response.json();
      
      if (!data.success) {
        throw new Error('Upload failed');
      }

      return {
        sessionId: data.sessionId,
        customerImageUrl: data.customerImageUrl,
        similarImageUrls: data.similarImageUrls
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    loading,
    error,
    isUploading,
    report
  };
}