
import React from 'react';
import { motion } from 'framer-motion';
import { WorldMap } from './WorldMap';

export const InteractiveMap: React.FC = () => {
  // Coordinates for Joinn.io's key locations
  // Miami: 25.7617, -80.1918
  // Sao Paulo (LatAm Hub): -23.5505, -46.6333
  // London: 51.5074, -0.1278
  // Lagos: 6.5244, 3.3792
  // Singapore: 1.3521, 103.8198
  
  const mapConnections = [
    {
      start: { lat: 25.7617, lng: -80.1918, label: "Miami" },
      end: { lat: -23.5505, lng: -46.6333, label: "LatAm" },
    },
    {
      start: { lat: 25.7617, lng: -80.1918 },
      end: { lat: 51.5074, lng: -0.1278, label: "London" },
    },
    {
      start: { lat: 51.5074, lng: -0.1278 },
      end: { lat: 6.5244, lng: 3.3792, label: "Lagos" },
    },
    {
      start: { lat: 25.7617, lng: -80.1918 }, // From Miami to Singapore across pacific visually or atlantic
      end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
    },
  ];

  return (
    <section id="market" className="py-32 bg-[#020617] relative overflow-hidden flex flex-col items-center border-t border-white/5">
      
      {/* Ambient Blue Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Header */}
      <div className="text-center max-w-3xl px-6 mb-16 z-10 relative">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-cyan-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block"
        >
          Global Infrastructure
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif font-light text-white mb-6 tracking-tight"
        >
          Borderless <span className="italic text-blue-400">Liquidity</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-blue-200/50 max-w-xl mx-auto font-light"
        >
          Connecting emerging markets with global capital pools through a unified, compliant layer.
        </motion.p>
      </div>

      {/* MAP CONTAINER */}
      <div className="relative w-full max-w-5xl mx-auto px-4">
        <WorldMap dots={mapConnections} lineColor="#0ea5e9" />

        {/* Stats Footer */}
        <div className="flex justify-center gap-8 mt-10 flex-wrap">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">System Operational</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Settlement: T+0</span>
             </div>
        </div>
      </div>
    </section>
  );
};
