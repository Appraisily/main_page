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
      <div className="flex items-center justify-center py-3">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600 mr-2" />
        <p className="text-sm text-gray-600">Loading payment details...</p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
        <div>
          <p className="text-red-700 text-sm">{error || 'Failed to load payment details'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-100 pt-4">
      <div className="space-y-3">
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
  );
}