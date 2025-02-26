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

/**
 * Initialize analytics tracking
 */
export function initializeAnalytics(): void {
  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];
}

/**
 * Track a page view
 */
export function trackPageView(path: string): void {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  
  window.dataLayer.push({
    event: 'page_view',
    page_path: path
  });
}

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, any> = {}
): void {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  
  window.dataLayer.push({
    event: eventName,
    ...eventParams
  });
}