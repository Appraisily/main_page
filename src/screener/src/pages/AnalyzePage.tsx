import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import ResultsDisplay from '../components/ResultsDisplay';

export default function AnalyzePage() {
  const { sessionId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const {
    generateAnalysis,
    enhanceAnalysis,
    similarImages,
    analysis,
    enhancedAnalysis,
    offerText,
    isAnalyzing,
    isEnhancing
  } = useImageAnalysis();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Fetch the temporary image URL using the session ID
        const response = await fetch(`https://appraisals-web-services-backend-856401495068.us-central1.run.app/get-temp-image?sessionId=${sessionId}`);
        const data = await response.json();
        
        if (data.success) {
          setImageUrl(data.tempUrl);
          // Automatically start the analysis process
          await generateAnalysis(sessionId);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      fetchImage();
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading your artwork...</p>
        </div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Image not found. Please try uploading again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <img
            src={imageUrl}
            alt="Uploaded artwork"
            className="max-w-full h-auto rounded-lg mx-auto"
          />
        </div>

        {similarImages && similarImages.length > 0 && (
          <ResultsDisplay 
            similarImages={similarImages}
            analysis={analysis}
            enhancedAnalysis={enhancedAnalysis}
            offerText={offerText}
            onGenerateAnalysis={() => generateAnalysis(sessionId)}
            onEnhanceAnalysis={() => enhanceAnalysis(sessionId)}
            isAnalyzing={isAnalyzing}
            isEnhancing={isEnhancing}
          />
        )}
      </div>
    </div>
  );
}