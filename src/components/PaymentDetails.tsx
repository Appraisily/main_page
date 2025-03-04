import React, { useEffect } from 'react';
import { useStripeSession } from '@/hooks/useStripeSession';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/text'; 

interface PaymentDetailsProps {
  sessionId: string; 
}

export default function PaymentDetails({ sessionId }: PaymentDetailsProps) {
  const { session, loading, error } = useStripeSession(sessionId);

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-6 mb-8 shadow-sm">
        <div className="flex flex-col items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-4 text-sm text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex items-center gap-3 p-8 bg-red-50 rounded-lg mb-8">
        <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-red-900">Failed to load payment details</h3>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-green-100 bg-white p-8 mb-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-green-50 p-3">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Payment Processed Successfully
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Amount paid</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(session.amount_total, session.currency)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Name</span>
              <span className="text-gray-900">
                {session.customer_details?.name || 'N/A'}
              </span>
            </div>
            {session.metadata?.items_count && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Items</span>
                <span className="text-gray-900">
                  {session.metadata.items_count}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}