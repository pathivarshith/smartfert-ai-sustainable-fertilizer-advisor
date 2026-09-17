// Recommendation logic and Explainable AI (XAI) scoring engine for SmartFert

export function evaluateRecommendation(analysisResult) {
  const { crop, farmArea, areaUnit, soilStatus, userPriority, strategies, confidenceLevel, confidenceReason } = analysisResult;

  // Define scoring weights based on user priority
  const weightProfiles = {
    'Balanced': { cost: 0.25, efficiency: 0.25, practicality: 0.20, sustainability: 0.30 },
    'Lowest Cost': { cost: 0.45, efficiency: 0.25, practicality: 0.20, sustainability: 0.10 },
    'Nutrient Efficiency': { cost: 0.20, efficiency: 0.45, practicality: 0.15, sustainability: 0.20 },
    'Soil Sustainability': { cost: 0.15, efficiency: 0.25, practicality: 0.15, sustainability: 0.45 }
  };

  const weights = weightProfiles[userPriority] || weightProfiles['Balanced'];

  // Evaluate raw attributes for each strategy
  const evalStrategy = (stratKey) => {
    const strat = strategies[stratKey];
    let costScore = 8;
    let efficiencyScore = 8;
    let practicalityScore = 8;
    let sustainabilityScore = 5;

    if (stratKey === 'inorganic') {
      costScore = 9.0;
      efficiencyScore = 9.2;
      practicalityScore = 9.5;
      sustainabilityScore = 4.2;
    } else if (stratKey === 'organic') {
      // High mass cost and handling bulk lower cost and practicality scores
      costScore = 5.5;
      efficiencyScore = 6.0;
      practicalityScore = 4.5;
      sustainabilityScore = 9.8;
      // Bonus if soil organic matter is Low
      if (soilStatus.organicMatter === 'Low') {
        sustainabilityScore += 0.2;
      }
    } else if (stratKey === 'integrated') {
      costScore = 8.2;
      efficiencyScore = 9.0;
      practicalityScore = 8.0;
      sustainabilityScore = 8.8;
      if (soilStatus.organicMatter === 'Low') {
        sustainabilityScore += 0.5;
      }
    }

    // Weighted Overall Fit
    const overallFit = (
      costScore * weights.cost +
      efficiencyScore * weights.efficiency +
      practicalityScore * weights.practicality +
      sustainabilityScore * weights.sustainability
    );

    return {
      id: stratKey,
      costScore: Math.min(10, Math.round(costScore * 10) / 10),
      efficiencyScore: Math.min(10, Math.round(efficiencyScore * 10) / 10),
      practicalityScore: Math.min(10, Math.round(practicalityScore * 10) / 10),
      sustainabilityScore: Math.min(10, Math.round(sustainabilityScore * 10) / 10),
      overallFit: Math.min(10, Math.round(overallFit * 10) / 10)
    };
  };

  const scores = {
    inorganic: evalStrategy('inorganic'),
    organic: evalStrategy('organic'),
    integrated: evalStrategy('integrated')
  };

  // Determine top recommended strategy
  let recommendedKey = 'integrated';
  if (scores.inorganic.overallFit > scores.integrated.overallFit && scores.inorganic.overallFit > scores.organic.overallFit) {
    recommendedKey = 'inorganic';
  } else if (scores.organic.overallFit > scores.integrated.overallFit && scores.organic.overallFit > scores.inorganic.overallFit) {
    recommendedKey = 'organic';
  }

  const recommendedStrat = strategies[recommendedKey];
  const recommendedScores = scores[recommendedKey];

  // Dynamic Explainable AI (XAI) rationale generation
  const whyPoints = [
    `1. Crop Requirement: ${crop.name} requires balanced nutrient supply throughout growth. ${recommendedKey === 'integrated' ? 'Integrated management satisfies early rooting and peak vegetative demand.' : recommendedKey === 'inorganic' ? 'Mineral inputs deliver immediate high NPK density.' : 'Organic matter builds long-term soil structure.'}`,
    `2. Soil Information: Soil Organic Matter status is recorded as "${soilStatus.organicMatter || 'Low'}". ${soilStatus.organicMatter === 'Low' ? 'Replenishing organic carbon is essential to prevent fertility degradation.' : 'Soil condition benefits from sustained biological activity.'}`,
    `3. Cost Considerations: Estimated total expenditure is ₹${Math.round(recommendedStrat.totalCost).toLocaleString('en-IN')} for ${farmArea} ${areaUnit}, balancing input price with crop response.`,
    `4. Fertilizer Logistics: ${recommendedStrat.bulkinessIndex}. Total input weight is ~${Math.round(recommendedStrat.totalMassKg).toLocaleString('en-IN')} kg.`,
    `5. Priority Alignment: Selected priority "${userPriority}" assigns a ${Math.round(weights.sustainability * 100)}% weight to soil sustainability and ${Math.round(weights.cost * 100)}% to cost efficiency.`
  ];

  const whyNotOnlyUrea = 'Urea provides concentrated Nitrogen (46% N) and quick greening, but lacks Phosphorus, Potassium, and organic matter. Continuous sole reliance on Urea can lead to Nitrogen volatilization losses, leaching, soil acidification, and gradual depletion of soil organic carbon.';

  const whyNotOnlyCompost = `Compost enriches soil biological health and humus, but has low nutrient density (~1.5% N) with only ~35% plant-availability in Year 1. Relying strictly on compost for ${crop.name} on ${farmArea} ${areaUnit} requires approximately ${Math.round(strategies.organic.totalMassKg).toLocaleString('en-IN')} kg (~${Math.round(strategies.organic.totalMassKg / 1000 * 10) / 10} metric tons) of material, demanding substantial labor and freight logistics.`;

  const whyIntegrated = 'Combining organic amenders with targeted mineral fertilizers balances fast plant-available nutrition during peak growth phases with steady humus buildup. It maximizes Nutrient-Use Efficiency (NUE) while managing farm labor and transport costs.';

  return {
    recommendedKey,
    recommendedStrat,
    scores,
    recommendedScores,
    weights,
    whyPoints,
    whyNotOnlyUrea,
    whyNotOnlyCompost,
    whyIntegrated,
    confidenceLevel,
    confidenceReason,
    assumptions: [
      `Assumes farm area of ${farmArea} ${areaUnit} planted with ${crop.name}.`,
      `Fertilizer costs evaluated using selected reference prices (e.g., Urea ₹266.50/45 kg MRP reference) or active user local dealer overrides.`,
      `Assumption: 35% first-year N availability is used for this demonstration model. Actual nutrient availability varies with amendment characteristics, soil, climate, and management.`,
      `Demonstration calculation: Organic quantities illustrate nutrient-density and bulk-material trade-offs based on assumed first-year available-N fractions.`,
      `Decision weights: Cost (${Math.round(weights.cost * 100)}%), Efficiency (${Math.round(weights.efficiency * 100)}%), Practicality (${Math.round(weights.practicality * 100)}%), Sustainability (${Math.round(weights.sustainability * 100)}%).`
    ],
    safetyNote: 'Educational Decision-Support Prototype — Not an Agronomic Field Prescription. Evaluated using selected reference prices or user-entered local prices. Actual field applications should be verified with local agricultural extension officers, qualified agronomists, and laboratory soil test reports.'
  };
}
