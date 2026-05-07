import React from 'react';
import { Server, ShieldCheck } from 'lucide-react';
import './marquee.css';
import LandingHero from './LandingHero';
import { HeroHighlight, Highlight } from './hero-highlight';
import { motion } from 'framer-motion';

const CSSMarquee = ({ children, direction = 'left', speed = 30 }: any) => {
  return (
    <div className="marquee-container">
      <div className={`marquee-content ${direction === 'right' ? 'reverse' : ''}`} style={{ animationDuration: `${speed}s` }}>
        {children}
      </div>
      <div className={`marquee-content ${direction === 'right' ? 'reverse' : ''}`} aria-hidden="true" style={{ animationDuration: `${speed}s` }}>
        {children}
      </div>
    </div>
  );
};

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
                Architecting AI-Native Agencies with
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

      {/* Bento Grid */}
      <div className="bento-hero-grid">
        
        {/* Logos Card (Spans full width on desktop) */}
        <div className="bento-logos-card card" style={{ 
          borderRadius: 'var(--radius-card)',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '2rem',
          padding: '1.5rem 2rem'
        }}>
          <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--neutral-900)', margin: 0, lineHeight: 1.3 }}>
              Integrate with <br />
              <span style={{ color: 'var(--brand-primary-500)' }}>100+ tools</span>
            </h3>
          </div>
          
          <div style={{ flex: '3 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '250px', overflow: 'hidden' }}>
            
            {/* Row 1 */}
            <CSSMarquee speed={30} direction="left">
              <div style={{ display: 'flex', gap: '3rem', paddingRight: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/github/181717" width="20" height="20" alt="GitHub" /> GitHub</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/google/4285F4" width="20" height="20" alt="Google" /> Google</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/figma/F24E1E" width="20" height="20" alt="Figma" /> Figma</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/notion/000000" width="20" height="20" alt="Notion" /> Notion</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/shopify/95BF47" width="20" height="20" alt="Shopify" /> Shopify</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/linear/5E6AD2" width="20" height="20" alt="Linear" /> Linear</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/discord/5865F2" width="20" height="20" alt="Discord" /> Discord</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/netlify/00C7B7" width="20" height="20" alt="Netlify" /> Netlify</div>
              </div>
            </CSSMarquee>

            {/* Row 2 */}
            <CSSMarquee speed={25} direction="right">
              <div style={{ display: 'flex', gap: '3rem', paddingRight: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/stripe/008CDD" width="20" height="20" alt="Stripe" /> Stripe</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/trello/0052CC" width="20" height="20" alt="Trello" /> Trello</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/asana/273347" width="20" height="20" alt="Asana" /> Asana</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/airtable/18BFFF" width="20" height="20" alt="Airtable" /> Airtable</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/zapier/FF4A00" width="20" height="20" alt="Zapier" /> Zapier</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/datadog/632CA6" width="20" height="20" alt="Datadog" /> Datadog</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/gmail/EA4335" width="20" height="20" alt="Gmail" /> Gmail</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/hubspot/FF7A59" width="20" height="20" alt="HubSpot" /> HubSpot</div>
              </div>
            </CSSMarquee>

            {/* Row 3 */}
            <CSSMarquee speed={35} direction="left">
              <div style={{ display: 'flex', gap: '3rem', paddingRight: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/zendesk/03363D" width="20" height="20" alt="Zendesk" /> Zendesk</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/jira/0052CC" width="20" height="20" alt="Jira" /> Jira</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/dropbox/0061FF" width="20" height="20" alt="Dropbox" /> Dropbox</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/webflow/4353FF" width="20" height="20" alt="Webflow" /> Webflow</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/gitlab/FCA121" width="20" height="20" alt="GitLab" /> GitLab</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/mailchimp/FFE01B" width="20" height="20" alt="Mailchimp" /> Mailchimp</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/zoom/2D8CFF" width="20" height="20" alt="Zoom" /> Zoom</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/googledrive/0F9D58" width="20" height="20" alt="Drive" /> Drive</div>
              </div>
            </CSSMarquee>

          </div>
        </div>

        {/* Feature 1 */}
        <div className="card" style={{ borderRadius: 'var(--radius-card)', padding: '2rem', height: '100%' }}>
          <div style={{ color: 'var(--brand-primary-500)', marginBottom: '1rem' }}>
            <Server size={32} strokeWidth={2} />
          </div>
          <h3>Fully Managed.</h3>
          <p style={{ marginTop: '0.8rem' }}>We handle infrastructure, updates, scaling, and maintenance - so you don’t have to think about the technical side.</p>
        </div>

        {/* Feature 2 */}
        <div className="card" style={{ borderRadius: 'var(--radius-card)', padding: '2rem', height: '100%' }}>
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
