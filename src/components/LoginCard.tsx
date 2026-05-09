import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  User,
  Lock,
  ArrowRight,
  Fingerprint,
  CheckCircle2,
  Loader2,
  Shield,
  XCircle,
} from 'lucide-react';
import { RippleButton } from './RippleButton';
import { ParticleBurst } from './ParticleBurst';

interface LoginCardProps {
  mouseX?: number;
  mouseY?: number;
  onLogin: (username: string, role: string) => void;
}

const VALID_USERS = [
  { username: 'admin', password: 'admin', role: 'admin' },
  { username: 'buyer', password: 'buyer', role: 'buyer' },
];

export function LoginCard({ mouseX = 0, mouseY = 0, onLogin }: LoginCardProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [localMousePosition, setLocalMousePosition] = useState({ x: 0, y: 0 });
  const [shake, setShake] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setLocalMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      return () => card.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const mousePosition = cardRef.current ? localMousePosition : { x: mouseX, y: mouseY };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const user = VALID_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setIsLoading(false);
      setIsSuccess(true);
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 2000);
      setTimeout(() => {
        onLogin(user.username, user.role);
      }, 1500);
    } else {
      setIsLoading(false);
      setShake(true);
      setError('Invalid username or password');
      setTimeout(() => setShake(false), 500);
    }
  };

  const inputVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      ref={cardRef}
      className="liquid-glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-10 w-full mx-auto relative"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        x: shake ? [0, -10, 10, -10, 10, -5, 5, 0] : 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        x: shake ? { duration: 0.5 } : undefined,
      }}
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%), rgba(255,255,255,0.05)`,
        maxWidth: '420px',
        width: '100%',
      }}
    >
      {/* Particle Burst */}
      <ParticleBurst trigger={showBurst} originX={0.5} originY={0.5} />

      {/* Spotlight effect */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-50"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08), transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 rounded-2xl liquid-glass flex items-center justify-center overflow-hidden p-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img 
              src="https://i.postimg.cc/pVCw2NjM/1778327126809-019e0c8d-4a61-7565-b5ba-b5dd6c6e3fe7.png"
              alt="Xau×Putra Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const icon = document.createElement('div');
                  icon.innerHTML = '✦';
                  icon.style.cssText = 'font-size: 32px; color: rgba(255,255,255,0.8); display: flex; align-items: center; justify-content: center;';
                  parent.appendChild(icon);
                }
              }}
            />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
            <span className="shimmer-text">Xau×Putra</span>
          </h1>
          <p className="text-white/40 text-xs sm:text-sm font-medium tracking-wide">
            Welcome back, human.
          </p>
        </motion.div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              className="flex flex-col items-center justify-center py-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-white/80 mb-4" />
              </motion.div>
              <motion.h2
                className="text-lg sm:text-xl font-semibold text-white/90 mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Welcome Home
              </motion.h2>
              <motion.p
                className="text-white/40 text-xs sm:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Redirecting to dashboard...
              </motion.p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Username Input */}
              <motion.div
                variants={inputVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.3 }}
              >
                <label className="block text-[10px] sm:text-xs font-medium text-white/50 mb-1.5 sm:mb-2 ml-1 tracking-wide uppercase">
                  Username
                </label>
                <div className="relative group">
                  <User
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                      focusedField === 'username' ? 'text-white/70' : 'text-white/30'
                    }`}
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError('');
                    }}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="admin or buyer"
                    className="liquid-input w-full pl-11 pr-4 py-3.5 sm:py-3.5 rounded-xl text-white/90 text-base sm:text-sm placeholder:text-white/25 transition-all duration-300"
                    required
                    autoComplete="username"
                    autoCapitalize="off"
                  />
                  <motion.div
                    className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'username' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                variants={inputVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
              >
                <label className="block text-[10px] sm:text-xs font-medium text-white/50 mb-1.5 sm:mb-2 ml-1 tracking-wide uppercase">
                  Password
                </label>
                <div className="relative group">
                  <Lock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                      focusedField === 'password' ? 'text-white/70' : 'text-white/30'
                    }`}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter password"
                    className="liquid-input w-full pl-11 pr-12 py-3.5 sm:py-3.5 rounded-xl text-white/90 text-base sm:text-sm placeholder:text-white/25 transition-all duration-300"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-200 p-2 touch-manipulation"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <motion.div
                    className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'password' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="flex items-center gap-2 text-red-400/80 text-xs"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div
                variants={inputVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.55 }}
              >
                <RippleButton
                  type="submit"
                  disabled={isLoading}
                  className="liquid-glass-btn w-full py-3.5 sm:py-3.5 rounded-xl text-white/90 font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </RippleButton>
              </motion.div>

              {/* Biometric */}
              <motion.div
                className="flex justify-center"
                variants={inputVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  type="button"
                  className="liquid-glass-btn p-3.5 sm:p-3 rounded-full touch-manipulation"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setShake(true);
                      setError('Biometric not available');
                      setTimeout(() => setShake(false), 500);
                    }, 800);
                  }}
                  aria-label="Sign in with biometric"
                >
                  <Fingerprint className="w-5 h-5 text-white/60" />
                </motion.button>
              </motion.div>

              {/* Security Badge */}
              <motion.div
                className="flex items-center justify-center gap-1.5 pt-1"
                variants={inputVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.7 }}
              >
                <Shield className="w-3 h-3 text-white/20" />
                <span className="text-[9px] sm:text-[10px] text-white/15 tracking-wider">
                  End-to-end encrypted
                </span>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
