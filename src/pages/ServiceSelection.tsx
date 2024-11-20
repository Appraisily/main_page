import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ServiceDetails } from '@/components/ServiceDetails';
import { Star, Info, ArrowRight, Shield, Clock, CreditCard } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Enhanced Social Proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 w-full sm:w-auto border border-white/20 shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-medium">4.9/5 from 100+ reviews</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">Certified Experts</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
            Select Your Appraisal Service
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose the service that best fits your needs. Each option includes expert analysis and detailed documentation.
          </p>
        </div>

        {/* Enhanced Service Selection Cards */}
        <div className="space-y-4 mb-12">
          {(Object.keys(services) as ServiceType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleServiceSelect(type)}
              className={cn(
                "w-full text-left p-6 rounded-xl transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                "transform hover:scale-[1.02] active:scale-[0.99]",
                selectedService === type
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20 border-2 border-blue-400"
                  : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xl mb-1">{serviceLabels[type]}</h3>
                  <p className={cn(
                    "text-base",
                    selectedService === type ? "text-blue-100" : "text-gray-300"
                  )}>
                    {serviceDescriptions[type]}
                  </p>
                </div>
                <ArrowRight className={cn(
                  "h-6 w-6 transition-transform duration-300",
                  selectedService === type ? "rotate-90" : ""
                )} />
              </div>

              {/* Quick Info Button */}
              <button 
                className={cn(
                  "mt-4 inline-flex items-center text-sm gap-2 px-3 py-1 rounded-lg",
                  selectedService === type 
                    ? "bg-blue-500/30 text-white hover:bg-blue-500/40" 
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
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
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 animate-in fade-in duration-300 border border-white/20 shadow-xl">
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

        {/* Enhanced Trust Indicators */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-blue-400 mb-2">50K+</div>
            <div className="text-gray-300">Appraisals</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-blue-400 mb-2">15+</div>
            <div className="text-gray-300">Experts</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300 sm:col-span-1 col-span-2">
            <div className="text-2xl font-bold text-blue-400 mb-2">30+</div>
            <div className="text-gray-300">Countries</div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="text-gray-400 text-sm">Secure Payment Methods</div>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
              <CreditCard className="h-6 w-6 text-gray-300" />
            </div>
            <img 
              src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" 
              alt="PayPal" 
              className="h-6 opacity-80" 
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
              alt="Apple Pay" 
              className="h-6 opacity-80" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}