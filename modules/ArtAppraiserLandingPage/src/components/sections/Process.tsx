import React from 'react';
import { Upload, Search, TrendingUp, FileText, Clock } from 'lucide-react';

const steps = [
  {
    title: 'Submit Your Artwork',
    description: 'Upload high-quality images and documentation of your items.',
    icon: Upload,
    timeline: 'Immediate'
  },
  {
    title: 'Image Analysis',
    description: 'Our experts analyze your items using advanced AI-driven tools.',
    icon: Search,
    timeline: 'Minutes'
  },
  {
    title: 'Market Valuation',
    description: 'We evaluate based on current market trends and historical significance.',
    icon: TrendingUp,
    timeline: '12 Hours'
  },
  {
    title: 'Receive Report',
    description: 'Get your detailed appraisal report with final valuation.',
    icon: FileText,
    timeline: '24 Hours'
  }
];

export default function Process() {
  return (
    <div className="relative bg-white py-24 sm:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
      
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="h-6 w-6 text-primary" />
              <span className="text-primary font-semibold">24-48 Hour Turnaround</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Fast & Efficient Process
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our streamlined process ensures accurate and timely appraisals within 24-48 hours
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative mt-16">
            <div className="absolute left-1/2 h-full w-px bg-gray-200 transform -translate-x-1/2" />
            
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="absolute top-6 left-1/2 w-3 h-3 rounded-full bg-primary transform -translate-x-1/2" />
                  
                  <div className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ring-1 ring-gray-200">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <step.icon className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                              Step {index + 1}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                              {step.timeline}
                            </span>
                          </div>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-gray-900">{step.title}</h3>
                        <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Process Steps */}
          <div className="lg:hidden mt-16">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.title} className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                          Step {index + 1}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                          {step.timeline}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-gray-900">{step.title}</h3>
                      <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <a
              href="https://appraisily.com/start"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-primary/90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
            >
              Start Your Appraisal Now
              <Clock className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}