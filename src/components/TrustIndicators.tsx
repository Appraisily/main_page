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
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Google">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
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