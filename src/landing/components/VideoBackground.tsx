import React, { useRef, useState } from 'react';

interface VideoBackgroundProps {
  videoSources: string[];
  fallbackImage?: string;
}

export default function VideoBackground({ videoSources }: VideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      const nextIndex = (currentVideoIndex + 1) % videoSources.length;
      setCurrentVideoIndex(nextIndex);
      videoRef.current.src = videoSources[nextIndex];
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSources[currentVideoIndex]}
      >
        <source src={videoSources[currentVideoIndex]} type="video/mp4" />
      </video>
      <img
        ref={imageRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSources[currentVideoIndex]}
        alt="Video fallback"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}