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
      <div className="trust-bar__item">
        <Lock className="trust-bar__icon" />
        <span>Secure Checkout</span>
      </div>
      <span className="trust-bar__dot" />
      <div className="trust-bar__item">
        <Shield className="trust-bar__icon" />
        <span>USPAP-Certified</span>
      </div>
      <span className="trust-bar__dot" />
      <div className="trust-bar__item">
        <Award className="trust-bar__icon" />
        <span>Established 2003</span>
      </div>
    </div>
  );
}