import React from 'react';
import { Database, Workflow, Bot, Zap, ArrowRightLeft } from 'lucide-react';

const OperationalLayer = () => {
  return (
    <section className="operational-layer" style={{ marginTop: '6rem', marginBottom: '6rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Left Side: Text */}
        <div className="text-content">
          <h2 className="section-heading" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Introducing the<br/>
            <span style={{ color: 'var(--brand-primary-500)' }}>Operational Layer.</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--neutral-700)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Agentive OS isn't just a collection of tools. It's the central nervous system for your agency, designed to sit seamlessly between your team and your data.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'var(--brand-primary-100)', color: 'var(--brand-primary-500)', padding: '0.75rem', borderRadius: '50%' }}>
                <Database size={24} strokeWidth={2} />
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--neutral-900)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Unified Data Context</strong>
                <span style={{ color: 'var(--neutral-700)', fontSize: '0.95rem', lineHeight: 1.4, display: 'block' }}>Your agency's knowledge, instantly accessible by any agent.</span>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'var(--brand-secondary-100)', color: 'var(--brand-secondary-500)', padding: '0.75rem', borderRadius: '50%' }}>
                <Workflow size={24} strokeWidth={2} />
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--neutral-900)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Orchestrated Workflows</strong>
                <span style={{ color: 'var(--neutral-700)', fontSize: '0.95rem', lineHeight: 1.4, display: 'block' }}>Agents work together sequentially or in parallel to deliver results.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Side: Diagram */}
        <div className="diagram-container" style={{ 
          background: 'var(--neutral-100)', 
          borderRadius: 'var(--radius-card)', 
          padding: '2.5rem', 
          border: '1px solid var(--color-border-primary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          position: 'relative'
        }}>
           {/* Top Layer: Team */}
           <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid var(--color-border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
             <span style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>Your Human Team</span>
           </div>
           
           {/* Connection */}
           <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--brand-primary-500)' }}>
             <ArrowRightLeft size={24} style={{ transform: 'rotate(90deg)' }} />
           </div>

           {/* Middle Layer: Agentive OS */}
           <div style={{ 
             background: 'linear-gradient(135deg, rgba(247, 98, 30, 0.05), rgba(168, 85, 247, 0.05))', 
             padding: '1.5rem', 
             borderRadius: '16px', 
             border: '2px solid var(--brand-primary-500)',
             display: 'flex',
             flexDirection: 'column',
             gap: '1rem',
             position: 'relative'
           }}>
             <span style={{ fontWeight: 700, background: 'linear-gradient(90deg, #F7621E 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
               Agentive OS
             </span>
             
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
               <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--color-border-primary)' }}>
                 <Bot size={24} color="var(--brand-secondary-500)" strokeWidth={1.5} />
                 <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Specialized Agents</span>
               </div>
               <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--color-border-primary)' }}>
                 <Workflow size={24} color="var(--brand-primary-500)" strokeWidth={1.5} />
                 <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Routing & Logic</span>
               </div>
             </div>
           </div>

           {/* Connection */}
           <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--brand-primary-500)' }}>
             <ArrowRightLeft size={24} style={{ transform: 'rotate(90deg)' }} />
           </div>

           {/* Bottom Layer: Data */}
           <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid var(--color-border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
             <span style={{ fontWeight: 600, color: 'var(--neutral-600)' }}>Agency Knowledge & Tools</span>
           </div>
        </div>

      </div>
    </section>
  );
};

export default OperationalLayer;
