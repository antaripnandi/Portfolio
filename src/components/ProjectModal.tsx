import React, { useEffect } from 'react';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { SudokuGame } from './SudokuGame';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Prevent portfolio background scrolling & stop Lenis when modal is open
  useEffect(() => {
    if (project) {
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
  }, [project]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md overflow-hidden">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto overscroll-contain custom-scrollbar bg-[#1f1b17] border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl text-[#eae1db]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition text-[#d4c4b7]"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          {/* Header info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs text-[#f2c08d] border border-[#d4a574]/30 px-2 py-0.5 rounded uppercase">
                {project.year}
              </span>
              <span className="font-mono-tech text-xs text-[#d4c4b7]/50 uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            <h2 className="font-anton text-4xl md:text-5xl tracking-wide text-[#eae1db]">
              {project.title}
            </h2>

            <p className="text-[#d4c4b7] text-base leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 my-6">
            {project.tags.map(t => (
              <span key={t} className="px-2.5 py-1 bg-white/5 font-mono-tech text-xs text-[#d4c4b7]/80 rounded border border-white/5">
                {t}
              </span>
            ))}
          </div>

          {/* Features list */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-3 my-6 border-t border-white/10 pt-6">
              <h3 className="font-mono-tech text-xs text-[#f2c08d] uppercase tracking-wider">
                Key Capabilities & Features
              </h3>
              <ul className="space-y-2">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#eae1db]">
                    <span className="material-symbols-outlined text-[#f2c08d] text-base mt-0.5">check_circle</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture note */}
          {project.architecture && (
            <div className="my-6 bg-[#16130f] p-4 rounded-xl border border-white/10 space-y-1">
              <span className="font-mono-tech text-[11px] text-[#d4c4b7]/50 uppercase tracking-widest block">
                Technical Architecture
              </span>
              <p className="font-mono-tech text-xs text-[#f2c08d]">
                {project.architecture}
              </p>
            </div>
          )}

          {(project.demoType === 'interactive-sudoku' || project.id === 'sudoku') && (
            <div className="my-6 border-t border-white/10 pt-6">
              <SudokuGame />
            </div>
          )}

          {project.demoType === 'openclaw-agent' && (
            <div className="my-6 border-t border-white/10 pt-6 bg-[#16130f] p-5 rounded-xl border border-white/10 space-y-3 font-mono-tech text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#f2c08d] font-bold">OpenClaw Agent Orchestrator Console</span>
                <span className="text-[#d4c4b7]/40 text-[10px]">100+ AGENTS ACTIVE</span>
              </div>
              <div className="space-y-1.5 text-[#d4c4b7]/80 bg-[#110e0a] p-3 rounded border border-white/5">
                <p><span className="text-emerald-400">[SYSTEM]</span> Agent swarm initialized across 12 worker nodes.</p>
                <p><span className="text-amber-400">[ROUTER]</span> Dispatched query: "Autonomous multi-step code compilation".</p>
                <p><span className="text-blue-400">[AGENT-42]</span> Task parsed into 4 sub-agents. Executing in parallel...</p>
                <p><span className="text-emerald-400">[SUCCESS]</span> Verification complete with 100% test coverage.</p>
              </div>
            </div>
          )}

          {project.demoType === 'minecraft-mod' && (
            <div className="my-6 border-t border-white/10 pt-6 bg-[#16130f] p-5 rounded-xl border border-white/10 space-y-3 font-mono-tech text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#f2c08d] font-bold">Minecraft Modding API Suite</span>
                <span className="text-[#d4c4b7]/40 text-[10px]">JAVA 21 / FABRIC & FORGE</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
                <div className="bg-[#231f1b] p-3 rounded-lg border border-white/10 hover:border-[#f2c08d]/50 transition-all text-center group">
                  <span className="text-[#f2c08d] font-bold block mb-1 group-hover:scale-105 transition-transform">F3 Advance</span>
                  <span className="text-[10px] text-[#d4c4b7]/70 block">Customizable debug HUD & telemetry</span>
                </div>
                <div className="bg-[#231f1b] p-3 rounded-lg border border-white/10 hover:border-[#f2c08d]/50 transition-all text-center group">
                  <span className="text-[#f2c08d] font-bold block mb-1 group-hover:scale-105 transition-transform">VeinMiner</span>
                  <span className="text-[10px] text-[#d4c4b7]/70 block">Connected block mining algorithm</span>
                </div>
                <div className="bg-[#231f1b] p-3 rounded-lg border border-white/10 hover:border-[#f2c08d]/50 transition-all text-center group">
                  <span className="text-[#f2c08d] font-bold block mb-1 group-hover:scale-105 transition-transform">Ender Extender</span>
                  <span className="text-[10px] text-[#d4c4b7]/70 block">Multi-tab dimensional storage</span>
                </div>
                <div className="bg-[#231f1b] p-3 rounded-lg border border-white/10 hover:border-[#f2c08d]/50 transition-all text-center group">
                  <span className="text-[#f2c08d] font-bold block mb-1 group-hover:scale-105 transition-transform">Barrel Extender</span>
                  <span className="text-[10px] text-[#d4c4b7]/70 block">Custom NBT tile entities</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-[#f2c08d] hover:bg-[#d4a574] text-[#16130f] font-mono-tech text-xs uppercase font-bold rounded-lg transition flex items-center gap-2 shadow-xs"
              >
                <span>Launch Live Website</span>
                <span className="material-symbols-outlined text-sm">north_east</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-[#eae1db] font-mono-tech text-xs uppercase font-bold rounded-lg transition flex items-center gap-2 border border-white/10"
              >
                <span>View on Github</span>
                <span className="material-symbols-outlined text-sm">north_east</span>
              </a>
            )}
            {project.modrinthUrl && (
              <a
                href={project.modrinthUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-[#eae1db] font-mono-tech text-xs uppercase font-bold rounded-lg transition flex items-center gap-2 border border-white/10"
              >
                <span>Modrinth Page</span>
                <span className="material-symbols-outlined text-sm">north_east</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

