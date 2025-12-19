import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Base URL for assets (handles GitHub Pages /Joinn/ subpath)
// @ts-ignore
const baseUrl = (import.meta as any).env.BASE_URL;
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

// Feature Item Component with Ref forwarding for Title
const FeatureItem = ({
  icon,
  title,
  description,
  align = 'left',
  onHover,
  id,
  titleRef
}: {
  icon: string;
  title: string;
  description: string;
  align?: 'left' | 'right';
  onHover: (id: string | null) => void;
  id: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
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
    <h3 ref={titleRef} className="text-base font-bold text-slate-900 mb-1 font-sans relative z-10">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-xs max-w-[180px] font-sans">{description}</p>
  </motion.div>
);

// Dynamic Connector Line Component
const ConnectorLine = ({
  startX,
  startY,
  endX,
  endY,
  isActive
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isActive: boolean;
}) => {
  // Circuit-like path: Start -> Horizontal -> Vertical -> Horizontal -> End
  const midX = (startX + endX) / 2;
  const pathD = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;

  return (
    <motion.path
      d={pathD}
      stroke="#041146"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="square"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
  );
};

interface ProblemSolutionProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({ scrollContainerRef }) => {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Refs for precise line calculation
  const leftTitleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const rightTitleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const [lineCoords, setLineCoords] = useState<{ [key: string]: { startX: number, startY: number, endX: number, endY: number } }>({});

  // Scroll Tracking for Sticky Reveal
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Animation values refined per user request:
  // Phase 1 (Stage 1 to Stage 2): 0 to 0.7 (Slower)
  // Dashboard starts 30% larger (1.3 -> 1)
  const dashboardScale = useTransform(scrollYProgress, [0, 0.7], [1.3, 1]);

  // Side features enter from top to bottom parallelly and slower
  const featuresOpacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const featuresY = useTransform(scrollYProgress, [0.2, 0.8], [-30, 0]);

  const linesOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  // Calculate dynamic line positions
  const calculateLines = () => {
    if (!containerRef.current || !dashboardRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const dashboardRect = dashboardRef.current.getBoundingClientRect();

    // Relative position of dashboard edges
    const dashboardLeft = dashboardRect.left - containerRect.left;
    const dashboardRight = dashboardRect.right - containerRect.left;
    const dashboardTop = dashboardRect.top - containerRect.top;
    const dashboardHeight = dashboardRect.height;

    const newCoords: { [key: string]: { startX: number, startY: number, endX: number, endY: number } } = {};

    // Calculate Left Features
    leftFeatures.forEach((_, idx) => {
      const titleEl = leftTitleRefs.current[idx];
      if (titleEl) {
        const titleRect = titleEl.getBoundingClientRect();
        // Start: Right edge of title
        const startX = titleRect.right - containerRect.left + 10;
        const startY = (titleRect.top + titleRect.height / 2) - containerRect.top;

        // End: Left edge of dashboard, distributed vertically
        const endX = dashboardLeft;
        // Distribute endpoints along the dashboard height (20% to 80%)
        const endY = dashboardTop + (dashboardHeight * (0.2 + (idx * 0.3)));

        newCoords[`left-${idx}`] = { startX, startY, endX, endY };
      }
    });

    // Calculate Right Features
    rightFeatures.forEach((_, idx) => {
      const titleEl = rightTitleRefs.current[idx];
      if (titleEl) {
        const titleRect = titleEl.getBoundingClientRect();
        // Start: Left edge of title
        const startX = titleRect.left - containerRect.left - 10;
        const startY = (titleRect.top + titleRect.height / 2) - containerRect.top;

        // End: Right edge of dashboard
        const endX = dashboardRight;
        const endY = dashboardTop + (dashboardHeight * (0.2 + (idx * 0.3)));

        newCoords[`right-${idx}`] = { startX, startY, endX, endY };
      }
    });

    setLineCoords(newCoords);
  };

  useEffect(() => {
    // Recalculate on load and resize
    calculateLines();
    window.addEventListener('resize', calculateLines);

    // Also recalculate periodically during the reveal animation to track positions
    // This is expensive but necessary if elements move. However, sticky reveal moves the logic container? 
    // Actually, Scale transform affects layout only visually, but getBoundingClientRect captures rendered rect.
    // Since scale changes, we might want to defer calculation until fully revealed or interval check.
    const interval = setInterval(calculateLines, 100); // Check for layout shifts
    const timeout = setTimeout(() => { clearInterval(interval); calculateLines(); }, 2000); // Stop after likely animation end

    return () => {
      window.removeEventListener('resize', calculateLines);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-[200vh] bg-[#CFEDFF] snap-start snap-always relative">
      {/* Intermediate snap point to allow "Stage 2" scroll stop */}
      <div className="absolute top-1/2 w-full h-px snap-start pointer-events-none" />

      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">

          {/* Header - Typewriter effect applied to all characters */}
          <div className="text-center mb-12 mt-20">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.02
                  }
                }
              }}
              className="text-[28px] md:text-[34px] font-light text-blue-950 max-w-2xl mx-auto leading-tight font-sans"
            >
              {"Where your money ".split("").map((char, i) => (
                <motion.span
                  key={`start-${i}`}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <span className="inline-flex">
                {"compounds".split("").map((char, i) => (
                  <motion.span
                    key={`comp-${i}`}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                    className="inline-block font-black text-blue-600 cursor-default"
                    whileHover={{ y: -5, color: "#3b82f6" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                >
                  .
                </motion.span>
              </span>
              <br />
              {"even while you spend.".split("").map((char, i) => (
                <motion.span
                  key={`end-${i}`}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          {/* Main Content with Line Overlay */}
          <div className="relative" ref={containerRef}>

            {/* SVG Layer - Z-0 (BEHIND dashboard) */}
            <motion.svg
              style={{ opacity: linesOpacity, zIndex: 0, overflow: 'visible' }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {Object.keys(lineCoords).map((key) => {
                const coords = lineCoords[key];
                return (
                  <ConnectorLine
                    key={key}
                    startX={coords.startX}
                    startY={coords.startY}
                    endX={coords.endX}
                    endY={coords.endY}
                    isActive={hoveredFeature === key}
                  />
                );
              })}
            </motion.svg>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

              {/* Left Column */}
              <motion.div
                style={{ opacity: featuresOpacity, y: featuresY }}
                className="flex flex-col gap-10 order-2 lg:order-1 relative z-[5]"
              >
                {leftFeatures.map((feature, idx) => (
                  <FeatureItem
                    key={idx}
                    id={`left-${idx}`}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    align="left"
                    onHover={setHoveredFeature}
                    // @ts-ignore
                    titleRef={(el) => (leftTitleRefs.current[idx] = el)}
                  />
                ))}
              </motion.div>

              {/* Center Column - Dashboard (Z-10, above lines) */}
              <div className="order-1 lg:order-2 flex justify-center relative z-10 w-full">
                <motion.div
                  ref={dashboardRef}
                  style={{ scale: dashboardScale }}
                  className="w-full max-w-lg origin-center"
                >
                  <img
                    src={getAsset('assets/JoinnDashboard.webp')}
                    alt="Joinn Dashboard"
                    className="w-full h-auto rounded-xl shadow-2xl shadow-blue-900/20"
                    onLoad={calculateLines} // Recalc when image loads
                  />
                </motion.div>
              </div>

              {/* Right Column */}
              <motion.div
                style={{ opacity: featuresOpacity, y: featuresY }}
                className="flex flex-col gap-10 order-3 relative z-[5]"
              >
                {rightFeatures.map((feature, idx) => (
                  <FeatureItem
                    key={idx}
                    id={`right-${idx}`}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    align="right"
                    onHover={setHoveredFeature}
                    // @ts-ignore
                    titleRef={(el) => (rightTitleRefs.current[idx] = el)}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
