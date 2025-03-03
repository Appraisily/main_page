import React from 'react';
import { Upload, Search, Sparkles, ArrowRight } from 'lucide-react';

export default function InstantAnalysis() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Instant Art Prescreener™
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our proprietary AI technology provides instant artwork analysis and preliminary value insights
          </p>
        </div>

        <div className="mt-16 flow-root">
          <div className="relative rounded-xl bg-gray-900/5 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-xl" />
            
            <div className="relative">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                  <Upload className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold">Upload Image</h3>
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Simply upload a photo of your artwork or antique
                  </p>
                </div>

                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                  <Search className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold">Instant Analysis</h3>
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Our AI finds similar artworks using Google Vision
                  </p>
                </div>

                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                  <Sparkles className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold">Get Insights</h3>
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Receive initial analysis and artwork comparisons
                  </p>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <a
                  href="https://screener.appraisily.com/"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-primary/90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
                >
                  Start Prescreening
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-gray-50 p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">What you'll get:</h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start gap-3">
                    <Search className="h-5 w-5 text-primary mt-1" />
                    <span className="text-gray-600">Similar artwork matches from our extensive database</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-1" />
                    <span className="text-gray-600">Initial style and period classification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="h-5 w-5 text-primary mt-1" />
                    <span className="text-gray-600">Option to proceed with professional appraisal service</span>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="https://ik.imagekit.io/appraisily/WebPage/image_screener.JPG?tr=w-800,h-600,q-70"
                  alt="AI Analysis Demo"
                  className="w-full h-full object-cover"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 via-gray-900/0" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-medium">Preview of AI Analysis Results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}