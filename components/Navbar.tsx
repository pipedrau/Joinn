import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4`}
      >
        <div 
          className={`
            relative flex items-center justify-between px-6 py-3 rounded-full 
            transition-all duration-500 ease-in-out
            ${isScrolled 
              ? 'bg-white/90 border border-black/5 shadow-lg shadow-black/5 backdrop-blur-xl w-full max-w-[58rem]' 
              : 'bg-white/5 border border-white/10 backdrop-blur-md w-full max-w-5xl shadow-[0_0_20px_rgba(0,0,0,0.2)]'}
          `}
        >
          {/* Logo */}
          <a href="#" className="flex items-center group">
             <img 
                src="https://res.cloudinary.com/ds9dcy2s2/image/upload/v1763581042/logojoinn_vtcd91.png" 
                alt="Joinn.io" 
                className={`
                    h-5 w-auto object-contain transition-all duration-500
                    ${isScrolled ? '' : 'brightness-0 invert'} 
                `}
             />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`
                    text-sm font-medium transition-colors relative group 
                    ${isScrolled ? 'text-zinc-500 hover:text-black' : 'text-blue-100 hover:text-white'}
                `}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ease-out ${isScrolled ? 'bg-black' : 'bg-cyan-400'}`}></span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <button className={`
              px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg
              ${isScrolled 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20' 
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/30 border border-white/10'}
            `}>
              Join Waitlist
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden ${isScrolled ? 'text-zinc-900' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-semibold text-white tracking-tight border-b border-white/10 pb-4"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg mt-4 shadow-lg shadow-blue-900/50">
                Get Early Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};