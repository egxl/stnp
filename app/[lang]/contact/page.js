'use client';

import { useRef } from 'react';
import { useState } from 'react';
import { firmInfo } from '@/lib/data/team';
import styles from './page.module.css';

export default function ContactV2Page() {
  const [status, setStatus] = useState('idle');
  const mapRef = useRef(null);
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

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const { address, phone, email } = firmInfo;

  return (
    <div className={styles.page}>
      <div className={styles.splitLayout}>

        {/* ── Left: Contact Manifest (sticky, full viewport height) ─── */}
        <aside className={styles.manifestColumn} aria-label="Contact information">

          <div className={styles.manifestInner}>
            <div className={styles.manifestHero}>
              <h1 className={styles.manifestHeadline}>
                Begin with<br />a letter.
              </h1>
              <p className={styles.manifestLead}>
                Every client relationship at STNP starts the same way — a conversation. Write to us and we will respond within one business day.
              </p>
            </div>

            <dl className={styles.manifestList}>

              <div className={styles.manifestEntry}>
                <dt className={styles.manifestTerm}>Office</dt>
                <dd className={styles.manifestDetail}>
                  <address className={styles.inlineAddress}>
                    {address.line1}<br />
                    {address.line2}<br />
                    {address.city}, {address.postal}<br />
                    {address.country}
                  </address>
                  <button
                    type="button"
                    onClick={scrollToMap}
                    className={styles.mapLink}
                    aria-label="Scroll to map"
                  >
                    View on map ↓
                  </button>
                </dd>
              </div>

              <div className={styles.manifestEntry}>
                <dt className={styles.manifestTerm}>Phone</dt>
                <dd className={styles.manifestDetail}>
                  {phone.map((p, i) => (
                    <a key={i} href={`tel:${p.replace(/\s/g, '')}`} className={styles.manifestLink}>
                      {p}
                    </a>
                  ))}
                </dd>
              </div>

              <div className={styles.manifestEntry}>
                <dt className={styles.manifestTerm}>Email</dt>
                <dd className={styles.manifestDetail}>
                  <a href={`mailto:${email}`} className={styles.manifestLinkAccent}>
                    {email}
                  </a>
                </dd>
              </div>

              <div className={styles.manifestEntry}>
                <dt className={styles.manifestTerm}>Hours</dt>
                <dd className={styles.manifestDetail}>
                  <span>Monday — Friday</span>
                  <span>09:00 — 17:00 WIB</span>
                </dd>
              </div>

            </dl>
          </div>

        </aside>

        {/* ── Right: Form + Map (scrollable) ─────────────────────────── */}
        <div className={styles.formColumn}>

          {/* Form section — aims to fill the viewport */}
          <div className={styles.formSection}>

            <div className={styles.formHeader}>
              <span className={styles.formEyebrow}>Write to us</span>
              <div className={styles.formGoldRule} aria-hidden="true" />
            </div>

            {status === 'success' && (
              <div className={styles.successMsg} role="status">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>Message received. We&apos;ll be in touch within one business day.</p>
              </div>
            )}

            {status === 'error' && (
              <div className={styles.errorMsg} role="alert">
                <p>
                  Something went wrong. Email us at{' '}
                  <a href={`mailto:${email}`}>{email}</a>.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form} noValidate>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="v2-name" className={styles.label}>Full Name <span className={styles.req}>*</span></label>
                  <input
                    id="v2-name"
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
                <div className={styles.formGroup}>
                  <label htmlFor="v2-email" className={styles.label}>Email <span className={styles.req}>*</span></label>
                  <input
                    id="v2-email"
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

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="v2-phone" className={styles.label}>Phone</label>
                  <input
                    id="v2-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="+62 xxx xxxx xxxx"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="v2-subject" className={styles.label}>Subject <span className={styles.req}>*</span></label>
                  <input
                    id="v2-subject"
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

              <div className={styles.formGroup}>
                <label htmlFor="v2-message" className={styles.label}>Message <span className={styles.req}>*</span></label>
                <textarea
                  id="v2-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Please describe your legal matter…"
                />
              </div>

              <div className={styles.formFooter}>
                <button
                  type="submit"
                  id="v2-contact-submit"
                  className={styles.submitBtn}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
                <span className={styles.disclaimer}>All enquiries treated in strict confidence.</span>
              </div>

            </form>
          </div>

          {/* ── Map — always loaded, below the form ──────────────────── */}
          <div ref={mapRef} className={styles.mapSection} id="v2-map">
            <div className={styles.mapRule} aria-hidden="true" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.302305370211!2d106.81998357582531!3d-6.20963026094602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5005f6a484f%3A0xa695d1d572dbf6ae!2sSoaloan%20Tua%20Nababan%20%26%20Partners!5e0!3m2!1sen!2sid!4v1712850000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="STNP Office Location — Prudential Tower, Jakarta Selatan"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
