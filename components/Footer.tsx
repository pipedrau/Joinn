import React from 'react';
import { Twitter, Linkedin, Send } from 'lucide-react';
import { WorldMap } from './WorldMap';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  // Footer link columns from translations
  const linkColumns = [
    {
      title: t.footer.columns.products.title,
      links: t.footer.columns.products.links
    },
    {
      title: t.footer.columns.solutions.title,
      links: t.footer.columns.solutions.links
    },
    {
      title: t.footer.columns.company.title,
      links: t.footer.columns.company.links
    },
    {
      title: t.footer.columns.resources.title,
      links: t.footer.columns.resources.links
    },
  ];

  return (
    <footer id="footer" className="bg-[#CFEDFF] md:bg-[#CFEDFF] lg:bg-[#CFEDFF] snap-start py-8 px-0 md:px-6">
      {/* Rounded Card Container */}
      <div className="max-w-7xl mx-auto bg-[#000C3B] md:rounded-3xl overflow-hidden shadow-2xl">

        {/* Main Footer Content */}
        <div className="px-10 py-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start text-left">

            {/* Left Side: Logo + Link Columns */}
            <div className="flex-1 w-full flex flex-col items-start">
              {/* Logo */}
              <div className="mb-10">
                <img
                  src="https://res.cloudinary.com/ds9dcy2s2/image/upload/v1763581042/logojoinn_vtcd91.png"
                  alt="Joinn"
                  className="h-6 w-auto brightness-0 invert opacity-90"
                />
              </div>

              {/* Link Columns Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 w-full">
                {linkColumns.map((column) => (
                  <div key={column.title} className="flex flex-col items-start">
                    <h4 className="text-[10px] font-bold text-[#a0dbff]/60 tracking-[0.15em] uppercase mb-4">
                      {column.title}
                    </h4>
                    <ul className="space-y-3">
                      {column.links.map((link: string) => (
                        <li key={link}>
                          <a
                            href="#"
                            className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Contact + Dotted Map */}
            <div className="w-full lg:w-[380px] bg-[#001440] rounded-2xl p-6 relative overflow-hidden min-h-[220px] flex flex-col items-start">
              {/* Dotted World Map Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <WorldMap dots={[]} lineColor="#0ea5e9" />
              </div>

              {/* Contact Info */}
              <div className="relative z-10 w-full">
                <span className="text-[10px] font-bold text-[#a0dbff]/60 tracking-[0.15em] uppercase">
                  {t.footer.info}
                </span>
                <h3 className="text-2xl font-medium text-white mt-2 mb-8">{t.footer.contact}</h3>

                {/* Location Pin - Positioned over Europe area */}
                <div className="absolute top-8 right-4 sm:right-16">
                  <div className="w-7 h-7 bg-[#ff731d] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40 animate-pulse">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                </div>

                <div className="mt-16 flex flex-col items-start">
                  <a href="mailto:hello@joinn.io" className="text-[#ff731d] text-sm hover:underline block">
                    hello@joinn.io
                  </a>
                  <a href="mailto:support@joinn.io" className="text-[#ff731d] text-sm hover:underline block mt-1">
                    support@joinn.io
                  </a>
                  <p className="text-white/90 text-sm mt-4 font-medium">
                    Zug, Switzerland
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="px-10 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Copyright */}
            <div className="text-white/40 text-[10px] sm:text-xs text-left">
              {t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
            </div>

            {/* Policy Links */}
            <div className="flex flex-wrap justify-start md:justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-white/40">
              {t.footer.policies.map((policy: string) => (
                <a key={policy} href="#" className="hover:text-white transition-colors">{policy}</a>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://x.com/JoinnFinance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors p-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/joinnfinance/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors p-2"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-white transition-colors p-2"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};