import React from 'react';
import { Link2Off, BrainCircuit, Users, Zap } from 'lucide-react';

const Problem = () => {
  return (
    <section className="problem" style={{ marginTop: '6rem' }}>
      <p style={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}>The Problem</p>
      <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', marginBottom: '2rem', lineHeight: 1.2 }}>
        Agencies run on duct tape.<br />
        <span style={{ color: 'var(--brand-primary-500)' }}>It works — until it doesn't.</span>
      </h2>

      <div className="features-grid">
        <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
          <div className="harmony-icon" style={{ marginBottom: '1rem', color: 'var(--brand-primary-500)' }}>
            <Link2Off size={24} strokeWidth={2} />
          </div>
          <h3>Context gets lost</h3>
          <p style={{ marginTop: '0.5rem' }}>Every tool switch is a context gap. Client knowledge, project state, and tribal decisions vanish into Slack threads.</p>
        </div>
        <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
          <div className="harmony-icon" style={{ marginBottom: '1rem', color: 'var(--brand-secondary-500)' }}>
            <BrainCircuit size={24} strokeWidth={2} />
          </div>
          <h3>AI doesn't fit workflows</h3>
          <p style={{ marginTop: '0.5rem' }}>Generic AI tools don't know your domain, your clients, or your process. They assist but never truly execute.</p>
        </div>
        <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
          <div className="harmony-icon" style={{ marginBottom: '1rem', color: 'var(--brand-primary-500)' }}>
            <Users size={24} strokeWidth={2} />
          </div>
          <h3>Scaling means hiring</h3>
          <p style={{ marginTop: '0.5rem' }}>More revenue demands more headcount. The leverage ratio never improves — growth means complexity, not efficiency.</p>
        </div>
        <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
          <div className="harmony-icon" style={{ marginBottom: '1rem', color: 'var(--brand-secondary-500)' }}>
            <Zap size={24} strokeWidth={2} />
          </div>
          <h3>Competing on speed</h3>
          <p style={{ marginTop: '0.5rem' }}>AI-native competitors ship faster. The execution gap widens. Your process is your edge - but only if you can move at AI speed.</p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
