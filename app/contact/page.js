'use client';

import { useState } from 'react';
import { firmInfo } from '@/lib/data/team';

export default function ContactPage() {
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
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

  const address = firmInfo.address;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary" style={{ padding: `calc(var(--nav-height) + var(--space-3xl)) 0 var(--space-3xl)` }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(44,95,124,0.2),transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(196,163,90,0.08),transparent_50%)]" />
        <div className="container">
          <div className="relative z-[1]">
            <span className="text-xs text-accent tracking-[0.1em] uppercase block mb-4">Home / Contact</span>
            <h1 className="text-[var(--text-h1)] text-white mb-4">Contact Us</h1>
            <p className="text-lg text-white/60 max-w-[500px]">
              Get in touch with our legal team for a consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-24 max-md:gap-12 items-start">
            {/* Form */}
            <div>
              <h2 className="text-[var(--text-h3)] mb-3">Send Us a Message</h2>
              <hr className="divider divider--left" />

              {status === 'success' && (
                <div className="flex gap-4 items-start p-6 bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.2)] rounded-[var(--radius-md)] mb-6 mt-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[#22c55e]">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" />
                    <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm text-[#166534] m-0">Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.</p>
                </div>
              )}

              {status === 'error' && (
                <div className="p-6 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-[var(--radius-md)] mb-6 mt-6">
                  <p className="text-sm text-[#991b1b] m-0">Something went wrong. Please try again or email us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-sm font-medium text-text-body">Full Name *</label>
                    <input
                      id="contact-name" name="name" type="text" required
                      value={formData.name} onChange={handleChange}
                      className="px-4 py-3 font-[family-name:var(--font-body)] text-base text-text-body bg-bg border border-border rounded-[var(--radius-sm)] outline-none transition-all duration-150 focus:border-accent focus:shadow-[0_0_0_3px_rgba(196,163,90,0.1)] placeholder:text-text-light"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-sm font-medium text-text-body">Email *</label>
                    <input
                      id="contact-email" name="email" type="email" required
                      value={formData.email} onChange={handleChange}
                      className="px-4 py-3 font-[family-name:var(--font-body)] text-base text-text-body bg-bg border border-border rounded-[var(--radius-sm)] outline-none transition-all duration-150 focus:border-accent focus:shadow-[0_0_0_3px_rgba(196,163,90,0.1)] placeholder:text-text-light"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="text-sm font-medium text-text-body">Phone</label>
                    <input
                      id="contact-phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleChange}
                      className="px-4 py-3 font-[family-name:var(--font-body)] text-base text-text-body bg-bg border border-border rounded-[var(--radius-sm)] outline-none transition-all duration-150 focus:border-accent focus:shadow-[0_0_0_3px_rgba(196,163,90,0.1)] placeholder:text-text-light"
                      placeholder="+62 xxx xxxx xxxx"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-subject" className="text-sm font-medium text-text-body">Subject *</label>
                    <input
                      id="contact-subject" name="subject" type="text" required
                      value={formData.subject} onChange={handleChange}
                      className="px-4 py-3 font-[family-name:var(--font-body)] text-base text-text-body bg-bg border border-border rounded-[var(--radius-sm)] outline-none transition-all duration-150 focus:border-accent focus:shadow-[0_0_0_3px_rgba(196,163,90,0.1)] placeholder:text-text-light"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-sm font-medium text-text-body">Message *</label>
                  <textarea
                    id="contact-message" name="message" required rows={6}
                    value={formData.message} onChange={handleChange}
                    className="px-4 py-3 font-[family-name:var(--font-body)] text-base text-text-body bg-bg border border-border rounded-[var(--radius-sm)] outline-none resize-y min-h-[140px] transition-all duration-150 focus:border-accent focus:shadow-[0_0_0_3px_rgba(196,163,90,0.1)] placeholder:text-text-light"
                    placeholder="Please describe your legal matter..."
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn--primary self-start min-w-[180px] disabled:opacity-70 disabled:cursor-not-allowed disabled:!transform-none"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Info Sidebar */}
            <div className="flex flex-col gap-8">
              <div className="p-8 bg-bg-alt rounded-[var(--radius-md)] border border-border-light">
                <h3 className="font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.1em] text-primary mb-4 pb-3 border-b-2 border-accent inline-block">
                  Office Address
                </h3>
                <address className="not-italic text-base leading-[1.7] text-text-muted">
                  {address.line1}<br />
                  {address.line2}<br />
                  {address.city}, {address.postal}<br />
                  {address.country}
                </address>
              </div>

              <div className="p-8 bg-bg-alt rounded-[var(--radius-md)] border border-border-light">
                <h3 className="font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.1em] text-primary mb-4 pb-3 border-b-2 border-accent inline-block">
                  Phone
                </h3>
                {firmInfo.phone.map((p, i) => (
                  <p key={i} className="text-base text-text-muted my-0.5">{p}</p>
                ))}
              </div>

              <div className="p-8 bg-bg-alt rounded-[var(--radius-md)] border border-border-light">
                <h3 className="font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.1em] text-primary mb-4 pb-3 border-b-2 border-accent inline-block">
                  Email
                </h3>
                <a href={`mailto:${firmInfo.email}`} className="text-base text-steel font-medium hover:text-accent">
                  {firmInfo.email}
                </a>
              </div>

              <div className="p-8 bg-bg-alt rounded-[var(--radius-md)] border border-border-light">
                <h3 className="font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.1em] text-primary mb-4 pb-3 border-b-2 border-accent inline-block">
                  Office Hours
                </h3>
                <p className="text-base text-text-muted my-0.5">Monday — Friday</p>
                <p className="text-base text-text-muted my-0.5">09:00 — 17:00 WIB</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
