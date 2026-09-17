// Pure agronomic calculation engine for SmartFert
import { CROPS_DATA, SOIL_STATUS_MULTIPLIERS } from '../data/crops.js';
import { FERTILIZERS_DATA } from '../data/fertilizers.js';
import { getEffectiveFertilizerPrice } from '../services/fertilizerPriceService.js';

export function runFertilizerAnalysis(inputs) {
  const {
    cropId = 'rice',
    farmArea = 2,
    areaUnit = 'acres',
    soilTestAvailable = 'Yes',
    soilStatus = { n: 'Medium', p: 'Medium', k: 'Medium', organicMatter: 'Low', ph: '' },
    selectedFertilizers = ['urea', 'compost'],
    officialPrices = {},
    userLocalPrices = {},
    customPrices = {}, // Legacy fallback compatibility
    userPriority = 'Balanced'
  } = inputs;

  // 1. Find crop specification
  const crop = CROPS_DATA.find(c => c.id === cropId) || CROPS_DATA[0];
  const areaInAcres = areaUnit === 'hectares' ? farmArea * 2.47105 : Number(farmArea);

  // 2. Base NPK requirements
  const baseRate = crop.baseTargetPerAcre;

  // 3. Soil test adjustment factors
  const nMult = soilTestAvailable === 'Yes' ? (SOIL_STATUS_MULTIPLIERS[soilStatus.n] || 1.0) : 1.0;
  const pMult = soilTestAvailable === 'Yes' ? (SOIL_STATUS_MULTIPLIERS[soilStatus.p] || 1.0) : 1.0;
  const kMult = soilTestAvailable === 'Yes' ? (SOIL_STATUS_MULTIPLIERS[soilStatus.k] || 1.0) : 1.0;

  const targetN = Math.round(baseRate.n * areaInAcres * nMult);
  const targetP = Math.round(baseRate.p * areaInAcres * pMult);
  const targetK = Math.round(baseRate.k * areaInAcres * kMult);

  // 4. Resolve effective fertilizer prices using Government / User Local override service
  const effectivePrices = {};
  FERTILIZERS_DATA.forEach(f => {
    // Check if custom legacy price passed in
    if (customPrices[f.id] !== undefined && customPrices[f.id] !== '' && !userLocalPrices[f.id]) {
      userLocalPrices[f.id] = customPrices[f.id];
    }
    effectivePrices[f.id] = getEffectiveFertilizerPrice(f.id, officialPrices, userLocalPrices);
  });

  const getPricePerKg = (id) => (effectivePrices[id] ? effectivePrices[id].pricePerKg : 5.92);

  // 5. Calculate Strategy 1: INORGANIC FOCUSED
  // Uses Urea, DAP, MOP
  const dapRequiredKg = targetP > 0 ? Math.round(targetP / 0.46) : 0;
  const nFromDap = Math.round(dapRequiredKg * 0.18);
  const remainingNKg = Math.max(0, targetN - nFromDap);
  const ureaRequiredKg = Math.round(remainingNKg / 0.46);
  const mopRequiredKg = targetK > 0 ? Math.round(targetK / 0.60) : 0;

  const inorganicCostUrea = ureaRequiredKg * getPricePerKg('urea');
  const inorganicCostDap = dapRequiredKg * getPricePerKg('dap');
  const inorganicCostMop = mopRequiredKg * getPricePerKg('mop');
  const totalInorganicCost = Math.round(inorganicCostUrea + inorganicCostDap + inorganicCostMop);
  const totalInorganicMassKg = ureaRequiredKg + dapRequiredKg + mopRequiredKg;

  // Package counts (bags)
  const ureaBags = Math.ceil(ureaRequiredKg / 45);
  const dapBags = Math.ceil(dapRequiredKg / 50);
  const mopBags = Math.ceil(mopRequiredKg / 50);

  // 6. Calculate Strategy 2: ORGANIC FOCUSED
  // Uses Compost or FYM to cover NPK requirement
  // Compost has ~1.5% N, but only 35% is available year 1
  const compostForAvailableN = Math.round(targetN / (0.015 * 0.35));
  const compostCost = Math.round(compostForAvailableN * getPricePerKg('compost'));
  const totalOrganicMassKg = compostForAvailableN;
  const somAddedKg = Math.round(totalOrganicMassKg * 0.65);
  const compostBags = Math.ceil(compostForAvailableN / 50);

  // 7. Calculate Strategy 3: INTEGRATED NUTRIENT MANAGEMENT (INM)
  // 50% target N supplied via compost/FYM basal + 50% via Urea top dress + balanced mineral P/K
  const inmTargetNOrganic = targetN * 0.45;
  const inmTargetNMineral = targetN * 0.55;

  const inmCompostKg = Math.round(inmTargetNOrganic / (0.015 * 0.35));
  const inmDapKg = Math.round((targetP * 0.7) / 0.46);
  const inmNFromDap = inmDapKg * 0.18;
  const inmRemainingN = Math.max(0, inmTargetNMineral - inmNFromDap);
  const inmUreaKg = Math.round(inmRemainingN / 0.46);
  const inmMopKg = Math.round((targetK * 0.7) / 0.60);

  const inmCostCompost = inmCompostKg * getPricePerKg('compost');
  const inmCostUrea = inmUreaKg * getPricePerKg('urea');
  const inmCostDap = inmDapKg * getPricePerKg('dap');
  const inmCostMop = inmMopKg * getPricePerKg('mop');
  const totalInmCost = Math.round(inmCostCompost + inmCostUrea + inmCostDap + inmCostMop);
  const totalInmMassKg = inmCompostKg + inmUreaKg + inmDapKg + inmMopKg;
  const inmSomAddedKg = Math.round(inmCompostKg * 0.65);

  const inmUreaBags = Math.ceil(inmUreaKg / 45);
  const inmDapBags = Math.ceil(inmDapKg / 50);
  const inmMopBags = Math.ceil(inmMopKg / 50);
  const inmCompostBags = Math.ceil(inmCompostKg / 50);

  // Data confidence rating
  let confidenceLevel = 'High';
  let confidenceReason = 'High confidence: Valid crop selected with complete soil test indicators and reference fertilizer pricing.';
  if (soilTestAvailable === 'No') {
    confidenceLevel = 'Moderate';
    confidenceReason = 'Confidence is moderate because no soil-test laboratory values were provided. Standard regional defaults were applied.';
  }
  if (!crop.supported) {
    confidenceLevel = 'Moderate (Prototype Notice)';
    confidenceReason = `Prototype support for ${crop.name} is limited. Consult local agricultural extension guidance for field prescriptions.`;
  }

  return {
    crop,
    farmArea,
    areaUnit,
    areaInAcres,
    targetNPK: { n: targetN, p: targetP, k: targetK },
    soilTestAvailable,
    soilStatus,
    confidenceLevel,
    confidenceReason,
    userPriority,
    effectivePrices,
    currencySymbol: '₹',
    strategies: {
      inorganic: {
        id: 'inorganic',
        title: 'Inorganic-Focused Strategy',
        subtitle: 'High-concentration mineral inputs for fast nutrient delivery',
        icon: '⚡',
        breakdown: [
          { name: `Urea (46% N)`, amountKg: ureaRequiredKg, bags: ureaBags, cost: Math.round(inorganicCostUrea), priceInfo: effectivePrices['urea'] },
          { name: `DAP (18-46-0)`, amountKg: dapRequiredKg, bags: dapBags, cost: Math.round(inorganicCostDap), priceInfo: effectivePrices['dap'] },
          { name: `MOP (0-0-60)`, amountKg: mopRequiredKg, bags: mopBags, cost: Math.round(inorganicCostMop), priceInfo: effectivePrices['mop'] }
        ],
        totalMassKg: totalInorganicMassKg,
        totalCost: totalInorganicCost,
        somAddedKg: 0,
        bulkinessIndex: 'Low (Easy to transport & apply)',
        plantAvailabilitySpeed: 'Fast (1-7 days)',
        advantages: [
          'High concentration reduces transport bulk and labor',
          'Immediate plant availability addresses acute crop demand',
          'Lower short-term product expenditure'
        ],
        considerations: [
          'Does not add soil organic matter or improve long-term soil structure',
          'Higher risk of leaching or volatility under improper timing/heavy rain',
          'Potential soil acidification without organic buffering over time'
        ]
      },
      organic: {
        id: 'organic',
        title: 'Organic-Focused Strategy',
        subtitle: 'Bulk organic matter for long-term soil health & biological activity',
        icon: '🌱',
        breakdown: [
          { name: 'City Compost / Organic Amender', amountKg: compostForAvailableN, bags: compostBags, cost: compostCost, priceInfo: effectivePrices['compost'] }
        ],
        totalMassKg: totalOrganicMassKg,
        totalCost: compostCost,
        somAddedKg: somAddedKg,
        bulkinessIndex: 'High (30x-50x bulk vs mineral)',
        plantAvailabilitySpeed: 'Slow to Moderate (Weeks to months)',
        advantages: [
          'Significantly increases Soil Organic Matter (SOM) and active humus',
          'Enhances soil moisture holding capacity and cation exchange',
          'Slow-release nutrient mineralization provides steady feeding over full season',
          'Recycles agricultural and community organic wastes'
        ],
        considerations: [
          'Low NPK concentration requires handling high volumetric tonnage (~' + Math.round(totalOrganicMassKg / 1000 * 10) / 10 + ' tons)',
          'Variable nutrient content depending on feedstock quality and composting maturity',
          'Slow initial nutrient availability can lag during early crop vegetative stages'
        ]
      },
      integrated: {
        id: 'integrated',
        title: 'Integrated Nutrient Management (INM)',
        subtitle: 'Balanced combination of organic soil amenders & mineral top-dressing',
        icon: '⚖️',
        breakdown: [
          { name: 'Compost (Basal)', amountKg: inmCompostKg, bags: inmCompostBags, cost: Math.round(inmCostCompost), priceInfo: effectivePrices['compost'] },
          { name: 'Urea (46% N)', amountKg: inmUreaKg, bags: inmUreaBags, cost: Math.round(inmCostUrea), priceInfo: effectivePrices['urea'] },
          { name: 'DAP (18-46-0)', amountKg: inmDapKg, bags: inmDapBags, cost: Math.round(inmCostDap), priceInfo: effectivePrices['dap'] },
          { name: 'MOP (0-0-60)', amountKg: inmMopKg, bags: inmMopBags, cost: Math.round(inmCostMop), priceInfo: effectivePrices['mop'] }
        ],
        totalMassKg: totalInmMassKg,
        totalCost: totalInmCost,
        somAddedKg: inmSomAddedKg,
        bulkinessIndex: 'Moderate (Manageable organic basal + light mineral top-dress)',
        plantAvailabilitySpeed: 'Optimal (Immediate boost + sustained release)',
        advantages: [
          'Improves nutrient availability alignment by combining immediate & slow-release sources',
          'Supports crop nutrient demands while adding organic soil amendments',
          'Balances bulk transport logistics with soil sustainability goals'
        ],
        considerations: [
          'Requires split application management (basal organic + mineral split top-dressing)',
          'Slightly higher total labor than purely mineral synthetic applications'
        ]
      }
    }
  };
}
