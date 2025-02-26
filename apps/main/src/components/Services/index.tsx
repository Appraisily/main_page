import React from 'react';
import { services } from './ServicesData';
import ServiceHero from './ServiceHero';

function ServiceSection({ 
  title, 
  description, 
  icon: Icon, 
  features,
  videoId,
  details,
  isReversed 
}: any) {
  return (
    <section className="py-24 border-b border-gray-200 last:border-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Icon className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            </div>
            <p className="text-lg text-gray-600">{description}</p>
            <ul className="space-y-4">
              {features.map((feature: any) => {
                const FeatureIcon = feature.icon;
                return (
                  <li key={feature.text} className="flex items-start gap-3">
                    <FeatureIcon className="h-5 w-5 text-blue-600 mt-1" />
                    <span className="text-gray-700">{feature.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              title={`${title} Overview`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="mt-16">
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">What's Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {details.included.map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">Process</h3>
            <div className="bg-gray-50 p-8 rounded-xl">
              {details.process.map((step: string, index: number) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Step {index + 1}</h4>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">Why Choose This Service</h3>
            <ul className="list-none p-0 grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <div className="bg-white">
      <ServiceHero />
      
      <div className="divide-y divide-gray-200">
        {services.map((service, index) => (
          <ServiceSection
            key={service.title}
            {...service}
            videoId={service.action.videoId}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}