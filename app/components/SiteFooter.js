export default function SiteFooter({ home = "/" }) {
  return (
<footer className="site-footer footer-soft-dock">
<div className="footer-top">
<div className="footer-signature"><a className="brand" href={home} aria-label="Vishal Dasari — home">
<span className="brand-art"><img className="brand-logo" src="/assets/brand/vishal-dasari-logo.webp" alt="Vishal Dasari" width="216" height="72" decoding="async" /></span>
</a><p className="footer-tagline">Always building. Always learning.</p></div>
<p className="footer-motto">Built with curiosity. Made to last.</p>
<div className="social-links">
<a href="https://github.com/Vishaldasari3" target="_blank" rel="noopener noreferrer" className="vd-hover"><span className="vd-hover-label">GitHub</span> <span className="vd-hover-arrow" aria-hidden="true">↗</span>
</a>
<a href="https://www.linkedin.com/in/vishaldasari3/" target="_blank" rel="noopener noreferrer" className="vd-hover"><span className="vd-hover-label">LinkedIn</span> <span className="vd-hover-arrow" aria-hidden="true">↗</span>
</a>
<a href="https://topmate.io/vishal_dasari3" target="_blank" rel="noopener noreferrer" className="vd-hover"><span className="vd-hover-label">Topmate</span> <span className="vd-hover-arrow" aria-hidden="true">↗</span>
</a>
</div>
</div>
<div className="footer-bottom">
<span>© 2026 Vishal Dasari</span>
<a href="#top" className="vd-hover"><span className="vd-hover-label">Back to top</span> <span className="vd-hover-arrow" aria-hidden="true">↑</span></a>
</div>
</footer>
  );
}
