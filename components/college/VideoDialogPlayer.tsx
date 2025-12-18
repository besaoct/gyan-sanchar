"use client";

import { VideoReel } from "@/lib/api/data/colleges";
import { Play, Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

interface VideoDialogPlayerProps {
  reel: VideoReel;
  onClose: () => void;
  isOpen: boolean;
}

export default function VideoDialogPlayer({ reel, onClose, isOpen }: VideoDialogPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Start unmuted in dialog

  // Local video control
  useEffect(() => {
    if (reel.type === "local" && videoRef.current) {
      if (isOpen) {
        videoRef.current.play().catch(error => console.error("Error playing video:", error));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isOpen, reel.type]);

  const togglePlay = () => {
    if (reel.type === "local") {
      if (!videoRef.current) return;
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
    // YouTube handled by lite-youtube-embed or external script
  };

  const toggleMute = () => {
    if (reel.type === "local") {
      if (!videoRef.current) return;
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
    // YouTube handled by lite-youtube-embed or external script
  };

  return (
    <div className="relative w-full h-[96%]">
      {reel.type === "local" && reel.src ? (
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.thumbnail || "/placeholder.svg"}
          className="aspect-auto w-full h-full object-cover"
          controls={false} // Custom controls
          autoPlay // Auto-play when opened in dialog
          loop
          playsInline
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      ) : reel.type === "youtube" && reel.youtubeId ? (
        <LiteYouTubeEmbed
          id={reel.youtubeId}
          title={reel.title}
          wrapperClass="yt-lite"
          iframeClass="aspect-auto w-full"
          aspectHeight={9}
          aspectWidth={16}
          autoplay={true} // Autoplay for YouTube
        />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-gray-200 text-gray-500">
          Video Not Available
        </div>
      )}

      {/* Custom Controls for local video */}
      {reel.type === "local" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
          <button
            onClick={togglePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#044cac] shadow-lg transition-transform hover:scale-110"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <div className="flex space-x-1">
                <div className="h-6 w-1.5 bg-[#044cac]" />
                <div className="h-6 w-1.5 bg-[#044cac]" />
              </div>
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>

          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#044cac] shadow"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>
      )}
    </div>
  );
}
