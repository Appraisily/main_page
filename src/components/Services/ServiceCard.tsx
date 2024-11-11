import React from 'react';
import { LucideIcon, Play } from 'lucide-react';

interface ServiceFeature {
  text: string;
  icon: LucideIcon;
}

interface ServiceAction {
  type: 'video';
  videoId: string;
  title: string;
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  features: ServiceFeature[];
  action: ServiceAction;
  onActionClick: () => void;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  image,
  features,
  onActionClick
}: ServiceCardProps) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <Icon className="h-8 w-8 text-[#007bff]" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-4 text-gray-600 flex-grow">{description}</p>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => {
          const FeatureIcon = feature.icon;
          return (
            <li key={feature.text} className="flex items-start gap-2">
              <FeatureIcon className="h-5 w-5 text-[#007bff] mt-1" />
              <span className="text-gray-700">{feature.text}</span>
            </li>
          );
        })}
      </ul>
      <button
        onClick={onActionClick}
        className="mt-8 rounded-md bg-[#007bff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0056b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007bff] flex items-center justify-center gap-2"
      >
        <Play className="h-4 w-4" />
        Watch Service Overview
      </button>
    </div>
  );
}