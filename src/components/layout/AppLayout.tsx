import React from 'react';

/** `landing` = sticky top nav, full-width content. `docs` = left sidebar (SDK / component library). */
export type AppShellVariant = 'landing' | 'docs';

export type AppLayoutProps = {
  variant: AppShellVariant;
  sidebar?: React.ReactNode;
  topNav?: React.ReactNode;
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
  docsMode?: boolean;
};

export function AppLayout({
  variant,
  sidebar,
  topNav,
  children,
  sidebarCollapsed = false,
  docsMode = false,
}: AppLayoutProps) {
  const layoutClass = [
    'layout-horizontal',
    variant === 'landing' ? 'layout-landing' : '',
    sidebarCollapsed ? 'sidebar-collapsed' : '',
    docsMode ? 'comp-library-layout' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const mainClass = [
    'main-content',
    docsMode ? 'comp-library-mode' : '',
    variant === 'landing' ? 'main-content--full' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={layoutClass}>
      {variant === 'docs' && sidebar}
      {variant === 'landing' && topNav}
      <div className={mainClass}>{children}</div>
    </div>
  );
}
