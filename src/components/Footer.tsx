import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FOOTER_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const handleDiscordClick = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(handle);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2500);
  };

  return (
    <footer className="pt-16 pb-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-screen-xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left"
      >
        {/* Info / Social Links (Above reserved on mobile/tablet) */}
        <div className="order-1 md:order-2 flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3.5">
          {FOOTER_DATA.socials.map((social, idx) => {
            if (social.isDiscord) {
              return (
                <button
                  key={idx}
                  onClick={e => handleDiscordClick(e, social.discordHandle!)}
                  className="font-mono-tech text-xs text-[#d4c4b7] hover:text-[#f2c08d] transition-colors flex items-center gap-1.5 cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/5"
                  title="Click to copy Discord handle"
                >
                  <span>{social.name}</span>
                  <span className="material-symbols-outlined text-sm text-[#f2c08d]">content_copy</span>
                </button>
              );
            }

            return (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono-tech text-xs text-[#d4c4b7] hover:text-[#f2c08d] underline underline-offset-4 transition-all duration-300 py-1"
              >
                {social.name}
              </a>
            );
          })}
        </div>

        {/* Reserved / Copyright (At bottom on mobile/tablet) */}
        <div className="order-2 md:order-1 pt-4 md:pt-0 border-t border-white/5 md:border-none w-full md:w-auto">
          <p className="font-mono-tech text-xs text-[#d4c4b7]/70 uppercase tracking-wider">
            {FOOTER_DATA.copyright}
          </p>
        </div>
      </motion.div>

      {/* Copy Toast Banner */}
      {copiedDiscord && (
        <div className="fixed bottom-6 right-6 z-[300] bg-[#f2c08d] text-[#16130f] font-mono-tech text-xs px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 border border-black/20">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>Copied Discord handle to clipboard!</span>
        </div>
      )}
    </footer>
  );
};
