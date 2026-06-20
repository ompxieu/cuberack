"use client";

import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";

import type { LocaleDictionary } from "@/types/dictionaries";

type CookieConsentProps = {
  locale: string;
  dictionary: Pick<LocaleDictionary, "cookieTitle" | "cookieDescription" | "cookieAccept" | "cookieDecline">;
};

export default function CookieConsent({ locale, dictionary }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent !== "accepted" && consent !== "declined") {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    document.cookie = `preferred-language=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; sameSite=Lax`;
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-500 ease-out">
      <div className="relative p-6 bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-zinc-800 rounded-xl text-amber-500 border border-zinc-700/50 shadow-inner">
            <Cookie className="w-5 h-5 animate-pulse" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-100 tracking-wide">
            {dictionary.cookieTitle}
          </h3>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed mb-5">
          {dictionary.cookieDescription}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 py-2.5 px-4 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98]"
          >
            {dictionary.cookieAccept}
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 py-2.5 px-4 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-zinc-100 font-medium text-xs rounded-xl border border-zinc-700/60 transition-all duration-200 active:scale-[0.98]"
          >
            {dictionary.cookieDecline}
          </button>
        </div>
      </div>
    </div>
  );
}