import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PaymentDetails from '@/components/PaymentDetails';
import AppraisalUploadForm from '@/components/upload/AppraisalUploadForm';
import { Upload, Package, CheckCircle2 } from 'lucide-react';
import { useStripeSession } from '@/hooks/useStripeSession';

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { session, loading } = useStripeSession(sessionId || '');
  
  // Only mark as bulk appraisal if we can definitively confirm it from the client reference ID
  const isBulkAppraisal = session && session.client_reference_id?.startsWith('bulk_');

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

          {loading ? (
            <div className="bg-white rounded-lg p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            </div>
          ) : (
            <>
              {/* Success Message */}
              <div className="bg-white rounded-lg p-8">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b">
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Payment Successful
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Thank you for choosing our appraisal service
                    </p>
                  </div>
                </div>
              </div>
          
              {/* Conditional Content Based on Appraisal Type */}
              {isBulkAppraisal ? (
                <div className="bg-white rounded-lg p-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Bulk Appraisal Processing
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Your bulk appraisal request has been received. Our experts will begin processing your items shortly.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8">
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Upload className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Upload Your Artwork Images
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Please provide clear photos of your item for appraisal
                      </p>
                    </div>
                  </div>
                  <AppraisalUploadForm sessionId={sessionId} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}