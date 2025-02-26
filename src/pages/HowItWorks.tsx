import React from 'react';
import { Upload, Search, TrendingUp, FileText, Clock, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Submit Your Artwork',
      timing: 'Immediate',
      description: 'Upload high-quality images and documentation of your items.'
    },
    {
      icon: Search,
      title: 'Image Analysis',
      timing: 'Minutes',
      description: 'Our experts analyze your items using advanced AI-driven tools.'
    },
    {
      icon: TrendingUp,
      title: 'Market Valuation',
      timing: '12 Hours',
      description: 'We evaluate based on current market trends and historical significance.'
    },
    {
      icon: FileText,
      title: 'Receive Report',
      timing: '24 Hours',
      description: 'Get your detailed appraisal report with final valuation.'
    }
  ];

  return (
    <div className="bg-white pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-blue-600">24-48 Hour Turnaround</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Fast & Efficient Process
            </h1>
            <p className="text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures accurate and timely appraisals within 24-48 hours
            </p>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.title} className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="bg-gray-50 rounded-xl p-8 h-full">
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      
                      <div className="mb-4">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                          {step.timing}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {step.title}
                      </h3>

                      <p className="text-gray-600 flex-grow">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-12 h-px bg-gray-200" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <a
              href="https://services.appraisily.com"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors gap-2"
            >
              Start Your Appraisal Now <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}