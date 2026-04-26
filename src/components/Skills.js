import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaTools, FaBrain, FaRobot } from 'react-icons/fa';
import './Skills.css';

function Skills() {
  const [activeCategory, setActiveCategory] = useState('agentic');

  const skillsData = {
    programming: {
      title: 'Programming & Core CS',
      icon: FaCode,
      skills: [
        { name: 'Python', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Java', level: 80 },
        { name: 'SQL', level: 92 },
        { name: 'Oracle', level: 88 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Data Structures', level: 90 },
        { name: 'OOP', level: 88 },
      ]
    },
    frameworks: {
      title: 'Frameworks, Tools & Cloud',
      icon: FaTools,
      skills: [
        { name: 'React.js', level: 95 },
        { name: 'Node.js', level: 90 },
        { name: 'Express.js', level: 88 },
        { name: 'Next.js', level: 85 },
        { name: 'Power Automate', level: 85 },
        { name: 'MongoDB', level: 90 },
        { name: 'PostgreSQL', level: 88 },
        { name: 'Docker', level: 85 },
        { name: 'Git', level: 92 },
      ]
    },
    aiml: {
      title: 'AI, ML & Deep Learning',
      icon: FaBrain,
      skills: [
        { name: 'Generative AI', level: 92 },
        { name: 'LLMs', level: 90 },
        { name: 'PyTorch', level: 90 },
        { name: 'TensorFlow', level: 85 },
        { name: 'Deep Learning', level: 88 },
        { name: 'NLP', level: 87 },
        { name: 'Computer Vision', level: 82 },
      ]
    }
    ,
    agentic: {
      title: 'Agentic AI & Autonomous Agents',
      icon: FaRobot,
      skills: [
        { name: 'Copilot Studio', level: 94 },
        { name: 'LangChain', level: 92 },
        { name: 'LangGraph', level: 91 },
        { name: 'MCP Tools', level: 89 },
        { name: 'Agent Orchestration', level: 90 },
        { name: 'Autonomous Agents', level: 93 },
        { name: 'Prompt Engineering', level: 95 },
        { name: 'Multi-Agent Systems', level: 88 },
        { name: 'Long-term Memory', level: 87 }
      ]
    }
  };

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

  const categories = Object.keys(skillsData);
  const currentCategory = skillsData[activeCategory];

  return (
    <section className="skills section reveal" id="skills">
      <motion.div
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div variants={itemVariants} className="section-header">
          <h2 className="section-title">Skills</h2>
        </motion.div>

        <motion.div variants={itemVariants} className="skills-tabs">
          {categories.map((category) => {
            const Icon = skillsData[category].icon;
            return (
              <button
                key={category}
                className={`skill-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                <Icon />
                <span>{skillsData[category].title}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div variants={itemVariants} className="skills-grid">
          {currentCategory.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-item glass-effect"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              whileHover={{ y: -6 }}
            >
              <div className="skill-header">
                <h4>{skill.name}</h4>
                <div className="skill-badge">{skill.level}</div>
              </div>
              <div className="skill-pill-row">
                <span className="skill-pill">Agentic</span>
                <span className="skill-pill">AI</span>
                <span className="skill-pill">Autonomy</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Skills;
