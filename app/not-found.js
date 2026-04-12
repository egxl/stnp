import { Playfair_Display, Inter } from "next/font/google";
import NotFoundComponent from "@/components/NotFound/NotFound";
// Import global css to ensure base styles are loaded if this renders outside main layout
import "./globals.css";

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
  title: "Page Not Found | Soaloan Tua Nababan & Partners",
  description: "The page you are looking for has been moved or does not exist.",
};

export default function GlobalNotFound() {
  return (
    <div className={`${playfair.variable} ${inter.variable}`} style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#060E1A' }}>
      <NotFoundComponent />
    </div>
  );
}
