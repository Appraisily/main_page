import React from 'react';
import { Award, Star, Globe } from 'lucide-react';

export default function Experts() {
  const experts = [
    {
      name: 'Andrés Gómez',
      title: 'Lead Art Appraiser',
      image: '/assets/jack.jpg',
      credentials: ['BSc, MSc', 'Certified Art Appraiser'],
      quote: 'Expertly valuing your treasures to safeguard your investment.',
      stats: [
        { icon: Award, text: 'Certified Expert' },
        { icon: Star, text: '15+ Years Experience' },
        { icon: Globe, text: 'International Recognition' }
      ]
    },
    {
      name: 'Charlotte Smith',
      title: 'Senior Antique Specialist',
      image: '/assets/profile2.jpg',
      credentials: ['BSc in Art History'],
      quote: 'Delivering detailed, accurate appraisals with ease and efficiency.',
      stats: [
        { icon: Award, text: 'Certified Expert' },
        { icon: Star, text: '10+ Years Experience' },
        { icon: Globe, text: 'European Specialist' }
      ]
    },
    {
      name: 'Adrian Dupont',
      title: 'Fine Art Expert',
      image: '/assets/profile4.jpg',
      credentials: ['MA in Art History'],
      quote: 'Every piece tells a story - we help uncover its true value.',
      stats: [
        { icon: Award, text: 'Certified Expert' },
        { icon: Star, text: '12+ Years Experience' },
        { icon: Globe, text: 'Modern Art Specialist' }
      ]
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

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {experts.map((expert) => (
            <div
              key={expert.name}
              className="flex flex-col items-center rounded-2xl bg-gray-50 p-8 text-center ring-1 ring-inset ring-gray-200"
            >
              <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden mb-6">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900">{expert.name}</h3>
              <p className="mt-1 text-sm text-blue-600">{expert.title}</p>
              
              <div className="mt-4 flex flex-col items-center">
                {expert.credentials.map((credential) => (
                  <span key={credential} className="text-sm text-gray-600">
                    {credential}
                  </span>
                ))}
              </div>

              <blockquote className="mt-4 text-gray-600 italic min-h-[4rem]">
                "{expert.quote}"
              </blockquote>

              <div className="mt-6 flex flex-col gap-2">
                {expert.stats.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 justify-center">
                    <Icon className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}