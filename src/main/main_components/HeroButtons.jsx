// src/main/main_components/HeroButtons.jsx
import React, { useState } from 'react';
import './HeroButtons.css';

const HeroButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hero-btn-container">
      
      {/* 1. THE TRIGGER BUTTON */}
      <button 
        className="btn-tech-trigger" 
        onClick={() => setIsOpen(!isOpen)}
      >
        ABOUT_ME 
        <span style={{ fontSize: '0.7em' }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* 2. THE DROPDOWN MENU */}
      <div className={`tech-dropdown ${isOpen ? 'active' : ''}`}>
        
        {/* Option A: Scrolls to Intro Video */}
        <a 
          href="#about" 
          className="tech-link"
          onClick={() => setIsOpen(false)}
        >
          .know me <span>→</span>
        </a>

        {/* Option B: Scrolls to Skills/Tech Stack */}
        <a 
          href="#skills" 
          className="tech-link"
          onClick={() => setIsOpen(false)}
        >
          .know me more <span>→</span>
        </a>

      </div>
    </div>
  );
};

export default HeroButtons;