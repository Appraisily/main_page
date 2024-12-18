import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentDetails from '@/components/PaymentDetails';
import AppraisalUploadForm from '@/components/upload/AppraisalUploadForm';
import { Shield } from 'lucide-react';

export default function Success() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');

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

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-lg p-8">
          {/* Payment Details */}
          <PaymentDetails sessionId={sessionId} />

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