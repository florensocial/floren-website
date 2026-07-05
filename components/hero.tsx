"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { dictionary, type Lang } from "@/lib/content";
import { Icon } from "./icons";

type Copy = (typeof dictionary)[Lang];

interface InteractiveLayerProps {
  children: React.ReactNode;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  range: number;
  className?: string;
}

function InteractiveLayer({
  children,
  smoothX,
  smoothY,
  range,
  className = "",
}: InteractiveLayerProps) {
  const x = useTransform(smoothX, [-0.5, 0.5], [-range, range]);
  const y = useTransform(smoothY, [-0.5, 0.5], [-range, range]);

  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

function BackgroundBlobs() {
  const blobs = [
    {
      id: "blob-1",
      className:
        "top-[-10%] left-[15%] w-[32rem] h-[32rem] sm:w-[42rem] sm:h-[42rem] bg-[#6C0B1C]/12 blur-[100px]",
      animate: {
        x: [0, 30, -20, 0],
        y: [0, -25, 20, 0],
        scale: [1, 1.08, 0.95, 1],
      },
      duration: 22,
    },
    {
      id: "blob-2",
      className:
        "top-[25%] right-[-10%] w-[36rem] h-[36rem] sm:w-[48rem] sm:h-[48rem] bg-[#480713]/8 blur-[120px]",
      animate: {
        x: [0, -35, 15, 0],
        y: [0, 30, -15, 0],
        scale: [1, 0.92, 1.05, 1],
      },
      duration: 26,
    },
    {
      id: "blob-3",
      className:
        "bottom-[-15%] left-[30%] w-[30rem] h-[30rem] sm:w-[40rem] sm:h-[40rem] bg-[#6C0B1C]/10 blur-[90px]",
      animate: {
        x: [0, 25, -30, 0],
        y: [0, -20, 25, 0],
        scale: [1, 1.06, 0.98, 1],
      },
      duration: 20,
    },
    {
      id: "blob-4",
      className:
        "top-[40%] left-[-5%] w-[24rem] h-[24rem] bg-white/80 blur-[70px]",
      animate: { x: [0, 20, 0], y: [0, -15, 0] },
      duration: 18,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F6] via-transparent to-[#FAF8F6]/90 z-10 pointer-events-none" />
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className={`absolute rounded-full pointer-events-none ${blob.className}`}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

function FloatingShapes() {
  const shapes = [
    {
      id: "large-circle",
      className:
        "top-[10%] right-[5%] w-[28rem] h-[28rem] lg:w-[44rem] lg:h-[44rem] rounded-full border border-[#6C0B1C]/15 pointer-events-none",
      animate: { rotate: [0, 360], scale: [1, 1.03, 1] },
      duration: 50,
    },
    {
      id: "dashed-circle",
      className:
        "bottom-[12%] left-[8%] w-[20rem] h-[20rem] lg:w-[32rem] lg:h-[32rem] rounded-full border border-dashed border-[#480713]/15 pointer-events-none",
      animate: { rotate: [360, 0], scale: [1, 0.97, 1] },
      duration: 40,
    },
    {
      id: "medium-ring",
      className:
        "top-[30%] left-[45%] w-[16rem] h-[16rem] rounded-full border border-white/80 shadow-[inset_0_0_20px_rgba(255,255,255,0.6)] pointer-events-none hidden md:block",
      animate: { y: [0, -15, 0], x: [0, 10, 0] },
      duration: 14,
    },
    {
      id: "small-circle",
      className:
        "top-[65%] right-[22%] w-24 h-24 rounded-full border-2 border-[#6C0B1C]/20 pointer-events-none hidden sm:block",
      animate: { y: [0, 18, 0], rotate: [0, 180, 360] },
      duration: 16,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={shape.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, ...shape.animate }}
          transition={{
            opacity: { duration: 0.8, delay: 0.2 + index * 0.15 },
            scale: { duration: 0.8, delay: 0.2 + index * 0.15 },
            rotate: {
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear",
            },
            y: {
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className={`absolute ${shape.className}`}
        />
      ))}
    </div>
  );
}

function GlassComposition() {
  const cards = [
    {
      id: "glass-card-1",
      containerClass:
        "hidden lg:flex flex-col justify-between absolute top-[18%] right-[8%] w-72 h-48 rounded-[2rem] border border-white/70 bg-white/40 p-6 shadow-[0_20px_60px_rgba(108,11,28,0.08)] backdrop-blur-md -rotate-6 z-10 pointer-events-none",
      animate: { y: [0, -12, 0], rotate: [-6, -3, -6] },
      duration: 12,
      delay: 0.4,
      content: (
        <>
          <div className="flex items-center justify-between border-b border-[#6C0B1C]/10 pb-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#6C0B1C]/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#6C0B1C]/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#6C0B1C]/10" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5E5E5E]">
              Creative.01
            </span>
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-2 w-3/4 rounded-full bg-[#480713]/15" />
            <div className="h-2 w-1/2 rounded-full bg-[#6C0B1C]/10" />
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-16 rounded-lg bg-white/60 border border-white/80" />
              <div className="h-6 w-12 rounded-lg bg-[#6C0B1C]/10" />
            </div>
          </div>
        </>
      ),
    },
    {
      id: "glass-card-2",
      containerClass:
        "absolute bottom-[14%] right-[5%] sm:right-[12%] lg:right-[22%] w-60 h-36 sm:w-64 sm:h-40 rounded-3xl border border-white/80 bg-white/50 p-5 shadow-[0_25px_70px_rgba(72,7,19,0.07)] backdrop-blur-lg rotate-12 z-20 pointer-events-none",
      animate: { y: [0, 14, 0], rotate: [12, 9, 12] },
      duration: 14,
      delay: 0.5,
      content: (
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="h-6 w-6 rounded-full border border-[#6C0B1C]/20 flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-[#6C0B1C]" />
            </span>
            <div className="flex items-center gap-1">
              <span className="h-1 w-8 rounded-full bg-[#6C0B1C]/30" />
              <span className="h-1 w-3 rounded-full bg-[#6C0B1C]/15" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 py-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${i % 2 === 0 ? "bg-[#480713]/20" : "bg-[#6C0B1C]/10"}`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-[#5E5E5E]">
            <span>INDEX_SYS</span>
            <span className="text-[#6C0B1C] font-bold">99.4%</span>
          </div>
        </div>
      ),
    },
    {
      id: "glass-card-3",
      containerClass:
        "hidden md:flex absolute top-[28%] left-[4%] w-36 h-36 rounded-2xl border border-white/60 bg-gradient-to-br from-white/70 via-white/30 to-transparent p-4 shadow-[0_15px_40px_rgba(108,11,28,0.05)] backdrop-blur-md -rotate-12 z-10 flex-col justify-between pointer-events-none",
      animate: {
        y: [0, -16, 0],
        rotate: [-12, -8, -12],
        scale: [1, 1.04, 1],
      },
      duration: 16,
      delay: 0.6,
      content: (
        <>
          <div className="flex justify-end">
            <span className="h-3 w-3 rounded-full border border-[#480713]/30" />
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-[#6C0B1C]/20" />
            <div className="h-1.5 w-4/5 rounded-full bg-[#6C0B1C]/15" />
            <div className="h-1.5 w-2/3 rounded-full bg-[#6C0B1C]/10" />
          </div>
          <span className="text-[9px] font-mono text-[#5E5E5E] tracking-widest uppercase">
            FLRN_STUDIO
          </span>
        </>
      ),
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: card.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={card.containerClass}
        >
          <motion.div
            animate={card.animate}
            transition={{
              duration: card.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-full flex flex-col justify-between"
          >
            {card.content}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function ForegroundDecorations() {
  const elements = [
    {
      id: "dot-1",
      className:
        "top-[22%] left-[28%] w-3 h-3 rounded-full bg-[#6C0B1C] shadow-[0_0_12px_rgba(108,11,28,0.4)] hidden md:block pointer-events-none",
      animate: { y: [0, -12, 0], scale: [1, 1.3, 1] },
      duration: 6,
    },
    {
      id: "line-slash",
      className:
        "bottom-[32%] left-[22%] w-16 h-0.5 bg-gradient-to-r from-transparent via-[#480713]/40 to-transparent -rotate-45 hidden sm:block pointer-events-none",
      animate: { opacity: [0.3, 0.8, 0.3], x: [0, 10, 0] },
      duration: 8,
    },
    {
      id: "square-small",
      className:
        "top-[38%] right-[32%] w-6 h-6 rounded-md border border-[#6C0B1C]/30 bg-white/60 backdrop-blur-sm rotate-45 hidden lg:block pointer-events-none",
      animate: { rotate: [45, 90, 45], y: [0, 15, 0] },
      duration: 10,
    },
    {
      id: "ring-tiny",
      className:
        "bottom-[22%] right-[38%] w-8 h-8 rounded-full border border-[#480713]/25 hidden md:block pointer-events-none",
      animate: { scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] },
      duration: 7,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el, i) => (
        <motion.div
          key={el.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, ...el.animate }}
          transition={{
            opacity: { duration: 0.6, delay: 0.6 + i * 0.1 },
            y: { duration: el.duration, repeat: Infinity, ease: "easeInOut" },
            x: { duration: el.duration, repeat: Infinity, ease: "easeInOut" },
            scale: {
              duration: el.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: el.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className={`absolute ${el.className}`}
        />
      ))}
    </div>
  );
}

function HeroContent({ t }: { t: Copy }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-30 max-w-2xl lg:max-w-3xl mr-auto py-12"
    >
      <motion.div variants={itemVariants} className="flex w-fit">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#6C0B1C] shadow-[0_4px_20px_rgba(108,11,28,0.06)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6C0B1C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6C0B1C]"></span>
          </span>
          {t.hero.eyebrow}
        </div>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#1B1B1B] leading-[1.12]"
      >
        {t.hero.title}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-[#5E5E5E] max-w-xl font-normal"
      >
        {t.hero.text}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
      >
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <Link
            href="/contact"
            className="shine flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#6C0B1C] px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(108,11,28,0.22)] transition duration-300 hover:bg-[#5A0917] hover:shadow-[0_20px_45px_rgba(108,11,28,0.28)]"
          >
            <span>{t.hero.cta}</span>
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <Link
            href="/#services"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/80 bg-white/60 px-8 py-4 text-sm font-semibold text-[#480713] shadow-[0_8px_25px_rgba(72,7,19,0.05)] backdrop-blur-md transition duration-300 hover:border-[#6C0B1C]/30 hover:bg-white"
          >
            <span>{t.hero.secondary}</span>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-8 border-t border-[#6C0B1C]/10 max-w-xl"
      >
        {[t.hero.metricOne, t.hero.metricTwo, t.hero.metricThree].map(
          (metric, idx) => (
            <div
              key={metric}
              className="group rounded-2xl border border-white/70 bg-white/40 px-4 py-3.5 shadow-[0_4px_15px_rgba(72,7,19,0.03)] backdrop-blur-md transition duration-300 hover:border-[#6C0B1C]/20 hover:bg-white/70"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#6C0B1C]">
                  0{idx + 1} //
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#6C0B1C]/30 group-hover:bg-[#6C0B1C] transition duration-300" />
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-medium text-[#480713] tracking-tight">
                {metric}
              </p>
            </div>
          )
        )}
      </motion.div>
    </motion.div>
  );
}

export function Hero({ t }: { t: Copy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const x = clientX / innerWidth - 0.5;
    const y = clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#FAF8F6] px-6 pt-28 pb-20 md:pt-36 md:pb-28"
    >
      {/* Layer 1: Background Blobs (2-5px mouse movement) */}
      <InteractiveLayer
        smoothX={smoothX}
        smoothY={smoothY}
        range={4}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <BackgroundBlobs />
      </InteractiveLayer>

      {/* Layer 2: Outlined Circles (8-12px mouse movement) */}
      <InteractiveLayer
        smoothX={smoothX}
        smoothY={smoothY}
        range={10}
        className="absolute inset-0 pointer-events-none z-10"
      >
        <FloatingShapes />
      </InteractiveLayer>

      {/* Layer 3: Glass Cards Composition (5-10px mouse movement) */}
      <InteractiveLayer
        smoothX={smoothX}
        smoothY={smoothY}
        range={8}
        className="absolute inset-0 pointer-events-none z-20"
      >
        <GlassComposition />
      </InteractiveLayer>

      {/* Layer 4: Foreground Decorations (12-18px mouse movement) */}
      <InteractiveLayer
        smoothX={smoothX}
        smoothY={smoothY}
        range={16}
        className="absolute inset-0 pointer-events-none z-30"
      >
        <ForegroundDecorations />
      </InteractiveLayer>

      {/* Main Content (Balanced off-center composition) */}
      <div className="relative z-40 mx-auto max-w-7xl w-full">
        <HeroContent t={t} />
      </div>
    </section>
  );
}
