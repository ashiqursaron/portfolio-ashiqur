# Ashiqur Rahman Saron — Portfolio

## The one rule

**Everything you see on the site lives in one file: `src/data/portfolio.js`.**
You never need to touch any other file to change your content.

Open it in any text editor (VS Code is free and works well). It is organised in
numbered sections with plain-English comments:

| Section | What it controls |
|---|---|
| 1 · You | Name, email, location, photo, CV file, social links |
| 2 · Site settings | Browser-tab title, Google description, your website address |
| 3 · Homepage top | The big headline, intro sentence, spinning badge, "hello" screen, tool ribbon, statement paragraph |
| 4 · Selected work | The sideways-scrolling project cards + the "Also on the bench" list |
| 5 · Numbers | The four big counters |
| 6 · Story | Education & experience timeline, research interests |
| 7 · Publications | Your papers |
| 8 · Recognition | Awards, certifications, referee quotes |
| 9 · Contact form | Topics in the form, optional EmailJS keys |

### Common jobs

**Add a paper** → in section 7, copy one `{ ... },` block, paste it where you
want it, change the words. Order on the page = order in the file.

**Remove anything** → delete its whole `{ ... },` block (including the comma).

**Highlight words in orange** → wrap them in `*stars*` (headline, intro sentence,
statement paragraph).

**Hide something** → set its text to `''`. For example `cv: ''` hides the
Download CV button; `showClock: false` hides the live clock.

**Add a project screenshot** → put the image in `public/projects/`
(e.g. `dragon-news.png`), then in that project's block write
`image: '/projects/dragon-news.png'`. Cards without an image look fine too.

**Change your photo** → replace `public/images/portrait.jpg` (square, face centred),
or save a new file and update `photo:` in section 1.

**Update your CV** → replace `public/Ashiqur_Rahman_Saron_CV.pdf` with the new file
(keep the same name), or change `cv:` in section 1.

> If the page goes blank after an edit, a quote, comma or bracket was probably
> deleted by accident. Undo (Ctrl/Cmd + Z) and retry. The terminal will also print
> the exact line with the problem.

## Run it on your computer

You need [Node.js](https://nodejs.org) (the LTS version) once.

```bash
npm install     # first time only
npm run dev     # opens a live preview — edits appear instantly
```

## Put it online

```bash
npm run build   # creates the finished site in the "dist" folder
```

Upload the `dist` folder to any static host. The easiest options:

- **Firebase Hosting / Netlify / Vercel / Cloudflare Pages** — drag-and-drop or connect the repo; build command `npm run build`, publish folder `dist`.
- **GitHub Pages** — `npm run deploy` (needs this folder to be a GitHub repo).

Once you know your address, put it in `site.url` (section 2), e.g.
`'https://ashiqursaron.web.app'`, and rebuild. That switches on link previews
(LinkedIn/WhatsApp/Slack show your card image) and the sitemap for Google.

## Make the contact form send straight to your inbox (optional, free)

Until you do this, the form still works: pressing **Send note** opens the
visitor's email app with the message ready to send to you.

To get messages without an email app:

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. **Email Services** → add your Gmail → copy the **Service ID**.
3. **Email Templates** → create a template that uses these variables:
   `{{from_name}}`, `{{user_email}}`, `{{message}}` (set "Reply-To" to `{{user_email}}`)
   → copy the **Template ID**.
4. **Account** → copy your **Public Key**.
5. Paste the three values into `contact.emailjs` in section 9. Done.

(The public key is designed to be visible in a website — it is safe to commit.)

## What changed from the original zip

- **One data file** replaces the CMS and the many files that held text.
- **Removed Sanity CMS** — it was connected to the previous owner's account, so your
  site would have shown *his* content and you could not have edited it.
- **Removed the previous owner's EmailJS keys** — the contact form would have
  emailed *him*, not you.
- **Removed the "classic" design** and the 3D/particle libraries — the new design is
  now the only one. The site is now much lighter (≈ 82 KB of JavaScript, gzipped)
  and far easier to maintain. The original zip still has it if you ever want it back.
- New sections for **publications, awards, certifications and referees**.
- Page title, Google/LinkedIn preview tags, favicon, share image, sitemap and
  `robots.txt` are all generated from your data file.

## Files you can ignore

`public/site.webmanifest`, `public/robots.txt` and `public/sitemap.xml` are rewritten
automatically on every build from `src/data/portfolio.js` — don't edit them by hand.
Everything under `src/kinetic/` is the design itself.
