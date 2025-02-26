import React from 'react';
import { Search, DollarSign, FileText } from 'lucide-react';

export default function ProcessSteps() {
  const steps = [
    {
      icon: Search,
      title: 'Comprehensive Identification',
      description: "Our experienced antiquarians delve deep into your item's history, meticulously identifying its key characteristics, maker, and origin. We strive to uncover its narrative and provenance, fostering a greater understanding of your piece's unique journey."
    },
    {
      icon: DollarSign,
      title: 'Accurate Value Estimation',
      description: 'Relying on our expert understanding of the condition and current market trends, we offer precise appraisals of your antiques. We leverage detailed data from previous auctions, retail sales, and relevant listings, ensuring your item\'s evaluation is grounded in the most current market landscape.'
    },
    {
      icon: FileText,
      title: 'Detailed Report',
      description: 'Once our analysis is complete, we provide an accessible online link to a comprehensive report detailing our findings. Share it with potential buyers, or keep it for your records. For your convenience, we also deliver this thorough art appraisal report as a downloadable PDF.'
    }
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Our Three-Step Process
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From Identification to Detailed Report
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={step.title}
                className="relative flex flex-col items-start"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white mb-6">
                  <IconComponent className="w-6 h-6" />
                </div>
                
                {/* Step number */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{index + 1}</span>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(100%_-_2rem)] w-[calc(100%_-_2rem)] h-px bg-blue-200" />
                )}

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}