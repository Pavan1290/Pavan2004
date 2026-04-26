import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

function Projects() {
  const projects = [
    {
      title: 'SIGMA OS – AI-Integrated Operating System',
      subtitle: 'Tech Vision 2025: 1st Place',
      description: 'Built SIGMA OS as an agentic AI operating system: an orchestration layer of Generative Agents enabling planner-driven workflows, tool use, long-term memory, and multi-agent coordination. Reduced manual tasks by 40% and enabled cross-agent automation pipelines.',
      technologies: ['Agentic AI', 'Agent Orchestration', 'Generative Agents', 'LangChain Agents', 'Tool Use', 'Long-term Memory'],
      award: '🥇 1st Place',
      impact: '40% task automation reduction'
    },
    {
      title: 'Deepfake Face Detection System',
      subtitle: 'Kochi Hackathon 2025: 2nd Runner-Up',
      description: 'Achieved 92% accuracy using Transfer Learning (ResNet-50) and implemented PyTorch architecture design with MLOps optimization. Engineered robust deployment by resolving critical VRAM bottlenecks.',
      technologies: ['PyTorch', 'ResNet-50', 'CNNs', 'MLOps', 'CUDA', 'Optimization'],
      award: '🥉 2nd Runner-Up',
      impact: '92% Accuracy'
    },
    {
      title: 'Personalized Diabetic Meal Planner',
      subtitle: 'Project Expo 2024: 1st Prize',
      description: 'Created AI-based meal planner using K-Means and KNN; improved dietary compliance by 25%. Integrated REST API for real-time personalized recommendations.',
      technologies: ['Python', 'Flask', 'Scikit-learn', 'SQLite', 'Visualization'],
      award: '🥇 1st Prize',
      impact: '25% compliance improvement'
    },
    {
      title: 'SRI SAI BLOSSOMS Website Project',
      subtitle: 'Freelance Project (Jan 2025 – Mar 2025)',
      description: 'Designed and deployed a modern, responsive school website with secure admin panel. Implemented SEO and caching strategies, reducing load time by 60%.',
      technologies: ['MERN Stack', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'SEO'],
      award: '📊 60% Load Time Improvement',
      impact: 'Deployed successfully'
    },
    {
      title: 'AI Timetable Generator',
      subtitle: 'Internal Deployment 2024',
      description: 'Automated scheduling for 500+ students and 50+ faculty; reduced conflicts by 90%. Applied hybrid optimization with constraint satisfaction.',
      technologies: ['Python', 'Genetic Algorithm', 'Deep Learning', 'SQLite'],
      award: '⚡ 90% Conflict Reduction',
      impact: '500+ Students Managed'
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="projects section" id="projects">
      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div variants={itemVariants} className="section-header">
          <h2 className="section-title">Projects</h2>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="project-card glass-effect"
              whileHover={{ y: -10 }}
            >
              <div className="project-header">
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                </div>
                <span className="project-award">{project.award}</span>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-metrics">
                <span className="metric">{project.impact}</span>
              </div>

              <div className="project-tags">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="project-footer">
                <button className="project-btn">
                  <FaGithub /> Code
                </button>
                <button className="project-btn">
                  <FaExternalLinkAlt /> Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Projects;
