import React from 'react';
import ParticleEffect from './ParticleEffect'; 
import './Hero.css';
import MusicToggle from './MusicToggle';
import NavButtons from './NavButtons';
const Hero = () => {
  return (
    <section className="hero-container">
      
      {/* 1. BACKGROUND */}
      <div className="hero-background">
         <ParticleEffect />
      </div>

      {/* 2. CONTENT */}
      <div className="hero-content">
        
        {/* --- HEADER --- */}
        <header className="hero-header">
          <div className="logo-section">
            <div className="logo-box">S</div>
            <div className="logo-text">
              <h1>SHRISH</h1>
              <p className="logo-sub" style={{ color: '#EE344A' }}>Design by Shrish <br/> Est. 2026</p>
            </div>
          </div>

          <nav className="hero-nav">
            <ul className="flex gap-8 md:gap-12"> {/* Ensure flex is here if using tailwind for layout, or rely on css */}
              <NavButtons />
              </ul>
          </nav>
        </header>

        {/* --- MIDDLE GRID --- */}
        <div className="hero-grid">
          <div className="grid-label">Design &<br />Engineering</div>
          <div className="grid-desc">
            <h3>What I Do</h3>
            <p>I create high-impact digital experiences for brands, websites, and digital products.</p>
          </div>
        </div>

        {/* --- BOTTOM HERO TEXT (UPDATED WITH ANIMATION) --- */}
        <div className="hero-bottom">
          <div className="hero-headline">
            {/* Line 1 */}
            <div className="block">
                <div className="reveal-container">
                    <span className="reveal-content">I blend code</span>
                    <div className="reveal-block" style={{ animationDelay: "0.1s" }}></div>
                </div>
            </div>
            
            {/* Line 2 (Hollow Text) */}
            <div className="block">
                <div className="reveal-container">
                    <span className="reveal-content outline-text">creativity</span>
                    <div className="reveal-block" style={{ animationDelay: "0.3s" }}></div>
                </div>
            </div>
            
            {/* Line 3 */}
            <div className="block">
                <div className="reveal-container">
                    <span className="reveal-content">and modern web</span>
                    <div className="reveal-block" style={{ animationDelay: "0.5s" }}></div>
                </div>
            </div>

            {/* Line 4 */}
            <div className="block">
                <div className="reveal-container">
                    <span className="reveal-content">Experiences</span>
                    <div className="reveal-block" style={{ animationDelay: "0.7s" }}></div>
                </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
             <MusicToggle />
          </div>
          <div className="hero-footer">
            <p>Open to freelance, contract or full-time... <span className="highlight">Schedule a call</span></p>
            <p>6 full cases • 76 archive fragments</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;