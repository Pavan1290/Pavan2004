import React, { useEffect, useRef, useState, useCallback } from 'react';
import { playDrone, playOrbitPulse, playImplosion, playExplosion, playChime, resumeAudio } from './SoundEngine';
import './Preloader.css';

function Preloader({ onFinish, minDuration = 4000, maxDuration = 7000 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startedAtRef = useRef(null);
  const phaseRef = useRef(0); // 0=gather, 1=orbit, 2=implode, 3=explode
  const [hidden, setHidden] = useState(false);
  const [textReveal, setTextReveal] = useState(false);
  const [countText, setCountText] = useState('');
  const [started, setStarted] = useState(false);
  const soundPlayedRef = useRef({ drone: false, orbit: false, implode: false, explode: false });

  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    resumeAudio();
    const ctx = canvas.getContext('2d');

    let dpi = window.devicePixelRatio || 1;
    let cssW = window.innerWidth;
    let cssH = window.innerHeight;

    function setSize() {
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      canvas.width = Math.floor(cssW * dpi);
      canvas.height = Math.floor(cssH * dpi);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpi, dpi);
    }

    setSize();
    function handleResize() {
      dpi = window.devicePixelRatio || 1;
      setSize();
    }
    window.addEventListener('resize', handleResize);

    // --- Physics constants ---
    const PARTICLE_COUNT = 300;
    const RING_COUNT = 80;
    const DUST_COUNT = 120;
    const G = 0.15; // gravitational constant
    const CENTER_X = () => cssW / 2;
    const CENTER_Y = () => cssH / 2;

    // --- Particle systems ---
    let orbitals = [];    // Main orbital particles
    let ringParticles = []; // Inner ring particles
    let dustField = [];   // Background dust/nebula
    let shockwave = { radius: 0, opacity: 0, active: false };

    // Color palettes
    const colors = [
      { r: 0, g: 255, b: 204 },   // Cyan-green
      { r: 0, g: 119, b: 255 },   // Blue
      { r: 138, g: 43, b: 226 },  // Purple
      { r: 0, g: 200, b: 255 },   // Light blue
      { r: 100, g: 0, b: 255 },   // Violet
      { r: 0, g: 255, b: 150 },   // Mint
    ];

    function randomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Initialize orbital particles
    function initOrbitals() {
      orbitals = [];
      const cx = CENTER_X();
      const cy = CENTER_Y();
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 150 + Math.random() * Math.max(cssW, cssH) * 0.4;
        const color = randomColor();
        orbitals.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          mass: 0.5 + Math.random() * 1.5,
          size: 1 + Math.random() * 2.5,
          color,
          trail: [],
          maxTrail: 8 + Math.floor(Math.random() * 12),
          orbitSpeed: 0.3 + Math.random() * 0.7,
          orbitRadius: 80 + Math.random() * 180,
          orbitAngle: angle,
          life: 1,
        });
      }
    }

    // Initialize ring particles (inner orbit ring)
    function initRing() {
      ringParticles = [];
      for (let i = 0; i < RING_COUNT; i++) {
        const angle = (i / RING_COUNT) * Math.PI * 2;
        const color = randomColor();
        ringParticles.push({
          angle,
          radius: 60 + Math.random() * 20,
          speed: 0.015 + Math.random() * 0.01,
          size: 1 + Math.random() * 1.5,
          color,
          pulse: Math.random() * Math.PI * 2,
          offsetY: (Math.random() - 0.5) * 10,
        });
      }
    }

    // Initialize background dust
    function initDust() {
      dustField = [];
      for (let i = 0; i < DUST_COUNT; i++) {
        dustField.push({
          x: Math.random() * cssW,
          y: Math.random() * cssH,
          size: 0.5 + Math.random() * 1.5,
          opacity: 0.1 + Math.random() * 0.3,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          twinkle: Math.random() * Math.PI * 2,
        });
      }
    }

    initOrbitals();
    initRing();
    initDust();

    // --- Rendering ---
    let lastTime = performance.now();
    let phase = 0;
    const GATHER_DURATION = 1800;
    const ORBIT_DURATION = 1500;
    const IMPLODE_DURATION = 400;
    const EXPLODE_DURATION = 800;

    // Progress counter
    let progress = 0;

    function drawBackground(now) {
      // Ultra-black with subtle gradient
      const g = ctx.createRadialGradient(cssW / 2, cssH / 2, 0, cssW / 2, cssH / 2, Math.max(cssW, cssH) * 0.8);
      g.addColorStop(0, '#080818');
      g.addColorStop(0.4, '#030310');
      g.addColorStop(1, '#010108');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, cssW, cssH);

      // Pulsing nebula glow
      const pulse = 0.5 + 0.5 * Math.sin(now * 0.001);
      const nebula = ctx.createRadialGradient(cssW / 2, cssH / 2, 0, cssW / 2, cssH / 2, 300 + pulse * 100);
      nebula.addColorStop(0, `rgba(138, 43, 226, ${0.03 + pulse * 0.02})`);
      nebula.addColorStop(0.3, `rgba(0, 119, 255, ${0.02 + pulse * 0.015})`);
      nebula.addColorStop(0.6, `rgba(0, 255, 204, ${0.01 + pulse * 0.01})`);
      nebula.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, cssW, cssH);
    }

    function drawDust(now) {
      for (const d of dustField) {
        d.x += d.speedX;
        d.y += d.speedY;
        d.twinkle += 0.02;
        if (d.x < 0) d.x = cssW;
        if (d.x > cssW) d.x = 0;
        if (d.y < 0) d.y = cssH;
        if (d.y > cssH) d.y = 0;

        const twinkleOpacity = d.opacity * (0.5 + 0.5 * Math.sin(d.twinkle));
        ctx.fillStyle = `rgba(200, 220, 255, ${twinkleOpacity})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }



    function applyGravity(p, cx, cy, strength) {
      const dx = cx - p.x;
      const dy = cy - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 1;
      const force = (strength * p.mass) / (dist * 0.5);
      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;
    }

    function drawOrbitals(now, cx, cy, dt) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (const p of orbitals) {
        // Phase-specific physics
        if (phase === 0) {
          // Gather: gentle gravity pull
          applyGravity(p, cx, cy, G * 0.8);
          // Add tangential velocity for spiral effect
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 50) {
            p.vx += (-dy / dist) * 0.3 * p.orbitSpeed;
            p.vy += (dx / dist) * 0.3 * p.orbitSpeed;
          }
          p.vx *= 0.98;
          p.vy *= 0.98;
        } else if (phase === 1) {
          // Orbit: stable circular orbits
          p.orbitAngle += p.orbitSpeed * 0.02;
          const targetX = cx + Math.cos(p.orbitAngle) * p.orbitRadius;
          const targetY = cy + Math.sin(p.orbitAngle) * p.orbitRadius;
          p.vx += (targetX - p.x) * 0.04;
          p.vy += (targetY - p.y) * 0.04;
          p.vx *= 0.92;
          p.vy *= 0.92;
        } else if (phase === 2) {
          // Implode: strong gravity pull to center
          applyGravity(p, cx, cy, G * 8);
          p.vx *= 0.95;
          p.vy *= 0.95;
        } else if (phase === 3) {
          // Explode: burst outward
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy) + 1;
          p.vx += (dx / dist) * 15;
          p.vy += (dy / dist) * 15;
          p.life -= 0.02;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > p.maxTrail) p.trail.shift();

        if (p.life <= 0) continue;

        // Draw trail
        if (p.trail.length > 1) {
          for (let t = 1; t < p.trail.length; t++) {
            const alpha = (t / p.trail.length) * 0.3 * p.life;
            const trailSize = p.size * 0.5 * (t / p.trail.length);
            ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.trail[t].x, p.trail[t].y, trailSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Draw particle glow
        const glowSize = p.size * 5;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        grd.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${0.6 * p.life})`);
        grd.addColorStop(0.5, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${0.15 * p.life})`);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }


    function render(now) {
      const dt = Math.min(40, now - lastTime) / 16.666;
      lastTime = now;
      const elapsed = now - startedAtRef.current;

      // Phase transitions
      // Play drone at start
      if (!soundPlayedRef.current.drone) { soundPlayedRef.current.drone = true; playDrone(); }

      if (phase === 0 && elapsed > GATHER_DURATION) {
        phase = 1;
        phaseRef.current = 1;
        if (!soundPlayedRef.current.orbit) { soundPlayedRef.current.orbit = true; playOrbitPulse(); }
      } else if (phase === 1 && elapsed > GATHER_DURATION + ORBIT_DURATION) {
        phase = 2;
        phaseRef.current = 2;
        if (!soundPlayedRef.current.implode) { soundPlayedRef.current.implode = true; playImplosion(); }
      } else if (phase === 2 && elapsed > GATHER_DURATION + ORBIT_DURATION + IMPLODE_DURATION) {
        phase = 3;
        phaseRef.current = 3;
        shockwave = { radius: 0, opacity: 0.8, active: true };
        if (!soundPlayedRef.current.explode) {
          soundPlayedRef.current.explode = true;
          playExplosion();
          // Chimes for each letter
          'PAVAN S'.split('').forEach((_, i) => setTimeout(() => playChime(i), i * 100 + 200));
        }
        setTextReveal(true);
      }

      // Progress counter
      const totalDuration = GATHER_DURATION + ORBIT_DURATION + IMPLODE_DURATION + EXPLODE_DURATION;
      progress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
      setCountText(`${progress}%`);

      const cx = CENTER_X();
      const cy = CENTER_Y();

      drawBackground(now);
      drawDust(now);

      drawOrbitals(now, cx, cy, dt);

      // End condition
      if (elapsed > GATHER_DURATION + ORBIT_DURATION + IMPLODE_DURATION + EXPLODE_DURATION + 1200) {
        cancelAnimationFrame(rafRef.current);
        setHidden(true);
        setTimeout(() => { if (onFinish) onFinish(); }, 800);
        return;
      }

      rafRef.current = requestAnimationFrame(render);
    }

    startedAtRef.current = performance.now();
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [onFinish, minDuration, maxDuration, started]);

  const nameLetters = 'PAVAN S'.split('');

  const handleStart = useCallback(() => { setStarted(true); }, []);

  return (
    <div className={`preloader ${hidden ? 'preloader-hidden' : ''}`}>
      {!started && (
        <div className="preloader-gate" onClick={handleStart}>
          <div className="gate-welcome">Welcome to</div>
          <div className="gate-name">Pavan's Portfolio</div>
          <div className="gate-divider"></div>
          <button className="gate-btn">
            <span className="gate-btn-text">ENTER</span>
            <span className="gate-btn-arrow">→</span>
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="preloader-canvas-element" />
      
      {/* Loading percentage */}
      {started && (
        <div className={`preloader-counter ${textReveal ? 'counter-hidden' : ''}`}>
          {countText}
        </div>
      )}

      {/* Name reveal */}
      <div className={`preloader-name ${textReveal ? 'name-visible' : ''}`}>
        {nameLetters.map((letter, i) => (
          <span
            key={i}
            className="name-letter"
            style={{
              animationDelay: `${i * 0.15}s, ${1.2 + i * 0.08}s, ${2.2 + i * 0.1}s`,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>

      {/* Loading bar */}
      {started && (
        <div className={`preloader-bar-container ${textReveal ? 'bar-hidden' : ''}`}>
          <div className="preloader-bar-track">
            <div className="preloader-bar-fill" style={{ width: `${Math.min(100, parseInt(countText) || 0)}%` }}></div>
          </div>
          <div className="preloader-bar-label">LOADING EXPERIENCE</div>
        </div>
      )}
    </div>
  );
}

export default Preloader;
