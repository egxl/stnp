'use client';

import { useState } from 'react';
import { firmInfo } from '@/lib/data/team';
import GrainientDynamic from '@/components/Grainient/GrainientDynamic';
import styles from './page.module.css';

export default function ContactPage() {
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
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
    <main className={styles.main}>
      {/* ── Grainient WebGL Background ────────────────────────────────────── */}
      <GrainientDynamic
        timeSpeed={0.15}
        warpSpeed={1.2}
        noiseScale={2.5}
        blendSoftness={0.1}
        warpAmplitude={60}
        opacity={0.35}
      />
      <div className={styles.noiseOverlay} aria-hidden="true" />

      {/* ── Hero Statement ────────────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Contact</span>
            <h1 className={styles.heroTitle}>
              Let&apos;s Start&nbsp;a<br />
              <em className={styles.heroTitleItalic}>Conversation</em>
            </h1>
            <p className={styles.heroSubtitle}>
              We believe a strong relationship begins with clear communication.
              Reach out — our legal team responds within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Contact Zone ─────────────────────────────────────────────── */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactLayout}>

            {/* ── Glass Form Panel ──────────────────────────────────────── */}
            <div className={styles.formPanel}>
              <div className={styles.formPanelHeader}>
                <span className={styles.formEyebrow}>Send a Message</span>
              </div>

              {status === 'success' && (
                <div className={styles.successMsg} role="status">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" />
                    <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>Message received. We&apos;ll be in touch within one business day.</p>
                </div>
              )}

              {status === 'error' && (
                <div className={styles.errorMsg} role="alert">
                  <p>Something went wrong. Please try again or email us directly at <a href={`mailto:${email}`}>{email}</a>.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-name" className={styles.label}>Full Name <span className={styles.required}>*</span></label>
                    <input
                      id="contact-name"
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
                    <label htmlFor="contact-email" className={styles.label}>Email <span className={styles.required}>*</span></label>
                    <input
                      id="contact-email"
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
                    <label htmlFor="contact-phone" className={styles.label}>Phone</label>
                    <input
                      id="contact-phone"
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
                    <label htmlFor="contact-subject" className={styles.label}>Subject <span className={styles.required}>*</span></label>
                    <input
                      id="contact-subject"
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
                  <label htmlFor="contact-message" className={styles.label}>Message <span className={styles.required}>*</span></label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Please describe your legal matter…"
                  />
                </div>

                <div className={styles.formFooter}>
                  <button
                    type="submit"
                    id="contact-submit"
                    className={styles.submitBtn}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className={styles.spinnerDot} aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>Send Message <span className={styles.btnArrow} aria-hidden="true">→</span></>
                    )}
                  </button>
                  <p className={styles.formDisclaimer}>All enquiries are treated in strict confidence.</p>
                </div>
              </form>
            </div>

            {/* ── Contact Manifest (Typographic Sidebar) ─────────────────── */}
            <aside className={styles.contactManifest} aria-label="Contact information">

              <div className={styles.manifestBlock}>
                <span className={styles.manifestLabel}>Office</span>
                <address className={styles.manifestAddress}>
                  <span className={styles.manifestLine}>{address.line1}</span>
                  <span className={styles.manifestLine}>{address.line2}</span>
                  <span className={styles.manifestLine}>{address.city}, {address.postal}</span>
                  <span className={styles.manifestLine}>{address.country}</span>
                </address>
                <button
                  type="button"
                  onClick={() => setShowMap(v => !v)}
                  className={styles.mapToggle}
                  aria-expanded={showMap}
                  aria-controls="map-embed"
                >
                  {showMap ? 'Hide map' : 'View on map'} <span className={styles.mapToggleArrow} aria-hidden="true">{showMap ? '↑' : '↓'}</span>
                </button>
              </div>

              <div className={styles.manifestDivider} aria-hidden="true" />

              <div className={styles.manifestBlock}>
                <span className={styles.manifestLabel}>Phone</span>
                {phone.map((p, i) => (
                  <a key={i} href={`tel:${p.replace(/\s/g, '')}`} className={styles.manifestValue}>
                    {p}
                  </a>
                ))}
              </div>

              <div className={styles.manifestDivider} aria-hidden="true" />

              <div className={styles.manifestBlock}>
                <span className={styles.manifestLabel}>Email</span>
                <a href={`mailto:${email}`} className={styles.manifestValueAccent}>
                  {email}
                </a>
              </div>

              <div className={styles.manifestDivider} aria-hidden="true" />

              <div className={styles.manifestBlock}>
                <span className={styles.manifestLabel}>Hours</span>
                <span className={styles.manifestValue}>Monday — Friday</span>
                <span className={styles.manifestValue}>09:00 — 17:00 WIB</span>
              </div>

            </aside>
          </div>

          {/* ── Map Embed (collapsible, preserved per request) ───────────── */}
          <div
            id="map-embed"
            className={`${styles.mapWrapper} ${showMap ? styles.mapWrapperVisible : ''}`}
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
      </section>
    </main>
  );
}
