import { Zap, Network, ShieldCheck, Headset } from "lucide-react";
import type { FeatureCard, LocaleDictionary } from "@/types/dictionaries";

type FeaturesSectionProps = {
  dictionary: Pick<LocaleDictionary, "featuresTitle" | "featuresSubtitle"> & {
    cards: FeatureCard[];
  };
};

const iconMap = {
  perf: Zap,
  net: Network,
  sec: ShieldCheck,
  supp: Headset,
} as const;

function renderFooter(icon: FeatureCard["icon"]) {
  switch (icon) {
    case "perf":
      return (
        <div className="flex items-end gap-1.5 h-16 pt-2">
          {[40, 65, 48, 85, 100, 70, 85, 95].map((height, i) => (
            <div
              key={i}
              style={{ height: `${height}%` }}
              className="flex-1 bg-zinc-800/80 rounded-sm group-hover:bg-purple-500/30 transition-all duration-500"
            />
          ))}
        </div>
      );
    case "net":
      return (
        <div className="relative h-16 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-full h-full" viewBox="0 0 200 60" fill="none">
            <path d="M10 40 L60 20 L110 45 L150 15 L190 35" stroke="#27272a" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M10 40 L60 20 L110 45 L150 15 L190 35" stroke="#a855f7" strokeWidth="1.5" className="animate-pulse" />
            <circle cx="10" cy="40" r="3" fill="#a855f7" />
            <circle cx="60" cy="20" r="3" fill="#c084fc" />
            <circle cx="110" cy="45" r="3" fill="#a855f7" />
            <circle cx="150" cy="15" r="3" fill="#c084fc" />
            <circle cx="190" cy="35" r="3" fill="#a855f7" />
          </svg>
        </div>
      );
    case "sec":
      return (
        <div className="relative h-16 w-full flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center relative group-hover:border-purple-500/20 transition-colors duration-300">
            <div className="absolute inset-0 w-full h-full rounded-full border border-purple-500/20 scale-125 animate-ping opacity-0 group-hover:opacity-100 duration-1000" />
            <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
            </div>
          </div>
        </div>
      );
    case "supp":
      return (
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold tracking-wide">
            <span>RESPONSE TIME</span>
            <span className="text-purple-400 group-hover:scale-105 transition-transform duration-200">&lt; 3 MINS</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800/60 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-[94%] rounded-full transition-all duration-700 group-hover:bg-purple-400" />
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function FeaturesSection({ dictionary }: FeaturesSectionProps) {
  return (
    <section className="w-full bg-zinc-950 py-24 px-6 md:px-12 lg:px-24 relative z-20 border-t border-zinc-900/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            {dictionary.featuresTitle}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-medium leading-relaxed">
            {dictionary.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dictionary.cards.map((card) => {
            const Icon = iconMap[card.icon];
            return (
              <div key={card.icon} className="group relative bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-zinc-900/40 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-300" />
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20 group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-purple-400 tracking-widest uppercase">{card.label}</span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100 mb-3 group-hover:text-white transition-colors">{card.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">{card.desc}</p>
                </div>
                {renderFooter(card.icon)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
