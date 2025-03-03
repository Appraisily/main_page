import React, { useState, useRef, useEffect } from 'react';
import { Scale, Shield, FileCheck, Search, DollarSign, History, FileText, Clock, Camera, Award, X, Play, Receipt, FileSpreadsheet, Landmark } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

const useVideoState = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const minimize = () => {
    if (videoRef.current) {
      // Pause video using postMessage
      videoRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
    setIsMinimized(true);
  };

  const maximize = () => {
    setIsMinimized(false);
    setIsClosing(false);
  };

  const close = () => {
    setIsClosing(true);
    if (videoRef.current) {
      videoRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  };

  return { isMinimized, minimize, maximize, close, isClosing, videoRef };
};

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoId, title }) => {
  if (!isOpen) return null;

  const { isMinimized, minimize, maximize, close, isClosing, videoRef } = useVideoState();

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(onClose, 300); // Wait for fade out animation
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`} 
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      <div 
        className={`flex min-h-screen items-center justify-center p-4 text-center sm:p-0 ${
          isMinimized ? 'items-end pb-20' : ''
        }`}
      >
        <div 
          className="fixed inset-0 bg-gray-900/75 transition-opacity" 
          aria-hidden="true"
          onClick={minimize}
        ></div>

        <div 
          className={`relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 sm:my-8 sm:w-full ${
            isMinimized ? 'w-64 h-36 fixed bottom-4 right-4' : 'sm:max-w-4xl'
          }`}
        >
          <div className="absolute right-4 top-4 z-10">
            <button
              type="button"
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 backdrop-blur-sm"
              onClick={isMinimized ? close : minimize}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div 
            className={`aspect-video ${isMinimized ? 'cursor-pointer' : ''}`}
            onClick={isMinimized ? maximize : undefined}
          >
            <iframe
              ref={videoRef}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

const services = [
  {
    title: 'Regular Appraisal',
    description: 'Comprehensive evaluation of your art or antique pieces with detailed market analysis.',
    icon: Scale,
    features: [
      { text: 'Expert Analysis', icon: Search },
      { text: 'Market Valuation', icon: DollarSign },
      { text: 'Historical Research', icon: History },
      { text: 'Documentation', icon: FileText }
    ],
    action: {
      type: 'video',
      videoId: 'mHxD5DzRKM8',
      title: 'Regular Appraisal Process'
    }
  },
  {
    title: 'Insurance Appraisal',
    description: 'Detailed reports specifically designed for insurance purposes and coverage.',
    icon: Shield,
    features: [
      { text: 'Replacement Value', icon: Receipt },
      { text: 'Risk Assessment', icon: FileSpreadsheet },
      { text: 'Digital Documentation', icon: FileCheck },
      { text: 'Insurance Standards', icon: Award }
    ],
    action: {
      type: 'video',
      videoId: 'OM_zTNac890',
      title: 'Insurance Appraisal Process'
    }
  },
  {
    title: 'Tax Deduction Appraisal',
    description: 'IRS-compliant appraisals for charitable donations and tax purposes.',
    icon: FileCheck,
    features: [
      { text: 'IRS Compliance', icon: Landmark },
      { text: 'Fair Market Value', icon: DollarSign },
      { text: 'Detailed Documentation', icon: FileText },
      { text: 'Expert Testimony', icon: Award }
    ],
    action: {
      type: 'video',
      videoId: 'polLX9YL6uo',
      title: 'Tax Deduction Appraisal Process'
    }
  }
];

const Services: React.FC = () => {
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    videoId: string;
    title: string;
  }>({
    isOpen: false,
    videoId: '',
    title: ''
  });

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Appraisal Service
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Select the service that best suits your needs. Each appraisal is conducted by certified experts using advanced analysis tools.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {services.map((service) => (
            <div 
              key={service.title} 
              className="flex flex-col border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="mb-6">
                <service.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
              <p className="mt-4 text-gray-600 flex-grow">{service.description}</p>
              <ul className="mt-6 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2">
                    <feature.icon className="h-5 w-5 text-primary mt-1" />
                    <span className="text-gray-700">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={() => setVideoModal({
                    isOpen: true,
                    videoId: service.action.videoId,
                    title: service.action.title
                  })}
                  className="group rounded-md bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Play className="h-4 w-4" />
                    Watch Service Overview
                  </span>
                </button>
                <a
                  href="https://appraisily.com/start/"
                  className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 text-center"
                >
                  Select This Service
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ ...videoModal, isOpen: false })}
        videoId={videoModal.videoId}
        title={videoModal.title}
      />
    </div>
  );
};

export default Services;