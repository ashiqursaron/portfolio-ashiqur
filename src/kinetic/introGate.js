import { introWords } from '../data/portfolio';

const SEEN_KEY = 'kx-intro-seen';

export const shouldPlayIntro = () => {
  try {
    if (!introWords || introWords.length === 0) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (new URLSearchParams(window.location.search).has('nointro')) return false;
    if (window.location.hash) return false; // deep link: get out of the way
    return sessionStorage.getItem(SEEN_KEY) !== '1';
  } catch {
    return true;
  }
};

export const markIntroSeen = () => {
  try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* private mode */ }
};
