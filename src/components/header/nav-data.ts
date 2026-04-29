export type NavItem = {
  label: string;
  description?: string;
  href?: string;
};

export type NavColumn = {
  heading: string;
  items: NavItem[];
  accent?: boolean;
};

export type NavMenu = {
  id: string;
  columns: NavColumn[];
};

export type NavLink = {
  label: string;
  href?: string;
  menu?: NavMenu;
};

export const NAV_LINKS: NavLink[] = [
  {
    label: "Product",
    menu: {
      id: "products",
      columns: [
        {
          heading: "Platform: For Agencies",
          items: [
            { label: "Context Manager", description: "Tools" },
            { label: "System Builder", description: "Tools" },
            { label: "Command Center", description: "Tools" },
            { label: "Technical Partnership", description: "Service — Fully Custom built and Managed" },
          ],
        },
        {
          heading: "Features: For Developers",
          items: [
            { label: "Product Development Library", description: "Agentive Product Development Library" },
            { label: "UI Component Library", description: "Professional UI library" },
            { label: "SDK & Platform APIs", description: "Agentive SDK & Platform APIs" },
          ],
        },
        {
          heading: "Infrastructure",
          accent: true,
          items: [
            { label: "Fully Managed", description: "Infrastructure in our cloud" },
            { label: "Self Hosted", description: "Deployed in your own infrastructure" },
            { label: "Enterprise Security", description: "Enterprise grade security" },
          ],
        },
      ],
    },
  },
  {
    label: "Company",
    menu: {
      id: "company",
      columns: [
        {
          heading: "About",
          items: [
            { label: "Our story", description: "How we got here" },
            { label: "Team", description: "Meet the people" },
            { label: "Careers", description: "Join us" },
          ],
        },
        {
          heading: "Resources",
          items: [
            { label: "Blog", description: "Latest thinking" },
            { label: "Press", description: "News and media" },
            { label: "Events", description: "Where we'll be" },
          ],
        },
        {
          heading: "Legal",
          accent: true,
          items: [
            { label: "Privacy policy" },
            { label: "Terms of service" },
            { label: "Security" },
          ],
        },
      ],
    },
  },
  {
    label: "Pricing",
    href: "#",
  },
];
