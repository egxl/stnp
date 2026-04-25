'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Minus, 
  ArrowRight,
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
import styles from './PracticeAccordion.module.css';

const iconMapping = {
  scale: Scales,
  gavel: Gavel,
  building: Buildings,
  chart: ChartBar,
  landmark: Bank,
  leaf: Leaf,
  briefcase: Briefcase,
  flow: GitMerge,
  shield: Shield,
  bolt: Lightning,
  crane: HardHat,
  compass: Compass,
  heart: Heart,
};

export default function PracticeAccordion({ serviceCategories, dict, lang }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleAccordion = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className={styles.accordionContainer}>
      {serviceCategories.map((category, index) => {
        const isExpanded = expandedId === category.id;
        const displayIndex = (index + 1).toString().padStart(2, '0');

        return (
          <div 
            key={category.id} 
            className={`${styles.accordionRow} ${isExpanded ? styles.accordionRowExpanded : ''}`}
          >
            {/* Header / Trigger */}
            <button 
              className={styles.accordionHeader}
              onClick={() => toggleAccordion(category.id)}
              aria-expanded={isExpanded}
            >
              <div className={styles.headerMain}>
                <span className={styles.categoryIndex}>{displayIndex}</span>
                <h3 className={styles.categoryTitle}>
                  {category.title[lang] || category.title.en}
                </h3>
              </div>

              <div className={styles.headerInfo}>
                <span className={styles.serviceCount}>
                  {dict.servicesCount.replace('{count}', category.services.length)}
                </span>
                <div className={styles.expandHint}>
                  <span className={styles.expandHintText}>{dict.servicesExpand}</span>
                  <div className={styles.iconWrapper}>
                    {isExpanded ? <Minus size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
                  </div>
                </div>
              </div>
            </button>

            {/* Content Body */}
            <div className={styles.accordionContentWrapper}>
              <div className={styles.accordionContent}>
                <div className={styles.contentInner}>
                  <div className={styles.servicesList}>
                    {category.services.map((service, sIndex) => {
                      const ServiceIcon = iconMapping[service.icon] || Bank;
                      return (
                        <div 
                          key={service.id} 
                          className={styles.serviceItem}
                          style={{ '--item-index': sIndex }}
                        >
                          <div className={styles.serviceIcon}>
                            <ServiceIcon size={32} weight="light" />
                          </div>
                          <div className={styles.serviceText}>
                            <h4 className={styles.serviceTitle}>
                              {service.title[lang] || service.title.en}
                            </h4>
                            <p className={styles.serviceDesc}>
                              {service.description[lang] || service.description.en}
                            </p>
                            <Link 
                              href={`/${lang}/legal-services#${service.id}`}
                              className={styles.learnMoreLink}
                            >
                              <span>{dict.learnMore}</span>
                              <ArrowRight size={16} weight="bold" className={styles.arrowIcon} />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
