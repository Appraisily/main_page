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
    <div className="flex-1 bg-white border border-gray-200 rounded-lg p-2 mb-2 sm:p-4 sm:mb-4">
      <div className="flex items-center gap-2 mb-2">
        <KeyRound className="h-4 w-4 text-gray-500" />
        <span className="font-medium text-gray-700 text-sm">Current Session</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono bg-gray-50 border border-gray-200 rounded px-2 py-1 text-gray-700 text-xs flex-1 truncate">{sessionId}</span>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          title="Copy session details to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-gray-500" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </button>
      </div>
      <p className="text-xs text-gray-500">Save this ID to restore your progress later.</p>
    </div>
  );
}

<style jsx>{`
  @media (max-width: 640px) {
    .session-panel-mobile {
      padding: 0.5rem 0.5rem !important;
      margin-bottom: 0.5rem !important;
    }
  }
`}</style>