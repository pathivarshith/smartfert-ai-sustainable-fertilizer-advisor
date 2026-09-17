// Crop reference dataset for SmartFert
// Provides baseline N-P2O5-K2O nutrient recommendation rates per acre and per hectare
// Note: These are baseline decision-support estimates. Field application requires soil testing.

export const CROPS_DATA = [
  {
    id: 'rice',
    name: 'Rice',
    supported: true,
    icon: '🌾',
    category: 'Cereal / Grain',
    description: 'Paddy crop with high Nitrogen and Potassium requirements during tillering and panicle initiation.',
    baseTargetPerAcre: { n: 48, p: 24, k: 24 }, // in kg/acre
    baseTargetPerHectare: { n: 120, p: 60, k: 60 }, // in kg/ha
    phOptimal: '5.5 - 6.5',
    soilNotes: 'Responds well to integrated organic matter to improve nitrogen retention in flooded soils.'
  },
  {
    id: 'wheat',
    name: 'Wheat',
    supported: true,
    icon: '🌾',
    category: 'Cereal / Grain',
    description: 'Cool-season cereal crop needing early Nitrogen split-application and balanced Phosphorus for root establishment.',
    baseTargetPerAcre: { n: 50, p: 25, k: 20 },
    baseTargetPerHectare: { n: 125, p: 62, k: 50 },
    phOptimal: '6.0 - 7.0',
    soilNotes: 'Organic matter helps improve soil moisture holding capacity during grain filling.'
  },
  {
    id: 'maize',
    name: 'Maize',
    supported: true,
    icon: '🌽',
    category: 'Cereal / Grain',
    description: 'Heavy feeder crop requiring high Nitrogen density for vigorous vegetative growth and kernel development.',
    baseTargetPerAcre: { n: 60, p: 30, k: 25 },
    baseTargetPerHectare: { n: 150, p: 75, k: 62 },
    phOptimal: '5.8 - 7.0',
    soilNotes: 'High root biomass benefits from structured soil with good organic carbon content.'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    supported: false,
    icon: '☁️',
    category: 'Fiber Crop',
    description: 'Deep-rooted crop requiring vegetative-reproductive balance to avoid excessive leaf growth.',
    baseTargetPerAcre: { n: 45, p: 22, k: 22 },
    baseTargetPerHectare: { n: 112, p: 55, k: 55 },
    phOptimal: '6.0 - 7.5'
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    supported: false,
    icon: '🎋',
    category: 'Cash Crop',
    description: 'Long-duration crop requiring high Nitrogen tonnage and Potassium for cane sugar translocation.',
    baseTargetPerAcre: { n: 100, p: 40, k: 50 },
    baseTargetPerHectare: { n: 250, p: 100, k: 125 },
    phOptimal: '6.0 - 7.5'
  },
  {
    id: 'soybean',
    name: 'Soybean',
    supported: false,
    icon: '🫛',
    category: 'Legume / Oilseed',
    description: 'Leguminous crop capable of atmospheric Nitrogen fixation through Rhizobia symbiosis.',
    baseTargetPerAcre: { n: 15, p: 30, k: 20 },
    baseTargetPerHectare: { n: 37, p: 75, k: 50 },
    phOptimal: '6.0 - 6.8'
  },
  {
    id: 'groundnut',
    name: 'Groundnut',
    supported: false,
    icon: '🥜',
    category: 'Legume / Oilseed',
    description: 'Legume crop needing low starter Nitrogen and high Calcium/Phosphorus for pod maturity.',
    baseTargetPerAcre: { n: 12, p: 24, k: 24 },
    baseTargetPerHectare: { n: 30, p: 60, k: 60 },
    phOptimal: '5.8 - 6.5'
  },
  {
    id: 'other',
    name: 'Other Crop',
    supported: false,
    icon: '🌱',
    category: 'General Agriculture',
    description: 'General crop category for custom agricultural requirements.',
    baseTargetPerAcre: { n: 40, p: 20, k: 20 },
    baseTargetPerHectare: { n: 100, p: 50, k: 50 },
    phOptimal: '6.0 - 7.0'
  }
];

export const SOIL_STATUS_MULTIPLIERS = {
  Low: 1.25,      // Deficient soil needs +25% additional replenishment
  Medium: 1.00,   // Standard balanced baseline
  High: 0.75      // Fertile soil requires 25% less mineral boost
};
