import React from 'react';
import { BarChart3, Info } from 'lucide-react';

export default function VisualScorecard({ recommendation }) {
  const { recommendedScores, recommendedStrat } = recommendation;

  const metrics = [
    { label: 'Cost Efficiency', score: recommendedScores.costScore, max: 10, desc: 'Relative financial expenditure per acre' },
    { label: 'Nutrient Concentration', score: recommendedScores.efficiencyScore, max: 10, desc: 'Immediate plant-available NPK density' },
    { label: 'Practicality & Logistics', score: recommendedScores.practicalityScore, max: 10, desc: 'Ease of transport, handling, and application labor' },
    { label: 'Sustainability Considerations', score: recommendedScores.sustainabilityScore, max: 10, desc: 'Soil organic carbon buildup & environmental protection' },
    { label: 'Overall Fit', score: recommendedScores.overallFit, max: 10, desc: 'Weighted synthesis based on selected priorities' }
  ];

  return (
    <div className="scorecard-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={22} style={{ color: 'var(--primary-600)' }} /> Visual Decision Scorecard
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Comparative evaluation breakdown for: <strong>{recommendedStrat.title}</strong>
          </p>
        </div>

        <span className="badge badge-success" style={{ fontSize: '0.9rem', padding: '0.4rem 0.9rem' }}>
          Overall Fit: {recommendedScores.overallFit} / 10
        </span>
      </div>

      <div>
        {metrics.map((m, idx) => {
          const pct = (m.score / m.max) * 100;
          return (
            <div key={idx} className="score-row">
              <div className="score-meta">
                <span>{m.label}</span>
                <span style={{ color: 'var(--primary-800)' }}>{m.score} / {m.max}</span>
              </div>
              
              <div className="score-track">
                <div className="score-fill" style={{ width: `${pct}%` }}></div>
              </div>
              
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {m.desc}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <Info size={16} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
        <span>
          <strong>Prototype Indicator Disclaimer:</strong> These scores are comparative decision-support indicators based on configured algorithm weights, NOT direct laboratory measurement values.
        </span>
      </div>
    </div>
  );
}
