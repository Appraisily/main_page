import React from 'react';
import { UserCheck, Sparkles, Shield, Clock } from 'lucide-react';

export default function ValueProposition() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main message */}
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
              <UserCheck className="w-4 h-4 mr-2" />
              Professional Human Expertise
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
              Expert Appraisals by Certified Professionals
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              While we offer free AI-powered tools to help you learn about your items, our core service is 
              professional appraisals conducted by certified experts with decades of experience.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Certified Experts</h3>
                  <p className="text-sm text-gray-600">USPAP-certified appraisers with extensive expertise</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quick Turnaround</h3>
                  <p className="text-sm text-gray-600">Professional appraisals within 48 hours</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Get Professional Appraisal
              </a>
            </div>
          </div>

          {/* Right side - Service comparison */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {/* Free AI Tools */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Free AI Tools</h3>
                  </div>
                  <span className="text-sm font-medium text-blue-600">Included</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    Quick visual analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    Basic artwork identification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    Similar artwork search
                  </li>
                </ul>
              </div>

              {/* Professional Appraisal */}
              <div className="p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Professional Appraisal</h3>
                  </div>
                  <span className="text-sm font-medium text-blue-600">Premium Service</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    Detailed valuation by certified experts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    Comprehensive condition assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    Authentication & provenance research
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    Official documentation for insurance/tax
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}