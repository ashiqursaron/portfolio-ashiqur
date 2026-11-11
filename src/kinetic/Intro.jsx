import { useCallback, useEffect, useRef, useState } from 'react';
import './intro.css';
import { markIntroSeen } from './introGate';
import { track } from '../lib/analytics';
import { introWords as WORDS, person } from '../data/portfolio';

// "Hello, in my languages" — plays once per browser session, skippable,
// and never for people who've asked their device for reduced motion.
// The words live in src/data/portfolio.js.
const EXIT_MS = 1100;
const SCRIPT_FONTS = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@500&display=swap';

export default function Intro({ onReveal, onDone }) {
  const [i, setI] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef([]);
  const finished = useRef(false);

  const leave = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    timers.current.forEach(clearTimeout);
    markIntroSeen();
    setLeaving(true);
    onReveal?.();
    timers.current = [setTimeout(() => onDone?.(), EXIT_MS)];
  }, [onReveal, onDone]);

  useEffect(() => {
    if (!document.querySelector('link[data-kx-script-fonts]')) {
      const l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = SCRIPT_FONTS; l.dataset.kxScriptFonts = '';
      document.head.appendChild(l);
    }
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';

    let at = 0;
    WORDS.forEach((w, idx) => {
      if (idx > 0) timers.current.push(setTimeout(() => setI(idx), at));
      at += w.ms || 300;
    });
    timers.current.push(setTimeout(leave, at));

    const onKey = () => { track('intro_skipped', { via: 'key' }); leave(); };
    window.addEventListener('keydown', onKey);
    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener('keydown', onKey);
      html.style.overflow = prev;
    };
  }, [leave]);

  const w = WORDS[i];
  return (
    <div className={`kx-intro${leaving ? ' is-leaving' : ''}`} onClick={() => { track('intro_skipped', { via: 'click' }); leave(); }} aria-hidden="true">
      <div className="kx-intro__panel">
        <div className="kx-intro__hello">
          <span className="kx-intro__dot" />
          <span key={i} className="kx-intro__word" dir={w.dir || 'ltr'} lang={w.code}>{w.t}</span>
        </div>
        <span className="kx-intro__meta kx-intro__meta--left">{w.lang}</span>
        <span className="kx-intro__meta kx-intro__meta--right">{person.location}</span>
        <span className="kx-intro__skip">click or press any key to skip</span>
      </div>
      <div className="kx-intro__curve" />
    </div>
  );
}
