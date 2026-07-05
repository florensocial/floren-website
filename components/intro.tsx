"use client";

import { motion } from "framer-motion";

export default function Intro({ t }: { t?: any }) {
  // Більш надійний спосіб визначення мови (перевіряємо чи є німецькі слова у пропсах)
  const rawT = JSON.stringify(t || {});
  const isDe = rawT.includes("Auftritt") || rawT.includes("Startseite") || rawT.includes("Kontakt");

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

  // Локалізовані картки 1 в 1 як ви просили
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
          className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-[#6C0B1C]/60"
        />
      ),
    },
    {
      title: isDe ? "Markenidentität" : "Brand Identity",
      desc: isDe
        ? "Aufbau eines visuellen Stils und einer Online-Präsenz, die man sofort wiedererkennt."
        : "Building a visual style and online presence that people instantly recognize.",
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
    <section className="relative overflow-hidden bg-[#FAF8F6] px-6 py-20 md:py-32">
      {/* М'які фонові плями для всієї секції */}
      <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] pointer-events-none rounded-full bg-[#6C0B1C]/5 blur-[100px]" />
      <div className="absolute -right-[10%] bottom-[10%] h-[300px] w-[300px] pointer-events-none rounded-full bg-[#480713]/5 blur-[80px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        
        {/* НОВА АНІМАЦІЯ ЗЛІВА: Елегантна бордова сфера зі скляним кільцем */}
        <div className="relative hidden h-[500px] w-full items-center justify-center pointer-events-none lg:flex">
          {/* Бордова сфера, що світиться і плаває */}
          <motion.div
            animate={{ y: [-15, 15, -15], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-56 w-56 rounded-full bg-gradient-to-tr from-[#480713] to-[#6C0B1C] shadow-[0_0_80px_rgba(108,11,28,0.5)] blur-[2px]"
          />
          
          {/* Скляне кільце, що обертається */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute h-80 w-80 rounded-full border border-white/60 bg-white/10 shadow-2xl backdrop-blur-md"
          />

          {/* Маленькі плаваючі скляні деталі */}
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-10 top-10 h-12 w-12 rounded-full border border-[#6C0B1C]/20 bg-white/60 backdrop-blur-md shadow-sm"
          />
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-10 h-16 w-16 rounded-2xl border border-white/80 bg-white/40 backdrop-blur-lg shadow-sm"
          />
        </div>

        {/* Права сторона: Контент */}
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-20"
        >
          {/* Eyebrow / Label */}
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#6C0B1C]/15 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6C0B1C] shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6C0B1C] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6C0B1C]"></span>
            </span>
            {t?.intro?.eyebrow || (isDe ? "Was wir tun" : "What We Do")}
          </motion.div>

          {/* Головний заголовок - РОЗМІР ЗМЕНШЕНО (text-3xl -> text-5xl) */}
          <motion.h2 
            variants={fadeUp} 
            className="max-w-xl font-serif text-3xl font-medium leading-[1.2] tracking-[-0.02em] text-[#1B1B1B] sm:text-4xl md:text-5xl"
          >
            {t?.intro?.title || (isDe ? "Ein digitaler Auftritt, der nicht lauter wirkt — sondern wertvoller." : "We create content people actually remember.")}
          </motion.h2>

          <motion.p 
            variants={fadeUp} 
            className="mt-6 max-w-xl text-lg leading-relaxed text-[#5E5E5E] md:text-xl md:leading-loose"
          >
            {t?.intro?.text || (isDe ? "Floren ist eine moderne Social-Media-Agentur, die Marken beim Online-Wachstum unterstützt. Wir spezialisieren uns auf Content-Erstellung, Kurzvideos, Strategie und Markenaufbau." : "Floren is a modern social media agency helping brands grow online. We specialize in content creation, short-form videos, social media strategy, branding, and audience growth.")}
          </motion.p>

          {/* Сітка з картками послуг */}
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
