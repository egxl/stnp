import React from 'react';
import styles from './InfiniteMarquee.module.css';

const InfiniteMarquee = ({ children, speed = 40, direction = 'left', className = '' }) => {
  return (
    <div className={`${styles.marqueeContainer} ${className}`} style={{ '--marquee-speed': `${speed}s` }}>
      <div className={`${styles.marqueeTrack} ${direction === 'right' ? styles.marqueeReverse : ''}`}>
        <div className={styles.marqueeContent}>
          {children}
        </div>
        {/* Duplicate content for seamless loop */}
        <div className={styles.marqueeContent} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
