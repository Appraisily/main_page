import React, { useState } from 'react';
import { Loader2, RefreshCw, ChevronRight, KeySquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SessionRestoreFormProps {
  onRestore: (id: string) => void;
}

export function SessionRestoreForm({ onRestore }: SessionRestoreFormProps) {
  const [restoreId, setRestoreId] = useState('');
  const [isRestoring, setIsRestoring] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-1">
        <KeySquare className="h-4 w-4 text-gray-500" />
        <span className="font-medium text-gray-700 text-sm">Restore Previous Session</span>
      </div>
      <p className="text-xs text-gray-500 mb-2">Have a session ID? Enter it below to restore your progress.</p>
      <form onSubmit={handleSubmit} className="flex gap-1">
        <input
          type="text"
          value={restoreId}
          onChange={(e) => setRestoreId(e.target.value)}
          placeholder="Enter session ID..."
          className="flex-1 px-3 py-1 rounded-md border border-gray-200 text-xs"
        />
        <button
          type="submit"
          disabled={isRestoring || !restoreId.trim()}
          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-200 disabled:opacity-50 text-xs font-medium"
        >
          {isRestoring ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Restoring...</span>
            </>
          ) : (
            <>
              <RefreshCw className="h-3 w-3" />
              <span>Restore</span>
            </>
          )}
        </button>
      </form>
      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}