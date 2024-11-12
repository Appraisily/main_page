import React from 'react';

interface PanelProps {
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
}

export default function Panel({ title, description, image, icon: Icon }: PanelProps) {
  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-105">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg hover:shadow-blue-100 transition-all duration-300 w-64 group border border-gray-200">
        <div className="flex items-center gap-3">
          {/* Image Container */}
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/10 group-hover:to-black/5 transition-colors"></div>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              {title}
              <Icon className="h-5 w-5 text-blue-600" />
            </h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}