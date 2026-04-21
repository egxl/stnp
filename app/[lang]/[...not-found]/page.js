import NotFoundComponent from "@/components/NotFound/NotFound";

export default async function NotFoundCatchAll({ params }) {
  const { lang } = await params;
  
  return <NotFoundComponent showNav={false} lang={lang} />;
}
