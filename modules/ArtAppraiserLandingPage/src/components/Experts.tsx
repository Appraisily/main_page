import React from 'react';
import { Award, Star, Globe2 } from 'lucide-react';

const experts = [
  {
    name: 'Andrés Gómez',
    title: 'Lead Art Appraiser',
    image: 'https://ik.imagekit.io/appraisily/Appraisers/andres.png?tr=w-400,h-400,q-75',
    credentials: ['BSc, MSc', 'Certified Art Appraiser'],
    quote: 'Expertly valuing your treasures to safeguard your investment.',
    stats: [
      { icon: Award, text: 'Certified Expert' },
      { icon: Star, text: '15+ Years Experience' },
      { icon: Globe2, text: 'International Recognition' }
    ]
  },
  {
    name: 'Charlotte Smith',
    title: 'Senior Antique Specialist',
    image: 'https://ik.imagekit.io/appraisily/Appraisers/charlotte.png?tr=w-400,h-400,q-75',
    credentials: ['BSc in Art History'],
    quote: 'Delivering detailed, accurate appraisals with ease and efficiency.',
    stats: [
      { icon: Award, text: 'Certified Expert' },
      { icon: Star, text: '10+ Years Experience' },
      { icon: Globe2, text: 'European Specialist' }
    ]
  },
  {
    name: 'Adrian Dupont',
    title: 'Fine Art Expert',
    image: 'https://ik.imagekit.io/appraisily/Appraisers/adrian.png?tr=w-400,h-400,q-75',
    credentials: ['MA in Art History'],
    quote: 'Every piece tells a story - we help uncover its true value.',
    stats: [
      { icon: Award, text: 'Certified Expert' },
      { icon: Star, text: '12+ Years Experience' },
      { icon: Globe2, text: 'Modern Art Specialist' }
    ]
  }
];

export default function Experts() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Expert Appraisers
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our team of certified professionals brings decades of combined experience in art and antique appraisal.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {experts.map((expert) => (
            <article key={expert.name} className="flex flex-col items-start">
              <div className="relative w-full">
                <div className="aspect-[3/3] w-full rounded-2xl bg-gray-100 object-cover">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="aspect-[3/3] w-full rounded-2xl object-cover"
                    width="400"
                    height="400"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-2xl">
                  <div className="flex flex-wrap gap-2">
                    {expert.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-medium text-gray-900"
                      >
                        <stat.icon className="h-4 w-4 text-primary mr-1" />
                        {stat.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="max-w-xl mt-8">
                <div className="flex items-center gap-x-4 text-xs">
                  {expert.credentials.map((credential, index) => (
                    <span
                      key={index}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600"
                    >
                      {credential}
                    </span>
                  ))}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                    <span className="absolute inset-0" />
                    {expert.name}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-primary font-medium">
                    {expert.title}
                  </p>
                </div>
                <p className="mt-5 text-sm leading-6 text-gray-600">
                  {expert.quote}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="https://appraisily.com/start"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-primary/90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
          >
            Get Expert Appraisal
            <Award className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}