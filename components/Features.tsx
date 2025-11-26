import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../constants';
import { ArrowRight } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section id="solution" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Subtle background mesh */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] tracking-[0.2em] uppercase mb-6 border border-blue-100/50">The Ecosystem</span>
          <h2 className="text-5xl md:text-7xl font-serif font-light text-slate-900 mb-8 tracking-tight leading-[1]">
            A Financial Lifestyle <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              On Autopilot.
            </span>
          </h2>
          <p className="text-xl text-slate-500 font-light leading-relaxed max-w-2xl">
            Yield of an investment account. Liquidity of a checking account. We blurred the lines so you don't have to choose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`
                group relative p-8 rounded-[2rem] border border-slate-200 overflow-hidden flex flex-col justify-between
                ${index === 0 || index === 3 ? 'md:col-span-2 bg-white' : 'md:col-span-1 bg-slate-100/80 backdrop-blur-sm'}
                hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500
              `}
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>
              
              <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
                      <feature.icon size={20} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-medium text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 font-light leading-relaxed max-w-sm">
                    {feature.description}
                  </p>
              </div>
              
              <div className="relative z-10 pt-8">
                <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors duration-300">
                  Learn More <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};