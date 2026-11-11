import { useState } from 'react';
import { contact, person } from '../data/portfolio';
import { track } from '../lib/analytics';

const TOPICS = contact.topics;
const cfg = contact.emailjs || {};
const canSend = Boolean(cfg.serviceId && cfg.templateId && cfg.publicKey);

// Inline contact form. If EmailJS is set up in src/data/portfolio.js it sends
// straight to your inbox; otherwise it opens the visitor's email app with the
// message pre-filled, so it always works.
export default function ContactForm({ email = person.email }) {
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '', company: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (form.company) { setStatus('sent'); return; } // honeypot: bots fill hidden fields
    if (!canSend) {
      const subject = `[${form.topic}] from ${form.name || 'your website'}`;
      const body = `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`;
      track('contact_form_submit', { topic: form.topic, via: 'mailto' });
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('opened');
      return;
    }
    setStatus('sending');
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        cfg.serviceId,
        cfg.templateId,
        {
          from_name: form.name,
          user_email: form.email,
          message: `[${form.topic}]\n\n${form.message}`,
        },
        { publicKey: cfg.publicKey },
      );
      track('contact_form_submit', { topic: form.topic });
      setStatus('sent');
    } catch (err) {
      console.warn('Contact form failed:', err?.text || err?.message || err);
      track('contact_form_error');
      setStatus('error');
    }
  };

  if (status === 'opened') {
    return (
      <div className="kx-form kx-form--sent" role="status">
        <svg className="kx-form__check" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r="24" />
          <path d="M15 27 l8 8 l15 -17" />
        </svg>
        <p className="kx-form__thanks">Almost there{form.name ? `, ${form.name.split(' ')[0]}` : ''}.</p>
        <p className="kx-form__sub">Your email app should have opened with the note ready to send. If nothing appeared, write to <a href={`mailto:${email}`}><strong>{email}</strong></a>.</p>
        <button type="button" className="kx-form__again" onClick={() => setStatus('idle')}>Back to the form</button>
      </div>
    );
  }

  if (status === 'sent') {
    return (
      <div className="kx-form kx-form--sent" role="status">
        <svg className="kx-form__check" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r="24" />
          <path d="M15 27 l8 8 l15 -17" />
        </svg>
        <p className="kx-form__thanks">Got it{form.name ? `, ${form.name.split(' ')[0]}` : ''}.</p>
        <p className="kx-form__sub">Your note is in my inbox. I’ll write back to <strong>{form.email || 'you'}</strong> soon.</p>
        <button type="button" className="kx-form__again" onClick={() => { setForm({ name: '', email: '', topic: TOPICS[0], message: '', company: '' }); setStatus('idle'); }}>Send another</button>
      </div>
    );
  }

  return (
    <form className={`kx-form${status === 'sending' ? ' is-sending' : ''}`} onSubmit={submit} noValidate={false}>
      <div className="kx-form__row">
        <label className="kx-field">
          <input type="text" name="from_name" required placeholder=" " value={form.name} onChange={set('name')} autoComplete="name" />
          <span className="kx-field__label">Your name</span>
          <span className="kx-field__line" aria-hidden="true" />
        </label>
        <label className="kx-field">
          <input type="email" name="user_email" required placeholder=" " value={form.email} onChange={set('email')} autoComplete="email" />
          <span className="kx-field__label">Your email</span>
          <span className="kx-field__line" aria-hidden="true" />
        </label>
      </div>

      <fieldset className="kx-topics">
        <legend className="kx-field__legend">What’s it about?</legend>
        <div className="kx-topics__list">
          {TOPICS.map((t) => (
            <label key={t} className={`kx-chip${form.topic === t ? ' is-on' : ''}`}>
              <input type="radio" name="topic" value={t} checked={form.topic === t} onChange={set('topic')} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="kx-field kx-field--area">
        <textarea name="message" required rows={4} placeholder=" " value={form.message} onChange={set('message')} />
        <span className="kx-field__label">Tell me a little about it</span>
        <span className="kx-field__line" aria-hidden="true" />
      </label>

      {/* honeypot — hidden from people, irresistible to bots */}
      <input className="kx-hp" type="text" name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} aria-hidden="true" />

      <div className="kx-form__foot">
        <button type="submit" className="kx-send" disabled={status === 'sending'}>
          <span className="kx-send__label">{status === 'sending' ? 'Sending' : 'Send note'}</span>
          <span className="kx-send__icon" aria-hidden="true">{status === 'sending' ? <i className="kx-dots"><b /><b /><b /></i> : '→'}</span>
        </button>
        {status === 'error'
          ? <p className="kx-form__err" role="alert">That didn’t go through. Try again, or email me directly at <a href={`mailto:${email}`}>{email}</a>.</p>
          : <p className="kx-form__note">{canSend ? 'Goes straight to my inbox — no newsletter, no spam.' : 'Opens your email app with the note ready to send.'}</p>}
      </div>
    </form>
  );
}
