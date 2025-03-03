import React, { useState } from 'react';
import { FileText, X } from 'lucide-react';

const PDFViewer = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 bg-black/75 p-4 flex items-center justify-center">
    <div className="relative w-full h-[90vh] max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Close PDF viewer"
      >
        <X className="h-6 w-6" />
      </button>
      <iframe
        src="https://drive.google.com/file/d/1n-JCAEZJaZDOzQ3mF4GRPmatRKrUsoUn/preview"
        className="w-full h-full"
        allow="autoplay"
      />
    </div>
  </div>
);

export default function SuccessStories() {
  const [showPDF, setShowPDF] = useState(false);

  const handleViewReport = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPDF(true);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Content Column */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Success Stories: A Glimpse into Real Appraisals
            </h2>
            
            {/* Featured Success Story */}
            <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Tinus de Jongh Painting Discovery
              </h3>
              <p className="mt-4 text-gray-600">
                Among Mark's cherished heirlooms was a striking original painting. With Appraisily's expert help, the artist was identified as 'Tinus de Jongh (Dutch, 1885–1942)', and the artwork was appraised between $1,500 and $2,000. Ultimately, it was sold for $1,800.
              </p>
              <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-gray-600">
                "Thanks to this incredible service. I had no idea the painting held such value. The $20 online art appraisal report was an absolute bargain, and I'll definitely use Appraisily again."
              </blockquote>
              <p className="mt-4 text-sm font-medium text-gray-900">- Mark S.</p>
              
              {/* Sample Report Link */}
              <button
                onClick={handleViewReport}
                className="mt-8 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <FileText className="h-5 w-5" />
                <span className="text-sm font-semibold">See what's included in our detailed reports</span>
              </button>
            </div>
          </div>

          {/* Sample Report Column */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200">
              <img
                src="https://ik.imagekit.io/appraisily/WebPage/report.jpg"
                alt="Sample appraisal report preview"
                className="h-full w-full object-cover rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-lg font-medium text-white">
                  Example of a professional appraisal report from our service
                </p>
                <button
                  onClick={handleViewReport}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 hover:bg-white transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  View Sample Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPDF && <PDFViewer onClose={() => setShowPDF(false)} />}
    </div>
  );
}