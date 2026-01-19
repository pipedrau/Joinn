import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// ========== WHITE CONNECTOR LINE COMPONENT (Scroll-triggered) ==========
const ConnectorLine = ({
    startX,
    startY,
    endX,
    endY,
    opacity
}: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    opacity: any; // MotionValue
}) => {
    // Circuit-like path: Start -> Horizontal -> Vertical -> Horizontal -> End
    const midX = (startX + endX) / 2;
    const pathD = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;

    return (
        <motion.path
            d={pathD}
            stroke="#FFFFFF"
            strokeWidth="1"
            fill="none"
            strokeLinecap="square"
            strokeLinejoin="round"
            style={{ opacity, pathLength: opacity }}
        />
    );
};

// ========== TREE LABEL COMPONENT ==========
type TreeLabelProps = {
    id: string;
    text: string;
    text1: string;
    className: string;
    opacity: any;
    align?: "left" | "right";
    titleRef: React.RefCallback<HTMLHeadingElement>;
};

function TreeLabel({
    id,
    text,
    text1,
    className,
    opacity,
    align = "left",
    titleRef
}: TreeLabelProps) {
    return (
        <motion.div
            style={{ opacity }}
            className={clsx(
                "absolute transition-transform duration-300 hover:scale-105",
                className,
                align === "right" ? "text-right" : "text-left"
            )}
        >
            <h3
                ref={titleRef}
                className={clsx(
                    "font-sans font-bold text-[20px] mb-1 relative z-10 text-brand-accent"
                )}
            >
                {text}
            </h3>
            <p className="font-sans font-light text-[15px] leading-relaxed text-white opacity-80">{text1}</p>
        </motion.div>
    );
}

