import { useEffect, useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*/<>';
const reduced = () => {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
};

// Text "decodes" from random glyphs into the real words the first time it scrolls into view.
export function Scramble({ text, className = '', duration = 700 }) {
  const ref = useRef(null);
  const [out, setOut] = useState(text);

  useEffect(() => {
    setOut(text);
    const el = ref.current;
    if (!el || reduced() || !('IntersectionObserver' in window)) return undefined;
    let raf = 0;
    let done = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const fixed = Math.floor(p * text.length);
        let s = '';
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          s += i < fixed || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        setOut(s);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      // never leave it half-scrambled (rAF can be throttled in background tabs)
      done = setTimeout(() => { cancelAnimationFrame(raf); setOut(text); }, duration + 120);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(done); setOut(text); };
  }, [text, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="kx-sr">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

// Link whose label rolls up on hover (a copy slides in from below).
export function RollLink({ children, className = '', ...rest }) {
  return (
    <a className={`kx-roll ${className}`} {...rest}>
      <span className="kx-roll__in" data-text={children}>{children}</span>
    </a>
  );
}

// Each letter is its own span so hover can ripple through them.
export function Letters({ text }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span key={i} className="kx-letter" style={{ '--i': i }} aria-hidden="true">{ch === ' ' ? ' ' : ch}</span>
      ))}
    </>
  );
}

// Counts a number up from 0 the first time it scrolls into view.
// Handles "150", "95", "4", "10k", "3.5" — anything that isn't a plain
// number (e.g. "HIPAA") is shown as-is.
export function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null);
  const m = String(value).match(/^(\d+(?:\.\d+)?)(k?)$/i);
  const target = m ? parseFloat(m[1]) : null;
  const decimals = m && m[1].includes('.') ? m[1].split('.')[1].length : 0;
  const [n, setN] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (target === null || !el || reduced() || !('IntersectionObserver' in window)) { setN(target); return undefined; }
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        setN(target * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); setN(target); };
  }, [target, duration]);

  if (target === null) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref} className="kx-count">
      <span className="kx-sr">{value}</span>
      <span aria-hidden="true">{(n ?? target).toFixed(decimals)}{m[2]}</span>
    </span>
  );
}

// Splits text into plain / highlighted segments. *stars* in the text win;
// otherwise the given phrases are matched in order.
const segmentIntro = (text, highlights = []) => {
  if (/\*[^*]+\*/.test(text)) {
    return text.split(/(\*[^*]+\*)/).filter(Boolean).map((part) => (
      part.startsWith('*') && part.endsWith('*') ? { t: part.slice(1, -1), hl: 'bright' } : { t: part }
    ));
  }
  const segs = [];
  let rest = text;
  for (const h of highlights) {
    const at = rest.indexOf(h.t);
    if (at < 0) continue;
    if (at > 0) segs.push({ t: rest.slice(0, at) });
    segs.push({ t: h.t, hl: h.tone || 'bright' });
    rest = rest.slice(at + h.t.length);
  }
  if (rest) segs.push({ t: rest });
  return segs;
};

// Hero intro: words blur up one after another, key phrases brighten and an
// accent underline draws under them.
export function IntroText({ text, highlights }) {
  let w = 0;
  let h = 0;
  const words = (str) => str.split(/(\s+)/).map((tok, k) => (
    /^\s+$/.test(tok) || tok === ''
      ? tok
      : <span key={k} className="kx-iw" style={{ '--i': w++ }}>{tok}</span>
  ));
  return (
    <>
      {segmentIntro(text, highlights).map((seg, idx) => (
        seg.hl
          ? <span key={idx} className={`kx-hl kx-hl--${seg.hl}`} style={{ '--h': h++ }}>{words(seg.t)}</span>
          : <span key={idx}>{words(seg.t)}</span>
      ))}
    </>
  );
}
