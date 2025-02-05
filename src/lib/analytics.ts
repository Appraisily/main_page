/**
 * Hash an email address using SHA-256
 * @param email The email address to hash
 * @returns A promise that resolves to the hashed email as a hex string
 */
export async function hashEmail(email: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(email);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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