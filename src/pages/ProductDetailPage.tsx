import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ui/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { state, dispatch } = useStore();
  const product = state.products.find(p => p.id === id);
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <h2>Product not found</h2>
      <Link to="/shop">← Back to Shop</Link>
    </div>
  );

  const related = state.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD_TO_CART', product });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ background: '#fdfbf7' }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px' }}>
        <nav style={{ fontSize: 11, color: '#888', letterSpacing: '0.1em', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: '#888', textDecoration: 'none' }}>Shop</Link>
          <span>/</span>
          <span style={{ color: '#1c1c1c' }}>{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 24px 96px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        {/* Images */}
        <div>
          <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: '#f5f2ed', marginBottom: 16 }}>
            <img src={product.images[imgIdx]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {product.images.length > 1 && (
              <>
                <button onClick={() => setImgIdx(i => (i - 1 + product.images.length) % product.images.length)}
                  style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(253,251,247,0.9)', border: 'none', cursor: 'pointer', padding: 10 }}>
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => setImgIdx(i => (i + 1) % product.images.length)}
                  style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(253,251,247,0.9)', border: 'none', cursor: 'pointer', padding: 10 }}>
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: 12 }}>
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)} style={{ width: 72, height: 88, overflow: 'hidden', border: i === imgIdx ? '2px solid #bfa16d' : '2px solid transparent', cursor: 'pointer', padding: 0 }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ paddingTop: 24 }}>
          {product.badge && (
            <span style={{ background: product.badge === 'Sale' ? '#d4545a' : '#1c1c1c', color: '#fff', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 12px', fontWeight: 700, display: 'inline-block', marginBottom: 20 }}>
              {product.badge}
            </span>
          )}
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontStyle: 'italic', fontWeight: 400, margin: '0 0 20px', lineHeight: 1.2 }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <span style={{ fontSize: 24, color: '#bfa16d', fontWeight: 700 }}>₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span style={{ fontSize: 18, color: '#aaa', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <p style={{ color: '#555', lineHeight: 1.9, fontSize: 15, marginBottom: 36 }}>{product.description}</p>

          {/* Details */}
          <div style={{ marginBottom: 36, borderTop: '1px solid #e5e0d8', paddingTop: 24 }}>
            <h4 style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>Product Details</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {product.details.map((d, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#555' }}>
                  <span style={{ width: 5, height: 5, background: '#bfa16d', borderRadius: '50%', flexShrink: 0 }} />{d}
                </li>
              ))}
            </ul>
          </div>

          {/* Add to cart */}
          {product.inStock ? (
            <div>
              {/* Qty */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888' }}>Qty</span>
                <div style={{ display: 'flex', border: '1px solid #e5e0d8' }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px 16px', fontSize: 16 }}>−</button>
                  <span style={{ padding: '10px 20px', fontSize: 14, minWidth: 40, textAlign: 'center' }}>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px 16px', fontSize: 16 }}>+</button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={handleAdd} style={{
                  flex: 1, background: added ? '#2d7a4f' : '#1c1c1c', color: '#fff', border: 'none', padding: '18px 32px', cursor: 'pointer',
                  fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, transition: 'background 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                }}>
                  {added ? <><Check size={16} /> Added!</> : <><ShoppingCart size={16} /> Add to Cart</>}
                </button>
                <button onClick={() => setWishlisted(!wishlisted)} style={{ background: 'none', border: '1px solid #e5e0d8', padding: '18px 20px', cursor: 'pointer', color: wishlisted ? '#bfa16d' : '#1c1c1c' }}>
                  <Heart size={18} fill={wishlisted ? '#bfa16d' : 'none'} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ background: '#f5f2ed', padding: '20px', textAlign: 'center', color: '#888', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Currently Out of Stock
            </div>
          )}

          {/* Trust badges */}
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {['Free Gift Wrap', 'Easy Returns', 'Secure Checkout'].map(t => (
              <div key={t} style={{ textAlign: 'center', padding: '16px 8px', border: '1px solid #e5e0d8' }}>
                <p style={{ fontSize: 10, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: '#f5f2ed', padding: '80px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 30, fontStyle: 'italic', marginBottom: 40 }}>You May Also Love</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
