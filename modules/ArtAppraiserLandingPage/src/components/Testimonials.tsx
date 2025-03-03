import React from 'react';
import { Star } from 'lucide-react';

const getImageUrl = (url: string) => {
  const isMobile = window.innerWidth <= 768;
  const width = isMobile ? 400 : 800;
  const height = Math.round(width * 0.75); // Maintain aspect ratio
  const quality = isMobile ? 60 : 70;
  return `${url}?tr=w-${width},h-${height},q-${quality}`;
};

const reviews = [
  {
    id: 1,
    image: "https://ik.imagekit.io/appraisily/WebPage/review1.jpg",
    author: "Sarah M.",
    rating: 5,
    text: "Exceptional service! The appraisal was thorough and professional. Highly recommend!"
  },
  {
    id: 2,
    image: "https://ik.imagekit.io/appraisily/WebPage/review2.jpg",
    author: "James R.",
    rating: 5,
    text: "Quick turnaround and very detailed report. Worth every penny!"
  },
  {
    id: 3,
    image: "https://ik.imagekit.io/appraisily/WebPage/review3.jpg",
    author: "Emily K.",
    rating: 5,
    text: "The expertise and attention to detail was impressive. Great communication throughout."
  },
  {
    id: 4,
    image: "https://ik.imagekit.io/appraisily/WebPage/review4.jpg",
    author: "Michael P.",
    rating: 5,
    text: "Very professional service. The report exceeded my expectations!"
  },
  {
    id: 5,
    image: "https://ik.imagekit.io/appraisily/WebPage/review5.jpg",
    author: "Lisa T.",
    rating: 5,
    text: "Fantastic experience from start to finish. Highly knowledgeable team!"
  },
  {
    id: 6,
    image: "https://ik.imagekit.io/appraisily/WebPage/review6.jpg",
    author: "David W.",
    rating: 5,
    text: "The most comprehensive art appraisal service I've used. Excellent value!"
  }
];

export default function Testimonials() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Collectors Worldwide
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            See what our clients say about our appraisal services
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center gap-x-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <img
                  src={getImageUrl(review.image)}
                  alt={`${review.author}'s review`}
                  className="mt-6 rounded-lg shadow-sm w-full h-auto"
                  loading="lazy"
                  decoding="async"
                  width={window.innerWidth <= 768 ? "400" : "800"}
                  height={window.innerWidth <= 768 ? "300" : "600"}
                />
                <p className="mt-6 text-base leading-7 text-gray-600">"{review.text}"</p>
              </div>
              <div className="mt-8 border-t border-gray-100 pt-6">
                <p className="text-sm font-semibold text-gray-900">{review.author}</p>
                <div className="mt-1 flex items-center gap-x-2">
                  <span className="text-sm text-gray-500">Verified Review</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="https://appraisily.com/start"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span className="text-sm font-semibold">Start Your Appraisal</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}