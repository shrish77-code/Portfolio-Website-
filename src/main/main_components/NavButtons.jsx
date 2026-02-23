// src/main/main_components/NavButtons.jsx
import React, { useState } from 'react';
import './NavButtons.css';

const NavButtons = () => {
  const [isAboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className="nav-group">
      
      {/* 1. ABOUT (With Dropdown) */}
      <div 
        className="dropdown-wrapper"
        onMouseEnter={() => setAboutOpen(true)}
        onMouseLeave={() => setAboutOpen(false)}
      >
        <button className={`nav-item ${isAboutOpen ? 'active' : ''}`}>
          ABOUT
        </button>

        {/* The Dropdown Menu */}
        <div className={`nav-dropdown ${isAboutOpen ? 'open' : ''}`}>
          <a href="#about" className="dropdown-link" onClick={() => setAboutOpen(false)}>
            .know me
          </a>
          <a className="dropdown-link" onClick={() => setAboutOpen(false)}>
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