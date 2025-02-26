import React from 'react';
import { Paintbrush, Frame, Clock, Diamond, Palette, Camera, Coins, Coffee } from 'lucide-react';

export default function CategoryNav() {
  const categories = [
    { name: 'Fine Art', icon: Paintbrush },
    { name: 'Antique Frames', icon: Frame },
    { name: 'Vintage Watches', icon: Clock },
    { name: 'Jewelry', icon: Diamond },
    { name: 'Modern Art', icon: Palette },
    { name: 'Photography', icon: Camera },
    { name: 'Coins', icon: Coins },
    { name: 'Collectibles', icon: Coffee },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between overflow-x-auto py-4 -mb-px space-x-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <a
                key={category.name}
                href={`#${category.name.toLowerCase().replace(' ', '-')}`}
                className="group flex flex-col items-center text-sm font-medium text-gray-500 hover:text-blue-600 whitespace-nowrap pb-4 border-b-2 border-transparent hover:border-blue-600"
              >
                <IconComponent className="h-6 w-6 mb-2 group-hover:text-blue-600" />
                {category.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}