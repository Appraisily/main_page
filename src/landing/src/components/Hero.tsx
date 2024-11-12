import React from 'react';
import VideoBackground from './VideoBackground';

export default function Hero() {
  const videoSources = [
    '/videos/hero1.mp4',
    '/videos/hero2.mp4',
    '/videos/hero3.mp4'
  ];

  return (
    <div className="relative min-h-screen">
      <VideoBackground 
        videoSources={videoSources}
        fallbackImage="/images/hero-fallback.jpg"
      />
      {/* Hero content */}
    </div>
  );
}