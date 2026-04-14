import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { useState } from 'react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { dispatch } = useStore();
  const [hovered, setHovered] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div onMouseEnter={() => { setHovered(true); if (product.images[1]) setImgIdx(1); }}
      onMouseLeave={() => { setHovered(false); setImgIdx(0); }}
      style={{ position: 'relative', cursor: 'pointer' }}>

      {/* Badge */}
      {product.badge && (
        <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, background: product.badge === 'Sale' ? '#d4545a' : '#1c1c1c', color: '#fff', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px', fontWeight: 700 }}>
          {product.badge}
        </div>
      )}

      {/* Wishlist */}
      <button onClick={e => { e.preventDefault(); setWishlisted(!wishlisted); }}
        style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, background: 'rgba(253,251,247,0.9)', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%', color: wishlisted ? '#bfa16d' : '#1c1c1c', display: hovered ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
        <Heart size={14} fill={wishlisted ? '#bfa16d' : 'none'} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: '#f5f2ed', position: 'relative' }}>
          <img src={product.images[imgIdx] || product.images[0]} alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
          {!product.inStock && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(253,251,247,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Sold Out</span>
            </div>
          )}

          {/* Quick add */}
          {product.inStock && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#1c1c1c', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease' }}>
              <button onClick={e => { e.preventDefault(); dispatch({ type: 'ADD_TO_CART', product }); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
                <ShoppingCart size={14} /> Add to Cart
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div style={{ marginTop: 16 }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{ fontSize: 14, fontWeight: 500, margin: '0 0 6px', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>{product.name}</h3>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 14, color: '#bfa16d', fontWeight: 600 }}>₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span style={{ fontSize: 12, color: '#aaa', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
