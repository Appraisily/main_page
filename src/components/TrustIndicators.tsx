import React from 'react';
import { Star, Shield, Users, Award } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface TrustIndicatorProps {
  className?: string;
}

export default function TrustIndicators({ className }: TrustIndicatorProps) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-3", className)}>
      {/* Google Reviews Rating */}
      <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100/50 px-4 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            alt="Google"
            className="h-5 w-auto"
            loading="eager"
            width="92"
            height="30"
          />
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="h-3.5 w-3.5 fill-[#fbbc04] text-[#fbbc04]" 
                aria-hidden="true"
              />
            ))}
            <span className="ml-1.5 text-sm font-medium text-gray-900">4.8/5</span>
          </div>
        </div>
        <Separator orientation="vertical" className="h-5 bg-gray-200" />
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-900">100+ Reviews</span>
        </div>
      </div>

      {/* Certifications */}
      <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100/50 px-4 py-2 shadow-sm">
        <div className="flex items-center gap-1.5">
          <Award className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-900">USPAP Certified</span>
        </div>
        <Separator orientation="vertical" className="h-5 bg-gray-200" />
        <div className="flex items-center gap-1.5">
          <Shield className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-900">Expert Appraisers</span>
        </div>
      </div>
    </div>
  );
}