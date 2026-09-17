import React from 'react';
import { CheckCircle2, AlertTriangle, Scale, Zap, Leaf } from 'lucide-react';

export default function ComparisonCards({ analysisResult, recommendation }) {
  const { strategies } = analysisResult;
  const { recommendedKey } = recommendation;

  return (
    <div style={{ margin: '3rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-info" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          Decision Support Comparison
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Three Fertilizer Strategy Options</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '700px', margin: '0.5rem auto 0' }}>
          Evaluate the scientific trade-offs between pure synthetic, pure organic, and integrated nutrient management.
        </p>
      </div>

      <div className="strategies-grid">
        {/* OPTION 1: INORGANIC FOCUSED */}
        <div className={`strategy-card ${recommendedKey === 'inorganic' ? 'recommended' : ''}`}>
          {recommendedKey === 'inorganic' && <div className="rec-badge">🌱 AI Recommended Option</div>}
          
          <div>
            <div className="strat-header">
              <span className="strat-icon">⚡</span>
              <div>
                <h3 className="strat-title">1. Inorganic-Focused</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Mineral Synthetic Sources</span>
              </div>
            </div>

            <ul className="strat-metrics-list">
              <li className="strat-metric-item">
                <span className="strat-metric-label">Nutrient Density:</span>
                <span className="strat-metric-value">High (46% N in Urea)</span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Total Product Mass:</span>
                <span className="strat-metric-value">~{Math.round(strategies.inorganic.totalMassKg).toLocaleString('en-IN')} kg</span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Estimated Expenditure:</span>
                <span className="strat-metric-value" style={{ color: '#059669', fontSize: '1.1rem', fontWeight: 800 }}>
                  ₹{Math.round(strategies.inorganic.totalCost).toLocaleString('en-IN')}
                </span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Release Speed:</span>
                <span className="strat-metric-value">Fast (Immediate ionic dissolution)</span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Est. Organic Matter Contained:</span>
                <span className="strat-metric-value" style={{ color: '#dc2626' }}>0 kg</span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Practical Bulkiness:</span>
                <span className="strat-metric-value">Low (Minimal transport)</span>
              </li>
            </ul>

            {/* Input Breakdown */}
            <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.82rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.3rem', color: 'var(--primary-800)' }}>Required Inputs:</strong>
              {strategies.inorganic.breakdown.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span>{item.name} (~{item.bags} bags / {item.amountKg} kg)</span>
                  <strong style={{ color: 'var(--primary-900)' }}>₹{item.cost.toLocaleString('en-IN')}</strong>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#166534', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} /> Key Advantages:
              </h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {strategies.inorganic.advantages.map((adv, idx) => (
                  <li key={idx}>{adv}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={16} /> Key Considerations:
              </h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {strategies.inorganic.considerations.map((con, idx) => (
                  <li key={idx}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* OPTION 2: ORGANIC FOCUSED */}
        <div className={`strategy-card ${recommendedKey === 'organic' ? 'recommended' : ''}`}>
          {recommendedKey === 'organic' && <div className="rec-badge">🌱 AI Recommended Option</div>}
          
          <div>
            <div className="strat-header">
              <span className="strat-icon">🌱</span>
              <div>
                <h3 className="strat-title">2. Organic-Focused</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Bulk Compost & FYM</span>
              </div>
            </div>

            <ul className="strat-metrics-list">
              <li className="strat-metric-item">
                <span className="strat-metric-label">Nutrient Density:</span>
                <span className="strat-metric-value" style={{ color: '#d97706' }}>Low & Variable (~1.5% N)</span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Total Product Mass:</span>
                <span className="strat-metric-value" style={{ color: '#d97706' }}>
                  ~{Math.round(strategies.organic.totalMassKg).toLocaleString('en-IN')} kg (~{(Math.round(strategies.organic.totalMassKg / 1000 * 10) / 10)} tons)
                </span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Estimated Expenditure:</span>
                <span className="strat-metric-value" style={{ color: '#059669', fontSize: '1.1rem', fontWeight: 800 }}>
                  ₹{Math.round(strategies.organic.totalCost).toLocaleString('en-IN')}
                </span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Release Speed:</span>
                <span className="strat-metric-value">Slow (Microbial mineralization)</span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Est. Organic Matter Contained:</span>
                <span className="strat-metric-value" style={{ color: '#059669', fontWeight: 800 }}>
                  ~{Math.round(strategies.organic.somAddedKg).toLocaleString('en-IN')} kg
                </span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Practical Bulkiness:</span>
                <span className="strat-metric-value" style={{ color: '#dc2626' }}>Very High Tonnage</span>
              </li>
            </ul>

            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontStyle: 'italic', lineHeight: 1.4 }}>
              Note: This represents organic matter contained within the applied material. Actual long-term soil organic matter accumulation depends on decomposition, soil conditions, climate, and management.
            </div>

            {/* Input Breakdown */}
            <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem', fontSize: '0.82rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.3rem', color: 'var(--primary-800)' }}>Required Inputs:</strong>
              {strategies.organic.breakdown.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span>{item.name} (~{item.bags} bags / {item.amountKg} kg)</span>
                  <strong style={{ color: 'var(--primary-900)' }}>₹{item.cost.toLocaleString('en-IN')}</strong>
                </div>
              ))}
            </div>

            {/* Demonstration Note */}
            <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.78rem', color: '#713f12', lineHeight: 1.4 }}>
              ℹ️ <strong>Demonstration calculation:</strong> Organic quantities are calculated using an assumed first-year available-N fraction to illustrate nutrient-density and bulk-material trade-offs. They are not agronomic field prescriptions.
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#166534', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} /> Key Advantages:
              </h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {strategies.organic.advantages.map((adv, idx) => (
                  <li key={idx}>{adv}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={16} /> Key Considerations:
              </h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {strategies.organic.considerations.map((con, idx) => (
                  <li key={idx}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* OPTION 3: INTEGRATED NUTRIENT MANAGEMENT */}
        <div className={`strategy-card ${recommendedKey === 'integrated' ? 'recommended' : ''}`}>
          {recommendedKey === 'integrated' && <div className="rec-badge">🌱 AI Recommended Option</div>}
          
          <div>
            <div className="strat-header">
              <span className="strat-icon">⚖️</span>
              <div>
                <h3 className="strat-title">3. Integrated (INM)</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Balanced Mineral + Organic</span>
              </div>
            </div>

            <ul className="strat-metrics-list">
              <li className="strat-metric-item">
                <span className="strat-metric-label">Nutrient Density:</span>
                <span className="strat-metric-value" style={{ color: '#059669', fontWeight: 700 }}>Integrated Strategy (Combined Organic & Mineral Inputs)</span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Total Product Mass:</span>
                <span className="strat-metric-value">~{Math.round(strategies.integrated.totalMassKg).toLocaleString('en-IN')} kg</span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Estimated Expenditure:</span>
                <span className="strat-metric-value" style={{ color: '#059669', fontSize: '1.1rem', fontWeight: 800 }}>
                  ₹{Math.round(strategies.integrated.totalCost).toLocaleString('en-IN')}
                </span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Release Speed:</span>
                <span className="strat-metric-value">Sustained + Immediate top-dress</span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Est. Organic Matter Contained:</span>
                <span className="strat-metric-value" style={{ color: '#059669', fontWeight: 800 }}>
                  ~{Math.round(strategies.integrated.somAddedKg).toLocaleString('en-IN')} kg
                </span>
              </li>
              <li className="strat-metric-item">
                <span className="strat-metric-label">Practical Bulkiness:</span>
                <span className="strat-metric-value">Moderate (Basal organic + mineral split)</span>
              </li>
            </ul>

            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontStyle: 'italic', lineHeight: 1.4 }}>
              Note: This represents organic matter contained within the applied material. Actual long-term soil organic matter accumulation depends on decomposition, soil conditions, climate, and management.
            </div>

            {/* Input Breakdown */}
            <div style={{ background: 'var(--bg-subtle)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem', fontSize: '0.82rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.3rem', color: 'var(--primary-800)' }}>Required Inputs:</strong>
              {strategies.integrated.breakdown.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span>{item.name} (~{item.bags} bags / {item.amountKg} kg)</span>
                  <strong style={{ color: 'var(--primary-900)' }}>₹{item.cost.toLocaleString('en-IN')}</strong>
                </div>
              ))}
            </div>

            {/* Demonstration Note */}
            <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.78rem', color: '#713f12', lineHeight: 1.4 }}>
              ℹ️ <strong>Demonstration calculation:</strong> Organic quantities are calculated using an assumed first-year available-N fraction to illustrate nutrient-density and bulk-material trade-offs. They are not agronomic field prescriptions.
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#166534', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} /> Key Advantages:
              </h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {strategies.integrated.advantages.map((adv, idx) => (
                  <li key={idx}>{adv}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertTriangle size={16} /> Key Considerations:
              </h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {strategies.integrated.considerations.map((con, idx) => (
                  <li key={idx}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
