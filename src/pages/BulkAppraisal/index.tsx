import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileCheck, Package, ArrowRight, DollarSign, Sparkles } from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';

export default function BulkAppraisal() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Upload,
      title: 'Bulk Upload',
      description: 'Upload multiple items at once with our streamlined interface'
    },
    {
      icon: FileCheck,
      title: 'Batch Processing',
      description: 'Review and submit items in a single session'
    },
    {
      icon: Package,
      title: 'Volume Discounts',
      description: 'Save more when appraising multiple items'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trust Badges */}
        <TrustBadges className="mb-12" />
        
        {/* Promotion Banner */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 rounded-xl p-6 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Special Bulk Discount</h2>
                <div className="flex items-center gap-2 mt-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <p className="text-gray-600">
                    <span className="line-through text-gray-400">$59</span>
                    {' '}
                    <span className="font-medium text-green-600">$47.20</span> per item when you appraise 3 or more items
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Bulk Appraisal Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Save time and money by appraising multiple items at once. Get a 20% discount when you submit 3 or more items!
          </p>
          <button
            onClick={() => navigate('/bulk-appraisal/upload')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors gap-2"
          >
            Start Bulk Upload
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.title} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Pricing Table */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Volume Discounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Standard</h3>
              <p className="text-gray-600 mb-4">Perfect for basic valuations</p>
              <div className="text-3xl font-bold text-gray-900 mb-4">$59<span className="text-lg">/item</span></div>
              <p className="text-sm text-gray-500">10% off for 5+ items</p>
            </div>
            <div className="border rounded-lg p-6 bg-blue-50 border-blue-200">
              <h3 className="text-xl font-semibold mb-4">Insurance</h3>
              <p className="text-gray-600 mb-4">Detailed documentation for insurance</p>
              <div className="text-3xl font-bold text-gray-900 mb-4">$89<span className="text-lg">/item</span></div>
              <p className="text-sm text-gray-500">15% off for 5+ items</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Tax</h3>
              <p className="text-gray-600 mb-4">IRS-compliant valuations</p>
              <div className="text-3xl font-bold text-gray-900 mb-4">$129<span className="text-lg">/item</span></div>
              <p className="text-sm text-gray-500">20% off for 5+ items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}