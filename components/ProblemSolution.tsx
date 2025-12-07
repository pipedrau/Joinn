// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Base URL for assets (handles GitHub Pages /Joinn/ subpath)
const baseUrl = import.meta.env.BASE_URL;
const getAsset = (path: string) => `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;

// Feature data
const leftFeatures = [
  {
    icon: 'assets/SVGS/icon-animation.svg',
    title: 'Real-time Yield',
    description: 'Your balance earns yield continuously. Inflation has no room here.',
  },
  {
    icon: 'assets/SVGS/icon-cards.svg',
    title: 'Spend While Earning',
    description: 'A Mastercard that keeps your compounding loop alive.',
  },
  {
    icon: 'assets/SVGS/icon-p2p.svg',
    title: 'Tokenized Assets, Simplified',
    description: 'Access T-Bills, bonds, and yield vaults with Web2 simplicity.',
  },
];

const rightFeatures = [
  {
    icon: 'assets/SVGS/icon-flash.svg',
    title: 'Gasless & Invisible Web3',
    description: 'No wallet pop-ups, no fees. Just seamless transactions.',
  },
  {
    icon: 'assets/SVGS/icon-globe.svg',
    title: 'Global + Local Rail Connectivity',
    description: 'Deposit locally, invest globally — instantly.',
  },
  {
    icon: 'assets/SVGS/icon-shield.svg',
    title: 'Secure by Design',
    description: 'Self-custodial architecture and institutional-grade protection.',
  },
];

// Feature Item Component
const FeatureItem = ({
  icon,
  title,
  description,
  align = 'left',
  onHover,
  id
}: {
  icon: string;
  title: string;
  description: string;
  align?: 'left' | 'right';
  onHover: (id: string | null) => void;
  id: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    onMouseEnter={() => onHover(id)}
    onMouseLeave={() => onHover(null)}
    className={`flex flex-col cursor-pointer transition-all duration-300 hover:scale-105 ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
  >
    <div className="w-10 h-10 mb-3">
      <img src={getAsset(icon)} alt="" className="w-full h-full object-contain" />
    </div>
    <h3 className="text-base font-serif italic font-medium text-slate-900 mb-1">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-xs max-w-[180px]">{description}</p>
  </motion.div>
);

// L-Shaped Line Component - Straight segments, behind dashboard
const ConnectorLine = ({
  startX,
  startY,
  endX,
  endY,
  isActive,
  side
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isActive: boolean;
  side: 'left' | 'right';
}) => {
  // L-shaped path: horizontal first, then vertical to end
  // For left: go right, then turn toward center
  // For right: go left, then turn toward center
  const cornerX = side === 'left' ? endX - 20 : endX + 20;
  const cornerY = startY;

  // Path: Start → Corner (horizontal) → End (diagonal/vertical)
  const pathD = `M ${startX} ${startY} L ${cornerX} ${cornerY} L ${endX} ${endY}`;

  return (
    <motion.path
      d={pathD}
      stroke="#041146"
      strokeWidth="1"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  );
};

export const ProblemSolution: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate line positions based on container width
  // Grid: [Left 25%] [Dashboard 50%] [Right 25%]
  const dashboardCenterX = containerWidth * 0.5;
  const dashboardCenterY = 200; // Approximate vertical center

  // Left features end at ~22% (right edge of left column)
  // Right features start at ~78% (left edge of right column)
  const leftEdge = containerWidth * 0.22;
  const rightEdge = containerWidth * 0.78;

  return (
    <section className="pt-[108px] pb-32 bg-[#CFEDFF]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <video
            src={getAsset('assets/logo-animado-Joinn.webm')}
            autoPlay
            loop
            muted
            playsInline
            className="h-20 mx-auto mb-6"
          />
          <h2 className="font-serif text-3xl md:text-4xl text-blue-950 max-w-2xl mx-auto leading-tight">
            Where your money <span className="italic font-extrabold">compounds</span><br />
            even while you spend.
          </h2>
        </div>

        {/* Main Content with Line Overlay */}
        <div className="relative" ref={containerRef}>

          {/* SVG Layer - Z-0 (BEHIND dashboard) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0, overflow: 'visible' }}
          >
            {containerWidth > 0 && leftFeatures.map((_, idx) => (
              <ConnectorLine
                key={`left-${idx}`}
                startX={leftEdge}
                startY={50 + idx * 100}
                endX={dashboardCenterX - 180}
                endY={dashboardCenterY}
                isActive={hoveredFeature === `left-${idx}`}
                side="left"
              />
            ))}
            {containerWidth > 0 && rightFeatures.map((_, idx) => (
              <ConnectorLine
                key={`right-${idx}`}
                startX={rightEdge}
                startY={50 + idx * 100}
                endX={dashboardCenterX + 180}
                endY={dashboardCenterY}
                isActive={hoveredFeature === `right-${idx}`}
                side="right"
              />
            ))}
          </svg>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-start">

            {/* Left Column */}
            <div className="flex flex-col gap-8 lg:gap-10 order-2 lg:order-1 relative z-[5]">
              {leftFeatures.map((feature, idx) => (
                <FeatureItem
                  key={idx}
                  id={`left-${idx}`}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  align="left"
                  onHover={setHoveredFeature}
                />
              ))}
            </div>

            {/* Center Column - Dashboard (Z-10, above lines) */}
            <div className="order-1 lg:order-2 flex justify-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md lg:max-w-lg"
              >
                <img
                  src={getAsset('assets/JoinnDashboard.webp')}
                  alt="Joinn Dashboard"
                  className="w-full h-auto rounded-xl shadow-2xl shadow-blue-900/20"
                />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-8 lg:gap-10 order-3 relative z-[5]">
              {rightFeatures.map((feature, idx) => (
                <FeatureItem
                  key={idx}
                  id={`right-${idx}`}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  align="right"
                  onHover={setHoveredFeature}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
