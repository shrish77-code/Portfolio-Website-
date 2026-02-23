import React from 'react';
import { GridScan } from './GridScan'; 
import { FaGithub, FaLinkedin } from 'react-icons/fa'; 
import './Footer.css'; // Import the CSS file here

const Footer = () => {
  return (
    <footer id="contact" className="footer-container">
      
      {/* 1. The Background Animation */}
      <div className="footer-background">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#b60909" 
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      {/* 2. The Content Overlay */}
      <div className="footer-content">
        
        {/* Main Center Content */}
        <div className="center-section">
          <h2 className="footer-title">Let's Connect</h2>
          <p className="footer-email" style={{ color: '#fbff00' }}>shrishraghuwanshi89@gmail.com</p> 
          
          <a href="mailto:shrishraghuwanshi89@gmail.com" className="contact-btn">
            Contact Us
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="bottom-bar">
          
          {/* Social Links (Left) */}
          <div className="social-links">
            <span className="links-label" style={{ color: '#EE344A' }}>Links</span>
            <div className="social-icons-container">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-item">
                <span className="social-label">Github</span>
                <FaGithub size={20} className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/shrish-raghuwanshi/" target="_blank" rel="noopener noreferrer" className="social-item">
                <span className="social-label">LinkedIn</span>
                <FaLinkedin size={20} className="social-icon" />
              </a>
            </div>
          </div>

          {/* Description (Right) */}
          <div className="copyright-text">
            <p style={{ color: '#EE344A' }}>
              Thanks for stopping by! This site was designed and developed by me. I’m currently pursuing a B.Tech in Computer Science at Bennett University and am open to freelance projects and internship opportunities. If you’re looking for a passionate full-stack developer, let’s connect!!
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;