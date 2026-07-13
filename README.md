# Vishal Dasari Portfolio — Next.js

## Run it

    npm install
    npm run dev

Open http://localhost:3000 — routes: `/`, `/about`, `/experience`, `/certifications`, `/tech-stack`, `/contact`, `/blog`, `/blog-post`.

## How this is built

Each route is a Next.js **Route Handler** (`app/<route>/route.js`) that reads a pre-built, fully self-contained HTML file from `/public` and serves it as the response — see any `route.js` for the ~10 lines that do this. Each HTML file already has all CSS, JS (including the three.js effects), and images (as base64) inlined, so every page runs with zero extra build step or asset pipeline.

**Why not plain React/JSX components?** The original designs use a template runtime (custom `{{ }}` bindings, a `DCLogic` class per page, inline `style-hover` attributes) that doesn't map 1:1 onto JSX — converting ~8 pages of three.js canvas work and animation logic to idiomatic hooks/components line-by-line was out of scope for this export. What you have here is the exact, working, pixel-perfect design, wired into real Next.js routing.

## Editing a page

Open the relevant file in `/public` (e.g. `public/about.html`) — it's a single self-contained HTML file, editable directly (search for the text/style you want to change). There are no separate CSS/JS/image files to track down.

## Converting a page to real JSX (optional)

If you want a given page as idiomatic React instead of static HTML:
1. Pull the markup inside `<body>` into a `.jsx`/`.tsx` component, converting `style="a: b; c: d;"` strings to `style={{ a: 'b', c: 'd' }}` objects.
2. Move any `<script>` logic into a `useEffect` (mark the file `'use client'`).
3. Replace the route's `route.js` with a `page.js` rendering that component.

## Project structure

    app/
      route.js                 → "/"          (home.html)
      about/route.js           → "/about"
      experience/route.js      → "/experience"
      certifications/route.js  → "/certifications"
      tech-stack/route.js      → "/tech-stack"
      contact/route.js         → "/contact"
      blog/route.js            → "/blog"
      blog-post/route.js       → "/blog-post"
      layout.js                 root layout (used only by not-found.js)
      not-found.js               404 page
    public/
      home.html, about.html, experience.html, certifications.html,
      tech-stack.html, contact.html, blog.html, blog-post.html
