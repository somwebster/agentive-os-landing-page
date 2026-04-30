import React, { useEffect, useRef } from 'react';

export const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-[1.15]"
        style={{ filter: 'brightness(0.8)' }}
      >
        <source src="/a_c_d_a_d_c_e_mp_.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/20" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/30" />
    </div>
  );
};
