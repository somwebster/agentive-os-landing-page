import { useCallback, useEffect, useRef, useState } from 'react';
import type { LandingNavItem } from './landingNavItems';

const HIGHLIGHT_TRANSITION =
  'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), width 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease';

type UseLandingNavHighlightOptions = {
  items: LandingNavItem[];
  enabled: boolean;
};

export function useLandingNavHighlight({ items, enabled }: UseLandingNavHighlightOptions) {
  const navRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const isPointerInsideRef = useRef(false);
  const rafRef = useRef(0);

  const setItemRef = useCallback((id: string) => {
    return (el: HTMLElement | null) => {
      itemRefs.current[id] = el;
    };
  }, []);

  const updateOnActionStates = useCallback(
    (engagedEl: HTMLElement | null) => {
      for (const item of items) {
        const button = itemRefs.current[item.id];
        if (!button) continue;
        const onAction = engagedEl
          ? button === engagedEl
          : item.id === activeIdRef.current;
        button.classList.toggle('is-on-action', onAction);
      }
    },
    [items]
  );

  const applyHighlightToElement = useCallback((el: HTMLElement | null, instant = false) => {
    const highlight = highlightRef.current;
    const nav = navRef.current;
    if (!highlight || !nav) return;

    if (!el) {
      highlight.style.opacity = '0';
      updateOnActionStates(null);
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const left = rect.left - navRect.left;

    if (instant) {
      highlight.style.transition = 'none';
    } else {
      highlight.style.transition = HIGHLIGHT_TRANSITION;
    }

    highlight.style.width = `${rect.width}px`;
    highlight.style.transform = `translate3d(${left}px, -50%, 0)`;
    highlight.style.opacity = '1';

    if (instant) {
      requestAnimationFrame(() => {
        if (highlightRef.current) {
          highlightRef.current.style.transition = HIGHLIGHT_TRANSITION;
        }
      });
    }

    updateOnActionStates(el);
  }, [updateOnActionStates]);

  const applyHighlightToId = useCallback(
    (id: string | null, instant = false) => {
      if (!id) {
        applyHighlightToElement(null);
        return;
      }
      applyHighlightToElement(itemRefs.current[id] ?? null, instant);
    },
    [applyHighlightToElement]
  );

  const syncToActive = useCallback(
    (instant = false) => {
      if (isPointerInsideRef.current) return;
      applyHighlightToId(activeIdRef.current, instant);
    },
    [applyHighlightToId]
  );

  const findClosestItem = useCallback((clientX: number) => {
    let closest: HTMLElement | null = null;
    let minDistance = Infinity;

    for (const item of items) {
      const el = itemRefs.current[item.id];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(clientX - center);
      if (distance < minDistance) {
        minDistance = distance;
        closest = el;
      }
    }

    return closest;
  }, [items]);

  const handlePointerMove = useCallback(
    (clientX: number) => {
      const closest = findClosestItem(clientX);
      applyHighlightToElement(closest);
    },
    [applyHighlightToElement, findClosestItem]
  );

  const onNavPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!enabled) return;
      isPointerInsideRef.current = true;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => handlePointerMove(e.clientX));
    },
    [enabled, handlePointerMove]
  );

  const onNavPointerLeave = useCallback(() => {
    isPointerInsideRef.current = false;
    syncToActive();
  }, [syncToActive]);

  useEffect(() => {
    activeIdRef.current = activeId;
    syncToActive();
  }, [activeId, syncToActive]);

  useEffect(() => {
    if (!enabled) return;

    const updateActiveFromScroll = () => {
      const offset = (navRef.current?.getBoundingClientRect().bottom ?? 96) + 24;
      let next: string | null = null;

      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.querySelector(items[i].section);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset) {
          next = items[i].id;
          break;
        }
      }

      setActiveId((prev) => (prev === next ? prev : next));
    };

    let scrollRaf = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(updateActiveFromScroll);
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(scrollRaf);
    };
  }, [enabled, items]);

  useEffect(() => {
    if (!enabled || !navRef.current) return;

    const ro = new ResizeObserver(() => syncToActive(true));
    ro.observe(navRef.current);
    items.forEach((item) => {
      const el = itemRefs.current[item.id];
      if (el) ro.observe(el);
    });

    return () => ro.disconnect();
  }, [enabled, items, syncToActive, activeId]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return {
    navRef,
    highlightRef,
    activeId,
    setItemRef,
    onNavPointerMove,
    onNavPointerLeave,
    applyHighlightToId,
  };
}
