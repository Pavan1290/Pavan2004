import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaBirthdayCake, FaLanguage } from 'react-icons/fa';
import './About.css';

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="about section" id="about">
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div variants={itemVariants} className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Ambitious AI/ML Engineer and Full Stack Developer specializing in Generative AI, LLMs, and RAG systems for intelligent automation.
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.div variants={itemVariants} className="about-card glass-effect">
            <h3>Technical Expertise</h3>
            <p>
              Experienced in designing and deploying scalable, end-to-end cross-platform applications, integrating the MERN stack, Python, and advanced Deep Learning frameworks. Lead contributor to high-impact projects demonstrating strong focus on system reliability, MLOps, and performance optimization.
            </p>
            <p style={{ marginTop: '15px', color: '#00d4ff' }}>
              Passionate about building robust software architecture that merges deep learning and real-time data processing.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="about-card glass-effect">
            <h3>Education</h3>
            <div className="education-item">
              <div className="education-header">
                <FaGraduationCap className="icon" />
                <div>
                  <h4>B.Tech in Computer Science Engineering (AI & ML)</h4>
                  <p>8.15 CGPA</p>
                </div>
              </div>
              <p className="education-subtitle">Sahyadri College of Engineering and Management, Mangalore (2022–2026)</p>
            </div>
            <div className="education-item">
              <div className="education-header">
                <FaGraduationCap className="icon" />
                <div>
                  <h4>Pre-University Course (PCMB)</h4>
                  <p>69%</p>
                </div>
              </div>
              <p className="education-subtitle">Nisarga PU College, Kollegal (2020–2022)</p>
            </div>
            <div className="education-item">
              <div className="education-header">
                <FaGraduationCap className="icon" />
                <div>
                  <h4>SSLC</h4>
                  <p>86%</p>
                </div>
              </div>
              <p className="education-subtitle">Nisarga School, Kollegal (2020)</p>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="about-info-grid">
          <div className="info-card glass-effect">
            <FaBirthdayCake className="info-icon" />
            <div>
              <h4>Date of Birth</h4>
              <p>05 December 2004</p>
            </div>
          </div>
          <div className="info-card glass-effect">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h4>Location</h4>
              <p>Mangalore, India</p>
            </div>
          </div>
          <div className="info-card glass-effect">
            <FaLanguage className="info-icon" />
            <div>
              <h4>Languages</h4>
              <p>English (Fluent), Kannada (Native), Hindi (Proficient)</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;
