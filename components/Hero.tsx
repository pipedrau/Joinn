import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, ChevronRight, Layers, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Base URL for assets
// @ts-ignore
const baseUrl = import.meta.env.BASE_URL;
const getAsset = (path: string) => `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;

export const Hero: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden snap-start snap-always bg-white"
    >
      {/* 1. BACKGROUND LAYER - VIDEO (Removed as per White theme decision) */}

      {/* 2. OVERLAY - Deep Blue Overlay (Removed as per White theme decision) */}

      {/* Language Switcher */}
      <div className="absolute bottom-10 right-10 z-50 pointer-events-auto">
        <div className="flex bg-white/20 backdrop-blur-xl border border-white/30 rounded-full p-1 shadow-xl items-center gap-0.5">
          <button
            onClick={() => setLanguage('en')}
            className={`relative group w-7 h-7 rounded-full transition-all duration-500 flex items-center justify-center p-0.5 ${language === 'en'
              ? 'ring-1 ring-brand-accent shadow-[0_0_10px_rgba(255,115,29,0.3)] scale-105'
              : 'opacity-50 hover:opacity-100'
              }`}
          >
            <img src={getAsset('assets/us_flag_flat.png')} alt="English" className="w-full h-full rounded-full object-cover" />
            {language === 'en' && (
              <motion.div layoutId="language-indicator" className="absolute -bottom-1 w-1 h-1 bg-brand-accent rounded-full" />
            )}
          </button>

          <div className="w-px h-4 bg-white/20 mx-0.5" />

          <button
            onClick={() => setLanguage('es')}
            className={`relative group w-7 h-7 rounded-full transition-all duration-500 flex items-center justify-center p-0.5 ${language === 'es'
              ? 'ring-1 ring-brand-accent shadow-[0_0_10px_rgba(255,115,29,0.3)] scale-105'
              : 'opacity-50 hover:opacity-100'
              }`}
          >
            <img src={getAsset('assets/spain_flag_flat.png')} alt="Español" className="w-full h-full rounded-full object-cover" />
            {language === 'es' && (
              <motion.div layoutId="language-indicator" className="absolute -bottom-1 w-1 h-1 bg-brand-accent rounded-full" />
            )}
          </button>
        </div>
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
          className="font-poppins text-[48px] sm:text-5xl md:text-6xl lg:text-[110px] font-light tracking-[-0.01em] leading-[0.95] text-center -mt-8 md:-mt-12 lg:-mt-16 px-4 text-[#01104E]"
          style={{ letterSpacing: '-5%' }}
        >
          {t.hero.title} <br />
          <span className="font-light pb-2 text-[#01104E]">
            {t.hero.titleAccent}
          </span>
        </motion.h1>

        {/* Subtitle - Poppins Medium, smaller and tighter */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-base md:text-lg max-w-lg mx-auto font-sans font-medium leading-[1.2] tracking-tight mt-6 px-6 text-[#01104E]/80"
        >
          {t.hero.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full mt-8 px-6"
        >
          {/* Primary CTA - Light Blue Figma style with Glow */}
          <a
            href="https://joinn-app-git-feature-dark-modern-redesign-yield-fi.vercel.app"
            className="group relative w-full sm:w-auto px-8 py-3.5 bg-brand-accent rounded-full hover:bg-brand-accent/90 transition-all duration-300 text-white font-medium text-lg text-center overflow-hidden"
          >
            {/* Orange Glow Effect (moved to -z-20) */}
            <div className="absolute inset-0 bg-brand-accent blur-[15px] opacity-40 group-hover:opacity-60 transition-opacity rounded-full -z-20" />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shimmer"
                style={{ animationDuration: '3s' }} />
            </div>

            <span className="relative z-20">{t.hero.cta}</span>
          </a>

          {/* Secondary CTA - Watch Demo Popup */}
          <button
            onClick={() => setShowVideoModal(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full transition-all duration-300 font-medium text-lg border-2 border-[#01104E] text-[#01104E] hover:bg-[#01104E]/5"
          >
            {t.hero.demo}
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