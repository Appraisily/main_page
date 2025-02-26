import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      author: "Sarah Johnson",
      role: "Art Collector",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "The appraisal was thorough and professional. The detailed report helped me understand the true value of my collection.",
      rating: 5
    },
    {
      author: "Michael Chen",
      role: "Gallery Owner",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "Exceptional service! The team's expertise in contemporary art is outstanding. Their valuation helped secure proper insurance coverage.",
      rating: 5
    },
    {
      author: "Emma Thompson",
      role: "Estate Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "Quick, reliable, and extremely knowledgeable. The online process was seamless and the results exceeded expectations.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Trusted by collectors, galleries, and institutions worldwide
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.author}
              className="relative flex flex-col gap-6 rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200"
            >
              <div className="flex items-center gap-x-4">
                <img
                  src={review.image}
                  alt={review.author}
                  className="h-12 w-12 rounded-full bg-gray-50"
                />
                <div>
                  <div className="font-semibold">{review.author}</div>
                  <div className="text-gray-600">{review.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-x-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-gray-200" />
                <p className="relative z-10 text-gray-600 pl-6">
                  {review.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            See more reviews <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}