import React from 'react';
import { Lock, Shield, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustBadgesProps {
  className?: string;
}

export default function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <div className={cn("py-3", className)}>
      <div className="flex justify-center items-center gap-8 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Lock className="h-4 w-4 text-gray-500" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield className="h-4 w-4 text-gray-500" />
          <span>USPAP-Certified</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Award className="h-4 w-4 text-gray-500" />
          <span>Established 2003</span>
        </div>
      </div>
    </div>
  );
}