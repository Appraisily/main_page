import React, { useState } from 'react';
import { Search, DollarSign, History, FileText, Clock, Camera, Award, ArrowRight, CheckCircle2, X } from 'lucide-react';

// Modal component for the video
function VideoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-gray-900/75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
          <div className="absolute right-4 top-4 z-10">
            <button
              type="button"
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 backdrop-blur-sm"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1"
              title="Regular Appraisal Process"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegularAppraisal() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // ... (keep existing features, processSteps, and benefits arrays)

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Regular Appraisal Service
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Comprehensive evaluation of your art and antique pieces with detailed market analysis and documentation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#007bff] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] transition-all duration-200"
              >
                Start Appraisal Now
              </a>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="text-sm font-semibold leading-6 text-white hover:text-gray-300 transition-colors"
              >
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#007bff] to-[#0056b3] opacity-30" />
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
      />

      {/* Rest of the component remains the same */}
      {/* ... */}
    </div>
  );
}