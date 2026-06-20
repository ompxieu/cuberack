import { ArrowRight, ArrowDown, ShoppingBag } from "lucide-react";
import type { LocaleDictionary } from "@/types/dictionaries";

type HeroSectionProps = {
  locale: string;
  dictionary: Pick<LocaleDictionary, "heroTitleParts" | "heroDescriptionParts" | "ctaButton" | "spoiler" | "spoilerText">;
};

export default function HeroSection({ locale, dictionary }: HeroSectionProps) {
  const [heroTitlePart1, heroTitleHighlight, heroTitlePart2] = dictionary.heroTitleParts;
  const [heroDescriptionPart1, heroDescriptionPart2] = dictionary.heroDescriptionParts;

  return (
    <main className="relative min-h-[calc(100vh-65px)] w-full bg-zinc-950 overflow-hidden flex flex-col justify-between px-6 py-16 md:px-12 lg:px-24">
      <div className="max-w-4xl z-10 mt-12 md:mt-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
          {heroTitlePart1} <br className="hidden sm:inline" />
          {['en', 'de'].includes(locale) && heroTitlePart2}
          <span className="text-[#a855f7]"> {heroTitleHighlight} </span>
          {['nl', 'fr', 'es'].includes(locale) && heroTitlePart2}
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 font-medium max-w-xl leading-relaxed mb-8">
          {heroDescriptionPart1} <br />
          {heroDescriptionPart2}
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <button className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold text-sm sm:text-base px-6 py-3 rounded-xl transition-all duration-200 shadow-[0_4px_25px_rgba(168,85,247,0.25)] active:scale-[0.98]">
            <ShoppingBag className="w-5 h-5" />
            {dictionary.ctaButton}
          </button>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 font-medium">
            <span>{dictionary.spoiler}</span>
            <span className="text-zinc-300 flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              {dictionary.spoilerText} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        <div className="mt-12 md:mt-16 animate-bounce">
          <ArrowDown className="w-5 h-5 text-zinc-600" />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
        <svg
          className="absolute bottom-0 left-0 w-full h-[60%] sm:h-[70%] opacity-40"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M-100 650 L1600 100" stroke="url(#moving-purple-gradient)" strokeWidth="2" />
          <path d="M-100 635 L1600 85" stroke="url(#purple-gradient-fade)" strokeWidth="1" />
          <path d="M-100 665 L1600 115" stroke="url(#purple-gradient-fade)" strokeWidth="1" />

          <circle cx="300" cy="510" r="4" fill="#c084fc" />
          <circle cx="300" cy="510" r="16" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.3" className="animate-pulse" />
          <circle cx="300" cy="510" r="28" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.1" />

          <circle cx="650" cy="380" r="4" fill="#c084fc" />
          <circle cx="1020" cy="240" r="4" fill="#c084fc" />
          <circle cx="1400" cy="110" r="4" fill="#c084fc" />

          <defs>
            <linearGradient id="moving-purple-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <animate attributeName="x1" values="0%;20%;0%" dur="8s" repeatCount="indefinite" />
              <animate attributeName="x2" values="100%;120%;100%" dur="8s" repeatCount="indefinite" />
              <stop offset="0%" stopColor="#6b21a8" stopOpacity="0" />
              <stop offset="30%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="70%" stopColor="#d8b4fe" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="purple-gradient-fade" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </main>
  );
}
