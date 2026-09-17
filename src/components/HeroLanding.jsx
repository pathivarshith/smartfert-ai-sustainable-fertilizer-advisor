import React from 'react';
import { ArrowRight, Sparkles, Wheat, Coins, Leaf, Award, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function HeroLanding({ onStartAnalysis, onLoadDemo, onLearnMore }) {
  return (
    <section className="hero-section">
      <div className="container">
        {/* SDG 12 Badge */}
        <div className="hero-pill">
          <Award size={16} /> Aligned with UN Sustainable Development Goal 12
        </div>

        <h1 className="hero-title">
          Smarter fertilizer decisions for <span>productive and sustainable farming.</span>
        </h1>

        <p className="hero-subtitle">
          SmartFert is an AI-based decision-support prototype that helps farmers compare inorganic, organic, and integrated fertilizer strategies by balancing crop nutrition, cost intelligence, and long-term soil health.
        </p>

        {/* Primary and Secondary CTAs */}
        <div className="hero-ctas">
          <button className="btn-primary" onClick={onStartAnalysis}>
            Start Fertilizer Analysis <ArrowRight size={18} />
          </button>

          <button className="btn-secondary" onClick={onLoadDemo}>
            <Sparkles size={18} style={{ color: '#059669' }} /> Load Demo Scenario
          </button>
        </div>

        {/* Short SDG 12 Explanation */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '50px', padding: '0.6rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: '#166534', fontWeight: 600, marginBottom: '3rem' }}>
          <CheckCircle2 size={16} style={{ color: '#16a34a' }} />
          SmartFert supports more informed and responsible agricultural input decisions to avoid excessive chemical run-off and soil degradation.
        </div>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          <div className="feature-card feature-card-nutrition">
            <div className="feature-icon-wrapper">
              <Wheat size={28} />
            </div>
            <h3 className="feature-title">🌾 Crop Nutrition</h3>
            <p className="feature-desc">
              Understand fertilizer nutrient concentration (N-P-K), plant availability rates, and crop-specific baseline considerations for Rice, Wheat, Maize, and more.
            </p>
          </div>

          <div className="feature-card feature-card-cost">
            <div className="feature-icon-wrapper">
              <Coins size={28} />
            </div>
            <h3 className="feature-title">💰 Cost Intelligence</h3>
            <p className="feature-desc">
              Compare actual expenditure per acre, unit cost of nutrients, and practical volumetric transport requirements across mineral vs organic inputs.
            </p>
          </div>

          <div className="feature-card feature-card-sustainability">
            <div className="feature-icon-wrapper">
              <Leaf size={28} />
            </div>
            <h3 className="feature-title">🌱 Soil Sustainability</h3>
            <p className="feature-desc">
              Evaluate long-term soil organic carbon replenishment, cation exchange capacity, biological activity, and integrated nutrient management benefits.
            </p>
          </div>
        </div>

        {/* Prototype Safety Notice */}
        <div className="disclaimer-banner" style={{ marginTop: '3rem' }}>
          <ShieldAlert className="disclaimer-icon" size={22} />
          <div className="disclaimer-text">
            <strong>Educational Prototype Notice:</strong> SmartFert is designed to demonstrate decision-support logic. It does not replace field agronomists. Soil test laboratory results and local agricultural extension guidance should always be consulted prior to field application.
          </div>
        </div>
      </div>
    </section>
  );
}
