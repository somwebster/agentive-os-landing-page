import React from 'react';
import { ShaderBackground } from './ShaderBackground';

const Hero = () => {
  return (
    <section className="hero">
      <ShaderBackground />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-layout">
          {/* TEXT CONTENT */}
          <div className="hero-text">
            <div className="hero-eyebrow fade-up">
              <div className="hero-eyebrow-dot"></div>
              Now in Early Access
            </div>
            <h1 className="hero-headline fade-up fade-up-delay-1">
              The OS for<br />
              <span className="gradient-text-both">Human-Centered</span><br />
              Agencies
            </h1>
            <p className="hero-subhead fade-up fade-up-delay-2">
              A fully managed, agent-native operational layer built around your process - not another tool on top of it.
            </p>
            <div className="hero-actions fade-up fade-up-delay-3">
              <a href="#cta" className="btn-primary btn-large">Join Waitlist</a>
              <a href="#cta" className="btn-ghost btn-large">Book a Demo →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
