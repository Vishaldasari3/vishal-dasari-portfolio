/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/html/home.html' },
        { source: '/about', destination: '/html/about.html' },
        { source: '/experience', destination: '/html/experience.html' },
        { source: '/certifications', destination: '/html/certifications.html' },
        { source: '/tech-stack', destination: '/html/tech-stack.html' },
        { source: '/contact', destination: '/html/contact.html' },
        { source: '/blog', destination: '/html/blog.html' },
        { source: '/blog/ai-in-2026', destination: '/html/blogs/blog-ai-in-2026.html' },
        { source: '/blog/a-decade-of-moving', destination: '/html/blogs/blog-a-decade-of-moving.html' },
        { source: '/blog/ai-agents-reshaping-tech', destination: '/html/blogs/blog-ai-agents-reshaping-tech.html' },
        { source: '/blog/first-trip-home', destination: '/html/blogs/blog-first-trip-home.html' },
        { source: '/blog/api-vs-mcp', destination: '/html/blogs/blog-api-vs-mcp.html' },
        { source: '/blog/what-is-happiness', destination: '/html/blogs/blog-what-is-happiness.html' },
        { source: '/blog/emotional-side-of-engineering', destination: '/html/blogs/blog-emotional-side-of-engineering.html' },
        { source: '/blog/code-worked-but-wrong', destination: '/html/blogs/blog-code-worked-but-wrong.html' },
      ],
    };
  },
};

module.exports = nextConfig;
