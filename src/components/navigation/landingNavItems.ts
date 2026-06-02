export type LandingNavItem = {
  id: string;
  label: string;
  icon: string;
  section: string;
};

export const LANDING_NAV_ITEMS: LandingNavItem[] = [
  { id: 'ai-native', label: 'AI Native OS', icon: 'hub', section: '.operational-layer' },
  { id: 'case-studies', label: 'Case Studies', icon: 'auto_stories', section: '.case-study' },
  { id: 'services', label: 'Our Services', icon: 'design_services', section: '.flow' },
  { id: 'faq', label: 'FAQ', icon: 'quiz', section: '.faq-section' },
];
