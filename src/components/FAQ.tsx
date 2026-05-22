import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'What exactly is Agentive OS?',
    a: 'Agentive OS is an AI-native operating system for agencies. It unifies your human team, AI agents, workflows, and knowledge into a single operational layer — replacing the patchwork of disconnected tools with one cohesive system built around your process.',
  },
  {
    q: 'Which agencies can use Agentive OS?',
    a: 'Agentive OS is built for agencies that deliver human-led services. While it can be used by a wide range of agency types, we\'re currently focused on Media Buying, Marketing, and Creative agencies.',
  },
  {
    q: 'Do I need technical expertise to get started?',
    a: 'No. We handle all infrastructure, setup, and integrations. Your team works through a clean client-facing interface while Agentive OS runs the underlying orchestration. For teams that want to build custom agents or workflows, we provide an SDK and APIs.',
  },
  {
    q: 'How long does onboarding take?',
    a: 'Most agencies are fully operational within 2–4 weeks. The process starts with a workflow mapping session where we identify bottlenecks and AI opportunities, followed by building your context system, agents, and automations.',
  },
  {
    q: 'Which tools and platforms does it integrate with?',
    a: 'Agentive OS connects with 100+ tools including HubSpot, Salesforce, Slack, Notion, Google Workspace, Shopify, Meta, TikTok, Stripe, Figma, GitHub, and more — via native MCP integrations and REST APIs.',
  },
  {
    q: 'Can I keep using my existing tools and workflows?',
    a: 'Yes. Agentive OS is designed to layer on top of your existing stack, not replace it. Your current tools plug in as data sources and action targets. The agents and workflows we build sit between them, handling the coordination.',
  },
  {
    q: 'What kinds of agents can I deploy?',
    a: 'Any agent your agency needs — Support Agents that handle tickets, Sales Agents that qualify leads and update your CRM, Creative Agents that generate and review assets, Compliance Agents that audit deliverables, Growth Agents that track performance, and more. Agents are built to your specific process, not generic templates.',
  },
  {
    q: 'How is this different from just using ChatGPT or other AI tools?',
    a: 'Generic AI tools are stateless — they forget context between sessions and don\'t know your clients, history, or process. Agentive OS maintains a persistent context graph of everything your agency knows, enabling AI that acts with real business awareness rather than one-off answers.',
  },
  {
    q: 'Is my agency\'s data secure?',
    a: 'Yes. All data is encrypted in transit and at rest. You can deploy on Agentive Cloud or on your own infrastructure — we support self-hosted deployments for agencies with strict data residency requirements. We never train models on your data.',
  },
  {
    q: 'What does the pricing look like?',
    a: 'Pricing is based on the number of agents, workflows, and integrations deployed. We offer a fixed monthly fee with no per-seat surprises. Book a demo and we\'ll put together a custom quote based on your agency\'s size and use cases.',
  },
  {
    q: 'Can I trial it before committing?',
    a: 'Yes. We run a structured pilot programme — typically a 30-day engagement where we build and deploy one core workflow for your agency at a reduced cost. This lets you validate ROI before rolling out across your full operations.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section" style={{ marginTop: '6rem', marginBottom: '3rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="section-heading" style={{ marginBottom: '0.75rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--neutral-700)', maxWidth: '560px' }}>
            Everything you need to know about building an AI-native agency with Agentive OS.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: 'var(--color-surface-primary)',
                  border: `1px solid ${isOpen ? 'var(--brand-primary-500)' : 'var(--color-border-primary)'}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                  boxShadow: isOpen ? '0 4px 16px rgba(247,98,30,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1.25rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-family)',
                  }}
                >
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: isOpen ? 'var(--brand-primary-500)' : 'var(--color-text-heading)',
                    transition: 'color 0.2s',
                    lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    strokeWidth={2.5}
                    style={{
                      flexShrink: 0,
                      color: isOpen ? 'var(--brand-primary-500)' : 'var(--neutral-400)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease, color 0.2s',
                    }}
                  />
                </button>

                <div style={{
                  maxHeight: isOpen ? '400px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  <p style={{
                    margin: 0,
                    padding: '0 1.5rem 1.5rem',
                    fontSize: '0.95rem',
                    color: 'var(--neutral-700)',
                    lineHeight: 1.7,
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
