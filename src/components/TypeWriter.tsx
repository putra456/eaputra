import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypeWriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export function TypeWriter({ text, delay = 0, speed = 50, className = '' }: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [hasStarted, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && hasStarted && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-white/50 ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </span>
  );
}
