import React from 'react';

const Flow = () => {
  return (
    <section className="flow" id="how">
      <div className="container">
        <div className="section-header">
          <div className="section-tag fade-up">How It Works</div>
          <h2 className="section-title fade-up fade-up-delay-1">
            Human-Led Strategy.<br /><span className="gradient-text-orange">AI-Powered Execution.</span>
          </h2>
          <p className="section-body fade-up fade-up-delay-2">
            This isn't automation slapped on top of chaos. It's a fundamental shift in how work flows through your agency.
          </p>
        </div>

        <div className="flow-steps fade-up fade-up-delay-2">
          <div className="flow-connector"></div>
          <div className="flow-step">
            <div className="flow-badge flow-badge-1">
              <div className="flow-badge-inner">
                <span className="flow-badge-num">01</span>
                <span className="flow-badge-word">Context</span>
              </div>
            </div>
            <div className="flow-step-title">Structure</div>
            <div className="flow-step-desc">We map your entire operational reality — clients, projects, workflows, knowledge — into a unified data layer your agents live and breathe.</div>
          </div>
          <div className="flow-step">
            <div className="flow-badge flow-badge-2">
              <div className="flow-badge-inner">
                <span className="flow-badge-num">02</span>
                <span className="flow-badge-word">Decision</span>
              </div>
            </div>
            <div className="flow-step-title">Direct</div>
            <div className="flow-step-desc">Your team uses structured context to set strategy and make key calls. Humans stay in command of every decision that matters.</div>
          </div>
          <div className="flow-step">
            <div className="flow-badge flow-badge-3">
              <div className="flow-badge-inner">
                <span className="flow-badge-num">03</span>
                <span className="flow-badge-word">Execute</span>
              </div>
            </div>
            <div className="flow-step-title">Deliver</div>
            <div className="flow-step-desc">Custom agents handle the heavy lifting reliably at scale — drafting, processing, coordinating — while your team focuses on what only humans can do.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Flow;
