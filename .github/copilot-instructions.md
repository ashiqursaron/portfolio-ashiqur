# Portfolio project instructions

- Read `README.md` for the project overview and local development commands. Read `src/data/portfolio.js` before changing profile or portfolio content; it is the source of truth for the content displayed by the site.
- Prefer updating the existing data entries when changing text, links, projects, publications, experience, or profile details. Preserve the data shape expected by the components in `src/kinetic/`.
- For UI or behavior changes, inspect the relevant components and styles in `src/kinetic/` and follow their existing React and CSS patterns. Keep the portfolio responsive and consistent with its current visual design.
- Put public images and documents under `public/`; reference them with root-relative URLs such as `/projects/example.png`. Do not add credentials or private keys to client-side code.
- `vite.config.js` generates search metadata and files such as `robots.txt`, `sitemap.xml`, and `site.webmanifest` from the portfolio data during a build. Update their source configuration rather than editing generated output directly.
- Keep personal, publication, and project claims accurate; do not invent facts, metrics, links, or credentials.
- Run `npm run build` after code or content changes that affect the site. Update the README when setup, build, deployment, or content-editing workflows change.
