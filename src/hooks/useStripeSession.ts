import { useState, useEffect, useRef } from 'react';
import { hashEmail } from '@/lib/analytics';
import type { StripeSessionResponse } from '@/lib/types/stripe';

const FALLBACK_TRANSACTION_AMOUNT = 5900; // $59.00 in cents

export function useStripeSession(sessionId: string | null) {
  const [session, setSession] = useState<StripeSessionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const fetchController = useRef<AbortController | null>(null);
  const analyticsTriggered = useRef<boolean>(false);

  const pushAnalyticsEvent = async (data: StripeSessionResponse | null) => {
    if (analyticsTriggered.current || !sessionId) return;
    
    try {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      
      // Prepare analytics data with fallbacks
      const analyticsData = {
        ecommerce: {
          transaction_id: sessionId,
          value: data ? data.transactionTotal / 100 : FALLBACK_TRANSACTION_AMOUNT / 100,
          currency: data?.transactionCurrency || 'USD',
          items: [{
            item_name: 'Art Appraisal Service',
            price: data ? data.transactionTotal / 100 : FALLBACK_TRANSACTION_AMOUNT / 100
          }]
        }
      };

      // Add customer data if available
      if (data?.userEmail) {
        const hashedEmail = await hashEmail(data.userEmail);
        analyticsData.customer_data = {
          email_hash: hashedEmail,
          name: `${data.userFirstName} ${data.userLastName}`.trim()
        };
      }

      // Push ecommerce data
      window.dataLayer.push(analyticsData);

      // Trigger purchase event
      window.dataLayer.push({
        event: 'purchase_confirmation',
        transaction_id: sessionId
      });

      analyticsTriggered.current = true;
    } catch (error) {
      console.error('Failed to push analytics event:', error);
      
      // Fallback: Push minimal event data
      window.dataLayer?.push({
        event: 'purchase_confirmation',
        transaction_id: sessionId
      });
      
      analyticsTriggered.current = true;
    }
  };

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
        
        // Push analytics event with full data
        await pushAnalyticsEvent(transformedSession);
      } catch (err) {
        // Only set error if it's not an abort error
        if (err instanceof Error && err.name !== 'AbortError') {
          setSession(null);
          setError(err.message);
          
          // Push analytics event with fallback data
          await pushAnalyticsEvent(null);
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