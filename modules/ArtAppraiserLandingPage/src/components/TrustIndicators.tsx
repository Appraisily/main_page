import React from 'react';
import { Shield, Award, Building2, CheckCircle2 } from 'lucide-react';

const partners = [
  {
    name: 'USPAP Compliant',
    description: 'Follows Uniform Standards of Professional Appraisal Practice',
    icon: Shield
  },
  {
    name: 'ISA Member',
    description: 'International Society of Appraisers',
    icon: Building2
  },
  {
    name: 'AAA Certified',
    description: 'Appraisers Association of America',
    icon: Award
  },
  {
    name: 'IRS Qualified',
    description: 'Meets IRS requirements for charitable contributions',
    icon: CheckCircle2
  }
];

export default function TrustIndicators() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our appraisals meet the highest industry standards and are accepted by major institutions
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <partner.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {partner.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}