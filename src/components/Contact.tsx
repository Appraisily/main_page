import React from 'react';
import { Mail, Clock, Zap } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Get Your Appraisal Today
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Have questions? Our expert team is here to help.
            </p>
          </div>

          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
              {/* Response Time Card */}
              <div className="bg-blue-50 rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Current Response Time</h3>
                    <p className="text-blue-600 font-medium">~2 hours</p>
                  </div>
                </div>
                <Clock className="h-12 w-12 text-blue-200" />
              </div>

              {/* Contact Info */}
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <a 
                  href="mailto:info@appraisily.com" 
                  className="text-gray-900 hover:text-blue-600 transition-colors font-medium"
                >
                  info@appraisily.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}