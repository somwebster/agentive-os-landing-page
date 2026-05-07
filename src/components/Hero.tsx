import React from 'react';
import { Server, ShieldCheck } from 'lucide-react';
import { 
  SiGithub, SiFigma, SiGmail, SiGoogledrive, SiHubspot, SiShopify, SiLinear, SiNotion,
  SiStripe, SiTrello, SiAsana, SiZoom, SiJira, SiDropbox, SiAirtable, SiZendesk, 
  SiDiscord, SiGitlab, SiMailchimp, SiZapier, SiWebflow, SiDatadog, SiGoogle, SiNetlify
} from '@icons-pack/react-simple-icons';
import Marquee from 'react-fast-marquee';
import LandingHero from './LandingHero';
import { HeroHighlight, Highlight } from './hero-highlight';
import { motion } from 'framer-motion';

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
          
          <div style={{ flex: '3 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '250px', borderLeft: '1px solid rgba(0,0,0,0.05)', paddingLeft: '2rem', marginLeft: '-2rem', overflow: 'hidden' }}>
            
            {/* Row 1 */}
            <Marquee speed={30} gradient={true} gradientColor="white" gradientWidth={40} direction="left">
              <div style={{ display: 'flex', gap: '3rem', paddingRight: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiGithub size={20} color="#181717" /> GitHub</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiGoogle size={20} color="#4285F4" /> Google</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiFigma size={20} color="#F24E1E" /> Figma</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiNotion size={20} color="#000000" /> Notion</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiShopify size={20} color="#95BF47" /> Shopify</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiLinear size={20} color="#5E6AD2" /> Linear</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiDiscord size={20} color="#5865F2" /> Discord</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiNetlify size={20} color="#00C7B7" /> Netlify</div>
              </div>
            </Marquee>

            {/* Row 2 */}
            <Marquee speed={25} gradient={true} gradientColor="white" gradientWidth={40} direction="right">
              <div style={{ display: 'flex', gap: '3rem', paddingRight: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiStripe size={20} color="#008CDD" /> Stripe</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiTrello size={20} color="#0052CC" /> Trello</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiAsana size={20} color="#273347" /> Asana</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiAirtable size={20} color="#18BFFF" /> Airtable</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiZapier size={20} color="#FF4A00" /> Zapier</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiDatadog size={20} color="#632CA6" /> Datadog</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiGmail size={20} color="#EA4335" /> Gmail</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiHubspot size={20} color="#FF7A59" /> HubSpot</div>
              </div>
            </Marquee>

            {/* Row 3 */}
            <Marquee speed={35} gradient={true} gradientColor="white" gradientWidth={40} direction="left">
              <div style={{ display: 'flex', gap: '3rem', paddingRight: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiZendesk size={20} color="#03363D" /> Zendesk</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiJira size={20} color="#0052CC" /> Jira</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiDropbox size={20} color="#0061FF" /> Dropbox</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiWebflow size={20} color="#4353FF" /> Webflow</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiGitlab size={20} color="#FCA121" /> GitLab</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiMailchimp size={20} color="#FFE01B" /> Mailchimp</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiZoom size={20} color="#2D8CFF" /> Zoom</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}><SiGoogledrive size={20} color="#0F9D58" /> Drive</div>
              </div>
            </Marquee>

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
