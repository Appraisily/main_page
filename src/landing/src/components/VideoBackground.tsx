import React, { useState, useEffect, useRef } from 'react';

interface Props {
  fallbackImage: string;
}

export default function VideoBackground({ fallbackImage }: Props) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const videos = [
    '/videos/hero1.mp4',
    '/videos/hero2.mp4',
    '/videos/hero3.mp4'
  ];
  
  const preloadRefs = useRef<HTMLVideoElement[]>([]);

  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.src = fallbackImage;
    img.onload = () => setImageLoaded(true);

    // Add preload link for LCP image
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = fallbackImage;
    document.head.appendChild(preloadLink);

    return () => {
      document.head.removeChild(preloadLink);
    };
  }, [fallbackImage]);

  useEffect(() => {
    preloadRefs.current = videos.map((_, i) => preloadRefs.current[i] ?? document.createElement('video'));
    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === videos.length) {
        setVideosLoaded(true);
      }
    };

    preloadRefs.current.forEach((video, index) => {
      video.src = videos[index];
      video.preload = 'auto';
      video.load();
      video.addEventListener('loadeddata', handleLoad);
    });

    return () => {
      preloadRefs.current.forEach((video) => {
        video.removeEventListener('loadeddata', handleLoad);
        video.remove();
      });
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current || !videosLoaded) return;

    const video = videoRef.current;

    const handleEnded = () => {
      const nextVideo = (currentVideo + 1) % videos.length;
      setCurrentVideo(nextVideo);
      
      if (video) {
        video.src = videos[nextVideo];
        video.load();
        video.play().catch(error => {
          console.error('Error playing video:', error);
        });
      }
    };

    video.addEventListener('ended', handleEnded);
    
    // Play initial video
    video.src = videos[currentVideo];
    video.load();
    video.play().catch(error => {
      console.error('Error playing initial video:', error);
    });

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [videosLoaded, currentVideo]);

  return (
    <div className="absolute inset-0">
      <img
        ref={imageRef}
        className={`h-full w-full object-cover transition-opacity duration-1000 ${
          videosLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        src={fallbackImage}
        alt="Background"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />
      {videosLoaded && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
    </div>
  );
}