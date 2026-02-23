// src/main/main_components/ParticleEffect.jsx
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleEffect() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Use window dimensions to ensure full coverage
    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Clear color is black, but alpha: true allows it to blend if needed
    renderer.setClearColor(0x000000, 1); 
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
    camera.position.z = 80;

    // -------------------------------------------------------------------
    // 1. ORIGINAL GEOMETRY RESTORED (Outer Sphere)
    // -------------------------------------------------------------------
    const COUNT = 5000;
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const velocities = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);
    const origins = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 20 + Math.random() * 30;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = origins[i * 3] = x;
      positions[i * 3 + 1] = origins[i * 3 + 1] = y;
      positions[i * 3 + 2] = origins[i * 3 + 2] = z;
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      phases[i] = Math.random() * Math.PI * 2;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("position", posAttr);
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // -------------------------------------------------------------------
    // 2. SHADER CODE (Original)
    // -------------------------------------------------------------------
    const vertexShader = `
      attribute float size;
      uniform float time;
      uniform vec2  mouse;
      varying float vAlpha;
      void main() {
        vec3 pos = position;
        float angle = time * 0.1;
        float c = cos(angle), s = sin(angle);
        float nx = pos.x * c - pos.z * s;
        float nz = pos.x * s + pos.z * c;
        pos.x = nx; pos.z = nz;
        vec4 mvPos  = modelViewMatrix * vec4(pos, 1.0);
        
        // INTERACTION: Ripple effect based on mouse distance
        vec2 screen = mvPos.xy / 80.0;
        float dist  = distance(screen, mouse);
        float ripple = exp(-dist * dist * 2.0) * 8.0;
        pos.z += ripple;
        
        mvPos  = modelViewMatrix * vec4(pos, 1.0);
        float depth = (-mvPos.z) / 120.0;
        vAlpha = clamp(depth, 0.2, 1.0);
        gl_PointSize = size * (300.0 / -mvPos.z);
        gl_Position  = projectionMatrix * mvPos;
      }
    `;

    const mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, mouse: { value: new THREE.Vector2(0, 0) } },
      vertexShader,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          float glow = pow(1.0 - r * 2.0, 1.5);
          vec3 core  = vec3(1.0, 0.4, 0.3);
          vec3 outer = vec3(0.8, 0.05, 0.05);
          vec3 col   = mix(outer, core, glow);
          gl_FragColor = vec4(col, glow * vAlpha * 0.9);
        }
      `,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });

    // -------------------------------------------------------------------
    // 3. INNER CLUSTER (Original Geometry Restored)
    // -------------------------------------------------------------------
    const COUNT2 = 1500;
    const pos2 = new Float32Array(COUNT2 * 3);
    const sz2 = new Float32Array(COUNT2);
    const vel2 = new Float32Array(COUNT2 * 3);
    const phase2 = new Float32Array(COUNT2);
    const origins2 = new Float32Array(COUNT2 * 3);

    for (let i = 0; i < COUNT2; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * 15;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos2[i * 3] = origins2[i * 3] = x;
      pos2[i * 3 + 1] = origins2[i * 3 + 1] = y;
      pos2[i * 3 + 2] = origins2[i * 3 + 2] = z;
      vel2[i * 3] = (Math.random() - 0.5) * 0.015;
      vel2[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      vel2[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
      phase2[i] = Math.random() * Math.PI * 2;
      sz2[i] = Math.random() * 1.5 + 0.3;
    }

    const geo2 = new THREE.BufferGeometry();
    const posAttr2 = new THREE.BufferAttribute(pos2, 3);
    posAttr2.setUsage(THREE.DynamicDrawUsage);
    geo2.setAttribute("position", posAttr2);
    geo2.setAttribute("size", new THREE.BufferAttribute(sz2, 1));

    const mat2 = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, mouse: { value: new THREE.Vector2(0, 0) } },
      vertexShader,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float r    = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          float glow = pow(1.0 - r * 2.0, 1.1);
          vec3 outerCol = vec3(0.9,  0.05, 0.0);
          vec3 innerCol = vec3(1.0,  0.85, 0.55);
          vec3 col  = mix(outerCol, innerCol, glow);
          col *= 1.5;
          gl_FragColor = vec4(col, glow * 1.0);
        }
      `,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geo, mat);
    const particles2 = new THREE.Points(geo2, mat2);
    scene.add(particles);
    scene.add(particles2);

    // -------------------------------------------------------------------
    // 4. MOUSE LOGIC FIX (Using Window instead of Mount)
    // -------------------------------------------------------------------
    const mouse = new THREE.Vector2(0, 0);
    
    const onMove = (e) => {
      // Corrected logic: Use window size for normalized coordinates
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    // Attach to window so it works through the text overlay
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // -------------------------------------------------------------------
    // 5. ANIMATION LOOP
    // -------------------------------------------------------------------
    const noise = (x, y, t) => Math.sin(x * 0.15 + t) * Math.cos(y * 0.13 - t * 0.8);
    // ... (Keep all your geometry code above this line) ...

    const clock = new THREE.Clock();
    let animId;

    // ZOOM UPDATE 1: Start the camera "Inside" the particles (closer than 80)
    camera.position.z = 20; 

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // ZOOM UPDATE 2: Smoothly fly backward to position 80
      // This adds 2% of the remaining distance every frame (Easing)
      camera.position.z += (80 - camera.position.z) * 0.02;

      // Update Uniforms
      mat.uniforms.time.value = t;
      mat.uniforms.mouse.value = mouse;
      mat2.uniforms.time.value = t;
      mat2.uniforms.mouse.value = mouse;

      // Rotate whole system based on mouse
      particles.rotation.x += (mouse.y * 0.3 - particles.rotation.x) * 0.03;
      particles.rotation.y += (mouse.x * 0.3 - particles.rotation.y) * 0.03;
      particles2.rotation.x = particles.rotation.x;
      particles2.rotation.y = particles.rotation.y;

      // ---------------------------------------------------------
      // IMPORTANT: Keep your noise/movement loops here!
      // (Copy your original for-loops for "Outer Sphere" and "Inner Cluster" here)
      // ---------------------------------------------------------
      
      // Update Outer Sphere Positions
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3, ph = phases[i];
        const px = positions[i3], py = positions[i3 + 1], pz = positions[i3 + 2];
        velocities[i3] += noise(px + ph, py, t * 0.5 + ph) * 0.009;
        velocities[i3 + 1] += noise(py + ph, pz, t * 0.4 + ph) * 0.009;
        velocities[i3 + 2] += noise(pz + ph, px, t * 0.3 + ph) * 0.006;
        velocities[i3] += (origins[i3] - px) * 0.003;
        velocities[i3 + 1] += (origins[i3 + 1] - py) * 0.003;
        velocities[i3 + 2] += (origins[i3 + 2] - pz) * 0.003;
        velocities[i3] *= 0.97;
        velocities[i3 + 1] *= 0.97;
        velocities[i3 + 2] *= 0.97;
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
      }

      // Update Inner Cluster Positions
      for (let i = 0; i < COUNT2; i++) {
        const i3 = i * 3, ph = phase2[i];
        const px = pos2[i3], py = pos2[i3 + 1], pz = pos2[i3 + 2];
        vel2[i3] += noise(px + ph, py, t * 0.6 + ph) * 0.008;
        vel2[i3 + 1] += noise(py + ph, pz, t * 0.5 + ph) * 0.008;
        vel2[i3 + 2] += noise(pz + ph, px, t * 0.4 + ph) * 0.005;
        vel2[i3] += (origins2[i3] - px) * 0.005;
        vel2[i3 + 1] += (origins2[i3 + 1] - py) * 0.005;
        vel2[i3 + 2] += (origins2[i3 + 2] - pz) * 0.005;
        vel2[i3] *= 0.97;
        vel2[i3 + 1] *= 0.97;
        vel2[i3 + 2] *= 0.97;
        pos2[i3] += vel2[i3];
        pos2[i3 + 1] += vel2[i3 + 1];
        pos2[i3 + 2] += vel2[i3 + 2];
      }

      posAttr.needsUpdate = true;
      posAttr2.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      geo.dispose(); mat.dispose();
      geo2.dispose(); mat2.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ 
          width: "100vw", 
          height: "100vh", 
          background: "#000", 
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0
      }}
    />
  );
}