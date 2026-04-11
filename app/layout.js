import { ViewTransition } from 'react';
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import LoadingProvider from "@/components/LoadingScreen/LoadingProvider";
import TargetCursor from "@/components/Animations/TargetCursor/TargetCursor";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <LoadingProvider>
          <Navbar />
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
          <Footer />
          <TargetCursor
            targetSelector=".cursor-target, a, button, .btn"
            parallaxOn={true}
          />
        </LoadingProvider>
      </body>
    </html>
  );
}
