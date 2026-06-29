import React, { useEffect, useState } from 'react';
import {
  Code,
  Layout,
  Cpu,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import ComponentLibrary, { GROUPS, COMPONENTS } from './components/ComponentLibrary';
import AgentiveSDK, { SDK_GROUPS } from './components/AgentiveSDK';
import Footer from './components/Footer';
import { ShaderBackground } from './components/ShaderBackground';
import { AppLayout } from './components/layout/AppLayout';
import { LandingTopNav } from './components/navigation/LandingTopNav';
import { LANDING_NAV_ITEMS_V1, LANDING_NAV_ITEMS_V2 } from './components/navigation/landingNavItems';
import { LandingV1 } from './pages/LandingV1';
import { LandingV2 } from './pages/LandingV2';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isBuildersOpen, setIsBuildersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'components' | 'sdk'>('home');
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [compActiveId, setCompActiveId] = useState('overview');
  const [compQuery, setCompQuery] = useState('');
  const [sdkActiveId, setSdkActiveId] = useState('overview');
  const [sdkQuery, setSdkQuery] = useState('');

  const isLanding = currentPage === 'home';
  const isDocsMode = currentPage === 'components' || currentPage === 'sdk';
  const shellVariant = isLanding ? 'landing' : 'docs';
  const landingVersion = pathname === '/v1' ? 'v1' : 'v2';
  const landingNavItems = landingVersion === 'v2' ? LANDING_NAV_ITEMS_V2 : LANDING_NAV_ITEMS_V1;

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', !isDark ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const scrollToSection = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const buildersLinks = (
    <>
      <button
        onClick={() => setCurrentPage('sdk')}
        className={`nav-item${currentPage === 'sdk' ? ' active' : ''}`}
        style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
      >
        <div className="nav-icon">
          <Code size={20} strokeWidth={2} />
        </div>
        <span>Agentive SDK</span>
      </button>
      <button
        onClick={() => setCurrentPage('components')}
        className={`nav-item${currentPage === 'components' ? ' active' : ''}`}
        style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
      >
        <div className="nav-icon">
          <Layout size={20} strokeWidth={2} />
        </div>
        <span>Component Library</span>
      </button>
    </>
  );

  const docsSidebar = (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <img
          src={isDark ? '/Logo-white.png' : '/logo2.png'}
          alt="Agentive OS Logo"
          className="sidebar-logo"
        />
        <div className="brand-text">
          <div className="brand-main">
            Agentive <span style={{ color: 'var(--brand-secondary-500)' }}>OS</span>
          </div>
        </div>
      </div>

      {currentPage === 'components' ? (
        <nav
          className="sidebar-nav"
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden' }}
        >
          <button
            onClick={() => setCurrentPage('home')}
            className="nav-item"
            style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', marginBottom: '0.25rem' }}
          >
            <div className="nav-icon">
              <ChevronLeft size={18} strokeWidth={2} />
            </div>
            <span style={{ fontWeight: 600 }}>Back</span>
          </button>
          <button
            onClick={() => setCompActiveId('overview')}
            className={compActiveId === 'overview' ? 'nav-item active' : 'nav-item'}
            style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', marginBottom: '0.25rem' }}
          >
            <div className="nav-icon">
              <Layout size={18} strokeWidth={2} />
            </div>
            <span>Overview</span>
          </button>
          {!isCollapsed && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--neutral-50)',
                border: '1px solid var(--color-border-primary)',
                borderRadius: '10px',
                padding: '6px 10px',
                marginBottom: '0.5rem',
              }}
            >
              <Search size={12} color="var(--neutral-400)" style={{ flexShrink: 0 }} />
              <input
                placeholder="Search components"
                value={compQuery}
                onChange={(e) => setCompQuery(e.target.value)}
                style={{
                  border: 0,
                  background: 'transparent',
                  outline: 'none',
                  flex: 1,
                  color: 'var(--neutral-900)',
                  fontFamily: 'inherit',
                  fontSize: '12px',
                }}
              />
            </div>
          )}
          {!isCollapsed && (
            <div style={{ overflowY: 'auto', flex: 1, paddingBottom: '8px', scrollbarWidth: 'thin' }}>
              {GROUPS.map((g) => ({
                ...g,
                ids: g.ids.filter(
                  (id) => !compQuery || id.toLowerCase().includes(compQuery.toLowerCase())
                ),
              }))
                .filter((g) => g.ids.length > 0)
                .map((group) => (
                  <div key={group.id} style={{ marginTop: '8px' }}>
                    <div
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '9px',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--neutral-400)',
                        padding: '3px 0.75rem',
                      }}
                    >
                      {group.label}
                    </div>
                    {group.ids.map((id) => (
                      <button
                        key={id}
                        onClick={() => setCompActiveId(id)}
                        className={compActiveId === id ? 'nav-item active' : 'nav-item'}
                        style={{
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          width: '100%',
                          textAlign: 'left',
                          paddingLeft: 'calc(1rem + 24px + 1rem)',
                        }}
                      >
                        <span
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {id}
                        </span>
                      </button>
                    ))}
                  </div>
                ))}
            </div>
          )}
          {!isCollapsed && (
            <div
              style={{
                borderTop: '1px solid var(--color-border-primary)',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'monospace',
                fontSize: '10px',
                color: 'var(--neutral-400)',
                padding: '8px 0.75rem 0',
              }}
            >
              <span>● {Object.keys(COMPONENTS).length} components</span>
              <span>v1.0</span>
            </div>
          )}
        </nav>
      ) : (
        <nav
          className="sidebar-nav"
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden' }}
        >
          <button
            onClick={() => setCurrentPage('home')}
            className="nav-item"
            style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', marginBottom: '0.25rem' }}
          >
            <div className="nav-icon">
              <ChevronLeft size={18} strokeWidth={2} />
            </div>
            <span style={{ fontWeight: 600 }}>Back</span>
          </button>
          <button
            onClick={() => setSdkActiveId('overview')}
            className={sdkActiveId === 'overview' ? 'nav-item active' : 'nav-item'}
            style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', marginBottom: '0.25rem' }}
          >
            <div className="nav-icon">
              <Code size={18} strokeWidth={2} />
            </div>
            <span>Overview</span>
          </button>
          {!isCollapsed && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--neutral-50)',
                border: '1px solid var(--color-border-primary)',
                borderRadius: '10px',
                padding: '6px 10px',
                marginBottom: '0.5rem',
              }}
            >
              <Search size={12} color="var(--neutral-400)" style={{ flexShrink: 0 }} />
              <input
                placeholder="Search SDK docs"
                value={sdkQuery}
                onChange={(e) => setSdkQuery(e.target.value)}
                style={{
                  border: 0,
                  background: 'transparent',
                  outline: 'none',
                  flex: 1,
                  color: 'var(--neutral-900)',
                  fontFamily: 'inherit',
                  fontSize: '12px',
                }}
              />
            </div>
          )}
          {!isCollapsed && (
            <div style={{ overflowY: 'auto', flex: 1, paddingBottom: '8px', scrollbarWidth: 'thin' }}>
              {SDK_GROUPS.map((g) => ({
                ...g,
                ids: g.ids.filter(
                  (id) => !sdkQuery || id.toLowerCase().includes(sdkQuery.toLowerCase())
                ),
              }))
                .filter((g) => g.ids.length > 0)
                .map((group) => (
                  <div key={group.id} style={{ marginTop: '8px' }}>
                    <div
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '9px',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--neutral-400)',
                        padding: '3px 0.75rem',
                      }}
                    >
                      {group.label}
                    </div>
                    {group.ids.map((id) => (
                      <button
                        key={id}
                        onClick={() => setSdkActiveId(id)}
                        className={sdkActiveId === id ? 'nav-item active' : 'nav-item'}
                        style={{
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          width: '100%',
                          textAlign: 'left',
                          paddingLeft: 'calc(1rem + 24px + 1rem)',
                        }}
                      >
                        <span
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {id}
                        </span>
                      </button>
                    ))}
                  </div>
                ))}
            </div>
          )}
          {!isCollapsed && (
            <div
              style={{
                borderTop: '1px solid var(--color-border-primary)',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'monospace',
                fontSize: '10px',
                color: 'var(--neutral-400)',
                padding: '8px 0.75rem 0',
              }}
            >
              <span>● SDK v1.0.0</span>
              <span>LangGraph</span>
            </div>
          )}
        </nav>
      )}

      <div className="sidebar-footer">
        <button onClick={toggleSidebar} className="collapse-toggle" title="Toggle Sidebar">
          <div className="nav-icon">
            {isCollapsed ? <ChevronRight size={20} strokeWidth={2} /> : <ChevronLeft size={20} strokeWidth={2} />}
          </div>
          <span>Collapse</span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className={`page-wrapper ${isDark ? 'dark-mode' : ''} dd-page`}>
      <ShaderBackground />

      <AppLayout
        variant={shellVariant}
        sidebar={docsSidebar}
        topNav={
          <LandingTopNav
            isDark={isDark}
            onToggleTheme={toggleTheme}
            currentPage={currentPage}
            onNavigateHome={() => setCurrentPage('home')}
            onNavigateSdk={() => setCurrentPage('sdk')}
            onNavigateComponents={() => setCurrentPage('components')}
            onScrollTo={scrollToSection}
            navItems={landingNavItems}
          />
        }
        sidebarCollapsed={isCollapsed}
        docsMode={isDocsMode}
      >
        {isLanding && (
          <div className="mobile-builders-menu">
            {isBuildersOpen && (
              <div className="mobile-builders-dropdown">
                <div
                  className="nav-group-label"
                  style={{
                    padding: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--neutral-700)',
                  }}
                >
                  For Builders
                </div>
                {buildersLinks}
              </div>
            )}
            <button
              onClick={() => setIsBuildersOpen(!isBuildersOpen)}
              className="builders-toggle-fixed"
              title="Builders Menu"
            >
              <Cpu size={20} strokeWidth={2} />
            </button>
          </div>
        )}

        {!isLanding && (
          <button onClick={toggleTheme} className="theme-toggle-fixed" title="Toggle Theme">
            {isDark ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
          </button>
        )}

        {currentPage === 'components' ? (
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <div className="page-main comp-library-scroll" style={{ flex: 1, minHeight: 0 }}>
              <ComponentLibrary activeId={compActiveId} />
            </div>
            <Footer compact />
          </div>
        ) : currentPage === 'sdk' ? (
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
            <AgentiveSDK activeId={sdkActiveId} />
            <Footer compact />
          </div>
        ) : (
          landingVersion === 'v2' ? <LandingV2 /> : <LandingV1 />
        )}
      </AppLayout>

      {isLanding && <Footer />}
    </div>
  );
}

export default App;
