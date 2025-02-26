import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function MainGallery() {
  const featuredItems = [
    {
      id: 1,
      title: "19th Century Oil Painting",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?auto=format&fit=crop&q=80&w=800&h=600",
      category: "Fine Art",
      price: "$12,500"
    },
    {
      id: 2,
      title: "Art Deco Diamond Ring",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800&h=600",
      category: "Jewelry",
      price: "$8,900"
    },
    {
      id: 3,
      title: "Vintage Rolex Submariner",
      image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800&h=600",
      category: "Watches",
      price: "$15,750"
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-blue-600 mb-2">{item.category}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">{item.price}</span>
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