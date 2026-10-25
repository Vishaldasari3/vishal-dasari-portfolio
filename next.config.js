/** @type {import('next').NextConfig} */
const articles = [
  {
    "slug": "ai-in-2026",
    "category": "tech",
    "file": "/html/blogs/blog-ai-in-2026.html"
  },
  {
    "slug": "a-decade-of-moving",
    "category": "personal",
    "file": "/html/blogs/blog-a-decade-of-moving.html"
  },
  {
    "slug": "ai-agents-reshaping-tech",
    "category": "tech",
    "file": "/html/blogs/blog-ai-agents-reshaping-tech.html"
  },
  {
    "slug": "first-trip-home",
    "category": "personal",
    "file": "/html/blogs/blog-first-trip-home.html"
  },
  {
    "slug": "api-vs-mcp",
    "category": "tech",
    "file": "/html/blogs/blog-api-vs-mcp.html"
  },
  {
    "slug": "what-is-happiness",
    "category": "personal",
    "file": "/html/blogs/blog-what-is-happiness.html"
  },
  {
    "slug": "emotional-side-of-engineering",
    "category": "personal",
    "file": "/html/blogs/blog-emotional-side-of-engineering.html"
  },
  {
    "slug": "code-worked-but-wrong",
    "category": "tech",
    "file": "/html/blogs/blog-code-worked-but-wrong.html"
  }
];
const blogHosts = ['blog.dasarivishal.com', 'blog.localhost'];
const portfolioHosts = ['www.dasarivishal.com', 'dasarivishal.com'];
const portfolioPaths = ['/about', '/experience', '/certifications', '/tech-stack', '/contact'];
const host = value => [{ type: 'host', value: value.replaceAll('.', '\\.') }];
const articlePath = article => '/' + article.category + '/' + article.slug;
module.exports = {
  async redirects() {
    const rules = [];
    for (const hostname of blogHosts) {
      rules.push({ source: '/blog', destination: '/', permanent: true, has: host(hostname) });
      for (const article of articles) {
        for (const source of ['/blog/' + article.slug, '/blog' + articlePath(article)]) {
          rules.push({ source, destination: articlePath(article), permanent: true, has: host(hostname) });
        }
      }
      for (const source of portfolioPaths) rules.push({ source, destination: 'https://www.dasarivishal.com' + source, permanent: false, has: host(hostname) });
    }
    for (const hostname of portfolioHosts) {
      rules.push({ source: '/blog', destination: 'https://blog.dasarivishal.com/', permanent: true, has: host(hostname) });
      for (const article of articles) {
        for (const source of ['/blog/' + article.slug, '/blog' + articlePath(article)]) {
          rules.push({ source, destination: 'https://blog.dasarivishal.com' + articlePath(article), permanent: true, has: host(hostname) });
        }
      }
    }
    // Unassigned preview domains keep their own blog routes.
    return rules.concat(articles.map(article => ({ source: '/blog/' + article.slug, destination: '/blog' + articlePath(article), permanent: true })));
  },
  async rewrites() {
    return { beforeFiles: [
      ...blogHosts.flatMap(hostname => [
        { source: '/', destination: '/html/blog.html', has: host(hostname) },
        ...articles.map(article => ({ source: articlePath(article), destination: article.file, has: host(hostname) }))
      ]),
      ...[
  {
    "source": "/",
    "destination": "/html/home.html"
  },
  {
    "source": "/about",
    "destination": "/html/about.html"
  },
  {
    "source": "/experience",
    "destination": "/html/experience.html"
  },
  {
    "source": "/certifications",
    "destination": "/html/certifications.html"
  },
  {
    "source": "/tech-stack",
    "destination": "/html/tech-stack.html"
  },
  {
    "source": "/contact",
    "destination": "/html/contact.html"
  },
  {
    "source": "/blog",
    "destination": "/html/blog.html"
  },
  {
    "source": "/pdplknrhydus",
    "destination": "/html/admin-posts.html"
  }
],
      ...articles.map(article => ({ source: '/blog' + articlePath(article), destination: article.file }))
    ] };
  }
};
