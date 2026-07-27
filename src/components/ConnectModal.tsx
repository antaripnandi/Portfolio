import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TiltCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, onClick, href, className = '' }) => {
  const cardRef = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  };

  const innerElement = (
    <>
      {/* Dynamic Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glowPos.opacity,
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(242, 192, 141, 0.12), transparent 70%)`
        }}
      />
      {/* Ambient hover border highlight line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#f2c08d]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </>
  );

  const cardClassName = `relative block w-full rounded-xl border border-white/10 hover:border-[#f2c08d]/60 bg-[#1e1a16] p-5 sm:p-6 text-left transition-colors duration-300 group overflow-hidden ${className}`;

  if (href) {
    return (
      <a
        ref={cardRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform, transition: 'transform 0.15s ease-out, box-shadow 0.3s ease' }}
        className={cardClassName}
      >
        {innerElement}
      </a>
    );
  }

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.15s ease-out, box-shadow 0.3s ease' }}
      className={cardClassName}
    >
      {innerElement}
    </div>
  );
};

export const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  // Prevent background scrolling & stop Lenis when Connect modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleDiscordCopy = () => {
    navigator.clipboard.writeText('e5g._');
    setCopiedDiscord(true);
    setTimeout(() => {
      setCopiedDiscord(false);
    }, 2500);
  };

  const options = [
    {
      id: 'mail',
      num: '01',
      title: 'Email',
      value: 'bantarip4@gmail.com',
      note: 'Primary Inbox · 24h Response',
      type: 'link' as const,
      url: 'mailto:bantarip4@gmail.com',
      actionLabel: 'Send Mail'
    },
    {
      id: 'instagram',
      num: '02',
      title: 'Instagram',
      value: '@antaripbozoo',
      note: 'DMs Open · Visual & Personal',
      type: 'link' as const,
      url: 'https://www.instagram.com/antaripbozoo/',
      actionLabel: 'Open Profile'
    },
    {
      id: 'discord',
      num: '03',
      title: 'Discord',
      value: 'e5g._',
      note: 'Community & Direct Chat',
      type: 'copy' as const,
      actionLabel: copiedDiscord ? 'Copied!' : 'Copy Handle'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0c0a08]/85 backdrop-blur-md"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto overscroll-contain custom-scrollbar bg-[#14110e] border border-white/10 rounded-2xl p-5 sm:p-8 md:p-9 shadow-2xl z-10"
          >
            {/* Soft subtle warm top radial glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-36 bg-[#f2c08d]/10 blur-3xl pointer-events-none rounded-full" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#d4c4b7]/70 hover:text-[#f2c08d] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>

            {/* Modal Header */}
            <div className="mb-6 sm:mb-8 text-left pr-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f2c08d]" />
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-[#f2c08d]">
                  CONNECT
                </span>
              </div>
              <h2 className="font-anton text-2xl sm:text-3xl tracking-wide uppercase text-[#f0e8e0]">
                Get in touch
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#d4c4b7]/70 mt-1">
                Select your preferred channel below.
              </p>
            </div>

            {/* 3 Interactive Tilt Cards */}
            <div className="space-y-3.5">
              {options.map((opt) => {
                const isCopy = opt.type === 'copy';

                return (
                  <TiltCard
                    key={opt.id}
                    href={opt.type === 'link' ? opt.url : undefined}
                    onClick={isCopy ? handleDiscordCopy : undefined}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      {/* Left info block */}
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <span className="font-mono-tech text-xs text-[#f2c08d]/60 group-hover:text-[#f2c08d] transition-colors shrink-0">
                          {opt.num}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-semibold text-[#f0e8e0] group-hover:text-[#f2c08d] transition-colors">
                              {opt.title}
                            </h3>
                          </div>
                          <p className="font-mono-tech text-xs text-[#d4c4b7]/90 mt-0.5 truncate">
                            {opt.value}
                          </p>
                        </div>
                      </div>

                      {/* Right button action */}
                      <div className="flex items-center justify-end gap-2 shrink-0 pt-1 sm:pt-0">
                        <span className="hidden md:inline-block font-sans text-[11px] text-[#d4c4b7]/50 mr-2">
                          {opt.note}
                        </span>
                        <span className={`font-mono-tech text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-md border transition-all duration-300 flex items-center justify-center gap-1.5 w-full sm:w-auto ${
                          isCopy && copiedDiscord
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                            : 'bg-white/5 group-hover:bg-[#f2c08d] border-white/10 group-hover:border-[#f2c08d] text-[#d4c4b7] group-hover:text-[#16130f] font-medium'
                        }`}>
                          {isCopy && copiedDiscord ? (
                            <>
                              <span className="material-symbols-outlined text-xs">check</span>
                              Copied
                            </>
                          ) : (
                            <>
                              {opt.actionLabel}
                              <span className="material-symbols-outlined text-xs transition-transform group-hover:translate-x-0.5">
                                {isCopy ? 'content_copy' : 'north_east'}
                              </span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>

            {/* Notification Banner when copied */}
            <AnimatePresence>
              {copiedDiscord && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-4 p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center font-mono-tech text-xs text-emerald-300 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                  <span>Discord username "e5g._" copied to clipboard!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
