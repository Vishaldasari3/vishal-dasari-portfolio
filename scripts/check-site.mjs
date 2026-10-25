import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(root, 'public');
const config = require(path.join(root, 'next.config.js'));
const routes = (await config.rewrites()).beforeFiles;
const routeMap = new Map(routes.map(route => [route.source, route.destination]));
const errors = [];
let pages = 0;
const exists = url => {
  if (!url || url.startsWith('#') || /^(https?:|mailto:|data:|tel:)/.test(url)) return true;
  const pathname = url.split(/[?#]/)[0];
  return fs.existsSync(path.join(publicRoot, routeMap.get(pathname) || pathname));
};

const checkedFiles = new Set();
for (const route of routes) {
  if (checkedFiles.has(route.destination)) continue;
  checkedFiles.add(route.destination);
  const file = path.join(publicRoot, route.destination);
  if (!fs.existsSync(file)) { errors.push(`${route.source}: rewrite target missing`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('/css/redesign.css')) continue; // Retained private administration UI.
  pages++;
  const check = (condition, message) => { if (!condition) errors.push(`${route.source}: ${message}`); };
  check(/<html lang="en">/.test(html), 'document language missing');
  check((html.match(/<h1(?:\s|>)/g) || []).length === 1, 'expected one main heading');
  check(html.includes('<main id="main"'), 'main landmark missing');
  check(html.includes('aria-label="Main navigation"'), 'shared navigation missing');
  check(html.includes('rel="canonical"'), 'canonical URL missing');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  check(ids.length === new Set(ids).size, 'duplicate element IDs');
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    check(exists(match[1]), `missing local destination ${match[1]}`);
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) check(/\balt=/.test(match[0]), 'image lacks alt text');
}

const context = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(publicRoot,'js/portfolio-data.js'),'utf8'),context);
vm.runInNewContext(fs.readFileSync(path.join(publicRoot,'js/blog-posts-data.js'),'utf8'),context);
for (const post of context.window.VD_DATA.posts) {
  if (!exists(post.coverImg)) errors.push(`Missing article image ${post.coverImg}`);
  if (!exists('/blog/' + post.category + '/' + post.slug)) errors.push(`Missing article route ${post.slug}`);
  assert.equal(post.title, context.window.BLOG_POSTS[post.slug].title, `Index title differs from article ${post.slug}`);
}
const home = fs.readFileSync(path.join(publicRoot,'html/home.html'),'utf8');
assert(!home.includes('class="project-grid"'), 'Landing page must not contain project listings');
assert(!home.includes('class="career-list"'), 'Landing page must not contain work history');
assert(/<a data-blog-link href="https:\/\/blog\.dasarivishal\.com\/"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/.test(home), 'Header blog link must open securely in a new tab');
assert.equal(pages, 15, 'Expected seven main pages and eight article shells');
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Checked ${pages} pages, all referenced local assets and routes, heading/landmark structure, and article metadata consistency.`);
