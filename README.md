# Vishal Dasari Portfolio — Next.js

Static, framework-free HTML/JS site served through Next.js rewrites (so it deploys anywhere Next.js does, with clean URLs).

## Run it

    npm install
    npm run dev

Open http://localhost:3000 — routes: `/`, `/about`, `/experience`, `/certifications`, `/tech-stack`, `/contact`, `/blog`, `/blog/<slug>`.

## Structure

    public/
      home.html / js/home.js           Landing page markup + behavior
      about.html                       (no page-specific JS)
      experience.html / js/experience.js
      certifications.html / js/certifications.js
      tech-stack.html / js/tech-stack.js
      contact.html / js/contact.js
      blog.html / js/blog.js            Blog index (list, search, tag filter)
      blogs/
        blog-<slug>.html                One shell per post (uses js/blog-post.js)
      js/
        blog-post.js                    Shared blog-post page logic
        common.js                       Injects header/footer, active-nav state
        blog-posts-data.js              Blog post content (title, body, meta)
        cursor-effects.js               Shared cursor micro-interactions
      partials/
        header.html, footer.html        Shared header/footer markup
        partials.css                    Shared keyframes/utility CSS
      assets/                           Images, logos, icons

Every page is plain HTML with an external `<script src="js/*.js">` — no inline
JS, no build step for the page content. `js/common.js` fetches `partials/header.html`
and `partials/footer.html` and injects them into each page's `#site-header` /
`#site-footer` slots, resolving partial/asset paths relative to its own script
location so it works both at the root and under `public/blogs/`.

## Adding a blog post

1. Add an entry to `public/partials/blog-posts-data.js` (title, tag, date,
   cover image, paragraphs).
2. Copy `public/blogs/blog-ai-in-2026.html`, rename to `blog-<slug>.html`,
   and update `data-slug="<slug>"` on `<body>`.
3. Add a card for it in `public/blog.js`'s `postData` array.
4. Add the route in `next.config.js` rewrites (see below).

## Routing

`next.config.js` rewrites clean URLs to the matching static file in `public/`.
`/blog/<slug>` maps to `public/blogs/blog-<slug>.html`.
