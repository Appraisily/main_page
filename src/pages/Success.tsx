import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, Loader2, AlertCircle } from 'lucide-react';
import { useStripeSession } from '@/hooks/useStripeSession';
import PaymentDetails from '@/components/PaymentDetails';
import AppraisalUploadForm from '@/components/upload/AppraisalUploadForm';

export default function Success() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');
  const { session, loading: sessionLoading, error: sessionError } = useStripeSession(sessionId);

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Invalid Session
            </h1>
            <p className="text-gray-600">
              Please return to the payment page and try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-lg p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-gray-600">Loading payment details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (sessionError) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-lg p-8">
            <div className="flex flex-col items-center justify-center gap-4 text-red-600">
              <AlertCircle className="h-8 w-8" />
              <p>Failed to load payment details. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-lg p-8 relative">
          {/* Payment Details */}
          {session && <PaymentDetails sessionId={sessionId} />}

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Upload Your Artwork Images
            </h1>
          </div>

          {/* Upload Form */}
          <AppraisalUploadForm sessionId={sessionId} />
        </div>
      </div>
    </div>
  );
}