import { useEffect } from 'react';

/**
 * Initialize Google Tag Manager with given ID
 */
export function useGoogleTagManager(id: string): void {
  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    
    // Define gtag function safely
    function gtag(...args: any[]) {
      if (window.dataLayer) {
        window.dataLayer.push(args);
      }
    }
    
    // Expose gtag globally
    window.gtag = gtag;
    
    // Only load script once
    if (!document.getElementById('gtm-script')) {
      const script = document.createElement('script');
      script.id = 'gtm-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
      document.head.appendChild(script);
    }
  }, [id]);
}