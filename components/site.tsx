"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { dictionary, packages, type Lang, type Package } from "@/lib/content";
import { Icon } from "./icons";
import { Hero } from "./hero";
import Intro from "./intro"

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

      <main>{contactOnly ? <Contact lang={lang} selectedPackage={selectedPackage} standalone /> : <><Hero t={t} /><Intro t={t} /><Services t={t} /><Contact lang={lang} /></>}</main>
      <Footer t={t} />
    </div>
  );
}

function Intro({ t }: { t: Copy }) {
  return (
    <section className="relative px-6 py-32 md:py-40">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A45A] to-transparent" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="luxury-card reveal-up rounded-[2.5rem] p-6 md:p-8">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#480713] p-8 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,164,90,.35),transparent_26%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,.16),transparent_32%)]" />
            <Image src="/logos/brandmark_withoutbg.png" alt="" width={260} height={260} className="absolute bottom-[-70px] right-[-55px] opacity-10" />
            <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between">
              <Image src="/logos/floren_full_color_withoutbg.png" alt="Floren" width={150} height={80} className="brightness-0 invert" />
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[#C9A45A]">Austrian Social Media Agency</p>
                <p className="mt-5 font-serif text-5xl leading-none">Quiet luxury. Measurable presence.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal-up">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#C9A45A]">{t.intro.eyebrow}</p>
          <h2 className="mt-5 font-serif text-5xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-7xl">{t.intro.title}</h2>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-[#5E5E5E]">{t.intro.text}</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {t.intro.points.map((point) => (
              <div key={point} className="rounded-3xl border border-[#E8E2DC] bg-white px-5 py-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(72,7,19,.08)]">
                <Icon name="sparkle" className="mb-4 h-5 w-5 text-[#C9A45A]" />
                <p className="font-serif text-2xl text-[#480713]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ t }: { t: Copy }) {
  const featured = packages.find((item) => item.featured);
  const standard = packages.filter((item) => !item.featured);

  return (
    <section id="services" className="relative overflow-hidden bg-[#F5F1EE] px-6 py-32 md:py-40">
      <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-[#6C0B1C]/10 blur-3xl" />
      <div className="absolute -right-32 bottom-32 h-80 w-80 rounded-full border border-[#C9A45A]/30" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6C0B1C]">{t.services.eyebrow}</p>
          <h2 className="mt-5 font-serif text-5xl font-semibold tracking-[-0.035em] md:text-7xl">
            {t.services.titleStart} <span className="text-[#C9A45A]">{t.services.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#5E5E5E] md:text-lg">{t.services.text}</p>
        </div>

        {featured ? <FeaturedPackage item={featured} /> : null}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {standard.map((item) => (
            <PricingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedPackage({ item }: { item: Package }) {
  return (
    <article className="reveal-up luxury-card mx-auto mt-16 max-w-3xl rounded-[2.5rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_110px_rgba(72,7,19,.16)] md:p-8">
      <div className="rounded-[2rem] bg-[linear-gradient(135deg,#480713,#6C0B1C)] p-7 text-white md:p-10">
        {item.badge ? <p className="w-fit rounded-full border border-[#C9A45A]/40 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#C9A45A]">{item.badge}</p> : null}
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h3 className="font-serif text-5xl font-semibold tracking-[-0.025em]">{item.name}</h3>
            <p className="mt-4 max-w-xl leading-8 text-white/78">{item.description}</p>
          </div>
          <p className="font-serif text-7xl font-semibold leading-none text-[#C9A45A]">{item.price}</p>
        </div>
        <ul className="mt-9 grid gap-3 md:grid-cols-2">
          {item.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-3 text-sm text-white/88">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C9A45A] text-[#480713]">
                <Icon name="check" className="h-3.5 w-3.5" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-9">
          <PrimaryButton href={`/contact?package=${encodeURIComponent(item.id)}`} variant="light">{item.cta}</PrimaryButton>
        </div>
      </div>
    </article>
  );
}

function PricingCard({ item }: { item: Package }) {
  return (
    <article
      className={`reveal-up group relative flex min-h-[620px] flex-col rounded-[2.25rem] border bg-white p-7 transition duration-300 hover:-translate-y-2 md:p-8 ${
        item.popular
          ? "border-[#6C0B1C] shadow-[0_30px_90px_rgba(108,11,28,.18)]"
          : "border-[#E8E2DC] shadow-[0_24px_70px_rgba(72,7,19,.08)] hover:shadow-[0_32px_85px_rgba(72,7,19,.13)]"
      }`}
    >
      {item.popular ? <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#6C0B1C] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg">{item.badge}</div> : null}
      <div className="absolute right-6 top-6 h-20 w-20 rounded-full bg-[#FAF8F6] transition group-hover:scale-110" />
      <div className="relative">
        <h3 className="font-serif text-5xl font-semibold tracking-[-0.03em] text-[#480713]">{item.name}</h3>
        <p className="mt-5 font-serif text-5xl font-semibold text-[#1B1B1B]">{item.price}</p>
        <p className="mt-5 min-h-16 leading-7 text-[#5E5E5E]">{item.description}</p>
      </div>
      <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#E8E2DC] to-transparent" />
      <ul className="relative space-y-4">
        {item.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-6 text-[#5E5E5E]">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FAF8F6] text-[#6C0B1C]">
              <Icon name="check" className="h-3.5 w-3.5" />
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-9">
        <PrimaryButton href={`/contact?package=${encodeURIComponent(item.id)}`}>{item.cta}</PrimaryButton>
      </div>
    </article>
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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(201,164,90,.16),transparent_26%),radial-gradient(circle_at_85%_45%,rgba(108,11,28,.12),transparent_30%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="reveal-up lg:sticky lg:top-32">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#C9A45A]">{t.eyebrow}</p>
          <h2 className="mt-5 font-serif text-5xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-7xl">{t.title}</h2>
          <p className="mt-7 max-w-xl text-lg leading-9 text-[#5E5E5E]">{t.text}</p>

          {packageItem ? (
            <div className="mt-10 max-w-md rounded-[2rem] border border-[#E8E2DC] bg-white p-6 shadow-[0_24px_70px_rgba(72,7,19,.1)]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C9A45A]">{t.package}</p>
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

        <form onSubmit={submit} className="reveal-up glass-panel rounded-[2.5rem] p-5 md:p-8 lg:p-10">
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
                className="mt-3 w-full resize-none rounded-[1.5rem] border border-[#E8E2DC] bg-white/88 px-5 py-4 text-[#1B1B1B] shadow-inner outline-none transition placeholder:text-[#5E5E5E]/55 focus:border-[#C9A45A] focus:ring-4 focus:ring-[#C9A45A]/15"
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
        className="mt-3 w-full rounded-[1.35rem] border border-[#E8E2DC] bg-white/88 px-5 py-4 text-[#1B1B1B] shadow-inner outline-none transition placeholder:text-[#5E5E5E]/55 focus:border-[#C9A45A] focus:ring-4 focus:ring-[#C9A45A]/15"
      />
    </label>
  );
}

function Footer({ t }: { t: Copy }) {
  return (
    <footer className="border-t border-[#E8E2DC] bg-white px-6 py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Image src="/logos/floren_full_color_withoutbg.png" alt="Floren" width={170} height={80} />
        <div className="flex flex-wrap gap-5 text-sm text-[#5E5E5E]">
          <span>{t.footer.legal}</span>
          <Link href="/privacy" className="hover:text-[#6C0B1C]">{t.footer.privacy}</Link>
          <Link href="/imprint" className="hover:text-[#6C0B1C]">{t.footer.imprint}</Link>
        </div>
      </div>
    </footer>
  );
}
