import { Metadata } from "next";
import { getDictionary } from "../../dictionaries";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import type { Locale } from "@/types/dictionaries";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);

  const ogLocales: Record<string, string> = {
    en: "en_GB",
    de: "de_DE",
    nl: "nl_NL",
    fr: "fr_FR",
    es: "es_ES",
  };

  return {
    metadataBase: new URL("https://cuberack.callumcollins.com"),
    title: t.metaTitle,
    description: t.metaDescription,
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: "https://cuberack.callumcollins.com",
      siteName: "Cuberack",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Cuberack",
        },
      ],
      locale: ogLocales[locale] || "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);

  const heroDictionary = {
    heroTitleParts: t.heroTitleParts,
    heroDescriptionParts: t.heroDescriptionParts,
    ctaButton: t.ctaButton,
    spoiler: t.spoiler,
    spoilerText: t.spoilerText,
  };

  return (
    <>
      <HeroSection locale={locale} dictionary={heroDictionary} />

      <FeaturesSection
        dictionary={{
          featuresTitle: t.featuresTitle,
          featuresSubtitle: t.featuresSubtitle,
          cards: t.featureCards,
        }}
      />
    </>
  );
}
