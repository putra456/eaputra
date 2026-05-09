import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
  delay: number;
}

interface ParticleBurstProps {
  trigger: boolean;
  originX?: number;
  originY?: number;
}

export function ParticleBurst({ trigger, originX = 0.5, originY = 0.5 }: ParticleBurstProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: originX,
          y: originY,
          angle: (Math.PI * 2 * i) / 30 + (Math.random() - 0.5) * 0.5,
          distance: Math.random() * 150 + 50,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 0.8 + 0.4,
          delay: Math.random() * 0.2,
        });
      }
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [trigger, originX, originY]);

  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none z-50"
          style={{
            width: p.size,
            height: p.size,
            background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`,
            boxShadow: `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.3)`,
          }}
          initial={{
            left: `${p.x * 100}%`,
            top: `${p.y * 100}%`,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            left: `${p.x * 100 + Math.cos(p.angle) * p.distance}px`,
            top: `${p.y * 100 + Math.sin(p.angle) * p.distance}px`,
            scale: [0, 1.5, 0],
            opacity: [1, 0.8, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </AnimatePresence>
  );
}