// ========== MAIN COMPONENT ==========
export const JoinnStack = ({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement> }) => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const coordContainerRef = useRef<HTMLDivElement>(null);
    const treeRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const features = [
        { id: 'smart', title: t.stack.features.smart.title, description: t.stack.features.smart.description },
        { id: 'ai', title: t.stack.features.ai.title, description: t.stack.features.ai.description },
        { id: 'pay', title: t.stack.features.pay.title, description: t.stack.features.pay.description },
        { id: 'invest', title: t.stack.features.invest.title, description: t.stack.features.invest.description },
        { id: 'rewards', title: t.stack.features.rewards.title, description: t.stack.features.rewards.description },
    ];

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % features.length);
    };

    // Refs for line calculation (similar to ProblemSolution)
    const labelRefs = useRef<{ [key: string]: HTMLHeadingElement | null }>({});

    const [lineCoords, setLineCoords] = useState<{ [key: string]: { startX: number, startY: number, endX: number, endY: number } }>({});

    // Map of opacity values for each line
    const opacityMap: { [key: string]: any } = {
        smart: null,
        ai: null,
        pay: null,
        invest: null,
        rewards: null
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: scrollContainerRef,
        offset: ["start end", "end start"]
    });

    // Animation Stages
    const smartAccountOpacity = useTransform(scrollYProgress, [0.1, 0.22], [0.1, 1]);
    const aiInsightsOpacity = useTransform(scrollYProgress, [0.22, 0.34], [0.1, 1]);
    const payOpacity = useTransform(scrollYProgress, [0.34, 0.46], [0.1, 1]);
    const investOpacity = useTransform(scrollYProgress, [0.46, 0.58], [0.1, 1]);
    const rewardsOpacity = useTransform(scrollYProgress, [0.58, 0.70], [0.1, 1]);

    // Opacity values used in the tree which respect mobile activeIndex
    const smartOp = isMobile ? (activeIndex >= 0 ? 1 : 0.1) : smartAccountOpacity;
    const aiOp = isMobile ? (activeIndex >= 1 ? 1 : 0.1) : aiInsightsOpacity;
    const payOp = isMobile ? (activeIndex >= 2 ? 1 : 0.1) : payOpacity;
    const investOp = isMobile ? (activeIndex >= 3 ? 1 : 0.1) : investOpacity;
    const rewardsOp = isMobile ? (activeIndex >= 4 ? 1 : 0.1) : rewardsOpacity;

    // Assign to map for line rendering
    opacityMap.smart = smartOp;
    opacityMap.ai = aiOp;
    opacityMap.pay = payOp;
    opacityMap.invest = investOp;
    opacityMap.rewards = rewardsOp;

    // Tree target points in the 1440x900 coordinate system
    // Tree box: top-[290px], centered, 419x477 (moved up 60px total)
    // Tree center X: 720 (half of 1440)
    // Tree actual boundaries: left = 720 - 209.5 = 510.5, right = 720 + 209.5 = 929.5
    // Tree top = 290, bottom = 290 + 477 = 767
    const treeTargets: { [key: string]: { x: number, y: number, align: 'left' | 'right' } } = {
        smart: { x: 720, y: 290 + 477 * 0.98, align: 'left' },   // Roots (very bottom)
        ai: { x: 720, y: 290 + 477 * 0.55, align: 'right' },  // Trunk (middle)
        pay: { x: 510 + 419 * 0.18, y: 290 + 477 * 0.42, align: 'left' },  // Left branches
        invest: { x: 510 + 419 * 0.82, y: 290 + 477 * 0.32, align: 'right' }, // Right branches
        rewards: { x: 510 + 419 * 0.22, y: 290 + 477 * 0.08, align: 'left' }   // Orange fruit (top-left)
    };

    // Calculate dynamic line positions
    const calculateLines = () => {
        if (!coordContainerRef.current) return;

        const containerRect = coordContainerRef.current.getBoundingClientRect();
        const newCoords: { [key: string]: { startX: number, startY: number, endX: number, endY: number } } = {};

        Object.keys(treeTargets).forEach((id) => {
            const titleEl = labelRefs.current[id];
            if (titleEl) {
                const titleRect = titleEl.getBoundingClientRect();
                const target = treeTargets[id];

                // Calculate start position (from title)
                let startX: number;
                let startY = (titleRect.top + titleRect.height / 2) - containerRect.top;

                if (target.align === 'left') {
                    // Left-aligned label: line starts from right edge
                    startX = titleRect.right - containerRect.left + 15;
                } else {
                    // Right-aligned label: line starts from left edge
                    startX = titleRect.left - containerRect.left - 15;
                }

                // End position (on tree)
                const endX = target.x;
                const endY = target.y;

                newCoords[id] = { startX, startY, endX, endY };
            }
        });

        setLineCoords(newCoords);
    };

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        calculateLines();
        window.addEventListener('resize', checkMobile);
        window.addEventListener('resize', calculateLines);

        // Recalculate periodically to catch layout shifts
        const interval = setInterval(calculateLines, 100);
        const timeout = setTimeout(() => { clearInterval(interval); calculateLines(); }, 2000);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('resize', calculateLines);
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            id="stack"
            className="relative w-full h-auto lg:h-[400vh] bg-[#000C3B] snap-start"
        >
            {/* Snap markers - Hidden on Mobile */}
            <div className="hidden lg:block absolute top-[20%] w-full h-px snap-start pointer-events-none" />
            <div className="hidden lg:block absolute top-[40%] w-full h-px snap-start pointer-events-none" />
            <div className="hidden lg:block absolute top-[60%] w-full h-px snap-start pointer-events-none" />
            <div className="hidden lg:block absolute top-[80%] w-full h-px snap-start pointer-events-none" />

            <div className="lg:sticky top-0 lg:h-screen w-full flex items-center justify-center overflow-hidden py-20 lg:py-0">

                {/* Fixed 1440x900 Coordinate System (Adjusted for Mobile) */}
                <div
                    ref={coordContainerRef}
                    className="relative w-full lg:w-[1440px] h-[700px] lg:h-[900px] flex-none origin-center transform transition-transform duration-300 scale-[0.9] lg:scale-[0.8] xl:scale-100 flex flex-col items-center"
                >

                    {/* Header */}
                    <div className="relative lg:absolute top-0 lg:top-[140px] left-0 w-full text-center mb-12 lg:mb-0">
                        <h2 className="text-[28px] lg:text-[34px] font-sans text-white leading-tight">
                            {t.stack.title} <span className="font-bold text-brand-accent">{t.stack.titleAccent}</span>
                        </h2>
                        <p className="text-[20px] lg:text-[26px] font-sans text-white mt-2 lg:mt-1 leading-tight">{t.stack.subtitle}</p>
                    </div>

                    {/* === DYNAMIC WHITE LINES (Scroll-triggered) - Hidden on Mobile === */}
                    <svg className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                        {Object.keys(lineCoords).map((id) => {
                            const coords = lineCoords[id];
                            return (
                                <ConnectorLine
                                    key={id}
                                    startX={coords.startX}
                                    startY={coords.startY}
                                    endX={coords.endX}
                                    endY={coords.endY}
                                    opacity={opacityMap[id]}
                                />
                            );
                        })}
                    </svg>

                    {/* === LABELS - Hidden on Mobile === */}
                    <div className="hidden lg:block">
                        <TreeLabel
                            id="smart"
                            titleRef={(el) => (labelRefs.current['smart'] = el)}
                            text={t.stack.features.smart.title}
                            text1={t.stack.features.smart.description}
                            className="left-[140px] top-[694px] w-[280px]"
                            opacity={smartAccountOpacity}
                        />

                        <TreeLabel
                            id="ai"
                            titleRef={(el) => (labelRefs.current['ai'] = el)}
                            align="right"
                            text={t.stack.features.ai.title}
                            text1={t.stack.features.ai.description}
                            className="right-[140px] top-[685px] w-[280px]"
                            opacity={aiInsightsOpacity}
                        />

                        <TreeLabel
                            id="pay"
                            titleRef={(el) => (labelRefs.current['pay'] = el)}
                            text={t.stack.features.pay.title}
                            text1={t.stack.features.pay.description}
                            className="left-[140px] top-[482px] w-[250px]"
                            opacity={payOpacity}
                        />

                        <TreeLabel
                            id="invest"
                            titleRef={(el) => (labelRefs.current['invest'] = el)}
                            align="right"
                            text={t.stack.features.invest.title}
                            text1={t.stack.features.invest.description}
                            className="right-[140px] top-[386px] w-[250px]"
                            opacity={investOpacity}
                        />

                        <TreeLabel
                            id="rewards"
                            titleRef={(el) => (labelRefs.current['rewards'] = el)}
                            text={t.stack.features.rewards.title}
                            text1={t.stack.features.rewards.description}
                            className="left-[140px] top-[316px] w-[250px]"
                            opacity={rewardsOpacity}
                        />
                    </div>

                    {/* === MOBILE REWARDS LABEL / CAROUSEL === */}
                    <div className="lg:hidden mt-8 w-full max-w-[320px] relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-left pr-12 h-[120px]"
                            >
                                <h3 className="font-sans font-bold text-[24px] mb-2 text-brand-accent">
                                    {features[activeIndex].title}
                                </h3>
                                <p className="font-sans font-light text-[15px] leading-relaxed text-white opacity-80">
                                    {features[activeIndex].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Next Arrow with Hint Animation */}
                        <motion.button
                            onClick={nextSlide}
                            className="absolute right-0 top-0 bottom-0 flex items-center justify-center group"
                            initial={{ x: 0 }}
                            animate={activeIndex === 0 ? {
                                x: [0, 5, 0],
                                transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                            } : { x: 0 }}
                        >
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-active:scale-95 transition-transform bg-white/5">
                                <ArrowRight className="text-brand-accent" size={24} />
                            </div>
                        </motion.button>

                        {/* Pagination Dots */}
                        <div className="flex gap-2 mt-4 items-center">
                            {features.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={clsx(
                                        "h-1 transition-all duration-300 rounded-full",
                                        activeIndex === idx ? "w-8 bg-brand-accent" : "w-2 bg-white/20"
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    {/* === TREE SVG === */}
                    <div ref={treeRef} className="relative lg:absolute top-0 lg:top-[290px] left-0 lg:left-1/2 lg:-translate-x-1/2 w-[300px] lg:w-[419px] h-[340px] lg:h-[477px] mt-12 lg:mt-0 flex items-center justify-center">
                        <svg width="100%" height="100%" viewBox="0 0 419 477" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            {/* STAGE 1: ROOTS */}
                            <motion.g
                                style={!isMobile ? { opacity: smartAccountOpacity } : {}}
                                animate={isMobile ? { opacity: activeIndex >= 0 ? 1 : 0.1 } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <path d="M364.746 467.457C364.167 468.061 357.177 469.874 355.803 470.15C341.5 473.002 323.6 473.867 308.869 474.838C241.385 479.284 173.987 475.399 106.341 475.956C92.3733 476.069 78.4308 477.502 64.3947 476.54C62.5408 476.413 48.2407 475.187 48.235 473.992C48.2322 473.637 49.1577 473.214 49.6346 473.135C54.5405 472.315 60.7806 472.758 65.8086 472.573C69.2324 472.448 72.608 472.306 76.0148 472C76.1483 471.01 74.7288 471.466 74.0389 471.438C71.4923 471.333 68.9173 471.495 66.3735 471.438C47.0965 471.007 24.9976 470.433 5.97047 468.024C4.07968 467.786 1.67218 467.502 0 466.614C0.0170341 465.862 11.3703 464.678 12.7472 464.605C27.9757 463.79 43.5364 465.135 58.694 465.218C86.329 465.368 113.268 461.631 140.992 462.334C147.496 462.499 154.925 464.102 161.415 463.518C162.94 463.382 164.746 463.325 165.081 461.503C164.501 451.909 162.906 442.274 161.572 432.683H189.959C193.812 440.595 197.834 447.683 201.145 452.661C210.255 466.353 217.498 464.852 232.885 464.65C245.797 464.483 259.032 463.382 272.027 464.037C281.239 464.5 290.54 466.512 299.775 466.92C305.876 467.19 311.955 466.344 317.928 466.307C333.253 466.208 348.581 466.429 363.909 466.33C364.871 465.93 365.036 467.153 364.746 467.457Z" fill="#0048AE" />
                            </motion.g>
                            {/* STAGE 2: TRUNK */}
                            <motion.g
                                style={!isMobile ? { opacity: aiInsightsOpacity } : {}}
                                animate={isMobile ? { opacity: activeIndex >= 1 ? 1 : 0.1 } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <path d="M251.299 366.447C250.751 367.803 248.679 368.226 247.358 368.459C239.466 369.847 230.858 366.055 222.937 365.874C222.784 365.823 220.731 365.596 220.532 365.519C220.263 365.414 219.936 365.332 218.381 365.062C218.315 365.051 216.822 364.838 216.129 364.739C202.286 362.732 177.201 367.733 175.863 384.895C175.091 394.827 179.801 409.819 185.868 423.806C187.183 426.834 188.559 429.811 189.959 432.683H161.572C161.157 429.72 160.771 426.761 160.45 423.806C160.269 422.18 160.11 420.557 159.976 418.934C159.062 407.884 160.152 396.277 158.841 385.451C157.745 376.427 143.078 366.458 136.705 360.491C126.169 350.624 119.472 339.832 105.717 333.603C90.4996 326.716 83.7257 326.585 71.7563 313.1C67.9151 308.773 62.9894 302.964 62.6857 297.203C68.0372 302.828 73.1901 308.682 79.47 313.327C85.6619 317.904 96.135 322.72 103.522 325.019C105.739 325.708 107.602 326.531 110.052 326.142C107.724 317.541 104.913 308.756 104.357 299.777C101.663 256.24 110.103 214.165 100.022 170.742C98.5596 164.439 96.1066 158.925 92.467 153.616C99.363 155.625 103.091 163.801 105.101 170.203C117.289 209.014 107.301 254.691 111.761 294.638C115.088 324.426 137.94 346.052 159.113 364.736C159.88 364.29 159.817 363.538 160.061 362.843C162.812 355.065 164.042 344.599 166.372 336.239C173.175 311.82 184.619 285.875 169.853 261.49L162.809 251.799C163.338 251.294 170.515 256.981 171.324 257.75C175.974 262.171 183.228 274.694 183.228 281.025V289.822C184.119 289.589 184.582 288.659 185.042 287.946C197.179 269.09 205.304 233.953 198.564 212.332C191.35 189.201 170.674 181.21 153.463 167.214C143.745 159.314 132.832 149.277 128.778 137.151C134.502 142.285 139.643 148.048 145.523 153.028C167.122 171.321 194.453 181.193 204.793 210.07C205.48 211.988 207.621 218.135 207.621 219.73V233.351C207.621 233.691 206.704 234.509 207.059 235.337C207.601 235.36 207.836 234.787 208.103 234.404C213.81 226.171 219.082 212.037 224.541 202.607C229.206 194.545 234.702 186.026 240.056 178.404C246.359 169.431 252.883 159.933 262.632 154.456C232.314 197.277 208.523 245.213 192.304 295.222L193.147 296.06C205.875 288.176 219.826 280.418 235.142 279.606C236.32 279.544 236.769 279.28 236.55 280.736C217.577 287.983 198.828 302.382 187.535 319.386C178.206 333.433 175.415 352.094 176.993 368.712C197.36 346.912 226.986 361.961 251.299 366.447Z" fill="#1A7EC8" />
                            </motion.g>
                            {/* STAGE 3: LEFT BRANCHES */}
                            <motion.g
                                style={!isMobile ? { opacity: payOpacity } : {}}
                                animate={isMobile ? { opacity: activeIndex >= 2 ? 1 : 0.1 } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <path d="M139.123 164.831C127.038 164.342 116.556 158.522 106.614 152.242C88.5547 140.835 65.0306 117.829 63.1199 95.3029C60.0112 58.6477 105.56 56.7663 112.752 89.3464C117.371 110.278 114.938 139.759 130.064 156.593C132.835 159.677 136.23 161.908 139.123 164.831Z" fill="#A0DBFF" />
                                <path d="M214.485 212.423C212.938 211.756 213.418 209.534 212.964 207.993C206.051 184.61 175.682 164.907 158.327 149.149C128.872 122.403 109.39 84.9253 124.443 44.8563C134.345 18.4936 154.363 19.4442 175.647 33.0654C191.452 43.1792 201.417 55.722 209.307 72.601C229.737 116.311 235.327 167.725 214.485 212.423Z" fill="#A0DBFF" />
                                <path d="M101.047 315.138C99.0989 315.969 97.9264 315.498 96.1208 314.678C73.7181 304.502 39.4 258.681 27.5726 236.838C13.3264 210.538 2.27974 179.839 17.3606 151.116C32.8503 121.614 71.6144 147.739 83.913 167.413C100.419 193.815 92.2313 245.916 94.8063 277.404C95.8426 290.094 98.2671 302.754 101.047 315.138Z" fill="#A0DBFF" />
                                <path d="M257.116 96.438C255.433 99.9681 246.044 122.92 244.261 123.311C243.086 123.57 241.308 119.205 240.88 118.201C236.925 108.918 234.662 98.7025 230.296 89.0598C220.152 66.6615 204.975 53.9228 207.098 27.0976C208.464 9.83274 226.889 2.29001 242.172 1.46706C263.229 0.334798 279.073 13.0394 280.317 34.4729C281.509 55.0352 265.823 78.1856 257.116 96.438Z" fill="#A0DBFF" />
                                <path d="M191.694 258.57C190.575 260.61 187.918 265.551 185.235 263.545C184.255 262.812 179.886 254.503 178.177 252.446C166.659 238.592 147.189 239.37 132.122 232.122C107.573 220.311 124.483 180.447 146.295 177.961C159.516 176.454 175.324 186.905 183.282 196.826C195.802 212.44 201.633 240.479 191.694 258.57Z" fill="#A0DBFF" />
                                <path d="M165.719 309.766C161.58 322.507 154.852 334.363 153.225 348.067C152.004 348.921 142.817 341.225 141.31 339.846C127.143 326.889 118.163 308.971 115.863 289.819C113.53 270.378 120.465 245.684 145.017 254.975C170.611 264.663 173.567 285.614 165.719 309.766Z" fill="#A0DBFF" />
                                <path d="M150.948 385.809C134.027 392.092 112.258 388.505 97.1145 378.953C91.7657 375.579 80.1541 365.905 77.9028 360.153C74.4392 351.305 80.9405 338.362 90.6841 336.852C98.1677 335.691 107.84 337.556 113.791 342.406C117.876 345.734 119.634 351.543 122.359 355.967C129.735 367.925 140.296 376.898 150.948 385.809Z" fill="#A0DBFF" />
                                <path d="M76.594 333.259C76.1596 333.884 66.93 335.555 65.5672 335.589C50.0576 335.992 21.4261 324.241 14.3541 309.658C9.99904 300.679 14.4506 290.611 24.7336 290.148C44.8622 289.249 59.716 310.804 70.422 324.502C71.6115 326.023 77.9851 331.27 76.594 333.259Z" fill="#A0DBFF" />
                            </motion.g>
                            {/* STAGE 4: RIGHT BRANCHES */}
                            <motion.g
                                style={!isMobile ? { opacity: investOpacity } : {}}
                                animate={isMobile ? { opacity: activeIndex >= 3 ? 1 : 0.1 } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <path d="M413.756 208.872C402.571 232.295 375.861 251.606 350.307 257.787C310.657 267.376 260.231 251.078 223.187 267.376C219.158 269.149 215.391 272.469 211.09 272.586C208.501 270.049 220.498 243.195 222.514 238.893C234.018 214.364 252.114 184.3 272.62 166.437C278.537 161.283 287.769 157.067 294.838 153.477C314.408 143.545 352.388 123.036 373.598 124.458C388.489 125.457 401.886 135.639 409.424 147.912C419.809 164.816 422.492 190.58 413.756 208.872Z" fill="#0F62AD" />
                                <path d="M308.803 370.065C286.639 378.513 266.309 362.65 246.552 355.434C229.583 349.239 211.618 346.875 193.948 351.634C188.943 352.982 184.284 355.542 179.327 356.58C178.308 346.041 184.906 334.815 191.251 326.798C205.327 309.02 231.877 294.561 254.978 296.494C273.358 298.032 298.606 308.846 310.649 323.089C321.539 335.967 329.278 362.261 308.803 370.065Z" fill="#0F62AD" />
                                <path d="M360.942 99.2957C346.77 129.316 312.52 124.12 286.228 132.378C277.571 135.097 268.929 139.47 261.278 144.305C259.68 145.315 252.727 151.329 251.367 149.995C253.34 126.467 261.727 102.369 274.386 82.5019C282.298 70.0839 297.226 51.84 312.034 48.0913C344.053 39.9839 376.755 65.8074 360.942 99.2957Z" fill="#0F62AD" />
                                <path d="M353.243 341.2C338.417 338.955 320.679 320.274 308.596 310.952C292.141 298.253 274.812 285.699 254.768 279.385C254.533 278.102 254.834 278.482 255.489 278.125C261.759 274.788 279.479 273.411 286.79 273.122C315.225 271.998 375.895 268.962 384.827 305.055C390.164 326.616 375.685 344.596 353.243 341.2Z" fill="#0F62AD" />
                                <path d="M219.669 369.015C220.002 369.046 220.337 369.063 220.669 369.072C232.127 369.444 245.732 375.508 251.256 385.917C262.121 406.391 237.828 419.731 220.782 407.892C210.573 400.803 203.3 388.351 191.751 380.184C190.816 379.526 186.317 377.267 186.132 377C184.681 374.898 194.476 371.558 195.895 371.177C201.295 369.724 207.002 369.398 212.544 368.68C213.509 368.555 214.485 368.541 215.456 368.632L219.669 369.015Z" fill="#0F62AD" />
                            </motion.g>
                            {/* STAGE 5: FRUITS */}
                            <motion.g
                                style={!isMobile ? { opacity: rewardsOpacity } : {}}
                                animate={isMobile ? { opacity: activeIndex >= 4 ? 1 : 0.1 } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <path d="M404.013 105.317C397.225 114.163 383.047 116.282 372.525 116.946C370.336 117.085 361.621 117.906 362.12 114.537C362.518 111.878 367.526 102.173 369.116 99.3467C374.521 89.7352 382.896 80.2373 394.84 79.6328C408.252 78.9546 410.937 96.2961 404.013 105.317Z" fill="#FF731D" />
                                <path d="M287.204 390.792C287.022 400.818 275.24 405.974 266.914 400.835C257.726 395.168 258.856 378.51 254.831 369.515C266.686 368.783 287.46 376.606 287.204 390.792Z" fill="#FF731D" />
                                <path d="M44.0276 275.693H28.4272C22.9166 275.693 14.3059 270.798 11.2198 266.235C4.8434 256.805 13.7182 247.049 24.1573 250.451C32.0242 253.016 40.7173 264.975 43.5875 272.444C44.0162 273.565 44.1525 274.501 44.0276 275.693Z" fill="#FF731D" />
                                <path d="M58.217 127.307C58.2056 127.838 57.6691 128.698 57.3596 128.698C53.9272 128.698 49.91 128.993 46.5798 128.698C40.9898 128.204 30.4968 125.006 26.4228 121.056C17.1761 112.094 29.435 96.0295 41.9466 104.387C46.9801 107.749 49.223 113.519 52.3005 118.433C53.368 120.139 58.2369 126.152 58.217 127.307Z" fill="#FF731D" />
                                <path d="M189.789 35.032C188.778 35.2675 188.088 34.944 187.214 34.5269C179.753 30.9655 170.103 20.7638 169.944 12.0377C169.691 -1.71968 187.887 -4.79012 192.114 8.62959C194.834 17.2677 190.666 26.3457 189.789 35.032Z" fill="#FF731D" />
                                <path d="M105.81 58.8351C104.689 59.7772 96.9612 55.1971 95.4764 54.2351C93.1825 52.7538 89.8608 50.546 88.3675 48.2957C79.8788 35.4747 99.8854 24.8701 105.314 40.9885C106.216 43.6702 107.361 57.5326 105.81 58.8351Z" fill="#FF731D" />
                            </motion.g>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};
