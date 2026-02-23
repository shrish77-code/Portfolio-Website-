// src/main/main_components/MusicToggle.jsx
import React, { useState, useRef } from 'react';
import './MusicToggle.css';

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.volume = 0.5; 
      audio.play().catch(e => console.log("Play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-container">
      <audio ref={audioRef} loop src="/ambient.mp3" />

      <span className="music-label">
        MUSIC {isPlaying ? "ON" : "OFF"}
      </span>

      <label className="switch">
        <input 
          type="checkbox" 
          checked={isPlaying} 
          onChange={toggleMusic} 
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default MusicToggle;