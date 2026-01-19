import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Base URL for assets
// @ts-ignore
const baseUrl = (import.meta as any).env.BASE_URL || '/';
const getAsset = (path: string) => `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;

export const FinalCTA: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section className="relative w-full py-32 bg-[#CFEDFF] snap-start overflow-hidden flex flex-col items-center justify-center text-center px-6">
            {/* Decorative Background SVG */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none p-10">
                <img
                    src={getAsset('assets/SVGS/sourcelogofondo.svg')}
                    alt=""
                    className="w-full max-w-7xl h-auto object-contain"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-[28px] md:text-[48px] font-sans text-blue-950 leading-tight mb-8"
                >
                    {t.finalCta.title} <span className="font-bold text-brand-accent">{t.finalCta.titleAccent}</span><br />
                    {t.finalCta.titleEnd}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <a
                        href="https://joinn-app-git-feature-dark-modern-redesign-yield-fi.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex px-10 py-4 bg-brand-accent rounded-full hover:bg-brand-accent/90 transition-all duration-300 text-white font-semibold text-xl shadow-lg shadow-brand-accent/20 overflow-hidden"
                    >
                        {/* Orange Glow Effect */}
                        <div className="absolute inset-0 bg-brand-accent blur-xl opacity-40 group-hover:opacity-60 transition-opacity rounded-full -z-10" />

                        <span className="relative z-10">{t.finalCta.cta}</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
