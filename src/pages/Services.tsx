import React from 'react';
import { services } from '../components/Services/ServicesData';
import ServiceHero from '../components/Services/ServiceHero';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

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
    <section id={title.toLowerCase().replace(/\s+/g, '-')} className="py-20 md:py-28 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Service Header */}
        <div className="flex items-center gap-4 mb-10 md:mb-16">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100">
            <Icon className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{title}</h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Service Description */}
          <div className="space-y-10">
            <div className="prose prose-lg">
              <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-sm border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Features</h3>
              <ul className="space-y-4">
                {features.map((feature: any) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <li key={feature.text} className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <FeatureIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700 pt-1">{feature.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <button 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Video Section */}
          <div className="lg:sticky lg:top-24">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-md border border-gray-100 transform transition-transform hover:scale-[1.01]">
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
        <div className="mt-24 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {/* What's Included */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">What's Included</h3>
              </div>
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
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Our Process</h3>
              </div>
              <div className="space-y-6">
                {details.process.map((step: string, index: number) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-600"></div>
                    {index !== details.process.length - 1 && (
                      <div className="absolute left-2 top-5 bottom-0 w-0.5 bg-blue-200"></div>
                    )}
                    <h4 className="text-base font-semibold text-gray-900 mb-2">Step {index + 1}</h4>
                    <p className="text-gray-700 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Why Choose This</h3>
              </div>
              <ul className="space-y-3">
                {details.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                    <svg className="h-5 w-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">{benefit}</span>
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
  // Common FAQs for service pages
  const serviceFaqs = [
    {
      question: "How accurate are online appraisals?",
      answer: "Our online appraisals are highly accurate, provided by certified appraisers with decades of experience. We use detailed photos, documentation, and extensive market research to ensure accurate valuations."
    },
    {
      question: "What information do I need to provide?",
      answer: "You'll need to provide clear photos of your item from multiple angles, any available documentation (provenance, certificates, etc.), and basic information about the item's condition and history."
    },
    {
      question: "How long does the appraisal process take?",
      answer: "Most appraisals are completed within 48 hours of submission. Rush service is available for urgent requests at an additional fee."
    },
    {
      question: "Are your appraisers certified?",
      answer: "Yes, all our appraisers are certified professionals with relevant credentials and extensive experience in their specific areas of expertise."
    },
    {
      question: "Can I use your appraisal for insurance purposes?",
      answer: "Yes, our appraisals meet the requirements of major insurance companies for coverage of valuable items. We provide detailed documentation to support insurance claims and coverage applications."
    },
    {
      question: "Do you provide appraisals for tax purposes?",
      answer: "Yes, our qualified appraisals meet IRS requirements for tax-related valuations including charitable donations, estate settlements, and gift tax purposes."
    }
  ];

  return (
    <div className="bg-white pt-16">
      <SEO 
        title="Art Appraisal Services | Insurance, Tax & Estate Valuations | Appraisily"
        description="Professional art and antique appraisal services for insurance coverage, tax documentation, estate planning, donations, and sales. USPAP-compliant valuations from certified experts."
        ratings={{
          ratingValue: 4.8,
          ratingCount: 813,
          reviewCount: 742
        }}
        type="Service"
        breadcrumbs={[
          { name: "Home", url: "https://appraisily.com/" },
          { name: "Services", url: "https://appraisily.com/services" }
        ]}
        faqs={serviceFaqs}
        datePublished="2023-01-15"
        dateModified="2023-11-20"
      />
      <ServiceHero />
      
      <div className="space-y-6">
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