import React, { useEffect } from 'react'
import Header from './components/header'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Duality from './components/Duality'
import Solution from './components/Solution'
import Flow from './components/Flow'
import Benefits from './components/Benefits'
import CTA from './components/CTA'
import Footer from './components/Footer'
import './App.css'

function App() {
  useEffect(() => {
    // Intersection observer for fade-up
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => {
        if (el.isIntersecting) {
          el.target.classList.add('visible');
          observer.unobserve(el.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="app-wrapper">
      <Header />
      <main>
        <Hero />
        <div className="section-divider"></div>
        <Problem />
        <Duality />
        <div className="section-divider"></div>
        <Solution />
        <div className="section-divider"></div>
        <Flow />
        <div className="section-divider"></div>
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
