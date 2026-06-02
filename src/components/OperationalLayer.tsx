import React from 'react';
import './marquee.css';
import { SansEmphasis } from './SansEmphasis';

// ─── Context Graph (SVG, no WebGL) ───────────────────────────────────────────

// ── Three-tier network graph ──────────────────────────────────────────────────
// Primary hubs (labelled, coloured, large)
const PRIMARY = [
  { id: 'clients',      label: 'Clients',      fill: '#3b82f6', cx: 26, cy: 20, r: 4.5 },
  { id: 'projects',     label: 'Projects',     fill: '#f59e0b', cx: 74, cy: 16, r: 4.0 },
  { id: 'agents',       label: 'AI Agents',    fill: '#ec4899', cx: 52, cy: 50, r: 5.5 }, // hub
  { id: 'analytics',    label: 'Analytics',    fill: '#8b5cf6', cx: 16, cy: 68, r: 4.0 },
  { id: 'deliverables', label: 'Deliverables', fill: '#10b981', cx: 80, cy: 70, r: 4.0 },
];
// Secondary nodes (no label, medium)
const SECONDARY = [
  { id: 's1', cx: 50, cy: 18, r: 2.8 },
  { id: 's2', cx: 88, cy: 38, r: 2.5 },
  { id: 's3', cx: 37, cy: 40, r: 2.5 },
  { id: 's4', cx: 66, cy: 34, r: 2.2 },
  { id: 's5', cx: 30, cy: 82, r: 2.5 },
  { id: 's6', cx: 66, cy: 56, r: 2.8 },
  { id: 's7', cx: 44, cy: 72, r: 2.2 },
];
// Tiny satellite dots
const TERTIARY = [
  { id: 't1', cx: 7,  cy: 30, r: 1.3 },
  { id: 't2', cx: 48, cy: 5,  r: 1.3 },
  { id: 't3', cx: 94, cy: 22, r: 1.2 },
  { id: 't4', cx: 10, cy: 50, r: 1.5 },
  { id: 't5', cx: 92, cy: 82, r: 1.2 },
  { id: 't6', cx: 46, cy: 94, r: 1.4 },
  { id: 't7', cx: 6,  cy: 80, r: 1.2 },
  { id: 't8', cx: 82, cy: 48, r: 1.3 },
];

// Flat node array — indices used by edges below
const ALL_NODES = [...PRIMARY, ...SECONDARY, ...TERTIARY];
//  0 Clients · 1 Projects · 2 AI Agents · 3 Analytics · 4 Deliverables
//  5 s1 · 6 s2 · 7 s3 · 8 s4 · 9 s5 · 10 s6 · 11 s7
//  12 t1 · 13 t2 · 14 t3 · 15 t4 · 16 t5 · 17 t6 · 18 t7 · 19 t8

const ALL_EDGES = [
  // AI Agents hub — connects to everything nearby
  [2,0],[2,1],[2,3],[2,4],[2,7],[2,8],[2,10],[2,6],
  // Clients cluster
  [0,5],[0,7],[0,3],[0,13],[0,12],
  // Projects cluster
  [1,5],[1,6],[1,8],[1,14],[1,19],
  // Analytics cluster
  [3,9],[3,15],[3,18],[3,7],
  // Deliverables cluster
  [4,10],[4,16],[4,6],[4,9],[4,11],
  // Secondary ↔ secondary
  [5,8],[6,8],[6,10],[7,15],[9,17],[9,18],[10,16],[11,17],
  // Long cross edges
  [0,4],[1,3],[0,10],[1,11],
];

