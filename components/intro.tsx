"use client";

import { motion } from "framer-motion";

export default function Intro({ t }: { t?: any }) {
  const rawT = JSON.stringify(t || {});
  const isDe = rawT.includes("Auftritt") || rawT.includes("Startseite") || rawT.includes("Kontakt");

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
      title: isDe ? "Content-Strategie" : "Content Strategy",
      desc: isDe 
        ? "Planung von Inhalten, die Geschäftsziele unterstützen und die Kommunikation konsistent halten." 
        : "Planning content that supports business goals and keeps communication consistent.",
      accent: (
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="h-2.5 w-2.5 rounded-full bg-[#6C0B1C]/60"
        />
      ),
    },
    {
      title: isDe ? "Kurzvideos" : "Short-form Video",
      desc: isDe
        ? "Reels und TikToks, die Aufmerksamkeit erregen und das Engagement steigern."
        : "Reels and TikToks designed to capture attention and increase engagement.",
      accent: (
        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="ml-0.5 h-0 w-0 border-y-[4px] border-l-[7px] border-y-transparent border-l-[#6C0B1C]/60"
        />
      ),
    },
    {
      title: isDe ? "Markenidentität" : "Brand Identity",
      desc: isDe
        ? "Aufbau eines visuellen Stils und einer Online-Präsenz, die man sofort wiedererkennt."
        : "Building a visual style and online presence that people instantly recognize.",
      accent: (
        <div className="relative flex h-3.5 w-3.5 items-center justify-center">
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-[#6C0B1C]/40"
          />
          <motion.div
            animate={{ y: [2, -2, 2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-[#6C0B1C]/60"
          />
        </div>
      ),
    },
    {
      title: isDe ? "Wachstum & Analytik" : "Growth & Analytics",
      desc: isDe
        ? "Überwachung der Performance und kontinuierliche Verbesserung der Ergebnisse durch Daten."
        : "Monitoring performance and continuously improving results through data.",
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
    // Зменшили py-20 md:py-32 на py-16 md:py-24 (блок займає менше місця по висоті)
    <section className="relative overflow-hidden bg-[#FAF8F6] px-6 py-16 md:py-24">
      
      <div className="absolute -left-[10%] top-[20%] h-[300px] w-[300px] pointer-events-none rounded-full bg-[#6C0B1C]/5 blur-[80px]" />
      <div className="absolute -right-[10%] bottom-[10%] h-[250px] w-[250px] pointer-events-none rounded-full bg-[#480713]/5 blur-[70px]" />

      {/* Зменшили max-w-7xl на max-w-6xl (блок став вужчим) та зменшили gap */}
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        
        {/* НОВА ФІГУРА: "Цифрова орбіта / Мережа" */}
        <div className="relative hidden h-[400px] w-full items-center justify-center pointer-events-none lg:flex">
          
          {/* Пульсуюче фонове світло */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-56 w-56 rounded-full bg-[#6C0B1C]/10 blur-3xl"
          />

          {/* Зовнішня орбіта */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute h-[280px] w-[280px] rounded-full border border-[#6C0B1C]/15"
          >
            {/* Точка на орбіті */}
            <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#6C0B1C]/40" />
          </motion.div>

          {/* Внутрішня орбіта (крутиться в інший бік) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute h-[200px] w-[200px] rounded-full border border-white/80"
          >
            <div className="absolute top-1/2 -right-2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-sm" />
          </motion.div>

          {/* Центральне скляне ядро */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute flex h-28 w-28 items-center justify-center rounded-full border border-[#6C0B1C]/10 bg-white/40 shadow-[0_10px_30px_rgba(108,11,28,0.05)] backdrop-blur-md"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#480713] to-[#6C0B1C] opacity-80" />
          </motion.div>

        </div>

        {/* Права сторона: Контент */}
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-20"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#6C0B1C]/15 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6C0B1C] shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6C0B1C] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6C0B1C]"></span>
            </span>
            {t?.intro?.eyebrow || (isDe ? "Was wir tun" : "What We Do")}
          </motion.div>

          <motion.h2 
            variants={fadeUp} 
            className="max-w-xl font-serif text-3xl font-medium leading-[1.2] tracking-[-0.02em] text-[#1B1B1B] sm:text-4xl md:text-5xl"
          >
            {t?.intro?.title || (isDe ? "Ein digitaler Auftritt, der nicht lauter wirkt — sondern wertvoller." : "We create content people actually remember.")}
          </motion.h2>

          <motion.p 
            variants={fadeUp} 
            className="mt-5 max-w-xl text-lg leading-relaxed text-[#5E5E5E] md:text-xl md:leading-loose"
          >
            {t?.intro?.text || (isDe ? "Floren ist eine moderne Social-Media-Agentur, die Marken beim Online-Wachstum unterstützt. Wir spezialisieren uns auf Content-Erstellung, Kurzvideos, Strategie und Markenaufbau." : "Floren is a modern social media agency helping brands grow online. We specialize in content creation, short-form videos, social media strategy, branding, and audience growth.")}
          </motion.p>

          {/* Менше простору (mt-8 замість mt-12), зменшено відступи всередині карток (p-5 замість p-6) */}
          <motion.div variants={fadeUp} className="mt-8 grid gap-3 sm:grid-cols-2">
            {services.map((card) => (
              <div 
                key={card.title} 
                className="group relative flex flex-col justify-center overflow-hidden rounded-[1.25rem] border border-[#6C0B1C]/10 bg-white/40 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_15px_35px_rgba(108,11,28,0.05)]"
              >
                {/* Менше простору між іконкою та текстом (mb-3 замість mb-5), зменшена іконка (h-8 w-8) */}
                <div className="mb-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#6C0B1C]/5 bg-white shadow-sm transition-colors group-hover:border-[#6C0B1C]/20">
                  {card.accent}
                </div>
                <h3 className="mb-1.5 font-serif text-lg font-medium text-[#1B1B1B]">{card.title}</h3>
                <p className="text-sm leading-relaxed text-[#5E5E5E]">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
