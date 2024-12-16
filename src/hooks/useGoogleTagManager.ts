import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const useGoogleTagManager = (gtmId: string) => {
  useEffect(() => {
    // Initialize dataLayer only if not already initialized
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
  }, [gtmId]);
};