/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/home.html' },
        { source: '/about', destination: '/about.html' },
        { source: '/experience', destination: '/experience.html' },
        { source: '/certifications', destination: '/certifications.html' },
        { source: '/tech-stack', destination: '/tech-stack.html' },
        { source: '/contact', destination: '/contact.html' },
        { source: '/blog', destination: '/blog.html' },
        { source: '/blog/ai-in-2026', destination: '/blogs/blog-ai-in-2026.html' },
        { source: '/blog/a-decade-of-moving', destination: '/blogs/blog-a-decade-of-moving.html' },
        { source: '/blog/ai-agents-reshaping-tech', destination: '/blogs/blog-ai-agents-reshaping-tech.html' },
      ],
    };
  },
};

module.exports = nextConfig;
