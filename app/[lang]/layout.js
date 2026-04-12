import { ViewTransition } from 'react';
import { Playfair_Display, Inter } from "next/font/google";
import { getDictionary } from '@/lib/dictionaries';
import "flag-icons/css/flag-icons.min.css";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import LoadingProvider from "@/components/LoadingScreen/LoadingProvider";
import TargetCursor from "@/components/Animations/TargetCursor/TargetCursor";
import { ThemeProvider } from "@/components/ThemeProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: {
    template: "%s | Soaloan Tua Nababan & Partners",
    default: "Soaloan Tua Nababan & Partners — Law Firm Jakarta",
  },
  description:
    "STNP is a full-service law firm based in Jakarta, specializing in bankruptcy, commercial litigation, corporate law, project financing, infrastructure, and plantation law.",
  keywords: [
    "law firm jakarta",
    "bankruptcy lawyer indonesia",
    "commercial litigation",
    "corporate law",
    "STNP",
    "Soaloan Tua Nababan",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stnp.co.id",
    siteName: "Soaloan Tua Nababan & Partners",
  },
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <html lang={lang} className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LoadingProvider>
          <Navbar navDict={dict.nav} lang={lang} />
          {/* ViewTransition wraps only the page content, not the anchored Navbar/Footer */}
          <ViewTransition
            enter={{
              'nav-forward': 'nav-forward',
              'nav-back': 'nav-back',
              default: 'page-fade',
            }}
            exit={{
              'nav-forward': 'nav-forward',
              'nav-back': 'nav-back',
              default: 'page-fade',
            }}
          >
            <main style={{ minHeight: '100vh' }}>{children}</main>
          </ViewTransition>
          <Footer dict={dict} lang={lang} />
          <TargetCursor
            targetSelector=".cursor-target, a, button, .btn"
            parallaxOn={true}
          />
        </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
