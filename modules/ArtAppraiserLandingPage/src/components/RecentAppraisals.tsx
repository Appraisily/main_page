import React from 'react';
import { DollarSign, ArrowRight, TrendingUp, History } from 'lucide-react';

const getImageUrl = (url: string) => {
  const isMobile = window.innerWidth <= 768;
  const width = isMobile ? 400 : 800;
  const height = Math.round(width * 0.75); // Maintain aspect ratio
  const quality = isMobile ? 60 : 70;
  return `${url}?tr=w-${width},h-${height},q-${quality}`;
};

const cases = [
  {
    id: 1,
    image: "https://ik.imagekit.io/appraisily/WebPage/gallery1.jpg",
    title: "Surrealist Abstract by Tom Kidd",
    description: "Original hand-made surrealist abstract painting by Tom Kidd (B.1955). Renowned for his fine quality work, Kidd's piece was directly purchased from the artist and was featured as a book cover.",
    initialEstimate: "$800",
    finalValue: "$2,200",
    url: "https://www.appraisily.com/appraisals/1-9/"
  },
  {
    id: 2,
    image: "https://ik.imagekit.io/appraisily/WebPage/gallery2.jpg",
    title: "17th Century Dutch Portrait",
    description: "Early to mid 17th-century painting attributed to Dutch Golden Age painter Frans Hals the Elder. Features a dignified individual seated with a possible string instrument, adorned in period clothing.",
    initialEstimate: "Unknown",
    finalValue: "$85,000",
    url: "https://www.appraisily.com/appraisals/1-8/"
  },
  {
    id: 3,
    image: "https://ik.imagekit.io/appraisily/WebPage/gallery3.jpg",
    title: "Adriaen Brouwer Tavern Scene",
    description: "17th century Dutch tavern interior by Flemish master Adriaen Brouwer (c. 1605 – 1638). Known for his unique style and mastery of chiaroscuro.",
    initialEstimate: "$2,000",
    finalValue: "$6,000",
    url: "https://www.appraisily.com/appraisals/1-7/"
  },
  {
    id: 4,
    image: "https://ik.imagekit.io/appraisily/WebPage/gallery4.jpg",
    title: "Forest Scene by Himmy",
    description: "Mid to late 20th century oil painting by German artist Himmy, depicting a serene forest path with two figures. Features tranquil earthy tones and masterful composition.",
    initialEstimate: "$300",
    finalValue: "$800",
    url: "https://www.appraisily.com/appraisals/1-6/"
  },
  {
    id: 5,
    image: "https://ik.imagekit.io/appraisily/WebPage/gallery5.jpg",
    title: "Sunrise Dancers Holbein",
    description: "Contemporary piece by Patrice Le Pera depicting traditional dancers at dawn. Women in traditional attire carry green plants through a vibrant landscape.",
    initialEstimate: "$3,500",
    finalValue: "$7,000",
    url: "https://www.appraisily.com/appraisals/1-4/"
  },
  {
    id: 6,
    image: "https://ik.imagekit.io/appraisily/WebPage/gallery6.jpg",
    title: "Designer Life by Wiley Ross",
    description: "36×24 oil on glass painting with back light illumination by Springfield artist Wiley Ross. Modern portrait with abstract elements against vibrant red and orange background.",
    initialEstimate: "$2,500",
    finalValue: "$5,800",
    url: "https://www.appraisily.com/appraisals/1-3/"
  }
];

export default function RecentAppraisals() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Recent Appraisals
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Browse through our latest professional valuations to see examples of our detailed analysis and expertise.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {cases.map((case_) => (
            <a
              key={case_.id}
              href={case_.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="relative flex-shrink-0 overflow-hidden">
                <img
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={getImageUrl(case_.image)}
                  alt={case_.title}
                  loading="lazy"
                  width={window.innerWidth <= 768 ? "400" : "800"}
                  height={window.innerWidth <= 768 ? "300" : "600"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4 text-white/80" />
                      <span className="text-sm text-white/80">Initial: {case_.initialEstimate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">Final: {case_.finalValue}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {case_.title}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mt-4 text-gray-600 line-clamp-3">{case_.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="https://appraisily.com/start"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-primary/90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
          >
            Get Your Artwork Appraised
            <DollarSign className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}