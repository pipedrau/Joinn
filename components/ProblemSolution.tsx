import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Base URL for assets
// @ts-ignore
const baseUrl = (import.meta as any).env.BASE_URL;
const getAsset = (path: string) => `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;

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
    className={`flex flex-row lg:flex-col items-start cursor-pointer transition-all duration-300 hover:scale-105 gap-5 lg:gap-0 ${align === 'right' ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}
  >
    <div className="w-10 h-10 lg:w-10 lg:h-10 mt-1 lg:mt-0 mb-0 lg:mb-3 flex-shrink-0">
      <img
        src={getAsset(icon)}
        alt=""
        className="w-full h-full object-contain"
        style={{ filter: "invert(53%) sepia(87%) saturate(2844%) hue-rotate(346deg) brightness(101%) contrast(106%)" }}
      />
    </div>
    <div className={`flex flex-col ${align === 'right' ? 'lg:items-end' : 'lg:items-start'}`}>
      <h3 ref={titleRef} className="text-[18px] lg:text-base font-bold text-slate-900 mb-0.5 font-sans relative z-10">{title}</h3>
      <p className="text-slate-600 leading-snug text-[14px] lg:text-xs max-w-[220px] lg:max-w-[180px] font-sans">{description}</p>
    </div>
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

export const ProblemSolution: React.FC<{ scrollContainerRef?: React.RefObject<HTMLElement> }> = ({ scrollContainerRef }) => {
  const { t } = useLanguage();
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Refs for precise line calculation
  const leftTitleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const rightTitleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const [lineCoords, setLineCoords] = useState<{ [key: string]: { startX: number, startY: number, endX: number, endY: number } }>({});

  const leftFeatures = [
    { icon: 'assets/SVGS/icon-animation.svg', title: t.problemSolution.features.yield.title, description: t.problemSolution.features.yield.description },
    { icon: 'assets/SVGS/icon-cards.svg', title: t.problemSolution.features.cards.title, description: t.problemSolution.features.cards.description },
    { icon: 'assets/SVGS/icon-p2p.svg', title: t.problemSolution.features.p2p.title, description: t.problemSolution.features.p2p.description },
  ];

  const rightFeatures = [
    { icon: 'assets/SVGS/icon-flash.svg', title: t.problemSolution.features.flash.title, description: t.problemSolution.features.flash.description },
    { icon: 'assets/SVGS/icon-globe.svg', title: t.problemSolution.features.globe.title, description: t.problemSolution.features.globe.description },
    { icon: 'assets/SVGS/icon-shield.svg', title: t.problemSolution.features.shield.title, description: t.problemSolution.features.shield.description },
  ];

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
    const interval = setInterval(calculateLines, 100); // Check for layout shifts
    const timeout = setTimeout(() => { clearInterval(interval); calculateLines(); }, 2000); // Stop after likely animation end

    return () => {
      window.removeEventListener('resize', calculateLines);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section id="solution" ref={sectionRef} className="h-auto lg:h-[200vh] bg-[#CFEDFF] snap-start snap-always relative py-20 lg:py-0">
      {/* Intermediate snap point to allow "Stage 2" scroll stop */}
      <div className="hidden lg:block absolute top-1/2 w-full h-px snap-start pointer-events-none" />

      <div className="lg:sticky top-0 lg:h-screen flex flex-col justify-center overflow-hidden">
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
              className="text-[22px] md:text-[34px] font-light text-blue-950 max-w-full md:max-w-2xl mx-auto leading-tight font-sans"
            >
              {t.problemSolution.title.split("").map((char, i) => (
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
              {" "}
              <span className="inline-flex">
                {t.problemSolution.titleAccent.split("").map((char, i) => (
                  <motion.span
                    key={`comp-${i}`}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                    className="inline-block font-black text-brand-accent cursor-default"
                    whileHover={{ y: -5, color: "#FF731D" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <br />
              {t.problemSolution.titleEnd.split("").map((char, i) => (
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

            {/* SVG Layer - Z-0 (BEHIND dashboard) - Hidden on Mobile */}
            <motion.svg
              style={{ opacity: linesOpacity, zIndex: 0, overflow: 'visible' }}
              className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
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
                style={window.innerWidth >= 1024 ? { opacity: featuresOpacity, y: featuresY } : {}}
                className="flex flex-col gap-8 lg:gap-10 order-2 lg:order-1 relative z-[5] px-8 lg:px-0"
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
              <div className="order-1 lg:order-2 flex justify-center relative z-10 w-full mb-12 lg:mb-0">
                <motion.div
                  ref={dashboardRef}
                  style={window.innerWidth >= 1024 ? { scale: dashboardScale } : {}}
                  className="w-full max-w-lg origin-center"
                >
                  <img
                    src={getAsset('assets/JoinnDashboard.webp')}
                    alt="Joinn Dashboard"
                    className="w-full h-auto rounded-xl shadow-2xl shadow-blue-900/10 lg:shadow-blue-900/20"
                    onLoad={calculateLines} // Recalc when image loads
                  />
                </motion.div>
              </div>

              {/* Right Column */}
              <motion.div
                style={window.innerWidth >= 1024 ? { opacity: featuresOpacity, y: featuresY } : {}}
                className="flex flex-col gap-8 lg:gap-10 order-3 relative z-[5] px-8 lg:px-0"
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
