import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const isActive = isScrolled || isHovered;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NAV_LINKS = [
    { name: t.nav.mission, href: '#solution' },
    { name: t.nav.solution, href: '#stack' },
    { name: t.nav.market, href: '#partners' },
    { name: t.nav.stack, href: '#footer' },
  ];

  useEffect(() => {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        root: null
      }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4`}
      >
        <div
          className={`
            relative flex items-center justify-between px-6 py-3 rounded-full 
            transition-all duration-500 ease-in-out
            ${isActive
              ? 'bg-white/95 border border-black/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] backdrop-blur-xl w-full max-w-[58rem]'
              : 'bg-white/10 glass-border backdrop-blur-2xl w-full max-w-5xl shadow-[0_20px_50px_-12px_rgba(0,12,59,0.5)]'}
          `}
        >
          {/* Logo */}
          <a href="#hero" className="flex items-center group">
            <img
              src="https://res.cloudinary.com/ds9dcy2s2/image/upload/v1763581042/logojoinn_vtcd91.png"
              alt="Joinn.io"
              className={`
                    h-6 w-auto object-contain transition-all duration-500
                    ${isActive ? '' : 'brightness-0 md:brightness-0'} 
                `}
              style={!isActive ? { filter: window.innerWidth < 768 ? 'brightness(0) saturate(100%) invert(8%) sepia(35%) saturate(7465%) hue-rotate(224deg) brightness(88%) contrast(106%)' : 'brightness(0) saturate(100%) invert(8%) sepia(35%) saturate(7465%) hue-rotate(224deg) brightness(88%) contrast(106%)' } : {}}
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`
                    text-base font-medium transition-colors relative group 
                    ${isActive ? 'text-zinc-600 hover:text-black' : 'text-[#01104E] hover:text-blue-600'}
                `}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ease-out ${isActive ? 'bg-black' : 'bg-cyan-400'}`}></span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="https://joinn-app-git-feature-dark-modern-redesign-yield-fi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className={`
              px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg
              ${isActive
                  ? 'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-brand-accent/20'
                  : 'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-brand-accent/30 border border-white/10'}
            `}>
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden ${isActive ? 'text-zinc-900' : 'text-[#01104E]'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    scrollToSection(e, link.href);
                  }}
                  className="text-3xl font-semibold text-white tracking-tight border-b border-white/10 pb-4"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://joinn-app-git-feature-dark-modern-redesign-yield-fi.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-accent text-white py-4 rounded-xl font-semibold text-lg mt-4 shadow-lg shadow-brand-accent/50 text-center"
              >
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};