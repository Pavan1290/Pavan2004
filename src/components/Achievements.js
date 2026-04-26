import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaAward, FaMedal } from 'react-icons/fa';
import './Achievements.css';

function Achievements() {
  const achievements = [
    {
      icon: FaTrophy,
      title: 'Tech Vision 2025',
      subtitle: '1st Place — National Level',
      description: 'SIGMA OS – AI-Integrated Operating System',
      color: '#ffd700'
    },
    {
      icon: FaAward,
      title: 'Project Expo 2024',
      subtitle: '1st Prize — College Level',
      description: 'Personalized Diabetic Meal Planner',
      color: '#ff6b6b'
    },
    {
      icon: FaMedal,
      title: 'Kochi Hackathon 2025',
      subtitle: '2nd Runner-Up — National Level',
      description: 'Deepfake Face Detection System',
      color: '#a29bfe'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="achievements section" id="achievements">
      <motion.div
        className="achievements-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div variants={itemVariants} className="section-header">
          <h2 className="section-title">Achievements & Awards</h2>
        </motion.div>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="achievement-card glass-effect"
                whileHover={{ y: -15, rotateZ: 2 }}
              >
                <div className="achievement-icon" style={{ color: achievement.color }}>
                  <Icon />
                </div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-subtitle">{achievement.subtitle}</p>
                <p className="achievement-description">{achievement.description}</p>
                <div className="achievement-shine"></div>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={itemVariants} className="achievements-stats">
          <div className="stat-card glass-effect">
            <div className="stat-value">3+</div>
            <div className="stat-label">National Awards</div>
          </div>
          <div className="stat-card glass-effect">
            <div className="stat-value">5+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-card glass-effect">
            <div className="stat-value">500+</div>
            <div className="stat-label">Lives Impacted</div>
          </div>
          <div className="stat-card glass-effect">
            <div className="stat-value">92%</div>
            <div className="stat-label">Peak Accuracy</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Achievements;
