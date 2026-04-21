import NotFoundComponent from "@/components/NotFound/NotFound";
import { Geist, Newsreader, Julius_Sans_One, Michroma } from "next/font/google";
import { getDictionary } from '@/lib/dictionaries';
import Navbar from "@/components/Navbar/Navbar";
import LoadingProvider from "@/components/LoadingScreen/LoadingProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollReset from "@/components/Components/ScrollReset/ScrollReset";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const juliusSansOne = Julius_Sans_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-julius",
});

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-michroma",
});

export const metadata = {
  title: "Page Not Found | Soaloan Tua Nababan & Partners",
  description: "The page you are looking for has been moved or does not exist.",
};

export default async function GlobalNotFound() {
  const lang = 'en'; // Default to English for global 404
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${geist.variable} ${newsreader.variable} ${juliusSansOne.variable} ${michroma.variable}`}
    >
      <body style={{ backgroundColor: 'transparent' }}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LoadingProvider>
            <ScrollReset />
            <Navbar navDict={dict.nav} lang={lang} />
            <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <NotFoundComponent showNav={false} />
            </main>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
