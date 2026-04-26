import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import './Experience.css';

function Experience() {
  const experiences = [
    {
      title: 'Software Engineer',
      company: 'Novigo Solutions Pvt Ltd',
      location: 'Mangalore, India',
      period: 'Feb 2 – Present',
      description: 'Working on agentic AI systems: building Generative Agents, Copilot Studio integrations, LangChain agent orchestration, autonomous agent workflows, and open-source tooling.',
      technologies: ['Agentic AI', 'Generative Agents', 'Copilot Studio', 'LangChain Agents', 'Autonomous Orchestration', 'Open Source']
    },
    {
      title: 'Student Trainee, React Development',
      company: 'Incture Technologies',
      location: 'Mangalore, India',
      period: 'Jul 2025 – Sep 2025',
      description: 'Mastered React Hooks, Context API, and advanced optimization techniques for scalable applications. Built real-time projects with UI components and integrated RESTful APIs using modern web architecture.',
      technologies: ['React', 'Hooks', 'Context API', 'RESTful APIs', 'Optimization']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="experience section" id="experience">
      <motion.div
        className="experience-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div variants={itemVariants} className="section-header">
          <h2 className="section-title">Work Experience</h2>
        </motion.div>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="experience-item glass-effect"
              whileHover={{ x: 10 }}
            >
              <div className="experience-marker">
                <FaBriefcase />
              </div>

              <div className="experience-content">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.title}</h3>
                  <span className="experience-company">{exp.company}</span>
                </div>

                <div className="experience-meta">
                  <div className="meta-item">
                    <FaCalendar />
                    <span>{exp.period}</span>
                  </div>
                  <div className="meta-item">
                    <FaMapMarkerAlt />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="experience-description">{exp.description}</p>

                <div className="experience-tags">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Experience;
