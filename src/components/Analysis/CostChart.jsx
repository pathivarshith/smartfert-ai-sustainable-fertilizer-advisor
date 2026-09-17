import React from 'react';
import { IndianRupee, Scale, Info } from 'lucide-react';

export default function CostChart({ analysisResult }) {
  const { strategies, farmArea, areaUnit } = analysisResult;

  const costData = [
    { label: 'Inorganic-Focused', cost: Math.round(strategies.inorganic.totalCost), mass: Math.round(strategies.inorganic.totalMassKg), color: '#0284c7' },
    { label: 'Organic-Focused', cost: Math.round(strategies.organic.totalCost), mass: Math.round(strategies.organic.totalMassKg), color: '#d97706' },
    { label: 'Integrated (INM)', cost: Math.round(strategies.integrated.totalCost), mass: Math.round(strategies.integrated.totalMassKg), color: '#059669' }
  ];

  const maxCost = Math.max(...costData.map(d => d.cost), 1);
  const maxMass = Math.max(...costData.map(d => d.mass), 1);

  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)', margin: '2.5rem 0' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <IndianRupee size={22} style={{ color: '#059669' }} /> Cost & Bulkiness Comparison Chart
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Comparative expenditure and handling tonnage for {farmArea} {areaUnit}.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Expenditure Chart */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-800)' }}>
            Estimated Fertilizer Expenditure (₹)
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {costData.map((item, idx) => {
              const widthPct = Math.max(12, (item.cost / maxCost) * 100);
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <span>{item.label}</span>
                    <span style={{ color: '#059669' }}>₹{item.cost.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ height: '24px', background: 'var(--bg-subtle)', borderRadius: '6px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${widthPct}%`, 
                        background: item.color, 
                        borderRadius: '6px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-end', 
                        paddingRight: '8px', 
                        color: '#ffffff', 
                        fontSize: '0.75rem', 
                        fontWeight: 700 
                      }}
                    >
                      ₹{item.cost.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tonnage / Bulkiness Chart */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-800)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Scale size={18} /> Required Input Mass (kg)
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {costData.map((item, idx) => {
              const widthPct = Math.max(10, (item.mass / maxMass) * 100);
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <span>{item.label}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{item.mass.toLocaleString('en-IN')} kg (~{(Math.round(item.mass / 1000 * 10) / 10)} tons)</span>
                  </div>
                  <div style={{ height: '24px', background: 'var(--bg-subtle)', borderRadius: '6px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${widthPct}%`, 
                        background: '#64748b', 
                        borderRadius: '6px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-end', 
                        paddingRight: '8px', 
                        color: '#ffffff', 
                        fontSize: '0.75rem', 
                        fontWeight: 700 
                      }}
                    >
                      {item.mass.toLocaleString('en-IN')} kg
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.75rem', background: '#f8faf6', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <Info size={16} style={{ color: 'var(--primary-600)', verticalAlign: 'middle', marginRight: '6px' }} />
        <strong>Assumptions & Market Prices:</strong> Costs are calculated using statutory MRP and NBS subsidized prices published by the Department of Fertilizers, Ministry of Chemicals & Fertilizers, Govt. of India (Urea ₹266.50/45 kg, DAP ₹1,350/50 kg, MOP ₹1,650/50 kg) or user local dealer overrides.
      </div>
    </div>
  );
}
