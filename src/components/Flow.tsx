import React from 'react';
import GlassButton from './GlassButton';
import { SansEmphasis } from './SansEmphasis';

const Flow = () => {
  return (
    <section className="flow" style={{ marginTop: '6rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 className="section-heading" style={{ marginBottom: '1rem' }}>
          <SansEmphasis>Human-Led</SansEmphasis> Strategy.<br />
          <span style={{ color: 'var(--brand-secondary-500)' }}><SansEmphasis>AI-Powered</SansEmphasis> Execution.</span>
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
      </div>

      {/* What You Get */}
      <div style={{
        maxWidth: '1200px', margin: '4rem auto 0', padding: '0 2rem',
      }}>
        <div style={{
          border: '1px solid var(--color-border-primary)',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.92)',
        }}>
          {/* Header */}
          <div style={{
            padding: '2rem 2.5rem',
            borderBottom: '1px solid var(--color-border-primary)',
            background: 'rgba(255,255,255,0.92)',
          }}>
            <h3 style={{
              margin: '0 0 0.4rem',
              fontSize: '1.5rem', fontWeight: 700,
              color: 'var(--color-text-heading)',
              letterSpacing: '-0.01em',
            }}>What You Get</h3>
            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
              With us, you don't just get a software. You get a technical partner.
            </p>
          </div>

          {/* Three columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}>
            {/* Team */}
            <div style={{
              padding: '1.75rem 2rem',
              borderRight: '1px solid var(--color-border-primary)',
            }}>
              <div style={{
                fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--color-text-muted)',
                marginBottom: '1.25rem',
              }}>Team</div>
              {[
                { role: 'AI Engineer', desc: 'Expert in agent architectures and growth systems', color: 'var(--brand-secondary-500)', avatar: 'https://i.pravatar.cc/80?img=12' },
                { role: 'Product Designer', desc: 'Specializes in conversational interfaces for AI agents', color: 'var(--brand-primary-500)', avatar: 'https://i.pravatar.cc/80?img=49' },
              ].map((member, i) => (
                <div key={member.role} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
                  paddingBottom: i === 0 ? '1rem' : 0,
                  marginBottom: i === 0 ? '1rem' : 0,
                  borderBottom: i === 0 ? '1px solid var(--color-border-primary)' : 'none',
                }}>
                  <img
                    src={member.avatar}
                    alt={member.role}
                    style={{
                      width: 40, height: 40, borderRadius: '50%',
                      objectFit: 'cover', flexShrink: 0,
                      border: `2px solid ${member.color}`,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: '0.2rem' }}>
                      {member.role}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
                      {member.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Software */}
            <div style={{
              padding: '1.75rem 2rem',
              borderRight: '1px solid var(--color-border-primary)',
            }}>
              <div style={{
                fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--color-text-muted)',
                marginBottom: '1rem',
              }}>Software</div>
              <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--color-text-body)', lineHeight: 1.5 }}>
                Custom Built Operating System — <strong>Truly Yours</strong>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {['Agents', 'Workflows', 'Context Management System', 'Integrations', 'Client & Team Interfaces'].map(item => (
                  <span key={item} style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--m3-shape-full)',
                    background: 'var(--brand-secondary-25)',
                    border: '1px solid var(--brand-secondary-400)',
                    color: 'var(--brand-secondary-500)',
                    fontSize: '0.78rem', fontWeight: 500,
                  }}>{item}</span>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={{
                fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--color-text-muted)',
                marginBottom: '1rem',
              }}>Pricing</div>
              <div style={{
                display: 'inline-flex', alignItems: 'baseline', gap: '0.3rem',
                marginBottom: '0.6rem',
              }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text-heading)', letterSpacing: '-0.02em' }}>$3,500</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>/month</span>
              </div>
              <p style={{ margin: '0 0 0.85rem', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Build Phase</p>
              <div style={{
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--m3-shape-medium)',
                background: 'var(--brand-primary-25)',
                border: '1px solid var(--color-border-primary)',
                marginBottom: '1rem',
              }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--brand-primary-500)', fontWeight: 600 }}>
                  Then usage-based pricing post-build. No fixed payments.
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <GlassButton onClick={() => window.open('https://calendly.com/som-official01/30min', '_blank')}>
                  Book a Demo
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto 0', padding: '0 2rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem', display: 'inline-block', background: 'var(--brand-primary-500)', color: '#fff', padding: '0.3rem 0.85rem', borderRadius: '999px' }}>
          See us in action
        </p>
        <div style={{
          border: '1px solid var(--color-border-primary)',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.92)',
        }}>
          {/* Image */}
          <a href="https://kommerceai.org" target="_blank" rel="noopener noreferrer" style={{ display: 'block', position: 'relative', height: '420px', overflow: 'hidden' }}>
            <img
              src="/kommerce.png"
              alt="Kommerce AI"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(5,5,6,0.1) 0%, rgba(5,5,6,0.55) 100%)',
            }} />
          </a>

          {/* Content below */}
          <div style={{ padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
            <a
              href="https://kommerceai.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: '0 0 auto', textDecoration: 'none' }}
            >
              <h3 style={{
                margin: '0 0 0.25rem',
                fontSize: '1.4rem', fontWeight: 700,
                color: 'var(--color-text-heading)',
                letterSpacing: '-0.02em', lineHeight: 1.2,
              }}>Kommerce AI</h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                First AI-native agency for e-commerce
              </p>
            </a>

            <div style={{ width: '1px', height: '36px', background: 'var(--color-border-primary)', flexShrink: 0 }} />

            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-body)', lineHeight: 1.65, flex: 1 }}>
              10x media buyer throughput in 30 days. Faster execution, more accounts, better performance than traditional agencies and AI tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Flow;
