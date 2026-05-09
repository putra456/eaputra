import { motion } from 'framer-motion';

export function HomeIndicator() {
  return (
    <motion.div
      className="fixed left-1/2 -translate-x-1/2 z-50"
      style={{
        bottom: 'max(8px, env(safe-area-inset-bottom))',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="w-28 sm:w-32 h-1 rounded-full bg-white/20 backdrop-blur-sm" />
    </motion.div>
  );
}
