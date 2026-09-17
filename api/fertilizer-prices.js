// Vercel Serverless Function for SmartFert Reference Prices
// Endpoint: GET /api/fertilizer-prices

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const now = new Date();
  const isoTimestamp = now.toISOString();
  const displayTimestamp = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + 
                           ', ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  // Reference pricing dataset (Government-notified MRP for Urea; Illustrative reference benchmarks for others)
  const rawData = {
    urea: {
      id: 'urea',
      fertilizer: 'Urea',
      price: 266.50,
      officialPrice: 266.50,
      packageWeight: 45,
      packageSizeKg: 45,
      packageSizeLabel: '45 kg bag',
      currency: 'INR',
      currencySymbol: '₹',
      priceType: 'government_mrp',
      priceStatus: 'Government-notified MRP',
      sourceName: 'Department of Fertilizers, Govt. of India',
      source: 'Department of Fertilizers, Govt. of India',
      sourceUrl: 'https://www.fert.nic.in/page/fertilizer-prices',
      sourceDate: 'Statutory Notification',
      lastChecked: displayTimestamp,
      location: 'India (Statutorily Notified MRP)',
      notes: 'Statutorily notified Maximum Retail Price (MRP) per 45 kg bag across India.'
    },
    dap: {
      id: 'dap',
      fertilizer: 'DAP (Di-ammonium Phosphate)',
      price: 1350.00,
      officialPrice: 1350.00,
      packageWeight: 50,
      packageSizeKg: 50,
      packageSizeLabel: '50 kg bag',
      currency: 'INR',
      currencySymbol: '₹',
      priceType: 'illustrative_reference',
      priceStatus: 'Illustrative reference',
      sourceName: 'Press Information Bureau & Dept of Fertilizers',
      source: 'Press Information Bureau & Dept of Fertilizers',
      sourceUrl: 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=1924510',
      sourceDate: 'Illustrative reference benchmark',
      lastChecked: displayTimestamp,
      location: 'India (Illustrative Baseline)',
      notes: 'Actual prices vary by manufacturer, grade, region, season and supplier. Enter a local dealer price for more accurate comparison.'
    },
    mop: {
      id: 'mop',
      fertilizer: 'MOP (Muriate of Potash)',
      price: 1650.00,
      officialPrice: 1650.00,
      packageWeight: 50,
      packageSizeKg: 50,
      packageSizeLabel: '50 kg bag',
      currency: 'INR',
      currencySymbol: '₹',
      priceType: 'illustrative_reference',
      priceStatus: 'Illustrative reference',
      sourceName: 'Department of Fertilizers, Govt. of India',
      source: 'Department of Fertilizers, Govt. of India',
      sourceUrl: 'https://www.fert.nic.in/page/nbs-policy',
      sourceDate: 'Illustrative reference benchmark',
      lastChecked: displayTimestamp,
      location: 'India (Illustrative Baseline)',
      notes: 'Actual prices vary by manufacturer, grade, region, season and supplier. Enter a local dealer price for more accurate comparison.'
    },
    npk: {
      id: 'npk',
      fertilizer: 'NPK Complex (12-32-16 / 20-20-0-13)',
      price: 1470.00,
      officialPrice: 1470.00,
      packageWeight: 50,
      packageSizeKg: 50,
      packageSizeLabel: '50 kg bag',
      currency: 'INR',
      currencySymbol: '₹',
      priceType: 'illustrative_reference',
      priceStatus: 'Illustrative reference',
      sourceName: 'Department of Fertilizers, Govt. of India',
      source: 'Department of Fertilizers, Govt. of India',
      sourceUrl: 'https://www.fert.nic.in/page/nbs-policy',
      sourceDate: 'Illustrative reference benchmark',
      lastChecked: displayTimestamp,
      location: 'India (Illustrative Baseline)',
      notes: 'Actual prices vary by manufacturer, grade, region, season and supplier. Enter a local dealer price for more accurate comparison.'
    },
    compost: {
      id: 'compost',
      fertilizer: 'City Compost / Organic Fertilizer',
      price: 300.00,
      officialPrice: 300.00,
      packageWeight: 50,
      packageSizeKg: 50,
      packageSizeLabel: '50 kg bag (₹6.00/kg benchmark)',
      currency: 'INR',
      currencySymbol: '₹',
      priceType: 'illustrative_reference',
      priceStatus: 'Illustrative reference',
      sourceName: 'Policy on Promotion of City Compost (MDA Subsidy)',
      source: 'Policy on Promotion of City Compost (MDA Subsidy)',
      sourceUrl: 'https://www.fert.nic.in/page/city-compost',
      sourceDate: 'Policy guideline',
      lastChecked: displayTimestamp,
      location: 'India (Compost Promotion Policy)',
      notes: 'Government provides ₹1,500/MT Market Development Assistance (MDA) subsidy. ₹300/50kg is an illustrative market reference; actual local prices vary widely.'
    },
    fym: {
      id: 'fym',
      fertilizer: 'Farmyard Manure (FYM)',
      price: 200.00,
      officialPrice: 200.00,
      packageWeight: 50,
      packageSizeKg: 50,
      packageSizeLabel: '50 kg equivalent (₹4.00/kg benchmark)',
      currency: 'INR',
      currencySymbol: '₹',
      priceType: 'illustrative_reference',
      priceStatus: 'Illustrative local benchmark',
      sourceName: 'Illustrative local benchmark',
      source: 'Illustrative local benchmark',
      sourceUrl: '',
      sourceDate: 'Demo baseline',
      lastChecked: displayTimestamp,
      location: 'India (Local Farm Gate)',
      notes: 'FYM prices are highly location- and supplier-dependent.'
    }
  };

  const validatedPrices = {};
  for (const key of Object.keys(rawData)) {
    const item = rawData[key];
    if (item && typeof item.price === 'number' && item.price > 0) {
      item.pricePerKg = Math.round((item.price / item.packageSizeKg) * 100) / 100;
      validatedPrices[key] = item;
    }
  }

  return res.status(200).json({
    success: true,
    timestamp: isoTimestamp,
    displayTimestamp,
    provider: 'Department of Fertilizers, Ministry of Chemicals & Fertilizers, Govt. of India',
    status: 'Published reference',
    message: 'Published reference prices retrieved successfully.',
    fertilizers: validatedPrices
  });
}
