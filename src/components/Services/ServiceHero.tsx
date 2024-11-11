import React from 'react';
import { Shield, Award, Users } from 'lucide-react';

export default function ServiceHero() {
  const highlights = [
    {
      icon: Shield,
      title: 'Certified Experts',
      description: 'All appraisals conducted by USPAP-certified professionals'
    },
    {
      icon: Award,
      title: 'Trusted Process',
      description: 'Rigorous methodology following industry standards'
    },
    {
      icon: Users,
      title: 'Personal Attention',
      description: 'Dedicated expert assigned to your appraisal'
    }
  ];

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Professional Appraisal Services
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose from our comprehensive range of appraisal services, each tailored to meet specific needs and requirements. Our certified experts combine traditional expertise with advanced technology for accurate valuations.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {highlights.map((highlight) => {
            const IconComponent = highlight.icon;
            return (
              <div key={highlight.title} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
                <IconComponent className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">{highlight.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{highlight.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}