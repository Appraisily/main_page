import React, { useState, useEffect, useRef } from 'react';

interface Props {
  fallbackImage: string;
}

export default function VideoBackground({ fallbackImage }: Props) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const videos = [
    '/videos/hero1.mp4',
    '/videos/hero2.mp4',
    '/videos/hero3.mp4'
  ];

  // Preload videos
  useEffect(() => {
    const videoElements = videos.map(() => {
      const video = document.createElement('video');
      video.preload = 'auto';
      return video;
    });

    let loadedCount = 0;
    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === videos.length) {
        setVideosLoaded(true);
      }
    };

    videoElements.forEach((video, index) => {
      video.src = videos[index];
      video.addEventListener('loadeddata', handleLoad);
    });

    return () => {
      videoElements.forEach((video, index) => {
        video.removeEventListener('loadeddata', handleLoad);
      });
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current || !videosLoaded) return;

    const video = videoRef.current;

    const handleEnded = () => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    };

    video.addEventListener('ended', handleEnded);
    
    // Set initial video and play
    video.src = videos[currentVideo];
    video.load();
    
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.error('Error playing video:', error);
      }
    };

    playVideo();

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [videosLoaded, currentVideo]);

  // Update video source when currentVideo changes
  useEffect(() => {
    if (!videoRef.current || !videosLoaded) return;

    const video = videoRef.current;
    video.src = videos[currentVideo];
    video.load();
    
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.error('Error playing video:', error);
      }
    };

    playVideo();
  }, [currentVideo, videosLoaded]);

  return (
    <div className="absolute inset-0">
      <img
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
          playsInline
          muted
          autoPlay
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
    </div>
  );
}