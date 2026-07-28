import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_DATA } from '../data/portfolioData';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

interface IntegrationState {
  calendar: boolean;
  drive: boolean;
  gmail: boolean;
  notes: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentTheme = 'dark',
  onToggleTheme
}) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(currentTheme === 'dark');

  // Integrations active state
  const [integrations, setIntegrations] = useState<IntegrationState>({
    calendar: true,
    drive: false,
    gmail: false,
    notes: false
  });

  // User session state
  const [isSignedIn, setIsSignedIn] = useState<boolean>(true);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync internal theme state with prop changes
  useEffect(() => {
    setIsDarkMode(currentTheme === 'dark');
  }, [currentTheme]);

  // Handle ESC key press & background scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Stop Lenis smooth scroll if present
    if ((window as any).lenis) {
      (window as any).lenis.stop();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen, onClose]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Toggle Theme Button Action
  const handleThemeToggle = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);

    if (onToggleTheme) {
      onToggleTheme();
    } else {
      // Direct DOM manipulation fallback if onToggleTheme isn't passed
      const root = document.documentElement;
      if (nextMode) {
        root.classList.add('dark');
        root.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    }

    showToast(`Interface theme set to ${nextMode ? 'Dark Mode 🌙' : 'Light Mode ☀️'}`);
  };

  // Toggle Individual Integration
  const handleToggleIntegration = (key: keyof IntegrationState, name: string) => {
    setIntegrations(prev => {
      const nextState = !prev[key];
      showToast(`${name} integration ${nextState ? 'enabled ✅' : 'disabled ❌'}`);
      return { ...prev, [key]: nextState };
    });
  };

  // Toggle All Integrations via "Manage ->"
  const handleManageIntegrations = () => {
    const allActive = Object.values(integrations).every(v => v);
    const nextVal = !allActive;
    setIntegrations({
      calendar: nextVal,
      drive: nextVal,
      gmail: nextVal,
      notes: nextVal
    });
    showToast(nextVal ? 'All service connectors activated ✅' : 'All service connectors deactivated');
  };

  // Handle Sign Out Action
  const handleSignOutToggle = () => {
    if (isSignedIn) {
      setIsSignedIn(false);
      showToast('Signed out of profile session 🚪');
    } else {
      setIsSignedIn(true);
      showToast('Welcome back! Profile session active ✨');
    }
  };

  // Handle Done Action
  const handleDone = () => {
    showToast('Preferences saved successfully ✨');
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
            className="fixed inset-0 bg-[#0f0c0a]/80"
          />

          {/* Toast Feedback Banner */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="fixed top-6 z-[200] px-6 py-3 bg-[#2a221b] border border-[#f2c08d]/40 rounded-full shadow-2xl font-mono-tech text-xs text-[#f2c08d] flex items-center gap-2 pointer-events-none"
              >
                <span className="material-symbols-outlined text-sm">info</span>
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            data-lenis-prevent
            className={`relative w-full max-w-[672px] rounded-2xl border shadow-2xl p-6 sm:p-12 md:p-14 z-10 overflow-hidden transition-colors duration-300 ${
              isDarkMode
                ? 'bg-[#1c1815] border-[#382e27] text-[#eae1db]'
                : 'bg-[#FCF1EC] border-[#D5C3B8] text-[#1F1B18]'
            }`}
          >
            {/* Close Button ('X' top right) */}
            <button
              onClick={onClose}
              aria-label="Close settings"
              className={`absolute top-6 right-6 sm:top-8 sm:right-8 w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-white/5 hover:bg-white/10 text-[#d4c4b7] hover:text-white'
                  : 'bg-black/5 hover:bg-black/10 text-[#51443C] hover:text-black'
              }`}
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {/* Profile Section Header */}
            <div
              className={`flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 pb-8 border-b ${
                isDarkMode ? 'border-[#382e27]' : 'border-[#D5C3B8]'
              }`}
            >
              {/* Profile Avatar Box */}
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-[#28221d] border-[#382e27]'
                    : 'bg-[#FCF1EC] border-[#D5C3B8]'
                }`}
              >
                <img
                  src={HERO_DATA.avatarUrl}
                  alt={HERO_DATA.nameFirst}
                  className="w-full h-full object-cover"
                />
                {!isSignedIn && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="material-symbols-outlined text-red-400 text-xl">lock</span>
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="flex flex-col text-center sm:text-left gap-1">
                <h2
                  className={`font-tilt-warp text-xl sm:text-2xl uppercase tracking-tight ${
                    isDarkMode ? 'text-[#eae1db]' : 'text-[#1F1B18]'
                  }`}
                >
                  {HERO_DATA.nameFirst} {HERO_DATA.nameLast}
                </h2>
                <p
                  className={`font-manrope text-sm ${
                    isDarkMode ? 'text-[#d4c4b7]/70' : 'text-[#51443C]'
                  }`}
                >
                  bantarip4@gmail.com
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${isSignedIn ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="font-mono-tech text-[11px] uppercase tracking-wider opacity-75">
                    {isSignedIn ? 'Session Active · CSE AI/ML' : 'Signed Out'}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Content Body */}
            <div className="py-8 flex flex-col gap-6">
              {/* Heading 3: Preferences & Controls */}
              <h3
                className={`font-marko-one text-xs sm:text-sm uppercase tracking-[0.15em] ${
                  isDarkMode ? 'text-[#d4c4b7]/70' : 'text-[#51443C]'
                }`}
              >
                PREFERENCES & CONTROLS
              </h3>

              {/* Theme Section Box */}
              <div
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 sm:p-6 rounded-xl border transition-colors ${
                  isDarkMode
                    ? 'bg-[#231f1b] border-[#382e27]'
                    : 'bg-[#FCF1EC] border-[#D5C3B8]'
                }`}
              >
                {/* Theme Info */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isDarkMode ? 'bg-[#8B5E3C]/20 text-[#f2c08d]' : 'bg-[#8B5E3C]/10 text-[#8B5E3C]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {isDarkMode ? 'dark_mode' : 'light_mode'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`font-manrope font-medium text-base ${
                        isDarkMode ? 'text-[#eae1db]' : 'text-[#1F1B18]'
                      }`}
                    >
                      Interface Theme
                    </span>
                    <span
                      className={`font-manrope text-sm ${
                        isDarkMode ? 'text-[#d4c4b7]/70' : 'text-[#51443C]'
                      }`}
                    >
                      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>
                </div>

                {/* Switch Theme Button */}
                <button
                  onClick={handleThemeToggle}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-xl border font-libre-baskerville text-sm transition-all cursor-pointer active:scale-95 ${
                    isDarkMode
                      ? 'border-[#382e27] hover:border-[#f2c08d] bg-white/5 hover:bg-white/10 text-[#eae1db]'
                      : 'border-[#D5C3B8] hover:border-[#8B5E3C] bg-white hover:bg-white/80 text-[#1F1B18]'
                  }`}
                >
                  Switch Theme
                </button>
              </div>

              {/* Integrations Section Box */}
              <div
                className={`flex flex-col gap-4 p-5 sm:p-6 rounded-xl border transition-colors ${
                  isDarkMode
                    ? 'bg-[#231f1b] border-[#382e27]'
                    : 'bg-[#FCF1EC] border-[#D5C3B8]'
                }`}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <span
                    className={`font-manrope font-medium text-base ${
                      isDarkMode ? 'text-[#eae1db]' : 'text-[#1F1B18]'
                    }`}
                  >
                    Active Integrations
                  </span>
                  <button
                    onClick={handleManageIntegrations}
                    className={`font-manrope text-xs sm:text-sm font-medium flex items-center gap-1 hover:underline cursor-pointer ${
                      isDarkMode ? 'text-[#f2c08d]' : 'text-[#8B5E3C]'
                    }`}
                  >
                    <span>Manage</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

                {/* Integration Chips Row */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {/* Calendar Chip */}
                  <button
                    onClick={() => handleToggleIntegration('calendar', 'Calendar')}
                    className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-manrope uppercase transition-all cursor-pointer active:scale-95 flex items-center gap-2 ${
                      integrations.calendar
                        ? isDarkMode
                          ? 'bg-[#064e3b]/30 border-emerald-500/50 text-emerald-400 font-medium shadow-sm'
                          : 'bg-white border-[#8B5E3C] text-[#8B5E3C] font-medium shadow-sm'
                        : isDarkMode
                        ? 'bg-black/20 border-white/10 text-[#d4c4b7]/50 hover:text-[#d4c4b7]'
                        : 'bg-black/5 border-[#D5C3B8]/50 text-[#51443C]/70 hover:text-[#1F1B18]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${integrations.calendar ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                    <span>Calendar: {integrations.calendar ? 'Active' : 'Off'}</span>
                  </button>

                  {/* Drive Chip */}
                  <button
                    onClick={() => handleToggleIntegration('drive', 'Drive')}
                    className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-manrope uppercase transition-all cursor-pointer active:scale-95 flex items-center gap-2 ${
                      integrations.drive
                        ? isDarkMode
                          ? 'bg-[#064e3b]/30 border-emerald-500/50 text-emerald-400 font-medium shadow-sm'
                          : 'bg-white border-[#8B5E3C] text-[#8B5E3C] font-medium shadow-sm'
                        : isDarkMode
                        ? 'bg-black/20 border-white/10 text-[#d4c4b7]/50 hover:text-[#d4c4b7]'
                        : 'bg-black/5 border-[#D5C3B8]/50 text-[#51443C]/70 hover:text-[#1F1B18]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${integrations.drive ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                    <span>Drive: {integrations.drive ? 'Active' : 'Off'}</span>
                  </button>

                  {/* Gmail Chip */}
                  <button
                    onClick={() => handleToggleIntegration('gmail', 'Gmail')}
                    className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-manrope uppercase transition-all cursor-pointer active:scale-95 flex items-center gap-2 ${
                      integrations.gmail
                        ? isDarkMode
                          ? 'bg-[#064e3b]/30 border-emerald-500/50 text-emerald-400 font-medium shadow-sm'
                          : 'bg-white border-[#8B5E3C] text-[#8B5E3C] font-medium shadow-sm'
                        : isDarkMode
                        ? 'bg-black/20 border-white/10 text-[#d4c4b7]/50 hover:text-[#d4c4b7]'
                        : 'bg-black/5 border-[#D5C3B8]/50 text-[#51443C]/70 hover:text-[#1F1B18]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${integrations.gmail ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                    <span>gmail: {integrations.gmail ? 'Active' : 'Off'}</span>
                  </button>

                  {/* Notes Chip */}
                  <button
                    onClick={() => handleToggleIntegration('notes', 'Notes')}
                    className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-manrope uppercase transition-all cursor-pointer active:scale-95 flex items-center gap-2 ${
                      integrations.notes
                        ? isDarkMode
                          ? 'bg-[#064e3b]/30 border-emerald-500/50 text-emerald-400 font-medium shadow-sm'
                          : 'bg-white border-[#8B5E3C] text-[#8B5E3C] font-medium shadow-sm'
                        : isDarkMode
                        ? 'bg-black/20 border-white/10 text-[#d4c4b7]/50 hover:text-[#d4c4b7]'
                        : 'bg-black/5 border-[#D5C3B8]/50 text-[#51443C]/70 hover:text-[#1F1B18]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${integrations.notes ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                    <span>Notes: {integrations.notes ? 'Active' : 'Off'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div
              className={`flex items-center justify-between pt-6 border-t ${
                isDarkMode ? 'border-[#382e27]' : 'border-[#D5C3B8]'
              }`}
            >
              {/* Sign Out Button */}
              <button
                onClick={handleSignOutToggle}
                className="flex items-center gap-2 text-[#BA1A1A] hover:text-red-500 font-manrope text-sm font-medium transition-colors cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">
                  {isSignedIn ? 'logout' : 'login'}
                </span>
                <span>{isSignedIn ? 'Sign Out' : 'Sign In'}</span>
              </button>

              {/* Done Button */}
              <button
                onClick={handleDone}
                className={`px-8 py-2.5 rounded-xl font-manrope text-sm font-medium transition-all cursor-pointer active:scale-95 shadow-md ${
                  isDarkMode
                    ? 'bg-[#8B5E3C] hover:bg-[#a36f47] text-white'
                    : 'bg-[#1F1B18] hover:bg-black text-white'
                }`}
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
