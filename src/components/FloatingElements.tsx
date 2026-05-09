import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  blur: number;
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 640 || 'ontouchstart' in window;
    const count = isMobile ? 6 : 12;
    const els: FloatingElement[] = [];
    for (let i = 0; i < count; i++) {
      els.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 80 + 20,
        delay: Math.random() * 5,
        duration: Math.random() * 15 + 12,
        opacity: Math.random() * 0.06 + 0.02,
        blur: Math.random() * 40 + 20,
      });
    }
    setElements(els);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: el.size,
            height: el.size,
            background: `radial-gradient(circle, rgba(255,255,255,${el.opacity}) 0%, transparent 70%)`,
            filter: `blur(${el.blur}px)`,
          }}
          animate={{
            y: [0, -40, 30, -20, 0],
            x: [0, 20, -30, 15, 0],
            scale: [1, 1.15, 0.85, 1.05, 1],
            opacity: [el.opacity, el.opacity * 1.5, el.opacity * 0.7, el.opacity * 1.2, el.opacity],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Gradient rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border border-white/[0.03]"
          style={{
            width: `${300 + i * 200}px`,
            height: `${300 + i * 200}px`,
            left: '50%',
            top: '50%',
            marginLeft: `${-(300 + i * 200) / 2}px`,
            marginTop: `${-(300 + i * 200) / 2}px`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 60 + i * 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}
    </div>
  );
}
