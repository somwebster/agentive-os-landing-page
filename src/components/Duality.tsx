import React from 'react';

const Duality = () => {
  return (
    <section className="duality" id="duality">
      <div className="container">
        <div className="duality-inner fade-up">
          <div className="duality-side left">
            <div className="duality-side-tag human">Human Side</div>
            <div className="duality-side-title">Your strategy.<br />Your expertise.</div>
            <div className="duality-side-desc">Years of domain knowledge and client intuition that no model can replicate.</div>
            <ul className="duality-list">
              <li>High-stakes decisions</li>
              <li>Client relationships</li>
              <li>Creative direction</li>
              <li>Strategic oversight</li>
            </ul>
          </div>

          <div className="duality-center">
            <div className="duality-line"></div>
            <div className="duality-plus">+</div>
            <div className="duality-line"></div>
          </div>

          <div className="duality-side right">
            <div className="duality-side-tag ai">AI Side</div>
            <div className="duality-side-title">AI execution.<br />At scale.</div>
            <div className="duality-side-desc">Custom agents &amp; workflows trained on your process, delivering reliable, consistent output.</div>
            <ul className="duality-list">
              <li>Realtime Context Management</li>
              <li>Data Analysis &amp; Insights</li>
              <li>Integrations with existing tools</li>
              <li>Workflow automations for routine tasks</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Duality;
