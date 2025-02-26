declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export {};