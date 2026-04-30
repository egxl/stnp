'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Scales, 
  Gavel, 
  Buildings, 
  ChartBar, 
  Bank, 
  Leaf, 
  Briefcase, 
  GitMerge, 
  Shield, 
  Lightning, 
  HardHat, 
  Compass, 
  Heart 
} from '@phosphor-icons/react/dist/ssr';
import styles from './PracticeGrid.module.css';

const iconMapping = {
  scale: Scales,
  gavel: Gavel,
  building: Buildings,
  chart: ChartBar,
  bank: Bank,
  leaf: Leaf,
  briefcase: Briefcase,
  flow: GitMerge,
  shield: Shield,
  bolt: Lightning,
  crane: HardHat,
  compass: Compass,
  heart: Heart
};

export default function PracticeGrid({ serviceCategories, dict, lang }) {
  return (
    <div className={styles.atlasContainer}>
      {serviceCategories.map((category, catIndex) => {
        return (
          <div 
            key={category.id} 
            className={styles.atlasRow}
            style={{ '--index': catIndex }}
          >
            <div className={styles.atlasHeader}>
              <h3 className={styles.atlasCategoryTitle}>
                {category.title[lang] || category.title.en}
              </h3>
            </div>
            
            <div className={styles.atlasServicesGrid}>
              {category.services.map((service) => {
                const ServiceIcon = iconMapping[service.icon] || Bank;
                return (
                  <div key={service.id} className={styles.atlasServiceItem}>
                    <div className={styles.atlasServiceTop}>
                      <div className={styles.atlasServiceIcon}>
                        <ServiceIcon weight="light" size={32} />
                      </div>
                      <h4 className={styles.atlasServiceTitle}>
                        {service.title[lang] || service.title.en}
                      </h4>
                    </div>
                    <p className={styles.atlasServiceDesc}>
                      {service.shortDescription?.[lang] || service.shortDescription?.en || (service.description[lang] || service.description.en).substring(0, 100) + '...'}
                    </p>
                    <Link 
                      href={`/${lang}/legal-services#${service.id}`}
                      className={styles.atlasServiceLink}
                    >
                      <span>{dict.learnMore}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
