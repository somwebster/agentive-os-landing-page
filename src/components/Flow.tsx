import React from 'react';

const Flow = () => {
  return (
    <section className="flow" style={{ marginTop: '6rem' }}>
      <p style={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}>How It Works</p>
      <h2 className="section-heading" style={{ marginBottom: '1rem' }}>
        Human-Led Strategy.<br />
        <span style={{ color: 'var(--brand-secondary-500)' }}>AI-Powered Execution.</span>
      </h2>
      <p style={{ fontSize: '1.1rem', color: 'var(--neutral-700)', marginBottom: '3rem', maxWidth: '600px' }}>
        This isn't automation slapped on top of chaos. It's a fundamental shift in how work flows through your agency.
      </p>

      <div className="features-grid">
        <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ background: 'var(--brand-primary-500)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '8px', fontWeight: 'bold' }}>01</span>
            <h3 style={{ margin: 0 }}>Define</h3>
          </div>
          <p>Map workflows to uncover bottlenecks, tool gaps, and AI opportunities.</p>
        </div>

        <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ background: 'var(--brand-secondary-500)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '8px', fontWeight: 'bold' }}>02</span>
            <h3 style={{ margin: 0 }}>Develop</h3>
          </div>
          <p>Build your context system, agents, and workflows using Agentive SDK & APIs.</p>
        </div>

        <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ background: 'var(--brand-primary-500)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '8px', fontWeight: 'bold' }}>03</span>
            <h3 style={{ margin: 0 }}>Deploy</h3>
          </div>
          <p>Launch production-ready environments on Agentive Cloud or your own infra.</p>
        </div>

        <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ background: 'var(--brand-secondary-500)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '8px', fontWeight: 'bold' }}>04</span>
            <h3 style={{ margin: 0 }}>Monitor</h3>
          </div>
          <p>Track throughput, optimize agents, and continuously identify new bottlenecks.</p>
        </div>
      </div>
    </section>
  );
};

export default Flow;
