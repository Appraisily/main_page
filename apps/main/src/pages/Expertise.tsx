import React, { useState } from 'react';
import { IMAGES } from '../lib/images';
import { Search, History, Award, Shield, FileCheck, Users, ArrowRight, ChevronRight } from 'lucide-react';

const categories = [
  {
    title: 'Fine Art',
    description: 'Paintings, drawings, sculptures, prints, and contemporary artworks from all periods and movements.',
    image: IMAGES.categories.fineArt,
    specialties: [
      'Oil Paintings & Watercolors',
      'Modern & Contemporary Art',
      'Sculptures & Installations',
      'Prints & Lithographs'
    ],
    featured: true
  },
  {
    title: 'Antique Furniture',
    description: 'Period furniture, decorative arts, and historical pieces from various eras and styles.',
    image: IMAGES.categories.furniture,
    specialties: [
      'Victorian & Edwardian',
      'Art Nouveau & Art Deco',
      'Mid-Century Modern',
      'American Colonial'
    ],
    featured: true
  },
  {
    title: 'Firearms & Militaria',
    description: 'Historical weapons, military memorabilia, uniforms, and related collectibles.',
    image: IMAGES.categories.firearms,
    specialties: [
      'Antique Firearms',
      'Military Uniforms',
      'War Memorabilia',
      'Military Decorations'
    ]
  },
  {
    title: 'Porcelain & Ceramics',
    description: 'Fine china, pottery, decorative ceramics, and historical porcelain from all origins.',
    image: IMAGES.categories.porcelain,
    specialties: [
      'Chinese Porcelain',
      'European Ceramics',
      'Art Pottery',
      'Decorative Objects'
    ]
  },
  {
    title: 'Jewelry & Watches',
    description: 'Fine jewelry, precious stones, luxury timepieces, and vintage accessories.',
    image: IMAGES.categories.jewelry,
    specialties: [
      'Fine Jewelry',
      'Vintage Watches',
      'Precious Stones',
      'Designer Pieces'
    ],
    featured: true
  },
  {
    title: 'Photography & Prints',
    description: 'Vintage photographs, fine art prints, historical documents, and maps.',
    image: IMAGES.categories.photography,
    specialties: [
      'Vintage Photographs',
      'Fine Art Prints',
      'Historical Maps',
      'Limited Editions'
    ]
  },
  {
    title: 'Clocks & Timepieces',
    description: 'Antique clocks, mechanical watches, and historical timekeeping devices.',
    image: IMAGES.categories.clocks,
    specialties: [
      'Grandfather Clocks',
      'Pocket Watches',
      'Wall Clocks',
      'Chronometers'
    ]
  },
  {
    title: 'Books & Manuscripts',
    description: 'Rare books, historical documents, manuscripts, and archival materials.',
    image: IMAGES.categories.books,
    specialties: [
      'Rare Books',
      'Historical Documents',
      'Manuscripts',
      'First Editions'
    ]
  }
];

const features = [
  {
    icon: Search,
    title: 'Comprehensive Research',
    description: 'Our experts utilize extensive databases and resources to ensure accurate identification and valuation.'
  },
  {
    icon: History,
    title: 'Historical Context',
    description: 'We consider historical significance, provenance, and market trends in our evaluations.'
  },
  {
    icon: Award,
    title: 'Certified Expertise',
    description: 'All appraisals are conducted by certified professionals with specialized knowledge.'
  },
  {
    icon: Shield,
    title: 'Secure Process',
    description: 'Your items and information are handled with the utmost security and confidentiality.'
  },
  {
    icon: FileCheck,
    title: 'Digital Documentation',
    description: 'Receive comprehensive digital reports with detailed analysis and documentation.'
  },
  {
    icon: Users,
    title: 'Expert Network',
    description: 'Access to a network of specialists for complex or unique items.'
  }
];

export default function Expertise() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const featuredCategories = categories.filter(cat => cat.featured);
  const otherCategories = categories.filter(cat => !cat.featured);

  return (
    <div className="bg-white pt-16">
      {/* Hero Section with Featured Categories */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Our Areas of Expertise
            </h1>
            <p className="text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              With decades of combined experience, our certified appraisers provide expert valuations across a wide range of collectibles and valuable items.
            </p>
          </div>

          {/* Featured Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <div
                key={category.title}
                className="relative group cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="relative h-96 overflow-hidden rounded-2xl">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-gray-200 line-clamp-2">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
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
        </div>
      </div>

      {/* Selected Category Detail */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{selectedCategory.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{selectedCategory.description}</p>
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Specialties</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCategory.specialties.map((specialty) => (
                    <div 
                      key={specialty}
                      className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <ChevronRight className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={selectedCategory.image}
                alt={selectedCategory.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Other Categories Grid */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Additional Areas of Expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {otherCategories.map((category) => (
              <div
                key={category.title}
                className="group cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <p className="mt-2 text-gray-600 line-clamp-2">{category.description}</p>
                <div className="mt-4 inline-flex items-center text-blue-600 group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}