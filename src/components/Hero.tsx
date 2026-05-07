import React from 'react';
import { Server, ShieldCheck } from 'lucide-react';
import LandingHero from './LandingHero';
import { HeroHighlight, Highlight } from './hero-highlight';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="dd-hero-content relative overflow-hidden">
      {/* Pointer Highlight Effect as Background */}
      <div className="absolute inset-0 z-0">
        <HeroHighlight containerClassName="h-full w-full" />
      </div>

      <div className="dd-hero-center relative z-10">
        <LandingHero
          title={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ lineHeight: 1.1 }}
            >
              <div style={{
                fontSize: '0.25em',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--brand-primary-500)',
                marginBottom: '1rem',
                display: 'block'
              }}>
                Built for AI Native Agencies
              </div>
              <span style={{ fontSize: '0.65em', fontWeight: 500 }}>
                The Operating System for
              </span>
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #F7621E 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}>
                Humans + AI
              </span>
            </motion.div>
          }
          ctaLabel="Get Started"
          onCtaClick={() => console.log('Book Demo')}
        />
      </div>

      <div className="features-grid relative z-10">
        <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
          <div style={{ color: 'var(--brand-primary-500)', marginBottom: '1rem' }}>
            <Server size={32} strokeWidth={2} />
          </div>
          <h3>Fully Managed.</h3>
          <p style={{ marginTop: '0.8rem' }}>We handle infrastructure, updates, scaling, and maintenance - so you don’t have to think about the technical side.</p>
        </div>
        <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
          <div style={{ color: 'var(--brand-secondary-500)', marginBottom: '1rem' }}>
            <ShieldCheck size={32} strokeWidth={2} />
          </div>
          <h3>Fully Yours.</h3>
          <p style={{ marginTop: '0.8rem' }}>Everything you need: Context, Agents & Workflows, custom built and managed for you.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
