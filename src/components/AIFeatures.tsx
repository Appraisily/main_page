import React from 'react';
import { Sparkles, Search, Brain, Gauge, BarChart3, Shield, ArrowRight } from 'lucide-react';

export default function AIFeatures() {
  const features = [
    {
      icon: Brain,
      title: 'Research Assistant',
      description: 'Use our AI tools to research your items before getting a professional appraisal from our experts.'
    },
    {
      icon: Search,
      title: 'Visual Analysis',
      description: 'Get preliminary insights about your items through our advanced computer vision technology.'
    },
    {
      icon: BarChart3,
      title: 'Market Research',
      description: 'Access comprehensive market data to better understand current trends and historical sales.'
    },
    {
      icon: Shield,
      title: 'Expert Validation',
      description: 'All final valuations are performed by our certified appraisers, combining AI insights with professional expertise.'
    },
    {
      icon: Gauge,
      title: 'Faster Process',
      description: 'AI-powered research tools help streamline the appraisal process while maintaining professional standards.'
    },
    {
      icon: Sparkles,
      title: 'Enhanced Research',
      description: 'Our technology searches millions of records to support our experts in delivering accurate valuations.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-blue-100 text-blue-800 mb-6">
            <Sparkles className="w-4 h-4 mr-2" /> Research Tools
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Professional Expertise Enhanced by Technology
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            While our certified appraisers provide the professional valuations you need, our AI-powered research tools help you learn more about your items
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="relative bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-200/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white mb-6">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center gap-6">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            Get Professional Appraisal
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="https://screener.appraisily.com"
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-200 transition-colors duration-200 group"
          >
            Try Research Tools
            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
          </a>
        </div>
      </div>
    </section>
  );
}