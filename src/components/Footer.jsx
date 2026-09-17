import React from 'react';
import { AlertTriangle, ShieldCheck, Globe, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Important Agronomic Disclaimer */}
        <div className="disclaimer-banner" style={{ background: 'rgba(254, 243, 199, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)', color: '#fef3c7', marginBottom: '2.5rem' }}>
          <AlertTriangle className="disclaimer-icon" style={{ color: '#fbbf24' }} size={22} />
          <div className="disclaimer-text" style={{ color: '#fef3c7' }}>
            <strong style={{ color: '#fbbf24' }}>Agronomic & Safety Disclaimer:</strong> SmartFert is an educational decision-support prototype designed to compare fertilizer strategies. It is not a replacement for professional agronomist consultation or laboratory soil testing. Fertilizer application decisions should always be validated against official regional guidelines, local extension advice, and field soil test reports.
          </div>
        </div>

        <div className="footer-container">
          <div>
            <div className="footer-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} style={{ color: '#34d399' }} /> SmartFert AI
            </div>
            <p style={{ fontSize: '0.88rem', color: '#9ca3af', lineHeight: 1.6 }}>
              AI-Based Sustainable Fertilizer Advisor for Crops. Supporting smarter input decisions by balancing crop nutrition, cost intelligence, and long-term soil health.
            </p>
          </div>

          <div>
            <div className="footer-title">UN Sustainable Development Goals</div>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', lineHeight: 2, color: '#d1d5db' }}>
              <li>🟡 <strong>Primary:</strong> SDG 12 – Responsible Consumption and Production</li>
              <li>🟢 <strong>Secondary:</strong> SDG 2 – Zero Hunger</li>
              <li>🔵 <strong>Secondary:</strong> SDG 13 – Climate Action</li>
            </ul>
          </div>

          <div>
            <div className="footer-title">Trusted Agronomic Sources</div>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.6 }}>
              Knowledge base grounded in peer-reviewed protocols from FAO, ICAR, USDA-NRCS, IRRI, and official agricultural university recommendations.
            </p>
          </div>
        </div>

        <div className="footer-disclaimer">
          © {new Date().getFullYear()} SMARTFERT. Decision-Support Prototype for Sustainable Agriculture.
        </div>
      </div>
    </footer>
  );
}