const ContextGraphAnimation = () => (
    <svg viewBox="-4 -2 108 102" style={{ width: '100%', maxHeight: '160px', display: 'block', margin: '0 auto', overflow: 'visible' }}>
      {/* ── Edges ── */}
      {ALL_EDGES.map(([fi, ti], i) => {
        const f = ALL_NODES[fi], t = ALL_NODES[ti];
        return (
          <line key={i}
            x1={f.cx} y1={f.cy} x2={t.cx} y2={t.cy}
            strokeWidth="0.5" opacity="0.35"
            style={{ stroke: 'var(--color-border-primary)' }}
          />
        );
      })}

      {/* ── Tertiary dots ── */}
      {TERTIARY.map(n => (
        <circle key={n.id} cx={n.cx} cy={n.cy} r={n.r}
          style={{ fill: 'var(--color-text-muted)' }} opacity="0.45" />
      ))}

      {/* ── Secondary nodes ── */}
      {SECONDARY.map(n => (
        <circle key={n.id} cx={n.cx} cy={n.cy} r={n.r}
          style={{ fill: 'var(--color-text-muted)' }} opacity="0.6" />
      ))}

      {/* ── Primary hubs ── */}
      {PRIMARY.map((node, idx) => (
        <g key={node.id}>
          {/* Pulse ring */}
          <circle cx={node.cx} cy={node.cy} r={node.r} fill={node.fill} opacity="0.12">
            <animate attributeName="r"       values={`${node.r};${node.r + 4};${node.r}`} dur={`${3.8 + idx * 0.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.12;0;0.12" dur={`${3.8 + idx * 0.5}s`} repeatCount="indefinite" />
          </circle>
          {/* Solid hub */}
          <circle cx={node.cx} cy={node.cy} r={node.r} fill={node.fill} opacity="0.92" />
          {/* Label */}
          <text x={node.cx} y={node.cy + (node.cy > 60 ? node.r + 5 : -(node.r + 2))}
            textAnchor="middle"
            style={{ fontSize: '3.6px', fill: 'var(--color-text-muted)', fontWeight: 700, fontFamily: 'var(--font-family)' }}>
            {node.label}
          </text>
        </g>
      ))}
    </svg>
);

// ─── Layer Badge ──────────────────────────────────────────────────────────────

const LayerLabel = ({ tag, title, description, accent }: { tag: string; title: string; description: string; accent: 'neutral' | 'orange' | 'green' }) => {
  const colors = {
    neutral: { bg: 'var(--neutral-100)', color: 'var(--color-text-muted)' },
    orange:  { bg: 'rgba(247,98,30,0.1)', color: 'var(--brand-primary-500)' },
    green:   { bg: 'rgba(34,197,94,0.1)', color: '#16a34a' },
  }[accent];
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', display: 'block', marginBottom: '0.3rem' }}>{title}</span>
      <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 400, color: 'var(--color-text-heading)', lineHeight: 1.5 }}>{description}</p>
    </div>
  );
};

// ─── Flow Connector ───────────────────────────────────────────────────────────

const FlowConnector = ({ pills }: { pills: string[] }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.6rem 1.5rem', borderTop: '1px solid var(--color-border-primary)', borderBottom: '1px solid var(--color-border-primary)', background: 'var(--color-surface-page)', flexWrap: 'wrap' }}>
    <span style={{ fontSize: '0.65rem', color: 'var(--brand-primary-400)', fontWeight: 700, marginRight: '0.25rem' }}>↓</span>
    {pills.map((pill, i) => (
      <React.Fragment key={pill}>
        <span style={{ padding: '0.15rem 0.55rem', background: 'var(--brand-primary-25)', color: 'var(--brand-primary-500)', border: '1px solid rgba(247,98,30,0.15)', borderRadius: '100px', fontSize: '0.6rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
          {pill}
        </span>
        {i < pills.length - 1 && <span style={{ color: 'var(--color-border-primary)', fontSize: '0.6rem' }}>·</span>}
      </React.Fragment>
    ))}
    <span style={{ fontSize: '0.65rem', color: 'var(--brand-primary-400)', fontWeight: 700, marginLeft: '0.25rem' }}>↑</span>
  </div>
);

// ─── Layer 1: Application Layer ───────────────────────────────────────────────

// Agency = control panel skeleton (sidebar + multi-section layout + action buttons)
const ControlPanelMockup = () => (
  <div style={{ flex: 1, minWidth: 0 }}>
    <div style={{ background: 'var(--color-surface-primary)', borderRadius: '14px', border: '1px solid var(--color-border-primary)', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
      <div style={{ background: 'var(--color-surface-page)', borderBottom: '1px solid var(--color-border-primary)', padding: '0.45rem 0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        {['#ff5f57', '#ffbd2e', '#28c940'].map(c => <div key={c} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, height: '7px', background: 'var(--color-border-primary)', borderRadius: '3px', marginLeft: '0.3rem' }} />
        <div style={{ width: '24px', height: '7px', background: 'rgba(247,98,30,0.3)', borderRadius: '3px' }} />
      </div>
      <div style={{ padding: '0.55rem', display: 'flex', gap: '0.35rem', minHeight: '68px' }}>
        <div style={{ width: '22px', background: 'var(--color-surface-page)', borderRadius: '4px', padding: '0.3rem 0.2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {[1,2,3,4,5].map(i => <div key={i} style={{ height: '5px', background: i === 1 ? 'rgba(247,98,30,0.4)' : 'var(--color-border-primary)', borderRadius: '2px' }} />)}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.1rem' }}>
            <div style={{ height: '6px', flex: 2, background: 'var(--neutral-100)', borderRadius: '2px' }} />
            <div style={{ height: '6px', width: '14px', background: 'rgba(247,98,30,0.3)', borderRadius: '2px' }} />
            <div style={{ height: '6px', width: '14px', background: 'var(--neutral-100)', borderRadius: '2px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.2rem' }}>
            {[1,2,3,4].map(i => <div key={i} style={{ height: '10px', background: 'var(--color-surface-page)', borderRadius: '3px', border: '1px solid var(--color-border-primary)' }} />)}
          </div>
          <div style={{ height: '6px', background: 'var(--neutral-100)', borderRadius: '2px', width: '70%' }} />
        </div>
      </div>
    </div>
  </div>
);

// Client = dashboard skeleton (metric cards + chart areas, clean & read-focused)
const DashboardMockup = () => (
  <div style={{ flex: 1, minWidth: 0 }}>
    <div style={{ background: 'var(--color-surface-primary)', borderRadius: '14px', border: '1px solid var(--color-border-primary)', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
      <div style={{ background: 'var(--color-surface-page)', borderBottom: '1px solid var(--color-border-primary)', padding: '0.45rem 0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        {['#ff5f57', '#ffbd2e', '#28c940'].map(c => <div key={c} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, height: '7px', background: 'var(--color-border-primary)', borderRadius: '3px', marginLeft: '0.3rem' }} />
      </div>
      <div style={{ padding: '0.55rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', minHeight: '68px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.2rem' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ padding: '0.2rem 0.25rem', background: 'var(--color-surface-page)', borderRadius: '4px', border: '1px solid var(--color-border-primary)' }}>
              <div style={{ height: '4px', background: 'var(--color-border-primary)', borderRadius: '2px', width: '60%', marginBottom: '0.15rem' }} />
              <div style={{ height: '7px', background: i === 1 ? 'rgba(99,102,241,0.3)' : 'var(--neutral-100)', borderRadius: '2px', width: '80%' }} />
            </div>
          ))}
        </div>
        <div style={{ height: '20px', background: 'var(--color-surface-page)', borderRadius: '4px', border: '1px solid var(--color-border-primary)', display: 'flex', alignItems: 'flex-end', padding: '0.2rem 0.25rem', gap: '0.15rem' }}>
          {[40,65,50,80,60,75,55,85].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 7 ? 'rgba(99,102,241,0.45)' : 'rgba(99,102,241,0.2)', borderRadius: '2px 2px 0 0' }} />
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
        <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2.5px solid var(--color-surface-primary)', background: 'var(--neutral-100)', overflow: 'hidden', marginLeft: i > 0 ? '-10px' : 0, zIndex: count - i, boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
          <img src={`https://i.pravatar.cc/80?u=${i + (color === 'client' ? 20 : 10)}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ))}
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-heading)' }}>{label}</div>
      {sublabel && <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', fontWeight: 500, marginTop: '0.1rem' }}>{sublabel}</div>}
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
    <div style={{ marginBottom: '0.75rem' }}>
      <span style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>AGENTS</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.28rem', flex: 1 }}>
      {AGENTS.map(agent => (
        <div key={agent.name} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.45rem', background: 'var(--color-surface-page)', borderRadius: '7px', border: '1px solid var(--color-border-primary)' }}>
          <div className="agent-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: agent.color, flexShrink: 0 }} />
          <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--color-text-body)' }}>{agent.name}</span>
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
      <span style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>WORKFLOWS & AUTOMATIONS</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem', flex: 1 }}>
      {WORKFLOWS.map(wf => (
        <div key={wf.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.32rem 0.5rem', background: 'var(--color-surface-page)', borderRadius: '7px', border: '1px solid var(--color-border-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div className="agent-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: wf.color, flexShrink: 0 }} />
            <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--color-text-body)' }}>{wf.name}</span>
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
  { icon: 'notion',          color: '000000' },
  { icon: 'github',          color: '181717' },
  { icon: 'stripe',          color: '635BFF' },
  { icon: 'googleads',       color: 'F4B400' },
  { icon: 'googleanalytics', color: 'E37400' },
  { icon: 'zapier',          color: 'FF4A00' },
  { icon: 'linear',          color: '5E6AD2' },
  { icon: 'asana',           color: 'F06A6A' },
  { icon: 'dropbox',         color: '0061FF' },
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
  <div style={{ display: 'inline-flex', width: '36px', height: '36px', borderRadius: '8px', background: 'var(--color-surface-primary)', border: '1px solid var(--color-border-primary)', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: '1rem' }}>
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
          The <SansEmphasis>AI-Native</SansEmphasis><br />
          <span style={{ color: 'var(--brand-primary-500)' }}><SansEmphasis>Operational Architecture</SansEmphasis>.</span>
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--neutral-700)', lineHeight: 1.65 }}>
          An AI Operating System that scales your team's throughput, not your headcount. Make every member 10x and give your clients an unmatched experience like never before.
        </p>
      </div>

      {/* Architecture Card */}
      <div style={{ border: '1px solid var(--color-border-primary)', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 2px 24px rgba(0,0,0,0.04)' }}>

        {/* ── Layer 1: Application Layer ── */}
        <div style={{ background: 'var(--color-surface-page)', padding: '1.75rem 2rem' }}>
          <LayerLabel
            tag="APPLICATION LAYER"
            title="Agency & Client Interface"
            description="Where the agency team and their clients interact with the operating system, each through their own tailored view."
            accent="neutral"
          />
          <div className="arch-layer1-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>

            {/* Agency side */}
            <div style={{ background: 'var(--color-surface-primary)', borderRadius: '16px', border: '1px solid var(--color-border-primary)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', overflow: 'hidden', minWidth: 0 }}>
              <AvatarCluster count={3} label="Agency Team" sublabel="" />
              <div style={{ flexShrink: 0, width: '24px', height: '1px', background: 'linear-gradient(90deg, var(--color-border-primary), transparent)' }} />
              <ControlPanelMockup />
            </div>

            {/* Client side */}
            <div style={{ background: 'var(--color-surface-primary)', borderRadius: '16px', border: '1px solid var(--color-border-primary)', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', overflow: 'hidden', minWidth: 0 }}>
              <AvatarCluster count={2} label="Clients" sublabel="" color="client" />
              <div style={{ flexShrink: 0, width: '24px', height: '1px', background: 'linear-gradient(90deg, var(--color-border-primary), transparent)' }} />
              <DashboardMockup />
            </div>

          </div>
        </div>

        {/* Connector 1 → 2 */}
        <FlowConnector pills={['Tasks', 'Queries', 'Approvals', 'Reports']} />

        {/* ── Layer 2: Back Office ── */}
        <div style={{ background: 'var(--color-surface-page)', padding: '1.25rem 1.5rem' }}>
          <LayerLabel
            tag="BACK OFFICE"
            title="Agentive OS Infrastructure"
            description="Where agents and workflows are deployed, run, and monitored. The operational engine powering everything above."
            accent="orange"
          />
          <div className="arch-layer2-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', alignItems: 'stretch' }}>

            {/* Agent SDK & Runtime */}
            <div style={{ background: 'var(--color-surface-primary)', borderRadius: '14px', border: '1px solid var(--color-border-primary)', padding: '0.85rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
              <AgentRuntime />
            </div>

            {/* Workflow Engine */}
            <div style={{ background: 'var(--color-surface-primary)', borderRadius: '14px', border: '1px solid var(--color-border-primary)', padding: '0.85rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
              <WorkflowEngine />
            </div>

            {/* Context System */}
            <div style={{ background: 'var(--color-surface-primary)', borderRadius: '14px', border: '1px solid var(--color-border-primary)', padding: '0.85rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--color-text-muted)', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'block' }}>CONTEXT SYSTEM</span>
              <ContextGraphAnimation />
            </div>

          </div>
        </div>

        {/* Connector 2 → 3 */}
        <FlowConnector pills={['API Calls', 'Data Sync', 'Webhooks', 'Events']} />

        {/* ── Layer 3: Integrations ── */}
        <div style={{ background: 'var(--color-surface-page)', padding: '1.25rem 1.75rem', overflow: 'hidden' }}>
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
