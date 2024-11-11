import React from 'react';
import { format } from 'date-fns';
import { useWordPressAppraisals } from '../hooks/useWordPressAppraisals';
import { Clock, DollarSign, ArrowRight, Loader2 } from 'lucide-react';

export default function RecentAppraisals() {
  const { appraisals, loading, error } = useWordPressAppraisals();

  if (loading) {
    return (
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Hide section if there's an error
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Recent Appraisals
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Browse through our latest professional valuations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appraisals.map((appraisal) => (
            <a
              key={appraisal.id}
              href={appraisal.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {appraisal.acf.main && (
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <img
                    src={appraisal.acf.main}
                    alt={appraisal.title.rendered}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {appraisal.title.rendered}
                </h3>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {format(new Date(appraisal.date), 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center text-blue-600 font-medium">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {Number(appraisal.acf.value) === 0 ? 'Not Available' : appraisal.acf.value}
                  </div>
                </div>

                <div className="mt-4 flex items-center text-blue-600 group-hover:gap-2 transition-all">
                  <span className="text-sm font-medium">View Details</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.appraisily.com/appraisals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Appraisals <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}