import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay';
import Report from './components/Report';
import AnalyzePage from './pages/AnalyzePage';
import { useImageAnalysis } from './hooks/useImageAnalysis';

export default function Screener() {
  const {
    uploadImage,
    loading,
    isUploading,
    customerImage,
    similarImages,
    analysis,
    enhancedAnalysis,
    offerText,
    isAnalyzing,
    isEnhancing,
    generateAnalysis,
    enhanceAnalysis
  } = useImageAnalysis();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50 pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
              <ImageUploader 
                onUpload={uploadImage}
                isUploading={isUploading}
                customerImage={customerImage}
              />
              {similarImages && similarImages.length > 0 && (
                <ResultsDisplay 
                  similarImages={similarImages}
                  analysis={analysis}
                  enhancedAnalysis={enhancedAnalysis}
                  offerText={offerText}
                  onGenerateAnalysis={generateAnalysis}
                  onEnhanceAnalysis={enhanceAnalysis}
                  isAnalyzing={isAnalyzing}
                  isEnhancing={isEnhancing}
                />
              )}
            </div>
          </div>
        } />
        <Route path="/report/:sessionId" element={<Report />} />
        <Route path="/analyze/:sessionId" element={<AnalyzePage />} />
      </Routes>
    </>
  );
}