import React from 'react';
import './marquee.css';
import LandingHero from './LandingHero';
import { HeroBackgroundVideo } from './HeroBackgroundVideo';
import { motion } from 'framer-motion';

type IntegrationItem = {
  name: string;
  icon: string;
  iconStyle?: React.CSSProperties;
};

const AI_MODELS: IntegrationItem[] = [
  { name: 'OpenAI', icon: '/openai.webp' },
  { name: 'Gemini', icon: 'https://cdn.simpleicons.org/googlegemini/8E75B2' },
  { name: 'Claude', icon: 'https://cdn.simpleicons.org/claude' },
  { name: 'OpenRouter', icon: 'https://cdn.simpleicons.org/openrouter' },
  { name: 'Fal AI', icon: '/fal-color.svg' },
];

const PRODUCTIVITY: IntegrationItem[] = [
  { name: 'Google Drive', icon: 'https://cdn.simpleicons.org/googledrive/0F9D58' },
  { name: 'Google Docs', icon: 'https://cdn.simpleicons.org/googledocs/4285F4' },
  { name: 'Slack', icon: '/Slack_icon_2019.png', iconStyle: { borderRadius: '4px' } },
  { name: 'Notion', icon: 'https://cdn.simpleicons.org/notion/000000' },
  { name: 'Trello', icon: 'https://cdn.simpleicons.org/trello/0052CC' },
  { name: 'Airtable', icon: 'https://cdn.simpleicons.org/airtable/18BFFF' },
  { name: 'Gmail', icon: 'https://cdn.simpleicons.org/gmail/EA4335' },
  { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
];

const PLATFORMS: IntegrationItem[] = [
  { name: 'Google Ads', icon: 'https://cdn.simpleicons.org/googleads/F4B400' },
  { name: 'Analytics', icon: 'https://cdn.simpleicons.org/googleanalytics/E37400' },
  { name: 'Meta', icon: 'https://cdn.simpleicons.org/meta/0468FF' },
  { name: 'Stripe', icon: 'https://cdn.simpleicons.org/stripe/635BFF' },
  { name: 'TikTok', icon: 'https://cdn.simpleicons.org/tiktok/000000' },
  { name: 'Shopify', icon: 'https://cdn.simpleicons.org/shopify/95BF47' },
  { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717' },
  { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/000000' },
];

/** Repeat items so each marquee segment is wider than any viewport (no gaps on large screens). */
function repeatItems<T>(items: T[], times: number): T[] {
  return Array.from({ length: times }, () => items).flat();
}

function IntegrationChip({ name, icon, iconStyle }: IntegrationItem) {
  return (
    <div className="marquee-integration-item">
      <img src={icon} width={20} height={20} alt="" aria-hidden style={iconStyle} />
      <span>{name}</span>
    </div>
  );
}

type IntegrationsMarqueeProps = {
  items: IntegrationItem[];
  direction?: 'left' | 'right';
  speed?: number;
};

/**
 * Seamless infinite marquee: one animated track with two identical segments.
 * Animation moves -50% of track width (= one segment) for a gapless loop.
 */
type HeroValueCardProps = {
  icon: string;
  title: string;
  body: string;
};

const HERO_VALUE_PROPS: HeroValueCardProps[] = [
  {
    icon: 'architecture',
    title: 'Developed for you',
    body:
      'We design and build agents, workflows, and knowledge graphs around how your agency actually operates—not one-size-fits-all templates.',
  },
  {
    icon: 'cloud_done',
    title: 'Managed for you',
    body:
      'Infrastructure, updates, scaling, and monitoring stay on us—so your team focuses on clients and delivery, not keeping the stack alive.',
  },
  {
    icon: 'key',
    title: 'Owned by you',
    body:
      'Your data, models, and IP stay in your environment. You control what ships, where it runs, and how it evolves—no black-box lock-in.',
  },
];

function HeroValueIcon({ name }: { name: string }) {
  return (
    <span className="material-symbols-rounded hero-value-card__icon" aria-hidden>
      {name}
    </span>
  );
}

function HeroValueCard({ icon, title, body }: HeroValueCardProps) {
  return (
    <article className="hero-value-card">
      <div className="hero-value-card__header">
        <HeroValueIcon name={icon} />
        <h3 className="hero-value-card__title">{title}</h3>
      </div>
      <p className="hero-value-card__body">{body}</p>
    </article>
  );
}

function IntegrationsMarquee({ items, direction = 'left', speed = 40 }: IntegrationsMarqueeProps) {
  const segmentItems = repeatItems(items, 4);
  const segment = (
    <div className="marquee-items-row">
      {segmentItems.map((item, i) => (
        <IntegrationChip key={`${item.name}-${i}`} {...item} />
      ))}
    </div>
  );

  return (
    <div className="marquee-container marquee-container--full-bleed">
      <div
        className={`marquee-track ${direction === 'right' ? 'marquee-track--right' : 'marquee-track--left'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="marquee-segment">{segment}</div>
        <div className="marquee-segment" aria-hidden="true">
          {segment}
        </div>
      </div>
    </div>
  );
}

const Hero: React.FC = () => {
  return (
    <div className="dd-hero-content relative">
      <div className="dd-hero-center">
        <div className="dd-hero-center__content">
        <LandingHero
          title={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ lineHeight: 1.1 }}
            >
              <span style={{
                fontFamily: 'var(--font-family)',
                fontSize: '24px',
                fontWeight: 300,
                fontStyle: 'normal',
                display: 'block',
                whiteSpace: 'normal',
                lineHeight: 1.1,
                marginBottom: '0.2rem',
              }}>
                Operating System for
              </span>
              <span style={{
                background: 'linear-gradient(90deg, #F7621E 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                display: 'block',
                fontSize: 'clamp(2.5rem, 12vw, 1.5em)',
                whiteSpace: 'nowrap',
                lineHeight: 1.1
              }}>
                Humans + AI
              </span>
            </motion.div>
          }
          ctaLabel="Book a Demo"
          onCtaClick={() => window.open('https://calendly.com/som-official01/30min', '_blank')}
        />
        </div>
        <HeroBackgroundVideo />
      </div>

      <section className="hero-integrations-strip" aria-label="Integrations">
        <div className="hero-integrations-marquees">
          <IntegrationsMarquee items={AI_MODELS} direction="left" speed={50} />
          <IntegrationsMarquee items={PRODUCTIVITY} direction="right" speed={55} />
          <IntegrationsMarquee items={PLATFORMS} direction="left" speed={48} />
        </div>

        <div className="hero-integrations-header">
          <h3 className="hero-integrations-title">
            <span className="hero-integrations-eyebrow">Build your OS with custom Agents, Workflows and Knowledge Graphs — Powered by</span>
            <span className="hero-integrations-headline">100+ integrations</span>
          </h3>
        </div>
      </section>

      <div className="bento-hero-grid">
        <div className="bento-subcards-row">
          {HERO_VALUE_PROPS.map((card) => (
            <HeroValueCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
