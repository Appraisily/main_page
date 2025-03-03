import React, { useState } from 'react';
import { Ruler, TrendingUp, Award, Download, FileText, X, ExternalLink } from 'lucide-react';

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

const getImageUrl = (url: string) => {
  const isMobile = window.innerWidth <= 768;
  const width = isMobile ? 400 : 800;
  const height = Math.round(width * 1.25); // Maintain aspect ratio
  const quality = isMobile ? 60 : 70;
  return `${url}?tr=w-${width},h-${height},q-${quality}`;
};

const features = [
  {
    icon: Ruler,
    title: "Detailed Item Description",
    description: "Complete physical description, measurements, and condition assessment"
  },
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Current market trends, comparable sales, and value justification"
  },
  {
    icon: Award,
    title: "Professional Certification",
    description: "USPAP-compliant certification and appraiser credentials"
  },
  {
    icon: FileText,
    title: "Comprehensive Documentation",
    description: "High-resolution photos and detailed provenance research"
  }
];

export default function SampleReport() {
  const [showPDF, setShowPDF] = useState(false);

  const handleViewReport = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPDF(true);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Professional Appraisal Reports
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive appraisal reports provide detailed analysis, market comparisons, and thorough documentation of your valuable pieces.
          </p>
        </div>

        <div className="mt-16">
          {/* Mobile Layout */}
          <div className="block lg:hidden">
            <div className="space-y-6">
              {features.map((feature) => (
                <div 
                  key={feature.title}
                  className="bg-gray-50 rounded-xl p-6 flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <a
                href="#"
                onClick={handleViewReport}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
              >
                <Download className="h-5 w-5" />
                View Sample Report
              </a>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-8">
                  <a
                    href="#"
                    onClick={handleViewReport}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
                  >
                    <Download className="h-5 w-5" />
                    View Sample Report
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200">
                  <img
                    src={getImageUrl("https://ik.imagekit.io/appraisily/WebPage/report.jpg")}
                    alt="Sample appraisal report preview"
                    className="h-full w-full object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPDF && <PDFViewer onClose={() => setShowPDF(false)} />}
    </div>
  );
}