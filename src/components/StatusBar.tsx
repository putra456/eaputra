import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Battery, Signal } from 'lucide-react';

export function StatusBar() {
  const [time, setTime] = useState('');
  const [battery, setBattery] = useState(87);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // Simulate battery drain
  useEffect(() => {
    const timer = setInterval(() => {
      setBattery((prev) => Math.max(0, prev - Math.random() * 0.1));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const batteryColor = battery > 20 ? 'text-white/60' : 'text-red-400/80';

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        paddingTop: 'max(10px, env(safe-area-inset-top))',
        paddingLeft: 'max(24px, env(safe-area-inset-left))',
        paddingRight: 'max(24px, env(safe-area-inset-right))',
        paddingBottom: '10px',
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <span className="text-xs font-semibold text-white/70 tracking-wide">{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal className="w-3.5 h-3.5 text-white/60" />
        <Wifi className="w-3.5 h-3.5 text-white/60" />
        <div className="flex items-center gap-1">
          <Battery className={`w-5 h-5 ${batteryColor}`} />
          <span className="text-[10px] text-white/50 font-medium hidden sm:inline">{Math.round(battery)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
