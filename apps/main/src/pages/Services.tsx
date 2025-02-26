import React from 'react';
import { services } from '../components/Services/ServicesData';
import ServiceHero from '../components/Services/ServiceHero';
import { ArrowRight } from 'lucide-react';

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
    <section id={title.toLowerCase().replace(/\s+/g, '-')} className="py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Service Header */}
        <div className="flex items-center gap-3 mb-12">
          <Icon className="h-10 w-10 text-blue-600" />
          <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Service Description */}
          <div className="space-y-8">
            <div className="prose prose-lg">
              <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Features</h3>
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

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <button 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Video Section */}
          <div className="lg:sticky lg:top-24">
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
        </div>

        {/* Detailed Information */}
        <div className="mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* What's Included */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">What's Included</h3>
              <ul className="space-y-4">
                {details.included.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Process</h3>
              <div className="space-y-6">
                {details.process.map((step: string, index: number) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-600"></div>
                    {index !== details.process.length - 1 && (
                      <div className="absolute left-2 top-5 bottom-0 w-0.5 bg-blue-200"></div>
                    )}
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Step {index + 1}</h4>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose This Service</h3>
              <ul className="space-y-3">
                {details.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <svg className="h-5 w-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-white pt-16">
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