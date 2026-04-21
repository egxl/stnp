'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Gavel,
  Landmark,
  Scale,
  Briefcase,
  Building2,
  GitMerge,
  BarChart3,
  Shield,
  Zap,
  Construction,
  Leaf,
  Compass,
  Heart,
  Mail,
} from 'lucide-react';
import styles from './Navbar.module.css';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import StaggeredMenu from './StaggeredMenu';
import DropdownNavigation from '@/components/ui/dropdown-navigation';
import GradualBlur from './GradualBlur';
import { serviceCategories, proBono } from '@/lib/data/services';

const SERVICE_ICON_MAP = {
  'dispute-resolution': Scale,
  'corporate-commercial': Building2,
  'industry-focus': Landmark,
  litigation: Gavel,
  'banking-finance': Landmark,
  bankruptcy: Scale,
  'industrial-relations': Briefcase,
  corporate: Building2,
  mergers: GitMerge,
  financing: BarChart3,
  ip: Shield,
  'energy-mining': Zap,
  infrastructure: Construction,
  plantation: Leaf,
  tourism: Compass,
  'pro-bono': Heart,
};

// Hierarchy order: links after index 0 are "forward" from Home
// and "back" when navigating back to Home.
function getTransitionType(fromPath, toHref) {
  if (toHref === '/' || toHref.endsWith('/')) return ['nav-back'];
  return ['nav-forward'];
}

const submenuCopy = {
  en: {
    firm: 'Learn who we are, how we work, and what anchors our counsel.',
    services: 'Explore the firm’s core legal services and strategic capabilities.',
    team: 'Meet the advocates behind STNP’s litigation and advisory work.',
    insights: 'Read the latest firm articles, commentary, and legal updates.',
    contact: 'Reach the firm directly to discuss your matter or schedule a consultation.',
    consultation: 'Start a conversation with STNP about your legal needs.',
    profile: 'Review the professionals representing the firm across key matters.',
    expertise: 'See the practice areas where STNP advises and litigates.',
    practiceAreas: 'Practice Areas',
    practiceAreasDesc: 'Comprehensive legal expertise tailored to the complex Indonesian commercial landscape.',
    viewAll: 'View All Services',
  },
  id: {
    firm: 'Pelajari siapa kami, cara kami bekerja, dan dasar pendekatan hukum kami.',
    services: 'Jelajahi layanan hukum utama dan kapabilitas strategis STNP.',
    team: 'Kenali para advokat di balik pekerjaan litigasi dan advisory STNP.',
    insights: 'Baca artikel, ulasan, dan pembaruan hukum terbaru dari firma kami.',
    contact: 'Hubungi firma secara langsung untuk membahas kebutuhan hukum Anda.',
    consultation: 'Mulai percakapan dengan STNP mengenai kebutuhan hukum Anda.',
    profile: 'Tinjau para profesional yang mewakili firma dalam berbagai perkara penting.',
    expertise: 'Lihat bidang praktik tempat STNP memberikan nasihat dan pendampingan.',
    practiceAreas: 'Bidang Praktik',
    practiceAreasDesc: 'Keahlian hukum komprehensif yang disesuaikan dengan lanskap komersial Indonesia yang kompleks.',
    viewAll: 'Lihat Semua Layanan',
  },
  zh: {
    firm: '了解我们的事务所、工作方式，以及支撑法律服务的方法。',
    services: '查看 STNP 的核心法律服务与战略能力。',
    team: '认识负责 STNP 诉讼与顾问业务的专业律师团队。',
    insights: '阅读事务所最新文章、评论与法律动态。',
    contact: '直接联系事务所，讨论您的法律需求或预约咨询。',
    consultation: '就您的法律事务 with STNP 展开初步沟通。',
    profile: '查看代表本所在重要事务中提供服务的专业人士。',
    expertise: '了解 STNP 提供咨询与代理的主要业务领域。',
    practiceAreas: '业务领域',
    practiceAreasDesc: '针对印度尼西亚复杂的商业环境量身定制的综合法律专业知识。',
    viewAll: '查看所有服务',
  },
};

