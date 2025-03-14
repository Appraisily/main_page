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
    <div className="relative bg-gradient-to-b from-blue-50 via-blue-50/50 to-white pt-28 pb-16 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
        <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            Premium Art Appraisal Services
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Expert Art <span className="text-blue-600">Appraisal</span> Services
          </h1>
          <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive range of appraisal services, each tailored to meet specific needs and requirements. Our certified experts combine traditional expertise with advanced technology.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <div 
                key={highlight.title} 
                className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-20 text-center">
          <a 
            href="#regular-appraisal" 
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm hover:shadow"
          >
            Explore Our Services
          </a>
        </div>
      </div>
    </div>
  );
}