"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins if needed (though not strictly used for the hero timeline, good practice)
gsap.registerPlugin(ScrollTrigger);

// --- TYPES ---
type MousePosition = {
  x: number;
  y: number;
};

// --- COMPONENTS ---

export default function Portfolio() {
  // --- STATE & REFS ---
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorCircleRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  
  // Refs for animations
  const heroTextRef1 = useRef<HTMLHeadingElement>(null);
  const heroTextRef2 = useRef<HTMLHeadingElement>(null);
  const gridLinesRef = useRef<HTMLDivElement[]>([]);
  const hasPlayedAnimationRef = useRef(false);
  
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const circlePosRef = useRef<MousePosition>({ x: 0, y: 0 });

  // --- EFFECTS ---

  // 1. PRELOADER LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 10) + 5;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Trigger entrance animation when progress hits 100
  useEffect(() => {
    if (loadingProgress === 100 && !hasPlayedAnimationRef.current) {
      hasPlayedAnimationRef.current = true;
      
      const tl = gsap.timeline();
      
      // Preloader exit
      tl.to(preloaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.2,
      })
      // Hero Text Reveal
      .from(heroTextRef2.current, {
        yPercent: 120,
        duration: 1.5,
        ease: "power3.out",
        rotate: 2,
      }, "-=0.5")
      // Nav Reveal
      .from(navigationRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
      }, "-=1")
      // Grid Reveal
      .from(gridLinesRef.current.filter(Boolean), {
        scaleY: 0,
        scaleX: 0,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.1,
      }, "-=1.5");
    }
  }, [loadingProgress]);

  // 2. CUSTOM CURSOR LOGIC
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      if (cursorDotRef.current) {
        gsap.to(cursorDotRef.current, {
          x: e.clientX - 3,
          y: e.clientY - 3,
          duration: 0.1,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const updateCursor = () => {
      if (!cursorCircleRef.current) return;
      
      const { x: mX, y: mY } = mouseRef.current;
      const { x: cX, y: cY } = circlePosRef.current;
      
      // Smooth lerp
      const newX = cX + (mX - cX) * 0.15;
      const newY = cY + (mY - cY) * 0.15;
      
      circlePosRef.current = { x: newX, y: newY };
      
      cursorCircleRef.current.style.transform = `translate(${newX - 20}px, ${newY - 20}px)`;
      
      requestAnimationFrame(updateCursor);
    };
    
    const animId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 3. THREE.JS BACKGROUND
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    camera.position.y = 3;
    camera.rotation.x = -0.2;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- PARTICLES ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 12000;

    const posArray = new Float32Array(particlesCount * 3);
    const randomArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 30;     // x
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
      randomArray[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('aRandom', new THREE.BufferAttribute(randomArray, 1));

    // Shader Material
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uColor: { value: new THREE.Color('#e2e2e2') }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec3 uMouse;
        uniform float uPixelRatio;
        attribute float aRandom;
        varying float vAlpha;

        void main() {
            vec3 pos = position;
            
            // Wave effect
            pos.y += sin(pos.x * 0.5 + uTime * 0.5) * 0.5;
            pos.z += cos(pos.y * 0.5 + uTime * 0.3) * 0.2;

            // Mouse Repulsion
            float dist = distance(uMouse.xy, pos.xy);
            float force = smoothstep(3.0, 0.0, dist);
            pos.z += force * 2.0;
            pos.x += (pos.x - uMouse.x) * force * 0.5;
            pos.y += (pos.y - uMouse.y) * force * 0.5;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            gl_PointSize = (3.0 * uPixelRatio) * (1.0 / -mvPosition.z);
            
            // Fade edges
            vAlpha = 1.0 - smoothstep(5.0, 15.0, abs(pos.z));
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
            float strength = distance(gl_PointCoord, vec2(0.5));
            strength = 1.0 - step(0.5, strength);
            if (strength < 0.5) discard;
            gl_FragColor = vec4(uColor, vAlpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Interaction Vector
    const uMouse = new THREE.Vector3();

    const handleMouseMove = (e: MouseEvent) => {
      uMouse.x = (e.clientX / window.innerWidth) * 20 - 10;
      uMouse.y = -(e.clientY / window.innerHeight) * 10 + 5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      particlesMaterial.uniforms.uTime.value = elapsedTime;
      particlesMaterial.uniforms.uMouse.value.lerp(uMouse, 0.05);

      // Camera drift
      camera.position.x = Math.sin(elapsedTime * 0.1) * 0.5;
      camera.position.y = 3 + Math.cos(elapsedTime * 0.15) * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };

    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      particlesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      particlesGeometry.dispose();
    };
  }, []);

  // --- HELPERS ---
  // Helper to add grid lines to refs
  const addToGridRefs = (el: HTMLDivElement | null) => {
    if (el && !gridLinesRef.current.includes(el)) {
      gridLinesRef.current.push(el);
    }
  };

  // Helper for magnetic hover effect
  const handleMagneticHover = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(target, {
      x: relX * 0.3,
      y: relY * 0.3,
      duration: 0.5
    });

    // Scale cursor
    if (cursorCircleRef.current) {
      gsap.to(cursorCircleRef.current, { scale: 1.5, opacity: 0.5, duration: 0.3 });
    }
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    gsap.to(target, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    
    // Reset cursor
    if (cursorCircleRef.current) {
      gsap.to(cursorCircleRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    }
  };

  return (
    <div className="relative bg-[#080808] text-[#e2e2e2] min-h-screen overflow-hidden font-sans">
      {/* --- STYLES FOR FONTS & CUSTOM FX --- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&family=Syncopate:wght@400;700&display=swap');
        
        :root {
          --bg: #080808;
          --primary: #e2e2e2;
        }
        
        body {
          cursor: none;
        }

        .font-display { font-family: 'Syncopate', sans-serif; }
        .font-sans { font-family: 'Space Grotesk', sans-serif; }
        
        .stroke-text {
          -webkit-text-stroke: 1px white;
        }

        /* Marquee Animation */
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-content {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* --- CURSOR --- */}
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference" 
      />
      <div 
        ref={cursorCircleRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[99] mix-blend-difference transition-transform duration-100 ease-linear"
      />

      {/* --- PRELOADER --- */}
      <div ref={preloaderRef} className="fixed inset-0 bg-black z-[999] flex justify-between items-end p-8 text-white">
        <div className="absolute top-0 left-0 h-[2px] bg-white transition-all duration-150 ease-out" style={{ width: `${loadingProgress}%` }} />
        <div className="font-display text-6xl font-bold">{loadingProgress}%</div>
        <div className="text-xs tracking-widest uppercase text-right">
          Javier Goodall<br />
          Portfolio v.2025
        </div>
      </div>

      {/* --- NOISE OVERLAY --- */}
      <div className="fixed inset-0 z-50 opacity-5 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

      {/* --- 3D BACKGROUND --- */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />

      {/* --- GRID SYSTEM --- */}
      <div ref={addToGridRefs} className="fixed w-px h-screen top-0 left-[10%] bg-white/5 z-[1]" />
      <div ref={addToGridRefs} className="fixed w-px h-screen top-0 left-[50%] bg-white/5 z-[1] hidden md:block" />
      <div ref={addToGridRefs} className="fixed w-px h-screen top-0 right-[10%] bg-white/5 z-[1]" />
      <div ref={addToGridRefs} className="fixed h-px w-screen top-[15%] left-0 bg-white/5 z-[1]" />
      <div ref={addToGridRefs} className="fixed h-px w-screen bottom-[15%] left-0 bg-white/5 z-[1]" />

      {/* --- UI LAYER --- */}
      <nav ref={navigationRef} className="fixed top-0 w-full p-8 flex justify-between items-start z-40 mix-blend-difference text-white">
        <div className="flex flex-col">
          <span className="font-display font-bold tracking-tighter text-2xl">JG©</span>
          <span className="text-[10px] tracking-[0.2em] opacity-60 mt-1">JAVIER GOODALL</span>
        </div>
        
        <div className="hidden md:flex gap-16 text-xs font-bold tracking-widest">
          {['WORK', 'ABOUT', 'CONTACT'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="hover:text-gray-400 transition-colors"
              onMouseMove={handleMagneticHover}
              onMouseLeave={handleMagneticLeave}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="text-right">
          <button 
            className="border border-white/20 px-6 py-2 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
            onMouseMove={handleMagneticHover}
            onMouseLeave={handleMagneticLeave}
          >
            Let&apos;s Talk
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 w-full h-screen flex flex-col justify-center pointer-events-none">
        
        <div className="w-full px-4 md:px-[10%] relative">
          {/* Line 1 */}
          {/* <div className="overflow-hidden">
            <h1 
              ref={heroTextRef1}
              className="font-display font-bold text-[13vw] leading-[0.8] text-transparent stroke-text tracking-tighter mix-blend-overlay opacity-80"
            >
              JAVIER
            </h1>
          </div>
           */}
          {/* Line 2 */}
          <div className="overflow-hidden flex items-center gap-6">
            <div className="w-12 h-12 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center mt-2 md:mt-4 animate-[spin_10s_linear_infinite]">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 
              ref={heroTextRef2}
              className="font-display font-bold text-[13vw] leading-[0.8] text-white tracking-tighter"
            >
              JAVIER GOODALL
            </h1>
          </div>
          
          {/* Description */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-end border-l border-white/20 pl-6 ml-2">
            <p className="text-sm md:text-lg max-w-md font-light text-gray-300 leading-relaxed backdrop-blur-sm">
              I craft immersive digital experiences that defy logic. 
              <span className="text-white font-bold"> Creative Developer & Designer based in Cyberspace.</span>
            </p>
            <div className="pointer-events-auto mt-6 md:mt-0">
              <a href="#" className="group flex items-center gap-4 text-xs tracking-[0.2em] uppercase hover:text-white text-gray-400 transition-colors">
                <span className="border-b border-gray-600 group-hover:border-white pb-1 transition-colors">View Selected Works</span>
                <span className="text-xl transform group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 py-4 mix-blend-overlay opacity-50">
          <div className="marquee-container">
            <div className="marquee-content font-display text-4xl md:text-6xl font-bold text-transparent stroke-text">
              CREATIVE DEVELOPER — WEBGL — INTERACTIVE DESIGN — UI/UX — CREATIVE DEVELOPER — WEBGL — INTERACTIVE DESIGN — UI/UX —&nbsp;
            </div>
            <div className="marquee-content font-display text-4xl md:text-6xl font-bold text-transparent stroke-text">
              CREATIVE DEVELOPER — WEBGL — INTERACTIVE DESIGN — UI/UX — CREATIVE DEVELOPER — WEBGL — INTERACTIVE DESIGN — UI/UX —&nbsp;
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}