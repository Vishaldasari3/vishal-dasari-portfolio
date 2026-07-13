/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/', destination: '/home.html' },
      { source: '/about', destination: '/about.html' },
      { source: '/experience', destination: '/experience.html' },
      { source: '/certifications', destination: '/certifications.html' },
      { source: '/tech-stack', destination: '/tech-stack.html' },
      { source: '/contact', destination: '/contact.html' },
      { source: '/blog', destination: '/blog.html' },
      { source: '/blog-post', destination: '/blog-post.html' },
    ];
  },
};

module.exports = nextConfig;
