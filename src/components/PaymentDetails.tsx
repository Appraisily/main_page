import React, { useEffect } from 'react';
import { useStripeSession } from '@/hooks/useStripeSession';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { hashEmail } from '@/lib/analytics';

interface PaymentDetailsProps {
  sessionId: string;
}

export default function PaymentDetails({ sessionId }: PaymentDetailsProps) {
  const { session, loading, error } = useStripeSession(sessionId);

  // Push analytics data when session is loaded
  useEffect(() => {
    async function pushAnalytics() {
      if (session?.customer.email) {
        const emailHash = await hashEmail(session.customer.email);
        
        window.dataLayer?.push({
          event: 'purchase_complete',
          ecommerce: {
            transaction_id: sessionId,
            value: session.amount_total / 100,
            currency: session.currency,
            items: [{
              item_name: 'Art Appraisal Service',
              price: session.amount_total / 100
            }]
          },
          customer_data: {
            email_hash: emailHash,
            name: session.customer.name
          }
        });
      }
    }

    if (session) {
      pushAnalytics();
    }
  }, [session, sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
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
    <div className="rounded-lg border border-green-100 bg-white p-6 mb-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-green-50 p-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Payment Successful
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">Thank you, <span className="font-medium text-gray-900">{session.customer.name}</span>, for your appraisal request.</p>
            <div className="flex flex-col gap-1.5 text-sm">
              <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="text-gray-500">Amount paid</span>
                <span className="font-medium text-gray-900">${session.amount_total / 100} {session.currency.toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-gray-900">{session.customer.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}