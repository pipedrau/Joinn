// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronRight, Layers } from 'lucide-react';
import { HERO_CONTENT } from '../constants';

// Base URL for assets
const baseUrl = import.meta.env.BASE_URL;
const getAsset = (path: string) => `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;

export const Hero: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<'default' | 'v2'>('default');

  const toggleVideo = () => {
    setCurrentVideo(prev => prev === 'default' ? 'v2' : 'default');
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden bg-[#02040a]">

      {/* 1. BACKGROUND LAYER - VIDEO */}
      <div className="absolute inset-0 z-0">
        <video
          key={currentVideo} // Force re-render on change
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source
            src={currentVideo === 'default' ? getAsset('assets/background.webm') : getAsset('assets/background-Joinn.webm')}
            type="video/webm"
          />
        </video>
      </div>

      {/* 2. OVERLAYS */}
      {/* Gradient overlay to fade video into background - Deep Sea Tones */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#02040a]/40 via-transparent to-[#02040a] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#02040a_100%)] pointer-events-none opacity-50" />

      {/* DEBUG: Video Toggle Control */}
      <div className="absolute bottom-8 right-8 z-50 pointer-events-auto">
        <button
          onClick={toggleVideo}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white/80 hover:bg-white/20 hover:text-white transition-all text-xs font-mono"
        >
          <Layers size={14} />
          <span>{currentVideo === 'default' ? 'BG: Original' : 'BG: Version 2'}</span>
        </button>
      </div>

      {/* 3. CONTENT - Elevated Z-Index */}
      <div className="relative z-30 flex flex-col items-center text-center max-w-[90rem] mx-auto space-y-12 pointer-events-none">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-auto group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/30 border border-teal-500/20 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(45,212,191,0.3)] hover:bg-blue-900/40 transition-all cursor-pointer"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-400"></span>
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-teal-100/90 uppercase group-hover:text-teal-50 transition-colors">
            Introducing V2 Protocol
          </span>
          <ChevronRight size={10} className="text-teal-400/50 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl md:text-8xl lg:text-[7.5rem] font-light tracking-[-0.03em] leading-[0.95] text-white text-center drop-shadow-2xl"
        >
          Cash That <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-b from-teal-200 via-blue-300 to-blue-600 pb-2">
            Compounds.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-blue-100/80 max-w-xl mx-auto font-sans font-light leading-relaxed tracking-wide"
        >
          {HERO_CONTENT.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 w-full"
        >
          {/* Primary CTA - Glowing */}
          <button className="group relative px-10 py-4 bg-transparent rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-teal-900/20">
            {/* Button Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-100 transition-opacity duration-500"></div>

            {/* Sheen effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none"></div>

            <span className="relative z-10 flex items-center gap-3 font-sans font-medium text-white tracking-wide text-sm uppercase">
              Start Building
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          {/* Secondary CTA - Minimalist Glass */}
          <button className="group px-10 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-3 shadow-lg">
            <Play size={14} fill="currentColor" className="opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="font-sans font-medium text-sm uppercase tracking-wide">Watch Demo</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade - Transitions into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#02040a] to-transparent z-20 pointer-events-none"></div>
    </section>
  );
};