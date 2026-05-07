import React, { useState } from 'react';
import { 
  Home, 
  Briefcase, 
  FileText, 
  Tag, 
  Code, 
  Layout, 
  Cpu, 
  Sun, 
  Moon, 
  LogIn, 
  UserPlus, 
  ChevronLeft, 
  ChevronRight,
  Menu
} from 'lucide-react';
import Hero from './components/Hero';
import Problem from './components/Problem';
import OperationalLayer from './components/OperationalLayer';
import CaseStudy from './components/CaseStudy';
import Flow from './components/Flow';
import CTA from './components/CTA';
import { ShaderBackground } from './components/ShaderBackground';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', !isDark ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`page-wrapper ${isDark ? 'dark-mode' : ''} dd-page`}>
      <ShaderBackground isDark={isDark} />
      <div className={`layout-horizontal ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-brand">
            <img
              src={isDark ? "/Logo-white.png" : "/logo2.png"}
              alt="Agentive OS Logo"
              className="sidebar-logo"
            />
            <div className="brand-text">
              <div className="brand-main">
                Agentive <span style={{ color: 'var(--brand-secondary-500)' }}>OS</span>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {/* Main Group */}
            <a href="#" className="nav-item active">
              <div className="nav-icon">
                <Home size={20} strokeWidth={2} />
              </div>
              <span>Home</span>
            </a>
            <a href="#" className="nav-item">
              <div className="nav-icon">
                <Briefcase size={20} strokeWidth={2} />
              </div>
              <span>Products & Services</span>
            </a>
            <a href="#" className="nav-item">
              <div className="nav-icon">
                <FileText size={20} strokeWidth={2} />
              </div>
              <span>Case Studies</span>
            </a>
            <a href="#" className="nav-item">
              <div className="nav-icon">
                <Tag size={20} strokeWidth={2} />
              </div>
              <span>Pricing</span>
            </a>

            {/* Builders Group */}
            {!isCollapsed && (
              <div className="nav-group-label" style={{ marginTop: '1.5rem', marginBottom: '0.5rem', paddingLeft: '0.75rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--neutral-700)' }}>
                For Builders
              </div>
            )}
            {isCollapsed && <div style={{ height: '1.5rem' }}></div>}
            
            <a href="#" className="nav-item">
              <div className="nav-icon">
                <Code size={20} strokeWidth={2} />
              </div>
              <span>Agentive SDK</span>
            </a>
            <a href="#" className="nav-item">
              <div className="nav-icon">
                <Layout size={20} strokeWidth={2} />
              </div>
              <span>Component Library</span>
            </a>
            <a href="#" className="nav-item">
              <div className="nav-icon">
                <Cpu size={20} strokeWidth={2} />
              </div>
              <span>MCP</span>
            </a>
          </nav>

          <div className="sidebar-footer">
            <a href="#" className="btn btn-purple" style={{
              margin: '0.5rem 0.75rem', 
              padding: isCollapsed ? '0.75rem' : '0.75rem 1.5rem',
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: '0.5rem',
              borderRadius: 'var(--radius-button)'
            }}>
              <LogIn size={18} strokeWidth={2} />
              {!isCollapsed && <span>Log in</span>}
            </a>
            
            <a href="#" className="btn" style={{ 
              margin: '0.5rem 0.75rem', 
              padding: isCollapsed ? '0.75rem' : '0.75rem 1.5rem',
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid var(--color-border-primary)',
              background: 'transparent',
              color: 'var(--color-text-heading)',
              borderRadius: 'var(--radius-button)'
            }}>
              <UserPlus size={18} strokeWidth={2} />
              {!isCollapsed && <span>Sign up</span>}
            </a>

            <button onClick={toggleSidebar} className="collapse-toggle" title="Toggle Sidebar">
              <div className="nav-icon">
                {isCollapsed ? <ChevronRight size={20} strokeWidth={2} /> : <ChevronLeft size={20} strokeWidth={2} />}
              </div>
              <span>Collapse</span>
            </button>
          </div>
        </aside>

        <button onClick={toggleTheme} className="theme-toggle-fixed" title="Toggle Theme">
          {isDark ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
        </button>

        <div className="main-content">
          <main className="page-main">
            <Hero />
            <Problem />
            <OperationalLayer />
            <CaseStudy />
            <Flow />
            <CTA />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
