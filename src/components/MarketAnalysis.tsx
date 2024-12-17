import React from 'react';
import { Award, Star, Globe } from 'lucide-react';
import { IMAGES } from '../lib/images';

export default function MarketAnalysis() {
  const expertInfo = {
    name: 'Andrés Gómez',
    title: 'Lead Art Appraiser',
    image: IMAGES.team.andres,
    badges: [
      { icon: Award, text: 'Certified Art Appraiser' },
      { icon: Star, text: '15+ Years Experience' },
      { icon: Globe, text: 'International Recognition' }
    ]
  };

  const teamImages = [
    { src: IMAGES.team.charlotte, alt: 'Charlotte Williams' },
    { src: IMAGES.team.adrian, alt: 'Adrian Chen' },
    { src: IMAGES.team.andres, alt: 'Andrés Gómez' }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Professional Market Analysis
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Our team combines traditional expertise with modern technology to provide the most accurate appraisals. 
              Each piece undergoes thorough market analysis and research, ensuring you receive a precise and reliable 
              valuation based on current market conditions.
            </p>
            <a
              href="https://services.appraisily.com"
              id="start-appraisal-nav"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Start Your Appraisal
            </a>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Expert Profile */}
              <div className="flex items-center gap-6 mb-8">
                <img
                  src={expertInfo.image}
                  alt={expertInfo.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{expertInfo.name}</h3>
                  <p className="text-blue-600">{expertInfo.title}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="space-y-4">
                {expertInfo.badges.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">{text}</span>
                  </div>
                ))}
              </div>

              {/* Team Preview */}
              <div className="mt-8 flex items-center gap-2">
                <div className="flex -space-x-3">
                  {teamImages.map((img, i) => (
                    <img
                      key={i}
                      src={img.src}
                      alt={img.alt}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">Part of our expert team</span>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 transform rotate-3 rounded-2xl" />
            <div className="absolute -z-20 inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 transform -rotate-3 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}