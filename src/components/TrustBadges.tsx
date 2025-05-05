import React from 'react';
import { Lock, BadgeCheck, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustBadgesProps {
  className?: string;
}

export default function TrustBadges({ className }: TrustBadgesProps) {
  const badges = [
    {
      icon: Lock,
      text: 'Secure Transaction',
      id: 'secure'
    },
    {
      icon: BadgeCheck,
      text: 'USPAP Certified',
      id: 'certified'
    },
    {
      icon: Building2,
      text: 'Established 2003',
      id: 'established'
    }
  ];

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="flex items-center justify-center w-full max-w-3xl mx-auto px-4 py-3 bg-gray-50 rounded-lg border border-gray-100">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <React.Fragment key={badge.id}>
              {index > 0 && (
                <div className="w-px h-8 bg-gray-200 mx-4" />
              )}
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700 font-medium">
                  {badge.text}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}