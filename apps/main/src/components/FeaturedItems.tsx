import React from 'react';
import { Star } from 'lucide-react';

export default function FeaturedItems() {
  const items = [
    {
      id: 1,
      title: "Impressionist Landscape",
      artist: "Claude Monet",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=400&h=300",
      price: "$285,000",
      rating: 5
    },
    {
      id: 2,
      title: "Art Nouveau Vase",
      artist: "Émile Gallé",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=400&h=300",
      price: "$18,500",
      rating: 5
    },
    {
      id: 3,
      title: "Vintage Cartier Watch",
      artist: "Cartier",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=400&h=300",
      price: "$12,800",
      rating: 5
    },
    {
      id: 4,
      title: "Ming Dynasty Vase",
      artist: "Unknown",
      image: "https://images.unsplash.com/photo-1567696911980-2c669aad0592?auto=format&fit=crop&q=80&w=400&h=300",
      price: "$156,000",
      rating: 5
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="flex items-center">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}