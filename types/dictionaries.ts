export type Locale = "en" | "de" | "nl" | "es" | "fr";

export type FeatureCardIcon = "perf" | "net" | "sec" | "supp";

export type FeatureCard = {
  icon: FeatureCardIcon;
  label: string;
  title: string;
  desc: string;
};

export type LocaleDictionary = {
  metaTitle: string;
  metaDescription: string;
  heroTitleParts: [string, string, string];
  heroDescriptionParts: [string, string];
  ctaButton: string;
  spoiler: string;
  spoilerText: string;
  cookieTitle: string;
  cookieDescription: string;
  cookieAccept: string;
  cookieDecline: string;
  navVds: string;
  navBareMetal: string;
  navNetwork: string;
  navCaseStudies: string;
  navAbout: string;
  navLogin: string;
  navBillingRedirect: string;
  featuresTitle: string;
  featuresSubtitle: string;
  featureCards: FeatureCard[];
};
