import React from 'react';
import { Check } from 'lucide-react';

interface ServiceDetailProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  recommendation: string;
}

export default function ServiceDetails() {
  const services: ServiceDetailProps[] = [
    {
      title: 'Regular Appraisal',
      description: 'Our standard appraisal service provides a comprehensive evaluation of your art or antique pieces. Perfect for collectors, sellers, and buyers seeking accurate market valuations.',
      features: [
        'Detailed condition assessment',
        'Current market value analysis',
        'Historical research and documentation',
        'High-resolution photography',
        'Digital appraisal report',
        '48-hour turnaround time'
      ],
      price: 'Starting at $299',
      recommendation: 'Recommended for: Private collectors, sellers, and buyers'
    },
    {
      title: 'Insurance Appraisal',
      description: 'Specialized appraisals designed specifically for insurance purposes, providing detailed documentation and replacement values required by insurance companies.',
      features: [
        'Insurance-grade documentation',
        'Replacement value assessment',
        'Risk analysis report',
        'Digital certification',
        'Priority processing',
        'Insurance company liaison'
      ],
      price: 'Starting at $399',
      recommendation: 'Recommended for: Collectors seeking insurance coverage'
    },
    {
      title: 'Tax Deduction Appraisal',
      description: 'IRS-compliant appraisals for charitable donations and estate planning, meeting all legal requirements for tax purposes.',
      features: [
        'IRS compliance verification',
        'Fair market value assessment',
        'Comprehensive documentation',
        'Expert testimony availability',
        'Legal requirement review',
        'Rush service available'
      ],
      price: 'Starting at $499',
      recommendation: 'Recommended for: Charitable donations and estate planning'
    }
  ];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:gap-12">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  <p className="mt-4 text-gray-600">{service.description}</p>
                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 lg:mt-0">
                  <div className="rounded-lg bg-gray-50 p-6">
                    <p className="text-lg font-semibold text-gray-900">{service.price}</p>
                    <p className="mt-4 text-sm text-gray-600">{service.recommendation}</p>
                    <button className="mt-6 w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                      Select This Service
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}