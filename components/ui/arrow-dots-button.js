import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './arrow-dots-button.module.css';

export const Button05 = ({ text = "Detail", href = "#", className = "" }) => {
  return (
    <Link href={href} className={`${styles.button05} ${className}`}>
      <span className={styles.button05_bg}></span>
      <span data-text={text} className={styles.button05_inner}>
        <span className={styles.button05_text}>{text}</span>
        <span className={styles.button05_iconWrap}>
          <ArrowRight className={styles.button05_arrow} size={16} />
        </span>
      </span>
    </Link>
  );
};
