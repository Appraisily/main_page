import React from 'react';
import { Loader2 } from 'lucide-react';

interface ActionButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isUploading: boolean;
  disabled: boolean;
}

export function ActionButtons({ onCancel, onSubmit, isUploading, disabled }: ActionButtonsProps) {
  return (
    <div className="flex justify-end gap-4">
      <button
        onClick={onCancel}
        className="px-6 py-2 text-gray-700 hover:text-gray-900"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        disabled={disabled || isUploading}
        className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            Redirecting to Checkout...
          </>
        ) : (
          'Continue to Checkout'
        )}
      </button>
    </div>
  );
}