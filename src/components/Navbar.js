import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaCode, FaBriefcase, FaProjectDiagram, FaTrophy, FaEnvelope } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'About', id: 'about', icon: FaUser },
    { name: 'Skills', id: 'skills', icon: FaCode },
    { name: 'Experience', id: 'experience', icon: FaBriefcase },
    { name: 'Projects', id: 'projects', icon: FaProjectDiagram },
    { name: 'Achievements', id: 'achievements', icon: FaTrophy },
    { name: 'Contact', id: 'contact', icon: FaEnvelope },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <motion.div 
          className="logo"
          onClick={() => scrollToSection('hero')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="logo-text">P</span>avan
        </motion.div>

        {/* Desktop Menu */}
        <div className="nav-menu desktop-only">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              <item.icon /> {item.name}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="nav-menu mobile-menu"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <item.icon /> {item.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
