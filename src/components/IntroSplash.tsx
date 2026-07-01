import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroSplash({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 500);
  };

  const rightKey = "Right Key".split("");
  const navigators = "Navigators".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-[#1C1C2E] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(circle at center, #2C3E6B 0%, #1C1C2E 80%)",
          }}
        >
          {/* Background Pattern */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A84C] rounded-full mix-blend-screen filter blur-[100px]"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.05, 0.08, 0.05]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C9A84C] rounded-full mix-blend-screen filter blur-[100px]"
            />
          </div>

          {/* Corner Lines */}
          <motion.div 
            initial={{ clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 70% 0, 70% 70%, 0 70%)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-8 left-8 w-32 h-32 border-t border-l border-[#C9A84C] opacity-50"
          />
          <motion.div 
            initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 0, 100% 0)' }}
            animate={{ clipPath: 'polygon(30% 0, 100% 0, 100% 70%, 30% 70%)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-8 right-8 w-32 h-32 border-t border-r border-[#C9A84C] opacity-50"
          />
          <motion.div 
            initial={{ clipPath: 'polygon(0 100%, 0 100%, 0 100%, 0 100%)' }}
            animate={{ clipPath: 'polygon(0 30%, 70% 30%, 70% 100%, 0 100%)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute bottom-8 left-8 w-32 h-32 border-b border-l border-[#C9A84C] opacity-50"
          />
          <motion.div 
            initial={{ clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)' }}
            animate={{ clipPath: 'polygon(30% 30%, 100% 30%, 100% 100%, 30% 100%)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute bottom-8 right-8 w-32 h-32 border-b border-r border-[#C9A84C] opacity-50"
          />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5, duration: 1 }}
              className="mb-8"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/>
                <path d="m21 2-9.6 9.6"/>
                <circle cx="7.5" cy="15.5" r="5.5"/>
              </svg>
            </motion.div>

            <div className="flex space-x-2 text-6xl md:text-8xl font-serif font-bold text-[#FDFAF5] mb-2">
              {rightKey.map((letter, i) => (
                <motion.span
                  key={`rk-${i}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>

            <div className="flex space-x-1 text-2xl md:text-4xl font-serif font-light tracking-[0.3em] text-[#C9A84C] relative mb-6">
              {navigators.map((letter, i) => (
                <motion.span
                  key={`nav-${i}`}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + (navigators.length - 1 - i) * 0.08, duration: 0.5 }}
                >
                  {letter}
                </motion.span>
              ))}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.8, duration: 0.6, ease: "easeInOut" }}
                className="absolute -bottom-2 left-0 h-[1px] bg-[#C9A84C]"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="text-[#FDFAF5] font-sans text-sm md:text-base tracking-wide"
            >
              Your Trusted Real Estate Partner
            </motion.p>
          </div>

          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 text-[#C9A84C] text-sm opacity-60 hover:opacity-100 transition-opacity font-sans"
            data-testid="button-skip-intro"
          >
            Skip Intro &rarr;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
