import React from 'react';

const CaseStudy = () => {
  return (
    <section className="case-study" id="case-study" style={{ marginTop: '2rem', marginBottom: '6rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(247, 98, 30, 0.08), rgba(168, 85, 247, 0.08))',
          border: '1px solid rgba(247, 98, 30, 0.2)',
          borderRadius: 'var(--radius-card)',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          {/* Left Side: Text Content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-primary-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Case Study
            </div>
            <h3 style={{ fontSize: '1.75rem', color: 'var(--neutral-900)', margin: 0, lineHeight: 1.3 }}>
              Organic Marketing Launches Kommerce
              <span style={{ display: 'block', fontSize: '1.15rem', color: 'var(--neutral-600)', marginTop: '0.5rem', fontWeight: 500 }}>
                The AI Native Agency Powered by Agentive OS
              </span>
            </h3>
            <p style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--neutral-800)', margin: 0 }}>
              <span style={{ background: 'linear-gradient(90deg, #F7621E 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>2x capacity increase</span> in 30 days without a single hire.
            </p>
            
            <div style={{ marginTop: '1rem', paddingLeft: '1.5rem', borderLeft: '3px solid var(--brand-primary-500)' }}>
              <p style={{ fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--neutral-700)', margin: 0, lineHeight: 1.6 }}>
                "Agentive OS didn't just automate tasks; it completely transformed our capacity. We scaled our operations overnight and doubled our output without expanding the team."
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--neutral-900)' }}>
                — Team Kommerce
              </div>
            </div>
          </div>

          {/* Right Side: Web Preview */}
          <div style={{ 
            width: '100%', 
            height: '400px', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            border: '1px solid var(--color-border-primary)',
            background: 'white',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Browser Header Mock */}
            <div style={{ background: 'var(--neutral-100)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--color-border-primary)' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }}></div>
              <div style={{ marginLeft: '1rem', background: 'white', padding: '0.2rem 1rem', borderRadius: '12px', fontSize: '0.7rem', color: 'var(--neutral-500)', flex: 1, textAlign: 'center', border: '1px solid var(--color-border-primary)' }}>
                kommerceai.org/kommercelanding
              </div>
            </div>
            
            {/* Preview Image */}
            <div style={{ flex: 1, width: '100%', height: '100%', overflow: 'hidden', background: '#f8f9fa' }}>
              <img 
                src="/kommerce.png" 
                alt="Kommerce Landing Page Preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
