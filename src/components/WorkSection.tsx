import React, { useState, useRef } from 'react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { motion } from 'motion/react';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

interface AnimatedProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

const AnimatedProjectCard: React.FC<AnimatedProjectCardProps> = ({ project, index, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -2; // Very subtle 2 deg max tilt
    const rotateY = ((x - centerX) / centerX) * 2;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.004, 1.004, 1.004)`);
    setGlowPos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        style={{ transform, transition: 'transform 0.25s ease-out, border-color 0.3s ease, box-shadow 0.3s ease' }}
        className="group relative bg-[#16130f] hover:bg-[#1c1814] p-6 sm:p-8 md:p-10 cursor-pointer overflow-hidden rounded-3xl border border-white/10 hover:border-[#f2c08d]/50 shadow-lg hover:shadow-2xl hover:shadow-[#f2c08d]/5 transition-all duration-300 flex flex-col gap-6"
      >
        {/* Cursor Spotlight Gradient Effect */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glowPos.opacity,
            background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, rgba(242, 192, 141, 0.09), transparent 70%)`
          }}
        />

        {/* Ambient Top Shimmer Line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#f2c08d] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Row: Quick Circular Action Buttons (GitHub & Live Link) + Category Badge + Action Arrow */}
        <div className="flex items-center justify-between relative z-20">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:bg-[#f2c08d] transition-all duration-200 shadow-sm hover:scale-110"
                title="View GitHub Repository"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:bg-[#f2c08d] transition-all duration-200 shadow-sm hover:scale-110"
                title="Launch Live App"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs text-[#f2c08d] bg-[#f2c08d]/10 border border-[#f2c08d]/30 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
              {project.year}
            </span>
            <span className="font-mono-tech text-xs text-[#d4c4b7]/60 uppercase tracking-wider hidden sm:inline">
              {project.category}
            </span>

            {/* Circular Action Arrow Button (Top Right) */}
            <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-[#f2c08d] border border-white/10 group-hover:border-[#f2c08d] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md ml-1 shrink-0">
              <span className="material-symbols-outlined text-lg text-[#d4c4b7] group-hover:text-[#16130f] group-hover:rotate-45 group-hover:-translate-y-0.5 transition-all duration-300">
                north_east
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Narrative + Right Laptop Device Preview (for Sakido app only) */}
        <div className={`grid grid-cols-1 ${project.id === 'sakido' ? 'md:grid-cols-12' : 'grid-cols-1'} gap-8 items-center relative z-10 pt-2`}>
          {/* Left Narrative Column */}
          <div className={project.id === 'sakido' ? 'md:col-span-6 lg:col-span-7 space-y-4' : 'col-span-12 space-y-4'}>
            <h3 className="font-anton text-4xl sm:text-5xl lg:text-6xl text-[#eae1db] group-hover:text-[#f2c08d] tracking-wide transition-all duration-300">
              {project.title}
            </h3>

            <p className="text-base text-[#d4c4b7]/90 leading-relaxed font-sans group-hover:text-[#eae1db] transition-colors">
              {project.description}
            </p>

            {/* Tag Chips */}
            <div className="flex flex-wrap gap-2.5 pt-3">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 bg-white/5 group-hover:bg-white/10 font-mono-tech text-xs font-bold text-[#d4c4b7] uppercase rounded-lg border border-white/10 hover:border-[#f2c08d]/50 hover:text-[#f2c08d] transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Laptop Device Mockup Preview Frame (Only for Sakido app) */}
          {project.id === 'sakido' && (
            <div className="md:col-span-6 lg:col-span-5 w-full">
              <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-[#0d0b09] border border-white/15 shadow-2xl group-hover:border-[#f2c08d]/40 transition-all flex flex-col">
                {/* Device Header Bar */}
                <div className="h-7 bg-[#181410] border-b border-white/10 px-3 flex items-center justify-between shrink-0 z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="font-mono text-[10px] text-[#d4c4b7]/50 truncate max-w-[160px]">
                    https://sakidoapp.vercel.app
                  </span>
                </div>

                {/* Sakido Hero Image */}
                <div className="relative flex-1 overflow-hidden bg-black">
                  <img
                    src="/sakido-hero.png"
                    alt="Sakido Academic Portal"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  return (
    <section
      id="work"
      className="py-32 max-w-screen-xl mx-auto px-6 md:px-12 scroll-mt-20 md:py-40 transition-colors duration-300"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <span className="font-mono-tech text-xs text-[#f2c08d] uppercase tracking-[0.2em] block">
          02 — WORK
        </span>
        <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#eae1db] mt-2 tracking-wide">
          PROJECTS
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {PROJECTS_DATA.map((project, index) => (
          <AnimatedProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelect={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
};

