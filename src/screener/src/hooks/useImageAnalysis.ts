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
  const [customerImage, setCustomerImage] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [enhancedAnalysis, setEnhancedAnalysis] = useState<string | null>(null);
  const [offerText, setOfferText] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

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

      setCustomerImage(data.customerImageUrl);
      setSimilarImages(data.similarImageUrls);

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
    }
  };

  const generateAnalysis = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/generate-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerImage }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate analysis');
      }

      const data: AnalysisResponse = await response.json();
      
      if (!data.success) {
        throw new Error('Analysis generation failed');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const enhanceAnalysis = async () => {
    if (!analysis) return;

    setIsEnhancing(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/enhance-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ analysis }),
      });

      if (!response.ok) {
        throw new Error('Failed to enhance analysis');
      }

      const data: EnhancedAnalysisResponse = await response.json();
      
      if (!data.success) {
        throw new Error('Analysis enhancement failed');
      }

      setEnhancedAnalysis(data.enhancedAnalysis);
      setOfferText(data.offerText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsEnhancing(false);
    }
  };

  return {
    uploadImage,
    generateAnalysis,
    enhanceAnalysis,
    loading,
    isAnalyzing,
    isEnhancing,
    error,
    customerImage,
    similarImages,
    analysis,
    enhancedAnalysis,
    offerText
  };
}