import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  LogOut,
  Copy,
  Check,
  ExternalLink,
  User,
  Crown,
  Shield,
  Code,
  ChevronRight,
} from 'lucide-react';
import { RippleButton } from './RippleButton';

interface DashboardProps {
  username: string;
  role: string;
  onLogout: () => void;
}

const EA_SCRIPT = `//+------------------------------------------------------------------+
//|                  ScalpGridHedge_Premium.mq4                       |
//|           Premium Exclusive EA - Scalping+Grid+Hedging            |
//|         Institutional-Grade Bi-Directional Recovery System        |
//+------------------------------------------------------------------+
#property copyright "Premium Quant Systems"
#property link      "https://premiumquant.com"
#property version   "3.00"
#property strict
#property description "Premium Exclusive: Scalping + Dynamic Grid + Bi-Directional Hedging"
#property description "Designed for Cent Accounts | M1/M5 Timeframes"
#property description "Institutional Risk Management & Net Profit Closure"

//+------------------------------------------------------------------+
//| ENUMERATIONS                                                      |
//+------------------------------------------------------------------+
enum ENUM_TRADE_MODE
{
   MODE_BIDIRECTIONAL = 0, // Bi-Directional (Buy & Sell)
   MODE_BUY_ONLY      = 1, // Buy Only
   MODE_SELL_ONLY      = 2  // Sell Only
};

//+------------------------------------------------------------------+
//| INPUT PARAMETERS                                                  |
//+------------------------------------------------------------------+
//--- General Settings
extern string     _gen_sep          = "══════ GENERAL SETTINGS ══════";
extern int        MagicBuy          = 111111;       // Magic Number Buy Basket
extern int        MagicSell         = 222222;       // Magic Number Sell Basket
extern ENUM_TRADE_MODE TradeMode    = MODE_BIDIRECTIONAL; // Trade Mode

//--- Scalping & Grid Settings
extern string     _scalp_sep        = "══════ SCALPING & GRID ══════";
extern double     BaseLot           = 0.10;         // Base Lot Size
extern double     LotMultiplier     = 1.5;          // Lot Multiplier (Grid Progression)
extern double     MaxLotSize        = 5.0;          // Maximum Lot Per Order
extern int        MaxGridLevels     = 8;            // Max Grid Levels Per Direction
extern double     GridStepPips      = 15.0;         // Default Grid Step (Pips)
extern bool       UseATRGrid        = true;         // Use ATR for Dynamic Grid Step
extern int        ATRPeriod         = 14;           // ATR Period
extern double     ATRMultiplier     = 1.5;          // ATR Multiplier for Grid Step
extern double     ScalpTPPips       = 5.0;          // Fast Scalp TP Per Order (Pips)
extern double     BasketTPPips      = 3.0;          // Basket TP from Average Price (Pips)

//--- Hedging & Netting Settings
extern string     _hedge_sep        = "══════ HEDGING & NETTING ══════";
extern double     GlobalNetProfit   = 200.0;        // Global Net Profit Target (Cent)
extern bool       EnableNetClose    = true;         // Enable Global Net Profit Close

//--- Risk Control & Filters
extern string     _risk_sep         = "══════ RISK MANAGEMENT ══════";
extern int        MaxSpreadPoints   = 30;           // Max Spread (Points)
extern int        MaxSlippage       = 3;            // Max Slippage (Points)
extern double     MaxDrawdownPct    = 30.0;         // Max Drawdown % (Emergency Close)
extern double     DailyTargetProfit = 1000.0;       // Daily Profit Target (Cent)
extern double     DailyStopLoss     = 500.0;        // Daily Stop Loss (Cent)
extern double     MinFreeMarginPct  = 200.0;        // Min Margin Level % to Open Orders

// ... [Script continues - total 1000+ lines]
// Full source available after verification

//+------------------------------------------------------------------+
//| END OF EA                                                         |
//+------------------------------------------------------------------+
`;

