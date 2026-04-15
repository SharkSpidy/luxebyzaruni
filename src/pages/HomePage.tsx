import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ui/ProductCard';
import Title_Img from '../assets/images/Title_img.webp'

export default function HomePage() {
  const { state } = useStore();
  const featured = state.products.filter(p => p.featured);

  return (
    <div style={{ background: '#fdfbf7' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: '85vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={Title_Img}
          alt="Luxe Collection" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', padding: '0 24px' }}>
          <span style={{ display: 'block', fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 20, opacity: 0.9 }}>New Arrival</span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 300, fontStyle: 'italic', marginBottom: 40, lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.3)', margin: '0 0 40px' }}>
            The Golden Hour
          </h2>
          <Link to="/shop" style={{ display: 'inline-block', background: '#bfa16d', color: '#fff', padding: '16px 52px', textDecoration: 'none', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, transition: 'background 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1c1c1c')}
            onMouseLeave={e => (e.currentTarget.style.background = '#bfa16d')}>
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background: '#bfa16d', overflow: 'hidden', padding: '14px 0' }}>
        <div style={{ display: 'flex', gap: 60, animation: 'marquee 20s linear infinite', whiteSpace: 'nowrap' }}>
          {Array(3).fill(['✦ Free Shipping over ₹3000', '✦ Handcrafted with Love', '✦ 22K Gold Plating', '✦ Gift Packaging Available']).flat().map((t, i) => (
            <span key={i} style={{ fontSize: 11, color: '#fff', letterSpacing: '0.2em', textTransform: 'uppercase', flexShrink: 0 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontStyle: 'italic', margin: '0 0 8px' }}>Curated for Elegance</h3>
          <p style={{ color: '#888', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', margin: 0 }}>Discover our most loved pieces</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {[
            { label: 'Signature Necklaces', cat: 'necklaces', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80' },
            { label: 'Timeless Earrings', cat: 'earrings', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80' },
            { label: 'Luxury Rings', cat: 'rings', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80' },
          ].map(({ label, cat, img }) => (
            <Link to={`/shop?cat=${cat}`} key={cat} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5', marginBottom: 20 }}
                onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLElement; if (img) img.style.transform = 'scale(1.06)'; }}
                onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLElement; if (img) img.style.transform = 'scale(1)'; }}>
                <img src={img} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} />
              </div>
              <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontStyle: 'italic', margin: '0 0 6px' }}>{label}</h4>
              <p style={{ color: '#888', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>Shop Now →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section style={{ background: '#f5f2ed', padding: '96px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontStyle: 'italic', margin: '0 0 8px' }}>Bestsellers</h3>
              <p style={{ color: '#888', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', margin: 0 }}>Pieces our clients adore</p>
            </div>
            <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1c1c1c', textDecoration: 'none', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, borderBottom: '1px solid #1c1c1c', paddingBottom: 2 }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Story banner */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
            alt="Story" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }} />
        </div>
        <div>
          <span style={{ fontSize: 10, color: '#bfa16d', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'block', marginBottom: 20 }}>Our Story</span>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 42, fontStyle: 'italic', lineHeight: 1.2, margin: '0 0 28px' }}>
            Every Piece, a Promise of Elegance
          </h3>
          <p style={{ color: '#666', lineHeight: 1.9, fontSize: 15, marginBottom: 36 }}>
            Luxe by Zaruni was born from a passion for jewelry that speaks without words — pieces that make you feel seen, celebrated, and timeless. Each design is crafted with intention and worn with pride.
          </p>
          <Link to="/shop" style={{ display: 'inline-block', border: '1px solid #1c1c1c', color: '#1c1c1c', padding: '14px 40px', textDecoration: 'none', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1c1c1c'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1c1c1c'; }}>
            Discover More
          </Link>
        </div>
      </section>

      {/* Instagram grid */}
      <section style={{ background: '#fdfbf7', padding: '0 0 96px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 30, fontStyle: 'italic', margin: '0 0 6px' }}>As Seen on Instagram</h3>
              <p style={{ color: '#888', fontSize: 13 }}>Follow <strong>@luxebyzaruni</strong> for daily inspiration</p>
            </div>
            <a href="https://instagram.com/luxebyzaruni" target="_blank" rel="noreferrer"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1c1c1c', borderBottom: '1px solid #1c1c1c', paddingBottom: 2, textDecoration: 'none' }}>
              Follow Us
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {[
              'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=400',
              'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=400',
              'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400',
              'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&w=400&q=80',
            ].map((src, i) => (
              <div key={i} style={{ aspectRatio: '1', overflow: 'hidden' }}
                onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLElement; if (img) img.style.transform = 'scale(1.1)'; }}
                onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLElement; if (img) img.style.transform = 'scale(1)'; }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @media (max-width: 1024px) {
          .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .story-grid { grid-template-columns: 1fr !important; }
          .insta-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
