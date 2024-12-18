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
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            className="h-4"
            loading="eager"
            width="64"
            height="16"
          />
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "h-3.5 w-3.5",
                  i < 4 ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-[#fbbc04]/50 text-[#fbbc04]/50"
                )}
                aria-hidden="true"
              />
            ))}
            <span className="ml-1.5 text-sm font-medium text-gray-900">4.8/5</span>
          </div>
        </div>
        <Separator orientation="vertical" className="h-5 bg-gray-200" />
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-900">50+ Reviews</span>
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