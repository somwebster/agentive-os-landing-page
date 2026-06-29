import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  CreditCard,
  FileText,
  Image,
  Layers,
  MessageSquareText,
  Sparkles,
  Unplug,
  UsersRound,
  Zap,
} from 'lucide-react';
import GlassButton from '../GlassButton';
import { LandingV2HeroAnimation } from './LandingV2HeroAnimation';
import type { LandingV2HeroAnimProgress } from './hero-animation/initHeroAnimation';
import '../marquee.css';

const CALENDLY_URL = 'https://calendly.com/som-official01/30min';

type IconCmp = React.ComponentType<{ size?: number; strokeWidth?: number }>;

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

const PILLARS: {
  title: string;
  body: string;
  icon?: IconCmp;
  graphic?: string;
  graphicAlt?: string;
}[] = [
  {
    title: 'Made for marketers.',
    body: "The building blocks are marketing workflows. That's why it feels fast, and why you will not need a developer to get started.",
    graphic: '/landing-v2-pillar-marketers.svg',
    graphicAlt: 'Marketing workflow icons arranged in a circle',
  },
  {
    title: 'You stay in control.',
    body: 'Agents run the work; you approve what matters. Your judgment at scale, not handed to a black box.',
    graphic: '/landing-v2-pillar-control.svg',
    graphicAlt: 'Campaign approval controls with play, pause, and stop actions',
  },
  {
    title: 'Yours to own.',
    body: 'Your workflows, your process, your IP. Keep them here or run them in your own setup. No lock-in.',
    graphic: '/landing-v2-pillar-ownership.svg',
    graphicAlt: 'Ownership and workflow control illustration',
  },
];

const PROBLEMS: {
  icon: IconCmp;
  tag: string;
  title: string;
  body: string;
}[] = [
  {
    icon: Unplug,
    tag: 'Tool sprawl',
    title: "The AI tools don't work how you work",
    body: 'Each does one task, none of them connect, and none of them know your accounts. You end up gluing them together with prompts and prayers.',
  },
  {
    icon: FileText,
    tag: 'Manual execution',
    title: 'The repetitive work still falls on you',
    body: 'Reporting, QA, pacing, and client updates eat the hours you would rather spend on strategy and creative.',
  },
  {
    icon: UsersRound,
    tag: 'Margin drag',
    title: 'The only way to do more is hire more',
    body: 'More accounts means more people, more handoffs, and more margin pressure with every hire.',
  },
  {
    icon: Zap,
    tag: 'Speed gap',
    title: 'Faster competitors are setting the pace',
    body: 'Your edge is judgment and taste, but only if your operation can keep up with the volume they ship in a day.',
  },
];

const HOW_METRICS = [
  {
    statement: 'Ship client-ready work without the late nights',
    value: '10×',
    label: 'deliveries per week',
    attribution: {
      name: 'Kommerce AI',
      role: 'Agency founder',
      avatar: 'https://i.pravatar.cc/80?img=32',
    },
    icon: UsersRound,
  },
  {
    statement: 'Let agents handle the repetitive ops',
    value: '20+',
    label: 'hours saved per account',
    attribution: {
      name: 'Catalyst Growth',
      role: 'Head of operations',
      avatar: 'https://i.pravatar.cc/80?img=47',
    },
    icon: Sparkles,
  },
  {
    statement: 'Run more accounts without adding headcount',
    value: '4.5+',
    label: 'ROAS per brand',
    attribution: {
      name: 'Brightpath Media',
      role: 'Paid media lead',
      avatar: 'https://i.pravatar.cc/80?img=12',
    },
    icon: Layers,
  },
];

/* Previous step-by-step content — kept for reference
const HOW_STEPS = [
  {
    title: 'Start from a template.',
    body: 'Choose client reporting, image generation, email marketing, media buying, or start from scratch.',
    icon: FileText,
  },
  {
    title: 'Tell it how you work.',
    body: 'Write the brief in plain English, drag the steps, and connect the accounts your team already uses.',
    icon: Workflow,
  },
  {
    title: 'Turn it on.',
    body: 'The agent runs the work and checks with you before anything touches spend or brand.',
    icon: Send,
  },
];
*/

