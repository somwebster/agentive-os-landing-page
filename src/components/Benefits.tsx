import React from 'react';

const Benefits = () => {
  return (
    <section className="benefits" id="benefits">
      <div className="container">
        <div className="section-header">
          <div className="section-tag fade-up">Why It Matters</div>
          <h2 className="section-title fade-up fade-up-delay-1">
            Scale Your Output.<br /><span className="gradient-text-purple">Not Your Overhead.</span>
          </h2>
          <p className="section-body fade-up fade-up-delay-2">
            Workflows rely on people. Systems create leverage. By making your operations system-driven, you unlock a new reality.
          </p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card fade-up">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div className="benefit-title">Break the Hiring Trap</div>
            <div className="benefit-desc">Take on more volume without instantly adding headcount. Your system grows with you — not your payroll.</div>
          </div>
          <div className="benefit-card fade-up fade-up-delay-1">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="benefit-title">Flawless Consistency</div>
            <div className="benefit-desc">High-quality execution that never drops a task. Standards enforced at the system level, not just the individual level.</div>
          </div>
          <div className="benefit-card fade-up fade-up-delay-2">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <div className="benefit-title">Faster Delivery</div>
            <div className="benefit-desc">Eliminate manual coordination and speed up turnarounds. Your clients feel the difference — and so does your team.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
