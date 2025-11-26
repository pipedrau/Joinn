import React from 'react';
import { TEAM } from '../constants';

export const Team: React.FC = () => {
  const images = [
    "https://joinn.io/wp-content/uploads/2025/05/DSC00726-min-1-min.png", // Bryan Benson
    "https://res.cloudinary.com/ds9dcy2s2/image/upload/v1763580131/leonardo_uenbdz.png", // Leonardo Galindez (Updated)
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Beau Williams
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"  // Dan Foley
  ];

  return (
    <section id="team" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 max-w-3xl">
           <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-4 block">Leadership</span>
           <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 text-zinc-900 tracking-tight">
             Built By Veterans.
           </h2>
           <p className="text-xl text-zinc-500 font-light leading-relaxed">
             We are a team of engineers, bankers, and operators from <span className="text-zinc-900 font-normal border-b border-zinc-200 pb-0.5">Binance</span>, <span className="text-zinc-900 font-normal border-b border-zinc-200 pb-0.5">Atlassian</span>, & <span className="text-zinc-900 font-normal border-b border-zinc-200 pb-0.5">SoftBank</span>.
           </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {TEAM.map((member, index) => (
            <div key={member.name} className="group cursor-pointer">
              {/* Image Container */}
              <div className="w-full aspect-[3/4] rounded-none mb-6 overflow-hidden relative bg-zinc-100">
                  <img 
                    src={images[index % images.length]} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale contrast-[0.9] group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Content */}
              <div className="pr-4">
                <h3 className="text-xl font-serif font-medium text-zinc-900 mb-1 group-hover:text-blue-900 transition-colors">{member.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-[1px] w-4 bg-blue-500"></div>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{member.role}</p>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed font-light opacity-80 group-hover:opacity-100 transition-opacity">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};