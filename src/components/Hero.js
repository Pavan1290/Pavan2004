import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown, FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Hero.css';

function Hero({ setActiveSection }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="hero-text">
          <h1 className="hero-title">
            <span className="gradient-text">Pavan S</span>
          </h1>
          <h2 className="hero-subtitle">
            Ambitious Agentic AI/ML Engineer & Full Stack Developer
          </h2>
          <p className="hero-description">
            Specializing in <span className="highlight">Agentic AI, Generative Agents, LLMs, and RAG systems</span> for autonomous automation.
            Building agentic systems, agent orchestration, and production-ready integrations.
          </p>

          {/* Mobile portrait — shown only on tablet/mobile, before the role badge */}
          <div className="hero-portrait-mobile">
            <img src="/images/Pav.jpeg" alt="Portrait of Pavan" className="portrait-image" />
          </div>

          <div className="hero-current-role">
            <motion.div
              className="role-badge glass-effect"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="role-title">Software Engineer @ Novigo Solutions Pvt Ltd</div>
              <div className="role-tech">
                Agentic AI | Generative Agents | Copilot Studio | Power Apps | LangChain Agents | Autonomous Agent Orchestration | Open Source
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => scrollToSection('projects')}
          >
            View My Work
          </button>
          <button
            className="btn-secondary"
            onClick={() => scrollToSection('contact')}
          >
            Get in Touch
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="hero-socials">
          <a href="https://linkedin.com/in/PavanS" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Pavan1290" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaGithub />
          </a>
          <a href="mailto:shivaiahh463@gmail.com" className="social-link">
            <FaEnvelope />
          </a>
          <a href="tel:+919901643740" className="social-link">
            <FaPhone />
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaArrowDown />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>

      <div className="hero-portrait">
        <img src="/images/Pav.jpeg" alt="Portrait of Pavan" className="portrait-image" />
      </div>

      <div className="hero-background">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
      </div>
    </section>
  );
}

export default Hero;
