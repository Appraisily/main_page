import React from 'react';
import { Check } from 'lucide-react';

export default function Pricing() {
  const tiers = [
    {
      name: 'Standard Appraisal',
      price: 59,
      description: 'Perfect for single items requiring professional valuation',
      features: [
        'Detailed condition report',
        'Market value assessment',
        'Digital documentation',
        'Expert analysis',
        'PDF report delivery',
        '48-hour turnaround'
      ]
    },
    {
      name: 'Insurance Appraisal',
      price: 89,
      description: 'Comprehensive evaluation for insurance purposes',
      features: [
        'Everything in Standard',
        'Insurance-grade documentation',
        'Replacement value',
        'Risk assessment',
        'Digital certification',
        'Priority processing'
      ]
    },
    {
      name: 'Tax Deduction',
      price: 129,
      description: 'IRS-compliant appraisals for charitable donations',
      features: [
        'Everything in Insurance',
        'IRS compliance',
        'Fair market value',
        'Detailed documentation',
        'Expert testimony',
        'Rush service available'
      ]
    }
  ];

  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Transparent Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Professional appraisal services starting from $59. No hidden charges, just honest expertise.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">
                    {tier.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    ${tier.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /item
                  </span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#"
                className="mt-8 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}