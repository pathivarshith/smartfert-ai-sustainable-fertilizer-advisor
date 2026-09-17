import React from 'react';
import { Sparkles, ShieldCheck, HelpCircle, FileText, CheckCircle, Info } from 'lucide-react';

export default function AIRecommendation({ recommendation, analysisResult }) {
  const { 
    recommendedStrat, 
    confidenceLevel, 
    confidenceReason, 
    whyPoints, 
    whyNotOnlyUrea, 
    whyNotOnlyCompost, 
    whyIntegrated, 
    assumptions, 
    safetyNote 
  } = recommendation;

  return (
    <div className="xai-card" id="ai-recommendation-section">
      <div className="xai-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            <Sparkles size={18} /> Explainable AI Rationale
          </div>
          <h2 className="xai-title">🌱 SmartFert Recommendation</h2>
        </div>

        <div className="confidence-chip">
          Confidence Level: <strong>{confidenceLevel}</strong>
        </div>
      </div>

      <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.15)' }}>
        <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
          RECOMMENDED APPROACH:
        </div>
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', margin: '0.25rem 0' }}>
          {recommendedStrat.title}
        </div>
        <div style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>
          {recommendedStrat.subtitle}
        </div>
      </div>

      {/* WHY Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={20} style={{ color: '#34d399' }} /> WHY WAS THIS STRATEGY RECOMMENDED?
        </h3>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {whyPoints.map((point, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.85rem 1.1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #34d399', fontSize: '0.93rem', color: '#e2e8f0' }}>
              {point}
            </div>
          ))}
        </div>
      </div>

      {/* 3 Core Scientific Questions */}
      <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="xai-q-box">
          <div className="xai-q-title">
            <HelpCircle size={18} /> Why not only urea?
          </div>
          <div className="xai-q-answer">
            {whyNotOnlyUrea}
          </div>
        </div>

        <div className="xai-q-box">
          <div className="xai-q-title">
            <HelpCircle size={18} /> Why not only compost?
          </div>
          <div className="xai-q-answer">
            {whyNotOnlyCompost}
          </div>
        </div>

        <div className="xai-q-box">
          <div className="xai-q-title">
            <HelpCircle size={18} /> Why integrated nutrient management?
          </div>
          <div className="xai-q-answer">
            {whyIntegrated}
          </div>
        </div>
      </div>

      {/* Data Confidence & Assumptions */}
      <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
          <Info size={20} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: '#fbbf24', fontSize: '0.95rem' }}>Data Confidence Assessment:</strong>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '2px' }}>{confidenceReason}</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: '1rem' }}>
          <strong style={{ color: '#93c5fd', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <FileText size={16} /> Key Model Assumptions:
          </strong>
          <ul style={{ paddingLeft: '1.2rem', color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
            {assumptions.map((asm, idx) => (
              <li key={idx}>{asm}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Safety Note */}
      <div style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: '#fef08a', background: 'rgba(234, 179, 8, 0.12)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(234, 179, 8, 0.3)' }}>
        🛡️ <strong>Safety Note:</strong> {safetyNote}
      </div>
    </div>
  );
}
