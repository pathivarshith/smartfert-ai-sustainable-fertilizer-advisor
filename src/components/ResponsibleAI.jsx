import React from 'react';
import { Eye, Scale, Lock, ShieldAlert, HeartHandshake, Award } from 'lucide-react';

export default function ResponsibleAI() {
  return (
    <div style={{ margin: '4rem 0' }} id="responsible-ai-section">
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-info" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          Responsible AI Framework
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Ethical & Responsible AI Pillars</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '720px', margin: '0.5rem auto 0' }}>
          SmartFert adheres to responsible AI principles for sustainable agricultural decision-support systems.
        </p>
      </div>

      <div className="responsible-grid">
        {/* CARD 1: TRANSPARENCY */}
        <div className="rai-card">
          <div style={{ width: '48px', height: '48px', background: '#e0f2fe', color: '#0284c7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'center', marginBottom: '1rem' }}>
            <Eye size={24} />
          </div>
          <h3 className="rai-title">TRANSPARENCY</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Every strategy recommendation comes with a fully transparent Explainable AI (XAI) rationale detailing decision weights, scoring parameters, baseline calculations, and explicit assumptions. SmartFert does not treat reference prices as universal market prices. It distinguishes government-notified prices, illustrative values, and user-entered local prices to reduce misleading comparisons.
          </p>
        </div>

        {/* CARD 2: FAIRNESS */}
        <div className="rai-card">
          <div style={{ width: '48px', height: '48px', background: '#fef3c7', color: '#d97706', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Scale size={24} />
          </div>
          <h3 className="rai-title">FAIRNESS</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Avoids assuming every farmer has uniform access to synthetic fertilizers, capital, irrigation, or organic waste. Accommodates custom local pricing and customizable farmer priority weightings.
          </p>
        </div>

        {/* CARD 3: PRIVACY */}
        <div className="rai-card">
          <div style={{ width: '48px', height: '48px', background: '#f3e8ff', color: '#9333ea', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Lock size={24} />
          </div>
          <h3 className="rai-title">PRIVACY</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Operates with zero mandatory registration or personally identifiable information (PII). All farm parameters and local price entries remain private and client-evaluated.
          </p>
        </div>

        {/* CARD 4: SAFETY */}
        <div className="rai-card">
          <div style={{ width: '48px', height: '48px', background: '#fee2e2', color: '#dc2626', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <ShieldAlert size={24} />
          </div>
          <h3 className="rai-title">SAFETY</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Does not present model outputs as universally valid agronomic prescriptions. Clearly mandates laboratory soil test validation and extension worker consultation prior to field application.
          </p>
        </div>
      </div>

      {/* Human-in-the-loop banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary-800), var(--primary-700))', color: '#ffffff', padding: '2rem', borderRadius: 'var(--radius-xl)', textAlign: 'center', marginTop: '2rem', boxShadow: 'var(--shadow-md)' }}>
        <HeartHandshake size={32} style={{ color: '#34d399', marginBottom: '0.5rem' }} />
        <h3 style={{ fontSize: '1.4rem', color: '#ffffff', fontWeight: 800, marginBottom: '0.5rem' }}>
          Human-Centered Decision Support
        </h3>
        <p style={{ fontSize: '1.05rem', color: '#a7f3d0', maxWidth: '750px', margin: '0 auto' }}>
          “SmartFert is designed to support—not replace—farmers, soil testing and agricultural experts.”
        </p>
      </div>
    </div>
  );
}
