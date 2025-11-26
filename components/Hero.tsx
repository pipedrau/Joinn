// @ts-nocheck
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronRight } from 'lucide-react';
import { HERO_CONTENT } from '../constants';

const AnimatedShape = ({ position, color, speed, distort, scale }: any) => {
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={1}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.4}
          clearcoat={0.8}
          clearcoatRoughness={0}
          metalness={0.1}
          distort={distort}
          speed={speed}
        />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4998ed" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#68b4f2" />

      <AnimatedShape position={[2, 0, -2]} color="#4998ed" speed={2} distort={0.4} scale={1.5} />
      <AnimatedShape position={[-2, 1, -3]} color="#234785" speed={1.5} distort={0.3} scale={1.2} />
      <AnimatedShape position={[0, -2, -4]} color="#68b4f2" speed={2.5} distort={0.5} scale={1.8} />
      <AnimatedShape position={[4, 2, -5]} color="#98cff8" speed={1.8} distort={0.4} scale={1} />
      <AnimatedShape position={[-4, -2, -3]} color="#1a2d51" speed={1.2} distort={0.3} scale={1.4} />

      <Environment preset="city" />
    </>
  );
};

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden bg-dodger-blue-950">

      {/* 1. BACKGROUND LAYER - 3D SCENE */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. OVERLAYS */}
      {/* Gradient overlay to fade 3D into background */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dodger-blue-950/30 via-transparent to-dodger-blue-950 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#1a2d51_100%)] pointer-events-none opacity-60" />

      {/* 3. CONTENT - Elevated Z-Index */}
      <div className="relative z-30 flex flex-col items-center text-center max-w-[90rem] mx-auto space-y-12 pointer-events-none">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-auto group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dodger-blue-950/30 border border-dodger-blue-400/20 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(73,152,237,0.5)] hover:bg-dodger-blue-900/40 transition-all cursor-pointer"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dodger-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-dodger-blue-400"></span>
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-dodger-blue-100/90 uppercase group-hover:text-dodger-blue-50 transition-colors">
            Introducing V2 Protocol
          </span>
          <ChevronRight size={10} className="text-dodger-blue-400/50 group-hover:text-dodger-blue-400 group-hover:translate-x-0.5 transition-all" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl md:text-8xl lg:text-[7.5rem] font-light tracking-[-0.03em] leading-[0.95] text-white text-center drop-shadow-2xl"
        >
          Cash That <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-b from-dodger-blue-200 via-dodger-blue-300 to-dodger-blue-600 pb-2">
            Compounds.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-dodger-blue-100/80 max-w-xl mx-auto font-sans font-light leading-relaxed tracking-wide mix-blend-plus-lighter"
        >
          {HERO_CONTENT.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 w-full"
        >
          {/* Primary CTA - Glowing */}
          <button className="group relative px-10 py-4 bg-transparent rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-dodger-blue-900/20">
            {/* Button Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-dodger-blue-600 to-dodger-blue-400 opacity-100 transition-opacity duration-500"></div>

            {/* Sheen effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none"></div>

            <span className="relative z-10 flex items-center gap-3 font-sans font-medium text-white tracking-wide text-sm uppercase">
              Start Building
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          {/* Secondary CTA - Minimalist Glass */}
          <button className="group px-10 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-3 shadow-lg">
            <Play size={14} fill="currentColor" className="opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="font-sans font-medium text-sm uppercase tracking-wide">Watch Demo</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade - Transitions into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dodger-blue-950 to-transparent z-20 pointer-events-none"></div>
    </section>
  );
};