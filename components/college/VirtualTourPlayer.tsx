"use client";

import React from "react";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

interface VirtualTourPlayerProps {
  videoUrl: string;
}

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  return null;
};

export default function VirtualTourPlayer({ videoUrl }: VirtualTourPlayerProps) {
  const youTubeId = getYouTubeId(videoUrl);

  return (
    <div className="relative w-full h-[96%]">
      {youTubeId ? (
        <LiteYouTubeEmbed
          id={youTubeId}
          title="Virtual Tour"
          wrapperClass="yt-lite"
          iframeClass="aspect-auto w-full"
          aspectHeight={9}
          aspectWidth={16}
          autoplay={true}
        />
      ) : (
        <video
          src={videoUrl}
          className="aspect-auto w-full h-full object-cover"
          controls
          autoPlay
          loop
          playsInline
        />
      )}
    </div>
  );
}
