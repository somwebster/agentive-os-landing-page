import { VideoBackground } from './VideoBackground';
import { TopMenuBar } from './TopMenuBar';

const Hero = () => {
  return (
    <section className="hero">
      <TopMenuBar />
      <VideoBackground />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-layout">
          {/* TEXT CONTENT */}
          <div className="hero-text">
            <div className="hero-eyebrow fade-up">
              Now in Early Access
            </div>
            <h1 className="hero-headline fade-up fade-up-delay-1">
              The OS for<br />
              <span className="gradient-text-both">Human-Centered</span><br />
              Agencies
            </h1>
            <p className="hero-subhead fade-up fade-up-delay-2 font-bold text-white/90">
              Build Agent Native operational system with your context, workflows & agents. Fully Managed, Fully Yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
