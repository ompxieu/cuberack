import { z } from "zod";
import type { Locale, LocaleDictionary } from "@/types/dictionaries";

const featureCardSchema = z.object({
  icon: z.enum(["perf", "net", "sec", "supp"]),
  label: z.string(),
  title: z.string(),
  desc: z.string(),
});

const localeDictionarySchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
  heroTitleParts: z.tuple([z.string(), z.string(), z.string()]),
  heroDescriptionParts: z.tuple([z.string(), z.string()]),
  ctaButton: z.string(),
  spoiler: z.string(),
  spoilerText: z.string(),
  cookieTitle: z.string(),
  cookieDescription: z.string(),
  cookieAccept: z.string(),
  cookieDecline: z.string(),
  navVds: z.string(),
  navBareMetal: z.string(),
  navNetwork: z.string(),
  navCaseStudies: z.string(),
  navAbout: z.string(),
  navLogin: z.string(),
  navBillingRedirect: z.string(),
  featuresTitle: z.string(),
  featuresSubtitle: z.string(),
  featureCards: z.array(featureCardSchema),
});

function parseDictionary(data: unknown): LocaleDictionary {
  return localeDictionarySchema.parse(data);
}

const dictionaries: Record<Locale, () => Promise<LocaleDictionary>> = {
  en: () => import("../dictionaries/en.json").then((module) => parseDictionary(module.default)),
  de: () => import("../dictionaries/de.json").then((module) => parseDictionary(module.default)),
  nl: () => import("../dictionaries/nl.json").then((module) => parseDictionary(module.default)),
  es: () => import("../dictionaries/es.json").then((module) => parseDictionary(module.default)),
  fr: () => import("../dictionaries/fr.json").then((module) => parseDictionary(module.default)),
};

export const getDictionary = async (locale: Locale): Promise<LocaleDictionary> => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.en();
};