import React from 'react';
import { Upload, Search, FileCheck, Clock } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Submit Photos',
      description: 'Upload clear photos of your item and provide any available documentation.',
      time: '5 minutes'
    },
    {
      icon: Search,
      title: 'Expert Review',
      description: 'Our certified appraisers analyze your item and research comparable sales.',
      time: '24-36 hours'
    },
    {
      icon: FileCheck,
      title: 'Detailed Report',
      description: 'Receive a comprehensive valuation report with full market analysis.',
      time: '48 hours'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get your professional appraisal in three simple steps
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.title} className="relative bg-white p-8 rounded-xl shadow-sm">
                <div className="absolute -top-4 left-8 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                  {index + 1}
                </div>
                <div className="mt-4">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600">{step.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}