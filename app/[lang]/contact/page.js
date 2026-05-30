import { getDictionary } from '@/lib/dictionaries';
import ContactClient from './ContactClient';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.contact?.meta?.title || 'Contact — Soaloan Tua Nababan & Partners',
    description:
      dict.contact?.meta?.description ||
      'Contact Soaloan Tua Nababan & Partners to discuss your legal needs.',
  };
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ContactClient dict={dict.contact} />;
}
