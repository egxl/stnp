import NotFoundComponent from "@/components/NotFound/NotFound";
import RootLayout from "./[lang]/layout";

export const metadata = {
  title: "Page Not Found | Soaloan Tua Nababan & Partners",
  description: "The page you are looking for has been moved or does not exist.",
};

export default async function GlobalNotFound() {
  // Mock the params promise expected by the RootLayout
  const params = Promise.resolve({ lang: 'en' });
  
  return (
    <RootLayout params={params}>
      <NotFoundComponent showNav={false} />
    </RootLayout>
  );
}
