import React, { useState } from 'react';
import { Check, Loader2, AlertCircle, Mail } from 'lucide-react';
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
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-gray-100 rounded-md">
          <Mail className="h-4 w-4 text-gray-600" />
        </div>
        <label htmlFor="email" className="text-base font-medium text-gray-900" style={{ fontFamily: 'ui-serif, Georgia, Cambria, serif' }}>
          Email Address
        </label>
      </div>
      
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
            "w-full px-4 py-3 pr-10 rounded-lg border focus:outline-none focus:ring-2 transition-colors",
            status === 'error' ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gray-500 focus:ring-gray-200",
            status === 'success' && "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-200"
          )}
          required
          spellCheck="false"
          inputMode="email"
        />
        
        {/* Status Indicator */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {status === 'saving' && (
            <Loader2 className="h-5 w-5 text-gray-600 animate-spin" />
          )}
          {status === 'success' && (
            <Check className="h-5 w-5 text-emerald-600" />
          )}
          {status === 'error' && (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-red-600">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {(showConfirmation || showRestoreInfo) && (
        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <p className="text-sm text-emerald-800">
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