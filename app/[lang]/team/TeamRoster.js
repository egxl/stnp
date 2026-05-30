'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';
import { Button05 } from '@/components/ui/arrow-dots-button';

const filterOptions = [
  { id: 'all', labelKey: 'all' },
  { id: 'partner', labelKey: 'partner' },
  { id: 'senior_associate', labelKey: 'seniorAssociate' },
  { id: 'associate', labelKey: 'associate' },
];

const titleKeyByValue = {
  'Managing Partner': 'managingPartner',
  Partner: 'partner',
  'Senior Associate': 'seniorAssociate',
  Associate: 'associate',
};

export default function TeamRoster({ team, lang, dict }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTeam = team.filter((member) =>
    activeFilter === 'all' ? true : member.role === activeFilter
  );

  return (
    <div className={styles.rosterContainer}>
      <div className={styles.filterBar}>
        {filterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveFilter(option.id)}
            className={`${styles.filterBtn} ${activeFilter === option.id ? styles.filterBtnActive : ''}`}
          >
            {dict?.filters?.[option.labelKey] || option.labelKey}
          </button>
        ))}
      </div>

      <div className={styles.teamGrid}>
        <AnimatePresence mode="wait">
          {filteredTeam.map((member) => {
            const profileHref = `/${lang}/team/${member.slug}`;
            
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={styles.teamCard}
              >
                <div className={styles.photoWrapper}>
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className={styles.photo} />
                  ) : (
                    <div className={styles.photoPlaceholder}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <span className={styles.memberTitle}>
                      {dict?.titles?.[titleKeyByValue[Array.isArray(member.title) ? member.title[0] : member.title]] || (Array.isArray(member.title) ? member.title[0] : member.title)}
                    </span>
                  </div>
                  <Button05 href={profileHref} text={dict?.detail || 'Detail'} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
