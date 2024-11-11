import React, { useState } from 'react';
import { ExternalLink, DollarSign, ArrowRight, AlertCircle } from 'lucide-react';
import gallery1 from '../images/gallery1.jpg';
import gallery2 from '../images/gallery2.jpg';
import gallery3 from '../images/gallery3.jpg';
import gallery4 from '../images/gallery4.jpg';
import gallery5 from '../images/gallery5.jpg';
import gallery6 from '../images/gallery6.jpg';

const appraisals = [
  {
    id: 1,
    image: gallery1,
    title: "Surrealist Abstract by Tom Kidd",
    description: "Original hand-made surrealist abstract painting by Tom Kidd (B.1955). Renowned for his fine quality work, Kidd's piece was directly purchased from the artist and was featured as a book cover.",
    value: 2200,
    url: "https://www.appraisily.com/appraisals/1-9/"
  },
  {
    id: 2,
    image: gallery2,
    title: "17th Century Dutch Portrait",
    description: "Early to mid 17th-century painting attributed to Dutch Golden Age painter Frans Hals the Elder. Features a dignified individual seated with a possible string instrument, adorned in period clothing.",
    value: 85000,
    url: "https://www.appraisily.com/appraisals/1-8/"
  },
  {
    id: 3,
    image: gallery3,
    title: "Adriaen Brouwer Tavern Scene",
    description: "17th century Dutch tavern interior by Flemish master Adriaen Brouwer (c. 1605 – 1638). Known for his unique style and mastery of chiaroscuro, displaying fantastic imagination with mysterious luminosity.",
    value: 6000,
    url: "https://www.appraisily.com/appraisals/1-7/"
  },
  {
    id: 4,
    image: gallery4,
    title: "Forest Scene by Himmy",
    description: "Mid to late 20th century oil painting by German artist Himmy, depicting a serene forest path with two figures. Features tranquil earthy tones and masterful composition.",
    value: 800,
    url: "https://www.appraisily.com/appraisals/1-6/"
  },
  {
    id: 5,
    image: gallery5,
    title: "Sunrise Dancers Holbein",
    description: "Contemporary piece by Patrice Le Pera depicting traditional dancers at dawn. Women in traditional attire carry green plants through a vibrant landscape, symbolizing community and tradition.",
    value: 7000,
    url: "https://www.appraisily.com/appraisals/1-4/"
  },
  {
    id: 6,
    image: gallery6,
    title: "Designer Life by Wiley Ross",
    description: "36×24 oil on glass painting with back light illumination by Springfield artist Wiley Ross. Modern portrait with abstract elements against vibrant red and orange background.",
    value: 5800,
    url: "https://www.appraisily.com/appraisals/1-3/"
  }
];

export default function Gallery() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Recent Appraisals
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Browse through our recently completed appraisals to see examples of our detailed valuations and expertise.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {appraisals.map((appraisal) => (
            <a
              key={appraisal.id}
              href={appraisal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[3/2]">
                {!imageErrors[appraisal.id] ? (
                  <img
                    src={appraisal.image}
                    alt={appraisal.title}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    onError={() => handleImageError(appraisal.id)}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-200">
                    <AlertCircle className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 p-6 w-full">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#007bff] transition-colors line-clamp-1">
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
    </div>
  );
}