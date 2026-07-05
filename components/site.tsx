"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { dictionary, packages, type Lang, type Package } from "@/lib/content";
import { Icon } from "./icons";

type Copy = (typeof dictionary)[Lang];
type Status = "idle" | "sending" | "success" | "error";

function PrimaryButton({ href, children, variant = "dark" }: { href: string; children: React.ReactNode; variant?: "dark" | "light" }) {
  const classes =
    variant === "dark"
      ? "bg-[#6C0B1C] text-white shadow-[0_18px_45px_rgba(108,11,28,.24)] hover:bg-[#5A0917] hover:shadow-[0_24px_60px_rgba(108,11,28,.3)]"
      : "border border-[#E8E2DC] bg-white/82 text-[#480713] hover:border-[#C9A45A] hover:bg-white";

  return (
    <Link
      href={href}
      className={`shine inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${classes}`}
    >
      {children}
      <Icon name="arrow" className="h-4 w-4" />
    </Link>
  );
}

function LanguageSwitch({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <div className="flex w-fit rounded-full border border-[#E8E2DC] bg-white p-1 text-xs font-bold shadow-sm">
      {(["de", "en"] as const).map((item) => (
        <button
          key={item}
          onClick={() => setLang(item)}
          className={`rounded-full px-3 py-1.5 transition ${
            lang === item ? "bg-[#480713] text-white" : "text-[#5E5E5E] hover:text-[#480713]"
          }`}
          type="button"
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Site({ initialLang = "de" as Lang, contactOnly = false, selectedPackage = "" }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollLock = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = dictionary[lang];

  useEffect(() => {
    const ids = ["home", "services", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLock.current) return;

        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.34)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActive(visibleEntry.target.id);
      },
      { rootMargin: "-24% 0px -46%", threshold: [0.34, 0.5, 0.68] },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      if (scrollLock.current) clearTimeout(scrollLock.current);
    };
  }, []);

  const nav = [
    ["home", t.nav.home],
    ["services", t.nav.services],
    ["contact", t.nav.contact],
  ] as const;

  const navHref = (id: string) => `/#${id}`;

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const section = document.getElementById(id);

    if (!section) return;

    event.preventDefault();
    setActive(id);
    setMenuOpen(false);

    if (scrollLock.current) clearTimeout(scrollLock.current);
    scrollLock.current = setTimeout(() => {
      scrollLock.current = null;
    }, 950);

    requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#FAF8F6] text-[#1B1B1B]">
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
        <nav className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 md:px-5" aria-label="Main">
          <Link href="/#home" className="relative h-10 w-36" onClick={(event) => handleNavClick(event, "home")}>
            <Image src="/logos/floren_full_color_withoutbg.png" alt="Floren" fill className="object-contain" priority sizes="144px" />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {nav.map(([id, label]) => (
              <Link
                key={id}
                href={navHref(id)}
                onClick={(event) => handleNavClick(event, id)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active === id ? "bg-[#6C0B1C] text-white" : "text-[#5E5E5E] hover:bg-white hover:text-[#1B1B1B]"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <LanguageSwitch lang={lang} setLang={setLang} />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E2DC] bg-white text-[#480713] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? "x" : "menu"} className="h-5 w-5" />
          </button>
        </nav>

        <div
          className={`mx-auto mt-3 max-w-7xl overflow-hidden rounded-[1.75rem] border border-[#E8E2DC] bg-white/94 shadow-[0_24px_60px_rgba(72,7,19,.12)] backdrop-blur-xl transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-96 translate-y-0 opacity-100" : "max-h-0 -translate-y-3 opacity-0"
          }`}
        >
          <div className="grid gap-3 p-5">
            {nav.map(([id, label]) => (
              <Link
                key={id}
                href={navHref(id)}
                onClick={(event) => handleNavClick(event, id)}
                className={`rounded-2xl px-5 py-4 text-center text-sm font-medium transition ${
                  active === id ? "bg-[#6C0B1C] text-white" : "text-[#480713] hover:bg-[#FAF8F6]"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="flex justify-center px-2 pt-3">
              <LanguageSwitch lang={lang} setLang={setLang} />
            </div>
          </div>
        </div>
      </header>

      <main>{contactOnly ? <Contact lang={lang} selectedPackage={selectedPackage} standalone /> : <><Hero t={t} /><Intro t={t} /><Services t={t} /><Contact lang={lang} /></>}</main>
      <Footer t={t} />
    </div>
  );
}
// ... (Функції Hero, Intro, Services, FeaturedPackage, PricingCard, Contact, Field, Footer залишаються без змін)