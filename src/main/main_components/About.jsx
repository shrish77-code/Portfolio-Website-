// src/main/main_components/About.jsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PixelTransition from './PixelTransition';
import './About.css';
import ContactButton from './ContactButton';
import profileImg from './shrish-pic-1.jpeg'; // Your image

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const introRef = useRef(null);
  const bridgeRef = useRef(null);
  
  // New Refs for Entrance Animation
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const pixelRef = useRef(null); // To control the pixel effect

  const frameCount = 240; 
  const images = useRef([]);
  const frames = { current: 0 };

  const currentFrame = (index) => {
    const number = (index + 1).toString().padStart(3, '0');
    return `/frames/ezgif-frame-${number}.jpg`;
  };

  // 1. PRELOAD IMAGES
  useEffect(() => {
    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.current[i] = img;
        if (i === 0) img.onload = () => render(img);
      }
    };
    preloadImages();
  }, [frameCount]);

  // 2. RENDER FUNCTION
  const render = (img = images.current[frames.current]) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete) return;
    
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    context.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  // 3. MAIN ANIMATION
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=8000",
        pin: true,
        scrub: 1, 
      }
    });

    // --- PHASE 1: SCROLLYTELLING SEQUENCE ---
    tl.to(introRef.current, { opacity: 1, duration: 1 })
      .to(introRef.current, { opacity: 0, duration: 1 }, "+=0.5")
      .to(bridgeRef.current, { opacity: 1, duration: 1 })
      .to(bridgeRef.current, { opacity: 0, duration: 1 }, "+=0.5")
      .to(frames, {
        current: frameCount - 1,
        snap: "current",
        ease: "none",
        duration: 6,
        onUpdate: () => render()
      }, "-=0.5")
      
      // --- PHASE 2: REVEAL CONTENT ---
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        // When content appears, trigger the entrance animations below
        onStart: () => {
             // Animate Text from Bottom to Up
             gsap.fromTo(leftColRef.current, 
               { y: 100, opacity: 0 },
               { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
             );

             // Animate Image from Right to Left
             gsap.fromTo(rightColRef.current, 
               { x: 100, opacity: 0 },
               { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
             );
        }
      }, ">-1");


    // --- PHASE 3: PIXEL EFFECT ON SCROLL ---
    // This separate trigger watches specifically when the "About Content" is fully visible
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top center", // When content hits center of screen
      onEnter: () => {
         // Play pixel effect when scrolling down into view
         if(pixelRef.current) pixelRef.current.triggerAnimation(true);
      },
      onLeaveBack: () => {
         // Play pixel effect when scrolling back up
         if(pixelRef.current) pixelRef.current.triggerAnimation(false);
      }
    });

  }, { scope: containerRef });

  // 4. RESIZE
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render();
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section ref={containerRef} className="about-container" id="about">
      <canvas ref={canvasRef} className="about-canvas" />

      <div ref={introRef} className="about-fullscreen-text"><h2 style={{ color: '#EE344A' }}>WHO AM I?</h2></div>
      <div ref={bridgeRef} className="about-fullscreen-text"><h2 style={{ color: '#EE344A' }}>LETS KNOW MORE...</h2></div>

      <div ref={contentRef} className="about-content-wrapper">
        
        {/* LEFT COLUMN: Text (Slides Up) */}
        <div className="about-left" ref={leftColRef}>
          <span className="about-label">// 01. WHO AM I</span>
          <h2 className="about-headline">
            HELLO  EVERYONE <br />
            MY NAME IS <span style={{ color: '#EE344A' }}>SHRISH</span>.
          </h2>
          <p className="about-text">
            I don't just write code; I engineer experiences. 
            Specializing in high-performance React applications, 
            immersive 3D environments, and pixel-perfect design systems.
          </p>
        </div>

        {/* RIGHT COLUMN: Image (Slides Left + Pixels) */}
        <div className="about-right" ref={rightColRef}>
           <PixelTransition
              ref={pixelRef} // Attach Ref so we can control it
              gridSize={12} 
              pixelColor="#EE344A"
              // ADDED: BorderRadius for rounded edges
              style={{ width: '100%', height: '500px', maxWidth: '400px', borderRadius: '15px' }}
              firstContent={
                <img
                  src={profileImg}
                  alt="Shrish"
                  // ADDED: borderRadius here too to match container
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: '15px' }} 
                />
              }
              secondContent={
                <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%", textAlign: 'center' }}>
                  <p style={{ 
                      fontFamily: 'Clash Display', 
                      fontWeight: 700, 
                      fontSize: "1.8rem", 
                      color: "#ffffff",
                      textTransform: "uppercase",
                      lineHeight: "1.2"
                  }}>
                    Heyy! <br/> lets Connect.
                  </p>
                </div>
              }
            />
            <ContactButton />
        </div>

      </div>
    </section>
  );
};

export default About;