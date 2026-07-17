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
      ],
    };
  },
};

module.exports = nextConfig;
