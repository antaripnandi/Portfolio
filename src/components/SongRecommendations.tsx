import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { SongTrack } from '../types';
import { SONGS_DATA } from '../data/portfolioData';

// Individual Tilted Card Component for smooth magnetic reaction & sibling shifting on hover
const TiltedSongCard: React.FC<{
  song: SongTrack;
  idx: number;
  hoveredIdx: number | null;
  onHover: (idx: number | null) => void;
  onClick: () => void;
}> = ({ song, idx, hoveredIdx, onHover, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredIdx === idx;
  const isSiblingHovered = hoveredIdx !== null && hoveredIdx !== idx;

  // Sibling displacement direction
  const isLeftSibling = hoveredIdx !== null && idx < hoveredIdx;
  const isRightSibling = hoveredIdx !== null && idx > hoveredIdx;

  const handleMouseEnter = () => {
    onHover(idx);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    // Magnetic offset matching avatar style with refined strength (0.18)
    const magX = (relativeX - rect.width / 2) * 0.18;
    const magY = (relativeY - rect.height / 2) * 0.18;

    // Light 3D tilt
    const normX = (relativeX - rect.width / 2) / (rect.width / 2);
    const normY = (relativeY - rect.height / 2) / (rect.height / 2);
    const rotateY = normX * 5;
    const rotateX = -normY * 4;

    cardRef.current.style.transform = `translate3d(${magX.toFixed(2)}px, ${magY.toFixed(2)}px, 0) rotateX(${rotateX.toFixed(
      2
    )}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.08)`;
  };

  const handleMouseLeave = () => {
    onHover(null);
    if (cardRef.current) {
      cardRef.current.style.transform = 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  // Sibling cards shift to opposite side without shrinking (scale strictly 1)
  let siblingTransform = 'translate3d(0px, 0px, 0px) scale(1)';
  if (isLeftSibling) {
    siblingTransform = 'translate3d(-36px, 0px, 0px) scale(1)';
  } else if (isRightSibling) {
    siblingTransform = 'translate3d(36px, 0px, 0px) scale(1)';
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={`${song.title} - ${song.artist}`}
      style={{
        transform: isHovered
          ? undefined
          : siblingTransform,
        transition: isHovered
          ? 'transform 0.12s ease-out'
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
        opacity: isSiblingHovered ? 0.85 : 1,
        willChange: 'transform, opacity'
      }}
      className={`group relative shrink-0 cursor-pointer pointer-events-auto py-3 select-none ${
        isHovered ? 'z-30' : 'z-20'
      }`}
    >
      <div
        data-cursor-morph="true"
        className={`w-[200px] sm:w-[240px] md:w-[270px] aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden bg-[#16130f] border border-white/10 shadow-xl relative transition-all duration-300 ${
          isHovered
            ? 'border-[#f2c08d] ring-2 ring-[#f2c08d]/50 shadow-[0_25px_50px_rgba(242,192,141,0.3)]'
            : ''
        }`}
      >
        {/* Cover Image - scale-100 & object-center so the image/eyes are never cropped */}
        <img
          src={song.coverUrl}
          alt={`${song.title} - ${song.artist}`}
          className="w-full h-full object-cover object-center scale-100 pointer-events-none transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export const SongRecommendations: React.FC = () => {
  const songs: SongTrack[] = SONGS_DATA;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Duplicate list once to create a seamless infinite loop
  const marqueeItems = [...songs, ...songs];

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
        <div className="animate-marquee-left flex gap-10 sm:gap-14 md:gap-16 lg:gap-20 px-6 items-center">
          {marqueeItems.map((song, idx) => (
            <TiltedSongCard
              key={`rec-${song.id}-${idx}`}
              song={song}
              idx={idx}
              hoveredIdx={hoveredIdx}
              onHover={setHoveredIdx}
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
