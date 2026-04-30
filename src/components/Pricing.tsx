import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const tiers = [
    {
      name: "Builder Plan",
      subName: "(Self Serve)",
      price: "$299",
      priceSuffix: "/mo + usage",
      description: "For teams that want full control",
      features: [
        "Agentive SDK, component library & API access",
        "Build and manage your own system",
        "Deploy on Cloud or your own infra",
        "Documentation, templates & support"
      ],
      cta: "Get Early Access",
      highlight: false
    },
    {
      name: "Human-in-the-Loop",
      subName: "(Managed Service)",
      price: "$2,499",
      priceSuffix: "/mo + rev share",
      description: "For teams that want a hands-on partner",
      features: [
        "We design, build, and maintain your system",
        "Custom context, workflows & agents",
        "Continuous monitoring & performance tuning",
        "Dedicated support & strategic guidance",
        "SLA-backed reliability"
      ],
      cta: "Book a Demo",
      highlight: true
    }
  ];

  return (
    <section className="pricing py-32" id="pricing">
      <div className="container">
        <div className="section-header mb-20">
          <div className="section-tag fade-up">Pricing</div>
          <h2 className="section-title fade-up fade-up-delay-1 text-left">
            Pick a plan that <br />
            <span className="gradient-text-both text-left">fits your agency.</span>
          </h2>
          <p className="section-body fade-up fade-up-delay-2">
            Choose the operational layer that matches your current scale. Simple, fair, and ready to grow with you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {tiers.map((tier, idx) => (
            <div 
              key={tier.name}
              className={`fade-up fade-up-delay-${idx} relative p-10 rounded-[2.5rem] border transition-all duration-500 group overflow-hidden ${
                tier.highlight 
                ? 'bg-gradient-to-b from-white/10 to-transparent border-purple/30 shadow-[0_0_50px_-12px_rgba(150,59,247,0.2)]' 
                : 'bg-surface border-white/10 hover:border-white/20'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple to-orange opacity-50" />
              )}
              
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">{tier.name}</h3>
                  <span className="text-[10px] text-white/20 font-medium uppercase tracking-widest">{tier.subName}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-white/40 text-xs font-medium">{tier.priceSuffix}</span>
                </div>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-4 mb-10">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className={`mt-0.5 size-4 rounded-full flex items-center justify-center shrink-0 ${tier.highlight ? 'bg-purple/20' : 'bg-white/5'}`}>
                      <Check className={`size-2.5 ${tier.highlight ? 'text-purple-light' : 'text-white/40'}`} />
                    </div>
                    <span className="text-xs text-text-primary/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                tier.highlight 
                ? 'bg-purple text-white shadow-lg shadow-purple/20 hover:bg-purple-light' 
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'
              }`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
