import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ServiceDetails } from '@/components/ServiceDetails';
import { Star } from 'lucide-react';

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
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
        {/* Social Proof Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-white.svg"
              alt="Trustpilot"
              className="h-6 sm:h-7"
            />
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current text-[#00b67a]" />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-600">4.9/5 (2.5k+ reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/24px-Google_%22G%22_Logo.svg.png"
              alt="Google"
              className="h-6"
            />
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current text-[#fbbc05]" />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-600">4.8/5 (1.8k+ reviews)</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            Select Your Appraisal Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the service that best fits your needs. Each option includes comprehensive evaluation by our certified experts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-3xl mx-auto">
          {(Object.keys(services) as ServiceType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleServiceSelect(type)}
              className={cn(
                "flex-1 py-6 px-4 text-lg font-medium rounded-xl border-2 transition-all duration-200 outline-none focus:outline-none shadow-sm hover:shadow-md",
                selectedService === type
                  ? "border-blue-600 bg-blue-600 text-white shadow-blue-600/20"
                  : "border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 bg-white"
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Appraisal
            </button>
          ))}
        </div>

        {selectedService && (
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
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

        {/* Additional Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">Successful Appraisals</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Certified Experts</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-2">30+</div>
            <div className="text-gray-600">Countries Served</div>
          </div>
        </div>
      </div>
    </div>
  );
}