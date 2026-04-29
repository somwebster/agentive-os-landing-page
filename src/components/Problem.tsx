import React from 'react';

const Problem = () => {
  return (
    <section className="problem" id="problem">
      <div className="container">
        <p className="problem-label fade-up">The Problem</p>
        <h2 className="problem-intro fade-up fade-up-delay-1">
          Agencies run on duct tape.<br />
          <span className="gradient-text-orange">It works — until it doesn't.</span>
        </h2>

        <div className="pain-grid fade-up fade-up-delay-2">
          <div className="pain-item">
            <div className="pain-icon">
              <svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </div>
            <div className="pain-title">Context gets lost</div>
            <div className="pain-desc">Every tool switch is a context gap. Client knowledge, project state, and tribal decisions vanish into Slack threads. </div>
          </div>
          <div className="pain-item">
            <div className="pain-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <div className="pain-title">AI doesn't fit your workflows</div>
            <div className="pain-desc">Generic AI tools don't know your domain, your clients, or your process. They assist but never truly execute.</div>
          </div>
          <div className="pain-item">
            <div className="pain-icon">
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div className="pain-title">Scaling means hiring</div>
            <div className="pain-desc">More revenue demands more headcount. The leverage ratio never improves — growth means complexity, not efficiency.</div>
          </div>
          <div className="pain-item">
            <div className="pain-icon">
              <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <div className="pain-title">Competing on speed</div>
            <div className="pain-desc">AI-native competitors ship faster. The execution gap widens. Your process is your edge - but only if you can move at AI speed.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
