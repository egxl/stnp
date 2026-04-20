'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[\s.,]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'partner', label: 'Partners' },
  { id: 'senior_associate', label: 'Senior Associates' },
  { id: 'associate', label: 'Associates' },
];

export default function TeamRoster({ team, lang }) {
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
            {option.label}
          </button>
        ))}
      </div>

      <motion.div layout className={styles.teamGrid}>
        <AnimatePresence mode="popLayout">
          {filteredTeam.map((member) => {
            const memberSlug = slugify(member.name);
            return (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  layout: { type: 'spring', bounce: 0.2, duration: 0.6 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
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
                    <span className={styles.memberTitle}>{Array.isArray(member.title) ? member.title[0] : member.title}</span>
                  </div>
                  <Link href={`/${lang}/team-profile/${memberSlug}`} className={styles.detailBtn}>
                    <span>Detail</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
