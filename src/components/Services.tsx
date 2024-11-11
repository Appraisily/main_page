import React, { useState } from 'react';
import { Camera, FileCheck, Scale, Shield, Search, DollarSign, History, FileText, Landmark, Receipt, FileSpreadsheet, Award, X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

function VideoModal({ isOpen, onClose, videoId, title }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="relative w-full max-w-4xl rounded-lg bg-black shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="absolute -right-4 -top-4 z-10">
            <button
              type="button"
              className="rounded-full bg-white p-2 text-gray-900 shadow-md hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    videoId: string;
    title: string;
  }>({
    isOpen: false,
    videoId: '',
    title: ''
  });

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
            <div key={service.title} className="flex flex-col border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-200">
              <div className="mb-6">
                <service.icon className="h-8 w-8 text-[#007bff]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
              <p className="mt-4 text-gray-600 flex-grow">{service.description}</p>
              <ul className="mt-6 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2">
                    <feature.icon className="h-5 w-5 text-[#007bff] mt-1" />
                    <span className="text-gray-700">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setVideoModal({
                  isOpen: true,
                  videoId: service.action.videoId,
                  title: service.action.title
                })}
                className="mt-8 rounded-md bg-[#007bff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] flex items-center justify-center gap-2"
              >
                <Play className="h-4 w-4" />
                Watch Service Overview
              </button>
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
}