export default function NotFound() {
  return (
    <>
      <link rel="stylesheet" href="/css/redesign.css" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <main className="redesign-error">
        <img src="/assets/404-dogs/junnu.jpg" alt="Junnu, the portfolio’s four-legged page guard" width="170" height="170" />
        <p className="eyebrow">404 / A little off the trail</p>
        <h1>Even good explorers<br />take a wrong turn.</h1>
        <p>Junnu checked everywhere. This page has moved, is hidden, or never existed. Let’s get you back on track.</p>
        <div className="hero-actions">
          <a className="button primary" href="/">Back to home ↗</a>
          <a className="button secondary" href="/blog">Explore the journal</a>
        </div>
      </main>
    </>
  );
}
