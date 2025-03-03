import React from 'react';
import { Shield, Award, Star, Clock } from 'lucide-react';

const trustIndicators = [
  {
    icon: Star,
    text: '4.9/5 Rating',
    subtext: '2,000+ Reviews'
  },
  {
    icon: Shield,
    text: 'USPAP Certified',
    subtext: 'Industry Standard'
  },
  {
    icon: Award,
    text: 'ISA Member',
    subtext: 'Certified Experts'
  },
  {
    icon: Clock,
    text: '24-48h Turnaround',
    subtext: 'Fast Service'
  }
];

const TrustBar: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border-t border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {trustIndicators.map((indicator) => (
            <div
              key={indicator.text}
              className="flex items-center justify-center gap-3 text-white/90"
            >
              <indicator.icon className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <div className="font-semibold">{indicator.text}</div>
                <div className="text-white/70 text-xs">{indicator.subtext}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;