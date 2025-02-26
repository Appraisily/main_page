import React from 'react';
import { Award, Star, Globe } from 'lucide-react';
import { IMAGES } from '../lib/images';

interface AppraiserProfileProps {
  name: string;
  title: string;
  image: string;
  badges: Array<{
    icon: React.ElementType;
    text: string;
  }>;
}

export default function AppraiserProfile({
  name,
  title,
  image,
  badges
}: AppraiserProfileProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Expert Profile */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <p className="text-blue-600">{title}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-4">
        {badges.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <Icon className="h-5 w-5 text-blue-600" />
            <span className="text-gray-700">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}