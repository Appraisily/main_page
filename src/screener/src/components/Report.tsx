import React from 'react';
import { useParams } from 'react-router-dom';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import { Loader2, Image as ImageIcon, ArrowRight } from 'lucide-react';

interface ReportData {
  imageUrl: string;
  analysis: string;
  enhancedAnalysis: string;
  offerText: string;
  similarImages: string[];
}

export default function Report() {
  const { sessionId } = useParams();
  const { loading, customerImage, similarImages, analysis, enhancedAnalysis, offerText } = useImageAnalysis();

  const reportData: ReportData = {
    imageUrl: customerImage || '',
    analysis,
    enhancedAnalysis,
    offerText,
    similarImages
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
            <p className="text-lg text-gray-600">Analyzing your artwork...</p>
            <p className="text-sm text-gray-500 mt-2">This may take up to 60 seconds</p>
          </div>
        </div>
      </div>
    );
  }

  if (!reportData.imageUrl) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-24">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">Report not found or an error occurred.</p>
            <p className="text-sm text-gray-500">Please try uploading your image again.</p>
            <a
              href="/screener"
              className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Image Preview */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <img
                src={reportData.imageUrl}
                alt="Uploaded artwork"
                className="rounded-lg w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Initial Analysis</h1>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-600 whitespace-pre-wrap">{reportData.analysis}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Works */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportData.similarImages.map((imageUrl, index) => (
              <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={imageUrl}
                  alt={`Similar artwork ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Analysis */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Analysis</h2>
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 whitespace-pre-wrap">{reportData.enhancedAnalysis}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-50 rounded-2xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get a Professional Appraisal
          </h2>
          <div className="prose prose-blue max-w-2xl mx-auto mb-6">
            <p className="text-gray-600 whitespace-pre-wrap">{reportData.offerText}</p>
          </div>
          <a
            href="https://services.appraisily.com"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Start Professional Appraisal <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}