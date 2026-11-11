import { useCallback, useEffect, useMemo, useState } from 'react';
import './kinetic.css';
import Intro from './Intro';
import ContactForm from './ContactForm';
import { Scramble, RollLink, Letters, CountUp, IntroText } from './TextFx';
import { shouldPlayIntro } from './introGate';
import { asset } from '../lib/asset';
import {
  person, socials, hero, stack, manifesto, featured, bench, numbers,
  timeline, storyPhoto, interests, publications, awards, certifications,
  recommendations, contact,
} from '../data/portfolio';

const FONTS_HREF = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=JetBrains+Mono:wght@400;500&display=swap';

// Non-blocking font load (a CSS @import would hold up the whole stylesheet).
const useKineticFonts = () => {
  useEffect(() => {
    if (document.querySelector('link[data-kx-fonts]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONTS_HREF;
    link.dataset.kxFonts = '';
    document.head.appendChild(link);
  }, []);
};

const useClock = () => {
  const fmt = () => {
    try {
      return new Date().toLocaleTimeString('en-GB', { timeZone: person.timeZone, hour: '2-digit', minute: '2-digit' });
    } catch { return '—'; }
  };
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 20000);
    return () => clearInterval(id);
  }, []);
  return t;
};

// Header turns into frosted glass once you scroll, and flips to a light
// glass with dark text while it sits over the cream "Say hello" section.
const useBarState = () => {
  const [state, setState] = useState({ scrolled: false, light: false });
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const hello = document.getElementById('kx-hello');
      const next = {
        scrolled: window.scrollY > 24,
        light: hello ? hello.getBoundingClientRect().top <= 38 : false,
      };
      setState((prev) => (prev.scrolled === next.scrolled && prev.light === next.light ? prev : next));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return state;
};

// Timeline roles stack up as you scroll; mark the ones that have been
// covered by a newer role so CSS can dim them.
const useTimelineStack = () => {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const els = [...document.querySelectorAll('.kx-timeline__item')];
      const desktop = window.innerWidth >= 900;
      const stuck = els.map((el) => desktop && el.getBoundingClientRect().top <= parseFloat(getComputedStyle(el).top) + 1);
      els.forEach((el, i) => { el.dataset.past = stuck[i + 1] ? 'true' : 'false'; });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
};

const Mono = ({ children, className = '' }) => <span className={`kx-mono ${className}`}>{children}</span>;

const city = person.location.split(',')[0];

// *starred* words in the manifesto become orange.
const parseStars = (text) => {
  let on = false;
  return text.split(/\s+/).filter(Boolean).map((tok) => {
    if (tok.startsWith('*')) on = true;
    const hl = on;
    if (tok.endsWith('*')) on = false;
    return { w: tok.replace(/\*/g, ''), hl };
  });
};

