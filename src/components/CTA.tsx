import React from 'react';
import GlassButton from './GlassButton';

const CTA = () => {
  return (
    <section className="cta" style={{ marginTop: '6rem', marginBottom: '6rem' }}>
      <div className="card" style={{ background: 'var(--neutral-100)', textAlign: 'center', padding: '4rem 2rem', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-border-primary)' }}>
        <h2 className="section-heading" style={{ marginBottom: '1rem', color: 'var(--neutral-900)' }}>
          Ready to Upgrade Your Agency?
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--neutral-700)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Stop duct-taping tools together. Start building a resilient, AI-powered operational system that scales with you.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GlassButton onClick={() => console.log('CTA')}>
            Book a Demo
          </GlassButton>
        </div>
      </div>
    </section>
  );
};

export default CTA;
