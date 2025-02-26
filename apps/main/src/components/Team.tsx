import React from 'react';
import { Award, Star, Shield } from 'lucide-react';
import { IMAGES } from '../lib/images';
import ImageKit from './ui/ImageKit';

export default function Team() {
  const appraisers = [
    {
      name: 'Andrés Gómez, BSc, MSc',
      image: IMAGES.team.andres,
      credentials: 'Certified Art and Antique Appraiser',
      quote: 'Expertly valuing your treasures to safeguard your investment.',
      specialties: ['Fine Art', 'Antiques', 'Modern Art'],
      icon: Award
    },
    {
      name: 'Charlotte Williams',
      image: IMAGES.team.charlotte,
      credentials: 'BSc in Art History',
      quote: 'Delivering detailed, accurate appraisals with ease and efficiency.',
      specialties: ['Contemporary Art', 'Sculptures', 'Paintings'],
      icon: Star
    },
    {
      name: 'Adrian Dupont',
      image: IMAGES.team.adrian,
      credentials: 'European Fine Art and Antiques Specialist',
      quote: 'Our appraisals, accompanied by detailed reports and photographs, reveal the key facts behind your unique finds.',
      specialties: ['European Art', 'Classical Art', 'Religious Art'],
      icon: Shield
    }
  ];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Expert Appraisers
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our team of certified professionals brings decades of combined experience in art and antique appraisal.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {appraisers.map((appraiser) => {
            const IconComponent = appraiser.icon;
            return (
              <div
                key={appraiser.name}
                className="flex flex-col items-center rounded-2xl bg-gray-50 p-8 text-center ring-1 ring-inset ring-gray-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden mb-6">
                  <img
                    src={appraiser.image}
                    alt={appraiser.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <IconComponent className="w-5 h-5 text-[#007bff]" />
                  <span className="text-sm font-medium text-[#007bff]">Expert Appraiser</span>
                </div>

                <div className="h-full flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900">{appraiser.name}</h3>
                  <p className="mt-1 text-sm text-[#007bff]">{appraiser.credentials}</p>

                  <div className="mt-4 flex-grow flex items-center">
                    <blockquote className="text-gray-600 italic min-h-[4rem] flex items-center">
                      "{appraiser.quote}"
                    </blockquote>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {appraiser.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-flex items-center rounded-full bg-[#007bff]/10 px-3 py-1 text-sm font-medium text-[#007bff]"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}