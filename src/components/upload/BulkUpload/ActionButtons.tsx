import React from 'react';
import { Loader2, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isUploading: boolean;
  disabled: boolean;
}

export function ActionButtons({ onCancel, onSubmit, isUploading, disabled }: ActionButtonsProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        <X className="h-4 w-4" />
        <span>Cancel</span>
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled || isUploading}
        className={cn(
          "px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
          "bg-gray-800 text-white hover:bg-gray-900",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800",
          "shadow-sm hover:shadow"
        )}
      >
        {isUploading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Redirecting to Checkout...</span>
          </>
        ) : (
          <>
            <span>Continue to Checkout</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}