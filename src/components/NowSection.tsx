import React from 'react';
import { NOW_DATA } from '../data/portfolioData';
import { motion } from 'motion/react';

export const NowSection: React.FC = () => {
  return (
    <section
      id="now"
      className="py-20 sm:py-28 md:py-36 max-w-screen-xl mx-auto px-6 md:px-12 scroll-mt-20 transition-colors duration-300"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid md:grid-cols-2 gap-16 md:gap-20"
      >
        {/* Learning Column */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono-tech text-xs text-[#f2c08d] uppercase tracking-widest">
              03 — NOW
            </span>
            <div className="h-px bg-white/10 flex-grow" />
          </div>

          <div className="space-y-12">
            <div>
              <h4 className="font-mono-tech text-xs text-[#d4c4b7]/50 uppercase mb-6 tracking-widest">
                {NOW_DATA.learning.title}
              </h4>
              <ul className="space-y-5">
                {NOW_DATA.learning.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 group">
                    <span
                      className="material-symbols-outlined text-[#f2c08d] text-[20px] transition-transform group-hover:scale-110 mt-0.5"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <span className="text-base text-[#eae1db] group-hover:text-[#f2c08d] transition-colors font-medium block">
                        {item.text}
                      </span>
                      {item.detail && (
                        <span className="text-xs text-[#d4c4b7]/60 font-mono-tech block mt-0.5">
                          {item.detail}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Building Column */}
        <div className="flex flex-col justify-end">
          <div className="space-y-12">
            <div>
              <h4 className="font-mono-tech text-xs text-[#d4c4b7]/50 uppercase mb-6 tracking-widest">
                {NOW_DATA.building.title}
              </h4>
              <ul className="space-y-5">
                {NOW_DATA.building.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 group">
                    <span
                      className="material-symbols-outlined text-[#f2c08d] text-[20px] transition-transform group-hover:scale-110 mt-0.5"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <span className="text-base text-[#eae1db] group-hover:text-[#f2c08d] transition-colors font-medium block">
                        {item.text}
                      </span>
                      {item.detail && (
                        <span className="text-xs text-[#d4c4b7]/60 font-mono-tech block mt-0.5">
                          {item.detail}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
