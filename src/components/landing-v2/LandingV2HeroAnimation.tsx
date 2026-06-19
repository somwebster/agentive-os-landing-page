import { useEffect, useRef } from 'react';
import {
  initLandingV2HeroAnimation,
  type LandingV2HeroAnimProgress,
} from './hero-animation/initHeroAnimation';
import './hero-animation/landing-v2-hero-animation.css';

const DESIGN_WIDTH = 1100;
const DESIGN_HEIGHT = 720;

function updateHeroAnimationScale(root: HTMLElement) {
  const { clientWidth, clientHeight } = root;
  if (clientWidth <= 0 || clientHeight <= 0) return;

  const scale = Math.min(clientWidth / DESIGN_WIDTH, clientHeight / DESIGN_HEIGHT);
  root.style.setProperty('--hero-anim-scale', String(scale));
}

type LandingV2HeroAnimationProps = {
  shouldPlay?: boolean;
  onProgress?: (state: LandingV2HeroAnimProgress) => void;
};

export function LandingV2HeroAnimation({ shouldPlay = false, onProgress }: LandingV2HeroAnimationProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const runAnimationRef = useRef<(() => void) | null>(null);
  const hasStartedRef = useRef(false);
  const onProgressRef = useRef(onProgress);

  onProgressRef.current = onProgress;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const syncScale = () => {
      updateHeroAnimationScale(root);
    };

    syncScale();
    requestAnimationFrame(syncScale);

    const resizeObserver = new ResizeObserver(syncScale);
    resizeObserver.observe(root);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      return () => resizeObserver.disconnect();
    }

    const { run, cleanup } = initLandingV2HeroAnimation(root, {
      onProgress: (state) => onProgressRef.current?.(state),
    });
    runAnimationRef.current = run;

    return () => {
      resizeObserver.disconnect();
      cleanup();
      runAnimationRef.current = null;
      hasStartedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!shouldPlay || hasStartedRef.current || !runAnimationRef.current) return;

    hasStartedRef.current = true;
    runAnimationRef.current();
  }, [shouldPlay]);

  return (
    <div
      ref={rootRef}
      className="landing-v2-hero-animation"
      aria-hidden="true"
    >
      <div id="stage" className="landing-v2-hero-animation__stage">
        <div className="bg-tex" />
        <div className="bg-glow" id="glow" />
        <div className="bg-noise" />

        <div className="landing-v2-hero-animation__scene-wrap">
          <div className="scene" id="scene">
            <div className="layer" id="tiles" />
            <div className="seed" id="seed" />

            <div id="graphWrap">
              <svg id="edges" />
              <div id="nodes" />
            </div>

            <div id="flow">
              <svg id="flowEdges" />
              <div id="flowNodes" />
            </div>

            <div id="panel">
              <div id="sentBubble" />
              <div className="composer">
                <div className="row1">
                  <svg className="flowic" viewBox="0 0 22 18" fill="none">
                    <path
                      d="M2 4h14M2 9h11M2 14h8"
                      stroke="#211E1A"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="msg" id="msg">
                    <span className="caret" id="caret" />
                  </div>
                </div>
                <div className="row2">
                  <div className="chip">
                    <span className="sw" style={{ background: 'var(--purple-soft)' }}>
                      <svg width="11" height="11" viewBox="0 0 11 11">
                        <circle cx="5.5" cy="5.5" r="4" fill="none" stroke="#8E78C4" strokeWidth="1.6" />
                      </svg>
                    </span>
                    Campaigns
                    <span className="car">▾</span>
                  </div>
                  <div className="chip">
                    <span className="sw" style={{ background: '#E2EDFB' }}>
                      <svg width="11" height="11" viewBox="0 0 12 12">
                        <circle cx="6" cy="4" r="2.3" fill="#3B82C4" />
                        <path d="M2 11c0-2.2 1.8-3.6 4-3.6S10 8.8 10 11" fill="#3B82C4" />
                      </svg>
                    </span>
                    Agent Builder
                    <span className="car">▾</span>
                  </div>
                  <div className="chip ghost">+ Sources</div>
                  <div className="send" id="send">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h9M8 4l4 4-4 4"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div id="thinking">
              <div className="think-head">
                <svg className="flowic" viewBox="0 0 22 18" fill="none">
                  <path
                    d="M2 4h14M2 9h11M2 14h8"
                    stroke="#938A7D"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="shimmer" id="thinkText">
                  Designing your customer support agent…
                </span>
              </div>
              <div className="sub">
                <div className="sub-title">
                  <span>Running subagents</span>
                  <span style={{ color: 'var(--muted-2)' }}>▾</span>
                </div>
                <div id="steps" />
              </div>
            </div>

            <svg id="cursor" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 3l14 8.5-6 1.4-3.2 6L5 3z"
                fill="#211E1A"
                stroke="#fff"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div id="controls" className="landing-v2-hero-animation__controls">
        <div className="phase-cap" id="cap">
          Ingest
        </div>
        <div className="track">
          <div className="fill" id="fill" />
        </div>
      </div>
    </div>
  );
}
