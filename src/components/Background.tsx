import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      pulsePhase: number;
      pulseSpeed: number;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    // Detect mobile/low-end device
    const isMobile = window.innerWidth < 640 || 'ontouchstart' in window;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const particleMultiplier = isMobile || isLowEnd ? 0.4 : 1;
    const skipFrames = isMobile || isLowEnd ? 2 : 1;

    const createParticles = () => {
      particles = [];
      const baseCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 20000));
      const count = Math.floor(baseCount * particleMultiplier);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.05,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    let frameCount = 0;
    const draw = () => {
      frameCount++;
      // Skip frames for performance on mobile
      if (frameCount % (skipFrames + 1) === 0) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        particles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;
          p.pulsePhase += p.pulseSpeed;

          const pulseOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulsePhase));

          if (p.x < 0) p.x = window.innerWidth;
          if (p.x > window.innerWidth) p.x = 0;
          if (p.y < 0) p.y = window.innerHeight;
          if (p.y > window.innerHeight) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity})`;
          ctx.fill();

          // Draw connections (only every 3rd particle for performance)
          if (i % 3 === 0) {
            for (let j = i + 1; j < particles.length; j += 2) {
              const p2 = particles[j];
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        });
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    const handleResize = () => {
      resize();
      createParticles();
    };

    // Visibility API to pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        draw();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 animated-gradient">
      {/* Floating Orbs with varied positions */}
      <motion.div
        className="orb orb-1"
        style={{ top: '5%', left: '10%' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      />
      <motion.div
        className="orb orb-2"
        style={{ top: '40%', right: '5%', width: '350px', height: '350px' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 3, ease: 'easeOut', delay: 0.3 }}
      />
      <motion.div
        className="orb orb-3"
        style={{ bottom: '10%', left: '35%', width: '300px', height: '300px' }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.6 }}
      />
      <motion.div
        className="orb"
        style={{
          top: '60%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(180,180,180,0.08) 0%, transparent 70%)',
          animation: 'floatOrb2 22s ease-in-out infinite',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 0.9 }}
      />

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.9 }}
      />

      {/* Noise Overlay */}
      <div className="noise-overlay" />
    </div>
  );
}
