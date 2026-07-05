"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Helper type for the translation prop
type HeroProps = {
  t: any;
};

export default function Hero({ t }: HeroProps) {
  const [isDesktop, setIsDesktop] = useState(true);

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Depth layers for parallax (only active on desktop)
  const bgX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const bgY = useTransform(smoothY, [-1, 1], [-10, 10]);
  
  const midX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const midY = useTransform(smoothY, [-1, 1], [-20, 20]);

  useEffect(() => {
    // Check if device is desktop for performance optimization
    const checkDevice = () => setIsDesktop(window.innerWidth >= 768);
    checkDevice();
    window.addEventListener("resize", checkDevice);

    // Only run mouse listener on desktop to save mobile CPU/Battery
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Entrance animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 20 } },
  };

  return (
    <section 
      id="home" 
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#FAF8F6] px-6 pt-24 pb-16 md:pt-0 md:pb-0"
    >
      {/* 1. Deep Background Layer (Animated Blobs) */}
      <motion.div style={isDesktop ? { x: bgX, y: bgY } : {}} className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Blob 1 - Optimized for mobile with smaller blur */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-[50vh] w-[70vw] md:h-[40vh] md:w-[40vw] rounded-full bg-[#6C0B1C] blur-[70px] md:blur-[120px] will-change-transform"
        />
        {/* Blob 2 - Hidden on mobile to prevent lag */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute ml-[30vw] mt-[20vh] hidden md:block h-[35vh] w-[35vw] rounded-full bg-[#480713] blur-[100px] will-change-transform"
        />
        {/* Blob 3 - White glow */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -ml-[10vw] -mt-[20vh] h-[40vh] w-[60vw] md:h-[50vh] md:w-[50vw] rounded-full bg-white blur-[60px] md:blur-[90px] will-change-transform"
        />
      </motion.div>

      {/* 2. Abstract Digital Composition Layer */}
      <div className="absolute inset-0 z-10 mx-auto max-w-7xl pointer-events-none">
        <motion.div style={isDesktop ? { x: midX, y: midY } : {}} className="absolute inset-0">
          {/* Glass Card - Hidden on mobile for cleaner look & performance */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute left-[5%] top-[15%] hidden h-[300px] w-[220px] -rotate-6 rounded-[2rem] border border-white/40 bg-white/10 shadow-[0_30px_80px_rgba(108,11,28,0.05)] backdrop-blur-md md:block lg:left-[10%]"
          />
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 top-[10%] h-[400px] w-[400px] rounded-full border-[1px] border-[#6C0B1C]/10 border-dashed hidden md:block will-change-transform"
          />

          <motion.div
             animate={{ y: [0, 15, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-[20%] left-[20%] hidden h-12 w-12 rounded-full border border-[#6C0B1C]/15 bg-white/40 backdrop-blur-sm md:block will-change-transform"
          />
        </motion.div>
      </div>

      {/* 3. Hero Content - Centered */}
      <div className="relative z-20 mx-auto w-full max-w-4xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.h1 
            variants={fadeUp} 
            className="font-serif text-5xl font-medium leading-[1.1] tracking-[-0.02em] text-[#1B1B1B] md:text-6xl lg:text-[4.5rem]"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p 
            variants={fadeUp} 
            className="mt-6 max-w-2xl text-base leading-relaxed text-[#5E5E5E] md:text-lg lg:leading-loose"
          >
            {t.hero.text}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex w-full flex-col justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link 
                href="/contact" 
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#6C0B1C] px-8 py-4 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(108,11,28,0.2)] transition-colors hover:bg-[#480713] sm:w-auto"
              >
                <span className="relative z-10">{t.hero.cta}</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"></div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link 
                href="/#services" 
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/60 bg-white/40 px-8 py-4 text-sm font-semibold text-[#480713] shadow-sm backdrop-blur-md transition hover:bg-white/60 sm:w-auto"
              >
                {t.hero.secondary}
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Subtle Metrics / Features Section */}
          <motion.div 
            variants={fadeUp} 
            className="mt-16 flex flex-wrap justify-center gap-6 border-t border-[#480713]/10 pt-8 sm:mt-24 md:gap-12 lg:gap-16"
          >
            {[t.hero.metricOne, t.hero.metricTwo, t.hero.metricThree].map((item, index) => (
              <div key={item} className="group flex items-center gap-2 opacity-60 transition-opacity duration-300 hover:opacity-100">
                <span className="font-serif text-[#480713]/50 transition-colors group-hover:text-[#6C0B1C]">0{index + 1} //</span>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#5E5E5E]">{item}</span>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
