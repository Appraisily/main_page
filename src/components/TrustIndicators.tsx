import React from 'react';
import { Star, Shield, Users, Award } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface TrustIndicatorProps {
  className?: string;
}

export default function TrustIndicators({ className }: TrustIndicatorProps) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-4", className)}>
      {/* Trustpilot Rating */}
      <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-sm border border-gray-100/50">
        <div className="flex items-center gap-2">
          <img
            src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-black.svg"
            alt="Trustpilot"
            className="h-5"
            loading="eager"
            width="80"
            height="20"
          />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="h-4 w-4 fill-[#00b67a] text-[#00b67a]" 
                aria-hidden="true"
              />
            ))}
            <span className="ml-2 text-sm font-medium text-gray-900">4.9/5</span>
          </div>
        </div>
        <Separator orientation="vertical" className="h-8 bg-gray-200" />
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-900">100+ Reviews</span>
        </div>
      </div>

      {/* Certifications */}
      <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-sm border border-gray-100/50">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-900">USPAP Certified</span>
        </div>
        <Separator orientation="vertical" className="h-8 bg-gray-200" />
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-900">Expert Appraisers</span>
        </div>
      </div>
    </div>
  );
}