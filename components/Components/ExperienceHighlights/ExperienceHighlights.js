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
    title: 'Gas Supply to State Energy Grid',
    description: 'Represented a gas company in complex price negotiations and supply agreements with a major state-owned energy enterprise.',
    tags: ['Energy', 'Regulatory', 'Negotiation'],
    size: 'normal',
  },
  {
    id: 'property-litigation',
    value: 'Cassation Level',
    category: 'Commercial Litigation',
    title: 'PLC Property Dispute',
    description: 'Represented a major publicly listed property company across all court levels — from District Court through to the Supreme Court — in commercial disputes with consumers.',
    tags: ['Litigation', 'Property', 'Civil Law'],
    size: 'normal',
  },
  {
    id: 'bankruptcy-curator',
    value: 'Cross-Region',
    category: 'Bankruptcy & Insolvency',
    title: 'Commercial Court',
    description: 'Appointed as Court Curator to manage and administer bankruptcy assets spanning East and West Kalimantan at the Surabaya Commercial Court.',
    tags: ['Bankruptcy', 'PKPU', 'Asset Management'],
    size: 'normal',
  },
  {
    id: 'company-liquidation',
    value: 'Statutory Role',
    category: 'Insolvency & Winding Up',
    title: 'Corporate Liquidation',
    description: 'Appointed as Court-Appointed Liquidator across multiple corporate liquidation proceedings, overseeing asset distribution and statutory closure of limited liability companies.',
    tags: ['Liquidation', 'Insolvency', 'Corporate'],
    size: 'normal',
  },
  {
    id: 'foreign-bank',
    value: 'Fintech',
    category: 'Banking Litigation',
    title: 'Fintech Cessie Recovery',
    description: 'Represented a fintech lending company in handling non-performing credit, including cessie transfers and collateral execution.',
    tags: ['Litigation', 'Banking', 'Cessie'],
    size: 'normal',
  },
  {
    id: 'plantation-dispute',
    value: 'Concession Area',
    category: 'Plantation & Agrarian',
    title: 'Palm Oil Land Area Dispute',
    description: 'Represented palm oil plantation companies in multiple disputes over forest concession and plantation land areas, resolving competing land claims through litigation and negotiation.',
    tags: ['Plantation', 'Land Law', 'Litigation'],
    size: 'normal',
  },
  {
    id: 'forestry-license',
    value: 'Regulatory Transfer',
    category: 'Natural Resources',
    title: 'Timber Forest License Transfer',
    description: 'Advised and represented the buyer in the full regulatory transfer of a Timber Forest Product Utilization Business License in a Natural Forest zone, covering all administrative and legal due diligence requirements.',
    tags: ['Forestry', 'Licensing', 'M&A'],
    size: 'wide', // spans 2 columns to fill empty space
  },
];


export default function ExperienceHighlights({ dict, lang }) {
  const highlightTranslations = dict?.home?.highlightsList || {};

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
          {highlights.map((item) => {
            const translatedItem = highlightTranslations[item.id] || item;
            const tags = translatedItem.tags || item.tags;

            return (
              <article
                key={item.id}
                className={`${styles.card} ${item.size === 'large' ? styles.cardLarge : item.size === 'wide' ? styles.cardWide : item.size === 'full' ? styles.cardFull : ''}`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCategory}>{translatedItem.category}</span>
                  </div>
                  <div className={styles.cardValue}>{translatedItem.value}</div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{translatedItem.title}</h3>
                  <p className={styles.cardDesc}>{translatedItem.description}</p>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.tagList} aria-label="Practice areas">
                    {tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Decorative accent line */}
                <div className={styles.cardAccent} aria-hidden="true" />
              </article>
            );
          })}
        </div>

        {/* Disclaimer note */}
        <p className={styles.disclaimer}>
          {dict?.home?.highlightsDisclaimer || 'Matters are presented in anonymized form. Prior results do not guarantee similar outcomes.'}
        </p>
      </div>
    </section>
  );
}
