import React from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionButtonsProps {
  onSubmit: () => void;
  isUploading: boolean;
  disabled: boolean;
}

export function ActionButtons({ onSubmit, isUploading, disabled }: ActionButtonsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Primary action button - styled like start page */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled || isUploading}
        className={cn(
          "w-full px-6 py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
          "bg-gray-900 text-white hover:bg-gray-800",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900",
          "shadow-sm hover:shadow-md text-base"
        )}
      >
        {isUploading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>Continue → Secure Payment</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </>
        )}
      </button>
    </div>
  );
}