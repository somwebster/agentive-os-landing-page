import React from 'react';
import { ExternalLink } from 'lucide-react';

const Problem = () => {
  return (
    <section className="problem" style={{ marginTop: '6rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 className="section-heading">
          Agencies run on duct tape.<br />
          <span style={{ color: 'var(--brand-primary-500)' }}>It works, until it doesn't.</span>
        </h2>

        <div className="features-grid">
          <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
            <h3>Context gets lost in tools</h3>
            <p style={{ marginTop: '0.5rem' }}>Context breaks across tools. Client knowledge and decisions get buried in Slack, docs, and notes.</p>
          </div>

          <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
            <h3>Scaling means hiring</h3>
            <p style={{ marginTop: '0.5rem' }}>More revenue means more people. Complexity grows faster than efficiency.</p>
          </div>
          <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
            <h3>Competing on execution speed</h3>
            <p style={{ marginTop: '0.5rem' }}>AI-native competitors move faster. Your edge is process and quality, only if you can keep up..</p>
          </div>
          <div className="card" style={{ borderRadius: 'var(--radius-card)' }}>
            <h3>AI doesn't truly fit Process</h3>
            <p style={{ marginTop: '0.5rem' }}>Most AI tools don’t understand your process, so you end up stitching them together, until it breaks.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '5rem', maxWidth: '800px' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--brand-primary-500)' }}>But...</p>
          <h3 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: '0.5rem', lineHeight: 1 }}>
            Your process is the product.
          </h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-body)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Your leverage isn’t the tools you use, it’s how you think and execute. Clients still pay for human strategy & expertise. but expect AI Speed. AI-native agencies are rising fast, and the ones that win are building closed loop systems around their process, not stacking more AI tools on top of it.

          </p>
          <a
            href="https://www.ycombinator.com/library/OX-the-playbook-for-building-an-ai-native-company"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-yc"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid var(--color-border-primary)',
              background: 'var(--color-surface-secondary)',
              color: 'var(--color-text-heading)'
            }}
          >
            Read the YC Playbook for AI-Native Companies
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Problem;
