import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const WORDS = ['Dream.', 'Create.', 'Inspire.'];

export const IntroSplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    // Only play once per session
    return !sessionStorage.getItem('portfolio_intro_seen');
  });
  const [wordIndex, setWordIndex] = useState(0);
  const [isSlidingOut, setIsSlidingOut] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Lock body scroll while splash overlay is active
    document.body.style.overflow = 'hidden';

    // Sequence timeline:
    // Word 0 ("Dream."): 0ms -> 850ms
    // Word 1 ("Create."): 850ms -> 1700ms
    // Word 2 ("Inspire."): 1700ms -> 2700ms
    // Slide down transition: 2700ms -> 3500ms
    const timer1 = setTimeout(() => {
      setWordIndex(1); // "Create."
    }, 850);

    const timer2 = setTimeout(() => {
      setWordIndex(2); // "Inspire."
    }, 1700);

    const timer3 = setTimeout(() => {
      setIsSlidingOut(true); // Begin curtain slide down
    }, 2700);

    const timer4 = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('portfolio_intro_seen', 'true');
      document.body.style.overflow = '';
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const currentWord = WORDS[wordIndex];
  const mainText = currentWord.replace('.', '');

  return (
    <AnimatePresence>
      <motion.div
        key="splash-overlay"
        initial={{ y: '0%' }}
        animate={{ y: isSlidingOut ? '100%' : '0%' }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1] // Smooth heavy cubic-bezier panel slide
        }}
        className="fixed inset-0 z-[9999] bg-[#16130f] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden"
      >
        {/* Soft atmospheric ambient glow */}
        <div className="absolute w-[450px] h-[450px] bg-[#f2c08d]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Word display animation */}
        <div className="relative h-28 sm:h-36 md:h-44 flex items-center justify-center overflow-hidden px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWord}
              initial={{ y: 45, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -35, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="font-anton text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#eae1db] flex items-center text-center"
            >
              <span>{mainText}</span>
              <span className="text-[#f2c08d]">.</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal accent line at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: isSlidingOut ? '100%' : '90%' }}
            transition={{ duration: 2.7, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-transparent via-[#f2c08d] to-transparent"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
