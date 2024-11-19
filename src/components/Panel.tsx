import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PanelProps {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  name: string;
}

export default function Panel({ title, description, image, icon: Icon, name }: PanelProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 flex items-center gap-2">
            {name}
            <Icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
          </h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}