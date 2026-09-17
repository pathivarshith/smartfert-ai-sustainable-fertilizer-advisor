import React from 'react';
import { Sprout, PlayCircle, Award } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onLoadDemo }) {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <a href="#home" onClick={() => setActiveTab('home')} className="brand-logo">
          <div className="brand-icon">
            <Sprout style={{ color: '#ffffff' }} size={24} />
          </div>
          <div>
            <div className="brand-title">SMARTFERT</div>
            <div className="brand-tagline">AI Sustainable Fertilizer Advisor</div>
          </div>
        </a>

        <ul className="nav-links">
          <li>
            <a 
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} 
              onClick={() => setActiveTab('home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${activeTab === 'simulator' ? 'active' : ''}`} 
              onClick={() => setActiveTab('simulator')}
            >
              Simulator
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${activeTab === 'assistant' ? 'active' : ''}`} 
              onClick={() => setActiveTab('assistant')}
            >
              Ask SmartFert AI
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${activeTab === 'responsible' ? 'active' : ''}`} 
              onClick={() => setActiveTab('responsible')}
            >
              Responsible AI
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${activeTab === 'about' ? 'active' : ''}`} 
              onClick={() => setActiveTab('about')}
            >
              About
            </a>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <span className="sdg-badge sdg-badge-sdg12" title="UN Sustainable Development Goal 12: Responsible Consumption and Production">
            <Award size={14} /> SDG 12 Aligned
          </span>

          <button className="btn-demo-nav" onClick={onLoadDemo} title="Populate demo data and analyze immediately">
            <PlayCircle size={16} /> Load Demo Scenario
          </button>
        </div>
      </div>
    </header>
  );
}
