import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { restoreSession } from '@/lib/api/bulkUploadApi';
import type { BulkUploadResponse } from '@/lib/types/appraisal';

export default function SessionRestore() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<BulkUploadResponse | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    const loadSession = async () => {
      if (!sessionId) {
        setError('No session ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await restoreSession(sessionId);
        
        if (response.success) {
          setSession(response);
          // Redirect to upload page with session data
          navigate(`/bulk-appraisal/upload?session_id=${sessionId}`, {
            state: { session: response }
          });
        } else {
          throw new Error('Session not found or expired');
        }
      } catch (err) {
        console.error('Session restore error:', err);
        setError(err instanceof Error ? err.message : 'Failed to restore session');
        setIsLoading(false);
      }
    };

    loadSession();
  }, [sessionId, navigate, retryCount]);

  const handleRetry = () => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount(prev => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
              <h1 className="text-xl font-semibold text-gray-900 mb-2">
                Restoring Session
              </h1>
              <p className="text-gray-600 text-center max-w-md">
                Please wait while we restore your session data...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-red-100 p-3 mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 mb-4">
                Session Restore Failed
              </h1>
              <p className="text-gray-600 text-center mb-8 max-w-md">
                {error}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {retryCount < MAX_RETRIES && (
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Try Again
                  </button>
                )}
                <button
                  onClick={() => navigate('/bulk-appraisal')}
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Return to Bulk Appraisal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // Will redirect on successful restore
}