const BUILD_EXAMPLES = [
  { title: 'New-client research and onboarding', icon: UsersRound },
  { title: 'Custom creative production workflows', icon: Image },
  { title: 'Industry optimized media buying and ads management', icon: BarChart3 },
  { title: 'Internal operations and communication management', icon: MessageSquareText },
  { title: 'Social media creator manager', icon: Sparkles },
];

const PRICING = [
  {
    name: 'Self-serve',
    body: 'Start for free, then build and run your own agents with platform access, building blocks, and usage for the work your agents actually do.',
    meta: 'Free to start · subscription plus usage',
    cta: 'Try for free',
    featured: true,
  },
  {
    name: 'Build with us',
    body: 'For complex operations, our team builds alongside you. You still own the workflows, process, and IP.',
    meta: 'Monthly build fee plus usage',
    cta: 'Talk to our team',
    featured: false,
  },
];

const FAQS = [
  {
    q: 'Do I need to write code?',
    a: 'No. The v2 positioning is built around marketers configuring workflows in plain English, starting from templates, and connecting accounts without developer help.',
  },
  {
    q: 'Can I keep my current tools?',
    a: 'Yes. Agentive OS is designed to run inside your existing stack, connected to the platforms, docs, accounts, and communication tools your team already relies on.',
  },
  {
    q: 'Where do approvals happen?',
    a: 'Agents can run the repetitive work, but important spend, brand, and client-facing decisions can pause for human approval before anything ships.',
  },
  {
    q: 'How does pricing work after the free start?',
    a: 'Self-serve starts free with limits. As you scale, you pay subscription plus usage. For complex operations, you can work with our team on a build-with-us plan.',
  },
];

function repeatItems<T>(items: T[], times: number): T[] {
  return Array.from({ length: times }, () => items).flat();
}

function openCalendly() {
  window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" className="landing-v2-secondary-btn" onClick={onClick}>
      <span>{children}</span>
      <ArrowRight size={16} strokeWidth={2.3} />
    </button>
  );
}

function IntegrationChip({ name, icon, iconStyle, iconSize = 20 }: IntegrationItem & { iconSize?: number }) {
  return (
    <div className="marquee-integration-item">
      <img src={icon} width={iconSize} height={iconSize} alt="" aria-hidden style={iconStyle} />
      <span>{name}</span>
    </div>
  );
}

