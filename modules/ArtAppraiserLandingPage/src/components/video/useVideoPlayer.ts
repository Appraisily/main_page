import { useState, useRef, useEffect } from 'react';
import { VideoState } from './types';
import { getVideoUrl } from './utils';

const videos = [
  'https://ik.imagekit.io/appraisily/Videos/hero1.mp4',
  'https://ik.imagekit.io/appraisily/Videos/hero2.mp4',
  'https://ik.imagekit.io/appraisily/Videos/hero3.mp4',
  'https://ik.imagekit.io/appraisily/Videos/hero4.mp4',
  'https://ik.imagekit.io/appraisily/Videos/hero5.mp4'
];

export function useVideoPlayer(isMobile: boolean) {
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    isLoaded: false,
    currentIndex: 0,
    errors: []
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const mountedRef = useRef(true);
  const debugTimeoutRef = useRef<ReturnType<typeof setInterval>>();

  const logDebug = (message: string, color = '#4CAF50', data?: any, error?: boolean) => {
    console.log(`%c[Video Debug] ${message}`, `color: ${color}; font-weight: bold`);
    if (data) console.log(data);
    if (error) console.trace();
  };

  const handleVideoEnd = () => {
    logDebug('Video ended, transitioning to next video');
    const nextIndex = (videoState.currentIndex + 1) % videos.length;
    const video = videoRef.current;
    const nextVideo = nextVideoRef.current;
    
    if (video && nextVideo) {
      // Swap video elements
      const tempSrc = video.src;
      video.src = nextVideo.src;
      nextVideo.src = tempSrc;
      
      // Play the next video
      video.load();
      video.play().then(() => {
        setVideoState(prev => ({
          ...prev,
          currentIndex: nextIndex,
          isLoaded: true
        }));
        
        // Preload the next video in sequence
        const nextNextIndex = (nextIndex + 1) % videos.length;
        nextVideo.src = getVideoUrl(videos[nextNextIndex], isMobile);
        nextVideo.load();
      }).catch(error => {
        handleError(`Failed to play next video: ${error?.message || 'Unknown error'}`);
      });
    }
  };

  const debugVideoElement = (video: HTMLVideoElement, prefix: string = '') => {
    logDebug(`${prefix}Video element state:`, '#9C27B0', {
      src: video.src,
      readyState: video.readyState,
      networkState: video.networkState,
      error: video.error?.message,
      currentTime: video.currentTime,
      duration: video.duration,
      paused: video.paused,
      muted: video.muted,
      volume: video.volume,
      playbackRate: video.playbackRate,
      buffered: Array.from(video.buffered).map(i => ({
        start: video.buffered.start(i),
        end: video.buffered.end(i)
      }))
    });
  };

  const handleError = (error: string) => {
    logDebug(error, '#f44336', null, true);
    setVideoState(prev => ({
      ...prev,
      errors: [...prev.errors, error]
    }));
  };

  const playVideo = async (video: HTMLVideoElement) => {
    try {
      logDebug('Attempting to play video...', '#2196F3', {
        currentTime: video.currentTime,
        readyState: video.readyState,
        paused: video.paused,
        muted: video.muted,
        volume: video.volume
      });

      await video.play();
      logDebug(`Video ${videoState.currentIndex} started playing`);
      
      if (mountedRef.current) {
        setVideoState(prev => ({
          ...prev,
          isPlaying: true,
          isLoaded: true,
          errors: []
        }));
        logDebug('Video state updated', '#4CAF50', { ...videoState });
      }
    } catch (error) {
      handleError(`Playback error: ${error?.message || 'Unknown error'}`);
    }
  };

  const loadVideo = () => {
    const video = videoRef.current;
    if (!video) {
      logDebug('Video ref is null', '#f44336', null, true);
      return;
    }

    logDebug(`Loading video ${videoState.currentIndex}`);

    const shouldPlayVideo = !isMobile || 
      window.matchMedia('(prefers-reduced-data: no-preference)').matches;

    logDebug('Video playback conditions:', '#FF9800', {
      isMobile,
      shouldPlayVideo,
      prefersReducedData: window.matchMedia('(prefers-reduced-data: no-preference)').matches,
      userAgent: navigator.userAgent
    });

    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.src = getVideoUrl(videos[videoState.currentIndex], isMobile);
    video.load();
    
    debugVideoElement(video, 'Initial ');

    // Clear existing event listeners
    video.removeEventListener('ended', handleVideoEnd);
    video.removeEventListener('error', handleError);

    // Add event listeners
    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', () => handleError('Video playback error'));
    video.addEventListener('loadedmetadata', () => {
      logDebug('Video metadata loaded', '#2196F3', {
        duration: video.duration,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight
      });
      
      // Only play if this is the first video
      if (videoState.currentIndex === 0) {
        playVideo(video);
      }
    });

    // Preload next video
    if (nextVideoRef.current) {
      const nextIndex = (videoState.currentIndex + 1) % videos.length;
      logDebug('Preloading next video', '#FF9800', {
        nextIndex,
        nextVideoUrl: getVideoUrl(videos[nextIndex], isMobile)
      });

      nextVideoRef.current.src = getVideoUrl(videos[nextIndex], isMobile);
      nextVideoRef.current.load();
    }

    // Add debug event listeners
    video.addEventListener('waiting', () => 
      logDebug('Video is waiting for data...', '#FFC107'));
    video.addEventListener('stalled', () => 
      logDebug('Video has stalled', '#FF5722'));
    video.addEventListener('suspend', () => 
      logDebug('Video loading has been suspended', '#FF9800'));
    video.addEventListener('canplay', () =>
      logDebug('Video can start playing', '#4CAF50'));
    video.addEventListener('canplaythrough', () =>
      logDebug('Video can play through', '#4CAF50'));

    return () => {
      logDebug('Cleaning up video element', '#795548');
      if (debugTimeoutRef.current) {
        clearInterval(debugTimeoutRef.current);
      }
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleError);
      video.pause();
      video.src = '';
      video.load();
      setVideoState(prev => ({ ...prev, isLoaded: false }));
    };
  };

  useEffect(() => {
    if (!mountedRef.current) return;

    const timeoutId = setTimeout(loadVideo, 2000);

    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  return {
    videoState,
    videoRef,
    nextVideoRef,
    setVideoState
  };
}