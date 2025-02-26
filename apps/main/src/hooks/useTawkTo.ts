import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export const useTawkTo = () => {
  useEffect(() => {
    const loadTawkTo = () => {
      try {
        // Initialize Tawk API
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        // Create script element
        const s1 = document.createElement("script");
        s1.async = true;
        s1.src = 'https://embed.tawk.to/63a083dbb0d6371309d528e2/1gklg645r';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        
        // Error handling
        s1.onerror = () => {
          console.warn('Tawk.to chat widget failed to load');
          s1.remove();
        };

        // Append script to head
        document.head.appendChild(s1);
      } catch (error) {
        console.warn('Error loading Tawk.to chat:', error);
      }
    };

    // Load after initial page load
    if (document.readyState === 'complete') {
      setTimeout(loadTawkTo, 2000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(loadTawkTo, 2000);
      });
    }
  }, []);
};