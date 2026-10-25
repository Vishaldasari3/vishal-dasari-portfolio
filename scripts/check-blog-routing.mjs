import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import http from 'node:http';
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
console.log(`Passed ${checks} hostname routing, redirect, canonical, preview, and missing-page checks.`);
