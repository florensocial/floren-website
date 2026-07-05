"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { packages, type Package } from "@/lib/content";
import { Icon } from "./icons";

// Переклади для тарифів (щоб не чіпати ваш основний файл content.ts)
const enTranslations: Record<string, Partial<Package>> = {
  "2-week-trial": {
    badge: "FREE TRIAL",
    name: "2-Week Trial",
    price: "€0",
    description: "Get to know our way of working without any risk and see our quality for yourself.",
    features: [
      "Profile & Bio Optimization",
      "Content Plan for 2 Weeks",
      "2 Sample Reels & 2 Sample Posts",
      "Visual Moodboard",
      "Performance Review at the End",
    ],
    cta: "Request now",
  },
  "starter": {
    name: "Starter",
    price: "€490 / month",
    description: "The perfect entry level for local businesses and founders.",
    features: [
      "Content Plan & Calendar",
      "4 Reels & 4 Posts per month",
      "Up to 12 Stories",
      "Basic Video Editing & Subtitles",
      "Ongoing Support via Messenger",
    ],
    cta: "Request now",
  },
  "growth": {
    badge: "MOST POPULAR",
    name: "Growth",
    price: "€790 / month",
    description: "For brands that want to seriously scale their online presence.",
    features: [
      "Content Plan (PDF) & Strategy",
      "8 Reels & 6 Posts per month",
      "Up to 20 Stories per month",
      "Hashtag & Keyword Optimization",
      "3 Story Highlights",
      "Ongoing Support & Consulting",
    ],
    cta: "Request now",
  },
  "premium": {
    name: "Premium",
    price: "€1190 / month",
    description: "The all-inclusive package for maximum visibility.",
    features: [
      "Complex Strategy & Competitor Analysis",
      "12 Reels & 8 Posts per month",
      "Up to 30 Stories per month",
      "Comprehensive Monthly Reporting & Analysis",
      "Custom Feed Design & Branding",
      "Up to 5 Story Highlights",
      "Priority Support & Strategy Calls",
    ],
    cta: "Request now",
  },
};

