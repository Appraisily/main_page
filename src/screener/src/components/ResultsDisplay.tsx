import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ResultsDisplayProps {
  similarImages: string[];
  analysis: string;
  enhancedAnalysis: string;
  offerText: string;
  onGenerateAnalysis: () => void;
  onEnhanceAnalysis: () => void;
  isAnalyzing: boolean;
  isEnhancing: boolean;
}

export default function ResultsDisplay({
  similarImages,
  analysis,
  enhancedAnalysis,
  offerText,
  onGenerateAnalysis,
  onEnhanceAnalysis,
  isAnalyzing,
  isEnhancing,
}: ResultsDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Similar Works */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
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

      {/* Analysis */}
      {analysis && (
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis</h2>
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 whitespace-pre-wrap">{analysis}</p>
          </div>
        </div>
      )}

      {/* Enhanced Analysis */}
      {enhancedAnalysis && (
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Enhanced Analysis</h2>
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 whitespace-pre-wrap">{enhancedAnalysis}</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-blue-50 rounded-2xl shadow-sm p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Get a Professional Appraisal
        </h2>
        <div className="prose prose-blue max-w-2xl mx-auto mb-6">
          <p className="text-gray-600 whitespace-pre-wrap">{offerText}</p>
        </div>
        <a
          href="/start"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Start Professional Appraisal <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  );
}