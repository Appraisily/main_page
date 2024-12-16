// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Lazy load Google Analytics
export const initializeAnalytics = () => {
  const loadGoogleAnalytics = () => {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', import.meta.env.VITE_GA_ID, {
        send_page_view: false
      });
    };
  };

  // Load analytics after initial paint
  if (document.readyState === 'complete') {
    setTimeout(loadGoogleAnalytics, 2000);
  } else {
    window.addEventListener('load', () => {
      setTimeout(loadGoogleAnalytics, 2000);
    });
  }
};