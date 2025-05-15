import React, { useState } from 'react';
import { Save, Check, Copy, KeyRound } from 'lucide-react';

interface SessionInfoProps {
  sessionId: string;
}

export function SessionInfo({ sessionId }: SessionInfoProps) {
  const [copied, setCopied] = useState(false);

  const handleSave = async () => {
    try {
      // Get current session data from localStorage
      const sessionData = localStorage.getItem('bulkAppraisalSession');
      if (!sessionData) return;

      // Create a formatted version for sharing
      const data = JSON.parse(sessionData);
      const shareData = {
        sessionId: data.sessionId,
        itemCount: data.items?.length || 0,
        savedAt: new Date().toISOString(),
        restoreUrl: `${window.location.origin}/bulk-appraisal/upload?session_id=${data.sessionId}`
      };

      // Copy to clipboard
      await navigator.clipboard.writeText(JSON.stringify(shareData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to save session:', err);
    }
  };

  return (
    <div className="flex-1 bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-2">
        <KeyRound className="h-5 w-5 text-blue-500" />
        <span className="font-semibold text-blue-900 text-lg">Current Session</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono bg-white border border-blue-100 rounded px-2 py-1 text-blue-800 text-base">{sessionId}</span>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
          title="Save session details to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-gray-600" />
              <span className="text-sm">Copy</span>
            </>
          )}
        </button>
      </div>
      <p className="text-sm text-blue-700">Save this ID to restore your progress later.</p>
    </div>
  );
}