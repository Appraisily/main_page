import { VideoConfig } from './types';

export const getVideoUrl = (url: string, isMobile: boolean): string => {
  const config: VideoConfig = {
    url,
    width: isMobile ? 360 : 1920,
    quality: isMobile ? 50 : 70
  };
  
  return `${config.url}?tr=w-${config.width},q-${config.quality}`;
};

export const getFallbackImageSources = (fallbackImage: string) => [
  {
    media: '(max-width: 480px)',
    srcSet: `${fallbackImage}?tr=w-480,h-720,q-50,bl-30,f-jpg`,
    type: 'image/jpeg'
  },
  {
    media: '(max-width: 1024px)',
    srcSet: `${fallbackImage}?tr=w-1024,h-768,q-60,bl-30,f-jpg`,
    type: 'image/jpeg'
  },
  {
    media: '(min-width: 1025px)',
    srcSet: `${fallbackImage}?tr=w-1920,h-1080,q-50,bl-30,pr-true,f-jpg`,
    type: 'image/jpeg'
  }
];