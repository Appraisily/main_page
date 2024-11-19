import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PanelProps {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  name: string;
  position: {
    x: number;
    y: number;
  };
}

export default function Panel({ title, description, image, icon: Icon, name, position }: PanelProps) {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-105"
      style={{
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
      }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg hover:shadow-blue-100 transition-all duration-300 w-64 group border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/10 group-hover:to-black/5 transition-colors"></div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              {name}
              <Icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>

      <div
        className="absolute top-1/2 left-1/2 -z-10"
        style={{
          width: Math.abs(position.x),
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.2))',
          transform: `rotate(${Math.atan2(position.y, position.x) * (180 / Math.PI)}deg)`,
          transformOrigin: position.x > 0 ? 'left' : 'right'
        }}
        aria-hidden="true"
      />
    </div>
  );
}