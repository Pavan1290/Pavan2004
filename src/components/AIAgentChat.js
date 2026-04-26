import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes, FaMinus, FaChevronUp } from 'react-icons/fa';
import './AIAgentChat.css';

const AIAgentChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "System initialized. I am Pavan's personal Agent. How can I assist your query?", thought: "BOOTING_SEQUENCE_COMPLETE..." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [thoughtProcess, setThoughtProcess] = useState('');
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thoughtProcess]);

  const responses = {
    'tech stack': "Pavan specializes in the Agentic Stack: Python, LangChain, React, and LLM Orchestration. He's also proficient in Node.js, MongoDB, and AWS.",
    'work': "He is currently a Software Engineer at Novigo Solutions Pvt Ltd, focusing on Agentic AI and Autonomous Automation.",
    'contact': "You can reach Pavan at shivaiahh463@gmail.com or connect via LinkedIn in the footer.",
    'projects': "His key projects include a Personalized Diabetic Meal Planner (AI-driven) and an AI-Based Automatic Timetable Generator.",
    'default': "I have processed your request. Pavan is highly skilled in Agentic AI, LLMs, and Full Stack development. You can see more details in the sections above."
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    // Simulate "Thought Process"
    const thoughts = [
      "> ANALYZING_USER_INPUT...",
      "> ACCESSING_KNOWLEDGE_BASE...",
      "> CROSS_REFERENCING_AGENT_LOGS...",
      "> GENERATING_OPTIMAL_RESPONSE..."
    ];

    for (const thought of thoughts) {
      setThoughtProcess(thought);
      await new Promise(r => setTimeout(r, 600));
    }

    setThoughtProcess('');
    setIsTyping(false);

    let responseContent = responses.default;
    if (userMsg.includes('stack') || userMsg.includes('tech')) responseContent = responses['tech stack'];
    else if (userMsg.includes('work') || userMsg.includes('job') || userMsg.includes('company')) responseContent = responses.work;
    else if (userMsg.includes('contact') || userMsg.includes('email') || userMsg.includes('reach')) responseContent = responses.contact;
    else if (userMsg.includes('project') || userMsg.includes('build')) responseContent = responses.projects;

    setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
  };

  return (
    <div className={`agent-chat-wrapper ${isOpen ? 'open' : ''} ${isMinimized ? 'minimized' : ''}`}>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button 
          className="chat-trigger"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="trigger-icon">
            <FaRobot />
          </div>
          <span className="trigger-text">ASK AGENT</span>
          <div className="trigger-ping"></div>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-window glass-effect"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="header-info">
                <FaRobot className="bot-icon" />
                <div>
                  <h4>PAVAN_AGENT_v1.0</h4>
                  <div className="status-indicator">
                    <span className="dot"></span> ONLINE
                  </div>
                </div>
              </div>
              <div className="header-actions">
                <button onClick={() => setIsMinimized(!isMinimized)}><FaMinus /></button>
                <button onClick={() => setIsOpen(false)}><FaTimes /></button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="chat-messages" ref={scrollRef}>
                  {messages.map((msg, i) => (
                    <div key={i} className={`message-bubble ${msg.role}`}>
                      <div className="bubble-content">{msg.content}</div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="thought-stream">
                      <div className="thought-text">{thoughtProcess}</div>
                      <div className="typing-dots">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <form className="chat-input" onSubmit={handleSend}>
                  <input 
                    type="text" 
                    placeholder="Ask about tech, work, or contact..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button type="submit">
                    <FaPaperPlane />
                  </button>
                </form>
              </>
            )}

            {isMinimized && (
              <div className="minimized-strip" onClick={() => setIsMinimized(false)}>
                <span>Chat is minimized</span>
                <FaChevronUp />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAgentChat;