function IntegrationsMarquee({
  items,
  direction = 'left',
  speed = 44,
  iconSize = 20,
}: {
  items: IntegrationItem[];
  direction?: 'left' | 'right';
  speed?: number;
  iconSize?: number;
}) {
  const segmentItems = repeatItems(items, 4);
  const segment = (
    <div className="marquee-items-row">
      {segmentItems.map((item, i) => (
        <IntegrationChip key={`${item.name}-${i}`} {...item} iconSize={iconSize} />
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

const HERO_STEPS = [
  {
    title: 'Drop the context',
    description:
      'Bring in docs, ads, CRM records, and the tools you already use so your agent starts from real business context.',
  },
  {
    title: 'Tell it how you work',
    description:
      'Describe routing rules, tone, approvals, and handoffs in plain language — the way you would explain it to a teammate.',
  },
  {
    title: 'Turn it on and test it',
    description:
      'Watch the workflow assemble live, then run it against real inputs before you ship it to production.',
  },
] as const;

function LandingV2HeroSteps({ step, stepProgress }: { step: number; stepProgress: number }) {
  return (
    <div className="landing-v2-hero-steps" aria-live="polite">
      {HERO_STEPS.map((item, index) => {
        const isComplete = index < step;
        const isActive = index === step;
        const fill = isComplete ? 1 : isActive ? stepProgress : 0;
        const state = isComplete ? 'complete' : isActive ? 'active' : 'pending';

        return (
          <article key={item.title} className={`landing-v2-hero-step is-${state}`}>
            <div className="landing-v2-hero-step-header">
              <h3 className="landing-v2-hero-step-title">{item.title}</h3>
              <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </div>
            <p className="landing-v2-hero-step-desc">{item.description}</p>
            <div className="landing-v2-hero-step-track" aria-hidden="true">
              <div className="landing-v2-hero-step-bar" style={{ transform: `scaleX(${fill})` }} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function LandingV2Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [heroAnimStarted, setHeroAnimStarted] = useState(false);
  const [heroAnimProgress, setHeroAnimProgress] = useState<LandingV2HeroAnimProgress>({
    step: 0,
    stepProgress: 0,
    overallProgress: 0,
  });

  const handleHeroAnimProgress = useCallback((state: LandingV2HeroAnimProgress) => {
    setHeroAnimProgress(state);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (value > 0.005) {
      setHeroAnimStarted(true);
    }
  });

  const revealEnd = 0.72;
  const rotateX = useTransform(scrollYProgress, [0, revealEnd], [58, 0]);
  const visualY = useTransform(scrollYProgress, [0, revealEnd], [44, 0]);
  const boxShadow = useTransform(
    scrollYProgress,
    [0, revealEnd],
    [
      '0 32px 64px -10px rgba(33, 30, 26, 0.45), 0 12px 28px -6px rgba(33, 30, 26, 0.3)',
      '0px 4px 20px rgba(0, 0, 0, 0.12)',
    ],
  );

  return (
    <section ref={sectionRef} className="landing-v2-hero">
      <div className="landing-v2-container landing-v2-hero-grid">
        <motion.div
          className="landing-v2-hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="landing-v2-eyebrow">The operating system for performance marketers</p>
          <h1 className="landing-v2-hero-title">
          Turn your marketing operations into an AI-powered performance engine
          </h1>
          <p className="landing-v2-hero-sub">
            Configure systems that run on your workflows — your own AI agents and workflows on one shared
            knowledgebase, connected to the tools you already rely on. Scale your output without scaling your team.
          </p>
          <div className="landing-v2-actions">
            <GlassButton>Try for free</GlassButton>
            <SecondaryButton onClick={openCalendly}>Talk to our team</SecondaryButton>
          </div>
        </motion.div>

        <div className="landing-v2-hero-visual-pin">
          <motion.div
            className="landing-v2-hero-visual"
            initial={false}
            style={
              prefersReducedMotion
                ? undefined
                : {
                    rotateX,
                    y: visualY,
                    boxShadow,
                    transformPerspective: 1200,
                  }
            }
          >
            <LandingV2HeroAnimation shouldPlay={heroAnimStarted} onProgress={handleHeroAnimProgress} />
          </motion.div>
        </div>

        <LandingV2HeroSteps step={heroAnimProgress.step} stepProgress={heroAnimProgress.stepProgress} />
      </div>
    </section>
  );
}

const INTEGRATIONS_COUNTER_TARGET = 100;
const INTEGRATIONS_COUNTER_DIGIT_HEIGHT = '1em';
const INTEGRATIONS_COUNTER_DIGIT_WIDTH = '0.62em';

function IntegrationsRollingDigit({
  scrollCount,
  place,
  revealAt,
}: {
  scrollCount: MotionValue<number>;
  place: number;
  revealAt: number;
}) {
  const y = useTransform(scrollCount, (count) => {
    const value = Math.min(INTEGRATIONS_COUNTER_TARGET, Math.max(0, count));
    const digit = (value / 10 ** place) % 10;
    return `calc(${digit} * -${INTEGRATIONS_COUNTER_DIGIT_HEIGHT})`;
  });

  const maxWidth = useTransform(scrollCount, (count) => {
    const value = Math.min(INTEGRATIONS_COUNTER_TARGET, Math.max(0, count));
    if (place === 0) return INTEGRATIONS_COUNTER_DIGIT_WIDTH;
    const revealStart = revealAt - 1;
    if (value <= revealStart) return '0px';
    if (value >= revealAt) return INTEGRATIONS_COUNTER_DIGIT_WIDTH;
    const progress = (value - revealStart) / (revealAt - revealStart);
    return `calc(${progress} * ${INTEGRATIONS_COUNTER_DIGIT_WIDTH})`;
  });

  const opacity = useTransform(scrollCount, (count) => {
    const value = Math.min(INTEGRATIONS_COUNTER_TARGET, Math.max(0, count));
    if (place === 0) return 1;
    const revealStart = revealAt - 1;
    if (value <= revealStart) return 0;
    if (value >= revealAt) return 1;
    return (value - revealStart) / (revealAt - revealStart);
  });

  return (
    <motion.span
      className="landing-v2-rolling-digit"
      style={{ maxWidth, opacity }}
      aria-hidden="true"
    >
      <motion.span className="landing-v2-rolling-digit-track" style={{ y }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <span key={digit}>{digit}</span>
        ))}
      </motion.span>
    </motion.span>
  );
}

function IntegrationsScrollCounter({ scrollCount }: { scrollCount: MotionValue<number> }) {
  return (
    <span className="landing-v2-integrations-counter" aria-hidden="true">
      <IntegrationsRollingDigit scrollCount={scrollCount} place={2} revealAt={100} />
      <IntegrationsRollingDigit scrollCount={scrollCount} place={1} revealAt={10} />
      <IntegrationsRollingDigit scrollCount={scrollCount} place={0} revealAt={0} />
    </span>
  );
}

function useIntegrationsScrollCounter(target: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center 0.70'],
  });
  const scrollCount = useTransform(scrollYProgress, [0, 1], [0, target], { clamp: true });
  const staticCount = useMotionValue(target);

  return {
    sectionRef,
    scrollCount: prefersReducedMotion ? staticCount : scrollCount,
  };
}

export function LandingV2Integrations() {
  const { sectionRef, scrollCount } = useIntegrationsScrollCounter(INTEGRATIONS_COUNTER_TARGET);

  return (
    <section ref={sectionRef} className="landing-v2-integrations" aria-label="Integrations">
      <div className="landing-v2-integrations-marquees">
        <IntegrationsMarquee items={AI_MODELS} direction="left" speed={52} iconSize={32} />
        <IntegrationsMarquee items={PRODUCTIVITY} direction="right" speed={58} iconSize={32} />
        <IntegrationsMarquee items={PLATFORMS} direction="left" speed={50} iconSize={32} />
      </div>

      <div className="landing-v2-integrations-header">
        <h3 className="landing-v2-integrations-title">
          <span className="landing-v2-integrations-headline" aria-label="Connect to 100+ tools">
            Connect to <IntegrationsScrollCounter scrollCount={scrollCount} />
            <span className="landing-v2-integrations-plus" aria-hidden="true">+</span> tools
          </span>
          <span className="landing-v2-integrations-sub">so AI runs inside your favorite stack.</span>
        </h3>
        <div className="landing-v2-integrations-cta">
          <GlassButton>Try for free</GlassButton>
        </div>
      </div>
    </section>
  );
}

export function LandingV2Pillars() {
  return (
    <section className="landing-v2-section landing-v2-pillars">
      <div className="landing-v2-container">
        <h2 className="section-heading">
          Marketing agents that fit the way <br />
          your team already operates.
        </h2>
        <div className="features-grid landing-v2-pillars-grid">
          {PILLARS.map(({ icon: Icon, graphic, graphicAlt, title, body }) => (
            <article className="card landing-v2-pillar-card" key={title}>
              {graphic ? (
                <div className="landing-v2-pillar-graphic">
                  <img src={graphic} alt={graphicAlt ?? ''} />
                </div>
              ) : Icon ? (
                <div className="landing-v2-icon">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
              ) : null}
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem section: V1-style accordion + animated glass-window preview ──────

const ProblemAccordionItem = ({
  icon: Icon,
  title,
  body,
  isOpen,
  onClick,
}: {
  icon: IconCmp;
  title: string;
  body: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="landing-v2-accordion-item">
    <button type="button" onClick={onClick} aria-expanded={isOpen} className="landing-v2-accordion-trigger">
      <span className={`landing-v2-accordion-icon ${isOpen ? 'is-open' : ''}`}>
        <Icon size={20} strokeWidth={2} />
      </span>
      <h3 className={`landing-v2-accordion-title ${isOpen ? 'is-open' : ''}`}>{title}</h3>
      <ChevronDown size={18} className={`landing-v2-accordion-chevron ${isOpen ? 'is-open' : ''}`} />
    </button>
    <div className="landing-v2-accordion-body" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
      <div style={{ overflow: 'hidden' }}>
        <p>{body}</p>
      </div>
    </div>
  </div>
);

const Sk = ({ w }: { w: string }) => (
  <div style={{ height: 9, borderRadius: 4, background: 'rgba(0,0,0,0.16)', width: w }} />
);

const GlassWindow = ({ url, children }: { url: string; children: React.ReactNode }) => (
  <div className="landing-v2-glass-window">
    <div className="landing-v2-glass-bar">
      <span style={{ background: '#ff5f57' }} />
      <span style={{ background: '#ffbd2e' }} />
      <span style={{ background: '#28c840' }} />
      <div className="landing-v2-glass-url">{url}</div>
    </div>
    <div className="landing-v2-glass-body">{children}</div>
  </div>
);

const TOOL_SPRAWL = [
  { abbr: 'G', name: 'ChatGPT', color: '#10a37f' },
  { abbr: 'Z', name: 'Zapier', color: '#ff4a00' },
  { abbr: 'N', name: 'Notion', color: '#000000' },
  { abbr: 'D', name: 'Docs', color: '#4285f4' },
];

const ToolSprawlScene = () => {
  const [broken, setBroken] = useState(false);
  useEffect(() => {
    const t = window.setInterval(() => setBroken((b) => !b), 2000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <GlassWindow url="zapier.com/app/workflows">
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Workflow pipeline</span>
          <span style={{
            fontSize: '0.58rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99,
            background: broken ? 'rgba(247,98,30,0.1)' : 'rgba(40,184,61,0.1)',
            color: broken ? 'var(--brand-primary-500)' : '#1a9e30',
            border: `1px solid ${broken ? 'rgba(247,98,30,0.3)' : 'rgba(40,184,61,0.3)'}`, transition: 'all 0.5s',
          }}>{broken ? '⚠ 2 errors' : '● Active'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {TOOL_SPRAWL.map((tool, i) => {
            const isBroken = broken && (i === 0 || i === 2);
            return (
              <React.Fragment key={tool.name}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 11,
                    background: isBroken ? 'rgba(247,98,30,0.08)' : `${tool.color}18`,
                    border: `1.5px solid ${isBroken ? 'rgba(247,98,30,0.5)' : `${tool.color}40`}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.72rem', fontWeight: 800, color: isBroken ? 'var(--brand-primary-500)' : tool.color,
                    transition: 'all 0.5s',
                  }}>{tool.abbr}</div>
                  <span style={{ fontSize: '0.56rem', fontWeight: 600, color: isBroken ? 'var(--brand-primary-500)' : 'rgba(0,0,0,0.55)', whiteSpace: 'nowrap', transition: 'color 0.5s' }}>{tool.name}</span>
                </div>
                {i < TOOL_SPRAWL.length - 1 && (
                  <svg width="30" height="14" style={{ flexShrink: 0, overflow: 'visible' }}>
                    <line x1="2" y1="7" x2="24" y2="7" stroke={broken ? 'var(--brand-primary-500)' : 'rgba(0,0,0,0.18)'} strokeWidth="1.5" strokeDasharray={broken ? '4 3' : '0'} style={{ transition: 'stroke 0.5s' }} />
                    <polygon points="22,4 28,7 22,10" fill={broken ? 'var(--brand-primary-500)' : 'rgba(0,0,0,0.18)'} style={{ transition: 'fill 0.5s' }} />
                  </svg>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div style={{ padding: '8px 11px', borderRadius: 8, background: broken ? 'rgba(247,98,30,0.06)' : 'rgba(0,0,0,0.03)', border: `1px solid ${broken ? 'rgba(247,98,30,0.2)' : 'rgba(0,0,0,0.08)'}`, display: 'flex', gap: 14, transition: 'all 0.5s' }}>
          {['Shared memory', 'Process context', 'Account access'].map((label) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: broken ? 'var(--brand-primary-500)' : '#1a9e30', transition: 'background 0.5s', flexShrink: 0 }} />
              <span style={{ fontSize: '0.52rem', color: broken ? 'var(--brand-primary-500)' : 'rgba(0,0,0,0.4)', transition: 'color 0.5s', whiteSpace: 'nowrap' }}>{broken ? `No ${label.toLowerCase()}` : label}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassWindow>
  );
};

const MANUAL_TASKS = ['Weekly client report', 'Creative QA pass', 'Budget pacing check', 'Status update email'];

const ManualExecutionScene = () => {
  const [done, setDone] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setDone((d) => (d + 1) % (MANUAL_TASKS.length + 1)), 900);
    return () => window.clearInterval(t);
  }, []);
  return (
    <GlassWindow url="ops.internal/recurring-tasks">
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 9 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Every single week</span>
          <span style={{ fontSize: '0.58rem', color: 'var(--brand-primary-500)', fontWeight: 700 }}>↻ repeats</span>
        </div>
        {MANUAL_TASKS.map((task, i) => {
          const isDone = i < done;
          return (
            <div key={task} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 7, background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)' }}>
              <span style={{ width: 15, height: 15, borderRadius: 4, border: `1.5px solid ${isDone ? '#1a9e30' : 'rgba(0,0,0,0.25)'}`, background: isDone ? '#1a9e30' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                {isDone && <span style={{ color: '#fff', fontSize: '0.6rem', fontWeight: 800 }}>✓</span>}
              </span>
              <span style={{ flex: 1, fontSize: '0.66rem', color: 'rgba(0,0,0,0.6)', textDecoration: isDone ? 'line-through' : 'none', opacity: isDone ? 0.55 : 1, transition: 'all 0.3s' }}>{task}</span>
              <span style={{ fontSize: '0.55rem', color: 'rgba(0,0,0,0.35)', whiteSpace: 'nowrap' }}>~2h</span>
            </div>
          );
        })}
        <div style={{ marginTop: 2, fontSize: '0.6rem', color: 'var(--brand-primary-500)', fontWeight: 600, textAlign: 'center' }}>The work clears, then refills tomorrow.</div>
      </div>
    </GlassWindow>
  );
};

const TEAM = [
  { role: 'Account Manager', cost: 85 },
  { role: 'Strategist', cost: 90 },
  { role: 'Coordinator', cost: 65 },
  { role: 'Analyst', cost: 72 },
];

const MarginScene = () => {
  const [visible, setVisible] = useState(1);
  useEffect(() => {
    setVisible(1);
    const t = window.setInterval(() => setVisible((v) => (v < TEAM.length ? v + 1 : 1)), 1000);
    return () => window.clearInterval(t);
  }, []);
  const total = TEAM.slice(0, visible).reduce((s, m) => s + m.cost, 0);
  return (
    <GlassWindow url="hr.notion.so/headcount">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ background: 'rgba(248,248,252,0.8)', padding: '7px 14px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'rgba(0,0,0,0.6)' }}>Team roster</span>
          <span style={{ fontSize: '0.58rem', color: 'rgba(0,0,0,0.4)' }}>{visible} of {TEAM.length} hires</span>
        </div>
        <div style={{ flex: 1 }}>
          {TEAM.map((m, i) => (
            <div key={m.role} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', opacity: i < visible ? 1 : 0, transform: i < visible ? 'translateY(0)' : 'translateY(6px)', transition: 'opacity 0.4s ease, transform 0.4s ease', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: `hsl(${i * 47 + 20},60%,65%)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.52rem', fontWeight: 700, color: '#fff' }}>{m.role[0]}</div>
              <span style={{ flex: 1, fontSize: '0.68rem', color: 'rgba(0,0,0,0.65)' }}>{m.role}</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--brand-primary-500)' }}>+${m.cost}k/yr</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(247,98,30,0.15)', background: 'rgba(247,98,30,0.06)' }}>
          <span style={{ fontSize: '0.62rem', color: 'rgba(0,0,0,0.45)' }}>Overhead added</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--brand-primary-500)' }}>+${total}k/yr</span>
        </div>
      </div>
    </GlassWindow>
  );
};

const SpeedScene = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setTick((v) => (v + 1) % 70), 80);
    return () => window.clearInterval(t);
  }, []);
  const theirs = Math.min(100, (tick / 14) * 100);
  const yours = Math.min(100, (tick / 55) * 100);
  return (
    <GlassWindow url="analytics.internal/execution-speed">
      <div style={{ padding: '18px 18px 14px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Campaign execution speed</span>
        {[
          { label: 'AI-native competitor', p: theirs, color: 'var(--brand-secondary-500)', track: 'rgba(150,59,247,0.12)' },
          { label: 'Your agency', p: yours, color: 'var(--brand-primary-500)', track: 'rgba(247,98,30,0.12)' },
        ].map((row) => (
          <div key={row.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 600, color: 'rgba(0,0,0,0.6)' }}>{row.label}</span>
              {row.p >= 100
                ? <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: row.track, color: row.color, border: `1px solid ${row.color}` }}>Shipped ✓</span>
                : <span style={{ fontSize: '0.6rem', color: 'rgba(0,0,0,0.4)', fontWeight: 500 }}>{Math.round(row.p)}%</span>}
            </div>
            <div style={{ height: 8, borderRadius: 99, background: row.track, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 99, background: row.color, width: `${row.p}%`, transition: 'width 0.08s linear' }} />
            </div>
          </div>
        ))}
        <div style={{ padding: '6px 11px', borderRadius: 7, background: 'rgba(247,98,30,0.08)', border: '1px solid rgba(247,98,30,0.18)', fontSize: '0.6rem', color: 'var(--brand-primary-500)', fontWeight: 600 }}>⚡ Competitor ships 4× faster on the same brief</div>
      </div>
    </GlassWindow>
  );
};

const PROBLEM_SCENES = [ToolSprawlScene, ManualExecutionScene, MarginScene, SpeedScene];

const ProblemPreview = ({ index }: { index: number }) => {
  const Scene = PROBLEM_SCENES[index];
  return (
    <div className="landing-v2-problem-preview" key={index}>
      <Scene />
    </div>
  );
};

export function LandingV2Problem() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="landing-v2-section landing-v2-problem">
      <div className="landing-v2-container">
        <p className="landing-v2-eyebrow">The problem</p>
        <h2 className="section-heading">
          You know how your marketing should run.
          <br />
          <span style={{ color: 'var(--brand-primary-500)' }}>Getting it to run that way is the problem.</span>
        </h2>
        <div className="landing-v2-problem-split">
          <div className="landing-v2-accordion">
            {PROBLEMS.map((p, i) => (
              <ProblemAccordionItem
                key={p.title}
                icon={p.icon}
                title={p.title}
                body={p.body}
                isOpen={activeIndex === i}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
          <ProblemPreview index={activeIndex} />
        </div>
      </div>
    </section>
  );
}

// ─── How it works: outcome metrics ─────────────────────────────────────────────

/* Previous accordion + animated builder preview — kept for reference
function HowItWorksVisual({ activeStep }: { activeStep: number }) {
  return (
    <div className="landing-v2-how-visual">
      ...
    </div>
  );
}
*/

export function LandingV2HowItWorks() {
  return (
    <section className="landing-v2-section landing-v2-how">
      <div className="landing-v2-container">
        <p className="landing-v2-eyebrow">See how easy it is</p>
        <h2 className="section-heading">
          If you can brief a teammate, <br />
          you can build an agent.
        </h2>
        <div className="features-grid landing-v2-how-metrics">
          {HOW_METRICS.map(({ statement, value, valueSuffix, label, attribution, icon: Icon }) => (
            <article className="card landing-v2-how-metric-card" key={statement}>
              <div className="landing-v2-how-metric-top">
                <div className="landing-v2-icon landing-v2-how-metric-icon">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <h3 className="landing-v2-how-metric-statement">{statement}</h3>
              </div>
              <div className="landing-v2-how-metric-divider" aria-hidden="true" />
              <div className="landing-v2-how-metric-bottom">
                <div className="landing-v2-how-metric-stats">
                  <p className="landing-v2-how-metric-value">
                    <span>{value}</span>
                    {valueSuffix ? (
                      <>
                        {' '}
                        <span className="landing-v2-how-metric-value-suffix">{valueSuffix}</span>
                      </>
                    ) : null}
                  </p>
                  <p className="landing-v2-how-metric-label">{label}</p>
                </div>
                <div className="landing-v2-how-metric-source">
                  <img
                    className="landing-v2-how-metric-avatar"
                    src={attribution.avatar}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="landing-v2-how-metric-source-copy">
                    <p className="landing-v2-how-metric-brand">{attribution.name}</p>
                    <p className="landing-v2-how-metric-role">{attribution.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingV2BuildExamples() {
  return (
    <section className="landing-v2-section landing-v2-build">
      <div className="landing-v2-container">
        <div className="landing-v2-section-intro">
          <h2 className="section-heading">
            Build the agents you wish you could hire.
          </h2>
          <p className="landing-v2-section-sub">Start from a template, make it yours, build the next one in minutes.</p>
        </div>
        <div className="landing-v2-build-grid">
          {BUILD_EXAMPLES.map(({ title, icon: Icon }) => (
            <article className="card landing-v2-build-card" key={title}>
              <Icon size={22} strokeWidth={2.2} />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingV2Results() {
  return (
    <section className="landing-v2-section landing-v2-results">
      <div className="landing-v2-container">
        <p className="landing-v2-eyebrow landing-v2-pill-eyebrow">See us in action</p>
        <h2 className="section-heading">
          See what marketers are building.
        </h2>
        <div className="landing-v2-results-card card">
          <a href="https://kommerceai.org" target="_blank" rel="noopener noreferrer" className="landing-v2-kommerce-preview">
            <img src="/kommerce.png" alt="Kommerce AI" />
            <div>
              <span>Kommerce AI</span>
              <small>First AI-native marketing agency</small>
            </div>
          </a>
          <div className="landing-v2-results-copy">
            <p>
              Kommerce AI is the first AI-native marketing agency we built on Agentive OS. In 30 days,
              the same team was running <strong>3×</strong> the account volume.
            </p>
            <span className="landing-v2-placeholder-note">Real before/after + founder quote to be added.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingV2Pricing() {
  return (
    <section className="landing-v2-section landing-v2-pricing">
      <div className="landing-v2-container">
        <div className="landing-v2-section-intro">
          <h2 className="section-heading">
            Start building today — free.
          </h2>
          <p className="landing-v2-section-sub">Create your account, build your first agent, see it run. No card, no call.</p>
        </div>
        <div className="features-grid landing-v2-pricing-grid">
          {PRICING.map((plan) => (
            <article className={`card landing-v2-pricing-card ${plan.featured ? 'is-featured' : ''}`} key={plan.name}>
              <div className="landing-v2-icon landing-v2-icon--secondary">
                <CreditCard size={22} />
              </div>
              <h3>{plan.name}</h3>
              <p>{plan.body}</p>
              <strong>{plan.meta}</strong>
              {plan.cta === 'Talk to our team' ? (
                <SecondaryButton onClick={openCalendly}>{plan.cta}</SecondaryButton>
              ) : (
                <GlassButton>{plan.cta}</GlassButton>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingV2FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="landing-v2-section landing-v2-faq faq-section">
      <div className="landing-v2-container">
        <h2 className="section-heading">
          Questions before you build?
        </h2>
        <div className="landing-v2-faq-list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.q} className={`landing-v2-faq-item ${isOpen ? 'is-open' : ''}`}>
                <button type="button" className="landing-v2-faq-trigger" onClick={() => setOpenIndex(isOpen ? null : index)} aria-expanded={isOpen}>
                  <strong>{faq.q}</strong>
                  <ChevronDown size={18} className={`landing-v2-accordion-chevron ${isOpen ? 'is-open' : ''}`} />
                </button>
                <div className="landing-v2-accordion-body" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LandingV2FinalCTA() {
  return (
    <section className="landing-v2-section landing-v2-final-cta">
      <div className="landing-v2-container">
        <div className="landing-v2-final-card card">
          <h2 className="section-heading" style={{ marginBottom: '1rem' }}>
            Build your first agent today.
          </h2>
          <p>Free to start. No code, no call — just the way you work, running by this afternoon.</p>
          <div className="landing-v2-actions">
            <GlassButton>Try for free</GlassButton>
            <SecondaryButton onClick={openCalendly}>Talk to our team</SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
