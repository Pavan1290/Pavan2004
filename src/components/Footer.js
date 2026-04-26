import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowUp } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <motion.div
        className="footer-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="footer-main">
          <div className="footer-text">
            <p>
              Crafted with <FaHeart className="heart-icon" /> by Pavan
            </p>
            <p className="footer-subtitle">
              Ambitious AI/ML Engineer | Full Stack Developer | Generative AI Specialist
            </p>
          </div>

          <div className="footer-year">
            <p>&copy; 2025 All rights reserved.</p>
          </div>
        </div>

        <motion.button
          className="scroll-top-btn"
          onClick={scrollToTop}
          whileHover={{ y: -5 }}
          whileTap={{ y: 0 }}
        >
          <FaArrowUp />
        </motion.button>
      </motion.div>
    </footer>
  );
}

export default Footer;
