// @ts-nocheck
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, ChevronRight, Layers, X, Sun, Moon } from 'lucide-react';
import { HERO_CONTENT } from '../constants';

// Base URL for assets
const baseUrl = import.meta.env.BASE_URL;
const getAsset = (path: string) => `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;

export const Hero: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showVideoModal, setShowVideoModal] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden bg-[#000C3B] snap-start snap-always">

      {/* 1. BACKGROUND LAYER - VIDEO */}
      <div className="absolute inset-0 z-0">
        <video
          key={theme} // Force re-render on change
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${theme === 'light' ? 'opacity-100' : 'opacity-40'}`}
        >
          <source
            src={
              theme === 'light' ? getAsset('assets/background4-2.mp4') :
                getAsset('assets/background.webm')
            }
            type="video/mp4"
          />
        </video>
      </div>

      {/* 2. OVERLAYS - Deep Blue Overlay for Contrast */}
      <div className={`absolute inset-0 z-[1] bg-[#000C3B] pointer-events-none transition-opacity duration-1000 ${theme === 'light' ? 'opacity-0' : 'opacity-50'}`} />

      {/* Theme Toggle Switch */}
      <div className="absolute bottom-8 right-8 z-50 pointer-events-auto">
        <button
          onClick={toggleTheme}
          className="relative w-16 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full transition-all duration-500 hover:bg-white/20 group"
        >
          {/* Slider handle */}
          <motion.div
            animate={{ x: theme === 'light' ? 4 : 36 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            {theme === 'light' ? (
              <Sun size={14} className="text-amber-500" />
            ) : (
              <Moon size={14} className="text-blue-600" />
            )}
          </motion.div>
          {/* Subtle labels/background icons */}
          <Sun size={12} className={`absolute left-2.5 top-2.5 transition-opacity duration-300 ${theme === 'light' ? 'opacity-0' : 'opacity-40 text-white'}`} />
          <Moon size={12} className={`absolute right-2.5 top-2.5 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-0' : 'opacity-40 text-white'}`} />
        </button>
      </div>

      {/* 3. CONTENT - Elevated Z-Index */}
      <div className="relative z-30 flex flex-col items-center text-center max-w-[90rem] mx-auto group pointer-events-none -mt-[90px]">

        {/* Logo GIF above Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <img
            src={getAsset('assets/Animation Logo Joinn.gif')}
            alt="Joinn Animated Logo"
            className="w-[106px] h-[106px] md:w-[148px] md:h-[148px] lg:w-[192px] lg:h-[192px] object-contain"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-poppins text-5xl md:text-6xl lg:text-[110px] font-light tracking-[-0.05em] leading-[0.95] text-white text-center -mt-8 md:-mt-12 lg:-mt-16"
          style={{ letterSpacing: '-5%' }}
        >
          Cash That <br />
          <span className={`font-light text-transparent bg-clip-text bg-gradient-to-b pb-2 ${theme === 'light'
            ? 'from-[#213972] to-[#01104E]'
            : 'from-[#54BEFF] to-[#3B82F6]'
            }`}>
            Compounds
          </span>
        </motion.h1>

        {/* Subtitle - Poppins Medium, smaller and tighter */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-white/90 max-w-lg mx-auto font-sans font-medium leading-[1.0] tracking-tight mt-6"
        >
          Your balance earns real yield in real time.<br />
          A Mastercard that keeps your compounding<br />
          loop alive. Inflation? Not on this card.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pointer-events-auto flex flex-row items-center justify-center gap-4 pt-4 w-full mt-6"
        >
          {/* Primary CTA - Light Blue Figma style with Glow */}
          <a
            href="https://joinn-app-git-feature-dark-modern-redesign-yield-fi.vercel.app"
            className="group relative px-8 py-3.5 bg-[#54BEFF] rounded-full hover:bg-[#45a6e0] transition-all duration-300 text-black font-medium text-lg min-w-[180px] overflow-hidden"
          >
            {/* Sky Blue Glow Effect (moved to -z-20) */}
            <div className="absolute inset-0 bg-[#54BEFF] blur-[15px] opacity-40 group-hover:opacity-60 transition-opacity rounded-full -z-20" />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shimmer"
                style={{ animationDuration: '3s' }} />
            </div>

            <span className="relative z-20">Joinn Now</span>
          </a>

          {/* Secondary CTA - Watch Demo Popup */}
          <button
            onClick={() => setShowVideoModal(true)}
            className="px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 font-medium text-lg min-w-[180px]"
          >
            Watch Demo
          </button>
        </motion.div>
      </div>

      {/* 4. VIDEO MODAL POPUP */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 z-[110] p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              {/* YouTube Embed */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dCq27f-9zqY?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};