import { GTMEvent } from './types';

declare global {
  interface Window {
    dataLayer: GTMEvent[];
  }
}

export const initializeDataLayer = (): void => {
  window.dataLayer = window.dataLayer || [];
};

export const pushToDataLayer = (event: GTMEvent): void => {
  if (typeof window !== 'undefined') {
    window.dataLayer.push(event);
  }
};