function buildDropdownNavItems(d, lang) {
  const copy = submenuCopy[lang] || submenuCopy.en;

  return [
    {
      id: 1,
      label: d.home,
      href: `/${lang}`,
    },
    {
      id: 2,
      label: d.about,
      href: `/${lang}/about-us`,
    },
    {
      id: 3,
      label: d.services,
      aside: {
        title: copy.practiceAreas,
        description: copy.practiceAreasDesc,
        cta: { label: copy.viewAll, href: `/${lang}/legal-services` },
      },
      subMenus: serviceCategories.map((category) => ({
        title: category.title[lang] || category.title.en,
        items: category.services.map((service) => ({
          label: service.title[lang] || service.title.en,
          href: `/${lang}/legal-services#${category.id}`, // Anchor per category as requested
          icon: SERVICE_ICON_MAP[service.id] || Scale,
          description: '', // Optional: keeping it clean
        })),
      })),
      footer: {
        label: proBono.title[lang] || proBono.title.en,
        href: `/${lang}/legal-services#${proBono.id}`,
        icon: Heart,
      },
    },
    {
      id: 4,
      label: d.team,
      href: `/${lang}/team-profile`,
    },
    {
      id: 5,
      label: d.insights,
      href: `/${lang}/insights`,
    },
    {
      id: 6,
      label: d.contact,
      href: `/${lang}/contact`,
    },
  ];
}

export default function Navbar({ navDict, lang = 'en' }) {
  const pathname = usePathname();
  const router = useRouter();

  const fallbackKeys = {
    home: 'Home', about: 'About', services: 'Services',
    team: 'Team', insights: 'Insights', contact: 'Contact',
    consultation: 'Consultation', freeConsultation: 'Free Consultation'
  };
  const d = navDict || fallbackKeys;

  const navLinks = [
    { href: `/${lang}`, label: d.home },
    { href: `/${lang}/about-us`, label: d.about },
    { href: `/${lang}/legal-services`, label: d.services },
    { href: `/${lang}/team-profile`, label: d.team },
    { href: `/${lang}/insights`, label: d.insights },
    { href: `/${lang}/contact`, label: d.contact },
  ];

  const dropdownNavItems = buildDropdownNavItems(d, lang);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pathSegments = pathname.split('/').filter(Boolean);
      const isHome = pathSegments.length <= 1;
      
      // Hero section logic
      const threshold = isHome ? window.innerHeight - 100 : 20;
      setIsScrolled(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return (
    <header
      id="site-header"
      className={`${styles.header} ${styles.ready} ${isScrolled ? 'is-scrolled' : ''}`}
      style={{ viewTransitionName: 'site-header' }}
    >
      <GradualBlur
        preset="header"
        zIndex={0}
        divCount={2}
        exponential={true}
        curve="ease-out"
        height="5.5rem"
        strength={1.5}
      />
      <nav className={styles.nav}>
        {/* Logo — going to Home is always nav-back */}
        <Link
          href={`/${lang}`}
          className={styles.logo}
          aria-label="Home"
          transitionTypes={['nav-back']}
          onClick={(e) => {
            const homePath = `/${lang}`;
            const normalizedCurrent = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
            if (normalizedCurrent === homePath) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <img
            src="/images/logo.png"
            alt="Soaloan Tua Nababan & Partners Logo"
            className={`${styles.logoImage} ${styles.logoDark}`}
          />
          <img
            src="/images/logo-dark.png"
            alt="Soaloan Tua Nababan & Partners Logo"
            className={`${styles.logoImage} ${styles.logoLight}`}
          />
        </Link>

        <div className={styles.desktopNavigation}>
          <DropdownNavigation
            navItems={dropdownNavItems}
            currentPath={pathname}
            getTransitionType={getTransitionType}
          />
        </div>

        {/* Desktop: CTA Button, Language Switcher, and Theme Toggle */}
        <div className={styles.desktopControls}>
          <LanguageSwitcher lang={lang} pathname={pathname} router={router} />
          <ThemeToggle />
        </div>

        {/* Mobile/Tablet: StaggeredMenu — replaces the bugged hamburger */}
        <StaggeredMenu
          navLinks={navLinks}
          lang={lang}
          pathname={pathname}
          router={router}
          navDict={d}
          getTransitionType={getTransitionType}
        />
      </nav>
    </header>
  );
}
