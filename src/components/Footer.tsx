import React from 'react';

// ─── Brand constants (mirrors CSS custom properties) ──────────────────────────
const BRAND = {
  primary:    'var(--brand-primary-500)',     // #f7621e
  secondary:  'var(--brand-secondary-500)',   // #963bf7
  surface:    'var(--color-surface-footer)',  // #050506
  border:     'rgba(255,255,255,0.08)',
  textMuted:  'var(--brand-neutral-400)',     // #a19caa
  textDim:    'rgba(255,255,255,0.35)',
  textLight:  'rgba(255,255,255,0.65)',
  white:      '#ffffff',
};

// ─── Nav columns ──────────────────────────────────────────────────────────────
const NAV = [
  {
    heading: 'Product',
    links: [
      { label: 'Home',               href: '#' },
      { label: 'Products & Services', href: '#' },
      { label: 'Case Studies',        href: '#' },
      { label: 'Pricing',             href: '#' },
      { label: 'FAQ',                 href: '#' },
    ],
  },
  {
    heading: 'For Builders',
    links: [
      { label: 'Agentive SDK',    href: '#' },
      { label: 'Component Library', href: '#' },
      { label: 'MCP',             href: '#' },
      { label: 'API Reference',   href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',           href: '#' },
      { label: 'Blog',            href: '#' },
      { label: 'Privacy Policy',  href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
];

// ─── Logo mark ────────────────────────────────────────────────────────────────
const LogoMark = ({ size = 28 }: { size?: number }) => (
  <img
    src="/Logo-white.png"
    alt="Agentive OS"
    style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }}
  />
);

// ─── Social icons (inline SVG for zero deps) ─────────────────────────────────
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

// ─── Full footer (home page — full viewport width) ───────────────────────────
const FullFooter = () => (
  <footer style={{
    width: '100vw',
    background: BRAND.surface,
    borderTop: '1px solid ' + BRAND.border,
  }}>
    {/* Main content row */}
    <div className="site-footer-inner site-footer-grid" style={{
      paddingTop: '4rem',
      paddingBottom: '3rem',
      paddingRight: '4rem',
      borderBottom: '1px solid ' + BRAND.border,
    }}>
      {/* Brand */}
      <div className="site-footer-brand">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <LogoMark size={36} />
          <span style={{
            fontWeight: 700, fontSize: '1.2rem', color: BRAND.white,
            fontFamily: 'var(--font-family)', letterSpacing: '-0.01em',
          }}>
            Agentive <span style={{ color: BRAND.secondary }}>OS</span>
          </span>
        </div>
        <p style={{
          fontSize: '0.875rem', color: BRAND.textLight,
          lineHeight: 1.75, maxWidth: '260px', margin: '0 0 2rem',
        }}>
          The AI-native operating system for human agencies. Build, deploy, and scale intelligent agents around your process.
        </p>
        {/* Social icons */}
        <div style={{ display: 'flex', gap: '0.625rem' }}>
          {[
            { icon: <TwitterIcon />,  href: '#', label: 'Twitter' },
            { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
            { icon: <GitHubIcon />,   href: '#', label: 'GitHub' },
          ].map(s => (
            <a key={s.label} href={s.href} aria-label={s.label}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: '50%',
                background: BRAND.border, color: BRAND.textMuted,
                textDecoration: 'none', transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = BRAND.white; a.style.background = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.color = BRAND.textMuted; a.style.background = BRAND.border; }}
            >{s.icon}</a>
          ))}
        </div>
      </div>

      {/* Nav columns */}
      {NAV.map(col => (
        <div key={col.heading}>
          <div style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: BRAND.textDim, marginBottom: '1.25rem',
          }}>{col.heading}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {col.links.map(l => (
              <li key={l.label}>
                <a href={l.href}
                  style={{ fontSize: '0.9rem', color: BRAND.textLight, textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = BRAND.white; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = BRAND.textLight; }}
                >{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Bottom bar */}
    <div className="site-footer-inner" style={{
      paddingTop: '1.25rem',
      paddingBottom: '1.25rem',
      paddingRight: '4rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '0.75rem',
    }}>
      <span style={{ fontSize: '0.82rem', color: BRAND.textDim }}>
        © {new Date().getFullYear()} Agentive OS. All rights reserved.
      </span>
      <div style={{ display: 'flex', gap: '1.75rem' }}>
        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
          <a key={l} href="#"
            style={{ fontSize: '0.82rem', color: BRAND.textDim, textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = BRAND.textLight; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = BRAND.textDim; }}
          >{l}</a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── Compact footer (SDK / Component Library pages) ──────────────────────────
const CompactFooter = () => (
  <div style={{
    height: '44px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    paddingLeft: '1rem', paddingRight: '1rem',
    flexShrink: 0,
  }}>
    {/* Left: logo + wordmark */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <img src="/logo2.png" alt="Agentive OS" style={{ width: 18, height: 18, objectFit: 'contain' }} />
      <span style={{
        fontSize: '0.75rem', fontWeight: 600,
        color: 'var(--color-text-muted, var(--neutral-400))',
        fontFamily: 'var(--font-family)',
      }}>
        Agentive <span style={{ color: 'var(--brand-secondary-500)' }}>OS</span>
      </span>
    </div>

    {/* Right: copyright + links */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
      {['Privacy', 'Terms', 'Docs'].map(l => (
        <a
          key={l}
          href="#"
          style={{
            fontSize: '0.72rem', color: 'var(--neutral-400)',
            textDecoration: 'none', transition: 'color 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-body)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--neutral-400)'; }}
        >
          {l}
        </a>
      ))}
      <span style={{ fontSize: '0.72rem', color: 'var(--neutral-400)' }}>
        © {new Date().getFullYear()} Agentive OS
      </span>
    </div>
  </div>
);

// ─── Export ───────────────────────────────────────────────────────────────────
interface FooterProps {
  compact?: boolean;
}

const Footer = ({ compact = false }: FooterProps) =>
  compact ? <CompactFooter /> : <FullFooter />;

export default Footer;
