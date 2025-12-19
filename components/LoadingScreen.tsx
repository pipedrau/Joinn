// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Animation duration + some buffer
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.4, ease: "easeOut", delay: 0.8 }
                    }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none"
                >
                    {/* SVG Mask Container */}
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{
                            scale: 80,
                            transition: {
                                duration: 1.2,
                                ease: [0.76, 0, 0.24, 1], // Custom cubic-bezier for cinematic feel
                                delay: 0.2
                            }
                        }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        <svg
                            id="Capa_2"
                            data-name="Capa 2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 4894.8 3232.53"
                            className="w-full h-auto max-w-none"
                            style={{ minWidth: '100vw', minHeight: '100vh' }}
                        >
                            <defs>
                                <style>
                                    {`.cls-1 { fill: #06185F; }`}
                                </style>
                            </defs>
                            <g id="BACKGROUND">
                                {/* These are small polygons inside the logo, making them evenodd too */}
                                <g fillRule="evenodd">
                                    <polygon className="cls-1" points="2543.54 1616.28 2543.52 1616.33 2543.44 1616.25 2543.46 1616.2 2543.54 1616.28" />
                                    <polygon className="cls-1" points="2351.37 1616.3 2351.32 1616.36 2351.24 1616.28 2351.29 1616.22 2351.37 1616.3" />
                                </g>
                                {/* Fixed the hole by adding fillRule="evenodd" and ensuring background container doesn't block it */}
                                <path
                                    className="cls-1"
                                    fillRule="evenodd"
                                    d="M0,0v3232.53h4894.8V0H0ZM2844.69,1674.04l-141.13,141.63c-15.87,15.92-36.74,23.89-57.59,23.89s-41.71-7.97-57.58-23.89l-140.98-141.49h-.01s-19.21,19.29-19.21,19.29l-121.78,122.21c-15.87,15.92-36.74,23.89-57.59,23.89s-41.7-7.97-57.58-23.89l-141.12-141.63c-31.76-31.86-31.76-83.71,0-115.58l141.11-141.63c31.75-31.86,83.42-31.86,115.17,0l121.78,122.21,19.22,19.31.04.04,140.96-141.56c31.75-31.86,83.42-31.86,115.17,0l141.13,141.63c31.74,31.86,31.74,83.7-.01,115.57Z"
                                />
                            </g>
                        </svg>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
