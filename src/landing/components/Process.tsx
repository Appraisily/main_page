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
        
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-[50%] top-0 h-full w-0.5 bg-gradient-to-b from-[#007bff]/20 via-[#007bff]/20 to-[#007bff]/20 transform -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-16 relative">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={step.title} className="relative">
                    {/* Center Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#007bff] z-10 hidden md:block">
                      <div className="absolute inset-0 rounded-full bg-[#007bff] animate-ping opacity-25" />
                    </div>
                    
                    <div className={`md:flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
                      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative ${isEven ? 'md:mr-8' : 'md:ml-8'}`}>
                          <div className={`flex items-center gap-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-shrink-0">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#007bff]/10">
                                <IconComponent className="h-6 w-6 text-[#007bff]" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center rounded-full bg-[#007bff]/10 px-3 py-1 text-sm font-medium text-[#007bff]">
                                Step {index + 1}
                              </span>
                              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                                {step.timing}
                              </span>
                            </div>
                          </div>
                          <h3 className={`mt-4 text-xl font-semibold text-gray-900 ${isEven ? 'md:text-right' : ''}`}>
                            {step.title}
                          </h3>
                          <p className={`mt-2 text-gray-600 ${isEven ? 'md:text-right' : ''}`}>
                            {step.description}
                          </p>
                          
                          {/* Connecting Arrow */}
                          <div className={`absolute top-1/2 hidden md:block ${isEven ? '-right-4' : '-left-4'} w-4 h-4 transform -translate-y-1/2 rotate-45 bg-white`} />
                        </div>
                      </div>
                      <div className="flex-1 hidden md:block" /> {/* Spacer */}
                    </div>
                  </div>
                );
              })}
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