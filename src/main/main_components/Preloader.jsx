// src/main/main_components/Preloader.jsx
import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulation: Increment progress periodically
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Calculate next step (randomize slightly for realism)
        const next = prev + Math.floor(Math.random() * 3) + 1;
        
        if (next >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          // Wait for exit animation to finish before unmounting (optional logic in App)
          setTimeout(onComplete, 800); 
          return 100;
        }
        return next;
      });
    }, 40); // 40ms * 100 steps ≈ 4 seconds load time

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`preloader-container ${isLoaded ? 'loaded' : ''}`}>
      
      {/* 1. HOURGLASS ICON (SVG) */}
      <div className="loader-icon-wrapper">
        <svg 
          viewBox="0 0 24 24" 
          className="hourglass-svg"
        >
          <path d="M4 17.5C4 19.9853 6.01472 22 8.5 22H15.5C17.9853 22 20 19.9853 20 17.5C20 15.0147 17.9853 13 15.5 13H8.5C6.01472 13 4 15.0147 4 17.5Z" />
          <path d="M4 6.5C4 4.01472 6.01472 2 8.5 2H15.5C17.9853 2 20 4.01472 20 6.5C20 8.98528 17.9853 11 15.5 11H8.5C6.01472 11 4 8.98528 4 6.5Z" />
          <path d="M12 11V13" />
        </svg>
      </div>

      {/* 2. PERCENTAGE TEXT */}
      <div className="loader-text">
        {progress}%
      </div>

    </div>
  );
};

export default Preloader;