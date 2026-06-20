"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

import type { LocaleDictionary } from "@/types/dictionaries";

type NavbarProps = {
  locale: string;
  dictionary: Pick<LocaleDictionary, "navVds" | "navBareMetal" | "navNetwork" | "navCaseStudies" | "navAbout" | "navLogin" | "navBillingRedirect">;
};

export default function Navbar({ locale, dictionary }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "en", label: "English", flag: "gb" },
    { code: "de", label: "German", flag: "de" },
    { code: "nl", label: "Dutch", flag: "nl" },
    { code: "fr", label: "French", flag: "fr" },
    { code: "es", label: "Spanish", flag: "es" },
  ];

  const currentLang = languages.find((lang) => lang.code === locale) || languages[0];

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedInsideDesktopDropdown = dropdownRef.current?.contains(event.target as Node);
      const clickedInsideMobileDropdown = mobileDropdownRef.current?.contains(event.target as Node);

      if (!clickedInsideDesktopDropdown && !clickedInsideMobileDropdown) {
        setIsLangOpen(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setIsLangOpen(false);
    setIsOpen(false);

    const segments = pathname.split("/").filter(Boolean);
    const knownLanguages = ["en", "de", "nl", "fr", "es"];

    if (segments.length > 0 && knownLanguages.includes(segments[0])) {
      segments[0] = langCode;
    } else {
      segments.unshift(langCode);
    }

    if (segments.length === 1) {
      segments.push("home");
    }

    const cleanPathname = `/${segments.join("/")}`;
    router.push(cleanPathname);
  };

  const currentPath = pathname || `/${currentLang.code}/home`;

  const navLinks = [
    { label: dictionary?.navVds || "VDS", href: `/${currentLang.code}/vds` },
    { label: dictionary?.navBareMetal || "Bare Metal", href: `/${currentLang.code}/bare-metal` },
    { label: dictionary?.navNetwork || "Our Network", href: `/${currentLang.code}/network` },
    { label: dictionary?.navCaseStudies || "Case Studies", href: `/${currentLang.code}/case-studies` },
    { label: dictionary?.navAbout || "About", href: `/${currentLang.code}/about` },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 w-full bg-zinc-950/70 border border-white/10 backdrop-blur-3xl px-4 py-3 md:px-8 z-50 shadow-[0_25px_80px_-35px_rgba(15,23,42,0.75)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <a href={`/${currentLang.code}`} className="flex items-center gap-3">
          <div className="relative w-44 h-9 md:w-56 md:h-10">
            <Image
              src="/logos/cuberacktext.svg"
              alt="CubeRack"
              fill
              className="object-contain"
              priority
            />
          </div>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href || currentPath.startsWith(link.href + "/");
            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-colors duration-200 ${isActive ? "text-white" : "text-zinc-400 hover:text-white"}`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-label="Choose language"
              aria-haspopup="menu"
              aria-expanded={isLangOpen}
              onClick={() => setIsLangOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:border-purple-500/40 hover:text-white focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
            >
              <span className={`fi fi-${currentLang.flag} rounded-sm`} aria-hidden="true" />
              {currentLang.label}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangOpen ? "rotate-180 text-purple-300" : "text-zinc-400"}`} />
            </button>

            {isLangOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2.5 w-44 rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    role="menuitem"
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                      currentLang.code === lang.code ? "bg-purple-500/10 text-white" : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    <span className={`fi fi-${lang.flag} rounded-sm`} aria-hidden="true" />
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={`/${currentLang.code}/login`}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-purple-500/40 hover:text-white focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
          >
            <LogIn className="w-4 h-4" />
            {dictionary?.navLogin || "Log in"}
          </a>

          <a
            href={`/${currentLang.code}/billing`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(168,85,247,0.25)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none"
          >
            {dictionary?.navBillingRedirect || "Get Started"}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-300 transition-transform duration-300 ease-out hover:bg-zinc-900 hover:text-white focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none md:hidden"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div ref={mobileMenuRef} className="absolute inset-x-0 top-full z-40 border-t border-zinc-900 bg-zinc-950/98 backdrop-blur-xl shadow-2xl md:hidden animate-slide-down">
          <div className="px-6 py-4 space-y-4">
            <div className="grid gap-2">
              {navLinks.map((link) => {
                const isActive = currentPath === link.href || currentPath.startsWith(link.href + "/");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive ? "bg-zinc-900 text-white" : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="grid gap-3">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isLangOpen}
                onClick={() => setIsLangOpen((prev) => !prev)}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:border-purple-500/40 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <span className={`fi fi-${currentLang.flag} rounded-sm`} aria-hidden="true" />
                  {currentLang.label}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
              </button>

              {isLangOpen && (
                <div ref={mobileDropdownRef} className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
                        currentLang.code === lang.code ? "bg-purple-500/10 text-white" : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                      }`}
                    >
                      <span className={`fi fi-${lang.flag} rounded-sm`} aria-hidden="true" />
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}

              <a
                href={`/${currentLang.code}/login`}
                className="block rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:border-purple-500/40 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  {dictionary?.navLogin || "Log in"}
                </span>
              </a>

              <a
                href={`/${currentLang.code}/billing`}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(168,85,247,0.25)] transition hover:-translate-y-0.5"
              >
                {dictionary?.navBillingRedirect || "Get Started"}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
