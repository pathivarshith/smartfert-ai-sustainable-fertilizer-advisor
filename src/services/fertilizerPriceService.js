// Fertilizer Price Service for SmartFert (Frontend Service Layer)
// Executes HTTP fetch() calls to GET http://localhost:5001/api/fertilizer-prices
// Implements validation, local storage caching, status classification, and user local price overrides.

const CACHE_KEY = 'smartfert_govt_prices_v1';
const BACKEND_API_URL = 'http://localhost:5001/api/fertilizer-prices';

export const OFFICIAL_GOVT_PRICE_DATASET = {
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
    lastChecked: 'Baseline reference',
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
    lastChecked: 'Baseline reference',
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
    lastChecked: 'Baseline reference',
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
    lastChecked: 'Baseline reference',
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
    lastChecked: 'Baseline reference',
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
    lastChecked: 'Baseline reference',
    location: 'India (Local Farm Gate)',
    notes: 'FYM prices are highly location- and supplier-dependent.'
  }
};

/**
 * Validate price item structure and numeric values
 */
export function validatePriceData(item) {
  if (!item || typeof item !== 'object') return false;
  const pkgPrice = item.price || item.officialPrice;
  const pkgWeight = item.packageWeight || item.packageSizeKg;
  if (typeof pkgPrice !== 'number' || pkgPrice <= 0) return false;
  if (typeof pkgWeight !== 'number' || pkgWeight <= 0) return false;
  return true;
}

/**
 * Save valid price dataset to localStorage cache
 */
function saveToCache(priceMap, lastCheckedTimestamp) {
  try {
    const payload = {
      timestamp: new Date().toISOString(),
      lastChecked: lastCheckedTimestamp,
      prices: priceMap
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('SmartFert: Could not save prices to local storage cache', err);
  }
}

/**
 * Retrieve cached prices from localStorage
 */
function getFromCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.prices) {
      return {
        prices: parsed.prices,
        lastChecked: parsed.lastChecked
      };
    }
  } catch (err) {
    console.warn('SmartFert: Error reading cached fertilizer prices', err);
  }
  return null;
}

/**
 * Fetch published reference fertilizer prices via HTTP GET /api/fertilizer-prices
 */
export async function fetchOfficialFertilizerPrices() {
  try {
    // Genuine HTTP fetch request to backend API server
    const response = await fetch(BACKEND_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.success && data.fertilizers) {
      const displayTimestamp = data.displayTimestamp || new Date().toLocaleTimeString();
      const refreshedPrices = {};

      Object.keys(data.fertilizers).forEach(key => {
        const item = { ...data.fertilizers[key] };
        item.lastChecked = displayTimestamp;
        const pkgPrice = item.price || item.officialPrice;
        const pkgWeight = item.packageWeight || item.packageSizeKg || 50;
        item.pricePerKg = Math.round((pkgPrice / pkgWeight) * 100) / 100;

        if (validatePriceData(item)) {
          refreshedPrices[key] = item;
        }
      });

      // Cache validated HTTP response
      saveToCache(refreshedPrices, displayTimestamp);

      return {
        success: true,
        status: 'Reference prices loaded',
        message: 'Reference prices loaded successfully from backend server.',
        prices: refreshedPrices,
        lastChecked: displayTimestamp
      };
    } else {
      throw new Error('Malformed API response structure from server.');
    }
  } catch (error) {
    console.warn('SmartFert: HTTP fetch to backend API failed, attempting cache fallback:', error.message);

    // Fallback 1: Try localStorage cache
    const cached = getFromCache();
    if (cached && cached.prices) {
      return {
        success: false,
        status: 'Reference prices (Cached)',
        message: 'Unable to retrieve fresh reference prices. Using previously saved reference prices.',
        prices: cached.prices,
        lastChecked: cached.lastChecked || 'Previously saved'
      };
    }

    // Fallback 2: Baseline demo fallback
    const fallbackPrices = {};
    Object.keys(OFFICIAL_GOVT_PRICE_DATASET).forEach(key => {
      const item = { ...OFFICIAL_GOVT_PRICE_DATASET[key] };
      const pkgPrice = item.price || item.officialPrice;
      const pkgWeight = item.packageWeight || item.packageSizeKg || 50;
      item.pricePerKg = Math.round((pkgPrice / pkgWeight) * 100) / 100;
      fallbackPrices[key] = item;
    });

    return {
      success: false,
      status: 'Demo fallback',
      message: 'Unable to connect to price server. Using baseline reference values.',
      prices: fallbackPrices,
      lastChecked: 'Demo baseline'
    };
  }
}

/**
 * Get current active price per kg for calculations, accounting for user local overrides
 */
export function getEffectiveFertilizerPrice(fertId, officialPrices, userLocalPrices = {}) {
  const govtItem = officialPrices[fertId] || OFFICIAL_GOVT_PRICE_DATASET[fertId] || OFFICIAL_GOVT_PRICE_DATASET.urea;
  const userEnteredPrice = userLocalPrices[fertId];
  const pkgWeight = govtItem.packageWeight || govtItem.packageSizeKg || 50;

  // User local price override
  if (userEnteredPrice !== undefined && userEnteredPrice !== '' && !isNaN(Number(userEnteredPrice)) && Number(userEnteredPrice) > 0) {
    const overridePkgPrice = Number(userEnteredPrice);
    const perKg = Math.round((overridePkgPrice / pkgWeight) * 100) / 100;
    return {
      pricePerKg: perKg,
      packagePrice: overridePkgPrice,
      packageSizeKg: pkgWeight,
      packageSizeLabel: govtItem.packageSizeLabel,
      currencySymbol: govtItem.currencySymbol || '₹',
      priceType: 'user_entered',
      priceStatus: 'User entered',
      sourceLabel: 'User Local Dealer Price',
      sourceUrl: null,
      sourceDate: 'User specified',
      lastChecked: govtItem.lastChecked || 'User specified',
      isOverridden: true
    };
  }

  // Reference / Demo price
  const pkgPrice = govtItem.price || govtItem.officialPrice;
  const perKg = Math.round((pkgPrice / pkgWeight) * 100) / 100;

  let defaultStatus = 'Illustrative reference';
  if (govtItem.priceType === 'government_mrp' || fertId === 'urea') {
    defaultStatus = 'Government-notified MRP';
  } else if (fertId === 'fym') {
    defaultStatus = 'Illustrative local benchmark';
  }

  return {
    pricePerKg: perKg,
    packagePrice: pkgPrice,
    packageSizeKg: pkgWeight,
    packageSizeLabel: govtItem.packageSizeLabel,
    currencySymbol: govtItem.currencySymbol || '₹',
    priceType: govtItem.priceType || (fertId === 'urea' ? 'government_mrp' : 'illustrative_reference'),
    priceStatus: govtItem.priceStatus || defaultStatus,
    sourceLabel: govtItem.sourceName || govtItem.source || 'Reference source',
    sourceUrl: govtItem.sourceUrl || '',
    sourceDate: govtItem.sourceDate || '',
    lastChecked: govtItem.lastChecked || 'Baseline reference',
    notes: govtItem.notes || '',
    isOverridden: false
  };
}
