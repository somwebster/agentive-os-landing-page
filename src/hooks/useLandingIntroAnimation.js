import { useEffect, useRef } from 'react';

/** Module-level flag — once the intro has played, skip it on subsequent visits */
let introHasCompleted = false;
export function hasIntroPlayed() { return introHasCompleted; }

/**
 * One-shot intro sequence for the double-diamond landing: logo, diamond merge,
 * then reveals nav, hero copy, CTA, and phase row. Targets `.dd-*` descendants of scopeRef.
 */
export function useLandingIntroAnimation(scopeRef, gooeyWrapRef, animate) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const run = async () => {
      document.body.style.overflow = 'hidden';

      await new Promise((r) => requestAnimationFrame(r));
      const d1 = scopeRef.current?.querySelector('.dd-d1');
      if (!d1 || !gooeyWrapRef.current) {
        document.body.style.overflow = '';
        return;
      }
      const dw = d1.offsetWidth;
      const offset = dw * 0.55;

      animate('.dd-d1', { x: offset }, { duration: 0 });
      animate('.dd-d2', { x: -offset }, { duration: 0 });

      const rect = gooeyWrapRef.current.getBoundingClientRect();
      const pullUp = (window.innerHeight / 2) - (rect.top + rect.height / 2);
      animate('.dd-gooey-wrap', { y: pullUp }, { duration: 0 });

      await new Promise((r) => setTimeout(r, 700));

      await Promise.all([
        animate('.dd-logo', { opacity: 0, rotate: 90, scale: 0.2 }, {
          duration: 0.7,
          ease: [0.4, 0, 0.2, 1],
        }),
        animate('.dd-d1', { opacity: 1, scale: 0.08 }, {
          duration: 0.45,
          delay: 0.35,
          ease: 'easeOut',
        }),
      ]);

      await animate('.dd-d1', { scale: 1 }, {
        type: 'spring',
        stiffness: 170,
        damping: 13,
        mass: 0.8,
      });

      const D1_SLIDE_MS = 650;
      const d1Slide = animate('.dd-d1', { x: 0 }, {
        duration: D1_SLIDE_MS / 1000,
        ease: [0.22, 1, 0.36, 1],
      });

      await new Promise((r) => setTimeout(r, D1_SLIDE_MS * 0.8));

      await animate('.dd-d2', { opacity: 1, scale: 0.15, x: -(offset * 1.15) }, {
        duration: 0.35,
        ease: 'easeOut',
      });

      await d1Slide;

      await animate('.dd-d2', { scale: 1, x: 0 }, {
        type: 'spring',
        stiffness: 120,
        damping: 16,
        mass: 1.1,
      });

      await new Promise((r) => setTimeout(r, 150));

      await Promise.all([
        animate('.dd-gooey-wrap', { y: 0 }, {
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }),
        animate('.dd-nav', { opacity: 1, y: 0 }, {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }),
        animate('.dd-hero-title', { opacity: 1, y: 0 }, {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.15,
        }),
        animate('.dd-hero-sub', { opacity: 1, y: 0 }, {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.3,
        }),
        animate('.dd-about-wrap', { opacity: 1, y: 0 }, {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.45,
        }),
        animate('.dd-phase-row', { opacity: 1 }, { duration: 0.6, delay: 0.7 }),
        animate('.dd-dashed-lines', { opacity: 1 }, { duration: 0.6, delay: 0.7 }),
      ]);

      document.body.style.overflow = '';
      introHasCompleted = true;
    };

    run();
  }, [animate, gooeyWrapRef, scopeRef]);
}
