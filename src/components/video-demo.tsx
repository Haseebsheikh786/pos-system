"use client";

import { PlayCircle, Pause } from "lucide-react";
import { useState, useRef } from "react";

interface VideoDemoProps {
  videoSrc?: string;
  showTitle?: boolean;
  className?: string;
}

const VideoDemo = ({
  videoSrc = "/demo.mp4",
  showTitle = true,
  className = "",
}: VideoDemoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <div
      className={`relative aspect-video rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 bg-black ${className}`}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover"
        controls={isPlaying}
        onClick={togglePlay}
      />

      {/* Overlay - Show when not playing or on hover */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
          onClick={handlePlay}
        >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#D4AF37] flex items-center justify-center hover:bg-[#A38A2E] transition-colors">
              <PlayCircle size={40} className="text-white ml-1" />
            </div>
            {showTitle && (
              <>
                <p className="text-gray-300 font-medium">Watch 2-Minute Demo</p>
                <p className="text-gray-400 text-sm mt-1">
                  See how it works in real shop
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Play/Pause button overlay when playing */}
      {isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-all duration-300 cursor-pointer"
          onClick={togglePlay}
        >
          <div
            className={`opacity-0 hover:opacity-100 transition-opacity duration-300 ${
              isPlaying ? "opacity-100" : ""
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
              {isPlaying ? (
                <Pause size={32} className="text-white" />
              ) : (
                <PlayCircle size={32} className="text-white ml-1" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDemo;
