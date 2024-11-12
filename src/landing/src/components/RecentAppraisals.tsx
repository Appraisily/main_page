import React from 'react';
import { ArrowRight, DollarSign, ExternalLink } from 'lucide-react';

const appraisals = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?auto=format&fit=crop&q=80&w=800&h=600',
    title: "Surrealist Abstract by Tom Kidd",
    description: "Original hand-made surrealist abstract painting by Tom Kidd (B.1955). Renowned for his fine quality work, Kidd's piece was directly purchased from the artist and was featured as a book cover.",
    value: 2200,
    url: "https://www.appraisily.com/appraisals/1-9/"
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988f7?auto=format&fit=crop&q=80&w=800&h=600',
    title: "17th Century Dutch Portrait",
    description: "Early to mid 17th-century painting attributed to Dutch Golden Age painter Frans Hals the Elder. Features a dignified individual seated with a possible string instrument, adorned in period clothing.",
    value: 85000,
    url: "https://www.appraisily.com/appraisals/1-8/"
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800&h=600',
    title: "Adriaen Brouwer Tavern Scene",
    description: "17th century Dutch tavern interior by Flemish master Adriaen Brouwer (c. 1605 – 1638). Known for his unique style and mastery of chiaroscuro, displaying fantastic imagination with mysterious luminosity.",
    value: 6000,
    url: "https://www.appraisily.com/appraisals/1-7/"
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&q=80&w=800&h=600',
    title: "Forest Scene by Himmy",
    description: "Mid to late 20th century oil painting by German artist Himmy, depicting a serene forest path with two figures. Features tranquil earthy tones and masterful composition.",
    value: 800,
    url: "https://www.appraisily.com/appraisals/1-6/"
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&q=80&w=800&h=600',
    title: "Sunrise Dancers Holbein",
    description: "Contemporary piece by Patrice Le Pera depicting traditional dancers at dawn. Women in traditional attire carry green plants through a vibrant landscape, symbolizing community and tradition.",
    value: 7000,
    url: "https://www.appraisily.com/appraisals/1-4/"
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&q=80&w=800&h=600',
    title: "Designer Life by Wiley Ross",
    description: "36×24 oil on glass painting with back light illumination by Springfield artist Wiley Ross. Modern portrait with abstract elements against vibrant red and orange background.",
    value: 5800,
    url: "https://www.appraisily.com/appraisals/1-3/"
  }
];

export default function RecentAppraisals() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Recent Appraisals
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Browse through our latest professional valuations to see examples of our detailed analysis and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appraisals.map((appraisal) => (
            <a
              key={appraisal.id}
              href={appraisal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[3/2]">
                <img
                  src={appraisal.image}
                  alt={appraisal.title}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 p-6 w-full">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#007bff] transition-colors line-clamp-2">
                      {appraisal.title}
                    </h3>
                    <ExternalLink className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {appraisal.description}
                  </p>
                  <div className="mt-2 flex items-center text-[#007bff] bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="font-semibold">
                      {appraisal.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://services.appraisily.com"
            className="inline-flex items-center gap-2 rounded-md bg-[#007bff] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] transition-all duration-200"
          >
            Start Your Appraisal Now
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}