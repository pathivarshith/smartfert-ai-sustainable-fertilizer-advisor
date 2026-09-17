import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroLanding from './components/HeroLanding';
import SimulatorForm from './components/Simulator/SimulatorForm';
import ComparisonCards from './components/Analysis/ComparisonCards';
import AIRecommendation from './components/Analysis/AIRecommendation';
import VisualScorecard from './components/Analysis/VisualScorecard';
import CostChart from './components/Analysis/CostChart';
import KnowledgeAssistant from './components/KnowledgeAssistant';
import ResponsibleAI from './components/ResponsibleAI';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

import { runFertilizerAnalysis } from './logic/analysisEngine';
import { evaluateRecommendation } from './logic/recommendationEngine';
import { fetchOfficialFertilizerPrices, OFFICIAL_GOVT_PRICE_DATASET } from './services/fertilizerPriceService';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Official Govt Price State
  const [officialPrices, setOfficialPrices] = useState(OFFICIAL_GOVT_PRICE_DATASET);
  const [userLocalPrices, setUserLocalPrices] = useState({});
  const [isRefreshingPrices, setIsRefreshingPrices] = useState(false);
  const [priceFetchMessage, setPriceFetchMessage] = useState('');

  // Initial Demo Payload state
  const defaultDemoInputs = {
    cropId: 'rice',
    farmArea: 2,
    areaUnit: 'acres',
    soilTestAvailable: 'Yes',
    soilStatus: {
      n: 'Medium',
      p: 'Medium',
      k: 'Medium',
      organicMatter: 'Low',
      ph: '6.5'
    },
    selectedFertilizers: ['urea', 'compost', 'dap', 'mop'],
    userPriority: 'Balanced'
  };

  const [simulatorInputs, setSimulatorInputs] = useState(defaultDemoInputs);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Run initial default analysis on mount
  useEffect(() => {
    // Initial fetch of government prices
    fetchOfficialFertilizerPrices().then((res) => {
      if (res && res.prices) {
        setOfficialPrices(res.prices);
        executeAnalysis(defaultDemoInputs, res.prices, userLocalPrices);
      } else {
        executeAnalysis(defaultDemoInputs, OFFICIAL_GOVT_PRICE_DATASET, userLocalPrices);
      }
    });
  }, []);

  const executeAnalysis = (inputs, currentOfficialPrices = officialPrices, currentLocalPrices = userLocalPrices) => {
    const fullInputs = {
      ...inputs,
      officialPrices: currentOfficialPrices,
      userLocalPrices: currentLocalPrices
    };
    const analysis = runFertilizerAnalysis(fullInputs);
    const rec = evaluateRecommendation(analysis);

    setSimulatorInputs(inputs);
    setAnalysisResult(analysis);
    setRecommendation(rec);
  };

  const handleUserLocalPriceChange = (fertId, val) => {
    const updatedLocal = { ...userLocalPrices, [fertId]: val };
    setUserLocalPrices(updatedLocal);
    executeAnalysis(simulatorInputs, officialPrices, updatedLocal);
  };

  const handleRefreshOfficialPrices = async () => {
    setIsRefreshingPrices(true);
    setPriceFetchMessage('Fetching latest prices from Department of Fertilizers, Govt. of India...');

    const res = await fetchOfficialFertilizerPrices();

    setIsRefreshingPrices(false);
    if (res.prices) {
      setOfficialPrices(res.prices);
      setPriceFetchMessage(res.message);
      setToastMessage(`🏛️ ${res.message}`);
      executeAnalysis(simulatorInputs, res.prices, userLocalPrices);
    } else {
      setPriceFetchMessage(res.message);
      setToastMessage(`⚠️ ${res.message}`);
    }

    setTimeout(() => {
      setToastMessage('');
      setPriceFetchMessage('');
    }, 5000);
  };

  const handleStartAnalysis = () => {
    setActiveTab('simulator');
    const el = document.getElementById('simulator-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRunCustomAnalysis = (inputs) => {
    executeAnalysis(inputs, officialPrices, userLocalPrices);
    setToastMessage('SmartFert AI analysis calculated successfully using active fertilizer prices!');
    setTimeout(() => setToastMessage(''), 4000);

    setTimeout(() => {
      const el = document.getElementById('ai-recommendation-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleLoadDemo = () => {
    const demoPayload = {
      cropId: 'rice',
      farmArea: 2,
      areaUnit: 'acres',
      soilTestAvailable: 'Yes',
      soilStatus: {
        n: 'Medium',
        p: 'Medium',
        k: 'Medium',
        organicMatter: 'Low',
        ph: '6.5'
      },
      selectedFertilizers: ['urea', 'compost', 'dap', 'mop'],
      userPriority: 'Balanced'
    };

    executeAnalysis(demoPayload, officialPrices, userLocalPrices);
    setActiveTab('simulator');

    setToastMessage('⚡ Demo Scenario loaded: 2 acres of Rice (Reference Prices / Active Local Rates)');
    setTimeout(() => setToastMessage(''), 5000);

    setTimeout(() => {
      const el = document.getElementById('simulator-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <div>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLoadDemo={handleLoadDemo} 
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000, background: 'var(--primary-900)', color: '#ffffff', border: '1px solid var(--primary-400)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem', maxWidth: '480px', animation: 'fadeIn 0.3s' }}>
          <Sparkles size={20} style={{ color: '#34d399', flexShrink: 0 }} />
          <div>{toastMessage}</div>
        </div>
      )}

      {/* Main Page View Switcher */}
      {activeTab === 'home' && (
        <HeroLanding 
          onStartAnalysis={handleStartAnalysis}
          onLoadDemo={handleLoadDemo}
          onLearnMore={() => setActiveTab('about')}
        />
      )}

      {/* Main Container */}
      <div className="container">
        {/* Simulator Form Section */}
        <section style={{ display: activeTab === 'home' || activeTab === 'simulator' ? 'block' : 'none' }}>
          <SimulatorForm 
            initialValues={simulatorInputs} 
            onSubmitAnalysis={handleRunCustomAnalysis}
            onLoadDemo={handleLoadDemo}
            officialPrices={officialPrices}
            userLocalPrices={userLocalPrices}
            onUserLocalPriceChange={handleUserLocalPriceChange}
            onRefreshOfficialPrices={handleRefreshOfficialPrices}
            isRefreshingPrices={isRefreshingPrices}
            priceFetchMessage={priceFetchMessage}
          />
        </section>

        {/* Results Dashboard Section */}
        {analysisResult && recommendation && (activeTab === 'home' || activeTab === 'simulator') && (
          <section>
            <ComparisonCards 
              analysisResult={analysisResult} 
              recommendation={recommendation} 
            />

            <AIRecommendation 
              analysisResult={analysisResult} 
              recommendation={recommendation} 
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
              <VisualScorecard recommendation={recommendation} />
              <CostChart analysisResult={analysisResult} />
            </div>
          </section>
        )}

        {/* Knowledge Assistant View */}
        {activeTab === 'assistant' && (
          <KnowledgeAssistant />
        )}

        {/* Responsible AI View */}
        {activeTab === 'responsible' && (
          <ResponsibleAI />
        )}

        {/* About Section View */}
        {activeTab === 'about' && (
          <AboutSection />
        )}
      </div>

      <Footer />
    </div>
  );
}
