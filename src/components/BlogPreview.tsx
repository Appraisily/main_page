import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BlogPreview() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Recent Appraisals & Articles
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore our latest appraisals and expert insights
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {/* Preview cards that link to your WordPress blog */}
          <a href="https://blog.appraisily.com" className="group">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://www.appraisily.com/wp-content/uploads/2024/10/8-8-24-Sunrise-Dancers-with-Frame-copy-b127a1fb7410917e3965dc3479099361-scaled-22-150x150.jpg"
                alt="Recent Appraisal"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                Latest Appraisals
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                View our most recent professional appraisals and valuations
              </p>
            </div>
          </a>

          <a href="https://blog.appraisily.com/articles" className="group">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://www.appraisily.com/wp-content/uploads/2022/02/example-300x214.jpg"
                alt="Expert Articles"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                Expert Articles
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Read insights and guides from our appraisal experts
              </p>
            </div>
          </a>

          <div className="flex flex-col justify-center items-center p-8 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              Visit Our Blog
            </h3>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Explore our full collection of articles, guides, and appraisals
            </p>
            <a 
              href="https://blog.appraisily.com"
              className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              Visit Blog <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}