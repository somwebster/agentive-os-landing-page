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
          
          {/* Step 1: Define */}
          <div className="flow-step">
            <div className="flow-badge flow-badge-1">
              <div className="flow-badge-inner">
                <span className="flow-badge-num">01</span>
                <span className="flow-badge-word">Define</span>
              </div>
            </div>
            <div className="flow-step-desc">Map workflows to uncover bottlenecks, tool gaps, and AI opportunities.</div>
          </div>

          {/* Step 2: Develop */}
          <div className="flow-step">
            <div className="flow-badge flow-badge-2">
              <div className="flow-badge-inner">
                <span className="flow-badge-num">02</span>
                <span className="flow-badge-word">Develop</span>
              </div>
            </div>
            <div className="flow-step-desc">Build your context system, agents, and workflows using Agentive SDK & APIs.</div>
          </div>

          {/* Step 3: Deploy */}
          <div className="flow-step">
            <div className="flow-badge flow-badge-3">
              <div className="flow-badge-inner">
                <span className="flow-badge-num">03</span>
                <span className="flow-badge-word">Deploy</span>
              </div>
            </div>
            <div className="flow-step-desc">Launch production-ready environments on Agentive Cloud or your own infra.</div>
          </div>

          {/* Step 4: Monitor */}
          <div className="flow-step">
            <div className="flow-badge flow-badge-4">
              <div className="flow-badge-inner">
                <span className="flow-badge-num">04</span>
                <span className="flow-badge-word">Monitor</span>
              </div>
            </div>
            <div className="flow-step-desc">Track throughput, optimize agents, and continuously identify new bottlenecks.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Flow;
