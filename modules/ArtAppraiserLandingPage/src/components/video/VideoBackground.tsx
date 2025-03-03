import React, { useState, useEffect } from 'react';
import { VideoBackgroundProps } from './types';
import { useVideoPlayer } from './useVideoPlayer';
import { getFallbackImageSources } from './utils';

const VideoBackground: React.FC<VideoBackgroundProps> = ({ fallbackImage }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { videoState, videoRef, nextVideoRef } = useVideoPlayer(isMobile);

  useEffect(() => {
    console.log('[VideoBackground] State update:', {
      isPlaying: videoState.isPlaying,
      isLoaded: videoState.isLoaded,
      currentIndex: videoState.currentIndex,
      errors: videoState.errors
    });
  }, [videoState]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Optimized Fallback Image */}
      <picture>
        {getFallbackImageSources(fallbackImage).map((source, index) => (
          <source key={index} {...source} />
        ))}
        <img
          src={`${fallbackImage}?tr=w-1920,h-1080,q-50,bl-30,pr-true,f-jpg`}
          alt=""
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            videoState.isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
          decoding="async"
          fetchpriority="high"
          width="1920"
          height="1080"
        />
      </picture>

      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoState.isPlaying && videoState.isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        playsInline
      />
      <video
        ref={nextVideoRef}
        className="hidden"
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
    </div>
  );
};

export default VideoBackground;