import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AgentGraph from './components/AgentGraph';
import AIAgentChat from './components/AIAgentChat';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);

  // Security, Scroll-reveal & Tracking
  useEffect(() => {
    if (loading) return;

    // --- SECURITY: Disable Right Click & DevTools ---
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || 
        (e.ctrlKey && e.keyCode === 85)
      ) e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // --- SCROLL: Reveal Animations ---
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- TRACKING: Active Section ---
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setActiveSection(e.target.id);
      }),
      { threshold: 0.4 }
    );
    document.querySelectorAll('section[id]').forEach(el => sectionObserver.observe(el));

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [loading]);

  if (loading) return <Preloader onFinish={() => setLoading(false)} />;

  return (
    <div className="app">
      <AgentGraph />
      <AIAgentChat />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="main-content">
        <Hero setActiveSection={setActiveSection} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
