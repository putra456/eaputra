import { useState } from 'react';
import { Background } from './components/Background';
import { StatusBar } from './components/StatusBar';
import { TimeDisplay } from './components/TimeDisplay';
import { LoginCard } from './components/LoginCard';
import { Dashboard } from './components/Dashboard';
import { HomeIndicator } from './components/HomeIndicator';
import { FloatingElements } from './components/FloatingElements';
import { TypeWriter } from './components/TypeWriter';
import { useMouseParallax } from './hooks/useMouseParallax';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const mouse = useMouseParallax();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '', role: '' });

  const handleLogin = (username: string, role: string) => {
    setUser({ username, role });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ username: '', role: '' });
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start sm:justify-center overflow-x-hidden overflow-y-auto">
      {/* Background Layers */}
      <Background />
      <FloatingElements />

      {/* iOS Status Bar */}
      <StatusBar />

      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.main
            key="login"
            className="relative z-10 w-full max-w-[460px] px-4 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12 flex flex-col items-center justify-center min-h-[100dvh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              transform: `translate(${mouse.normalizedX * -4}px, ${mouse.normalizedY * -4}px)`,
            }}
          >
            {/* Time Display */}
            <TimeDisplay />

            {/* Human-style tagline */}
            <motion.div
              className="mb-4 sm:mb-6 text-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[10px] sm:text-xs text-white/30 font-light tracking-wider">
                <TypeWriter
                  text="Where technology meets humanity"
                  delay={800}
                  speed={40}
                />
              </p>
            </motion.div>

            {/* Login Card */}
            <LoginCard
              mouseX={mouse.x}
              mouseY={mouse.y}
              onLogin={handleLogin}
            />

            {/* Bottom Text */}
            <motion.div
              className="mt-4 sm:mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <p className="text-[9px] sm:text-[10px] text-white/20 tracking-widest uppercase mb-1">
                Secure &middot; Private &middot; Human
              </p>
              <p className="text-[8px] sm:text-[9px] text-white/10 tracking-wider">
                Xau×Putra &copy; {new Date().getFullYear()}
              </p>
            </motion.div>
          </motion.main>
        ) : (
          <motion.div
            key="dashboard"
            className="relative z-10 w-full flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Dashboard
              username={user.username}
              role={user.role}
              onLogout={handleLogout}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Home Indicator */}
      <HomeIndicator />
    </div>
  );
}

export default App;
