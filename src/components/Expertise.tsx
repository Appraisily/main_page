import React from 'react';
import { IMAGES } from '../lib/images';

export default function Expertise() {
  const categories = [
    {
      title: 'Fine Art',
      description: 'Paintings, drawings, sculptures, prints, and contemporary artworks from all periods and movements.',
      image: IMAGES.categories.fineArt
    },
    {
      title: 'Antique Furniture',
      description: 'Period furniture, decorative arts, and historical pieces from various eras and styles.',
      image: IMAGES.categories.furniture
    },
    {
      title: 'Firearms & Militaria',
      description: 'Historical weapons, military memorabilia, uniforms, and related collectibles.',
      image: IMAGES.categories.firearms
    },
    {
      title: 'Porcelain & Ceramics',
      description: 'Fine china, pottery, decorative ceramics, and historical porcelain from all origins.',
      image: IMAGES.categories.porcelain
    },
    {
      title: 'Jewelry & Watches',
      description: 'Fine jewelry, precious stones, luxury timepieces, and vintage accessories.',
      image: IMAGES.categories.jewelry
    },
    {
      title: 'Photography & Prints',
      description: 'Vintage photographs, fine art prints, historical documents, and maps.',
      image: IMAGES.categories.photography
    },
    {
      title: 'Clocks & Timepieces',
      description: 'Antique clocks, mechanical watches, and historical timekeeping devices.',
      image: IMAGES.categories.clocks
    },
    {
      title: 'Books & Manuscripts',
      description: 'Rare books, historical documents, manuscripts, and archival materials.',
      image: IMAGES.categories.books
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Areas of Expertise
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our certified appraisers provide professional valuations across a wide range of collectibles and valuable items
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-w-3 aspect-h-2 relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Don't see your item category? Contact us for a custom appraisal quote.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-700 transition-all duration-200"
          >
            Request Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}