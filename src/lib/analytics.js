// Google Analytics 4 (the same GA4 property Firebase Analytics uses).
// Off unless VITE_GA_MEASUREMENT_ID is set, and never runs in `npm run dev`.
// Page views, scrolls, outbound links and PDF downloads come from GA4's
// "enhanced measurement"; the few custom events below come from
// data-track="event_name" attributes (plus data-track-* params) on elements.
const ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const enabled = () => Boolean(ID) && import.meta.env.PROD && typeof window !== 'undefined';

export function initAnalytics() {
  if (!enabled() || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', ID);

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.appendChild(s);

  document.addEventListener('click', (e) => {
    const el = e.target.closest?.('[data-track]');
    if (!el) return;
    const params = {};
    for (const [k, v] of Object.entries(el.dataset)) {
      if (k.startsWith('track') && k !== 'track') params[k.slice(5).replace(/^./, (c) => c.toLowerCase())] = v;
    }
    track(el.dataset.track, params);
  }, { capture: true });
}

export function track(event, params = {}) {
  if (!enabled() || !window.gtag) return;
  window.gtag('event', event, params);
}
