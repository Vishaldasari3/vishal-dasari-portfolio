import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import http from 'node:http';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const site = require('../public/js/site-environments.js');
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(new URL('../public/js/portfolio-data.js', import.meta.url), 'utf8'), context);
const base = process.env.ROUTING_TEST_ORIGIN || 'http://localhost:3013';
let checks = 0;
async function check(host, pathname, status, destination, marker) {
  const response = await new Promise((resolve, reject) => {
    const request = http.get(base + pathname, {headers:{host}}, res => {
      let body = ''; res.setEncoding('utf8'); res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({status:res.statusCode, headers:{get:key => res.headers[key]}, text:async()=>body}));
    }); request.on('error', reject);
  });
  assert.equal(response.status, status, `${host}${pathname}`);
  if (destination) assert.equal(response.headers.get('location'), destination, `${host}${pathname} redirect`);
  if (marker) assert((await response.text()).includes(marker), `${host}${pathname} body`);
  checks++;
}
await check('blog.dasarivishal.com', '/', 200, null, 'journal-entrance');
await check('localhost:3013', '/', 200, null, 'landing-main');
await check('www.dasarivishal.com', '/', 200, null, 'landing-main');
await check('blog.localhost:3013', '/', 200, null, 'journal-entrance');
await check('www.dasarivishal.com', '/blog', 308, 'https://blog.dasarivishal.com/');
await check('blog.dasarivishal.com', '/blog', 308, '/');
await check('blog.dasarivishal.com', '/about', 307, 'https://www.dasarivishal.com/about');
for (const post of context.window.VD_DATA.posts) {
  const article = '/' + post.category + '/' + post.slug;
  const canonical = 'https://blog.dasarivishal.com' + article;
  await check('blog.dasarivishal.com', article, 200, null, canonical);
  await check('blog.localhost:3013', article, 200, null, canonical);
  await check('localhost:3013', '/blog' + article, 200, null, canonical);
  for (const old of ['/blog/' + post.slug, '/blog' + article]) {
    await check('blog.dasarivishal.com', old, 308, article);
    await check('www.dasarivishal.com', old, 308, canonical);
  }
  await check('localhost:3013', '/blog/' + post.slug, 308, '/blog' + article);
}
await check('blog.dasarivishal.com', '/tech/unknown-note', 404);
await check('blog.dasarivishal.com', '/personal/api-vs-mcp', 404);
await check('blog.dasarivishal.com', '/tech/a-decade-of-moving', 404);
await check('random.example', '/tech/api-vs-mcp', 404);
await check('preview-project.vercel.app', '/', 200, null, 'landing-main');
await check('preview-project.vercel.app', '/blog', 200, null, 'journal-entrance');
await check('preview-project.vercel.app', '/blog/tech/api-vs-mcp', 200);
await check('blog.dasarivishal.com', '/css/redesign.css', 200);
await check('blog.dasarivishal.com', '/js/redesign.js', 200);
await check('blog.dasarivishal.com', '/assets/headshot.png', 200);

for (const environment of site.environments.filter(e => e.name !== 'local')) {
  const portfolio = 'https://' + environment.portfolio;
  const blog = 'https://' + environment.blog;
  const browserPortfolio = site.resolve(environment.portfolio);
  const browserBlog = site.resolve(environment.blog);
  assert.equal(browserPortfolio.blogOrigin, blog);
  assert.equal(browserBlog.portfolioOrigin, portfolio);
  assert.equal(browserBlog.isBlog, true);
  assert.equal(browserPortfolio.isBlog, false);
  for (const hostname of [environment.portfolio, ...environment.aliases]) {
    await check(hostname, '/', 200, null, 'landing-main');
    await check(hostname, '/blog', 308, blog + '/');
    await check(hostname, '/pdplknrhydus', 200, null, '/js/site-environments.js');
    for (const post of context.window.VD_DATA.posts) {
      const article = '/' + post.category + '/' + post.slug;
      await check(hostname, '/blog' + article, 308, blog + article);
      await check(hostname, '/blog/' + post.slug, 308, blog + article);
    }
  }
  await check(environment.blog, '/', 200, null, 'journal-entrance');
  await check(environment.blog, '/contact', 307, portfolio + '/contact');
  await check(environment.blog, '/about', 307, portfolio + '/about');
  await check(environment.blog, '/pdplknrhydus', 200, null, '/js/site-environments.js');
  for (const post of context.window.VD_DATA.posts) {
    const article = '/' + post.category + '/' + post.slug;
    await check(environment.blog, article, 200, null, '/js/site-environments.js');
    await check(environment.blog, '/blog' + article, 308, article);
    await check(environment.blog, '/blog/' + post.slug, 308, article);
  }
}
assert.equal(site.resolve('localhost','3011').blogOrigin, 'http://blog.localhost:3011');
assert.equal(site.resolve('blog.localhost','3011').portfolioOrigin, 'http://localhost:3011');
assert.equal(site.resolve('unassigned.vercel.app').blogOrigin, '');

console.log(`Passed ${checks} hostname routing, redirect, canonical, preview, and missing-page checks.`);
