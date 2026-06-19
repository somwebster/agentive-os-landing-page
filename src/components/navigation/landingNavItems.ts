export type LandingNavItem = {
  id: string;
  label: string;
  icon: string;
  section: string;
};

export const LANDING_NAV_ITEMS_V1: LandingNavItem[] = [
  { id: 'ai-native', label: 'AI Native OS', icon: 'hub', section: '.operational-layer' },
  { id: 'case-studies', label: 'Case Studies', icon: 'auto_stories', section: '.case-study' },
  { id: 'services', label: 'Our Services', icon: 'design_services', section: '.flow' },
  { id: 'faq', label: 'FAQ', icon: 'quiz', section: '.faq-section' },
];

export const LANDING_NAV_ITEMS_V2: LandingNavItem[] = [
  { id: 'how-it-works', label: 'How it works', icon: 'route', section: '.landing-v2-how' },
  { id: 'what-you-get', label: 'What you get', icon: 'deployed_code', section: '.landing-v2-build' },
  { id: 'results', label: 'Results', icon: 'monitoring', section: '.landing-v2-results' },
  { id: 'pricing', label: 'Pricing', icon: 'sell', section: '.landing-v2-pricing' },
  { id: 'faq', label: 'FAQ', icon: 'quiz', section: '.faq-section' },
];

export const LANDING_NAV_ITEMS = LANDING_NAV_ITEMS_V1;
