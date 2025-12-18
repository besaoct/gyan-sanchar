/* --------------------------------------------------------------
   VideoReelCard – handles play/pause, mute/unmute, thumbnail
   -------------------------------------------------------------- */

import { VideoReel } from "@/lib/api/data/colleges";
import { Play, Volume2, VolumeX } from "lucide-react";
import React from "react";
import { useRef, useState } from "react";


interface VideoReelCardProps {
  reel: VideoReel;
}

export default function VideoReelCard({ reel }: VideoReelCardProps) {
  // ---------- LOCAL VIDEO ----------
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // ---------- YOUTUBE ----------
  const [ytReady, setYtReady] = useState(false);
  const ytPlayerRef = useRef<any>(null); // YT.Player instance

  const togglePlay = () => {
    if (reel.type === "local") {
      if (!videoRef.current) return;
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    } else {
      // YouTube
      if (!ytPlayerRef.current) return;
      if (ytPlayerRef.current.getPlayerState() !== 1) {
        ytPlayerRef.current.playVideo();
      } else {
        ytPlayerRef.current.pauseVideo();
      }
    }
  };

  const toggleMute = () => {
    if (reel.type === "local") {
      if (!videoRef.current) return;
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    } else {
      if (!ytPlayerRef.current) return;
      if (isMuted) ytPlayerRef.current.unMute();
      else ytPlayerRef.current.mute();
      setIsMuted(!isMuted);
    }
  };

  // Load YouTube Iframe API once
  React.useEffect(() => {
    if (reel.type !== "youtube") return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(tag, firstScript);

    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      setYtReady(true);
      new (window as any).YT.Player(`yt-${reel.id}`, {
        videoId: reel.youtubeId,
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel: 0,
          controls: 0,
          showinfo: 0,
        },
        events: {
          onReady: (e: any) => {
            ytPlayerRef.current = e.target;
            // optional: preload thumbnail
          },
          onStateChange: (e: any) => {
            setIsPlaying(e.data === 1); // 1 = playing
          },
        },
      });
    };
  }, [reel]);

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md">
      {/* ---------- VIDEO / YOUTUBE ---------- */}
      {reel.type === "local" && reel.src ? (
        <video
          ref={videoRef}
          src={reel.src}
          poster={reel.thumbnail || "placeholder.svg"}
          className="aspect-video w-full object-cover"
          loop
          playsInline
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      ) : (
        <div
          id={`yt-${reel.id}`}
          className="aspect-video w-full bg-black"
          style={{ display: ytReady ? "block" : "none" }}
        />
      )}

      {/* ---------- Thumbnail fallback (while loading) ---------- */}
      {reel.type === "youtube" && !ytReady && reel.thumbnail && (
        <img
          src={reel.thumbnail}
          alt={reel.title}
          className="aspect-video w-full object-cover"
        />
      )}

      {/* ---------- Overlay controls ---------- */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
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

      {/* ---------- Title bar ---------- */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
        <p className="truncate text-sm font-medium">{reel.title}</p>
      </div>
    </div>
  );
}