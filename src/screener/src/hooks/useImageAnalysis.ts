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

export function useImageAnalysis() {
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [customerImage, setCustomerImage] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [enhancedAnalysis, setEnhancedAnalysis] = useState<string>('');
  const [offerText, setOfferText] = useState<string>('');

  const uploadImage = async (file: File) => {
    setLoading(true);
    setIsUploading(true);

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

      setCustomerImage(data.customerImageUrl);
      setSimilarImages(data.similarImageUrls);

      return {
        sessionId: data.sessionId,
        customerImageUrl: data.customerImageUrl,
        similarImageUrls: data.similarImageUrls
      };
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
      setIsUploading(false);
    }
  };

  const generateAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('https://appraisals-web-services-backend-856401495068.us-central1.run.app/generate-analysis', {
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
    } finally {
      setIsAnalyzing(false);
    }
  };

  const enhanceAnalysis = async () => {
    setIsEnhancing(true);
    try {
      const response = await fetch('https://appraisals-web-services-backend-856401495068.us-central1.run.app/enhance-analysis', {
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
    } finally {
      setIsEnhancing(false);
    }
  };

  return {
    uploadImage,
    generateAnalysis,
    enhanceAnalysis,
    loading,
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