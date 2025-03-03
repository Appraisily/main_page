import React from 'react';
import { Shield, Scale, FileCheck, Camera, Search, History, FileText, ArrowRight, CheckCircle2, Banknote, Lock, ClipboardCheck } from 'lucide-react';

export default function InsuranceAppraisal() {
  const features = [
    {
      icon: Shield,
      title: 'Insurance-Grade Valuation',
      description: 'Detailed replacement value assessment that meets all insurance company requirements and standards.'
    },
    {
      icon: Scale,
      title: 'Risk Assessment',
      description: 'Comprehensive evaluation of condition, fragility, and specific risks associated with your valuable items.'
    },
    {
      icon: FileCheck,
      title: 'Documentation Package',
      description: 'Complete documentation including detailed photographs, condition reports, and authentication certificates.'
    },
    {
      icon: Lock,
      title: 'Legal Compliance',
      description: 'All appraisals comply with insurance industry standards and legal requirements for claims processing.'
    }
  ];

  const processSteps = [
    {
      icon: Camera,
      title: 'Documentation',
      description: 'Detailed photography and initial assessment'
    },
    {
      icon: Search,
      title: 'Valuation',
      description: 'Current market and replacement value analysis'
    },
    {
      icon: Scale,
      title: 'Risk Analysis',
      description: 'Assessment of specific risks and conditions'
    },
    {
      icon: FileText,
      title: 'Report Creation',
      description: 'Insurance-ready documentation package'
    }
  ];

  const benefits = [
    'Insurance company accepted documentation',
    'Detailed replacement value assessment',
    'Risk and vulnerability analysis',
    'High-resolution photography documentation',
    'Condition report with specific details',
    'Authentication verification',
    'Digital and physical certificates',
    'Updates for policy adjustments'
  ];

  const insuranceFeatures = [
    {
      icon: Banknote,
      title: 'Replacement Value',
      description: 'Accurate current market replacement costs'
    },
    {
      icon: ClipboardCheck,
      title: 'Policy Compliance',
      description: 'Meets all insurance documentation requirements'
    },
    {
      icon: Lock,
      title: 'Risk Documentation',
      description: 'Detailed assessment of potential risks'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Insurance Appraisal Service
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Protect your valuable art and antiques with insurance-grade appraisals that meet all carrier requirements.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#007bff] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] transition-all duration-200"
              >
                Get Insurance Appraisal
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

      {/* Insurance-Specific Features */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Insurance-Grade Protection
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our insurance appraisals provide comprehensive coverage documentation for your valuable items
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {insuranceFeatures.map((feature) => (
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
              Our insurance appraisal service includes everything needed for complete coverage protection
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
              Insurance Appraisal Process
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our streamlined process ensures comprehensive insurance documentation
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
              Every insurance appraisal includes these essential features
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
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">Protect Your Valuables</h3>
                <p className="mt-4 text-gray-600">
                  Get comprehensive insurance documentation for your art and antiques
                </p>
                <a
                  href="#"
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#007bff] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] transition-all duration-200"
                >
                  Start Insurance Appraisal <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}