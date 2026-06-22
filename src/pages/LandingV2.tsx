import React from 'react';
import {
  LandingV2BuildExamples,
  LandingV2FAQ,
  LandingV2FinalCTA,
  LandingV2Hero,
  LandingV2HowItWorks,
  LandingV2Integrations,
  LandingV2Pillars,
  LandingV2Pricing,
  LandingV2Problem,
  LandingV2Results,
} from '../components/landing-v2/LandingV2Sections';

export function LandingV2() {
  return (
    <main className="page-main landing-v2">
      <LandingV2Hero />
      <LandingV2Integrations />
      <LandingV2Pillars />
      <LandingV2Problem />
      <LandingV2HowItWorks />
      <LandingV2BuildExamples />
      <LandingV2Results />
      <LandingV2Pricing />
      <LandingV2FAQ />
      <LandingV2FinalCTA />
    </main>
  );
}
