import React, { useState } from 'react';
import { KNOWLEDGE_BASE } from '../data/knowledgeBase.js';
import { Bot, Send, BookOpen, ExternalLink, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function KnowledgeAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am SmartFert Assistant. Ask me any technical question about crop nutrients, urea, compost, soil testing, or integrated nutrient management.',
      sources: []
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');

  const handleAskQuestion = (questionText) => {
    const qText = questionText || inputQuery;
    if (!qText.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: qText }];
    setMessages(newMessages);
    setInputQuery('');

    // RAG Retrieval Logic
    setTimeout(() => {
      const lowerQ = qText.toLowerCase();
      let matchedKb = KNOWLEDGE_BASE.find(kb => 
        kb.keywords.some(kw => lowerQ.includes(kw)) || lowerQ.includes(kb.question.toLowerCase())
      );

      if (!matchedKb) {
        matchedKb = {
          answer: 'Integrated Nutrient Management (INM) balances mineral fertilizers with organic amenders to satisfy crop nutrition while preserving long-term soil structure and biological health. For site-specific recommendations, always consult local extension services.',
          sources: [
            { name: 'Food and Agriculture Organization (FAO)', title: 'Fertilizer & Soil Portal', url: 'https://www.fao.org/soils-portal' }
          ]
        };
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: matchedKb.answer,
          sources: matchedKb.sources || []
        }
      ]);
    }, 400);
  };

  return (
    <div className="knowledge-assistant" id="knowledge-assistant-section">
      <div className="assistant-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.6rem', borderRadius: '12px' }}>
            <Bot size={24} />
          </div>
          <div>
            <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 800 }}>Ask SmartFert AI Assistant</h2>
            <p style={{ color: '#a7f3d0', fontSize: '0.88rem' }}>
              Ground-truth agricultural Q&A powered by trusted agronomic sources (FAO, ICAR, USDA-NRCS).
            </p>
          </div>
        </div>
      </div>

      {/* RAG Flow Diagram */}
      <div className="rag-diagram">
        <span className="rag-step">💬 User Question</span>
        <ArrowRight size={14} />
        <span className="rag-step">🔍 Semantic Retriever</span>
        <ArrowRight size={14} />
        <span className="rag-step" style={{ background: '#d1fae5', borderColor: '#34d399' }}>
          📚 Trusted Agricultural KB
        </span>
        <ArrowRight size={14} />
        <span className="rag-step">⚡ AI Response Generator</span>
        <ArrowRight size={14} />
        <span className="rag-step" style={{ background: '#fef3c7', borderColor: '#f59e0b' }}>
          ✅ Answer + Verified Sources
        </span>
      </div>

      {/* Preset Question Chips */}
      <div className="preset-chip-list">
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', alignSelf: 'center' }}>
          Suggested Questions:
        </span>
        {KNOWLEDGE_BASE.map(kb => (
          <button 
            key={kb.id} 
            className="preset-chip"
            onClick={() => handleAskQuestion(kb.question)}
          >
            {kb.question}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((m, idx) => (
          <div key={idx} className={`chat-bubble ${m.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
            <div>{m.text}</div>
            
            {m.sources && m.sources.length > 0 && (
              <div className="source-citation">
                <div style={{ fontWeight: 700, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary-800)' }}>
                  <BookOpen size={14} /> Trusted Sources:
                </div>
                {m.sources.map((src, sIdx) => (
                  <a 
                    key={sIdx} 
                    href={src.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="source-tag"
                  >
                    <ShieldCheck size={12} /> {src.name} — {src.title} <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '0.75rem' }}>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Ask a question about fertilizers, soil health, or NPK balance..." 
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAskQuestion()}
        />
        <button 
          className="btn-primary" 
          onClick={() => handleAskQuestion()}
          style={{ padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-md)' }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
