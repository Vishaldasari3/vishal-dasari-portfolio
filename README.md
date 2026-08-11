# Vishal Dasari Portfolio — Next.js

Static, framework-free HTML/JS site served through Next.js rewrites (so it deploys anywhere Next.js does, with clean URLs).

## Run it

    npm install
    npm run dev

Open http://localhost:3000 — routes: `/`, `/about`, `/experience`, `/certifications`, `/tech-stack`, `/contact`, `/blog`, `/blog/<slug>`, `/admin/posts`.

## Structure

    app/
      api/
        posts-visibility/route.js       Hide/show blog posts (admin toggle)
        comments/[slug]/, comments/admin/   Per-post comments + moderation
        reactions/[slug]/               Per-post emoji reaction counts
        _lib/env.js                     Shared server env/secret helpers
      layout.js, page.js, not-found.js  Next.js app-router shell
    public/
      html/
        home.html, about.html, experience.html, certifications.html,
        tech-stack.html, contact.html, blog.html, admin-posts.html
        blogs/
          blog-<slug>.html             One shell per post (uses ../../js/blog-post.js)
      js/
        home.js, about.js*, experience.js, certifications.js,
        tech-stack.js, contact.js, blog.js   Page-specific behavior
        blog-post.js                     Shared blog-post page logic + scroll-triggered
                                          diagrams/interactives (split cards, pillar
                                          charts, flow diagrams, flight paths, etc.)
        blog-posts-data.js               Blog post content (title, body, meta, diagrams)
        blog-comments.js                 Comment form + list (per post)
        blog-reactions.js                Emoji reaction bar (per post)
        blog-header.js                   Blog-page header label behavior
        common.js                        Injects header/footer, active-nav state,
                                          shared three.js scenes
        cursor-effects.js                Shared cursor micro-interactions
        three-scenes.js                  Shared three.js decorative scenes
        styles/                          Per-page inline-style string modules
                                          (home, about, experience, certifications,
                                          tech-stack, contact, blog, blog-post-shared)
      partials/
        header.html, footer.html        Shared header/footer markup
        partials.css                    Shared keyframes/utility CSS
      assets/                           Images, logos, icons (blog covers are
                                         compressed JPEGs; keep new covers under ~250KB)
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
   cover image, paragraphs, optional diagram blocks).
2. Copy `public/html/blogs/blog-ai-in-2026.html`, rename to `blog-<slug>.html`,
   and update `data-slug="<slug>"` on `<body>`.
3. Add a card for it in `public/js/blog.js`'s `postData` array.
4. Add the route in `next.config.js` rewrites (see below).
5. Compress the cover image before adding it (resize to ~1600px wide, JPEG
   ~75% quality) — blog post pages load the cover with `fetchpriority="high"`,
   so an oversized file directly delays first paint.

## Post visibility, comments & reactions

`admin-posts.html` (`/admin/posts`) toggles per-post visibility and moderates
comments, backed by the API routes under `app/api/`. `blog-post.js` renders
post content immediately on load and only swaps to a 404 view afterward if
the visibility check confirms the post is hidden, so text never waits on that
network round trip.

## Routing

`next.config.js` rewrites clean URLs to the matching static file under
`public/html/`. `/blog/<slug>` maps to `public/html/blogs/blog-<slug>.html`.
