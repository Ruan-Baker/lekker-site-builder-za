
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCw } from 'lucide-react';

interface VideoElementProps {
  src: string;
  poster?: string;
  width?: string | number;
  height?: string | number;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  className?: string;
  aspectRatio?: string;
  onEnded?: () => void;
  borderRadius?: string;
  style?: React.CSSProperties;
}

const VideoElement: React.FC<VideoElementProps> = ({
  src,
  poster,
  width = '100%',
  height = 'auto',
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  objectFit = 'contain',
  className = '',
  aspectRatio = '16 / 9',
  onEnded,
  borderRadius = '0',
  style
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };
    
    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };
    
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);
  
  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    
    videoRef.current.currentTime = newTime;
    setProgress(pos * 100);
  };
  
  // Format time (seconds) to mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width, 
        height, 
        aspectRatio, 
        borderRadius,
        ...style
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        onEnded={onEnded}
        className="w-full h-full"
        style={{ objectFit }}
        playsInline
      />
      
      {controls && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 transition-opacity opacity-0 hover:opacity-100">
          {/* Progress bar */}
          <div 
            className="h-1 bg-gray-600 mb-2 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-blue-500" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={togglePlay}>
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </Button>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleMute}>
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </Button>
              
              <span className="text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoElement;
