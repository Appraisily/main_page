export interface VideoConfig {
  url: string;
  width: number;
  quality: number;
}

export interface VideoState {
  isPlaying: boolean;
  isLoaded: boolean;
  currentIndex: number;
  errors: string[];
}

export interface VideoBackgroundProps {
  fallbackImage: string;
}