import React from 'react';
import { Server, ShieldCheck, MessageSquare, Code, PenTool, Mail, HardDrive, Database, ShoppingCart, CheckCircle, FileText } from 'lucide-react';
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
          background: 'var(--neutral-100)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border-primary)',
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
          
          <div style={{ flex: '3 1 500px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '1.25rem', minWidth: '250px', borderLeft: '1px solid rgba(0,0,0,0.05)', paddingLeft: '2rem', marginLeft: '-2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}>
              <MessageSquare size={18} color="#E01E5A" /> Slack
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}>
              <Code size={18} color="#181717" /> GitHub
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}>
              <PenTool size={18} color="#F24E1E" /> Figma
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}>
              <Mail size={18} color="#EA4335" /> Gmail
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}>
              <HardDrive size={18} color="#0F9D58" /> Drive
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}>
              <Database size={18} color="var(--brand-primary-500)" /> HubSpot
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}>
              <ShoppingCart size={18} color="#95BF47" /> Shopify
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}>
              <CheckCircle size={18} color="#5E6AD2" /> Linear
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neutral-700)', fontWeight: 600, fontSize: '0.9rem' }}>
              <FileText size={18} color="#000000" /> Notion
            </div>
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
