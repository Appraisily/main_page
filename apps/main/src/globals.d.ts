// Global type definitions

interface Window {
  dataLayer?: any[];
  gtag?: (...args: any[]) => void;
}

// Declare modules without type definitions
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare module '*.webp'; 