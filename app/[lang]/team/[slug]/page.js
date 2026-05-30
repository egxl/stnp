import { notFound } from 'next/navigation';
import { team } from '@/lib/data/team';
import { getDictionary } from '@/lib/dictionaries';
import TeamProfileDetail from '@/components/Components/TeamProfile/TeamProfileDetail';

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  const member = team.find(m => m.slug === slug);
  const dict = await getDictionary(lang);
  
  if (!member || member.role === 'associate') return {};

  return {
    title: member.name,
    description: (dict.team?.profileMetaDescription || 'Professional profile of {name} at Soaloan Tua Nababan & Partners.').replace('{name}', member.name),
  };
}

export default async function TeamMemberPage({ params }) {
  const { slug, lang } = await params;
  
  // Find member by slug
  const member = team.find(m => m.slug === slug);

  if (!member || member.role === 'associate') {
    notFound();
  }

  const dict = await getDictionary(lang);

  return <TeamProfileDetail member={member} lang={lang} dict={dict.team} />;
}
