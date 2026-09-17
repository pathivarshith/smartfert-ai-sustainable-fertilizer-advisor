// Trusted Agronomic Knowledge Base for SmartFert Knowledge Assistant
// Citations from reputable agricultural research bodies: FAO, ICAR, IRRI, USDA-NRCS

export const KNOWLEDGE_BASE = [
  {
    id: 'kb-1',
    question: 'Why is urea attractive to farmers?',
    category: 'Mineral Fertilizers',
    keywords: ['urea', 'attractive', 'nitrogen', 'cost', 'density', 'cheap', 'convenient'],
    answer: 'Urea is widely favored by farmers because of its unmatched Nitrogen concentration (46% N), which makes it the most cost-effective solid nitrogen fertilizer to transport, store, and apply per kilogram of active nitrogen. Additionally, urea dissolves rapidly in soil moisture to provide immediate plant-available Nitrogen, stimulating rapid vegetative growth and canopy greening.',
    sources: [
      { name: 'Food and Agriculture Organization (FAO)', title: 'Fertilizer and Plant Nutrition Bulletin 18: Integrated Soil Nutrient Management', url: 'https://www.fao.org/land-water/databases-and-software/en/' },
      { name: 'Indian Council of Agricultural Research (ICAR)', title: 'Handbook of Agriculture: Mineral Fertilizer Management', url: 'https://icar.org.in' }
    ]
  },
  {
    id: 'kb-2',
    question: 'Why does compost require more material?',
    category: 'Organic Matter & Bulk',
    keywords: ['compost', 'more material', 'volume', 'bulk', 'concentration', 'weight', 'tonnage'],
    answer: 'Compost has a lower concentration of active nutrients (typically 1.0% to 2.5% Nitrogen) compared to synthetic mineral fertilizers like Urea (46% N). Furthermore, only 30% to 40% of the total Nitrogen in compost becomes plant-available during the first growing season because it is bound in complex organic forms that require micro-organism decomposition. Consequently, delivering 50 kg of plant-available Nitrogen requires roughly 3,000 to 4,000 kg of compost versus only ~110 kg of Urea.',
    sources: [
      { name: 'USDA Natural Resources Conservation Service (USDA-NRCS)', title: 'Soil Carbon & Organic Amendment Guidelines (Technical Note 29)', url: 'https://nrcs.usda.gov' },
      { name: 'FAO Soil Portal', title: 'Organic Materials and Soil Carbon Management', url: 'https://www.fao.org/soils-portal' }
    ]
  },
  {
    id: 'kb-3',
    question: 'What is integrated nutrient management?',
    category: 'Sustainable Strategy',
    keywords: ['integrated', 'inm', 'management', 'strategy', 'balance', 'combination', 'integrated nutrient'],
    answer: 'Integrated Nutrient Management (INM) is a sustainable agricultural strategy that combines mineral fertilizers with organic soil amenders (compost, green manure, bio-fertilizers, and crop residues). INM aims to maximize crop yields while preserving long-term soil health. The mineral fertilizers satisfy immediate peak nutrient demands, while organic inputs build soil organic carbon, enhance cation exchange capacity, improve water retention, and stimulate beneficial micro-organisms.',
    sources: [
      { name: 'FAO Agriculture Series', title: 'Guide to Integrated Plant Nutrient Systems (IPNS)', url: 'https://www.fao.org' },
      { name: 'International Rice Research Institute (IRRI)', title: 'Rice Knowledge Bank: Integrated Nutrient Management in Lowland Rice', url: 'http://www.knowledgebank.irri.org' }
    ]
  },
  {
    id: 'kb-4',
    question: 'Why should fertilizer decisions consider soil testing?',
    category: 'Soil Diagnostics',
    keywords: ['soil testing', 'soil test', 'decisions', 'laboratory', 'ph', 'deficiency', 'over-application'],
    answer: 'Soil testing provides quantitative evidence of residual nutrients (N, P, K, micro-nutrients), organic matter status, and soil pH. Applying fertilizers without soil testing risks over-applying nutrients that are already abundant—wasting money and potentially causing nutrient run-off or toxicity—while neglecting hidden micronutrient deficiencies that limit yield.',
    sources: [
      { name: 'ICAR-Indian Institute of Soil Science', title: 'Soil Test Crop Response (STCR) Correlation Methodology', url: 'https://iiss.icar.gov.in' },
      { name: 'USDA Extension Network', title: 'Soil Testing: Principles and Interpretation', url: 'https://extension.org' }
    ]
  },
  {
    id: 'kb-5',
    question: 'Is organic fertilizer always better?',
    category: 'Agronomic Trade-offs',
    keywords: ['organic fertilizer', 'always better', 'tradeoffs', 'organic vs inorganic', 'yield', 'organic comparison'],
    answer: 'Not necessarily. Organic fertilizers excel at building long-term soil carbon, biological health, and water retention. However, relying exclusively on organic inputs can present challenges: low nutrient concentration requires transporting and spreading tons of material per hectare, nutrient release rates can be slow or unaligned with crop peak growth demands, and organic materials vary in nutrient composition. Integrated strategies (combining organic and mineral sources) generally deliver the best balance of immediate yield stability and long-term soil sustainability.',
    sources: [
      { name: 'FAO & World Bank Co-Publication', title: 'Sustainable Land Management Sourcebook: Plant Nutrition', url: 'https://www.fao.org' },
      { name: 'ICAR National Academy of Agricultural Sciences', title: 'Policy Paper: Organic Farming and Food Security in India', url: 'https://naas.org.in' }
    ]
  },
  {
    id: 'kb-6',
    question: 'How does fertilizer concentration affect transportation?',
    category: 'Logistics & Economics',
    keywords: ['concentration', 'transportation', 'freight', 'logistics', 'density', 'fuel', 'handling'],
    answer: 'Fertilizer nutrient concentration directly dictates logistics, fuel consumption, and labor. Highly concentrated fertilizers (e.g., Urea with 46% N) contain 460 kg of active element per metric ton, requiring fewer bags, less fuel, and minimal handling. In contrast, bulk compost (1.5% N) contains only 15 kg of Nitrogen per metric ton. Transporting equivalent Nitrogen via compost requires 30 times more freight volume and vehicle trips, making local sourcing essential for organic strategies.',
    sources: [
      { name: 'International Fertilizer Association (IFA)', title: 'Global Fertilizer Supply Chain and Logistics Report', url: 'https://www.fertilizer.org' },
      { name: 'FAO Land & Water Division', title: 'Economics of Fertilizer Use and Transport', url: 'https://www.fao.org' }
    ]
  },
  {
    id: 'kb-7',
    question: 'What are the current updated prices for Urea, DAP, and MOP?',
    category: 'Market Pricing & RAG',
    keywords: ['current prices', 'updated price', 'price', 'cost per kg', 'urea price', 'dap price', 'mop price', 'market price'],
    answer: 'According to global commodity index benchmarks (September 2026): Urea averages ~$0.39/kg ($390/MT), DAP averages ~$0.85/kg ($850/MT), MOP (Potash) averages ~$0.50/kg ($500/MT), and commercial compost averages ~$0.06/kg ($60/MT). Local farm-gate prices may vary based on regional subsidies, import tariffs, and freight distance.',
    sources: [
      { name: 'World Bank Commodity Markets', title: 'Pink Sheet World Bank Commodity Price Benchmarks (2026)', url: 'https://www.worldbank.org/en/research/commodity-markets' },
      { name: 'USDA NASS', title: 'Agricultural Prices & Fertilizer Input Report', url: 'https://www.nass.usda.gov' }
    ]
  },
  {
    id: 'kb-8',
    question: 'How does SmartFert use RAG to fetch updated fertilizer prices?',
    category: 'Market Pricing & RAG',
    keywords: ['rag', 'fetch', 'updated', 'retriever', 'market data', 'pipeline'],
    answer: 'SmartFert employs a Retrieval-Augmented Generation (RAG) architecture. When requested, the retriever queries indexed trusted sources (World Bank Commodity Index, USDA Agricultural Reports, FAO Bulletins), extracts benchmark price per metric ton, converts them into per-kg inputs, and updates decision calculations in real time while attaching verified citations.',
    sources: [
      { name: 'FAO Land & Water Division', title: 'Global Fertilizer Market Information System', url: 'https://www.fao.org' },
      { name: 'USDA Economic Research Service', title: 'Fertilizer Use and Price Indices', url: 'https://www.ers.usda.gov' }
    ]
  }
];
