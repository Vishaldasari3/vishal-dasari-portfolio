# Vishal Dasari Portfolio — Next.js

Static, framework-free HTML/JS site served through Next.js rewrites (so it deploys anywhere Next.js does, with clean URLs).

## Run it

    npm install
    npm run dev

Open http://localhost:3000 — routes: `/`, `/about`, `/experience`, `/certifications`, `/tech-stack`, `/contact`, `/blog`, `/blog/<slug>`.

## Structure

    public/
      html/
        home.html, about.html, experience.html, certifications.html,
        tech-stack.html, contact.html, blog.html
        blogs/
          blog-<slug>.html             One shell per post (uses ../../js/blog-post.js)
      js/
        home.js, about.js*, experience.js, certifications.js,
        tech-stack.js, contact.js, blog.js   Page-specific behavior
        blog-post.js                    Shared blog-post page logic
        blog-posts-data.js              Blog post content (title, body, meta)
        common.js                       Injects header/footer, active-nav state
        cursor-effects.js                Shared cursor micro-interactions
        three-scenes.js                  Shared three.js decorative scenes
      partials/
        header.html, footer.html        Shared header/footer markup
        partials.css                    Shared keyframes/utility CSS
      assets/                           Images, logos, icons
      resume.pdf, robots.txt, sitemap.xml

  \* about.html currently has no page-specific JS file.

All HTML lives in `public/html/`; all JS lives in `public/js/`. Every page is
plain HTML with an external `<script src="../js/*.js">` — no inline JS, no
build step for the page content. `js/common.js` fetches `partials/header.html`
and `partials/footer.html` and injects them into each page's `#site-header` /
`#site-footer` slots, resolving partial/asset paths relative to its own script
location.

## Adding a blog post

1. Add an entry to `public/js/blog-posts-data.js` (title, tag, date,
   cover image, paragraphs).
2. Copy `public/html/blogs/blog-ai-in-2026.html`, rename to `blog-<slug>.html`,
   and update `data-slug="<slug>"` on `<body>`.
3. Add a card for it in `public/js/blog.js`'s `postData` array.
4. Add the route in `next.config.js` rewrites (see below).

## Routing

`next.config.js` rewrites clean URLs to the matching static file under
`public/html/`. `/blog/<slug>` maps to `public/html/blogs/blog-<slug>.html`.
