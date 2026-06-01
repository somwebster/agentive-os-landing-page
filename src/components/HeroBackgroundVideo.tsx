import { useEffect, useRef, useState } from 'react';

const HERO_VIDEO_SRC = '/videos/ag-os-heroedit-1.webm';

function seekToLastFrame(video: HTMLVideoElement) {
  if (!video.duration || !Number.isFinite(video.duration)) return;
  video.currentTime = Math.max(0, video.duration - 0.05);
  video.pause();
}

export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setShouldAnimate(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldAnimate) {
      const onReady = () => seekToLastFrame(video);
      if (video.readyState >= 1) onReady();
      else video.addEventListener('loadedmetadata', onReady, { once: true });
      return;
    }

    video.currentTime = 0;
    void video.play().catch(() => {});
  }, [shouldAnimate]);

  const handleEnded = () => {
    const video = videoRef.current;
    if (video) seekToLastFrame(video);
  };

  return (
    <div className="hero-bg-video" aria-hidden="true">
      <video
        ref={videoRef}
        className="hero-bg-video__media"
        autoPlay={shouldAnimate}
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
      >
        <source src={HERO_VIDEO_SRC} type="video/webm" />
      </video>
    </div>
  );
}
