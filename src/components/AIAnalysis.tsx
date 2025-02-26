import React from 'react';
import { Upload, Search, Sparkles } from 'lucide-react';

export default function AIAnalysis() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Try Our Free AI Analysis
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Upload your artwork and instantly receive AI-powered insights before proceeding with professional appraisal
          </p>
        </div>

        <div className="mt-16 flow-root">
          <div className="relative rounded-xl bg-gray-900/5 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/10 rounded-xl" />
            <div className="relative">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                  <Upload className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold">Upload Image</h3>
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Simply upload a photo of your artwork or antique
                  </p>
                </div>

                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                  <Search className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold">Instant Analysis</h3>
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Our AI finds similar artworks using Google Vision
                  </p>
                </div>

                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                  <Sparkles className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold">Get Insights</h3>
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Receive initial analysis and artwork comparisons
                  </p>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <a
                  href="https://screener.appraisily.com"
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                >
                  Try Free Analysis
                  <Sparkles className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}