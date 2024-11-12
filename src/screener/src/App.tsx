import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay';
import { useImageAnalysis } from './hooks/useImageAnalysis';
import Report from './components/Report';

export default function Screener() {
  const {
    uploadImage,
    loading,
    error,
    isUploading,
    report
  } = useImageAnalysis();

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
            <ImageUploader 
              onUpload={uploadImage}
              isUploading={isUploading}
              error={error}
            />
            {report && (
              <ResultsDisplay 
                report={report}
              />
            )}
          </div>
        </div>
      } />
      <Route path="/report/:sessionId" element={<Report />} />
    </Routes>
  );
}