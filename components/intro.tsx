"use client";

import { motion } from "framer-motion";

export default function Intro({ t }: { t?: any }) {
  // Scroll animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 20 } },
  };

  const services = [
    {
      title: "Content Strategy",
      desc: "Planning content that supports business goals and keeps communication consistent.",
      accent: (
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="h-2.5 w-2.5 rounded-full bg-[#6C0B1C]/60"
        />
      ),
    },
    {
      title: "Short-form Video",
      desc: "Reels and TikToks designed to capture attention and increase engagement.",
      accent: (
        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-[#6C0B1C]/60"
        />
      ),
    },
    {
      title: "Brand Identity",
      desc: "Building a visual style and online presence that people instantly recognize.",
      accent: (
        <div className="relative flex h-4 w-4 items-center justify-center">
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-0 h-2 w-2 rounded-full bg-[#6C0B1C]/40"
          />
          <motion.div
            animate={{ y: [2, -2, 2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#6C0B1C]/60"
          />
        </div>
      ),
    },
    {
      title: "Growth & Analytics",
      desc: "Monitoring performance and continuously improving results through data.",
      accent: (
        <div className="flex h-3 w-3 items-end gap-[2px]">
          <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 rounded-t-sm bg-[#6C0B1C]/40" />
          <motion.div animate={{ height: ["80%", "30%", "80%"] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-1 rounded-t-sm bg-[#6C0B1C]/60" />
          <motion.div animate={{ height: ["100%", "60%", "100%"] }} transition={{ duration: 3, repeat: Infinity }} className="w-1 rounded-t-sm bg-[#6C0B1C]/80" />
        </div>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FAF8F6] px-6 py-20 md:py-32">
      {/* Subtle Background Blobs for the section */}
      <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] pointer-events-none rounded-full bg-[#6C0B1C]/5 blur-[100px]" />
      <div className="absolute -right-[10%] bottom-[10%] h-[300px] w-[300px] pointer-events-none rounded-full bg-[#480713]/5 blur-[80px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        
        {/* Left Side: Abstract Digital Composition (Hidden on smaller screens for cleaner UX) */}
        <div className="relative hidden h-[550px] w-full pointer-events-none lg:block">
          {/* Main floating glass card */}
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [0, 2, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[10%] top-[15%] z-20 h-[320px] w-[240px] rounded-[2rem] border border-white/60 bg-white/30 shadow-[0_20px_60px_rgba(108,11,28,0.05)] backdrop-blur-xl"
          >
            <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-[#6C0B1C]/10 to-transparent" />
            <div className="absolute bottom-6 left-6 h-12 w-12 rounded-full border border-[#6C0B1C]/10 bg-white/40" />
          </motion.div>

          {/* Secondary background card */}
          <motion.div
            animate={{ y: [15, -15, 15], rotate: [0, -3, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[15%] right-[15%] z-10 h-[280px] w-[280px] rounded-[2rem] border border-[#6C0B1C]/10 bg-white/50 shadow-lg backdrop-blur-md"
          />

          {/* Rotating dashed ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute right-[5%] top-[10%] z-0 h-[400px] w-[400px] rounded-full border-[1.5px] border-dashed border-[#6C0B1C]/15"
          />

          {/* Small floating geometric accents */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[40%] top-[5%] z-30 h-6 w-6 rounded-full border border-[#6C0B1C]/20 bg-white/80 backdrop-blur-sm"
          />
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[25%] left-[5%] z-30 h-10 w-10 rounded-xl border border-white/80 bg-white/40 backdrop-blur-md"
          />
        </div>

        {/* Right Side: Content */}
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-20"
        >
          <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#6C0B1C]/15 bg-white/60 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#6C0B1C] shadow-sm backdrop-blur-md">
            {/* Animated Sparkle Icon instead of a boring dot */}
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 fill-[#6C0B1C]"
            >
              <path d="M12 0C12 0 12 9 22 12C12 15 12 24 12 24C12 24 12 15 2 12C12 9 12 0 12 0Z" />
            </motion.svg>
            What We Do
          </motion.div>

          <motion.h2 
            variants={fadeUp} 
            className="max-w-xl font-serif text-4xl font-medium leading-[1.15] tracking-[-0.02em] text-[#1B1B1B] sm:text-5xl md:text-[3.5rem] md:leading-[1.1]"
          >
            We create content people actually remember.
          </motion.h2>

          <motion.p 
            variants={fadeUp} 
            // Збільшено розмір тексту (text-lg md:text-xl) та інтервал (leading-relaxed md:leading-loose)
            className="mt-6 max-w-xl text-lg leading-relaxed text-[#5E5E5E] md:text-xl md:leading-loose"
          >
            Floren is a modern social media agency helping brands grow online. We specialize in content creation, short-form videos, social media strategy, branding, and audience growth. By blending creative storytelling with data-driven insights, we build digital identities that stand out and drive real business results.
          </motion.p>

          {/* Service Cards Grid */}
          <motion.div variants={fadeUp} className="mt-12 grid gap-4 sm:grid-cols-2">
            {services.map((card) => (
              <div 
                key={card.title} 
                className="group relative flex flex-col justify-center overflow-hidden rounded-[1.5rem] border border-[#6C0B1C]/10 bg-white/40 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_20px_40px_rgba(108,11,28,0.06)]"
              >
                <div className="mb-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#6C0B1C]/5 bg-white shadow-sm transition-colors group-hover:border-[#6C0B1C]/20">
                  {card.accent}
                </div>
                <h3 className="mb-2 font-serif text-xl font-medium text-[#1B1B1B]">{card.title}</h3>
                <p className="text-sm leading-relaxed text-[#5E5E5E]">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
