import React from 'react';
import { Upload, Search, TrendingUp, FileText } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      icon: Upload,
      title: 'Submit Photos',
      description: 'Upload clear photos of your item along with any relevant details or documentation.',
      timing: 'Immediate'
    },
    {
      icon: Search,
      title: 'Expert Analysis',
      description: 'Our certified appraisers analyze your item using advanced AI tools and market data.',
      timing: '12-24 Hours'
    },
    {
      icon: TrendingUp,
      title: 'Market Valuation',
      description: 'We determine current market value based on recent sales and market trends.',
      timing: '24-36 Hours'
    },
    {
      icon: FileText,
      title: 'Detailed Report',
      description: 'Receive a comprehensive appraisal report with full documentation and certification.',
      timing: '36-48 Hours'
    }
  ];

  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Appraisal Process
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Simple, efficient, and professional valuation in four easy steps
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-4 lg:gap-x-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.title} className="relative pl-16">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="relative">
                    <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600 ring-1 ring-inset ring-blue-500/10">
                      Step {index + 1} • {step.timing}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}