import "flag-icons/css/flag-icons.min.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import CookieConsent from "@/components/consent/CookieConsent";
import Navbar from "@/components/navigation/Navbar";
import { getDictionary } from "../dictionaries";
import Footer from "@/components/layout/Footer";
import type { Locale } from "@/types/dictionaries";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const t = await getDictionary(locale as Locale);

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
<Navbar 
    locale={locale} 
    dictionary={{
      navVds: t.navVds,
      navBareMetal: t.navBareMetal,
      navNetwork: t.navNetwork,
      navCaseStudies: t.navCaseStudies,
      navAbout: t.navAbout,
      navLogin: t.navLogin,
      navBillingRedirect: t.navBillingRedirect
    }} 
  />
  
  {children}
  
<Footer 
  locale={locale} 
  dictionary={{
    navVds: t.navVds,
    navBareMetal: t.navBareMetal,
    navNetwork: t.navNetwork,
    navCaseStudies: t.navCaseStudies,
    navAbout: t.navAbout,
    metaDescription: t.metaDescription, 
    featuresTitle: t.featuresTitle,     
  }} 
/>

  <CookieConsent locale={locale} dictionary={{
    cookieTitle: t.cookieTitle,
    cookieDescription: t.cookieDescription,
    cookieAccept: t.cookieAccept,
    cookieDecline: t.cookieDecline
  }} />
      </body>
    </html>
  );
}