import React from 'react';
import { Users, Camera, FileCheck, Shield, Clock, Globe, TrendingUp, DollarSign, Search } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Certified Experts',
      description: 'USPAP-certified professional appraisers with extensive experience in art and antiques.'
    },
    {
      icon: Clock,
      title: 'Fast & Efficient',
      description: '48-hour turnaround on most appraisals, ensuring you get your valuation quickly.'
    },
    {
      icon: Globe,
      title: 'Worldwide Service',
      description: 'Remote appraisals available worldwide, no matter where you are located.'
    },
    {
      icon: TrendingUp,
      title: 'Boost Your Profit',
      description: 'Never undersell again. Our detailed reports ensure you get the best price for your items.'
    },
    {
      icon: DollarSign,
      title: 'Know True Worth',
      description: 'Get accurate market valuations backed by extensive research and data.'
    },
    {
      icon: Users,
      title: 'Attract More Buyers',
      description: "Professional reports validate your items' authenticity and value to collectors."
    },
    {
      icon: Search,
      title: 'Appraisers Directory',
      description: 'Access our comprehensive directory of verified art and antique appraisers.',
      action: {
        text: 'Browse Directory',
        url: '/directory',
        external: true
      }
    }
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Our Appraisals?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            With our specialized knowledge and modern technology, we provide accurate and reliable art and antique appraisals.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.title} 
                className="flex flex-col items-start bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="rounded-lg bg-blue-50 p-3 mb-4">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
                {feature.action && (
                  <a 
                    href={feature.action.url} 
                    className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-500"
                    target={feature.action.external ? "_blank" : undefined}
                    rel={feature.action.external ? "noopener noreferrer" : undefined}
                  >
                    {feature.action.text} <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}