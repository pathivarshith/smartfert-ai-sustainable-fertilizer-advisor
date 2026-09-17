// Fertilizer reference dataset for SmartFert
// Distinguishes mineral fertilizers from organic soil amenders
// Integrated with official Government of India pricing notifications

export const FERTILIZERS_DATA = [
  {
    id: 'urea',
    name: 'Urea',
    type: 'Inorganic (Mineral)',
    category: 'Nitrogenous',
    icon: '⚡',
    analysis: '46-0-0',
    nPercent: 46,
    pPercent: 0,
    kPercent: 0,
    plantAvailability: 0.95, // ~95% of N becomes available rapidly upon hydrolyzation
    variableConcentration: false,
    organicMatterContribution: 0, // Adds no soil organic carbon
    bulkinessRating: 'Low (Highly concentrated)',
    packageSizeKg: 45,
    packageSizeLabel: '45 kg bag',
    defaultGovtPrice: 266.50,
    defaultDemoPricePerKg: 5.92, // ₹266.50 / 45 kg
    demoPriceLabel: 'Government-notified MRP: ₹266.50 / 45 kg bag',
    advantages: [
      'Highest Nitrogen density (46% N) among solid fertilizers',
      'Low transportation and storage bulk per kg of active nutrient',
      'Rapidly available for quick crop greening and vegetative growth'
    ],
    considerations: [
      'No Phosphorus, Potassium, or organic matter contribution',
      'Risk of ammonia volatilization if surface-applied without incorporation',
      'Leaching potential in light sandy soils during heavy rain',
      'Can cause mild soil acidification over repeated unbuffered applications'
    ]
  },
  {
    id: 'dap',
    name: 'DAP (Di-ammonium Phosphate)',
    type: 'Inorganic (Mineral)',
    category: 'Phosphatic & Nitrogenous',
    icon: '💎',
    analysis: '18-46-0',
    nPercent: 18,
    pPercent: 46,
    kPercent: 0,
    plantAvailability: 0.90,
    variableConcentration: false,
    organicMatterContribution: 0,
    bulkinessRating: 'Low (Concentrated binary source)',
    packageSizeKg: 50,
    packageSizeLabel: '50 kg bag',
    defaultGovtPrice: 1350.00,
    defaultDemoPricePerKg: 27.00, // ₹1,350 / 50 kg
    demoPriceLabel: 'Illustrative reference: ₹1,350 / 50 kg bag',
    advantages: [
      'High water-soluble Phosphorus (46% P₂O₅) + starter Nitrogen (18% N)',
      'Promotes early root development and seedling vigor',
      'Easy mechanical drilling and basal placement'
    ],
    considerations: [
      'Phosphorus can become fixed in strongly acidic or alkaline soils',
      'Provides no Potassium or organic soil amenders',
      'Improper seed placement can cause localized salt burn to germinating seeds'
    ]
  },
  {
    id: 'mop',
    name: 'MOP (Muriate of Potash)',
    type: 'Inorganic (Mineral)',
    category: 'Potassic',
    icon: '🧂',
    analysis: '0-0-60',
    nPercent: 0,
    pPercent: 0,
    kPercent: 60,
    plantAvailability: 0.95,
    variableConcentration: false,
    organicMatterContribution: 0,
    bulkinessRating: 'Low (Concentrated K source)',
    packageSizeKg: 50,
    packageSizeLabel: '50 kg bag',
    defaultGovtPrice: 1650.00,
    defaultDemoPricePerKg: 33.00, // ₹1,650 / 50 kg
    demoPriceLabel: 'Illustrative reference: ₹1,650 / 50 kg bag',
    advantages: [
      'Most economical concentrated Potassium source (60% K₂O)',
      'Enhances crop drought tolerance, disease resistance, and grain filling',
      'Fully soluble in soil moisture'
    ],
    considerations: [
      'High Chloride content; sensitive crops (e.g. tobacco, some fruits) require SOP instead',
      'Does not contribute organic matter or Nitrogen'
    ]
  },
  {
    id: 'npk',
    name: 'NPK Complex (12-32-16 / 20-20-0)',
    type: 'Inorganic (Mineral)',
    category: 'Complex Multi-Nutrient',
    icon: '🧪',
    analysis: '12-32-16',
    nPercent: 12,
    pPercent: 32,
    kPercent: 16,
    plantAvailability: 0.92,
    variableConcentration: false,
    organicMatterContribution: 0,
    bulkinessRating: 'Low (Balanced ternary source)',
    packageSizeKg: 50,
    packageSizeLabel: '50 kg bag',
    defaultGovtPrice: 1470.00,
    defaultDemoPricePerKg: 29.40, // ₹1,470 / 50 kg
    demoPriceLabel: 'Illustrative reference: ₹1,470 / 50 kg bag',
    advantages: [
      'Balanced N-P-K nutrient ratio in every granule',
      'Uniform field distribution and basal dressing efficiency',
      'Reduces need for multiple single-nutrient applications'
    ],
    considerations: [
      'Fixed N-P-K ratio limits split-nitrogen flexibility',
      'Does not contribute soil organic matter'
    ]
  },
  {
    id: 'compost',
    name: 'Compost / City Compost',
    type: 'Organic',
    category: 'Organic Soil Amender',
    icon: '🍂',
    analysis: '1.5-1.0-1.5 (Variable)',
    nPercent: 1.5,
    pPercent: 1.0,
    kPercent: 1.5,
    plantAvailability: 0.35, // Only ~30-40% N released in Year 1 due to biological mineralization
    variableConcentration: true,
    variableNotice: 'Compost price varies by source and location. Laboratory analysis recommended.',
    organicMatterContribution: 65, // ~65% organic matter content
    bulkinessRating: 'High (Bulk organic material)',
    packageSizeKg: 50,
    packageSizeLabel: '50 kg bag (₹6.00/kg benchmark)',
    defaultGovtPrice: 300.00,
    defaultDemoPricePerKg: 6.00,
    demoPriceLabel: 'Compost price varies by source and location.',
    advantages: [
      'Enriches soil organic matter (SOM) and active soil microbial biomass',
      'Improves soil water retention, cation exchange capacity (CEC), and aeration',
      'Slow-release nutrient mineralization provides steady feeding over full season',
      'Recycles agricultural and community organic wastes'
    ],
    considerations: [
      'Low NPK concentration requires high volumetric handling (~30x-50x bulk vs urea)',
      'Variable nutrient content depending on feedstock quality and composting maturity',
      'Immature compost can temporarily tie up soil nitrogen (N-immobilization)'
    ]
  },
  {
    id: 'fym',
    name: 'Farmyard Manure (FYM)',
    type: 'Organic',
    category: 'Organic Soil Amender',
    icon: '🐄',
    analysis: '0.6-0.3-0.5 (Variable)',
    nPercent: 0.6,
    pPercent: 0.3,
    kPercent: 0.5,
    plantAvailability: 0.30,
    variableConcentration: true,
    variableNotice: 'FYM price varies by farm gate location and livestock density.',
    organicMatterContribution: 55,
    bulkinessRating: 'Very High (High moisture bulk material)',
    packageSizeKg: 50,
    packageSizeLabel: '50 kg equivalent (₹4.00/kg benchmark)',
    defaultGovtPrice: 200.00,
    defaultDemoPricePerKg: 4.00,
    demoPriceLabel: 'FYM price varies by source and location.',
    advantages: [
      'Traditional on-farm resource utilizing livestock bedding and manure',
      'Excellent long-term soil structure conditioner and biological activator',
      'Supplies secondary nutrients (Ca, Mg, S) and micronutrients (Zn, Fe, Mn)'
    ],
    considerations: [
      'High moisture content increases freight and field application effort',
      'Low initial plant-available Nitrogen in year of application',
      'Requires proper decomposition to eliminate weed seeds and pathogens'
    ]
  }
];

export const NUTRIENT_CONCEPT_EXPLANATION = {
  totalVsAvailable: 'Total nutrient content refers to the absolute quantity of elements present in a material. Plant-available nutrient is the fraction that converts into water-soluble ionic forms (NH₄⁺, NO₃⁻, H₂PO₄⁻, K⁺) during the crop growing season. Organic inputs release nutrients slowly via soil micro-organism activity (mineralization), whereas mineral fertilizers dissolve rapidly.',
  compostEquivalence: 'Compost is NOT a direct 1:1 kilogram replacement for Urea. Replacing 100 kg of Urea (which yields ~46 kg N) solely with compost requires approximately 3,000 kg to 4,000 kg of compost to deliver equivalent immediate plant-available Nitrogen during the first crop season.'
};
