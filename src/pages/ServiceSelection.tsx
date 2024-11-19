import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ServiceDetails } from '@/components/ServiceDetails';
import { Star, Info, ArrowRight } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface ServiceDetails {
  features: Feature[];
  exampleReportUrl: string;
}

type ServiceType = 'regular' | 'insurance' | 'tax';

const services: Record<ServiceType, ServiceDetails> = {
  regular: {
    features: [
      {
        title: 'Expert Analysis',
        description: 'Our team of accredited experts brings extensive knowledge to evaluate your items meticulously.',
      },
      {
        title: 'Detailed Market Valuation Report',
        description: 'Comprehensive report explaining value factors and market pricing.',
      },
      {
        title: 'Historical Significance',
        description: 'Deep dive into item history and provenance, providing rich contextual narrative.',
      },
      {
        title: 'Verifiable Documentation',
        description: 'Authenticated documentation supporting item value and authenticity.',
      },
    ],
    exampleReportUrl: 'https://drive.google.com/file/d/1n-JCAEZJaZDOzQ3mF4GRPmatRKrUsoUn/',
  },
  insurance: {
    features: [
      {
        title: 'Comprehensive Coverage Analysis',
        description: 'Detailed evaluation ensuring full insurance coverage and current market value.',
      },
      {
        title: 'Certified Insurance Documentation',
        description: 'Official documents recognized by insurance providers.',
      },
      {
        title: 'Risk Assessment',
        description: 'Expert assessment of potential risks and protective measures.',
      },
      {
        title: 'Support for Claim Processing',
        description: 'Professional guidance through insurance claim procedures.',
      },
    ],
    exampleReportUrl: 'https://drive.google.com/file/d/1n-JCAEZJaZDOzQ3mF4GRPmatRKrUsoUn/',
  },
  tax: {
    features: [
      {
        title: 'IRS Form 8283 Preparation',
        description: 'Complete preparation of required tax forms for charitable contributions.',
      },
      {
        title: 'Qualified Appraisal Reports',
        description: 'Comprehensive reports meeting IRS requirements for tax deductions.',
      },
      {
        title: 'Expert Art Evaluation',
        description: 'Meticulous evaluation of artwork considering all value factors.',
      },
      {
        title: 'Assistance with Documentation',
        description: 'Support in preparing all necessary donation documentation.',
      },
    ],
    exampleReportUrl: 'https://drive.google.com/file/d/1n-JCAEZJaZDOzQ3mF4GRPmatRKrUsoUn/',
  },
};

const serviceLabels = {
  regular: 'Regular Appraisal',
  insurance: 'Insurance Appraisal',
  tax: 'Tax Appraisal'
};

const serviceDescriptions = {
  regular: 'Standard valuation for collectors and sellers',
  insurance: 'Detailed reports for insurance coverage',
  tax: 'IRS-compliant appraisals for donations'
};

export default function ServiceSelection() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    setShowCheckout(service === 'regular');
    setSelectedDate(null);
  };

  const handleDateSelect = (date: string, price: number) => {
    setSelectedDate(date);
    if (selectedService !== 'regular') {
      setShowCheckout(true);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Compact Social Proof for Mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-600">4.9/5 from 100+ reviews</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-4">
            Select Your Appraisal Service
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the service that best fits your needs
          </p>
        </div>

        {/* Enhanced Service Selection Cards */}
        <div className="space-y-4 mb-8">
          {(Object.keys(services) as ServiceType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleServiceSelect(type)}
              className={cn(
                "w-full text-left p-4 rounded-xl transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                "active:scale-[0.99] touch-action-manipulation",
                selectedService === type
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-white text-gray-900 hover:bg-gray-50 border border-gray-200"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{serviceLabels[type]}</h3>
                  <p className={cn(
                    "text-sm mt-1",
                    selectedService === type ? "text-blue-100" : "text-gray-600"
                  )}>
                    {serviceDescriptions[type]}
                  </p>
                </div>
                <ArrowRight className={cn(
                  "h-5 w-5 transition-transform",
                  selectedService === type ? "transform rotate-90" : ""
                )} />
              </div>

              {/* Quick Info Button */}
              <button 
                className={cn(
                  "mt-2 inline-flex items-center text-sm gap-1",
                  selectedService === type ? "text-blue-100" : "text-blue-600"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  // Show info modal/tooltip
                }}
              >
                <Info className="h-4 w-4" />
                Learn more
              </button>
            </button>
          ))}
        </div>

        {/* Service Details Section */}
        {selectedService && (
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 animate-in fade-in duration-200">
            <ServiceDetails
              type={selectedService}
              features={services[selectedService].features}
              exampleReportUrl={services[selectedService].exampleReportUrl}
              showCheckout={showCheckout}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-sm">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="font-bold text-blue-600">50K+</div>
            <div className="text-gray-600">Appraisals</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="font-bold text-blue-600">15+</div>
            <div className="text-gray-600">Experts</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm sm:col-span-1 col-span-2">
            <div className="font-bold text-blue-600">30+</div>
            <div className="text-gray-600">Countries</div>
          </div>
        </div>
      </div>
    </div>
  );
}