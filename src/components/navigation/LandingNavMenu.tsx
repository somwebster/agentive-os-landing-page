import React from 'react';
import { LANDING_NAV_ITEMS } from './landingNavItems';
import type { LandingNavItem } from './landingNavItems';
import { useLandingNavHighlight } from './useLandingNavHighlight';

function NavSymbol({ name }: { name: string }) {
  return (
    <span className="material-symbols-rounded dd-nav-link-icon" aria-hidden>
      {name}
    </span>
  );
}

export type LandingNavMenuProps = {
  enabled: boolean;
  onScrollTo: (selector: string) => void;
  items?: LandingNavItem[];
};

export function LandingNavMenu({ enabled, onScrollTo, items = LANDING_NAV_ITEMS }: LandingNavMenuProps) {
  const {
    navRef,
    highlightRef,
    activeId,
    setItemRef,
    onNavPointerMove,
    onNavPointerLeave,
    applyHighlightToId,
  } = useLandingNavHighlight({ items, enabled });

  return (
    <nav
      ref={navRef}
      className="landing-top-nav-links"
      aria-label="Main"
      onPointerMove={onNavPointerMove}
      onPointerLeave={onNavPointerLeave}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          onNavPointerLeave();
        }
      }}
    >
      <div ref={highlightRef} className="landing-nav-highlight" aria-hidden />

      {items.map((item) => {
        const isSelected = activeId === item.id;
        const handleActivate = () => {
          const target = document.querySelector(item.section);
          if (target) {
            onScrollTo(item.section);
          }
          applyHighlightToId(item.id);
        };

        return (
          <button
            key={item.id}
            type="button"
            ref={setItemRef(item.id)}
            data-nav-id={item.id}
            className={`dd-nav-link landing-nav-link${isSelected ? ' is-selected' : ''}`}
            aria-current={isSelected ? 'true' : undefined}
            onClick={handleActivate}
            onFocus={() => applyHighlightToId(item.id)}
          >
            <NavSymbol name={item.icon} />
            <span className="dd-nav-link-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
