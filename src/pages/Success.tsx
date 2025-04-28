import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PaymentDetails from '@/components/PaymentDetails';
import AppraisalUploadForm from '@/components/upload/AppraisalUploadForm';
import { Upload, Package, CheckCircle2, UserCircle } from 'lucide-react';
import { useStripeSession } from '@/hooks/useStripeSession';
import { handleSuccessfulPayment } from '@/lib/stripe/handlePaymentSuccess';

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { session, loading } = useStripeSession(sessionId || '');
  const [accountStatus, setAccountStatus] = useState<{
    created: boolean;
    existing: boolean;
    error: string | null;
  }>({
    created: false,
    existing: false,
    error: null
  });
  
  // Only mark as bulk appraisal if we can definitively confirm it from the client reference ID
  const isBulkAppraisal = session && session.client_reference_id?.startsWith('bulk_');

  useEffect(() => {
    // Create a user account once we have a valid session ID
    if (sessionId && !loading && session) {
      const createAccount = async () => {
        try {
          const result = await handleSuccessfulPayment(sessionId);
          setAccountStatus({
            created: !!result.userCreated,
            existing: !!result.userExists,
            error: null
          });
        } catch (error) {
          console.error('Error creating account:', error);
          setAccountStatus({
            created: false,
            existing: false,
            error: 'Failed to create account'
          });
        }
      };
      
      createAccount();
    }
  }, [sessionId, loading, session]);

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
          {/* Enhanced Payment Details with Prominent Success Message */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="rounded-full bg-green-100 p-4 inline-flex mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Processed Successfully
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Thank you for choosing our appraisal service. Your payment has been confirmed.
              </p>
            </div>
            
            {/* Include payment details below */}
            <PaymentDetails sessionId={sessionId} />
          </div>

          {loading ? (
            <div className="bg-white rounded-lg p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            </div>
          ) : (
            <>
              {/* Account Creation Status */}
              {(accountStatus.created || accountStatus.existing) && (
                <div className="bg-white rounded-lg p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <UserCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {accountStatus.created ? 'Account Created' : 'Account Access'}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {accountStatus.created
                          ? 'We have created an account for you. Check your email for a link to set your password.'
                          : 'You can use your existing account to track this appraisal.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
          
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
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <div className="flex flex-col text-center items-center mb-8 pb-6 border-b">
                    <div className="p-3 bg-blue-100 rounded-full mb-4">
                      <Upload className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Upload Your Item Images
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Please provide clear photos of your item to help our experts with your appraisal
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