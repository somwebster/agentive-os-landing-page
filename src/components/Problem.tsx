import React, { useState, useEffect } from 'react';
import { ChevronDown, Unplug, Users, Zap, Puzzle } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

type IconCmp = React.ComponentType<{ size?: number; strokeWidth?: number }>;

const PROBLEMS: {
  icon: IconCmp;
  title: string;
  body: string;
  evidence: string[];
}[] = [
  {
    icon: Unplug,
    title: 'Context gets lost in tools',
    body: 'Client knowledge and decisions get buried in Slack threads, scattered docs, and private notes. Every new project rebuilds context from scratch.',
    evidence: ['Slack threads', 'Notion docs', 'Loose call notes', 'Inbox replies'],
  },
  {
    icon: Users,
    title: 'Scaling means hiring',
    body: 'More revenue means more people, more handoffs, more meetings. Complexity grows faster than efficiency. Margin shrinks with every hire.',
    evidence: ['+1 PM', '+2 Strategists', '+3 Coordinators', '↓ Margin'],
  },
  {
    icon: Zap,
    title: 'Competing on execution speed',
    body: 'AI-native competitors move faster. Your edge is process and quality, but only if you can keep up with the throughput they ship in a day.',
    evidence: ['Days → hours', 'Drafts → final', 'Brief → live'],
  },
  {
    icon: Puzzle,
    title: "AI doesn't truly fit your process",
    body: "Generic AI tools don't understand how your agency actually works. You end up stitching them together with prompts and prayers until something breaks.",
    evidence: ['Prompt sprawl', 'Tool stack drift', 'No memory', 'Broken handoffs'],
  },
];


// ─── Molecules ────────────────────────────────────────────────────────────────

