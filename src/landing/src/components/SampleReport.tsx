import React from 'react';
import { Ruler, TrendingUp, Award, Download } from 'lucide-react';
import reportImage from '../images/report.jpg';

export default function SampleReport() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            View a Sample Report
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive appraisal reports provide detailed analysis, market comparisons, and thorough documentation of your valuable pieces.
          </p>
        </div>

        <div className="mt-16 bg-gray-50 rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Ruler className="h-8 w-8 text-[#007bff]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Detailed Item Description</h3>
                  <p className="mt-2 text-gray-600">Complete physical description, measurements, and condition assessment</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-[#007bff]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Market Analysis</h3>
                  <p className="mt-2 text-gray-600">Current market trends, comparable sales, and value justification</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Award className="h-8 w-8 text-[#007bff]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Professional Certification</h3>
                  <p className="mt-2 text-gray-600">USPAP-compliant certification and appraiser credentials</p>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://drive.google.com/file/d/1n-JCAEZJaZDOzQ3mF4GRPmatRKrUsoUn/view?pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[#007bff] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] transition-all duration-200"
                >
                  <Download className="h-5 w-5" />
                  Download Sample PDF
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200">
                <img
                  src={reportImage}
                  alt="Sample appraisal report preview"
                  className="h-full w-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}