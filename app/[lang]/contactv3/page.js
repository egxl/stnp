'use client';

import { useState } from 'react';
import { firmInfo } from '@/lib/data/team';
import styles from './page.module.css';

export default function ContactV3Page() {
  const [status, setStatus] = useState('idle');
  const [showMap, setShowMap] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          ...formData,
          from_name: 'STNP Website Contact Form',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const { address, phone, email } = firmInfo;

  return (
    <div className={styles.page}>

      {/* ── Swiss Grid Top Rule ──────────────────────────────── */}
      <div className={styles.topBar} aria-hidden="true">
        <div className={styles.topBarInner}>
          <span className={styles.topBarLabel}>STNP · Contact</span>
          <span className={styles.topBarDate}>Jakarta, Indonesia</span>
        </div>
      </div>

      {/* ── Page Content: strict two-column Swiss grid ────────── */}
      <div className={styles.grid}>

        {/* ── Left Column: Form (⅔ width) ───────────────────── */}
        <div className={styles.formColumn}>

          {/* Large display number — Swiss scale contrast */}
          <div className={styles.displayHeader}>
            <h1 className={styles.displayTitle}>Contact</h1>
            <p className={styles.displaySub}>
              We advise on commercial litigation, bankruptcy, corporate, infrastructure, plantation, and energy law. Tell us about your matter.
            </p>
          </div>

          {status === 'success' && (
            <div className={styles.successMsg} role="status">
              <span className={styles.successIcon} aria-hidden="true">✓</span>
              <p>Message received. We respond within one business day.</p>
            </div>
          )}

          {status === 'error' && (
            <div className={styles.errorMsg} role="alert">
              <p>
                Submission failed. Email us at{' '}
                <a href={`mailto:${email}`}>{email}</a>.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>

            {/* Row 01 */}
            <div className={styles.fieldRow}>
              <div className={styles.fieldBlock}>
                <div className={styles.fieldMeta}>
                  <span className={styles.fieldIndex}>01</span>
                  <label htmlFor="v3-name" className={styles.fieldLabel}>Full Name <span className={styles.req}>*</span></label>
                </div>
                <input
                  id="v3-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Your full name"
                />
              </div>
              <div className={styles.fieldBlock}>
                <div className={styles.fieldMeta}>
                  <span className={styles.fieldIndex}>02</span>
                  <label htmlFor="v3-email" className={styles.fieldLabel}>Email <span className={styles.req}>*</span></label>
                </div>
                <input
                  id="v3-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Row 02 */}
            <div className={styles.fieldRow}>
              <div className={styles.fieldBlock}>
                <div className={styles.fieldMeta}>
                  <span className={styles.fieldIndex}>03</span>
                  <label htmlFor="v3-phone" className={styles.fieldLabel}>Phone</label>
                </div>
                <input
                  id="v3-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="+62 xxx xxxx xxxx"
                />
              </div>
              <div className={styles.fieldBlock}>
                <div className={styles.fieldMeta}>
                  <span className={styles.fieldIndex}>04</span>
                  <label htmlFor="v3-subject" className={styles.fieldLabel}>Subject <span className={styles.req}>*</span></label>
                </div>
                <input
                  id="v3-subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="How can we help?"
                />
              </div>
            </div>

            {/* Row 03 — full width message */}
            <div className={styles.fieldBlock}>
              <div className={styles.fieldMeta}>
                <span className={styles.fieldIndex}>05</span>
                <label htmlFor="v3-message" className={styles.fieldLabel}>Message <span className={styles.req}>*</span></label>
              </div>
              <textarea
                id="v3-message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Please describe your legal matter…"
              />
            </div>

            <div className={styles.formFooter}>
              <button
                type="submit"
                id="v3-contact-submit"
                className={styles.submitBtn}
                disabled={status === 'sending'}
              >
                <span className={styles.submitBtnText}>
                  {status === 'sending' ? 'Sending' : 'Send'}
                </span>
                <span className={styles.submitBtnArrow} aria-hidden="true">→</span>
              </button>
              <span className={styles.disclaimer}>Treated in strict confidence</span>
            </div>

          </form>

          {/* Map embed — below the form, inline text link trigger */}
          <div className={styles.mapSection}>
            <button
              type="button"
              onClick={() => setShowMap(v => !v)}
              className={styles.mapTrigger}
              aria-expanded={showMap}
              aria-controls="map-embed-v3"
            >
              <span>{showMap ? 'Hide map' : 'View office on map'}</span>
              <span className={styles.mapTriggerArrow} aria-hidden="true">
                {showMap ? '↑' : '↗'}
              </span>
            </button>
            <div
              id="map-embed-v3"
              className={`${styles.mapWrapper} ${showMap ? styles.mapVisible : ''}`}
              aria-hidden={!showMap}
            >
              {showMap && (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.302305370211!2d106.81998357582531!3d-6.20963026094602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5005f6a484f%3A0xa695d1d572dbf6ae!2sSoaloan%20Tua%20Nababan%20%26%20Partners!5e0!3m2!1sen!2sid!4v1712850000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="STNP Office Location — Prudential Tower, Jakarta Selatan"
                />
              )}
            </div>
          </div>

        </div>

        {/* ── Right Column: Sticky Contact Info (⅓ width) ───── */}
        <aside className={styles.infoColumn} aria-label="Contact information">

          <div className={styles.infoInner}>

            {/* Giant display phone number — Swiss scale signature */}
            <div className={styles.phoneDisplay}>
              <span className={styles.phoneLabel}>Phone</span>
              {phone.map((p, i) => (
                <a key={i} href={`tel:${p.replace(/\s/g, '')}`} className={styles.phoneNumber}>
                  {p}
                </a>
              ))}
            </div>

            <div className={styles.infoDivider} aria-hidden="true" />

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Email</span>
              <a href={`mailto:${email}`} className={styles.infoEmail}>
                {email}
              </a>
            </div>

            <div className={styles.infoDivider} aria-hidden="true" />

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Office</span>
              <address className={styles.infoAddress}>
                <span>{address.line1}</span>
                <span>{address.line2}</span>
                <span>{address.city}</span>
                <span>{address.postal}</span>
                <span>{address.country}</span>
              </address>
            </div>

            <div className={styles.infoDivider} aria-hidden="true" />

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Hours</span>
              <span className={styles.infoText}>Mon – Fri</span>
              <span className={styles.infoText}>09:00 – 17:00 WIB</span>
            </div>

            {/* Swiss bottom index mark */}
            <div className={styles.infoFootnote}>
              <span>Est. 2018</span>
              <span>Prudential Tower, L19</span>
            </div>

          </div>

        </aside>
      </div>

    </div>
  );
}
