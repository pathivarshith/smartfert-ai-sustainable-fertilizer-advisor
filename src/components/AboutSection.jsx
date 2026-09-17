import React from 'react';
import { Target, Lightbulb, Cpu, Globe, Rocket, Award } from 'lucide-react';

export default function AboutSection() {
  return (
    <div style={{ margin: '4rem 0' }} id="about-section">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-info" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          Project Overview
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>About SmartFert AI</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '750px', margin: '0.5rem auto 0' }}>
          An AI-based decision-support prototype promoting sustainable agricultural practices aligned with United Nations Sustainable Development Goals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Problem */}
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '44px', height: '44px', background: '#fee2e2', color: '#991b1b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Target size={22} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>The Challenge</h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Modern farmers face a complex dilemma balancing immediate crop yield demands, volatile fertilizer market prices, and long-term soil health degradation. Sole reliance on synthetic nitrogen (Urea) causes soil acidification and chemical runoff, while transitioning entirely to organic materials creates labor, cost, and bulk transport bottlenecks.
          </p>
        </div>

        {/* Solution */}
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '44px', height: '44px', background: '#d1fae5', color: '#065f46', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Lightbulb size={22} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>The SmartFert Solution</h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            SmartFert provides a transparent, multi-criteria decision support workflow. Instead of declaring synthetic fertilizers bad or organic fertilizers perfect, SmartFert quantifies the agronomic, financial, and logistical trade-offs of Inorganic, Organic, and Integrated Nutrient Management (INM) strategies.
          </p>
        </div>

        {/* AI Architecture */}
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '44px', height: '44px', background: '#e0f2fe', color: '#0369a1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Cpu size={22} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>AI System Architecture</h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Built on a modular decision pipeline combining: (1) Agronomic soil-crop calculation engine, (2) Configurable multi-criteria weighted recommendation scorer, (3) Ground-truth RAG Knowledge Assistant referencing FAO/ICAR datasets, and (4) Explainable AI (XAI) rationale generator.
          </p>
        </div>
      </div>

      {/* UN SDGs Alignment */}
      <div style={{ background: '#f8faf6', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={24} style={{ color: 'var(--accent-amber)' }} /> UN Sustainable Development Goals Alignment
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '5px solid #d97706' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#b45309' }}>Primary: SDG 12</h4>
            <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Responsible Consumption and Production</strong>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Promotes efficient nutrient application, minimizing chemical runoff and waste through balanced organic-mineral integration.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '5px solid #16a34a' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#15803d' }}>Secondary: SDG 2</h4>
            <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Zero Hunger</strong>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Supports crop yield stability and food security by optimizing nutrient availability during critical growth phases.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '5px solid #0284c7' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0369a1' }}>Secondary: SDG 13</h4>
            <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Climate Action</strong>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Encourages soil organic carbon sequestration and reduces synthetic nitrous oxide emission risks.
            </p>
          </div>
        </div>
      </div>

      {/* Future Scope */}
      <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-900)' }}>
          <Rocket size={24} style={{ color: 'var(--primary-600)' }} /> Future Expansion Roadmap
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <strong>1. Expanded Crop Library:</strong> Inclusion of horticulture, fruits, spices, and pulses.
          </div>
          <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <strong>2. Local Soil GIS Integration:</strong> Direct API linking with government soil test registries.
          </div>
          <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <strong>3. Regional Dealer Price Feeds:</strong> Live regional fertilizer dealer pricing integration when official public APIs become available.
          </div>
          <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <strong>4. Regional Language Support:</strong> Audio and text support in Hindi, Telugu, Spanish, Swahili, etc.
          </div>
          <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <strong>5. Weather & Remote Sensing:</strong> Satellite soil moisture and precipitation forecast integration.
          </div>
          <div style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <strong>6. Extension WhatsApp Bot:</strong> Lightweight messaging interface for frontline agricultural workers.
          </div>
        </div>
      </div>
    </div>
  );
}
