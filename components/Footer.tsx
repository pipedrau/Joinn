import React from 'react';
import { Twitter, Linkedin } from 'lucide-react';
import { WorldMap } from './WorldMap';

export const Footer: React.FC = () => {
  // Footer link columns
  const linkColumns = [
    {
      title: "PRODUCTS",
      links: ["Smart Account", "Joinn Pay", "Joinn Invest", "Rewards"]
    },
    {
      title: "SOLUTIONS",
      links: ["For Individuals", "For Businesses", "Asset Management"]
    },
    {
      title: "COMPANY",
      links: ["About", "Team", "Careers", "Contact"]
    },
    {
      title: "RESOURCES",
      links: ["Blog", "Documentation", "FAQ", "Support"]
    },
  ];

  return (
    <footer className="bg-[#CFEDFF] snap-start py-8 px-6">
      {/* Rounded Card Container */}
      <div className="max-w-7xl mx-auto bg-[#000C3B] rounded-3xl overflow-hidden">

        {/* Main Footer Content */}
        <div className="px-10 py-12">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Left Side: Logo + Link Columns */}
            <div className="flex-1">
              {/* Logo */}
              <div className="mb-10">
                <img
                  src="https://res.cloudinary.com/ds9dcy2s2/image/upload/v1763581042/logojoinn_vtcd91.png"
                  alt="Joinn"
                  className="h-6 w-auto brightness-0 invert opacity-90"
                />
              </div>

              {/* Link Columns Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {linkColumns.map((column) => (
                  <div key={column.title}>
                    <h4 className="text-[10px] font-bold text-[#a0dbff]/60 tracking-[0.15em] uppercase mb-4">
                      {column.title}
                    </h4>
                    <ul className="space-y-3">
                      {column.links.map((link) => (
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
            <div className="lg:w-[380px] bg-[#001440] rounded-2xl p-6 relative overflow-hidden min-h-[200px]">
              {/* Dotted World Map Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <WorldMap dots={[]} lineColor="#0ea5e9" />
              </div>

              {/* Contact Info */}
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-[#a0dbff]/60 tracking-[0.15em] uppercase">
                  INFO
                </span>
                <h3 className="text-2xl font-medium text-white mt-2 mb-8">Contact</h3>

                {/* Location Pin - Positioned over Europe area */}
                <div className="absolute top-8 right-16">
                  <div className="w-7 h-7 bg-[#ff731d] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40 animate-pulse">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                </div>

                <div className="mt-16">
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
          <div className="px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-white/40 text-xs">
              COPYRIGHT ©{new Date().getFullYear()} JOINN
            </div>

            {/* Policy Links */}
            <div className="flex gap-6 text-xs text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Regulatory Information</a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://twitter.com/joinn_io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/joinn-network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};