// One headline line: {photo} → round photo, *stars* → orange light weight.
const HeadlineLine = ({ line }) => (
  <>
    {line.split(/(\{photo\}|\*[^*]+\*)/).filter(Boolean).map((part, i) => {
      if (part === '{photo}') return <img key={i} className="kx-hero__pill" src={asset(person.photo)} alt={person.photoAlt} />;
      if (part.startsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
      return <span key={i} className="kx-hero__text">{part}</span>;
    })}
  </>
);

const WorkCard = ({ item, index = 0 }) => {
  const no = String(index + 1).padStart(2, '0');
  if (item.points) {
    return (
      <article className="kx-card kx-card--accent" style={{ '--i': index }}>
        <Mono>{no} / {item.eyebrow}</Mono>
        <h3 className="kx-card__huge">{item.title}</h3>
        <div className="kx-card__points">
          {item.points.map((p) => <span key={p}>{p}</span>)}
        </div>
      </article>
    );
  }
  const tone = item.tone || (index % 2 === 0 ? 'dark' : 'light');
  return (
    <article className={`kx-card kx-card--${tone}${item.image ? '' : ' kx-card--noimg'}`} style={{ '--i': index }}>
      <div className="kx-card__text">
        <div className="kx-card__head">
          <Mono className="kx-card__eyebrow">{no} / {item.eyebrow}</Mono>
          <h3 className="kx-card__title">{item.title}</h3>
          <p className="kx-card__body">{item.body}</p>
        </div>
        {item.stats?.length > 0 && (
          <div className="kx-card__stats">
            {item.stats.map(([n, l]) => (
              <div key={l}><span className="kx-card__stat">{n}</span><span className="kx-card__label">{l}</span></div>
            ))}
          </div>
        )}
        <div className="kx-card__foot">
          <Mono className="kx-card__stack">{item.stack}</Mono>
          {item.link?.href && <a className="kx-pill" href={item.link.href} target="_blank" rel="noreferrer" data-track="project_click" data-track-name={item.title}>{item.link.label}</a>}
        </div>
      </div>
      {item.image && (
        <div className="kx-card__media">
          <img src={asset(item.image)} alt={`${item.title} screenshot`} loading="lazy" />
        </div>
      )}
    </article>
  );
};

const Item = ({ it }) => {
  const inner = (
    <>
      <Mono className="kx-item__when">{it.when}</Mono>
      <span className="kx-item__main">
        <span className="kx-item__title">{it.title}</span>
        <span className="kx-item__by">{it.by}</span>
      </span>
      <span className="kx-item__arrow" aria-hidden="true">{it.link ? '↗' : ''}</span>
    </>
  );
  return (
    <li className="kx-item">
      {it.link
        ? <a href={it.link} target="_blank" rel="noreferrer" className="kx-item__row" data-track="credential_click" data-track-name={it.title}>{inner}</a>
        : <div className="kx-item__row">{inner}</div>}
    </li>
  );
};

const years = publications.map((p) => Number(p.year)).filter(Boolean);
const yearSpan = years.length ? `${Math.min(...years)} → ${Math.max(...years)}` : '';
const canSendForm = Boolean(contact.emailjs?.serviceId && contact.emailjs?.templateId && contact.emailjs?.publicKey);

export default function KineticApp() {
  useKineticFonts();
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);      // overlay mounted
  const [holding, setHolding] = useState(showIntro);                // hero entrance paused
  const reveal = useCallback(() => setHolding(false), []);
  const done = useCallback(() => setShowIntro(false), []);
  const time = useClock();
  const bar = useBarState();
  useTimelineStack();
  const words = useMemo(() => parseStars(manifesto), []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-ui', 'kinetic');
    return () => html.removeAttribute('data-ui');
  }, []);

  return (
    <div className={`kx${holding ? ' kx--intro' : ''}`}>
      {showIntro && <Intro onReveal={reveal} onDone={done} />}
      <a className="kx-skip" href="#kx-work">Skip to work</a>
      <div className="kx-progress" aria-hidden="true" />
      <div className="kx-progress-head" aria-hidden="true">
        <svg viewBox="0 0 12 12" width="12" height="12"><path d="M1 1.5 10.5 6 1 10.5 3.5 6z" fill="currentColor" /></svg>
      </div>

      <header className={`kx-bar${bar.scrolled ? ' is-scrolled' : ''}${bar.light ? ' is-light' : ''}`}>
        <a href="#kx-top" className="kx-bar__mark" aria-label={`${person.name}, back to top`}>{person.initials}<span>—</span></a>
        <nav aria-label="Primary" className="kx-bar__nav">
          <RollLink href="#kx-work">Work</RollLink>
          <RollLink href="#kx-story">Story</RollLink>
          <RollLink href="#kx-research">Research</RollLink>
          <RollLink href="#kx-hello">Hello</RollLink>
        </nav>
        <div className="kx-bar__right">
          {person.showClock && <Mono className="kx-bar__clock">{person.location} · {time}</Mono>}
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="kx-top" className="kx-hero">
          <div className="kx-hero__title-wrap">
            <h1 className="kx-hero__title">
              {hero.headline.map((line) => (
                <span key={line} className="kx-line"><span><HeadlineLine line={line} /></span></span>
              ))}
            </h1>
            <p className="kx-hero__intro"><IntroText text={hero.intro} /></p>
          </div>
          <div className="kx-hero__foot">
            <div className="kx-hero__scroll">
              <Mono>(scroll)</Mono>
              <svg width="16" height="40" viewBox="0 0 16 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><path d="M8 1v37M2 32l6 6 6-6" /></svg>
            </div>
            {hero.badge && (
              <div className="kx-badge" aria-label={hero.badge}>
                <svg className="kx-badge__ring" viewBox="0 0 150 150" aria-hidden="true">
                  <defs><path id="kx-circle" d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" /></defs>
                  <text><textPath href="#kx-circle" textLength="358" lengthAdjust="spacing">{`${hero.badge} · `}</textPath></text>
                </svg>
                <span className="kx-badge__dot" />
              </div>
            )}
          </div>
        </section>

        {/* MARQUEE */}
        <div className="kx-marquee" aria-label={`Tools I reach for: ${stack.join(', ')}`}>
          <div className="kx-marquee__band">
            <div className="kx-marquee__track" aria-hidden="true">
              {[...stack, ...stack].map((s, i) => (
                <span key={i} className="kx-marquee__item">{s}<span className="kx-marquee__star">✺</span></span>
              ))}
            </div>
          </div>
        </div>

        {/* MANIFESTO */}
        <section id="kx-story" className="kx-manifesto">
          <Mono className="kx-label"><Scramble text="(01) What I care about" /></Mono>
          <p className="kx-manifesto__text">
            {words.map((w, i) => (
              <span key={i} className={`kx-word${w.hl ? ' is-hl' : ''}`}>{w.w}</span>
            ))}
          </p>
        </section>

        {/* PINNED HORIZONTAL WORK */}
        <section id="kx-work" className="kx-gallery" style={{ '--cards': featured.length }}>
          <div className="kx-gallery__pin">
            <div className="kx-gallery__head">
              <Mono className="kx-label"><Scramble text="(02) Selected work" /> <span className="kx-hide-sm">— keep scrolling, it moves sideways</span></Mono>
              <Mono className="kx-label"><Scramble text={yearSpan} /></Mono>
            </div>
            <div className="kx-gallery__track">
              {featured.map((w, i) => <WorkCard key={w.title} item={w} index={i} />)}
            </div>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="kx-numbers" aria-label="By the numbers">
          <Mono className="kx-label"><Scramble text="(03) The numbers, since people ask" /></Mono>
          <div className="kx-numbers__grid">
            {numbers.map(([n, sfx, l]) => (
              <div key={l} className="kx-num kx-pop">
                <span className="kx-num__value"><CountUp value={n} /><span>{sfx}</span></span>
                <span className="kx-num__label">{l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* STORY */}
        <section className="kx-story">
          <div className="kx-story__aside">
            <Mono className="kx-label"><Scramble text="(04) The path so far" /></Mono>
            {storyPhoto.src ? (
              <figure className="kx-story__photo kx-clip">
                <img className="kx-para" src={asset(storyPhoto.src)} alt={storyPhoto.alt} loading="lazy" />
                {storyPhoto.caption && <figcaption>{storyPhoto.caption}</figcaption>}
              </figure>
            ) : (
              <div className="kx-interests">
                <Mono className="kx-label kx-label--sm">Research interests</Mono>
                <ul>{interests.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            )}
          </div>
          <ol className="kx-timeline">
            <span className="kx-timeline__line" aria-hidden="true" />
            {timeline.map((t, i) => (
              <li key={t.role} className="kx-timeline__item kx-pop" style={{ '--i': i }}>
                <div className="kx-timeline__inner">
                  <Mono className="kx-timeline__when">{t.when}</Mono>
                  <h3 className="kx-reveal">{t.role}</h3>
                  <p>{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* RESEARCH */}
        <section id="kx-research" className="kx-pubs">
          <div className="kx-pubs__head">
            <h2 className="kx-drift"><span className="kx-reveal">Research &amp; publications</span></h2>
            <Mono className="kx-label">(05) {publications.length} papers · {yearSpan}</Mono>
          </div>
          <ul className="kx-pubs__list">
            {publications.map((p) => {
              const inner = (
                <>
                  <Mono className="kx-pub__year">{p.year}</Mono>
                  <span className="kx-pub__main">
                    <span className="kx-pub__title">{p.title}</span>
                    {p.summary && <span className="kx-pub__summary">{p.summary}</span>}
                    <Mono className="kx-pub__venue">{p.venue}</Mono>
                  </span>
                  <span className="kx-pub__arrow" aria-hidden="true">{p.link ? '→' : ''}</span>
                </>
              );
              return (
                <li key={p.title} className="kx-pub kx-reveal-row">
                  {p.link
                    ? <a href={p.link} target="_blank" rel="noreferrer" className="kx-pub__row" data-track="paper_click" data-track-name={p.title}>{inner}</a>
                    : <div className="kx-pub__row">{inner}</div>}
                </li>
              );
            })}
          </ul>
        </section>

        {/* RECOGNITION */}
        <section id="kx-recognition" className="kx-recog">
          <Mono className="kx-label"><Scramble text="(06) Recognition" /></Mono>
          <div className="kx-recog__cols">
            <div>
              <h3>Honours &amp; awards</h3>
              <ul>{awards.map((a) => <Item key={a.title} it={a} />)}</ul>
            </div>
            <div>
              <h3>Certifications</h3>
              <ul>{certifications.map((a) => <Item key={a.title} it={a} />)}</ul>
            </div>
          </div>
          {recommendations.length > 0 && (
            <div className="kx-quotes">
              {recommendations.map((r) => (
                <figure key={r.name} className="kx-quote kx-pop">
                  <blockquote>“{r.quote}”</blockquote>
                  <figcaption><strong>{r.name}</strong><Mono>{r.role}</Mono></figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>

        {/* BENCH */}
        {bench.length > 0 && (
          <section id="kx-bench" className="kx-bench">
            <div className="kx-bench__head">
              <h2 className="kx-drift"><span className="kx-reveal">Also on the bench</span></h2>
              {socials.find((s) => /github/i.test(s.label)) && (
                <a className="kx-mono" href={socials.find((s) => /github/i.test(s.label)).href} target="_blank" rel="noreferrer">
                  {socials.find((s) => /github/i.test(s.label)).href.replace(/^https?:\/\//, '')} ↗
                </a>
              )}
            </div>
            <ul className="kx-bench__list">
              {bench.map((b) => (
                <li key={b.title} className="kx-row kx-reveal-row">
                  <a href={b.href} target="_blank" rel="noreferrer" className="kx-row__title" data-track="project_click" data-track-name={b.title}>{b.title}</a>
                  <Mono className="kx-row__cat">{b.category}</Mono>
                  <span className="kx-row__arrow" aria-hidden="true">→</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* HELLO */}
        <section id="kx-hello" className="kx-hello">
          <Mono className="kx-label kx-label--ink"><Scramble text={`(07) ${contact.heading}`} /></Mono>
          <a href={`mailto:${person.email}`} className="kx-hello__big" data-track="contact_click" data-track-method="email_big" aria-label="Say hello — email me"><Letters text="Say " /><em><Letters text="hello" /></em><span className="kx-letter kx-letter--arrow" aria-hidden="true">→</span></a>
          <div className="kx-hello__compose">
            <div className="kx-hello__lede">
              <Mono className="kx-label kx-label--ink"><Scramble text="Or leave a note right here" /></Mono>
              <p>{canSendForm ? 'No email app needed. Tell me what you’re working on and I’ll reply from my own inbox.' : 'Tell me what you’re working on. Your email app will open with the note ready to send.'}</p>
            </div>
            <ContactForm email={person.email} />
          </div>
          <div className="kx-hello__grid">
            <div><Mono className="kx-label kx-label--ink">Email</Mono><a href={`mailto:${person.email}`} data-track="contact_click" data-track-method="email">{person.email}</a></div>
            <div><Mono className="kx-label kx-label--ink">Based in</Mono><span className="kx-hello__loc">{person.location}</span></div>
            <nav aria-label="Social" className="kx-hello__social">
              {socials.map((s) => <RollLink key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</RollLink>)}
            </nav>
            {person.cv && <a className="kx-pill kx-pill--ink" href={asset(person.cv)} download={`${person.name.replace(/\s+/g, '-')}-CV.pdf`} data-track="cv_download">Download CV</a>}
          </div>
          <footer className="kx-hello__foot">
            <Mono>© {new Date().getFullYear()} {person.name}</Mono>
            {person.showClock && <Mono>It’s {time} in {city} right now</Mono>}
            <a href="#kx-top" className="kx-mono">Top ↑</a>
          </footer>
        </section>
      </main>
    </div>
  );
}
