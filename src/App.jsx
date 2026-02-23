// src/App.jsx
import React, { useState } from 'react';

import Hero from './main/main_components/Hero';
import About from './main/main_components/About';
import Skills from './main/main_components/Skills';
import Projects from './main/main_components/Projects';
import Preloader from './main/main_components/Preloader'; // <--- Import Preloader
import Footer from './main/main_components/Footer';
function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="app-container">
      
      {/* Show Preloader initially */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Main Site Content */}
      <div className="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects /> 
        <Footer />
      </div>

    </div>
  );
}

export default App;