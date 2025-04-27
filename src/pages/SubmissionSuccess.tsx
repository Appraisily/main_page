import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight, LayoutDashboard, Loader2 } from 'lucide-react';
import { useStripeSession } from '@/hooks/useStripeSession';
import { Link } from 'react-router-dom';

export default function SubmissionSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id') || '';
  const { session, loading, error } = useStripeSession(sessionId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Appraisal Data Submitted Successfully
            </h1>
            
            <p className="text-gray-600 mb-8 max-w-md">
              Your appraisal data has been received. Our experts will begin analyzing your artwork shortly.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 w-full mb-8">
              <h2 className="font-semibold text-gray-900 mb-2">Reference Number</h2>
              <p className="font-mono text-gray-600">{sessionId}</p>
            </div>

            <div className="space-y-6">
              <p className="text-sm text-gray-600">
                Please keep this reference number for future correspondence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {loading ? (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : session?.customer_details?.email ? (
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors mr-4"
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    View in Dashboard
                  </Link>
                ) : error ? (
                  <p className="text-sm text-red-600">
                    Unable to load dashboard link. Please try again later.
                  </p>
                ) : null}
                <a
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Return to Home
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}