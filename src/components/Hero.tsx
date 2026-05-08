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
                fontSize: '0.38em',
                fontWeight: 500,
                color: 'var(--brand-primary-500)',
                marginBottom: '0.8rem',
                display: 'block',
                fontFamily: "'Caveat', cursive",
                textTransform: 'none'
              }}>
                <span style={{ position: 'relative', display: 'inline-block', padding: '0 4px' }}>
                  <span style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: 0,
                    width: '100%',
                    height: '40%',
                    background: 'rgba(247, 98, 30, 0.15)',
                    zIndex: -1,
                    transform: 'rotate(-1deg) skewX(-10deg)',
                    borderRadius: '2px'
                  }} />
                  Transform Your Agency with
                </span>
              </div>
              <span style={{ fontSize: '0.65em', fontWeight: 500, display: 'block', whiteSpace: 'normal' }}>
                The Operating System for
              </span>
              <span style={{
                background: 'linear-gradient(90deg, #F7621E 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                display: 'block',
                fontSize: '1em'
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
          padding: 'clamp(1rem, 5vw, 2rem)',
          minWidth: 0
        }}>
          <div style={{ flex: '1 1 200px', minWidth: '0', alignSelf: 'flex-start' }}>
            <h3 style={{ 
              fontWeight: 700, 
              color: 'var(--neutral-900)', 
              margin: 0, 
              lineHeight: 1.2, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.25rem',
              whiteSpace: 'normal',
              wordBreak: 'break-word'
            }}>
              <span style={{ fontSize: 'clamp(0.85rem, 4vw, 1rem)', color: 'var(--neutral-700)', fontWeight: 600 }}>Build Context & power your Agents </span>
              <span style={{ fontSize: 'clamp(1.4rem, 6vw, 2.2rem)', color: 'var(--brand-primary-500)' }}>with 100+ Integrations</span>
            </h3>
          </div>

          <div style={{ flex: '3 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '0', overflow: 'hidden' }}>

            {/* Row 1: AI Models */}
            <CSSMarquee speed={60} direction="left">
              <div style={{ display: 'flex', gap: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="/openai.webp" width="20" height="20" alt="OpenAI" /> OpenAI</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/googlegemini/8E75B2" width="20" height="20" alt="Gemini" /> Gemini</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/claude" width="20" height="20" alt="Claude" /> Claude</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/openrouter" width="20" height="20" alt="OpenRouter" /> OpenRouter</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="/fal-color.svg" width="20" height="20" alt="Fal AI" /> Fal AI</div>

                {/* Duplicate the set so it fills the screen cleanly */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="/openai.webp" width="20" height="20" alt="OpenAI" /> OpenAI</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/googlegemini/8E75B2" width="20" height="20" alt="Gemini" /> Gemini</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/claude" width="20" height="20" alt="Claude" /> Claude</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/openrouter" width="20" height="20" alt="OpenRouter" /> OpenRouter</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="/fal-color.svg" width="20" height="20" alt="Fal AI" /> Fal AI</div>
              </div>
            </CSSMarquee>

            {/* Row 2: CRM & Productivity */}
            <CSSMarquee speed={55} direction="right">
              <div style={{ display: 'flex', gap: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/googledrive/0F9D58" width="20" height="20" alt="Google Drive" /> Google Drive</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/googledocs/4285F4" width="20" height="20" alt="Google Docs" /> Google Docs</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="/Slack_icon_2019.png" width="20" height="20" alt="Slack" style={{ borderRadius: '4px' }} /> Slack</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/notion/000000" width="20" height="20" alt="Notion" /> Notion</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/trello/0052CC" width="20" height="20" alt="Trello" /> Trello</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/airtable/18BFFF" width="20" height="20" alt="Airtable" /> Airtable</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/gmail/EA4335" width="20" height="20" alt="Gmail" /> Gmail</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/figma/F24E1E" width="20" height="20" alt="Figma" /> Figma</div>
              </div>
            </CSSMarquee>

            {/* Row 3: Platforms */}
            <CSSMarquee speed={65} direction="left">
              <div style={{ display: 'flex', gap: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/googleads/F4B400" width="20" height="20" alt="Google Ads" /> Google Ads</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/googleanalytics/E37400" width="20" height="20" alt="Google Analytics" /> Analytics</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/meta/0468FF" width="20" height="20" alt="Meta" /> Meta</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/meta/0468FF" width="20" height="20" alt="Meta Ads" /> Meta Ads</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/tiktok/000000" width="20" height="20" alt="TikTok" /> TikTok</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/shopify/95BF47" width="20" height="20" alt="Shopify" /> Shopify</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/github/181717" width="20" height="20" alt="GitHub" /> GitHub</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><img src="https://cdn.simpleicons.org/vercel/000000" width="20" height="20" alt="Vercel" /> Vercel</div>
              </div>
            </CSSMarquee>

          </div>
        </div>
        {/* Sub-cards row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1.25rem',
          width: '100%',
          gridColumn: 'span 2',
          minWidth: 0
        }}>
          {/* Card 1 */}
          <div style={{
            background: 'var(--neutral-25)',
            borderRadius: 'var(--radius-card)',
            padding: 'clamp(1.5rem, 5vw, 2.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border-primary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Server size={32} color="var(--brand-primary-500)" strokeWidth={2} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>Fully Managed.</h3>
            </div>
            <p style={{ color: 'var(--neutral-700)', lineHeight: 1.6, margin: 0 }}>
              We handle infrastructure, updates, scaling, and maintenance - so you don't have to think about the technical side.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{
            background: 'var(--neutral-25)',
            borderRadius: 'var(--radius-card)',
            padding: 'clamp(1.5rem, 5vw, 2.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border-primary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={32} color="var(--brand-secondary-500)" strokeWidth={2} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>Fully Yours.</h3>
            </div>
            <p style={{ color: 'var(--neutral-700)', lineHeight: 1.6, margin: 0 }}>
              Everything you need: Context, Agents & Workflows, custom built and managed for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
