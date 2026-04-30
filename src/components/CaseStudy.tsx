import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const CaseStudy = () => {
  return (
    <section className="case-study py-32 bg-surface/30" id="case-study">
      <div className="container">
        <div className="section-header mb-16">
          <div className="section-tag fade-up">Case Study</div>
          <h2 className="section-title fade-up fade-up-delay-1">
            Built with <span className="gradient-text-purple">Agentive OS.</span>
          </h2>
        </div>

        <div className="fade-up fade-up-delay-2 relative group cursor-pointer">
          {/* Card Container */}
          <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#0e0e11] aspect-[16/9] md:aspect-[21/9]">
            {/* Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" 
              alt="Kommerce AI Case Study"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end max-w-3xl">
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Organic Marketing Launches <span className="text-orange">Kommerce AI</span> — An AI Native Agency for Media Buying
              </h3>
              
              <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
                How a leading performance marketing firm built a scalable, system-driven media buying operation from scratch in less than 30 days.
              </p>

              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-white font-bold group/btn">
                  Read Case Study 
                  <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
