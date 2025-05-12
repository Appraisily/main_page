import { useState, useEffect, useRef } from 'react';
import { hashEmail } from '@/lib/analytics';
import type { StripeSessionResponse } from '@/lib/types/stripe';

const isDev = import.meta.env.DEV;
const DEV_SHARED_KEY = 'sk_shared_5f9a4b2c8e7d6f3a1b9c4d5e8f7a2b3c4d5e6f7';

// Global Set to track processed session IDs for analytics within the current page lifecycle
const processedAnalyticsSessions = new Set<string>();

const mockSessionData: Record<string, StripeSessionResponse> = {
  'cs_live_b1lDTlUrm70sYbfdDJGgvkh6hPjdJXdEi9w0FBgS2F33pw63KCXs4IV6vO': {
    customer_details: {
      name: 'Test User',
      email: 'test@example.com',
    },
    amount_total: 17700,
    currency: 'usd',
    payment_status: 'paid',
    client_reference_id: 'bulk_test123',
    metadata: {
      appraisal_type: 'regular',
      items_count: '3'
    }
  }
}
const FALLBACK_TRANSACTION_AMOUNT = 5900; // $59.00 in cents

export function useStripeSession(sessionId: string | null) {
  const [session, setSession] = useState<StripeSessionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const fetchController = useRef<AbortController | null>(null);
  const analyticsTriggered = useRef<boolean>(false);

  const pushAnalyticsEvent = async (data: StripeSessionResponse | null) => {
    if (analyticsTriggered.current || !sessionId || processedAnalyticsSessions.has(sessionId)) return;
    
    try {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      
      // Prepare analytics data with fallbacks
      const analyticsData = {
        ecommerce: {
          transaction_id: sessionId,
          value: data ? data.amount_total : FALLBACK_TRANSACTION_AMOUNT,
          currency: data?.currency || 'USD',
          items: [{
            item_name: 'Art Appraisal Service',
            price: data ? data.amount_total : FALLBACK_TRANSACTION_AMOUNT
          }],
          customer_data: data?.customer_details?.email ? {
            email_hash: await hashEmail(data.customer_details.email),
            name: data.customer_details.name
          } : undefined
        }
      };

      // Push ecommerce data
      window.dataLayer.push(analyticsData);

      // Trigger purchase event
      window.dataLayer.push({
        event: 'purchase_confirmation',
        transaction_id: sessionId
      });
      
      // Add this event for GTM conversion tracking
      window.dataLayer.push({
        event: 'purchase_data_ready',
        transaction_id: sessionId
      });

      analyticsTriggered.current = true;
      // Mark this sessionId as processed globally
      processedAnalyticsSessions.add(sessionId);
    } catch (error) {
      console.error('Failed to push analytics event:', error);
      
      // Fallback: Push minimal event data
      window.dataLayer?.push({
        event: 'purchase_confirmation',
        transaction_id: sessionId
      });
      
      // Add fallback conversion event
      window.dataLayer?.push({
        event: 'purchase_data_ready',
        transaction_id: sessionId
      });
      
      analyticsTriggered.current = true;
      // Also mark as processed globally in case of error fallback path
      processedAnalyticsSessions.add(sessionId);
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
              'x-shared-secret': isDev ? DEV_SHARED_KEY : (import.meta.env.VITE_STRIPE_SHARED_SECRET || ''),
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

        if (!stripeSession || !stripeSession.amount_total) {
          throw new Error('Session not found');
        }

        setSession(stripeSession);
        
        // Push analytics event with full data
        await pushAnalyticsEvent(stripeSession);
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