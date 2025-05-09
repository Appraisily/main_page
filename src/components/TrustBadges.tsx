import React from 'react';
import { Lock, Shield, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import '../styles/components/_trust-bar.scss';

interface TrustBadgesProps {
  className?: string;
}

export default function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <div className={cn("trust-bar", className)}>
      <div className="flex items-center gap-2">
        <Lock />
        <span>Secure Checkout</span>
      </div>
      <div className="flex items-center gap-2">
        <Shield />
        <span>USPAP-Certified</span>
      </div>
      <div className="flex items-center gap-2">
        <Award />
        <span>Established 2003</span>
      </div>
    </div>
  );
}