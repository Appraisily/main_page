import React from 'react';
import { Users, Camera, FileCheck, LockKeyhole, Star, Award, Globe2 } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Expert Appraisers',
    description: 'Our team consists of certified professionals with decades of combined experience'
  },
  {
    icon: Camera,
    title: 'Digital Process',
    description: 'Easy online submission with our state-of-the-art digital platform'
  },
  {
    icon: FileCheck,
    title: 'Detailed Reports',
    description: 'Comprehensive documentation including market analysis and authentication'
  },
  {
    icon: LockKeyhole,
    title: 'Secure & Confidential',
    description: 'Your information is protected with enterprise-grade security'
  },
  {
    icon: Star,
    title: 'Quality Service',
    description: '5-star rated service with thousands of satisfied clients'
  },
  {
    icon: Award,
    title: 'Certified Results',
    description: 'USPAP-compliant appraisals accepted by all major institutions'
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Our Service
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Experience the difference with our professional appraisal service
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-2.5 flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="https://appraisily.com/start"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-primary/90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
          >
            Start Your Appraisal
            <Globe2 className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;