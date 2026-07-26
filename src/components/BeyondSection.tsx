import React, { useState } from 'react';
import { BEYOND_DATA } from '../data/portfolioData';
import { motion } from 'motion/react';

export const BeyondSection: React.FC = () => {
  const [activeInterest, setActiveInterest] = useState<string | null>(null);

  return (
    <section
      id="beyond"
      className="py-20 sm:py-28 md:py-36 max-w-screen-xl mx-auto px-6 md:px-12 scroll-mt-20 transition-colors duration-300"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20"
      >
        <span className="font-mono-tech text-xs text-[#f2c08d] uppercase tracking-[0.2em] block">
          04 — BEYOND
        </span>
        <h2 className="font-anton text-5xl md:text-6xl text-[#eae1db] mt-4 tracking-wide">
          INTERESTS
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {BEYOND_DATA.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActiveInterest(activeInterest === item.id ? null : item.id)}
            className="p-6 md:p-8 h-full flex flex-col space-y-3 border border-white/10 rounded-xl bg-[#110e0a]/40 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-[#d4a574]/40 hover:shadow-[0_15px_30px_-10px_rgba(212,165,116,0.3)] cursor-pointer relative group"
          >
            <div className="flex justify-between items-center">
              <span className="font-mono-tech text-xs text-[#d4a574] block uppercase tracking-wider">
                {item.tag}
              </span>
              {item.highlight && (
                <span className="font-mono-tech text-[10px] text-[#d4c4b7]/40 bg-white/5 px-2 py-0.5 rounded">
                  {item.highlight}
                </span>
              )}
            </div>

            <p className="text-base text-[#d4c4b7] flex-grow leading-relaxed group-hover:text-[#eae1db] transition-colors">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
