import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { person, site, socials } from './src/data/portfolio.js';

// Builds everything search engines and link previews need (page title,
// description, share image, sitemap, robots.txt, app manifest) straight from
// src/data/portfolio.js, so there is only one place to edit.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const url = (site.url || '').replace(/\/$/, '');

const seoPlugin = () => ({
  name: 'portfolio-seo',

  buildStart() {
    const pub = path.resolve(process.cwd(), 'public');
    fs.writeFileSync(path.join(pub, 'site.webmanifest'), JSON.stringify({
      name: site.title,
      short_name: person.name,
      icons: [
        { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: site.themeColor,
      background_color: site.themeColor,
      display: 'standalone',
      start_url: '/',
    }, null, 2));
    fs.writeFileSync(path.join(pub, 'robots.txt'),
      `User-agent: *\nAllow: /\n${url ? `\nSitemap: ${url}/sitemap.xml\n` : ''}`);
    const sitemap = path.join(pub, 'sitemap.xml');
    if (url) {
      fs.writeFileSync(sitemap,
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${url}/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`);
    } else if (fs.existsSync(sitemap)) {
      fs.unlinkSync(sitemap);
    }
  },

  transformIndexHtml(html) {
    const tags = [
      `<title>${esc(site.title)}</title>`,
      `<meta name="description" content="${esc(site.description)}" />`,
      `<meta name="keywords" content="${esc(site.keywords.join(', '))}" />`,
      `<meta name="author" content="${esc(person.name)}" />`,
      `<meta name="robots" content="index, follow, max-image-preview:large" />`,
      `<meta name="theme-color" content="${esc(site.themeColor)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${esc(person.name)}" />`,
      `<meta property="og:title" content="${esc(site.title)}" />`,
      `<meta property="og:description" content="${esc(site.description)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(site.title)}" />`,
      `<meta name="twitter:description" content="${esc(site.description)}" />`,
    ];
    if (url) {
      tags.push(
        `<link rel="canonical" href="${url}/" />`,
        `<meta property="og:url" content="${url}/" />`,
        `<meta property="og:image" content="${url}/og-image.jpg" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${esc(person.name)} — ${esc(person.jobTitle)}" />`,
        `<meta name="twitter:image" content="${url}/og-image.jpg" />`,
      );
    }
    const person_ld = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: person.name,
      jobTitle: person.jobTitle,
      ...(url ? { url: `${url}/`, image: `${url}/og-image.jpg` } : {}),
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'American International University-Bangladesh' },
      worksFor: { '@type': 'CollegeOrUniversity', name: 'Qatar University' },
      knowsAbout: site.keywords,
      sameAs: socials.map((s) => s.href),
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(person_ld)}</script>`);

    const noscript = `<noscript><div style="font-family:system-ui,sans-serif;color:#EDE8DF;padding:40px;max-width:640px"><h1>${esc(person.name)}</h1><p>${esc(site.description)}</p><p><a style="color:#FF5B1F" href="mailto:${esc(person.email)}">${esc(person.email)}</a>${socials.map((s) => ` · <a style="color:#FF5B1F" href="${esc(s.href)}">${esc(s.label)}</a>`).join('')}</p></div></noscript>`;

    return html
      .replace('<!--SEO-->', tags.join('\n  '))
      .replace('<!--NOSCRIPT-->', noscript);
  },
});

export default defineConfig({
  plugins: [react(), seoPlugin()],
});
