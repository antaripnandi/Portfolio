import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const WORDS = ['Dream.', 'Create.', 'Inspire.'];

interface IntroSplashScreenProps {
  onComplete?: () => void;
}

export const IntroSplashScreen: React.FC<IntroSplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  const timer1Ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timer2Ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasCalledComplete = useRef(false);

  const triggerComplete = () => {
    if (!hasCalledComplete.current) {
      hasCalledComplete.current = true;
      onComplete?.();
    }
  };

  useEffect(() => {
    if (!isVisible) return;

    // Reset scroll position to top
    window.scrollTo(0, 0);

    // Lock body scroll while splash overlay is active
    document.body.style.overflow = 'hidden';

    // Timeline:
    // Sequential text reveal: Word 0 (0.1s->0.9s), Word 1 (0.6s->1.4s), Word 2 (1.1s->1.9s)
    // At 2200ms, start curtain slide down transition & notify hero fade-in to begin
    // At 3000ms, complete splash screen
    timer1Ref.current = setTimeout(() => {
      setIsSlidingOut(true); // Begin curtain slide down
      triggerComplete();
    }, 2200);

    timer2Ref.current = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
    }, 3000);

    return () => {
      if (timer1Ref.current) clearTimeout(timer1Ref.current);
      if (timer2Ref.current) clearTimeout(timer2Ref.current);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  const handleSkip = () => {
    if (isSkipped) return;

    if (timer1Ref.current) clearTimeout(timer1Ref.current);
    if (timer2Ref.current) clearTimeout(timer2Ref.current);

    setIsSkipped(true);
    setIsSlidingOut(true);
    triggerComplete();

    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
    }, 350);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="splash-overlay"
        onClick={handleSkip}
        initial={{ y: '0%' }}
        animate={{ y: isSlidingOut ? '100%' : '0%' }}
        transition={{
          duration: isSkipped ? 0.35 : 0.8,
          ease: isSkipped ? [0.4, 0, 1, 1] : [0.76, 0, 0.24, 1]
        }}
        className="fixed inset-0 z-[9999] bg-[#16130f] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden cursor-pointer"
      >
        {/* Soft atmospheric ambient glow */}
        <div className="absolute w-[500px] h-[500px] bg-[#f2c08d]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Side-by-side words display */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 font-anton text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#eae1db] text-center px-6">
          {WORDS.map((word, idx) => (
            <motion.div
              key={word}
              initial={{ y: 24, opacity: 0, scale: 1 }}
              animate={
                isSlidingOut
                  ? { y: -16, opacity: 0, scale: 0.95 }
                  : { y: 0, opacity: 1, scale: 1 }
              }
              transition={
                isSlidingOut
                  ? { duration: isSkipped ? 0.2 : 0.45, delay: isSkipped ? 0 : idx * 0.05, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 0.8, delay: idx * 0.5 + 0.1, ease: [0.16, 1, 0.3, 1] }
              }
              className="flex items-center"
            >
              <span>{word.replace('.', '')}</span>
              <span className="text-[#f2c08d]">.</span>
            </motion.div>
          ))}
        </div>

        {/* Minimal accent line at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: isSlidingOut ? '100%' : '90%' }}
            transition={{ duration: isSkipped ? 0.35 : 2.2, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-transparent via-[#f2c08d] to-transparent"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
