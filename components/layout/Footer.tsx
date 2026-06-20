import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { LocaleDictionary } from "@/types/dictionaries";

type FooterProps = {
  locale: string;
  dictionary: Pick<LocaleDictionary, "navVds" | "navBareMetal" | "navNetwork" | "navCaseStudies" | "navAbout" | "metaDescription" | "featuresTitle">;
};

export default function Footer({ locale, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerUiTranslations: Record<string, { services: string; company: string; legal: string; status: string; operational: string; terms: string; privacy: string }> = {
    en: { services: "SERVICES", company: "COMPANY", legal: "LEGAL", status: "Status Page", operational: "All systems operational", terms: "Terms of Service", privacy: "Privacy Policy" },
    de: { services: "SERVICES", company: "COMPANY", legal: "LEGAL", status: "Status Page", operational: "Alle Systeme betriebsbereit", terms: "Nutzungsbedingungen", privacy: "Datenschutzrichtlinie" },
    es: { services: "SERVICIOS", company: "COMPAÑÍA", legal: "LEGAL", status: "Estado del Servicio", operational: "Todos los sistemas operativos", terms: "Términos del Servicio", privacy: "Política de Privacidad" },
    fr: { services: "SERVICES", company: "ENTREPRISE", legal: "LÉGAL", status: "État des Services", operational: "Tous les systèmes sont opérationnels", terms: "Conditions d'Utilisation", privacy: "Politique de Confidentialité" },
    nl: { services: "DIENSTEN", company: "BEDRIJF", legal: "JURIDISCH", status: "Statuspagina", operational: "Alle systemen operationeel", terms: "Algemene Voorwaarden", privacy: "Privacybeleid" }
  };

  const ui = footerUiTranslations[locale] || footerUiTranslations.en;

  const footerLinks = {
    services: [
      { label: dictionary?.navVds || "VDS", href: `/${locale}/vds` },
      { label: dictionary?.navBareMetal || "Bare Metal", href: `/${locale}/bare-metal` },
      { label: dictionary?.navNetwork || "Network", href: `/${locale}/network` },
    ],
    company: [
      { label: dictionary?.navAbout || "About", href: `/${locale}/about` },
      { label: dictionary?.navCaseStudies || "Case Studies", href: `/${locale}/case-studies` },
      { label: ui.status, href: "#", external: true },
    ],
    legal: [
      { label: ui.terms, href: `/${locale}/terms` },
      { label: ui.privacy, href: `/${locale}/privacy` },
      { label: "SLA Guarantee", href: `/${locale}/sla` },
    ],
  };

  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-sm py-12 px-6 md:px-12 lg:px-24 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 pb-12 border-b border-zinc-900/60">
          
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* Logo Container - Adjusted for left-alignment */}
            <div className="relative w-56 h-9">
              <Image
                src="/logos/cuberacktext.svg"
                alt="CubeRack"
                fill
                className="object-left object-contain transition-transform duration-300 ease-in-out hover:scale-105 origin-left"
                priority
              />
            </div>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              {dictionary?.metaDescription}
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="text-xs font-bold text-zinc-200 tracking-wider uppercase">{ui.services}</span>
            <ul className="flex flex-col gap-2 text-xs font-medium">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#a855f7] transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="text-xs font-bold text-zinc-200 tracking-wider uppercase">{ui.company}</span>
            <ul className="flex flex-col gap-2 text-xs font-medium">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="hover:text-[#a855f7] flex items-center gap-1 transition-colors duration-200"
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label} {link.external && <ArrowUpRight className="w-3 h-3 text-zinc-600" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="text-xs font-bold text-zinc-200 tracking-wider uppercase">{ui.legal}</span>
            <ul className="flex flex-col gap-2 text-xs font-medium">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#a855f7] transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-zinc-600 font-medium">
          <div>
            &copy; {currentYear} CubeRack. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}