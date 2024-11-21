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
      <div className="inline-flex items-center gap-4 text-sm text-muted-foreground">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <React.Fragment key={badge.id}>
              {index > 0 && (
                <div className="hidden sm:block w-px h-4 bg-gray-200" />
              )}
              <div className={cn(
                "flex items-center gap-2",
                index > 0 && "hidden sm:flex"
              )}>
                <Icon className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500 font-normal">
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