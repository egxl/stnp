import styles from './ExperienceHighlights.module.css';

// Anonymized highlights sourced from FIRM_DATA.md track records
const highlights = [
  {
    id: 'syndicated-finance',
    value: 'USD 120M+',
    category: 'Banking & Finance',
    title: 'Syndicated Credit Facility',
    description: 'Lead counsel for a major coal mining company in a multi-lender syndicated credit facility — one of the largest in the sector.',
    tags: ['Project Finance', 'Mining', 'Syndication'],
    size: 'large', // 2x1 bento card
  },
  {
    id: 'state-energy',
    value: 'State-Owned',
    category: 'Energy & Gas',
    title: 'National Energy Price Negotiation',
    description: 'Represented a gas company in complex price negotiations and supply agreements with a major state-owned energy enterprise.',
    tags: ['Energy', 'Regulatory', 'Negotiation'],
    size: 'normal',
  },
  {
    id: 'pre-ipo',
    value: 'Pre-IPO',
    category: 'Capital Markets',
    title: 'Mining Company Public Offering Advisory',
    description: 'End-to-end advisory for due diligence, share acquisition, and capital markets preparation for a coal company pursuing a public listing.',
    tags: ['Capital Markets', 'M&A', 'Due Diligence'],
    size: 'normal',
  },
  {
    id: 'bankruptcy-curator',
    value: 'Multi-Province',
    category: 'Bankruptcy & Insolvency',
    title: 'Commercial Court Curatorship',
    description: 'Appointed as Court Curator to manage and administer bankruptcy assets spanning East and West Kalimantan at the Surabaya Commercial Court.',
    tags: ['Bankruptcy', 'PKPU', 'Asset Management'],
    size: 'normal',
  },
  {
    id: 'foreign-bank',
    value: 'Foreign Bank',
    category: 'Banking Litigation',
    title: 'Cross-Border Credit Recovery',
    description: 'Represented an international bank in handling non-performing credit cases, including cessie transfers and collateral execution.',
    tags: ['Litigation', 'Banking', 'Cessie'],
    size: 'normal',
  },
  {
    id: 'property-litigation',
    value: 'Supreme Court',
    category: 'Commercial Litigation',
    title: 'Multi-Instance Property Dispute',
    description: 'Represented a major publicly listed property company across all court levels — from District Court through to the Supreme Court — in commercial disputes with consumers.',
    tags: ['Litigation', 'Property', 'Civil Law'],
    size: 'normal',
  },
  {
    id: 'forestry-license',
    value: 'IUPHHK-HA',
    category: 'Natural Resources',
    title: 'Timber Forest License Transfer',
    description: 'Advised and represented the buyer in the full regulatory transfer of a Timber Forest Product Utilization Business License in a Natural Forest zone, covering all administrative and legal due diligence requirements.',
    tags: ['Forestry', 'Licensing', 'M&A'],
    size: 'full', // spans all 3 columns
  },
];

// Minimal SVG icons using Phosphor-style paths (inline, no dependency)
const categoryIcons = {
  'Banking & Finance': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'Energy & Gas': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  'Capital Markets': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  'Bankruptcy & Insolvency': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  'Banking Litigation': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  'Natural Resources': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 8C8 10 5.9 16.17 3.82 19.34a1 1 0 001.66 1.06C7 18.5 10 16 12 13.5" />
      <path d="M17 8l4-4" />
      <path d="M14 13l-4 4" />
    </svg>
  ),
  'Commercial Litigation': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z" />
    </svg>
  ),
};

export default function ExperienceHighlights({ dict, lang }) {
  return (
    <section className={styles.section} aria-labelledby="highlights-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sectionLabel}>
            {dict?.home?.highlightsLabel || 'Track Record'}
          </span>
          <h2 className={styles.sectionTitle} id="highlights-heading">
            {dict?.home?.highlightsTitle || 'Experience That Speaks for Itself'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {dict?.home?.highlightsSubtitle || 'A selection of notable matters handled by our partners across complex industries and high-stakes transactions.'}
          </p>
        </div>

        {/* Bento Grid */}
        <div className={styles.grid}>
          {highlights.map((item) => (
            <article
              key={item.id}
              className={`${styles.card} ${item.size === 'large' ? styles.cardLarge : item.size === 'wide' ? styles.cardWide : item.size === 'full' ? styles.cardFull : ''}`}
            >
              <div className={styles.cardTop}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardIcon}>
                    {categoryIcons[item.category]}
                  </span>
                  <span className={styles.cardCategory}>{item.category}</span>
                </div>
                <div className={styles.cardValue}>{item.value}</div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.tagList} aria-label="Practice areas">
                  {item.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Decorative accent line */}
              <div className={styles.cardAccent} aria-hidden="true" />
            </article>
          ))}
        </div>

        {/* Disclaimer note */}
        <p className={styles.disclaimer}>
          {dict?.home?.highlightsDisclaimer || 'Matters are presented in anonymized form. Prior results do not guarantee similar outcomes.'}
        </p>
      </div>
    </section>
  );
}
