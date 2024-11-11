import { useState } from 'react';

const API_URL = 'https://appraisals-web-services-backend-856401495068.us-central1.run.app';

interface Report {
  imageUrl: string;
  analysis: string;
  enhancedAnalysis: string;
  offerText: string;
  similarImages: string[];
}

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [customerImage, setCustomerImage] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [enhancedAnalysis, setEnhancedAnalysis] = useState<string | null>(null);
  const [offerText, setOfferText] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/upload-image`, {
        method: 'POST',
        body: formData,
      });

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
      setIsUploading(false);
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
        body: JSON.stringify({ sessionId: 'current' }),
      });

      const data: AnalysisResponse = await response.json();

      if (!data.success) {
        throw new Error('Failed to generate analysis');
      }

      setAnalysis(data.analysis);
      return data.analysis;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const enhanceAnalysis = async () => {
    setIsEnhancing(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/enhance-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          sessionId: 'current',
          analysisText: analysis 
        }),
      });

      const data: EnhancedAnalysisResponse = await response.json();

      if (!data.success) {
        throw new Error('Failed to enhance analysis');
      }

      setEnhancedAnalysis(data.enhancedAnalysis);
      setOfferText(data.offerText);
      return {
        enhancedAnalysis: data.enhancedAnalysis,
        offerText: data.offerText
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsEnhancing(false);
    }
  };

  return {
    uploadImage,
    generateAnalysis,
    enhanceAnalysis,
    loading,
    error,
    report,
    isUploading,
    isAnalyzing,
    isEnhancing,
    customerImage,
    similarImages,
    analysis,
    enhancedAnalysis,
    offerText
  };
}