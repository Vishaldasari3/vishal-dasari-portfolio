'use client';
import { useRef, useEffect, useState } from 'react';

const DOGS = [
  { name: 'Junnu', img: '/assets/404-dogs/junnu.jpg', tag: "The self-appointed guardian of this site." },
  { name: 'Jimmy', img: '/assets/404-dogs/jimmy.jpg', tag: "Best friends with every rabbit, worst enemy of broken links." },
  { name: 'Bruno', img: '/assets/404-dogs/bruno.jpg', tag: "Keeps the cats in line and the 404s in check." },
  { name: 'Simba', img: '/assets/404-dogs/simba.jpg', tag: "Small dog, big attitude, zero patience for dead ends." },
  { name: 'Cooper', img: '/assets/404-dogs/cooper.jpg', tag: "Fluffy, floppy, and fiercely loyal to lost pages." },
  { name: 'Bagel', img: '/assets/404-dogs/bagel.jpg', tag: "Snorting his way through every wrong turn." },
  { name: 'Milo', img: '/assets/404-dogs/milo.jpg', tag: "Too cute to be mad at, even about this 404." },
];

function playPawTap() {
  const w = window;
  const ctx = playPawTap._ctx || (playPawTap._ctx = new (w.AudioContext || w.webkitAudioContext)());
  const t = ctx.currentTime;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'sine'; o.frequency.setValueAtTime(180 + Math.random() * 40, t);
  o.frequency.exponentialRampToValueAtTime(70, t + 0.12);
  g.gain.setValueAtTime(0.16, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
  o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.15);
}

