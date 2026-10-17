import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import {  Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import CreatPropertyModal from "@/components/modals/CreatPropertyModal";
import FilterModal from "@/components/modals/FilterModal";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Real Estate",
  description: "Real Estate Website",
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${poppins.className}` }>
      <body className="min-h-full flex flex-col bg-background">
        
          {children}
         <LoginModal/>
         <RegisterModal/>
         <CreatPropertyModal/>
         <FilterModal/>
         <Toaster/>
      </body>
    </html>
    </NextIntlClientProvider>
  );
}
