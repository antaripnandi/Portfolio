import React, { useState, useEffect, useRef } from 'react';
import { HERO_DATA } from '../data/portfolioData';
import { ConnectModal } from './ConnectModal';

interface HeroSectionProps {
  isSplashFinished?: boolean;
  onOpenSettings?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isSplashFinished = false, onOpenSettings }) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0, scale: 1 });
  const [previewAvatar, setPreviewAvatar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  // Load animation sequence states
  const [uiLoaded, setUiLoaded] = useState(false);
  const [nameLoaded, setNameLoaded] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  // Parallax and fluid scroll fade calculation
  const [scrollY, setScrollY] = useState(0);
  const heroOpacity = Math.max(0, Math.min(1, 1 - scrollY / 550));
  const heroScale = Math.max(0.92, 1 - scrollY / 2500);
  const heroTranslateY = scrollY * 0.15;

  useEffect(() => {
    if (!isSplashFinished) return;

    // Stage 1: Load UI elements (pills, background frame) smoothly
    const t0 = setTimeout(() => setUiLoaded(true), 100);
    // Stage 2: Load Name smoothly after UI
    const t1 = setTimeout(() => setNameLoaded(true), 550);
    // Stage 3: Load Avatar smoothly after Name
    const t2 = setTimeout(() => setAvatarLoaded(true), 1100);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSplashFinished]);

  // Handle ESC key press for Avatar preview modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && previewAvatar) {
        setPreviewAvatar(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewAvatar]);

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Magnetic hover effect & cursor tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    const magX = (relativeX - rect.width / 2) * 0.35;
    const magY = (relativeY - rect.height / 2) * 0.35;

    setMagneticPos({ x: magX, y: magY, scale: 1.1 });
    setCursorPos({ x: relativeX, y: relativeY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0, scale: 1 });
    setIsHovered(false);
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center py-20 text-center relative w-full overflow-hidden">
      {/* Top Left Bar with CONNECT & Settings Buttons */}
      <div
        className={`fixed top-4 left-4 sm:top-6 sm:left-6 md:left-8 z-[100] flex items-center gap-2 pointer-events-auto transition-all duration-1000 ease-out ${
          uiLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <button
          onClick={() => setIsConnectOpen(true)}
          style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          className="flex items-center justify-center h-10 px-4 sm:h-11 sm:px-6 bg-[#231f1b]/85 border border-white/10 hover:border-[#f2c08d]/50 rounded-full shadow-2xl font-mono-tech text-xs uppercase tracking-widest text-[#d4c4b7] hover:text-[#f2c08d] active:scale-95 transition-all cursor-pointer"
        >
          CONNECT
        </button>

        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            title="Open Settings"
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-[#231f1b]/85 border border-white/10 hover:border-[#f2c08d]/50 rounded-full shadow-2xl text-[#d4c4b7] hover:text-[#f2c08d] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg leading-none">tune</span>
          </button>
        )}
      </div>

      {/* Background image & gradient layer (Loads with UI) */}
      <div
        className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-all duration-1000 ease-out ${
          uiLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center blur-[2px] opacity-40 transition-opacity duration-300 mix-blend-normal"
          style={{ backgroundImage: `url('${HERO_DATA.bgHeroUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#16130f]/60 via-[#16130f]/90 to-[#16130f]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#16130f] to-transparent z-10" />
      </div>

      {/* Glow blobs */}
      <div
        className={`absolute top-1/4 left-1/4 w-96 h-96 bg-[#f2c08d] rounded-full glow-blob pointer-events-none transition-opacity duration-1000 ${
          uiLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#d4a574] rounded-full glow-blob pointer-events-none transition-opacity duration-1000 ${
          uiLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ animationDelay: '-5s' }}
      />

      {/* Content Layer */}
      <div
        style={{
          opacity: heroOpacity,
          transform: `translate3d(0, ${heroTranslateY}px, 0) scale(${heroScale})`,
          willChange: 'opacity, transform'
        }}
        className="relative z-10 flex flex-col items-center justify-center pointer-events-none max-w-7xl px-4 w-full transition-opacity duration-150 ease-out gpu-accelerated"
      >
        <div className="relative flex flex-col items-center pointer-events-auto">
          {/* Name Container with Smooth Transition */}
          <div
            className={`font-anton text-[clamp(3.8rem,15.5vw,11rem)] leading-[0.88] text-[#eae1db] flex flex-col items-center tracking-tight select-none transition-all duration-1000 ease-out ${
              nameLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block mb-2 sm:mb-3">{HERO_DATA.nameFirst}</span>

            {/* NANDI positioned with clear gap below ANTARIP */}
            <div className="relative flex flex-col items-center justify-center w-full mt-1 sm:mt-2 md:mt-3">
              <span className="block text-[#d4a574] relative z-10">{HERO_DATA.nameLast}</span>

              {/* Avatar placed over the lower section of NANDI */}
              <div
                className={`absolute top-[44%] sm:top-[48%] md:top-[54%] z-30 transition-all duration-1000 ease-out ${
                  avatarLoaded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-6'
                }`}
                style={{ transform: `translate3d(0, ${scrollY * 0.04}px, 0)`, willChange: 'transform' }}
              >
                <div
                  ref={avatarRef}
                  data-avatar="true"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setPreviewAvatar(true)}
                  style={{
                    transform: `translate3d(${magneticPos.x}px, ${magneticPos.y}px, 0) scale(${magneticPos.scale})`,
                    willChange: 'transform'
                  }}
                  className="relative group w-24 h-24 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-[22px] sm:rounded-[32px] md:rounded-[36px] overflow-visible transition-transform duration-200 ease-out cursor-pointer bg-[#16130f] ring-2 ring-[#f2c08d]/40 hover:ring-[#f2c08d] shadow-[0_25px_60px_rgba(242,192,141,0.2)]"
                >
                  <img
                    src={HERO_DATA.avatarUrl}
                    alt="Antarip Nandi Avatar"
                    className="w-full h-full object-cover rounded-[22px] sm:rounded-[32px] md:rounded-[36px] pointer-events-none"
                  />

                  {/* Cursor / Touch Badge */}
                  <div
                    className={`absolute z-50 pointer-events-none transition-opacity duration-150 ease-out whitespace-nowrap hidden sm:block ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={{
                      left: `${cursorPos.x + 12}px`,
                      top: `${cursorPos.y + 8}px`,
                    }}
                  >
                    <div className="bg-[#eae1db] text-[#16130f] font-mono-tech text-[11px] sm:text-xs font-bold tracking-wide uppercase px-4 py-2 rounded-lg shadow-[0_15px_30px_rgba(0,0,0,0.6)] border border-[#16130f]/15 flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse flex-shrink-0" />
                      <span className="whitespace-nowrap">I'm open to work — DM or Email me</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Specialty Pills (Loaded smoothly with UI) */}
          <div
            className={`mt-16 sm:mt-24 md:mt-28 flex flex-wrap justify-center gap-2 sm:gap-3 pointer-events-auto transition-all duration-1000 ease-out px-2 ${
              uiLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-lg font-mono-tech text-xs text-[#d4c4b7]/70 uppercase tracking-wider hover:border-[#f2c08d]/40 transition">
              {HERO_DATA.location}
            </span>
            <span className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-lg font-mono-tech text-xs text-[#d4c4b7]/70 uppercase tracking-wider hover:border-[#f2c08d]/40 transition">
              {HERO_DATA.age}
            </span>
            <span className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-lg font-mono-tech text-xs text-[#d4c4b7]/70 uppercase tracking-wider hover:border-[#f2c08d]/40 transition">
              {HERO_DATA.specialization}
            </span>
          </div>
        </div>
      </div>

      {/* Avatar Modal */}
      {previewAvatar && (
        <div
          onClick={() => setPreviewAvatar(false)}
          className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-sm w-full bg-[#1f1b17] p-4 rounded-3xl border border-white/10 text-center">
            <img
              src={HERO_DATA.avatarUrl}
              alt="Antarip Nandi Avatar Large"
              className="w-full h-auto rounded-2xl mx-auto"
            />
            <p className="mt-3 font-mono-tech text-xs text-[#f2c08d]">Antarip Nandi (Developer Avatar)</p>
            <p className="text-[11px] text-[#d4c4b7]/60 font-mono-tech mt-1">Click anywhere to close</p>
          </div>
        </div>
      )}
      {/* Connect Modal */}
      <ConnectModal isOpen={isConnectOpen} onClose={() => setIsConnectOpen(false)} />
    </section>
  );
};

