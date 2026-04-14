import { Link } from 'react-router-dom';
import { Mail, Heart, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#1c1c1c', color: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48 }}>
        <div style={{ gridColumn: 'span 2' }}>
          <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontStyle: 'italic', fontWeight: 700, marginBottom: 20 }}>Luxe by Zaruni</h4>
          <p style={{ color: '#888', fontSize: 14, lineHeight: 1.8, maxWidth: 320, marginBottom: 32 }}>
            Crafting timeless elegance for the modern woman. Every piece tells a story of luxury and sophistication.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[Share2, Heart, Mail].map((Icon, i) => (
              <button key={i} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 4 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#bfa16d')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h5 style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Quick Links</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['Shop All', '/shop'], ['Our Story', '/about'], ['Contact', '/contact'], ['FAQ', '/faq']].map(([label, path]) => (
              <li key={label}>
                <Link to={path} style={{ color: '#888', fontSize: 13, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#bfa16d')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Newsletter</h5>
          <p style={{ color: '#888', fontSize: 13, marginBottom: 20 }}>Join our inner circle for exclusive access.</p>
          <div style={{ display: 'flex', borderBottom: '1px solid #444', paddingBottom: 8 }}>
            <input type="email" placeholder="Email Address" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 13 }} />
            <button style={{ background: 'none', border: 'none', color: '#bfa16d', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer' }}>Join</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 24px', borderTop: '1px solid #2a2a2a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ color: '#555', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>© 2024 Luxe by Zaruni. All Rights Reserved.</p>
        <Link to="/admin" style={{ color: '#555', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#bfa16d')}
          onMouseLeave={e => (e.currentTarget.style.color = '#555')}>
          Admin
        </Link>
      </div>
    </footer>
  );
}
