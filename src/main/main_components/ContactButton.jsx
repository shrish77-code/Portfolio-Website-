// src/main/main_components/ContactButton.jsx
import React from 'react';
import './ContactButton.css';

const ContactButton = () => {
  return (
    <a href="#contact" className="btn-glitch">
      <span className="text">// CONTACT ME</span>
      <span className="text-decoration"> _</span>
      <span className="decoration">⇒</span>
    </a>
  );
};

export default ContactButton;