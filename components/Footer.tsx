import React from 'react';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-[#020617] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-3">
             <div className="flex items-center gap-2">
                 <img 
                    src="https://res.cloudinary.com/ds9dcy2s2/image/upload/v1763581042/logojoinn_vtcd91.png" 
                    alt="Joinn" 
                    className="h-5 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                 />
             </div>
             <span className="text-xs text-blue-200/50 tracking-wide">Empowering the next billion.</span>
        </div>
        
        <div className="text-blue-200/40 text-sm font-medium">
          © {new Date().getFullYear()} Joinn Inc. All rights reserved.
        </div>

        <div className="flex gap-6">
          <a href="https://twitter.com/joinn_io" target="_blank" rel="noopener noreferrer" className="text-blue-200/50 hover:text-white transition-colors transform hover:scale-110 duration-200">
            <Twitter size={20} />
          </a>
          <a href="https://www.linkedin.com/company/joinn-network" target="_blank" rel="noopener noreferrer" className="text-blue-200/50 hover:text-white transition-colors transform hover:scale-110 duration-200">
            <Linkedin size={20} />
          </a>
          <a href="https://joinn.io" target="_blank" rel="noopener noreferrer" className="text-blue-200/50 hover:text-white transition-colors transform hover:scale-110 duration-200">
             {/* Using Instagram Icon as placeholder or simple Globe if specifically needed, but requested social links often include IG */}
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};