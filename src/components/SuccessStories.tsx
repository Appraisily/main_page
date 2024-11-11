import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

export default function SuccessStories() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Success Stories: A Glimpse into Real Appraisals
            </h2>
            
            <div className="bg-gray-50 rounded-xl p-8 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Tinus de Jongh Painting Discovery
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Among Mark's cherished heirlooms was a striking original painting. With Appraisily's expert help, 
                    the artist was identified as 'Tinus de Jongh (Dutch, 1885–1942)', and the artwork was appraised 
                    between $1,500 and $2,000. Ultimately, it was sold for $1,800.
                  </p>
                  <blockquote className="italic text-gray-700 border-l-4 border-blue-600 pl-4">
                    "Thanks to this incredible service. I had no idea the painting held such value. 
                    The $20 online art appraisal report was an absolute bargain, and I'll definitely use Appraisily again."
                    <footer className="mt-2 text-sm text-gray-600 not-italic">- Mark S.</footer>
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start gap-4">
              <a
                href="https://drive.google.com/file/d/1n-JCAEZJaZDOzQ3mF4GRPmatRKrUsoUn/view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 group"
              >
                View Sample Report <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-sm text-gray-600">
                See what's included in our detailed reports
              </span>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800&h=600"
              alt="Antique painting being appraised"
              className="rounded-xl shadow-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Example of an artwork appraised through our service
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}