import React from 'react';
import { Upload, Search, TrendingUp, FileText, Clock } from 'lucide-react';

const steps = [
  {
    title: 'Submit Photos',
    description: 'Upload clear photos of your item along with any relevant details or documentation.',
    icon: Upload,
    timing: 'Immediate'
  },
  {
    title: 'Expert Analysis',
    description: 'Our certified appraisers analyze your item using advanced AI tools and market data.',
    icon: Search,
    timing: '12-24 Hours'
  },
  {
    title: 'Market Valuation',
    description: 'We determine current market value based on recent sales and market trends.',
    icon: TrendingUp,
    timing: '24-36 Hours'
  },
  {
    title: 'Detailed Report',
    description: 'Receive a comprehensive appraisal report with full documentation and certification.',
    icon: FileText,
    timing: '36-48 Hours'
  }
];

export default function Process() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock className="h-6 w-6 text-[#007bff]" />
            <span className="text-[#007bff] font-semibold">24-48 Hour Turnaround</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Fast &amp; Efficient Process
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our streamlined process ensures accurate and timely appraisals within 24-48 hours
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative">
            <div className="absolute left-1/2 h-full w-px bg-gray-200 transform -translate-x-1/2" />
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="absolute top-6 left-1/2 w-3 h-3 rounded-full bg-[#007bff] transform -translate-x-1/2" />
                  
                  <div className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#007bff]/10">
                              <step.icon className="h-5 w-5 text-[#007bff]" />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-[#007bff]/10 px-2.5 py-1 text-xs font-medium text-[#007bff]">
                              Step {index + 1}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                              {step.timing}
                            </span>
                          </div>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-gray-900">{step.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <a
            href="https://services.appraisily.com"
            className="rounded-md bg-[#007bff] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] transition-all duration-200"
          >
            Start Your Appraisal Now
          </a>
        </div>
      </div>
    </div>
  );
}