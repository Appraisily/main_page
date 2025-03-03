import React, { useState } from 'react';
import { FileText, X, ArrowRight, Star } from 'lucide-react';

interface PDFViewerProps {
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/75 p-4 flex items-center justify-center animate-fade-in">
    <div className="relative w-full h-[90vh] max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
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

  return (
    <div className="relative bg-gray-50 py-24 sm:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
      
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            {/* Content Column */}
            <div>
              <div className="relative">
                <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-primary/5 to-blue-500/5 blur-lg rounded-3xl" />
                <div className="relative">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Success Stories: A Glimpse into Real Appraisals
                  </h2>
                  
                  {/* Featured Success Story */}
                  <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex -space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-600">Verified Review</span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900">
                      Tinus de Jongh Painting Discovery
                    </h3>
                    
                    <p className="mt-4 text-gray-600">
                      Among Mark's cherished heirlooms was a striking original painting. With Appraisily's expert help, the artist was identified as 'Tinus de Jongh (Dutch, 1885–1942)', and the artwork was appraised between $1,500 and $2,000. Ultimately, it was sold for $1,800.
                    </p>
                    
                    <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-gray-600">
                      "Thanks to this incredible service. I had no idea the painting held such value. The $20 online art appraisal report was an absolute bargain, and I'll definitely use Appraisily again."
                    </blockquote>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">- Mark S.</p>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        Verified Purchase
                      </span>
                    </div>
                    
                    {/* Sample Report Link */}
                    <button
                      onClick={() => setShowPDF(true)}
                      className="mt-8 group inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <FileText className="h-5 w-5" />
                      <span className="text-sm font-semibold group-hover:underline">
                        See what's included in our detailed reports
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Report Column */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-3xl blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200">
                <img
                  src="https://ik.imagekit.io/appraisily/WebPage/report.jpg?updatedAt=1731365708557"
                  alt="Sample appraisal report preview"
                  className="h-full w-full object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-2xl" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-lg font-medium text-white">
                    Example of a professional appraisal report from our service
                  </p>
                  <button
                    onClick={() => setShowPDF(true)}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 hover:bg-white transition-colors group"
                  >
                    <FileText className="h-4 w-4" />
                    View Sample Report
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPDF && <PDFViewer onClose={() => setShowPDF(false)} />}
    </div>
  );
}