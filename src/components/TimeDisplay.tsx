import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const day = time.toLocaleDateString('en-US', { weekday: 'long' });
  const date = time.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <motion.div
      className="text-center mb-4 sm:mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
    >
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white/90 tabular-nums">
          {hours}:{minutes}
        </span>
        <motion.span
          className="text-lg sm:text-xl md:text-2xl font-light text-white/40 tabular-nums"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {seconds}
        </motion.span>
      </div>
      <p className="text-xs sm:text-sm text-white/30 mt-1 font-medium tracking-wide">
        {day}, {date}
      </p>
    </motion.div>
  );
}