// Локальний компонент кнопки
function ServiceButton({ href, children, variant = "glass" }: { href: string; children: React.ReactNode; variant?: "dark" | "glass" }) {
  const classes =
    variant === "dark"
      ? "bg-[#6C0B1C] text-white shadow-[0_15px_30px_rgba(108,11,28,.2)] hover:bg-[#480713]"
      : "border border-[#6C0B1C]/20 bg-white/50 text-[#480713] hover:bg-white/80 hover:border-[#6C0B1C]/40 backdrop-blur-sm";

  return (
    <Link
      href={href}
      className={`group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${classes}`}
    >
      {children}
      <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export default function Services({ t }: { t: any }) {
  // Визначаємо мову
  const rawT = JSON.stringify(t || {});
  const isDe = rawT.includes("Startseite") || rawT.includes("Kontakt");

  // Застосовуємо переклад до пакетів
  const getLocalizedPackage = (pkg: Package) => {
    if (isDe) return pkg;
    const en = enTranslations[pkg.id];
    return en ? { ...pkg, ...en } : pkg;
  };

  const localizedPackages = packages.map(getLocalizedPackage);
  const featured = localizedPackages.find((item) => item.featured);
  const standard = localizedPackages.filter((item) => !item.featured);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } },
  };

  return (
    <section id="services" className="relative overflow-hidden bg-[#FAF8F6] px-6 py-24 md:py-32">
      {/* М'які фонові елементи */}
      <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#6C0B1C]/5 blur-[120px] pointer-events-none" />
      <div className="absolute -right-32 bottom-32 h-80 w-80 rounded-full border border-[#6C0B1C]/10 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        {/* Заголовок секції */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6C0B1C]/15 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6C0B1C] backdrop-blur-md"
          >
            {t.services.eyebrow}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-serif text-4xl font-medium tracking-[-0.02em] md:text-6xl"
          >
            {t.services.titleStart}{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
              className="bg-gradient-to-r from-[#480713] via-[#b3142e] to-[#480713] bg-clip-text text-transparent"
            >
              {t.services.titleHighlight}
            </motion.span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#5E5E5E] md:text-lg"
          >
            {t.services.text}
          </motion.p>
        </div>

        {/* Безкоштовний тариф (Testpaket) - Залишився без змін */}
        {featured ? (
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group mx-auto mt-16 max-w-4xl overflow-hidden rounded-[2rem] border border-[#6C0B1C]/15 bg-white/50 p-8 shadow-[0_10px_40px_rgba(108,11,28,0.03)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_20px_50px_rgba(108,11,28,0.06)] md:p-10"
          >
            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center lg:gap-16">
              <div>
                {featured.badge && (
                  <span className="mb-4 inline-block rounded-full bg-[#6C0B1C]/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#6C0B1C]">
                    {featured.badge}
                  </span>
                )}
                <h3 className="font-serif text-3xl font-medium text-[#1B1B1B] md:text-4xl">{featured.name}</h3>
                <p className="mt-3 font-serif text-3xl font-medium text-[#6C0B1C] md:text-4xl">{featured.price}</p>
                <p className="mt-4 leading-relaxed text-[#5E5E5E]">{featured.description}</p>
              </div>
              
              <div>
                <ul className="mb-8 space-y-3">
                  {featured.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[#5E5E5E]">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#6C0B1C]/10 text-[#6C0B1C]">
                        <Icon name="check" className="h-2 w-2" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <ServiceButton href={`/contact?package=${encodeURIComponent(featured.id)}`} variant="glass">
                  {featured.cta}
                </ServiceButton>
              </div>
            </div>
          </motion.article>
        ) : null}

        {/* Стандартні тарифи - Однакова висота (items-stretch замість items-center) */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-6 md:grid-cols-3 items-stretch"
        >
          {standard.map((item) => (
            <motion.article
              key={item.id}
              variants={fadeUp}
              // Додано h-full для однакової висоти і прибрано scale-105 для однакової ширини
              className={`relative flex h-full flex-col rounded-[2rem] border p-7 transition-all duration-500 hover:-translate-y-2 md:p-8 ${
                item.popular
                  ? "z-10 border-[#6C0B1C]/20 bg-[#6C0B1C]/5 shadow-[0_20px_60px_rgba(108,11,28,0.1)] backdrop-blur-md" // М'який бордовий фон
                  : "border-[#6C0B1C]/10 bg-white/40 shadow-sm backdrop-blur-md hover:bg-white/60 hover:shadow-[0_15px_40px_rgba(108,11,28,0.05)]"
              }`}
            >
              {item.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#6C0B1C] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white shadow-md">
                  {item.badge}
                </div>
              )}

              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-medium text-[#1B1B1B]">{item.name}</h3>
                
                {item.popular ? (
                  <motion.p 
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% auto" }}
                    className="mt-4 font-serif text-4xl font-medium bg-gradient-to-r from-[#480713] via-[#b3142e] to-[#480713] bg-clip-text text-transparent"
                  >
                    {item.price}
                  </motion.p>
                ) : (
                  <p className="mt-4 font-serif text-4xl font-medium text-[#480713]">{item.price}</p>
                )}
                
                <p className="mt-4 min-h-[4rem] text-sm leading-relaxed text-[#5E5E5E]">{item.description}</p>
              </div>

              <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-[#6C0B1C]/15 to-transparent" />

              <ul className="relative z-10 mb-8 flex-1 space-y-3">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-[#5E5E5E]">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#6C0B1C]/10 text-[#6C0B1C]">
                      <Icon name="check" className="h-2 w-2" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="relative z-10 mt-auto">
                <ServiceButton 
                  href={`/contact?package=${encodeURIComponent(item.id)}`} 
                  variant={item.popular ? "dark" : "glass"}
                >
                  {item.cta}
                </ServiceButton>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
