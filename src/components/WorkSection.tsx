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
        className="group relative bg-[#16130f] hover:bg-[#1c1814] p-6 sm:p-8 md:p-12 cursor-pointer overflow-hidden rounded-2xl border border-white/10 hover:border-[#f2c08d]/50 shadow-md hover:shadow-xl hover:shadow-[#f2c08d]/5 transition-all duration-300"
      >
        {/* Cursor Spotlight Gradient Effect */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glowPos.opacity,
            background: `radial-gradient(500px circle at ${glowPos.x}% ${glowPos.y}%, rgba(242, 192, 141, 0.08), transparent 70%)`
          }}
        />

        {/* Ambient Top Shimmer Line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#f2c08d] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Diagonal Light Sweep Effect on Hover */}
        <div className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
          <div className="space-y-4 max-w-2xl">
            {/* Year & Category tags */}
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs text-[#f2c08d] bg-[#f2c08d]/10 border border-[#f2c08d]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider group-hover:scale-105 group-hover:bg-[#f2c08d]/20 transition-all">
                {project.year}
              </span>
              <span className="font-mono-tech text-xs text-[#d4c4b7]/50 uppercase tracking-wider group-hover:text-[#d4c4b7] group-hover:tracking-widest transition-all">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-anton text-3xl md:text-4xl text-[#eae1db] group-hover:text-[#f2c08d] group-hover:translate-x-2 transition-all duration-300">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-base text-[#d4c4b7]/90 leading-relaxed group-hover:text-[#eae1db] transition-colors">
              {project.description}
            </p>

            {/* Tag Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/5 group-hover:bg-white/10 font-mono-tech text-[10px] text-[#d4c4b7]/80 uppercase rounded-md border border-white/10 hover:border-[#f2c08d]/50 hover:text-[#f2c08d] transition-all hover:-translate-y-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action indicator */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono-tech text-xs text-[#f2c08d] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 hidden sm:inline font-bold">
              View Details
            </span>
            <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-[#f2c08d] border border-white/10 group-hover:border-[#f2c08d] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md">
              <span className="material-symbols-outlined text-2xl text-[#d4c4b7] group-hover:text-[#16130f] group-hover:rotate-45 transition-transform duration-300">
                north_east
              </span>
            </div>
          </div>
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

