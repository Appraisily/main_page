import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileCheck, Package, ArrowRight, DollarSign, Sparkles, Percent } from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';

// Constants to match other components
const BASE_PRICE = 59; // $59.00
const BULK_DISCOUNT_THRESHOLD = 3;
const BULK_DISCOUNT_PERCENTAGE = 20; // 20% discount
const DISCOUNTED_PRICE = (BASE_PRICE * (100 - BULK_DISCOUNT_PERCENTAGE) / 100).toFixed(2); // $47.20

export default function BulkAppraisal() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Upload,
      title: 'Bulk Upload',
      description: 'Upload multiple items at once with our streamlined interface'
    },
    {
      icon: Percent,
      title: 'Discount on Every Item',
      description: `${BULK_DISCOUNT_PERCENTAGE}% off when you appraise ${BULK_DISCOUNT_THRESHOLD} or more items`
    },
    {
      icon: Package,
      title: 'Comprehensive Service',
      description: 'Same expert appraisal quality for all your items'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trust Badges */}
        <TrustBadges className="mb-12" />
        
        {/* Promotion Banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 rounded-xl p-6 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-full">
                <Sparkles className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Bulk Appraisal Discount</h2>
                <div className="flex items-center gap-2 mt-1">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <p className="text-gray-600">
                    <span className="line-through text-gray-400">${BASE_PRICE}</span>
                    {' '}
                    <span className="font-medium text-emerald-600">${DISCOUNTED_PRICE}</span> per item when you appraise {BULK_DISCOUNT_THRESHOLD} or more items
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium">
                Save {BULK_DISCOUNT_PERCENTAGE}%
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
            Save time and money by appraising multiple items at once. Get a {BULK_DISCOUNT_PERCENTAGE}% discount when you submit {BULK_DISCOUNT_THRESHOLD} or more items!
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Appraisal Types</h2>
          <p className="text-center text-gray-600 mb-8">
            All appraisal types are eligible for the {BULK_DISCOUNT_PERCENTAGE}% bulk discount when ordering {BULK_DISCOUNT_THRESHOLD}+ items
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-100 rounded-full">
                  <Scale className="h-5 w-5 text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold">Regular</h3>
              </div>
              <p className="text-gray-600 mb-4">Perfect for standard valuations</p>
              <div className="flex items-end gap-2 mb-2">
                <div className="text-3xl font-bold text-gray-900">${BASE_PRICE}</div>
                <span className="text-base text-gray-500 mb-1">per item</span>
              </div>
              <div className="flex items-center gap-2 mt-2 bg-emerald-50 p-2 rounded">
                <Percent className="h-4 w-4 text-emerald-600" />
                <p className="text-sm text-emerald-700">
                  <span className="font-medium">${DISCOUNTED_PRICE}</span> with bulk discount
                </p>
              </div>
            </div>
            
            <div className="border border-blue-200 rounded-lg p-6 bg-blue-50 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg">
                Popular
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Shield className="h-5 w-5 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold">Insurance</h3>
              </div>
              <p className="text-gray-600 mb-4">Detailed documentation for insurance</p>
              <div className="flex items-end gap-2 mb-2">
                <div className="text-3xl font-bold text-gray-900">${BASE_PRICE}</div>
                <span className="text-base text-gray-500 mb-1">per item</span>
              </div>
              <div className="flex items-center gap-2 mt-2 bg-emerald-50 p-2 rounded">
                <Percent className="h-4 w-4 text-emerald-600" />
                <p className="text-sm text-emerald-700">
                  <span className="font-medium">${DISCOUNTED_PRICE}</span> with bulk discount
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-100 rounded-full">
                  <FileCheck className="h-5 w-5 text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold">Tax</h3>
              </div>
              <p className="text-gray-600 mb-4">IRS-compliant valuations</p>
              <div className="flex items-end gap-2 mb-2">
                <div className="text-3xl font-bold text-gray-900">${BASE_PRICE}</div>
                <span className="text-base text-gray-500 mb-1">per item</span>
              </div>
              <div className="flex items-center gap-2 mt-2 bg-emerald-50 p-2 rounded">
                <Percent className="h-4 w-4 text-emerald-600" />
                <p className="text-sm text-emerald-700">
                  <span className="font-medium">${DISCOUNTED_PRICE}</span> with bulk discount
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="text-center mb-16">
          <button
            onClick={() => navigate('/bulk-appraisal/upload')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors gap-2"
          >
            Start Your Bulk Appraisal
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Minimum {BULK_DISCOUNT_THRESHOLD} items required for bulk discount
          </p>
        </div>
      </div>
    </div>
  );
}