import React from 'react';

export const FluidBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-white">
      {/* Base ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white"></div>
      
      {/* Moving Fluid Blobs */}
      <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-blue-200/20 blur-[120px] animate-blob mix-blend-multiply filter"></div>
      <div className="absolute top-[20%] -right-[20%] w-[70%] h-[80%] rounded-full bg-cyan-200/20 blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply filter"></div>
      <div className="absolute -bottom-[30%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-200/20 blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply filter"></div>
      
      {/* Subtle Grid Overlay for technical feel */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>
    </div>
  );
};