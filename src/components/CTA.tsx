import React from 'react';
import GlassButton from './GlassButton';

const CTA = () => {
  return (
    <section className="cta" style={{ marginTop: '6rem', marginBottom: '6rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="card" style={{
          position: 'relative',
          textAlign: 'center',
          padding: '5rem 2rem',
          borderRadius: 'var(--radius-card)',
          border: '1px solid rgba(0,0,0,0.1)',
          overflow: 'hidden',
          backgroundImage: 'url(/team-workspace.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}>
          {/* Dark overlay for readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(5,5,6,0.72) 0%, rgba(30,10,5,0.65) 100%)',
            borderRadius: 'inherit',
          }} />
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="section-heading" style={{ marginBottom: '1rem', color: '#ffffff' }}>
              Ready to Upgrade Your Agency?
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Stop duct-taping tools together. Start building a resilient, AI-powered operational system that scales with you.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <GlassButton onClick={() => console.log('CTA')}>
                Book a Demo
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
