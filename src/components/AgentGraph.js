import React, { useEffect, useRef } from 'react';
import './AgentGraph.css';

const AgentGraph = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let nodes = [];
    let animationFrameId;

    const NODE_COUNT = 16;
    const CONNECT_DIST = 180;
    const GUTTER_WIDTH = 0.15; // 15% of screen width

    class Node {
      constructor(w, h) {
        this.side = Math.random() > 0.5 ? 'left' : 'right';
        this.reset(w, h);
      }

      reset(w, h) {
        const margin = w * GUTTER_WIDTH;
        if (this.side === 'left') {
          this.x = Math.random() * margin;
        } else {
          this.x = w - Math.random() * margin;
        }
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = 2 + Math.random() * 3;
        
        const labels = ['LLM-Agent', 'Searcher', 'Python', 'Memory', 'Orch', 'Parser', 'Gateway'];
        this.label = labels[Math.floor(Math.random() * labels.length)];
        
        const colors = ['#00ffcc', '#0077ff', '#8a2be2'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulse = Math.random() * Math.PI * 2;
      }

      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.02;

        const margin = w * GUTTER_WIDTH;
        
        // Constrain to sides
        if (this.side === 'left') {
          if (this.x < 0 || this.x > margin) this.vx *= -1;
        } else {
          if (this.x < w - margin || this.x > w) this.vx *= -1;
        }
        
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw(ctx) {
        const glow = 0.5 + 0.5 * Math.sin(this.pulse);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8 + glow * 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = '8px Inter';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillText(this.label, this.x + 8, this.y + 3);
      }
    }

    const init = () => {
      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;
      nodes = Array.from({ length: NODE_COUNT }, () => new Node(w, h));
    };

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw connections first
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.2;
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, nodes[i].color);
            grad.addColorStop(1, nodes[j].color);
            
            ctx.strokeStyle = grad;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;

            // Moving data pulse on lines
            if (Math.random() > 0.995) {
                // Future improvement: animated pulses on lines
            }
          }
        }
      }

      // Update and draw nodes
      nodes.forEach(node => {
        node.update(w, h);
        node.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="agent-graph-canvas" />;
};

export default AgentGraph;
