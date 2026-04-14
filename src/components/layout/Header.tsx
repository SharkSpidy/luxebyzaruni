import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/StoreContext';

export default function Header() {
  const { count, dispatch } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(253,251,247,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e5e0d8' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flex: 1 }}>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className="desktop-nav" style={{ display: 'flex', gap: 32 }}>
            {[['Shop All', '/shop'], ['Necklaces', '/shop?cat=necklaces'], ['Earrings', '/shop?cat=earrings'], ['Rings', '/shop?cat=rings']].map(([label, path]) => (
              <Link key={label} to={path} style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: '#1c1c1c', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#bfa16d')}
                onMouseLeave={e => (e.currentTarget.style.color = '#1c1c1c')}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center logo */}
        <Link to="/" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textDecoration: 'none', color: '#1c1c1c' }}>
          <h1 style={{ fontSize: 26, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, letterSpacing: '-0.02em', fontStyle: 'italic', whiteSpace: 'nowrap', margin: 0 }}>
            Luxe by Zaruni
          </h1>
        </Link>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
          <button onClick={() => setSearchOpen(!searchOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#1c1c1c' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#bfa16d')}
            onMouseLeave={e => (e.currentTarget.style.color = '#1c1c1c')}>
            <Search size={20} />
          </button>
          <button onClick={() => dispatch({ type: 'TOGGLE_CART' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, position: 'relative', color: '#1c1c1c' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#bfa16d')}
            onMouseLeave={e => (e.currentTarget.style.color = '#1c1c1c')}>
            <ShoppingCart size={20} />
            {count > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 2, background: '#bfa16d', color: '#fff', fontSize: 9, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div style={{ borderTop: '1px solid #e5e0d8', padding: '16px 24px', background: '#fdfbf7' }}>
          <form onSubmit={handleSearch} style={{ maxWidth: 480, margin: '0 auto', display: 'flex', gap: 8 }}>
            <input autoFocus value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="Search jewellery..." style={{ flex: 1, border: 'none', borderBottom: '1px solid #1c1c1c', background: 'transparent', padding: '8px 0', fontSize: 14, outline: 'none' }} />
            <button type="submit" style={{ background: '#1c1c1c', color: '#fff', border: 'none', padding: '8px 20px', cursor: 'pointer', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Go</button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ borderTop: '1px solid #e5e0d8', background: '#fdfbf7' }} className="mobile-nav">
          {[['Shop All', '/shop'], ['Necklaces', '/shop?cat=necklaces'], ['Earrings', '/shop?cat=earrings'], ['Rings', '/shop?cat=rings']].map(([label, path]) => (
            <Link key={label} to={path} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '14px 24px', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: '#1c1c1c', textDecoration: 'none', borderBottom: '1px solid #e5e0d8' }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
