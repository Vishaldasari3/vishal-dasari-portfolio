import { headers } from 'next/headers';
import site from '../public/js/site-environments.js';

export default function NotFound() {
  const host = (headers().get('host') || '').split(':');
  const environment = site.resolve(host[0], host[1]);
  const home = environment.portfolioOrigin || '/';
  return (
    <>
      <link rel="stylesheet" href="/css/redesign.css" />
      <link rel="stylesheet" href="/css/brand-motion.css" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <main className="redesign-error">
        <a className="brand error-brand" href={home} aria-label="Vishal Dasari — home"><span className="brand-art"><img className="brand-logo" src="/assets/brand/vishal-dasari-logo.webp" alt="Vishal Dasari" width="216" height="72" /></span></a>
        <img src="/assets/404-dogs/junnu.jpg" alt="Junnu, the portfolio’s four-legged page guard" width="170" height="170" />
        <p className="eyebrow">404 / A little off the trail</p>
        <h1>Even good explorers<br />take a wrong turn.</h1>
        <p>Junnu checked everywhere. This page has moved, is hidden, or never existed. Let’s get you back on track.</p>
        <div className="hero-actions">
          <a className="button primary" href={home}>Back to home ↗</a>
          <a className="button secondary" href="/blog">Explore the journal</a>
        </div>
      </main>
    </>
  );
}
