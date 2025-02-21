import React, { useState } from 'react';
import { Loader2, RefreshCw, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SessionRestoreFormProps {
  onRestore: (id: string) => void;
}

export function SessionRestoreForm({ onRestore }: SessionRestoreFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [restoreId, setRestoreId] = useState('');
  const [isRestoring, setIsRestoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailHint, setShowEmailHint] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restoreId.trim()) return;

    setIsRestoring(true);
    setError(null);

    try {
      await onRestore(restoreId);
    } catch (err) {
      setError('Invalid session ID or session expired');
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        onMouseEnter={() => setShowEmailHint(true)}
        onMouseLeave={() => setShowEmailHint(false)}
      >
        <ChevronRight className={cn(
          "h-4 w-4 transition-transform",
          isExpanded && "rotate-90"
        )} />
        <span>Have a session ID? Click here to restore</span>
      </button>
      
      {showEmailHint && (
        <p className="mt-1 text-sm text-gray-500">
          Check your email for the session ID we sent when you started this upload
        </p>
      )}
      
      {isExpanded && (
        <form onSubmit={handleSubmit} className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={restoreId}
              onChange={(e) => setRestoreId(e.target.value)}
              placeholder="Enter session ID"
              className="flex-grow px-3 py-2 rounded-md border border-gray-300 text-sm"
            />
            <button
              type="submit"
              disabled={isRestoring || !restoreId.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {isRestoring ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Restoring...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Restore
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </form>
      )}
    </div>
  );
}