const ProblemAccordionItem = ({
  icon: Icon,
  index,
  title,
  body,
  isOpen,
  onClick,
}: {
  icon: IconCmp;
  index: number;
  title: string;
  body: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div
    style={{
      borderBottom: '1px solid var(--color-border-primary)',
    }}
  >
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        padding: '1.25rem 0.25rem',
        textAlign: 'left',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: 'var(--m3-shape-small)',
          background: isOpen ? 'var(--brand-primary-25)' : 'transparent',
          color: isOpen ? 'var(--brand-primary-500)' : 'var(--color-text-muted)',
          transition: 'background 0.2s, color 0.2s',
          flexShrink: 0,
        }}
      >
        <Icon size={20} strokeWidth={2} />
      </span>
      <h3
        style={{
          flex: 1,
          fontSize: '1.15rem',
          fontWeight: 600,
          margin: 0,
          color: isOpen ? 'var(--color-text-heading)' : 'var(--color-text-muted)',
          lineHeight: 1.3,
          transition: 'color 0.2s',
        }}
      >
        {title}
      </h3>
      <ChevronDown
        size={18}
        style={{
          color: 'var(--color-text-muted)',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s ease',
          flexShrink: 0,
        }}
      />
    </button>
    <div
      style={{
        display: 'grid',
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        transition: 'grid-template-rows 0.25s ease',
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <p
          style={{
            margin: 0,
            padding: '0 0 1.25rem 4.5rem',
            fontSize: '0.95rem',
            color: 'var(--color-text-body)',
            lineHeight: 1.6,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  </div>
);

// ─── Animated preview panels ──────────────────────────────────────────────────

const TABS = ['Slack', 'Notion', 'Docs', 'Gmail', 'Drive', 'Trello', '+4'];

const TAB_URLS = [
  'app.slack.com/client/T04XK/C-general',
  'notion.so/workspace/client-brief-q4-campaign',
  'docs.google.com/document/d/1BxiMVs0XeA...',
  'mail.google.com/mail/u/0/#inbox',
  'drive.google.com/drive/folders/1YqZ9p...',
  'trello.com/b/xYz123/q4-campaign-board',
];

const Sk = ({ w }: { w: string }) => (
  <div style={{ height: 9, borderRadius: 4, background: 'rgba(0,0,0,0.16)', width: w }} />
);

const renderTabContent = (active: number) => {
  if (active === 0) return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: 100, borderRight: '1px solid rgba(0,0,0,0.1)', padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 6, background: 'rgba(74,21,75,0.08)' }}>
        {['# general','# q4-campaign','# client-abc','# design','# analytics'].map((ch, i) => (
          <div key={ch} style={{ fontSize: '0.55rem', color: i === 1 ? 'var(--brand-primary-500)' : 'rgba(0,0,0,0.55)', fontWeight: i === 1 ? 700 : 400, padding: '2px 4px', borderRadius: 3, background: i === 1 ? 'rgba(247,98,30,0.1)' : 'transparent' }}>{ch}</div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {([['S','10:42 AM','72%'],['M','10:44 AM','85%'],['J','10:51 AM','65%']] as [string,string,string][]).map(([init,time,w]) => (
          <div key={time} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: `hsl(${init.charCodeAt(0)*40},60%,60%)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 700, color: '#fff' }}>{init}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 3, alignItems: 'baseline' }}>
                <div style={{ height: 7, borderRadius: 3, background: 'rgba(0,0,0,0.28)', width: 30 }} />
                <div style={{ fontSize: '0.5rem', color: 'rgba(0,0,0,0.45)' }}>{time}</div>
              </div>
              <div style={{ height: 8, borderRadius: 3, background: 'rgba(0,0,0,0.15)', width: w }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  if (active === 1) return (
    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ height: 14, borderRadius: 4, background: 'rgba(0,0,0,0.22)', width: '55%' }} />
      <div style={{ display: 'flex', gap: 6 }}>{['📋 Brief','🎯 Strategy','📊 Results'].map(t => <div key={t} style={{ fontSize: '0.56rem', padding: '2px 7px', borderRadius: 99, background: 'rgba(0,0,0,0.08)', color: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,0,0,0.15)' }}>{t}</div>)}</div>
      <Sk w="90%" /><Sk w="75%" /><Sk w="55%" />
      <div style={{ height: 1, background: 'rgba(0,0,0,0.12)' }} />
      <div style={{ padding: '6px 8px', borderRadius: 5, background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <Sk w="80%" /><Sk w="60%" />
      </div>
      <Sk w="70%" />
    </div>
  );
  if (active === 2) return (
    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ height: 13, borderRadius: 4, background: 'rgba(0,0,0,0.2)', width: '48%' }} />
      <div style={{ height: 1, background: 'rgba(0,0,0,0.12)' }} />
      <Sk w="95%" /><Sk w="88%" /><Sk w="72%" /><Sk w="90%" /><Sk w="50%" />
      <div style={{ height: 1, background: 'rgba(0,0,0,0.1)' }} />
      <Sk w="85%" /><Sk w="60%" />
    </div>
  );
  if (active === 3) return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {([['J','James O.','2h','90%'],['S','Sarah K.','5h','75%'],['M','Maya T.','1d','80%']] as [string,string,string,string][]).map(([init,name,time,w]) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderBottom: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.4)' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: `hsl(${init.charCodeAt(0)*50},55%,58%)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.52rem', fontWeight: 700, color: '#fff' }}>{init}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ height: 8, borderRadius: 3, background: 'rgba(0,0,0,0.28)', width: 50 }} />
              <div style={{ fontSize: '0.52rem', color: 'rgba(0,0,0,0.5)', fontWeight: 500 }}>{time}</div>
            </div>
            <div style={{ height: 7, borderRadius: 3, background: 'rgba(0,0,0,0.18)', width: w, marginBottom: 3 }} />
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.1)', width: '65%' }} />
          </div>
        </div>
      ))}
    </div>
  );
  if (active === 4) return (
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {(['📁 Client','📄 Q4 Strat','📊 Analytics','🖼️ Creative','📋 Contracts','📁 Old Decks','📄 Scope','📊 Report'] as string[]).map(name => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 4px', borderRadius: 6, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.12)' }}>
            <div style={{ fontSize: '0.85rem' }}>{name.split(' ')[0]}</div>
            <div style={{ height: 6, borderRadius: 2, background: 'rgba(0,0,0,0.18)', width: '80%' }} />
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div style={{ padding: '10px 12px', display: 'flex', gap: 7 }}>
      {([{col:'To Do',color:'rgba(0,0,0,0.06)'},{col:'In Progress',color:'rgba(247,98,30,0.1)'},{col:'Done',color:'rgba(40,184,61,0.1)'}] as {col:string,color:string}[]).map(({col,color}) => (
        <div key={col} style={{ flex: 1 }}>
          <div style={{ fontSize: '0.58rem', fontWeight: 700, color: 'rgba(0,0,0,0.6)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{col}</div>
          {[85,70,55].map(w => (
            <div key={w} style={{ padding: '6px 8px', borderRadius: 5, background: color, border: '1px solid rgba(0,0,0,0.12)', marginBottom: 5, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ height: 7, borderRadius: 3, background: 'rgba(0,0,0,0.18)', width: `${w}%` }} />
              <div style={{ height: 5, borderRadius: 3, background: 'rgba(0,0,0,0.1)', width: '55%' }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const ContextPreview = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % (TABS.length - 1)), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 0,
      borderRadius: '16px 16px 0 0', overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.35)', borderBottom: 'none',
      boxShadow: '0 -8px 32px rgba(0,0,0,0.18)',
      margin: '0 1.5rem',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }}>
      {/* Title bar */}
      <div style={{ background: 'rgba(240,240,245,0.75)', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        <div style={{ flex: 1, height: 18, borderRadius: 4, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.4)', margin: '0 8px', display: 'flex', alignItems: 'center', paddingLeft: 8, transition: 'all 0.5s' }}>
          <span style={{ fontSize: '0.58rem', color: 'var(--color-text-muted)', transition: 'opacity 0.4s' }}>{TAB_URLS[active]}</span>
        </div>
      </div>
      {/* Tab strip */}
      <div style={{ background: 'rgba(248,248,252,0.72)', borderBottom: '1px solid rgba(255,255,255,0.3)', display: 'flex', overflowX: 'hidden', gap: 0 }}>
        {TABS.map((tab, i) => (
          <div key={tab} style={{
            padding: '5px 10px', fontSize: '0.63rem', fontWeight: 600, whiteSpace: 'nowrap',
            borderRight: '1px solid rgba(255,255,255,0.25)',
            background: i === active ? 'rgba(247,98,30,0.1)' : 'transparent',
            color: i === active ? 'var(--brand-primary-500)' : 'var(--color-text-muted)',
            borderBottom: i === active ? '2px solid var(--brand-primary-500)' : '2px solid transparent',
            transition: 'all 0.5s ease', flexShrink: 0,
          }}>{tab}</div>
        ))}
      </div>
      {/* Tab content */}
      <div key={active} style={{ background: 'rgba(255,255,255,0.92)', animation: 'tab-fade 0.4s ease', height: '222px', overflow: 'hidden' }}>
        {renderTabContent(active)}
      </div>
    </div>
    </div>
  );
};

// ─── Shared glass window wrapper ──────────────────────────────────────────────

const GlassWindow = ({ url, children }: { url: string; children: React.ReactNode }) => (
  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 0,
      borderRadius: '16px 16px 0 0', overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.35)', borderBottom: 'none',
      boxShadow: '0 -8px 32px rgba(0,0,0,0.18)',
      margin: '0 1.5rem',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }}>
      <div style={{ background: 'rgba(240,240,245,0.75)', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        <div style={{ flex: 1, height: 18, borderRadius: 4, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.4)', margin: '0 8px', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
          <span style={{ fontSize: '0.58rem', color: 'rgba(0,0,0,0.45)' }}>{url}</span>
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.92)', height: '255px', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  </div>
);

// ─── Scaling preview ───────────────────────────────────────────────────────────

const TEAM = [
  { role: 'Account Manager', cost: '+$85k' },
  { role: 'Strategist',      cost: '+$90k' },
  { role: 'Coordinator',     cost: '+$65k' },
  { role: 'Analyst',         cost: '+$72k' },
  { role: 'Operations Lead', cost: '+$95k' },
];

const ScalingPreview = () => {
  const [visible, setVisible] = useState(1);
  useEffect(() => {
    setVisible(1);
    const t = setInterval(() => setVisible(v => v < TEAM.length ? v + 1 : v), 900);
    return () => clearInterval(t);
  }, []);
  const totalCost = TEAM.slice(0, visible).reduce((s, m) => s + parseInt(m.cost.replace(/\D/g, '')), 0);
  return (
    <GlassWindow url="hr.notion.so/team-headcount">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ background: 'rgba(248,248,252,0.8)', padding: '6px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'rgba(0,0,0,0.6)' }}>Team roster</span>
          <span style={{ fontSize: '0.58rem', color: 'rgba(0,0,0,0.4)' }}>{visible} of {TEAM.length} hires</span>
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {TEAM.map((m, i) => (
            <div key={m.role} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '7px 14px',
              opacity: i < visible ? 1 : 0,
              transform: i < visible ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              borderBottom: '1px solid rgba(0,0,0,0.07)',
            }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: `hsl(${i*47+20},60%,65%)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.52rem', fontWeight: 700, color: '#fff' }}>{m.role[0]}</div>
              <span style={{ flex: 1, fontSize: '0.68rem', color: 'rgba(0,0,0,0.65)' }}>{m.role}</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--brand-primary-500)' }}>{m.cost}/yr</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(247,98,30,0.15)', background: 'rgba(247,98,30,0.06)' }}>
          <span style={{ fontSize: '0.62rem', color: 'rgba(0,0,0,0.45)' }}>Overhead added</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary-500)' }}>+${totalCost.toLocaleString()}k/yr</span>
        </div>
      </div>
    </GlassWindow>
  );
};

// ─── Speed preview ─────────────────────────────────────────────────────────────

const SpeedPreview = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(v => (v + 1) % 60), 80);
    return () => clearInterval(t);
  }, []);
  const theirProgress = Math.min(100, (tick / 14) * 100);
  const yourProgress  = Math.min(100, (tick / 55) * 100);
  const theirDone = theirProgress >= 100;
  return (
    <GlassWindow url="analytics.internal/campaigns/execution">
      <div style={{ padding: '16px 16px 12px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: 'rgba(248,248,252,0.7)', borderRadius: 6, padding: '4px 10px', display: 'inline-flex', alignSelf: 'flex-start' }}>
          <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Campaign execution speed</span>
        </div>
        {[
          { label: 'AI-native competitor', progress: theirProgress, done: theirDone,          color: 'var(--brand-secondary-500)', track: 'rgba(150,59,247,0.12)' },
          { label: 'Your agency',          progress: yourProgress,  done: yourProgress >= 100, color: 'var(--brand-primary-500)',   track: 'rgba(247,98,30,0.12)' },
        ].map(row => (
          <div key={row.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 600, color: 'rgba(0,0,0,0.6)' }}>{row.label}</span>
              {row.done
                ? <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: row.track, color: row.color, border: `1px solid ${row.color}` }}>Published ✓</span>
                : <span style={{ fontSize: '0.6rem', color: 'rgba(0,0,0,0.4)', fontWeight: 500 }}>{Math.round(row.progress)}%</span>}
            </div>
            <div style={{ height: 8, borderRadius: 99, background: row.track, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 99, background: row.color, width: `${row.progress}%`, transition: 'width 0.08s linear' }} />
            </div>
          </div>
        ))}
        <div style={{ padding: '5px 10px', borderRadius: 6, background: 'rgba(247,98,30,0.08)', border: '1px solid rgba(247,98,30,0.18)', fontSize: '0.6rem', color: 'var(--brand-primary-500)', fontWeight: 600 }}>
          ⚡ Competitor ships 4× faster on the same brief
        </div>
      </div>
    </GlassWindow>
  );
};

// ─── AI tool preview ───────────────────────────────────────────────────────────

const FLOW_TOOLS = [
  { name: 'ChatGPT',    abbr: 'G', color: '#10a37f', label: 'Generate copy'   },
  { name: 'Zapier',     abbr: 'Z', color: '#ff4a00', label: 'Trigger workflow' },
  { name: 'Notion',     abbr: 'N', color: '#000000', label: 'Store output'     },
  { name: 'Google Docs',abbr: 'D', color: '#4285f4', label: 'Final doc'        },
];

const BREAK_POINTS = [0, 2]; // which connections are broken

const AIPreview = () => {
  const [broken, setBroken] = useState(false);
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setBroken(b => !b);
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <GlassWindow url="zapier.com/app/workflows/integrations">
      <div style={{ padding: '14px 16px 10px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Workflow pipeline</span>
          <span style={{
            fontSize: '0.58rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99,
            background: broken ? 'rgba(247,98,30,0.1)' : 'rgba(40,184,61,0.1)',
            color: broken ? 'var(--brand-primary-500)' : '#1a9e30',
            border: `1px solid ${broken ? 'rgba(247,98,30,0.3)' : 'rgba(40,184,61,0.3)'}`,
            transition: 'all 0.5s',
          }}>
            {broken ? '⚠ 2 errors' : '● Active'}
          </span>
        </div>

        {/* Flow row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {FLOW_TOOLS.map((tool, i) => {
            const isBroken = broken && BREAK_POINTS.includes(i);
            const connBroken = broken && BREAK_POINTS.includes(i);
            return (
              <React.Fragment key={tool.name}>
                {/* Tool node */}
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                  flex: 1,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: isBroken ? 'rgba(247,98,30,0.08)' : `${tool.color}18`,
                    border: `1.5px solid ${isBroken ? 'rgba(247,98,30,0.5)' : `${tool.color}40`}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 800,
                    color: isBroken ? 'var(--brand-primary-500)' : tool.color,
                    transition: 'all 0.5s',
                    transform: pulse && isBroken ? 'scale(1.08)' : 'scale(1)',
                    boxShadow: isBroken ? '0 0 0 3px rgba(247,98,30,0.15)' : 'none',
                  }}>{tool.abbr}</div>
                  <span style={{ fontSize: '0.56rem', fontWeight: 600, color: isBroken ? 'var(--brand-primary-500)' : 'rgba(0,0,0,0.55)', textAlign: 'center', transition: 'color 0.5s', whiteSpace: 'nowrap' }}>{tool.name}</span>
                  <span style={{ fontSize: '0.5rem', color: 'rgba(0,0,0,0.35)', textAlign: 'center', whiteSpace: 'nowrap' }}>{tool.label}</span>
                </div>

                {/* Arrow connector */}
                {i < FLOW_TOOLS.length - 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0, width: 28 }}>
                    <svg width="28" height="14" style={{ overflow: 'visible' }}>
                      <line x1="2" y1="7" x2="22" y2="7"
                        stroke={connBroken ? 'var(--brand-primary-500)' : 'rgba(0,0,0,0.18)'}
                        strokeWidth="1.5"
                        strokeDasharray={connBroken ? '4 3' : '0'}
                        style={{ transition: 'stroke 0.5s' }}
                      />
                      <polygon points="20,4 26,7 20,10"
                        fill={connBroken ? 'var(--brand-primary-500)' : 'rgba(0,0,0,0.18)'}
                        style={{ transition: 'fill 0.5s' }}
                      />
                      {connBroken && <text x="14" y="5" fontSize="8" fill="var(--brand-primary-500)" textAnchor="middle">✕</text>}
                    </svg>
                    <span style={{ fontSize: '0.42rem', color: connBroken ? 'var(--brand-primary-500)' : 'rgba(0,0,0,0.3)', whiteSpace: 'nowrap', transition: 'color 0.5s' }}>
                      {connBroken ? 'no context' : 'manual'}
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Memory bar */}
        <div style={{ padding: '7px 10px', borderRadius: 7, background: broken ? 'rgba(247,98,30,0.06)' : 'rgba(0,0,0,0.03)', border: `1px solid ${broken ? 'rgba(247,98,30,0.2)' : 'rgba(0,0,0,0.08)'}`, display: 'flex', gap: 12, transition: 'all 0.5s' }}>
          {['Shared memory','Process context','Persistent state'].map(label => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: broken ? 'var(--brand-primary-500)' : '#1a9e30', display: 'inline-block', transition: 'background 0.5s', flexShrink: 0 }} />
              <span style={{ fontSize: '0.52rem', color: broken ? 'var(--brand-primary-500)' : 'rgba(0,0,0,0.4)', transition: 'color 0.5s', whiteSpace: 'nowrap' }}>{broken ? `No ${label.toLowerCase()}` : label}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassWindow>
  );
};

const PREVIEWS = [ContextPreview, ScalingPreview, SpeedPreview, AIPreview];

const ProblemPreview = ({ index }: { index: number }) => {
  const Preview = PREVIEWS[index];
  return (
    <div
      className="problem-preview"
      style={{
        backgroundImage: 'url(/wallpaper.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '1px solid var(--color-border-primary)',
        borderRadius: 'var(--radius-card)',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        height: '420px',
        position: 'relative',
        overflow: 'hidden',
        animation: 'problem-preview-fade 0.35s ease',
      }}
    >
      <Preview />
    </div>
  );
};

// ─── Organism ─────────────────────────────────────────────────────────────────

const Problem = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = PROBLEMS[activeIndex];

  return (
    <section className="problem" style={{ marginTop: '6rem', paddingBottom: '4rem' }}>
      <style>{`
        @keyframes problem-preview-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tab-fade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .problem-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 1024px) {
          .problem-split { grid-template-columns: 1fr; gap: 2rem; }
          .problem-preview { display: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 className="section-heading">
          Agencies run on duct tape.<br />
          <span style={{ color: 'var(--brand-primary-500)' }}>It works, until it doesn't.</span>
        </h2>

        <div className="problem-split">
          <div style={{ paddingTop: '1.5rem', paddingLeft: '1rem', paddingRight: '2rem' }}>
            {PROBLEMS.map((p, i) => (
              <ProblemAccordionItem
                key={p.title}
                icon={p.icon}
                index={i}
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
};

export default Problem;
