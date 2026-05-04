import { notFound } from 'next/navigation';
import { team } from '@/lib/data/team';
import TeamProfileDetail from '@/components/Components/TeamProfile/TeamProfileDetail';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = team.find(m => m.slug === slug);
  
  if (!member || member.role === 'associate') return {};

  return {
    title: member.name,
    description: `Professional profile of ${member.name} at Soaloan Tua Nababan & Partners.`,
  };
}

export default async function TeamMemberPage({ params }) {
  const { slug, lang } = await params;
  
  // Find member by slug
  const member = team.find(m => m.slug === slug);

  if (!member || member.role === 'associate') {
    notFound();
  }

  return <TeamProfileDetail member={member} lang={lang} />;
}
