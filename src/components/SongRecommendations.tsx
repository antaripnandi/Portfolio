import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { SongTrack } from '../types';
import { SONGS_DATA } from '../data/portfolioData';

// Individual Tilted Card Component for smooth 3D tilt on hover
const TiltedSongCard: React.FC<{
  song: SongTrack;
  onClick: () => void;
}> = ({ song, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX; // -1 to 1
    const normY = (y - centerY) / centerY; // -1 to 1

    const rotateY = normX * 10;
    const rotateX = -normY * 8;
    const translateX = normX * 6;
    const translateY = normY * 6;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0px) scale(1.06)`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px) scale(1)';
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={`${song.title} - ${song.artist}`}
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px) scale(1)',
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform'
      }}
      className="group relative shrink-0 cursor-pointer pointer-events-auto py-3 z-20"
    >
      <div
        className={`w-[180px] sm:w-[220px] md:w-[250px] aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden bg-[#231f1b] border border-white/10 shadow-xl transition-all duration-300 ${
          isHovered
            ? 'border-[#f2c08d] ring-2 ring-[#f2c08d]/40 shadow-[0_20px_45px_rgba(242,192,141,0.25)]'
            : ''
        }`}
      >
        <img
          src={song.coverUrl}
          alt={`${song.title} - ${song.artist}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export const SongRecommendations: React.FC = () => {
  const songs: SongTrack[] = SONGS_DATA;

  // Duplicate list to create a seamless infinite loop
  const marqueeItems = [...songs, ...songs, ...songs, ...songs];

  const handleRedirect = (spotifyUrl?: string) => {
    if (spotifyUrl) {
      window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-12 md:py-16 relative overflow-hidden select-none bg-[#16130f]"
    >
      {/* INFINITE MARQUEE STREAM - PAUSES ON HOVER */}
      <div className="relative w-full overflow-hidden pause-on-hover py-2">
        <div className="animate-marquee-left flex gap-5 sm:gap-7 md:gap-8 px-4 items-center">
          {marqueeItems.map((song, idx) => (
            <TiltedSongCard
              key={`rec-${song.id}-${idx}`}
              song={song}
              onClick={() => handleRedirect(song.spotifyUrl)}
            />
          ))}
        </div>

        {/* Soft edge blur overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-28 bg-gradient-to-r from-[#16130f] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-28 bg-gradient-to-l from-[#16130f] to-transparent pointer-events-none z-10" />
      </div>

      {/* TEXT AT BOTTOM ONLY */}
      <div className="mt-6 text-center px-6">
        <p className="font-mono-tech text-xs sm:text-sm font-bold tracking-widest text-[#eae1db]/90 uppercase">
          A FEW SONGS I CAN RECOMMEND IF YOU'RE LOOKING FOR SOME FRESH TUNES :)
        </p>
      </div>
    </motion.section>
  );
};
