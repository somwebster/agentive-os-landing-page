import React from 'react';

const CTA = () => {
  return (
    <section className="cta-section" id="cta">
      <div className="container">
        <div className="cta-inner fade-up">
          <div className="cta-tag">Ready to Transform?</div>
          <h2 className="cta-title">
            The Future of Agency is<br />
            <span className="gradient-text-both">Agent Native</span>
          </h2>
          <p className="cta-sub">Built for human-centered agencies ready to move past operational strain. Early access is limited.</p>
          <div className="cta-actions">
            <a href="#" className="btn-primary btn-large">Get Early Access</a>
            <a href="#" className="btn-ghost btn-large">Book a Demo</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
