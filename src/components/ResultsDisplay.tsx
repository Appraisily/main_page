import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ResultsDisplayProps {
  imageUrl: string;
  similarImages: string[];
  analysis: string;
  enhancedAnalysis: string;
  offerText: string;
}

export default function ResultsDisplay({
  imageUrl,
  similarImages,
  analysis,
  enhancedAnalysis,
  offerText,
}: ResultsDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Image Preview */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <img
              src={imageUrl}
              alt="Uploaded artwork"
              className="rounded-lg w-full object-cover"
            />
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Initial Analysis</h1>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-600 whitespace-pre-wrap">{analysis}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Works */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarImages.map((imageUrl, index) => (
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
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Analysis</h2>
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-600 whitespace-pre-wrap">{enhancedAnalysis}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-50 rounded-2xl shadow-sm p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Get a Professional Appraisal
        </h2>
        <div className="prose prose-blue max-w-2xl mx-auto mb-6">
          <p className="text-gray-600 whitespace-pre-wrap">{offerText}</p>
        </div>
        <a
          href="https://services.appraisily.com"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Start Professional Appraisal <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  );
}