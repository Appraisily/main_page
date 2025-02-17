import { useState, useEffect, useRef } from 'react';
import { hashEmail } from '@/lib/analytics';
import { StripeSessionResponse } from '@/lib/types/stripe';

export function useStripeSession(sessionId: string | null) {
  const [session, setSession] = useState<StripeSessionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const fetchController = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setSession(null);
      return;
    }

    // Abort previous fetch if it exists
    if (fetchController.current) {
      fetchController.current.abort();
    }

    // Create new abort controller for this fetch
    fetchController.current = new AbortController();

    async function fetchSession() {
      setLoading(true);
      setError(undefined);
      const controller = new AbortController();
      fetchController.current = controller;

      try {
        const response = await fetch(
          `https://payment-processor-856401495068.us-central1.run.app/stripe/session/${sessionId}`,
          {
            headers: {
              'x-shared-secret': import.meta.env.VITE_STRIPE_SHARED_SECRET || '',
              'Content-Type': 'application/json'
            },
            signal: controller.signal
          }
        );
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch session: ${response.status} - ${errorText}`);
        }
        const stripeSession = await response.json();

        if (!stripeSession) {
          throw new Error('Session not found');
        }

        // Transform the response to match our expected format
        const transformedSession: StripeSessionResponse = {
          event: 'conversion',
          customer_details: {
            email: stripeSession.email
          },
          transactionTotal: stripeSession.amount_total || 0,
          transactionId: stripeSession.id,
          transactionCurrency: stripeSession.currency || 'usd',
          userEmail: stripeSession.email,
          userFirstName: stripeSession.customer_details?.name?.split(' ')[0] || '',
          userLastName: stripeSession.customer_details?.name?.split(' ').slice(1).join(' ') || ''
        };

        setSession(transformedSession);

        try {
          // Hash the email
          const hashedEmail = await hashEmail(stripeSession.email || '');

          // Initialize dataLayer if needed
          window.dataLayer = window.dataLayer || [];

          // First push the ecommerce data
          const ecommerceData = {
            ecommerce: {
              transaction_id: sessionId,
              value: transformedSession.transactionTotal / 100, // Convert from cents
              currency: transformedSession.transactionCurrency,
              items: [{
                item_name: 'Art Appraisal Service',
                price: transformedSession.transactionTotal / 100
              }]
            },
            customer_data: {
              email_hash: hashedEmail,
              name: `${transformedSession.userFirstName} ${transformedSession.userLastName}`.trim()
            }
          };

          // Push ecommerce data first
          window.dataLayer.push(ecommerceData);

          // Then trigger the event separately
          window.dataLayer.push({ 
            event: 'purchase_data_ready',
            transaction_id: sessionId
          });
        } catch (hashError) {
          console.error('Error hashing email:', hashError);
        }
      } catch (err) {
        // Only set error if it's not an abort error
        if (err instanceof Error && err.name !== 'AbortError') {
          setSession(null);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchSession();

    return () => {
      if (fetchController.current) {
        fetchController.current.abort();
      }
    };
  }, [sessionId]);

  return { session, loading, error };
}