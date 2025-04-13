
import React from 'react';

interface VideoElementProps {
  src: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  poster?: string;
  className?: string;
}

const VideoElement: React.FC<VideoElementProps> = ({
  src,
  title,
  width = '100%',
  height = 'auto',
  autoplay = false,
  muted = false,
  controls = true,
  loop = false,
  poster,
  className = '',
}) => {
  // Check if the source is from YouTube
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  
  // Extract YouTube video ID if it's a YouTube URL
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  return (
    <div className={`video-element ${className}`}>
      {isYouTube ? (
        <iframe 
          src={`https://www.youtube.com/embed/${getYoutubeId(src)}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&controls=${controls ? 1 : 0}&loop=${loop ? 1 : 0}`}
          title={title || "YouTube video player"}
          width={width}
          height={height}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-md w-full"
        ></iframe>
      ) : (
        <video
          src={src}
          poster={poster}
          width={width}
          height={height}
          autoPlay={autoplay}
          muted={muted}
          controls={controls}
          loop={loop}
          className="rounded-md w-full"
        >
          <p>Your browser does not support HTML video.</p>
        </video>
      )}
    </div>
  );
};

export default VideoElement;
