const { useState, useEffect, useRef } = React;

const SLIDES = [
  { src: 'images/hero-fire-dusk.jpg', pos: '50% 45%', alt: 'The beach fire burning in the sand, the cart and its load of firewood behind it at dusk',
    kicker: 'Flagship project — AUTO-CART', title: 'Engineering that carries its own weight',
    sub: 'KMJ Dynamics is an independent engineering shop. The proof of work: a fully autonomous follow-me beach cart — welded aluminum frame, custom power electronics, and map-free navigation, all built on one bench.',
    href: '#project', cta: 'See the project' },
  { src: 'images/hero-league-dusk.jpg', alt: 'The cart on the evening sand, the harbor and moored boats behind',
    kicker: 'Next to the others', title: 'In a league of its own',
    sub: 'Two 3,000 W motors, 10:1 gearing, 16.5-inch balloon tires, a 400 lb demonstrated payload. The spec table puts it next to the wagons you can buy — the numbers do the talking.',
    href: '#compare', cta: 'See the comparison' },
  { src: 'images/gallery-beach-rear-tracks.jpg', alt: 'The loaded cart from behind, its tire tracks trailing through the sand',
    kicker: 'Autonomy', title: 'Auto-Cart: it follows you',
    sub: 'A wearable UWB tag and four corner receivers fix your position; the cart drives itself to you, hands-free, while a 360° scanner steers it around obstacles.',
    href: '#how', cta: 'How it works' },
  { src: 'images/hero-lawn-loaded.jpg', pos: '50% 45%', alt: 'The cart loaded for the beach, parked on the summer lawn',
    kicker: 'Engineering', title: 'The engineering underneath',
    sub: 'Distributed, individually regulated power, hardware-timed control, and CAN-bus telemetry — the unseen systems where the real engineering lives.',
    href: '#engineering', cta: 'Under the hood' },
  { src: 'images/hero-3d-render.png', alt: 'Corner view of the interactive 3D model of the cart',
    kicker: 'Interactive model', title: 'Explore the cart in 3D',
    sub: 'A full interactive model built to real dimensions — orbit it yourself, run the guided tour, and switch on X-ray mode to see the wiring inside the frame.',
    href: 'cart3d.html', cta: 'Open the 3D model' },
  { src: 'images/gallery-beach-dunes.jpg', alt: 'Side profile of the loaded cart on the sand with dunes and beach houses behind',
    kicker: 'The manual', title: 'Built bolt by bolt, documented',
    sub: 'The complete working build manual — every step, every setting, every part — is published right here on the site.',
    href: 'build.html', cta: 'Read the build guide' },
];

const arrowStyle = (side) => ({
  position: 'absolute', [side]: '12px', top: '50%', transform: 'translateY(-50%)',
  width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'color-mix(in srgb, var(--color-accent-900) 55%, transparent)', color: 'var(--color-bg)',
  border: '1px solid color-mix(in srgb, var(--color-bg) 40%, transparent)', cursor: 'pointer',
  fontSize: '18px', lineHeight: 1, zIndex: 3,
});

function HeroSlider({ heroHeight = 640, wash = false }) {
  const [i, setI] = useState(0);
  const userNav = useRef(false);
  const touchX = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      if (!userNav.current) setI((n) => (n + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const go = (n) => {
    userNav.current = true;
    setI(((n % SLIDES.length) + SLIDES.length) % SLIDES.length);
  };
  const s = SLIDES[i];
  const shadow = '0 1px 8px color-mix(in srgb, var(--color-accent-900) 65%, transparent)';

  return (
    <div style={{ position: 'relative' }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (dx > 40) go(i - 1); else if (dx < -40) go(i + 1);
      }}>
      <div className={wash ? 'duotone' : ''} style={{ position: 'relative', height: heroHeight + 'px', overflow: 'hidden' }}>
        {SLIDES.map((sl, n) => (
          <img key={sl.src} src={sl.src} alt={sl.alt}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: sl.pos || '50% 50%',
              transition: 'opacity .6s ease', opacity: n === i ? 1 : 0 }} />
        ))}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(78deg, color-mix(in srgb, var(--color-accent-900) 80%, transparent) 0%, color-mix(in srgb, var(--color-accent-900) 60%, transparent) 34%, transparent 64%), linear-gradient(180deg, transparent 30%, color-mix(in srgb, var(--color-accent-900) 52%, transparent) 100%)', pointerEvents: 'none' }}></div>
      <button type="button" aria-label="Previous slide" style={arrowStyle('left')} onClick={() => go(i - 1)}>‹</button>
      <button type="button" aria-label="Next slide" style={arrowStyle('right')} onClick={() => go(i + 1)}>›</button>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(68px,6vw,72px) 48px' }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-accent-200)', marginBottom: '12px', textShadow: shadow }}>{s.kicker}</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', fontSize: 'clamp(36px,4.6vw,60px)', lineHeight: 1.04, letterSpacing: '0.01em', textTransform: 'uppercase', color: 'var(--color-bg)', margin: '0 0 0 -0.052em', maxWidth: '20ch', textShadow: shadow }}>{s.title}</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: '22px', color: 'var(--color-accent-100)', margin: '14px 0 0', maxWidth: '56ch', textShadow: shadow }}>{s.sub}</p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href={s.href} style={{ textDecoration: 'none' }}><button type="button" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>{s.cta}</button></a>
            <a href="build.html" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent-200)', textDecoration: 'none' }}>Read the build guide →</a>
          </div>
          <div style={{ display: 'flex', gap: '4px', marginTop: '18px', marginLeft: '-11px' }}>
            {SLIDES.map((sl, n) => (
              <button key={sl.src} type="button" aria-label={'Go to slide ' + (n + 1) + ': ' + sl.title}
                onClick={() => go(n)}
                style={{ width: '32px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 0, cursor: 'pointer', padding: 0 }}>
                <span style={{ width: '10px', height: '10px', border: '1px solid var(--color-bg)', background: n === i ? 'var(--color-bg)' : 'transparent', display: 'block' }}></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = { HeroSlider };
