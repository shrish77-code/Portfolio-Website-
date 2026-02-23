// src/main/main_components/PixelTransition.jsx
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './PixelTransition.css';

const PixelTransition = ({
  firstContent,
  secondContent,
  gridSize = 12, // Increased grid size for finer pixels
  pixelColor = '#EE344A', // Your Theme Red
  animationStepDuration = 0.3,
  className = '',
  style = {}
}) => {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  // Check for touch devices
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // 1. Build the Grid
  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  // 2. Animation Logic
  const animatePixels = (activate) => {
    setIsActive(activate);

    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel');
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) delayedCallRef.current.kill();

    // Reset pixels to hidden
    gsap.set(pixels, { display: 'none' });

    // Step 1: Pixels appear randomly
    gsap.to(pixels, {
      display: 'block',
      duration: 0,
      stagger: {
        each: animationStepDuration / pixels.length,
        from: 'random'
      }
    });

    // Step 2: Swap content (Text vs Image) mid-animation
    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
       // Just visual toggling is handled by CSS/State mostly, but we force display here
       // activeEl is controlled by the isActive state in render, 
       // but we ensure logic sync here if needed.
    });

    // Step 3: Pixels disappear randomly
    gsap.to(pixels, {
      display: 'none',
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: animationStepDuration / pixels.length,
        from: 'random'
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className={`pixelated-image-card ${className}`}
      style={style}
      onMouseEnter={!isTouchDevice ? () => animatePixels(true) : undefined}
      onMouseLeave={!isTouchDevice ? () => animatePixels(false) : undefined}
      onClick={isTouchDevice ? () => animatePixels(!isActive) : undefined}
    >
      {/* BACKGROUND (The Image) */}
      <div className="pixelated-image-card__default" style={{ opacity: isActive ? 0 : 1 }}>
        {firstContent}
      </div>

      {/* FOREGROUND (The Reveal Text) */}
      <div 
        ref={activeRef} 
        className="pixelated-image-card__active" 
        style={{ opacity: isActive ? 1 : 0 }}
      >
        {secondContent}
      </div>

      {/* THE GRID OVERLAY */}
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  );
};

export default PixelTransition;