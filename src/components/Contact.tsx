import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Get Your Appraisal Today
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Have questions? Our expert team is here to help.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center space-y-8">
            <div className="flex items-center space-x-3 text-lg">
              <Mail className="h-6 w-6 text-blue-600" />
              <a href="mailto:info@appraisily.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                info@appraisily.com
              </a>
            </div>
            
            <div className="flex items-center space-x-3 text-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
              <span className="text-gray-600">Live Chat Available</span>
            </div>

            <div className="mt-8">
              <a
                href="#"
                className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Start Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}