// src/main/main_components/Skills.jsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Skills.css';

import LogoLoop from './LogoLoop';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiMongodb, 
  SiThreedotjs, 
  SiFigma, 
  SiPython 
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const techLogos = [
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiMongodb />, title: "MongoDB" },
  { node: <SiThreedotjs />, title: "Three.js" },
  { node: <SiFigma />, title: "Figma" },
  { node: <SiPython />, title: "Python" },
];

const Skills = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const slide3Ref = useRef(null);

  const frameCount = 240; 
  const images = useRef([]);
  const frames = { current: 0 };

  const currentFrame = (index) => {
    const number = (index + 1).toString().padStart(3, '0');
    return `/frames-2/ezgif-frame-${number}.jpg`; 
  };

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
      img, 0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Helper to build the timeline
    const createTimeline = (scrollEnd) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: scrollEnd, 
          pin: true,
          scrub: 1,
        }
      });

      // 1. Frame Animation
      tl.to(frames, {
        current: frameCount - 1,
        snap: "current",
        ease: "none",
        duration: 10, 
        onUpdate: () => render()
      }, 0);

      // 2. Slide 1 (Intro)
      tl.to(slide1Ref.current, { opacity: 1, y: 0, duration: 1 }, 0)
        .to(slide1Ref.current, { opacity: 0, y: -20, duration: 1 }, 2.5);

      // 3. Slide 2 (Web Dev)
      tl.fromTo(slide2Ref.current, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1 }, 3) 
        .to(slide2Ref.current, { opacity: 0, y: -20, duration: 1 }, 6); 

      // 4. Slide 3 (Data Science)
      tl.fromTo(slide3Ref.current, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1 }, 6.5); 
      
      return tl;
    };

    // --- DESKTOP (Longer Scroll) ---
    mm.add("(min-width: 901px)", () => {
      createTimeline("+=6000");
    });

    // --- MOBILE (Shorter Scroll for speed) ---
    mm.add("(max-width: 900px)", () => {
      createTimeline("+=3000");
    });

  }, { scope: containerRef });

  // Handle Resize for Canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        canvasRef.current.width = canvasRef.current.parentElement.clientWidth;
        canvasRef.current.height = canvasRef.current.parentElement.clientHeight;
        render();
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section ref={containerRef} className="skills-container" id="skills">
      {/* Animation Column (Top on mobile) */}
      <div className="skills-left">
        <canvas ref={canvasRef} className="skills-canvas" />
      </div>

      {/* Content Column (Bottom on mobile) */}
      <div className="skills-right">
        <div className="skills-content-wrapper">
          
          {/* SLIDE 1: INTRO */}
          <div ref={slide1Ref} className="skills-slide">
            <span className="skills-label">// 02. ARSENAL</span>
            <h2 className="skills-heading">
              MY COMPLETE <br />
              <span style={{ color: '#EE344A' }}>TECH STACK</span>
            </h2>
            
            <div style={{ 
              marginTop: '1rem', 
              height: '80px', 
              width: '100%', 
              position: 'relative',
              overflow: 'hidden' 
            }}>
              <LogoLoop
                logos={techLogos}
                speed={80} 
                direction="right"
                logoHeight={45} 
                gap={50} 
                hoverSpeed={0} 
                fadeOut={true}
                fadeOutColor="#000000" 
                scaleOnHover={true}
              />
            </div>
          </div>

          {/* SLIDE 2 */}
          <div ref={slide2Ref} className="skills-slide">
            <span className="skills-label">// WEB DEVELOPMENT</span>
            <h2 className="skills-heading">FULL STACK ENGINEER</h2>
            <div className="tech-grid">
              {['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'Next.js', 'TypeScript', 'Tailwind', 'Redux', 'MongoDB', 'Three.js', 'GSAP', 'Figma', 'Framer', 'Spline'].map(tech => (
                <span key={tech} className="tech-pill">{tech}</span>
              ))}
            </div>
          </div>

          {/* SLIDE 3 */}
          <div ref={slide3Ref} className="skills-slide">
            <span className="skills-label">// DATA SCIENCE</span>
            <h2 className="skills-heading">DATA SCIENTIST</h2>
            <div className="tech-grid">
              {['Python', 'NumPy', 'Pandas', 'Seaborn', 'Matplotlib', 'EDA', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Keras', 'Machine Learning', 'Deep Learning'].map(tech => (
                <span key={tech} className="tech-pill">{tech}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;