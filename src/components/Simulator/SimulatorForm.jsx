import React, { useState } from 'react';
import { CROPS_DATA } from '../../data/crops.js';
import { FERTILIZERS_DATA } from '../../data/fertilizers.js';
import { getEffectiveFertilizerPrice } from '../../services/fertilizerPriceService.js';
import { Sparkles, AlertCircle, HelpCircle, Check, Play, Info, ExternalLink, RefreshCw, ShieldCheck, Tag } from 'lucide-react';

export default function SimulatorForm({ 
  onSubmitAnalysis, 
  onLoadDemo, 
  initialValues, 
  officialPrices = {}, 
  userLocalPrices = {}, 
  onUserLocalPriceChange, 
  onRefreshOfficialPrices, 
  isRefreshingPrices = false,
  priceFetchMessage = ''
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [cropId, setCropId] = useState(initialValues?.cropId || 'rice');
  const [farmArea, setFarmArea] = useState(initialValues?.farmArea || 2);
  const [areaUnit, setAreaUnit] = useState(initialValues?.areaUnit || 'acres');

  // Soil Info
  const [soilTestAvailable, setSoilTestAvailable] = useState(initialValues?.soilTestAvailable || 'Yes');
  const [nitrogenStatus, setNitrogenStatus] = useState(initialValues?.soilStatus?.n || 'Medium');
  const [phosphorusStatus, setPhosphorusStatus] = useState(initialValues?.soilStatus?.p || 'Medium');
  const [potassiumStatus, setPotassiumStatus] = useState(initialValues?.soilStatus?.k || 'Medium');
  const [organicMatter, setOrganicMatter] = useState(initialValues?.soilStatus?.organicMatter || 'Low');
  const [soilPh, setSoilPh] = useState(initialValues?.soilStatus?.ph || '');

  // Selected Fertilizers
  const [selectedFertilizers, setSelectedFertilizers] = useState(
    initialValues?.selectedFertilizers || ['urea', 'dap', 'mop', 'compost']
  );

  // User Priority
  const [userPriority, setUserPriority] = useState(initialValues?.userPriority || 'Balanced');

  // Errors
  const [errorMessage, setErrorMessage] = useState('');

  const selectedCropObj = CROPS_DATA.find(c => c.id === cropId) || CROPS_DATA[0];

  const handleFertilizerToggle = (id) => {
    if (selectedFertilizers.includes(id)) {
      if (selectedFertilizers.length === 1) {
        setErrorMessage('Please select at least one available fertilizer option.');
        return;
      }
      setSelectedFertilizers(selectedFertilizers.filter(f => f !== id));
    } else {
      setSelectedFertilizers([...selectedFertilizers, id]);
    }
    setErrorMessage('');
  };

  const handleLocalPriceInputChange = (id, val) => {
    if (onUserLocalPriceChange) {
      onUserLocalPriceChange(id, val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!cropId) {
      setErrorMessage('Please select a target crop.');
      return;
    }
    if (!farmArea || farmArea <= 0) {
      setErrorMessage('Please enter a valid farm area greater than zero.');
      return;
    }
    if (selectedFertilizers.length === 0) {
      setErrorMessage('Please select at least one available fertilizer.');
      return;
    }

    const payload = {
      cropId,
      farmArea: Number(farmArea),
      areaUnit,
      soilTestAvailable,
      soilStatus: {
        n: nitrogenStatus,
        p: phosphorusStatus,
        k: potassiumStatus,
        organicMatter,
        ph: soilPh
      },
      selectedFertilizers,
      userLocalPrices,
      userPriority
    };

    onSubmitAnalysis(payload);
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Government-notified MRP':
        return { background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' };
      case 'Illustrative reference':
      case 'Illustrative local benchmark':
      case 'Published reference':
        return { background: '#e0f2fe', color: '#0369a1', border: '1px solid #7dd3fc' };
      case 'User entered':
        return { background: '#f3e8ff', color: '#6b21a8', border: '1px solid #c084fc' };
      case 'Demo fallback':
      default:
        return { background: '#fef3c7', color: '#92400e', border: '1px solid #fde047' };
    }
  };

  return (
    <div className="simulator-container" id="simulator-form">
      <div className="simulator-header">
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Fertilizer Choice Simulator</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Configure your farm variables using reference prices or local dealer rates.
          </p>
        </div>

        <button 
          type="button" 
          className="btn-demo-nav" 
          onClick={onLoadDemo}
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
        >
          <Sparkles size={16} /> Load Demo Scenario
        </button>
      </div>

      {/* Progress Steps Header */}
      <div className="step-progress-bar">
        {[
          { num: 1, label: 'Crop' },
          { num: 2, label: 'Farm Area' },
          { num: 3, label: 'Soil Health' },
          { num: 4, label: 'Fertilizer Prices' },
          { num: 5, label: 'Priority' },
          { num: 6, label: 'Analysis' }
        ].map(step => (
          <div 
            key={step.num} 
            className={`step-node ${currentStep === step.num ? 'active' : currentStep > step.num ? 'completed' : ''}`}
            onClick={() => setCurrentStep(step.num)}
            style={{ cursor: 'pointer' }}
          >
            <span className="step-number">{step.num}</span> {step.label}
          </div>
        ))}
      </div>

      {/* Error display */}
      {errorMessage && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem' }}>
          <AlertCircle size={18} /> {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* STEP 1: Select Crop */}
        {currentStep === 1 && (
          <div className="form-group">
            <label className="form-label">STEP 1 — Select Target Crop</label>
            <select 
              className="form-select" 
              value={cropId} 
              onChange={e => setCropId(e.target.value)}
              style={{ fontSize: '1.1rem', padding: '1rem' }}
            >
              {CROPS_DATA.map(c => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name} {c.supported ? '(Fully Supported)' : '(Prototype Notice)'}
                </option>
              ))}
            </select>

            {!selectedCropObj.supported ? (
              <div style={{ marginTop: '1rem', background: '#fefce8', border: '1px solid #fef08a', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#713f12', fontSize: '0.92rem' }}>
                <Info size={18} style={{ color: '#ca8a04', verticalAlign: 'middle', marginRight: '6px' }} />
                <strong>Prototype Notice:</strong> Prototype support for <strong>{selectedCropObj.name}</strong> is limited. Consult local agricultural recommendations for field prescriptions.
              </div>
            ) : (
              <div style={{ marginTop: '1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#166534', fontSize: '0.9rem' }}>
                <Check size={18} style={{ color: '#16a34a', verticalAlign: 'middle', marginRight: '6px' }} />
                Fully supported crop dataset. Baseline requirements pre-loaded.
              </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-primary" onClick={() => setCurrentStep(2)}>
                Next: Farm Area →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Farm Information */}
        {currentStep === 2 && (
          <div className="form-group">
            <label className="form-label">STEP 2 — Farm Information</label>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>Farm Area Size</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={farmArea} 
                  onChange={e => setFarmArea(e.target.value)} 
                  min="0.1" 
                  step="0.1"
                  placeholder="e.g. 2"
                  style={{ fontSize: '1.1rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>Unit</label>
                <select 
                  className="form-select" 
                  value={areaUnit} 
                  onChange={e => setAreaUnit(e.target.value)}
                  style={{ fontSize: '1rem' }}
                >
                  <option value="acres">Acres</option>
                  <option value="hectares">Hectares</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" className="btn-secondary" onClick={() => setCurrentStep(1)}>
                ← Back
              </button>
              <button type="button" className="btn-primary" onClick={() => setCurrentStep(3)}>
                Next: Soil Information →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Soil Information */}
        {currentStep === 3 && (
          <div className="form-group">
            <label className="form-label">STEP 3 — Soil Information</label>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                Is a laboratory soil test report available for this field?
              </label>
              
              <div className="radio-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div 
                  className={`radio-card ${soilTestAvailable === 'Yes' ? 'selected' : ''}`}
                  onClick={() => setSoilTestAvailable('Yes')}
                >
                  <input type="radio" checked={soilTestAvailable === 'Yes'} onChange={() => {}} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem' }}>Yes — Soil Test Available</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Allows specific adjusted NPK & Organic Matter inputs</span>
                  </div>
                </div>

                <div 
                  className={`radio-card ${soilTestAvailable === 'No' ? 'selected' : ''}`}
                  onClick={() => setSoilTestAvailable('No')}
                >
                  <input type="radio" checked={soilTestAvailable === 'No'} onChange={() => {}} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem' }}>No — Soil Test Unavailable</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>SmartFert will use general regional defaults</span>
                  </div>
                </div>
              </div>
            </div>

            {soilTestAvailable === 'Yes' ? (
              <div style={{ background: 'var(--bg-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-800)' }}>
                  Soil Test Status Indicators
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.88rem' }}>Nitrogen Status</label>
                    <select className="form-select" value={nitrogenStatus} onChange={e => setNitrogenStatus(e.target.value)}>
                      <option value="Low">Low (Deficient)</option>
                      <option value="Medium">Medium (Balanced)</option>
                      <option value="High">High (Abundant)</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.88rem' }}>Phosphorus Status</label>
                    <select className="form-select" value={phosphorusStatus} onChange={e => setPhosphorusStatus(e.target.value)}>
                      <option value="Low">Low (Deficient)</option>
                      <option value="Medium">Medium (Balanced)</option>
                      <option value="High">High (Abundant)</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.88rem' }}>Potassium Status</label>
                    <select className="form-select" value={potassiumStatus} onChange={e => setPotassiumStatus(e.target.value)}>
                      <option value="Low">Low (Deficient)</option>
                      <option value="Medium">Medium (Balanced)</option>
                      <option value="High">High (Abundant)</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.88rem' }}>Soil Organic Matter</label>
                    <select className="form-select" value={organicMatter} onChange={e => setOrganicMatter(e.target.value)}>
                      <option value="Low">Low (&lt; 0.5% SOM)</option>
                      <option value="Medium">Medium (0.5% - 1.5% SOM)</option>
                      <option value="High">High (&gt; 1.5% SOM)</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.88rem' }}>Soil pH (Optional)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 6.5" 
                    value={soilPh} 
                    onChange={e => setSoilPh(e.target.value)}
                    style={{ maxWidth: '200px' }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', padding: '1.25rem', borderRadius: 'var(--radius-md)', color: '#873800', fontSize: '0.92rem' }}>
                <HelpCircle size={18} style={{ color: '#d46b08', verticalAlign: 'middle', marginRight: '6px' }} />
                Without soil-test information, SmartFert will provide only a general comparison and will not generate a specific application prescription.
              </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" className="btn-secondary" onClick={() => setCurrentStep(2)}>
                ← Back
              </button>
              <button type="button" className="btn-primary" onClick={() => setCurrentStep(4)}>
                Next: Fertilizer Prices & Dealer Override →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Reference Prices & Local Price Override */}
        {currentStep === 4 && (
          <div className="form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label className="form-label">STEP 4 — Reference Prices & Local Price Override</label>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Urea uses a government-notified MRP. Other fertilizer and organic-material prices shown in the demo are illustrative reference values. Enter optional local dealer prices to override.
                </p>
              </div>

              <button 
                type="button" 
                onClick={onRefreshOfficialPrices}
                disabled={isRefreshingPrices}
                style={{ 
                  background: 'linear-gradient(135deg, var(--primary-800), var(--primary-600))', 
                  color: '#ffffff', 
                  border: 'none', 
                  padding: '0.65rem 1.25rem', 
                  borderRadius: '50px', 
                  fontWeight: 700, 
                  fontSize: '0.88rem', 
                  cursor: isRefreshingPrices ? 'not-allowed' : 'pointer', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <RefreshCw size={16} className={isRefreshingPrices ? 'spin-icon' : ''} />
                {isRefreshingPrices ? 'Refreshing prices...' : 'Refresh Prices'}
              </button>
            </div>

            {priceFetchMessage && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.85rem 1.1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', color: '#166534', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} style={{ color: '#16a34a' }} /> {priceFetchMessage}
              </div>
            )}

            {/* Transparency Note */}
            <div style={{ background: '#f8faf6', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.1rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              ℹ️ <strong>Price Transparency:</strong> Urea uses a government-notified MRP reference. Other fertilizer and organic-material prices shown in the demo are illustrative reference values and may vary by manufacturer, grade, region, season and supplier. Enter a local price for more accurate cost comparison.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {FERTILIZERS_DATA.map(f => {
                const isSelected = selectedFertilizers.includes(f.id);
                const priceInfo = getEffectiveFertilizerPrice(f.id, officialPrices, userLocalPrices);
                const userPriceVal = userLocalPrices[f.id] || '';

                return (
                  <div key={f.id} className={`checkbox-card ${isSelected ? 'selected' : ''}`} style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <input 
                        type="checkbox" 
                        checked={isSelected} 
                        onChange={() => handleFertilizerToggle(f.id)} 
                        style={{ marginTop: '4px' }}
                      />
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '1.05rem', color: 'var(--primary-900)' }}>{f.icon} {f.name}</strong>
                          <span className="badge badge-info">{f.analysis}</span>
                        </div>

                        {/* Reference Price Display Card */}
                        <div style={{ margin: '0.5rem 0', padding: '0.65rem 0.85rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-900)' }}>
                                ₹{priceInfo.packagePrice.toFixed(2)}
                              </span>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}> / {priceInfo.packageSizeLabel}</span>
                            </div>
                            
                            <span className="badge" style={getStatusBadgeStyle(priceInfo.priceStatus)}>
                              <Tag size={12} style={{ verticalAlign: 'middle', marginRight: '3px' }} />
                              {priceInfo.priceStatus}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                            <span>🏛️ {priceInfo.sourceLabel}</span>
                            {priceInfo.sourceUrl ? (
                              <a href={priceInfo.sourceUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-700)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                                View Source <ExternalLink size={10} />
                              </a>
                            ) : null}
                          </div>

                          {priceInfo.notes && (
                            <div style={{ fontSize: '0.74rem', color: '#6b7280', marginTop: '4px', lineHeight: 1.4 }}>
                              {priceInfo.notes}
                            </div>
                          )}
                        </div>

                        {/* User Local Price Override Input */}
                        {isSelected && (
                          <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-light)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-800)' }}>
                                Local dealer price (optional):
                              </span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>₹</span>
                                <input 
                                  type="number" 
                                  className="fertilizer-price-input" 
                                  placeholder={priceInfo.packagePrice.toFixed(2)}
                                  step="1" 
                                  min="0"
                                  value={userPriceVal}
                                  onChange={e => handleLocalPriceInputChange(f.id, e.target.value)}
                                  style={{ width: '100px', padding: '0.35rem 0.5rem' }}
                                />
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ {f.packageSizeKg || 50}kg</span>
                              </div>
                            </div>

                            <div style={{ fontSize: '0.75rem', marginTop: '4px', textAlign: 'right', fontWeight: 600, color: priceInfo.isOverridden ? '#6b21a8' : 'var(--primary-700)' }}>
                              Price used: <strong>{priceInfo.isOverridden ? 'User entered' : (f.id === 'urea' ? 'Government-notified MRP' : 'Illustrative reference')}</strong> (₹{priceInfo.pricePerKg.toFixed(2)}/kg)
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" className="btn-secondary" onClick={() => setCurrentStep(3)}>
                ← Back
              </button>
              <button type="button" className="btn-primary" onClick={() => setCurrentStep(5)}>
                Next: User Priority →
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: User Priority */}
        {currentStep === 5 && (
          <div className="form-group">
            <label className="form-label">STEP 5 — Decision Priority Weighting</label>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Select what matters most to your farming objective. This dynamically adjusts decision scoring weights.
            </p>

            <div className="radio-grid">
              {[
                { id: 'Balanced', label: 'Balanced Strategy', desc: 'Equal consideration of cost, nutrient efficiency, and soil health.' },
                { id: 'Lowest Cost', label: 'Lowest Cost Priority', desc: 'Maximizes short-term input expenditure savings (45% cost weight).' },
                { id: 'Nutrient Efficiency', label: 'Nutrient Efficiency', desc: 'Focuses on immediate crop response and available NPK density.' },
                { id: 'Soil Sustainability', label: 'Soil Sustainability', desc: 'Prioritizes organic carbon accumulation and long-term soil health (45% sustainability weight).' }
              ].map(p => (
                <div 
                  key={p.id}
                  className={`radio-card ${userPriority === p.id ? 'selected' : ''}`}
                  onClick={() => setUserPriority(p.id)}
                >
                  <input type="radio" checked={userPriority === p.id} onChange={() => {}} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--primary-900)' }}>{p.label}</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--text-muted)', background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
              ℹ️ <strong>Prototype Note:</strong> Decision weights are configurable prototype parameters, not rigid agronomic standards.
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" className="btn-secondary" onClick={() => setCurrentStep(4)}>
                ← Back
              </button>
              <button type="button" className="btn-primary" onClick={() => setCurrentStep(6)}>
                Next: Final Review →
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Final Review & Submit */}
        {currentStep === 6 && (
          <div className="form-group">
            <label className="form-label">STEP 6 — Ready for Analysis</label>
            
            <div style={{ background: 'var(--bg-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--primary-800)' }}>
                Configuration Summary:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.95rem', lineHeight: 1.8 }}>
                <li>🌾 <strong>Target Crop:</strong> {selectedCropObj.name} ({farmArea} {areaUnit})</li>
                <li>🧪 <strong>Soil Test:</strong> {soilTestAvailable} {soilTestAvailable === 'Yes' ? `(N: ${nitrogenStatus}, P: ${phosphorusStatus}, K: ${potassiumStatus}, SOM: ${organicMatter})` : ''}</li>
                <li>📦 <strong>Selected Fertilizers:</strong> {selectedFertilizers.join(', ')}</li>
                <li>🎯 <strong>Priority:</strong> {userPriority}</li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn-secondary" onClick={() => setCurrentStep(5)}>
                ← Back to Priority
              </button>
              
              <button type="submit" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.15rem' }}>
                <Play size={20} fill="#ffffff" /> Analyze with SmartFert AI
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
