import React from 'react';
import { ABOUT_DATA } from '../data/portfolioData';
import { motion } from 'motion/react';

interface AboutSectionProps {
  onOpenResume?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 md:py-36 max-w-screen-xl mx-auto px-6 md:px-12 scroll-mt-20 transition-colors duration-300"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid md:grid-cols-12 gap-12 items-start"
      >
        {/* Section Label */}
        <div className="md:col-span-12 mb-2 md:mb-6">
          <span className="font-mono-tech text-xs text-[#f2c08d] uppercase tracking-[0.2em] block">
            {ABOUT_DATA.sectionLabel}
          </span>
          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#eae1db] mt-2 tracking-wide">
            ABOUT ME
          </h2>
        </div>

        {/* Bio Narrative */}
        <div className="md:col-span-5 space-y-6">
          <p className="text-lg md:text-xl text-[#eae1db] leading-relaxed font-normal">
            {ABOUT_DATA.bioPrimary}
          </p>
          <p className="text-base text-[#d4c4b7] leading-relaxed">
            {ABOUT_DATA.bioSecondary}
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#231f1b] hover:bg-[#2c2722] border border-white/10 hover:border-[#f2c08d]/60 rounded-xl text-[#f2c08d] font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow hover:-translate-y-0.5 active:scale-95"
            >
              <span className="material-symbols-outlined text-base">description</span>
              <span>Inspect Full Resume / CV</span>
            </button>
          </div>
        </div>

        {/* Skills list with borders & hover states */}
        <div className="md:col-span-5 grid grid-cols-1 gap-4">
          {ABOUT_DATA.skills.map((skill, index) => (
            <div
              key={index}
              className="border-t border-white/10 pt-4 flex justify-between items-center group transition-colors duration-300 hover:border-[#f2c08d]/50"
            >
              <span className="font-mono-tech text-xs uppercase text-[#eae1db] group-hover:text-[#f2c08d] transition-colors">
                {skill.title}
              </span>
              <span className="font-mono-tech text-xs text-[#d4c4b7]/50 transition-colors">
                {skill.subtitle}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
