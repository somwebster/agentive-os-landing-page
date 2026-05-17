import React, { useState, useEffect } from 'react';
import './marquee.css';

// ─── Context Graph (SVG, no WebGL) ───────────────────────────────────────────

const GRAPH_NODES = [
  { id: 'clients',      label: 'Clients',      fill: '#3b82f6', cx: 50,  cy: 18  },
  { id: 'projects',     label: 'Projects',     fill: '#f59e0b', cx: 88,  cy: 58  },
  { id: 'agents',       label: 'AI Agents',    fill: '#ec4899', cx: 72,  cy: 92  },
  { id: 'deliverables', label: 'Deliverables', fill: '#10b981', cx: 28,  cy: 92  },
  { id: 'analytics',    label: 'Analytics',    fill: '#8b5cf6', cx: 12,  cy: 58  },
];

const GRAPH_EDGES = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 0 },
  { from: 2, to: 0 },
];

const ContextGraphAnimation = () => {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount(prev => prev >= GRAPH_NODES.length ? 1 : prev + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const visibleNodes = GRAPH_NODES.slice(0, visibleCount);
  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
  const visibleEdges = GRAPH_EDGES.filter(e =>
    visibleNodeIds.has(GRAPH_NODES[e.from].id) && visibleNodeIds.has(GRAPH_NODES[e.to].id)
  );

  return (
    <svg viewBox="0 0 100 110" style={{ width: '100%', maxHeight: '140px', display: 'block', margin: '0 auto', overflow: 'visible' }}>
      {visibleEdges.map((e, i) => {
        const from = GRAPH_NODES[e.from];
        const to   = GRAPH_NODES[e.to];
        return (
          <line key={i} x1={from.cx} y1={from.cy} x2={to.cx} y2={to.cy}
            stroke="#e2e8f0" strokeWidth="0.7" strokeDasharray="2 1.5" />
        );
      })}
      {visibleNodes.map(node => (
        <g key={node.id}>
          <circle cx={node.cx} cy={node.cy} r="3.5" fill={node.fill} opacity="0.9" />
          <circle cx={node.cx} cy={node.cy} r="3.5" fill={node.fill} opacity="0.15">
            <animate attributeName="r" values="3.5;5.5;3.5" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0;0.15" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <text x={node.cx} y={node.cy + 8} textAnchor="middle"
            style={{ fontSize: '4px', fill: '#64748b', fontWeight: 600, fontFamily: 'var(--font-family)' }}>
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ─── Layer Badge ──────────────────────────────────────────────────────────────

const LayerLabel = ({ tag, title, description, accent }: { tag: string; title: string; description: string; accent: 'neutral' | 'orange' | 'green' }) => {
  const colors = {
    neutral: { bg: '#f1f5f9', color: '#64748b' },
    orange:  { bg: 'rgba(247,98,30,0.1)', color: 'var(--brand-primary-500)' },
    green:   { bg: 'rgba(34,197,94,0.1)', color: '#16a34a' },
  }[accent];
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
        <span style={{ padding: '0.2rem 0.65rem', background: colors.bg, color: colors.color, borderRadius: '100px', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.06em' }}>
          {tag}
        </span>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e293b' }}>{title}</span>
      </div>
      <p style={{ margin: 0, fontSize: '0.7rem', color: '#94a3b8', lineHeight: 1.5 }}>{description}</p>
    </div>
  );
};

// ─── Flow Connector ───────────────────────────────────────────────────────────

const FlowConnector = ({ pills }: { pills: string[] }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.6rem 1.5rem', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', background: 'var(--color-surface-page)', flexWrap: 'wrap' }}>
    <span style={{ fontSize: '0.65rem', color: 'var(--brand-primary-400)', fontWeight: 700, marginRight: '0.25rem' }}>↓</span>
    {pills.map((pill, i) => (
      <React.Fragment key={pill}>
        <span style={{ padding: '0.15rem 0.55rem', background: 'var(--brand-primary-25)', color: 'var(--brand-primary-500)', border: '1px solid rgba(247,98,30,0.15)', borderRadius: '100px', fontSize: '0.6rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
          {pill}
        </span>
        {i < pills.length - 1 && <span style={{ color: '#e2e8f0', fontSize: '0.6rem' }}>·</span>}
      </React.Fragment>
    ))}
    <span style={{ fontSize: '0.65rem', color: 'var(--brand-primary-400)', fontWeight: 700, marginLeft: '0.25rem' }}>↑</span>
  </div>
);

// ─── Layer 1: Application Layer ───────────────────────────────────────────────

// Agency = control panel skeleton (sidebar + multi-section layout + action buttons)
const ControlPanelMockup = () => (
  <div style={{ flex: 1, minWidth: 0 }}>
    <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '0.45rem 0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        {['#ff5f57', '#ffbd2e', '#28c940'].map(c => <div key={c} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, height: '7px', background: '#e2e8f0', borderRadius: '3px', marginLeft: '0.3rem' }} />
        <div style={{ width: '24px', height: '7px', background: 'rgba(247,98,30,0.3)', borderRadius: '3px' }} />
      </div>
      <div style={{ padding: '0.55rem', display: 'flex', gap: '0.35rem', minHeight: '68px' }}>
        {/* Sidebar */}
        <div style={{ width: '22px', background: '#f8fafc', borderRadius: '4px', padding: '0.3rem 0.2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {[1,2,3,4,5].map(i => <div key={i} style={{ height: '5px', background: i === 1 ? 'rgba(247,98,30,0.4)' : '#e2e8f0', borderRadius: '2px' }} />)}
        </div>
        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {/* Top action bar */}
          <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.1rem' }}>
            <div style={{ height: '6px', flex: 2, background: '#f1f5f9', borderRadius: '2px' }} />
            <div style={{ height: '6px', width: '14px', background: 'rgba(247,98,30,0.3)', borderRadius: '2px' }} />
            <div style={{ height: '6px', width: '14px', background: '#f1f5f9', borderRadius: '2px' }} />
          </div>
          {/* Two-col grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.2rem' }}>
            {[1,2,3,4].map(i => <div key={i} style={{ height: '10px', background: i % 2 === 0 ? '#f8fafc' : '#f1f5f9', borderRadius: '3px', border: '1px solid #f1f5f9' }} />)}
          </div>
          <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '2px', width: '70%' }} />
        </div>
      </div>
    </div>
  </div>
);

// Client = dashboard skeleton (metric cards + chart areas, clean & read-focused)
const DashboardMockup = () => (
  <div style={{ flex: 1, minWidth: 0 }}>
    <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '0.45rem 0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        {['#ff5f57', '#ffbd2e', '#28c940'].map(c => <div key={c} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, height: '7px', background: '#e2e8f0', borderRadius: '3px', marginLeft: '0.3rem' }} />
      </div>
      <div style={{ padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', minHeight: '68px' }}>
        {/* Metric cards row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.2rem' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ padding: '0.2rem 0.25rem', background: '#f8fafc', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
              <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', width: '60%', marginBottom: '0.15rem' }} />
              <div style={{ height: '7px', background: i === 1 ? 'rgba(99,102,241,0.2)' : '#f1f5f9', borderRadius: '2px', width: '80%' }} />
            </div>
          ))}
        </div>
        {/* Chart area */}
        <div style={{ height: '20px', background: '#f8fafc', borderRadius: '4px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'flex-end', padding: '0.2rem 0.25rem', gap: '0.15rem' }}>
          {[40,65,50,80,60,75,55,85].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 7 ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.15)', borderRadius: '2px 2px 0 0' }} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AvatarCluster = ({ count, label, sublabel, color }: { count: number; label: string; sublabel: string; color?: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
    <div style={{ display: 'flex' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2.5px solid #fff', background: '#f1f5f9', overflow: 'hidden', marginLeft: i > 0 ? '-10px' : 0, zIndex: count - i, boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
          <img src={`https://i.pravatar.cc/80?u=${i + (color === 'client' ? 20 : 10)}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ))}
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1e293b' }}>{label}</div>
      <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 500, marginTop: '0.1rem' }}>{sublabel}</div>
    </div>
  </div>
);

// ─── Layer 2: Agent Runtime ───────────────────────────────────────────────────

const AGENTS = [
  { name: 'Support',    color: '#a855f7' },
  { name: 'Sales',      color: '#3b82f6' },
  { name: 'Creative',   color: '#ec4899' },
  { name: 'Growth',     color: '#f59e0b' },
  { name: 'Ops',        color: '#10b981' },
  { name: 'Strategy',   color: '#6366f1' },
  { name: 'Compliance', color: '#14b8a6' },
  { name: 'Brand',      color: '#ef4444' },
];

const AgentRuntime = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
      <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.05em' }}>AGENT SDK & RUNTIME</span>
      <span style={{ fontSize: '0.55rem', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '0.12rem 0.4rem', borderRadius: '100px' }}>● 8 Active</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.28rem', flex: 1 }}>
      {AGENTS.map(agent => (
        <div key={agent.name} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.45rem', background: '#fafafa', borderRadius: '7px', border: '1px solid #f1f5f9' }}>
          <div className="agent-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: agent.color, flexShrink: 0 }} />
          <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#475569' }}>{agent.name}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Layer 2: Workflow Engine ─────────────────────────────────────────────────

const WORKFLOWS = [
  { name: 'Lead Management',    color: '#3b82f6', status: 'Running' },
  { name: 'Content Generation', color: '#ec4899', status: 'Running' },
  { name: 'Client Reporting',   color: '#f59e0b', status: 'Scheduled' },
  { name: 'Support',            color: '#10b981', status: 'Running' },
];

const WorkflowEngine = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ marginBottom: '0.75rem' }}>
      <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.05em' }}>WORKFLOW ENGINE</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem', flex: 1 }}>
      {WORKFLOWS.map(wf => (
        <div key={wf.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.32rem 0.5rem', background: '#fafafa', borderRadius: '7px', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div className="agent-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: wf.color, flexShrink: 0 }} />
            <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#475569' }}>{wf.name}</span>
          </div>
          <span style={{ fontSize: '0.55rem', fontWeight: 700, color: wf.status === 'Running' ? '#10b981' : '#f59e0b', background: wf.status === 'Running' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', padding: '0.1rem 0.4rem', borderRadius: '100px', flexShrink: 0 }}>
            {wf.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Integration Marquee Icons ────────────────────────────────────────────────

const INTEGRATIONS = [
  { icon: 'shopify',         color: '95BF47' },
  { icon: 'meta',            color: '0468FF' },
  { icon: 'tiktok',          color: '000000' },
  { icon: 'hubspot',         color: 'FF7A59' },
  { icon: 'trello',          color: '0052CC' },
  { icon: 'figma',           color: 'F24E1E' },
  { icon: 'slack',           color: '4A154B' },
  { icon: 'notion',          color: '000000' },
  { icon: 'github',          color: '181717' },
  { icon: 'stripe',          color: '635BFF' },
  { icon: 'googleads',       color: 'F4B400' },
  { icon: 'googleanalytics', color: 'E37400' },
  { icon: 'salesforce',      color: '00A1E0' },
  { icon: 'zapier',          color: 'FF4A00' },
  { icon: 'airtable',        color: '18BFFF' },
  { icon: 'mailchimp',       color: 'FFE01B' },
  { icon: 'typeform',        color: '262626' },
  { icon: 'googledrive',     color: '4285F4' },
  { icon: 'googlecalendar',  color: '4285F4' },
  { icon: 'discord',         color: '5865F2' },
  { icon: 'webflow',         color: '4353FF' },
  { icon: 'intercom',        color: '6067F1' },
  { icon: 'atlassian',       color: '0052CC' },
  { icon: 'wordpress',       color: '21759B' },
];

const IntegrationIcon = ({ icon, color }: { icon: string; color: string }) => (
  <div style={{ display: 'inline-flex', width: '36px', height: '36px', borderRadius: '8px', background: '#fff', border: '1px solid #e2e8f0', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: '1rem' }}>
    <img src={`https://cdn.simpleicons.org/${icon}/${color}`} width="18" height="18" alt={icon} />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const OperationalLayer = () => (
  <section className="operational-layer" style={{ marginTop: '6rem', marginBottom: '8rem' }}>
    <style>{`
      @keyframes agent-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.55; transform: scale(0.8); }
      }
      .agent-dot { animation: agent-pulse 2.2s ease-in-out infinite; }
      .agent-dot:nth-child(2) { animation-delay: 0.3s; }
      .agent-dot:nth-child(3) { animation-delay: 0.6s; }
    `}</style>

    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

      {/* Header */}
      <div style={{ maxWidth: '700px', marginBottom: '3.5rem' }}>
        <h2 className="section-heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', marginBottom: '1rem', lineHeight: 1.1, fontWeight: 700 }}>
          The AI-Native<br />
          <span style={{ color: 'var(--brand-primary-500)' }}>Operational Architecture.</span>
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--neutral-700)', lineHeight: 1.65 }}>
          One operating system. Three layers. Your team and clients on top, intelligent agents in the middle, every tool you use at the bottom.
        </p>
      </div>

      {/* Architecture Card */}
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 2px 24px rgba(0,0,0,0.04)' }}>

        {/* ── Layer 1: Application Layer ── */}
        <div style={{ background: '#fafafa', padding: '1.75rem 2rem' }}>
          <LayerLabel
            tag="APPLICATION LAYER"
            title="Agency & Client Interface"
            description="Where the agency team and their clients interact with the operating system, each through their own tailored view."
            accent="neutral"
          />
          <div className="arch-layer1-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>

            {/* Agency side */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', overflow: 'hidden', minWidth: 0 }}>
              <AvatarCluster count={3} label="Agency Team" sublabel="Full platform access" />
              <div style={{ flexShrink: 0, width: '24px', height: '1px', background: 'linear-gradient(90deg, #e2e8f0, transparent)' }} />
              <ControlPanelMockup />
            </div>

            {/* Client side */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', overflow: 'hidden', minWidth: 0 }}>
              <AvatarCluster count={2} label="Clients" sublabel="Reports & deliverables" color="client" />
              <div style={{ flexShrink: 0, width: '24px', height: '1px', background: 'linear-gradient(90deg, #e2e8f0, transparent)' }} />
              <DashboardMockup />
            </div>

          </div>
        </div>

        {/* Connector 1 → 2 */}
        <FlowConnector pills={['Tasks', 'Queries', 'Approvals', 'Reports']} />

        {/* ── Layer 2: Back Office ── */}
        <div style={{ background: '#fff9f6', padding: '1.25rem 1.5rem' }}>
          <LayerLabel
            tag="BACK OFFICE"
            title="Agentive OS Infrastructure"
            description="Where agents and workflows are deployed, run, and monitored. The operational engine powering everything above."
            accent="orange"
          />
          <div className="arch-layer2-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>

            {/* Agent SDK & Runtime */}
            <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '0.85rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
              <AgentRuntime />
            </div>

            {/* Workflow Engine */}
            <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '0.85rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
              <WorkflowEngine />
            </div>

            {/* Context System */}
            <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '0.85rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'block' }}>CONTEXT SYSTEM</span>
              <ContextGraphAnimation />
            </div>

          </div>
        </div>

        {/* Connector 2 → 3 */}
        <FlowConnector pills={['API Calls', 'Data Sync', 'Webhooks', 'Events']} />

        {/* ── Layer 3: Integrations ── */}
        <div style={{ background: '#f8fffb', padding: '1.25rem 1.75rem', overflow: 'hidden' }}>
          <LayerLabel
            tag="INTEGRATIONS"
            title="Tools & Data Sources"
            description="Agencies and brands connect their existing tools here, feeding data in and executing actions out across their full stack."
            accent="green"
          />
          <div className="marquee-container">
            <div className="marquee-content" style={{ animationDuration: '18s' }}>
              {INTEGRATIONS.map(i => <IntegrationIcon key={i.icon} {...i} />)}
            </div>
            <div className="marquee-content" aria-hidden="true" style={{ animationDuration: '18s' }}>
              {INTEGRATIONS.map(i => <IntegrationIcon key={i.icon} {...i} />)}
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default OperationalLayer;
