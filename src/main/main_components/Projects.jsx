// src/main/main_components/Projects.jsx
import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import './Projects.css';

const projects = [
  { id: 1, label: "// DERMATOLOGY AI", video: "/dermatalogy.mp4" },
  { id: 2, label: "// N8N AUTOMATION", video: "/n8n.mp4" },
  { id: 3, label: "// BINGE BUTTON", video: "/bingebutton.mp4" },
  { id: 4, label: "// JARVIS ASSISTANT", video: "/jarvis.mp4" },
];

const marqueeText = "FULL-STACK SOLUTIONS FROM CONCEPT TO DEPLOYMENT • ";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleMouseEnter = (e) => {
    e.target.play();
  };

  const handleMouseLeave = (e) => {
    e.target.pause();
    e.target.currentTime = 0;
  };

  return (
    <section className="projects-container" id="projects">
      
      {/* --- LEFT SIDE: ROBOT & HORIZONTAL MARQUEE --- */}
      <div className="projects-left">
        
        {/* HORIZONTAL CONTINUOUS LOOP */}
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {/* Repeated to ensure infinite feel */}
            <span className="marquee-item">{marqueeText}</span>
            <span className="marquee-item">{marqueeText}</span>
            <span className="marquee-item">{marqueeText}</span>
            <span className="marquee-item">{marqueeText}</span>
          </div>
        </div>

        {/* 3D SCENE */}
        <div className="spline-wrapper">
          <Spline scene="https://prod.spline.design/HFNiLHghhU5d5Qpk/scene.splinecode" />
        </div>
        
        {/* Logo Hider */}
        <div className="spline-blocker"></div>
      </div>

      {/* --- RIGHT SIDE: GRID --- */}
      <div className="projects-right">
        
        <span className="section-header-red">//.PROJECTS</span>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="grid-card"
              style={{ animationDelay: `${index * 0.2}s` }} // Staggered entrance
              onClick={() => setSelectedProject(project)}
            >
              <video 
                className="card-video-preview"
                src={project.video}
                muted
                playsInline
                loop={false}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <div className="card-label">{project.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL --- */}
      {selectedProject && (
        <div className="project-modal">
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={() => setSelectedProject(null)}
            >
              CLOSE [X]
            </button>
            <video 
              className="modal-video"
              src={selectedProject.video}
              autoPlay
              controls
            />
          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;