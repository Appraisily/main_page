import React, { useState } from 'react';
import { Save, Check, Copy } from 'lucide-react';

interface SessionInfoProps {
  sessionId: string;
}

export function SessionInfo({ sessionId }: SessionInfoProps) {
  const [copied, setCopied] = useState(false);

  const handleSave = async () => {
    try {
      // Copy just the session ID
      await navigator.clipboard.writeText(sessionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Failed to copy session ID:', err);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Current Session</h3>
          <p className="text-xs text-gray-500 mt-1">Save this ID to restore your progress later</p>
        </div>
        <div className="flex items-center gap-2">
          <code className="text-sm font-mono bg-white px-3 py-1.5 rounded-md border border-blue-200">
            {sessionId}
          </code>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
            title="Copy session ID to clipboard"
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
      </div>
    </div>
  );
}