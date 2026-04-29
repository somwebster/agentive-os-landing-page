import React from 'react';

const Solution = () => {
  return (
    <section className="solution" id="solution">
      <div className="container">
        <div className="section-header">
          <div className="section-tag fade-up">The Product</div>
          <h2 className="section-title fade-up fade-up-delay-1">
            The Process <span className="gradient-text-purple">Is the Product</span>
          </h2>
          <p className="section-body fade-up fade-up-delay-2">
            We don't give you another tool that doesn't understand your agency. We help you design, build, and run a fully managed Agent-Native operational layer - tailored to your process and your strengths.
          </p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card featured fade-up">
            <div className="pillar-num">01 — Foundation</div>
            <div className="pillar-title">Your <span className="gradient-text-both">Context System</span></div>
            <div className="pillar-desc">Clients, projects, and deliverables unified in one shared operational layer. Your agency's tribal knowledge, structured into a living system that every agent and team member draws from.</div>
          </div>
          <div className="pillar-card fade-up fade-up-delay-1">
            <div className="pillar-num">02 — Execution</div>
            <div className="pillar-title">Your <span className="gradient-text-purple">AI Agents</span></div>
            <div className="pillar-desc">Custom-trained on your logic and toolset to execute work — not just assist. Agents that know your voice, your standards, and your clients.</div>
          </div>
          <div className="pillar-card fade-up fade-up-delay-2">
            <div className="pillar-num">03 — Oversight</div>
            <div className="pillar-title">Your <span className="gradient-text-orange">Command Center</span></div>
            <div className="pillar-desc">A single interface where your team oversees everything. Human judgment at the controls; AI handling the heavy lifting beneath.</div>
          </div>
          <div className="pillar-card fade-up fade-up-delay-3">
            <div className="pillar-num">04 — Infrastructure</div>
            <div className="pillar-title">Fully Managed</div>
            <div className="pillar-desc">We deploy, maintain, and upgrade your system as you grow. No internal AI team needed. No ops burden. Just leverage.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
