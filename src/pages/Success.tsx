import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PaymentDetails from '@/components/PaymentDetails';
import AppraisalUploadForm from '@/components/upload/AppraisalUploadForm';
import { Upload } from 'lucide-react';

export default function Success() {
  const [searchParams] = useSearchParams();
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
        <div className="space-y-6">
          {/* Payment Details */}
          <PaymentDetails sessionId={sessionId} />

          {/* Upload Form Container */}
          <div className="bg-white rounded-lg p-8">
            {/* Title Section */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b">
              <div className="p-3 bg-primary/10 rounded-full">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Upload Your Artwork Images
                </h2>
              </div>
            </div>

            {/* Upload Form */}
            <AppraisalUploadForm sessionId={sessionId} />
          </div>
        </div>
      </div>
    </div>
  );
}