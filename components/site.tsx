"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { dictionary, packages, type Lang } from "@/lib/content";
import { Icon } from "./icons";
import { Hero } from "./hero";
import Intro from "./intro";
import Services from "./services";

type Copy = (typeof dictionary)[Lang];
type Status = "idle" | "sending" | "success" | "error";

function PrimaryButton({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  const classes =
    variant === "dark"
      ? "bg-[#6C0B1C] text-white shadow-[0_18px_45px_rgba(108,11,28,.24)] hover:bg-[#5A0917] hover:shadow-[0_24px_60px_rgba(108,11,28,.3)]"
      : "border border-[#E8E2DC] bg-white/82 text-[#480713] hover:border-[#6C0B1C]/30 hover:bg-white"; 

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

function LanguageSwitch({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
}) {
  return (
    <div className="flex w-fit rounded-full border border-[#E8E2DC] bg-white p-1 text-xs font-bold shadow-sm">
      {(["de", "en"] as const).map((item) => (
        <button
          key={item}
          onClick={() => setLang(item)}
          className={`rounded-full px-3 py-1.5 transition ${
            lang === item
              ? "bg-[#480713] text-white"
              : "text-[#5E5E5E] hover:text-[#480713]"
          }`}
          type="button"
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Site({
  initialLang = "de" as Lang,
  contactOnly = false,
  selectedPackage = "",
}) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollLock = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeScrollTarget = useRef<string | null>(null);

  const t = dictionary[lang];

  useEffect(() => {
    const ids = ["home", "services", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        if (activeScrollTarget.current) return;

        const visibleEntry = entries
          .filter(
            (entry) =>
              entry.isIntersecting && entry.intersectionRatio >= 0.34
          )
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActive(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-24% 0px -46%",
        threshold: [0.34, 0.5, 0.68],
      }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();

      if (scrollLock.current) {
        clearTimeout(scrollLock.current);
      }

      activeScrollTarget.current = null;
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

    activeScrollTarget.current = id;
    if (scrollLock.current) clearTimeout(scrollLock.current);

    const unlockActiveSection = () => {
      activeScrollTarget.current = null;
      if (scrollLock.current) clearTimeout(scrollLock.current);
      scrollLock.current = null;
      window.removeEventListener("scrollend", unlockActiveSection);
    };

    scrollLock.current = setTimeout(unlockActiveSection, 1400);
    window.addEventListener("scrollend", unlockActiveSection, { once: true });

    requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#FAF8F6] text-[#1B1B1B]">
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
        <nav
          className="glass-panel mx-auto flex items-center justify-between rounded-full px-5 py-3 md:grid md:max-w-7xl md:grid-cols-[220px_1fr_220px] md:items-center"
          aria-label="Main"
        >
          <Link
            href="/#home"
            className="relative h-6 w-24 justify-self-start"
            onClick={(event) => handleNavClick(event, "home")}
            aria-current={active === "home" ? "page" : undefined}
          >
            <Image
              src="/logos/floren_text_only_withoutbg.png"
              alt="Floren"
              fill
              className="object-contain"
              priority
              sizes="176px"
            />
          </Link>
        
          <div className="hidden items-center justify-center gap-2 md:flex">
            {nav.map(([id, label]) => (
              <Link
                key={id}
                href={navHref(id)}
                onClick={(event) => handleNavClick(event, id)}
                aria-current={active === id ? "page" : undefined}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  active === id
                    ? "bg-[#6C0B1C] text-white"
                    : "text-[#5E5E5E] hover:bg-white hover:text-[#1B1B1B]"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        
          <div className="hidden justify-self-end md:flex">
            <LanguageSwitch lang={lang} setLang={setLang} />
          </div>
        
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="justify-self-end inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E2DC] bg-white text-[#480713] md:hidden"
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
          <div className="grid gap-4 p-5">
            {nav.map(([id, label]) => (
              <Link
                key={id}
                href={navHref(id)}
                onClick={(event) => handleNavClick(event, id)}
                aria-current={active === id ? "page" : undefined}
                className={`rounded-2xl px-5 py-4 text-center text-sm font-medium transition ${
                  active === id ? "bg-[#6C0B1C] text-white" : "text-[#480713] hover:bg-[#FAF8F6]"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="flex justify-center px-2 pt-4">
              <LanguageSwitch lang={lang} setLang={setLang} />
            </div>
          </div>
        </div>
      </header>

      <main>
        {contactOnly ? (
          <Contact lang={lang} selectedPackage={selectedPackage} standalone />
        ) : (
          <>
            <Hero t={t} />
            <Intro t={t} />
            <Services t={t} />
            <Contact lang={lang} />
          </>
        )}
      </main>
      <Footer t={t} />
    </div>
  );
}

export function Contact({ lang, selectedPackage = "", standalone = false }: { lang: Lang; selectedPackage?: string; standalone?: boolean }) {
  const t = dictionary[lang].contact;
  const [status, setStatus] = useState<Status>("idle");
  const packageItem = useMemo(() => packages.find((item) => item.id === selectedPackage), [selectedPackage]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <section id="contact" className={`relative px-6 ${standalone ? "min-h-screen pt-36" : "py-32 md:py-40"}`}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(201,164,90,.05),transparent_26%),radial-gradient(circle_at_85%_45%,rgba(108,11,28,.08),transparent_30%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="reveal-up lg:sticky lg:top-32">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6C0B1C]">{t.eyebrow}</p>
          <h2 className="mt-5 font-serif text-5xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-7xl">{t.title}</h2>
          <p className="mt-7 max-w-xl text-lg leading-9 text-[#5E5E5E]">{t.text}</p>

          {packageItem ? (
            <div className="mt-10 max-w-md rounded-[2rem] border border-[#6C0B1C]/15 bg-white p-6 shadow-[0_24px_70px_rgba(72,7,19,.08)]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6C0B1C]">{t.package}</p>
              <div className="mt-5 flex items-end justify-between gap-6">
                <div>
                  <p className="font-serif text-4xl text-[#480713]">{packageItem.name}</p>
                  <p className="mt-2 text-sm text-[#5E5E5E]">{packageItem.description}</p>
                </div>
                <p className="shrink-0 font-serif text-4xl text-[#6C0B1C]">{packageItem.price}</p>
              </div>
            </div>
          ) : null}
        </div>

        <form onSubmit={submit} className="reveal-up glass-panel rounded-[2.5rem] p-5 md:p-8 lg:p-10 border-[#6C0B1C]/10">
          <input type="hidden" name="package" value={packageItem?.name ?? ""} />
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t.name} name="name" required />
            <Field label={t.email} name="email" type="email" required />
            <Field label={t.phone} name="phone" required className="md:col-span-2" />
            <label className="md:col-span-2 text-sm font-semibold text-[#480713]">
              {t.message}
              <textarea
                name="message"
                rows={6}
                placeholder={t.messagePlaceholder}
                className="mt-3 w-full resize-none rounded-[1.5rem] border border-[#E8E2DC] bg-white/88 px-5 py-4 text-[#1B1B1B] shadow-inner outline-none transition placeholder:text-[#5E5E5E]/55 focus:border-[#6C0B1C]/30 focus:ring-4 focus:ring-[#6C0B1C]/10"
              />
            </label>
          </div>
          <button
            disabled={status === "sending"}
            className="shine mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6C0B1C] px-7 py-4 font-semibold text-white shadow-[0_20px_55px_rgba(108,11,28,.24)] transition hover:-translate-y-0.5 hover:bg-[#5A0917] disabled:opacity-60 md:w-auto"
            type="submit"
          >
            <Icon name="send" className="h-4 w-4" />
            {status === "sending" ? t.sending : t.send}
          </button>
          {status === "success" ? <p className="mt-5 rounded-2xl bg-[#F5F1EE] px-4 py-3 text-sm text-[#480713]">{t.success}</p> : null}
          {status === "error" ? <p className="mt-5 rounded-2xl border border-[#6C0B1C]/20 bg-white px-4 py-3 text-sm text-[#6C0B1C]">{t.error}</p> : null}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required = false, className = "" }: { label: string; name: string; type?: string; required?: boolean; className?: string }) {
  return (
    <label className={`text-sm font-semibold text-[#480713] ${className}`}>
      {label}
      <input
        required={required}
        type={type}
        name={name}
        className="mt-3 w-full rounded-[1.35rem] border border-[#E8E2DC] bg-white/88 px-5 py-4 text-[#1B1B1B] shadow-inner outline-none transition placeholder:text-[#5E5E5E]/55 focus:border-[#6C0B1C]/30 focus:ring-4 focus:ring-[#6C0B1C]/10"
      />
    </label>
  );
}

function Footer({ t }: { t: Copy }) {
  // Визначаємо мову для слогану
  const isDe = t.contact.eyebrow === "Kontakt";

  return (
    <footer className="border-t border-[#E8E2DC] bg-white px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        
        {/* Верхня частина футера: Логотип, Слоган, Навігація та Соцмережі */}
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          
          {/* Логотип та Слоган */}
          <div className="max-w-sm">
            <Image 
              src="/logos/floren_full_color_withoutbg.png" 
              alt="Floren" 
              width={170} 
              height={80} 
            />
            <p className="mt-6 text-base leading-relaxed text-[#5E5E5E]">
              {isDe 
                ? "Wir kreieren digitale Identitäten, die nicht nur auffallen, sondern im Gedächtnis bleiben." 
                : "We create digital identities that don't just stand out, but leave a lasting impression."}
            </p>
          </div>

          {/* Посилання */}
          <div className="flex flex-wrap gap-12 sm:gap-24">
            
            {/* Меню сайту */}
            <div className="flex flex-col gap-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#1B1B1B]">Menu</p>
              <Link href="/#home" className="text-sm font-medium text-[#5E5E5E] transition-colors hover:text-[#6C0B1C]">{t.nav.home}</Link>
              <Link href="/#services" className="text-sm font-medium text-[#5E5E5E] transition-colors hover:text-[#6C0B1C]">{t.nav.services}</Link>
              <Link href="/#contact" className="text-sm font-medium text-[#5E5E5E] transition-colors hover:text-[#6C0B1C]">{t.nav.contact}</Link>
            </div>
            
            {/* Соціальні мережі */}
            <div className="flex flex-col gap-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#1B1B1B]">Socials</p>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#5E5E5E] transition-colors hover:text-[#6C0B1C]">Instagram</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#5E5E5E] transition-colors hover:text-[#6C0B1C]">TikTok</a>
            </div>

          </div>
        </div>

        {/* Нижня частина: Копірайт та Юридична інформація */}
        <div className="mt-16 flex flex-col gap-6 border-t border-[#E8E2DC] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#5E5E5E]">
            © {new Date().getFullYear()} Floren. {isDe ? "Alle Rechte vorbehalten." : "All rights reserved."}
          </p>
          
          <div className="flex flex-wrap gap-5 text-sm text-[#5E5E5E]">
            <span>{t.footer.legal}</span>
            <Link href="/privacy" className="transition-colors hover:text-[#6C0B1C]">{t.footer.privacy}</Link>
            <Link href="/imprint" className="transition-colors hover:text-[#6C0B1C]">{t.footer.imprint}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
