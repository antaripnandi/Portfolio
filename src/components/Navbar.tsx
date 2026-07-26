import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  activeSection: string;
  isSplashFinished?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, isSplashFinished = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'now', label: 'Now' },
    { id: 'beyond', label: 'Beyond' }
  ];

  const currentLabel = navItems.find(item => item.id === activeSection)?.label || 'About';

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      try {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch {
        const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (!isSplashFinished) return;
    const t = setTimeout(() => setMounted(true), 100);

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearTimeout(t);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSplashFinished]);

  return (
    <div
      ref={navRef}
      className={`fixed top-4 right-4 sm:top-6 sm:right-6 md:right-8 z-[100] pointer-events-auto transition-all duration-1000 ease-out ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      {/* Desktop Navigation (Full horizontal bar on md+ screens) */}
      <nav
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        className="hidden md:flex items-center gap-6 h-11 px-8 bg-[#231f1b]/85 border border-white/10 rounded-full shadow-2xl"
      >
        {navItems.map(item => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`font-mono-tech text-xs uppercase tracking-widest transition-colors cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'text-[#f2c08d] font-bold'
                  : 'text-[#d4c4b7]/50 hover:text-[#f2c08d]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Mobile & Tablet Compact Navigation (< md screens) */}
      <div className="md:hidden relative flex flex-col items-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          className="flex items-center justify-center gap-1.5 h-10 px-4 sm:h-11 sm:px-6 bg-[#231f1b]/85 border border-white/10 hover:border-[#f2c08d]/50 rounded-full shadow-2xl font-mono-tech text-xs uppercase tracking-widest text-[#f2c08d] active:scale-95 transition-all cursor-pointer"
        >
          <span>{currentLabel}</span>
          <span className="material-symbols-outlined text-sm leading-none transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            expand_more
          </span>
        </button>

        {/* Dropdown menu when clicked */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-44 bg-[#231f1b] border border-white/10 rounded-2xl p-3 shadow-2xl flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200 z-[110]">
            {navItems.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl font-mono-tech text-xs uppercase tracking-widest transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-[#f2c08d] font-bold'
                      : 'text-[#d4c4b7]/70 hover:text-[#f2c08d] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};