export function Dashboard({ username, role, onLogout }: DashboardProps) {
  const [showScript, setShowScript] = useState(false);
  const [copied, setCopied] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EA_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAdmin = role === 'admin';

  return (
    <motion.div
      ref={containerRef}
      className="relative z-10 w-full max-w-[520px] px-4 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12 flex flex-col items-center min-h-[100dvh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Card */}
      <motion.div
        className="liquid-glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-8 w-full mb-4 sm:mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 40%), rgba(255,255,255,0.04)`,
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-40"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl liquid-glass flex items-center justify-center overflow-hidden p-1"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img 
                  src="https://i.postimg.cc/pVCw2NjM/1778327126809-019e0c8d-4a61-7565-b5ba-b5dd6c6e3fe7.png"
                  alt="Xau×Putra Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const icon = document.createElement('div');
                      icon.innerHTML = '✦';
                      icon.style.cssText = 'font-size: 24px; color: rgba(255,255,255,0.8);';
                      parent.appendChild(icon);
                    }
                  }}
                />
              </motion.div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                  <span className="shimmer-text">Xau×Putra</span>
                </h1>
                <p className="text-[10px] sm:text-xs text-white/30 tracking-wide">
                  Dashboard
                </p>
              </div>
            </div>
            <RippleButton
              onClick={onLogout}
              className="liquid-glass-btn p-2.5 sm:p-3 rounded-xl touch-manipulation"
            >
              <LogOut className="w-4 h-4 text-white/50" />
            </RippleButton>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl liquid-glass">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full liquid-glass-strong flex items-center justify-center">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-semibold text-white/90 truncate">
                {username}
              </p>
              <div className="flex items-center gap-1.5">
                {isAdmin ? (
                  <Crown className="w-3 h-3 text-yellow-400/70" />
                ) : (
                  <Shield className="w-3 h-3 text-blue-400/70" />
                )}
                <span className="text-[10px] sm:text-xs text-white/40 capitalize">
                  {role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* TikTok Follow Card */}
      <motion.div
        className="liquid-glass rounded-2xl p-4 sm:p-6 w-full mb-4 sm:mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.04), transparent 40%), rgba(255,255,255,0.03)`,
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 40%)`,
          }}
        />
        <div className="relative z-10">
          <h2 className="text-xs sm:text-sm font-semibold text-white/70 mb-3 tracking-wide uppercase">
            Follow Owner First
          </h2>
          <p className="text-[10px] sm:text-xs text-white/30 mb-4 leading-relaxed">
            Follow TikTok owner to unlock the EA script. Click the button below to open TikTok.
          </p>
        <a
          href="https://www.tiktok.com/@jeiiwaaaa?_r=1&_t=ZS-96DRrdP82K4"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <RippleButton className="liquid-glass-btn w-full py-3 sm:py-3.5 rounded-xl text-white/90 font-medium text-xs sm:text-sm flex items-center justify-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Follow @jeiiwaaaa on TikTok</span>
          </RippleButton>
        </a>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => setFollowed(!followed)}
            className={`flex items-center gap-2 text-[10px] sm:text-xs transition-colors duration-200 ${
              followed ? 'text-green-400/70' : 'text-white/30 hover:text-white/50'
            }`}
          >
            <div
              className={`w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center ${
                followed
                  ? 'bg-green-400/20 border-green-400/40'
                  : 'border-white/20'
              }`}
            >
              {followed && <Check className="w-2.5 h-2.5" />}
            </div>
            <span>I have followed</span>
          </button>
        </div>
        </div>
      </motion.div>

      {/* Get EA Script */}
      <motion.div
        className="liquid-glass rounded-2xl p-4 sm:p-6 w-full mb-4 sm:mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.04), transparent 40%), rgba(255,255,255,0.03)`,
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 40%)`,
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-3.5 h-3.5 text-white/40" />
            <h2 className="text-xs sm:text-sm font-semibold text-white/70 tracking-wide uppercase">
              EA Script
            </h2>
          </div>
          <p className="text-[10px] sm:text-xs text-white/30 mb-4 leading-relaxed">
            Click Get EA to reveal your trading script. Make sure you have followed the owner first.
          </p>

        {!showScript ? (
          <motion.div
            animate={
              !followed
                ? {
                    opacity: [0.6, 1, 0.6],
                  }
                : {}
            }
            transition={
              !followed
                ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : {}
            }
          >
            <RippleButton
              onClick={() => followed && setShowScript(true)}
              disabled={!followed}
              className={`liquid-glass-btn w-full py-3 sm:py-3.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 ${
                followed
                  ? 'text-white/90'
                  : 'text-white/30 cursor-not-allowed'
              }`}
            >
              <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{followed ? 'Get EA' : 'Follow TikTok First'}</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </RippleButton>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative rounded-xl bg-black/40 border border-white/5 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                  <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  <span className="text-[10px] text-white/30 ml-1">XauPutra_EA.mq4</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[10px] text-white/40 hover:text-white/70 transition-colors p-1 touch-manipulation"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-green-400/70" />
                      <span className="text-green-400/70">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 sm:p-4 text-[9px] sm:text-[11px] text-white/50 font-mono overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                {EA_SCRIPT}
              </pre>
            </div>
          </motion.div>
        )}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="text-center text-[9px] sm:text-[10px] text-white/15 tracking-wider mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Xau×Putra &copy; {new Date().getFullYear()} &middot; Authorized Access Only
      </motion.p>
    </motion.div>
  );
}
