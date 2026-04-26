import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [targetLabel, setTargetLabel] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor ring
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, .logo, .nav-link, .social-link, .hero-title, .portrait-image, .role-badge');
      if (target) {
        setIsHovering(true);
        
        // Dynamic labels based on what's being hovered
        if (target.classList.contains('logo') || target.classList.contains('hero-title')) {
          setTargetLabel('PAVAN');
        } else if (target.classList.contains('social-link')) {
          setTargetLabel('SOCIAL');
        } else if (target.classList.contains('nav-link')) {
          setTargetLabel('GO TO');
        } else if (target.tagName === 'BUTTON') {
          setTargetLabel('VIEW');
        } else if (target.classList.contains('portrait-image')) {
          setTargetLabel('HELLO');
        } else {
          setTargetLabel('EXPLORE');
        }
      } else {
        setIsHovering(false);
        setTargetLabel('');
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="cursor-label">{targetLabel}</div>
        <div className="cursor-dot-center" />
      </motion.div>

      {/* Trailing Dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};

export default CustomCursor;
