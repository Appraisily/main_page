import React from 'react';
import { FileCheck, Scale, Landmark, Camera, Search, History, FileText, ArrowRight, CheckCircle2, DollarSign, ScrollText, Building2 } from 'lucide-react';

export default function TaxDeductionAppraisal() {
  const features = [
    {
      icon: Landmark,
      title: 'IRS Compliance',
      description: 'Our appraisals meet all IRS requirements for charitable contributions and tax deductions, following strict compliance guidelines.'
    },
    {
      icon: Scale,
      title: 'Fair Market Value',
      description: 'Accurate determination of fair market value based on current market conditions and comparable sales data.'
    },
    {
      icon: FileCheck,
      title: 'Complete Documentation',
      description: 'Comprehensive documentation package that satisfies all legal and tax authority requirements.'
    },
    {
      icon: Building2,
      title: 'Expert Testimony',
      description: 'Professional testimony and support for tax-related inquiries or proceedings when needed.'
    }
  ];

  const processSteps = [
    {
      icon: Camera,
      title: 'Documentation',
      description: 'Detailed photography and item analysis'
    },
    {
      icon: Search,
      title: 'Market Research',
      description: 'Comprehensive market value assessment'
    },
    {
      icon: Scale,
      title: 'Value Determination',
      description: 'Fair market value calculation'
    },
    {
      icon: FileText,
      title: 'IRS Report',
      description: 'Complete IRS-compliant documentation'
    }
  ];

  const taxFeatures = [
    {
      icon: ScrollText,
      title: 'IRS Form 8283 Support',
      description: 'Complete assistance with required tax forms'
    },
    {
      icon: DollarSign,
      title: 'Fair Market Valuation',
      description: 'Precise current market value assessment'
    },
    {
      icon: FileCheck,
      title: 'Legal Compliance',
      description: 'Full adherence to IRS regulations'
    }
  ];

  const benefits = [
    'IRS-compliant appraisal report',
    'Form 8283 documentation support',
    'Fair market value assessment',
    'Qualified appraiser certification',
    'Detailed item documentation',
    'Authentication verification',
    'Market analysis support',
    'Expert testimony availability'
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Tax Deduction Appraisal
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              IRS-compliant appraisals for charitable donations and tax deduction purposes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#007bff] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] transition-all duration-200"
              >
                Start Tax Appraisal
              </a>
              <a href="#features" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#007bff] to-[#0056b3] opacity-30" />
        </div>
      </div>

      {/* Tax-Specific Features */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              IRS-Compliant Appraisals
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our tax deduction appraisals meet all IRS requirements for charitable contributions
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {taxFeatures.map((feature) => (
                <div key={feature.title} className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all duration-200">
                  <div className="absolute right-0 top-0 -ml-8 origin-top-right rotate-45 transform bg-[#007bff]/10 p-8"></div>
                  <div className="relative">
                    <div className="rounded-lg bg-[#007bff]/10 p-3 w-fit">
                      <feature.icon className="h-6 w-6 text-[#007bff]" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Service Features
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our tax deduction appraisal service includes everything needed for IRS compliance
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all duration-200">
                  <div className="mb-6">
                    <div className="rounded-lg bg-[#007bff]/10 p-3 w-fit">
                      <feature.icon className="h-6 w-6 text-[#007bff]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Process Timeline */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tax Appraisal Process
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our streamlined process ensures IRS-compliant documentation
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative">
                  {index !== processSteps.length - 1 && (
                    <div className="absolute top-12 left-16 w-full border-t-2 border-gray-200 hidden md:block" />
                  )}
                  <div className="relative flex flex-col items-center">
                    <div className="rounded-full bg-[#007bff]/10 p-4">
                      <step.icon className="h-8 w-8 text-[#007bff]" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 text-center">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits & CTA */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What's Included
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Every tax deduction appraisal includes these essential features
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-[#007bff]" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-16 flex flex-col items-center">
              <div className="rounded-2xl bg-gray-50 p-8 text-center">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">Ready for Tax Appraisal?</h3>
                <p className="mt-4 text-gray-600">
                  Get your IRS-compliant appraisal for charitable contributions
                </p>
                <a
                  href="#"
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#007bff] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] transition-all duration-200"
                >
                  Start Tax Appraisal <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}