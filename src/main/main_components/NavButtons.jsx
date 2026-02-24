// src/main/main_components/NavButtons.jsx
import React, { useState } from 'react';
import './NavButtons.css';

const NavButtons = () => {
  const [isAboutOpen, setAboutOpen] = useState(false);

  // Toggle function for mobile tap support
  const toggleAbout = (e) => {
    // Prevent default if it's a link behavior (optional safety)
    if(e) e.preventDefault();
    setAboutOpen(!isAboutOpen);
  };

  return (
    <nav className="nav-group">
      
      {/* 1. ABOUT (With Dropdown) */}
      <div 
        className="dropdown-wrapper"
        onMouseEnter={() => setAboutOpen(true)}
        onMouseLeave={() => setAboutOpen(false)}
      >
        {/* ADDED: onClick={toggleAbout} to support mobile taps */}
        <button 
          className={`nav-item ${isAboutOpen ? 'active' : ''}`}
          onClick={toggleAbout}
        >
          ABOUT
        </button>

        {/* The Dropdown Menu */}
        <div className={`nav-dropdown ${isAboutOpen ? 'open' : ''}`}>
          <a href="#about" className="dropdown-link" onClick={() => setAboutOpen(false)}>
            .know me
          </a>
          {/* Added href="#" or button logic to ensure pointer cursor */}
          <a className="dropdown-link" onClick={() => setAboutOpen(false)} style={{cursor: 'pointer'}}>
            .know me more
          </a>
        </div>
      </div>

      {/* 2. SKILLS (Standard Link) */}
      <a href="#skills" className="nav-item">
        SKILLS
      </a>

      {/* 3. PROJECTS (Standard Link) */}
      <a href="#projects" className="nav-item">
        PROJECTS
      </a>

    </nav>
  );
};

export default NavButtons;