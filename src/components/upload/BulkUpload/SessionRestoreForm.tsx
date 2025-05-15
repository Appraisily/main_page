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
    <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-lg p-6 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-2">
        <KeySquare className="h-5 w-5 text-emerald-500" />
        <span className="font-semibold text-emerald-900 text-lg">Restore Previous Session</span>
      </div>
      <p className="text-sm text-emerald-700 mb-2">Have a session ID? Enter it below to restore your progress.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={restoreId}
          onChange={(e) => setRestoreId(e.target.value)}
          placeholder="Enter session ID..."
          className="input input-bordered flex-1 px-3 py-2 rounded-md border border-emerald-300 text-sm"
        />
        <button
          type="submit"
          disabled={isRestoring || !restoreId.trim()}
          className="btn btn-emerald inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
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
      </form>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}