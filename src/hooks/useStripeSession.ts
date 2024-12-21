import { useState, useEffect, useRef } from 'react';

interface StripeSession {
  customer_details: {
    name: string;
    email: string;
  };
  amount_total: number;
  currency: string;
  payment_status: string;
}

export function useStripeSession(sessionId: string | null) {
  const [session, setSession] = useState<StripeSession | null>(null);
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
              'x-shared-secret': import.meta.env.VITE_STRIPE_SHARED_SECRET
            },
            signal: controller.signal
          }
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch session: ${response.status}`);
        }

        const stripeSession = await response.json();

        if (!stripeSession) {
          throw new Error('Session not found');
        }

        setSession(stripeSession);
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