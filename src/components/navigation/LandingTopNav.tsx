import React, { useState } from 'react';
import { Code, Layout, Sun, Moon, ChevronDown } from 'lucide-react';
import { LandingNavMenu } from './LandingNavMenu';
import type { LandingNavItem } from './landingNavItems';

export type LandingTopNavProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  currentPage: 'home' | 'components' | 'sdk';
  onNavigateHome: () => void;
  onNavigateSdk: () => void;
  onNavigateComponents: () => void;
  onScrollTo: (selector: string) => void;
  navItems?: LandingNavItem[];
};

function NavSymbol({ name }: { name: string }) {
  return (
    <span className="material-symbols-rounded dd-nav-link-icon" aria-hidden>
      {name}
    </span>
  );
}

export function LandingTopNav({
  isDark,
  onToggleTheme,
  currentPage,
  onNavigateHome,
  onNavigateSdk,
  onNavigateComponents,
  onScrollTo,
  navItems,
}: LandingTopNavProps) {
  const [buildersOpen, setBuildersOpen] = useState(false);
  const scrollSpyEnabled = currentPage === 'home';

  return (
    <header className="landing-top-nav">
      <div className="landing-top-nav-bar">
        <a
          href="#"
          className="dd-nav-brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src={isDark ? '/Logo-white.png' : '/logo2.png'}
            alt="Agentive OS"
            className="dd-nav-logo-img"
          />
          <div className="dd-nav-brand-text">
            <span className="dd-nav-name">
              <span className="dd-nav-name-line">
                Agentive <span style={{ color: 'var(--brand-secondary-500)' }}>OS</span>
              </span>
            </span>
          </div>
        </a>

        <LandingNavMenu enabled={scrollSpyEnabled} onScrollTo={onScrollTo} items={navItems} />

        <div className="landing-top-nav-actions">
          <div className="dd-nav-builders">
            <button
              type="button"
              className={`dd-nav-builders-trigger${buildersOpen ? ' open' : ''}`}
              onClick={() => setBuildersOpen((o) => !o)}
              aria-expanded={buildersOpen}
              aria-haspopup="true"
            >
              <NavSymbol name="code_blocks" />
              <span className="dd-nav-link-label">Docs</span>
              <ChevronDown size={16} strokeWidth={2} />
            </button>
            {buildersOpen && (
              <div className="dd-nav-builders-menu" role="menu">
                <button
                  type="button"
                  role="menuitem"
                  className="dd-nav-builders-item"
                  onClick={() => {
                    onNavigateSdk();
                    setBuildersOpen(false);
                  }}
                >
                  <Code size={18} strokeWidth={2} />
                  Agentive SDK
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="dd-nav-builders-item"
                  onClick={() => {
                    onNavigateComponents();
                    setBuildersOpen(false);
                  }}
                >
                  <Layout size={18} strokeWidth={2} />
                  Component Library
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            className="dd-nav-theme"
            onClick={onToggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
          </button>
        </div>
      </div>
    </header>
  );
}
