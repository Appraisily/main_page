import React, { useState } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => Promise<void>;
  showConfirmation?: boolean;
}

export function EmailInput({ value, onChange, onBlur, showConfirmation }: EmailInputProps) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [showRestoreInfo, setShowRestoreInfo] = useState(false);

  const handleBlur = async () => {
    if (!value) return;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setStatus('error');
      setError('Please enter a valid email address');
      return;
    }

    setStatus('saving');
    setError(null);

    try {
      await onBlur();
      setStatus('success');
      setShowRestoreInfo(true);
      // Hide restore info after 5 seconds
      setTimeout(() => setShowRestoreInfo(false), 5000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to save email');
    }
  };

  return (
    <div className="mb-12">
      <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
        Email Address
      </label>
      <div className="relative">
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (status !== 'idle') {
              setStatus('idle');
              setError(null);
            }
          }}
          onBlur={handleBlur}
          placeholder="Enter your email address"
          className={cn(
            "w-full px-4 py-2 pr-10 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-colors",
            status === 'error' ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500",
            status === 'success' && "border-green-300 focus:border-green-500"
          )}
          required
          spellCheck="false"
          inputMode="email"
        />
        
        {/* Status Indicator */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {status === 'saving' && (
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
          )}
          {status === 'success' && (
            <Check className="h-5 w-5 text-green-600" />
          )}
          {status === 'error' && (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          {error}
        </p>
      )}

      {/* Success Message */}
      {(showConfirmation || showRestoreInfo) && (
        <div className="mt-2 p-3 bg-green-50 border border-green-100 rounded-lg">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <p className="text-sm text-green-700">
              A confirmation email has been sent with your session details. You can use the session ID to restore your progress later.
            </p>
          </div>
        </div>
      )}

      {/* Help Text */}
      <p className="mt-2 text-sm text-gray-500">
        We'll use this email to send you updates about your appraisal request
      </p>
    </div>
  );
}