function confettiBurst(x, y) {
  const colors = ['#3654e0','#7c5cff','#22ddf5','#ff5fae','#4f6bff','#00e0c6'];
  for (let i = 0; i < 26; i++) {
    const c = document.createElement('span');
    const col = colors[Math.floor(Math.random() * colors.length)];
    const ang = Math.random() * Math.PI * 2, dist = 60 + Math.random() * 90;
    const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 40;
    c.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${6 + Math.random() * 5}px;height:${6 + Math.random() * 5}px;background:${col};border-radius:${Math.random() > 0.5 ? '50%' : '2px'};pointer-events:none;z-index:999;opacity:1;transition:transform .8s cubic-bezier(.2,.8,.3,1), opacity .8s ease;`;
    document.body.appendChild(c);
    requestAnimationFrame(() => { c.style.transform = `translate(${dx}px,${dy}px) rotate(${Math.random() * 360}deg)`; c.style.opacity = '0'; });
    setTimeout(() => c.remove(), 850);
  }
}

function B3d({ href, children }) {
  const ref = useRef(null);
  return (
    <a ref={ref} href={href}
      onClick={(e) => { e.preventDefault(); const r = ref.current.getBoundingClientRect(); confettiBurst(r.left + r.width / 2, r.top + r.height / 2); setTimeout(() => { window.location.href = href; }, 260); }}
      onMouseEnter={() => { ref.current.style.transform = 'rotateX(14deg) translateY(-6px) scale(1.06)'; ref.current.style.boxShadow = '0 26px 46px -14px rgba(54,84,224,0.6), 0 0 24px -2px rgba(34,221,245,0.5)'; ref.current.style.backgroundPosition = '100% center'; ref.current.style.letterSpacing = '0.6px'; }}
      onMouseLeave={() => { ref.current.style.transform = ''; ref.current.style.boxShadow = '0 14px 30px -10px rgba(54,84,224,0.5)'; ref.current.style.backgroundPosition = '0% center'; ref.current.style.letterSpacing = '0.2px'; }}
      style={{
        position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 13.5, fontWeight: 700, color: '#fff', letterSpacing: '0.2px',
        background: 'linear-gradient(135deg,#3654e0,#7c5cff,#22ddf5)', backgroundSize: '220% auto', backgroundPosition: '0% center', padding: '13px 26px', borderRadius: 26, textDecoration: 'none',
        boxShadow: '0 14px 30px -10px rgba(54,84,224,0.5)', transformStyle: 'preserve-3d',
        transition: 'transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease, background-position .5s ease, letter-spacing .3s ease', opacity: 0, animation: 'fadeUp .7s ease .6s forwards',
      }}>
      {children}
      <svg width="14" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6h13M9 1l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </a>
  );
}

export default function NotFound() {
  const [dog] = useState(() => DOGS[Math.floor(Math.random() * DOGS.length)]);
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current, img = imgRef.current;
    if (!card || !img) return;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      img.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
      card.style.transform = `rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    };
    const onLeave = () => { img.style.transform = 'rotateY(0) rotateX(0)'; card.style.transform = 'rotateY(0) rotateX(0)'; };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); };
  }, []);

  const paws = Array.from({ length: 22 }, (_, i) => ({
    left: `${Math.random() * 100}vw`,
    dur: `${14 + Math.random() * 10}s`,
    delay: `${Math.random() * 10}s`,
    key: i,
  }));

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 1400, overflow: 'hidden', background: '#f4f5fb', fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', filter: 'blur(70px)', opacity: 0.55, background: 'radial-gradient(circle,#4f6bff,transparent 68%)', top: -120, left: -100, animation: 'drift1 16s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', filter: 'blur(70px)', opacity: 0.55, background: 'radial-gradient(circle,#00e0c6,transparent 68%)', bottom: -140, right: -80, animation: 'drift2 18s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', filter: 'blur(70px)', opacity: 0.55, background: 'radial-gradient(circle,#ff5fae,transparent 68%)', top: '40%', left: '60%', animation: 'drift3 14s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(60,84,224,0.12) 1px, transparent 1px)', backgroundSize: '26px 26px', WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 72%)', maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 72%)' }} />
      <div style={{ position: 'absolute', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'min(38vw,420px)', letterSpacing: '-10px', color: 'transparent', WebkitTextStroke: '1.5px rgba(60,84,224,0.12)', zIndex: 0, userSelect: 'none', pointerEvents: 'none' }}>404</div>
      {paws.map((p) => (
        <span key={p.key} onMouseEnter={playPawTap} style={{ position: 'absolute', bottom: -40, left: p.left, fontSize: 30, opacity: 0, cursor: 'pointer', transition: 'transform .15s ease', animation: `rise ${p.dur} linear infinite`, animationDelay: p.delay }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.4) rotate(-10deg)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = ''; }}
        >🐾</span>
      ))}
      <div ref={cardRef} style={{
        position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center',
        padding: '56px 48px', width: '100%', maxWidth: 640, background: 'linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(238,241,255,0.85) 45%, rgba(255,240,250,0.8) 100%)', backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
        border: '1px solid rgba(255,255,255,0.9)', borderRadius: 28, boxShadow: '0 30px 80px -30px rgba(60,70,140,0.28), 0 0 0 1px rgba(124,92,255,0.08), inset 0 1px 0 rgba(255,255,255,0.9)', overflow: 'hidden',
        transformStyle: 'preserve-3d', transition: 'transform .25s ease', animation: 'cardIn .8s cubic-bezier(.22,1,.36,1) forwards', opacity: 0,
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg,#4f6bff,#00e0c6,#ff5fae,#4f6bff)', backgroundSize: '300% auto', animation: 'sheen 6s linear infinite' }} />
        <div style={{ animation: 'bp404-float 3s ease-in-out infinite' }}>
          <img ref={imgRef} src={dog.img} alt={dog.name} style={{ width: 240, height: 240, objectFit: 'cover', borderRadius: 26, boxShadow: '0 24px 50px -18px rgba(60,70,140,0.25)', transition: 'transform .15s ease', transformStyle: 'preserve-3d' }} />
        </div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#7c5cff', opacity: 0, animation: 'fadeUp .7s ease .15s forwards' }}>Halted by the guard</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 44, fontWeight: 800, letterSpacing: '-1.5px', backgroundImage: 'linear-gradient(120deg,#7c9cff,#c39bff,#5eeaff,#7c9cff)', backgroundSize: '300% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', animation: 'sheen 5s linear infinite' }}>{dog.name}</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#20244a', opacity: 0, animation: 'fadeUp .7s ease .3s forwards' }}>{dog.tag}</div>
        <div style={{ fontSize: 14, color: '#5c6288', maxWidth: 380, opacity: 0, animation: 'fadeUp .7s ease .45s forwards' }}>
          {dog.name} sniffed around and found nothing here — this page is hidden, wandered off, or never existed. Try one of these instead:
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', perspective: 800 }}>
          <B3d href="/blog">Back to the blog</B3d>
          <B3d href="/">Back to home</B3d>
        </div>
      </div>
      <style>{`
        @keyframes drift1{0%,100%{transform:translate(0,0)}50%{transform:translate(60px,40px)}}
        @keyframes drift2{0%,100%{transform:translate(0,0)}50%{transform:translate(-50px,-30px)}}
        @keyframes drift3{0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,50px)}}
        @keyframes rise{0%{transform:translateY(0) rotate(0deg);opacity:0;}10%{opacity:.5;}90%{opacity:.35;}100%{transform:translateY(-110vh) rotate(40deg);opacity:0;}}
        @keyframes cardIn{from{opacity:0;transform:translateY(30px) scale(.94);}to{opacity:1;transform:translateY(0) scale(1);}}
        @keyframes bp404-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes sheen{to{background-position:300% center;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
      `}</style>
    </div>
  );
}
