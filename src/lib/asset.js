// Turns '/images/me.jpg' into the right URL wherever the site is hosted.
// Full web addresses (https://…) are left alone.
export const asset = (path = '') => {
  if (!path || /^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
};
