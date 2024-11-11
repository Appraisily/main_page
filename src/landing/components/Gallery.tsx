import React from 'react';
import { ArrowRight } from 'lucide-react';

const items = [
  {
    id: 1,
    title: "Impressionist Landscape",
    artist: "Claude Monet",
    image: "https://ik.imagekit.io/appraisily/WebPage/gallery1.jpg?updatedAt=1731365708280",
    price: "$285,000"
  },
  {
    id: 2,
    title: "Art Nouveau Vase",
    artist: "Émile Gallé",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=400&h=300",
    price: "$18,500"
  },
  {
    id: 3,
    title: "Vintage Cartier Watch",
    artist: "Cartier",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=400&h=300",
    price: "$12,800"
  },
  {
    id: 4,
    title: "Ming Dynasty Vase",
    artist: "Unknown",
    image: "https://images.unsplash.com/photo-1567696911980-2c669aad0592?auto=format&fit=crop&q=80&w=400&h=300",
    price: "$156,000"
  }
];

export default function Gallery() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Recent Appraisals
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Browse through our latest professional valuations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.artist}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium">{item.price}</span>
                  <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View Details <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}