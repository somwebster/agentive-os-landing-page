import React from 'react';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import OperationalLayer from '../components/OperationalLayer';
import Flow from '../components/Flow';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

export function LandingV1() {
  return (
    <main className="page-main">
      <Hero />
      <Problem />
      <OperationalLayer />
      <Flow />
      <FAQ />
      <CTA />
    </main>
  );
}
