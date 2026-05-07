import React from 'react';
import { Server, ShieldCheck } from 'lucide-react';
import LandingHero from './LandingHero';
import { HeroHighlight, Highlight } from './hero-highlight';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="dd-hero-content relative overflow-hidden">
      <HeroHighlight containerClassName="h-full py-20">
        <div className="dd-hero-center">
          <LandingHero
            title={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                The Future is <br />
                <Highlight className="text-black dark:text-white px-4">
                  Agent Native
                </Highlight>
              </motion.div>
            }
            subtitle="Agentive OS is the operating layer that connects your data, your team, and your AI agents — built specifically for how your agency runs."
            ctaLabel="Get Started"
            onCtaClick={() => console.log('Book Demo')}
          />
        </div>
      </HeroHighlight>

      <div className="features-grid">
        <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
          <div style={{ color: 'var(--brand-primary-500)', marginBottom: '1rem' }}>
            <Server size={32} strokeWidth={2} />
          </div>
          <h3>Dedicated instance</h3>
          <p style={{ marginTop: '0.8rem' }}>Your Agentive OS is spun up specifically for your agency, ensuring complete isolation and performance.</p>
        </div>
        <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
          <div style={{ color: 'var(--brand-secondary-500)', marginBottom: '1rem' }}>
            <ShieldCheck size={32} strokeWidth={2} />
          </div>
          <h3>Your data only</h3>
          <p style={{ marginTop: '0.8rem' }}>We never co-mingle data or train on your proprietary workflows. Your agency's data remains entirely yours.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
