import { useState } from 'react';

const API_URL = 'https://appraisals-web-services-backend-856401495068.us-central1.run.app';

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

export function useImageAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/upload-image`, {
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

      // Generate initial analysis
      const analysisResponse = await fetch(`${API_URL}/generate-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: data.sessionId }),
      });

      if (!analysisResponse.ok) {
        throw new Error('Failed to generate analysis');
      }

      const analysisData: AnalysisResponse = await analysisResponse.json();

      if (!analysisData.success) {
        throw new Error('Analysis generation failed');
      }

      // Enhance the analysis
      const enhanceResponse = await fetch(`${API_URL}/enhance-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: data.sessionId,
          analysisText: analysisData.analysis,
        }),
      });

      if (!enhanceResponse.ok) {
        throw new Error('Failed to enhance analysis');
      }

      const enhancedData: EnhancedAnalysisResponse = await enhanceResponse.json();

      if (!enhancedData.success) {
        throw new Error('Analysis enhancement failed');
      }

      return {
        imageUrl: data.customerImageUrl,
        similarImages: data.similarImageUrls,
        analysis: analysisData.analysis,
        enhancedAnalysis: enhancedData.enhancedAnalysis,
        offerText: enhancedData.offerText,
        sessionId: data.sessionId,
      };
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