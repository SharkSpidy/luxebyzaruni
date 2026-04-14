import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/StoreContext';

export default function CartSidebar() {
  const { cart, total, isCartOpen, dispatch } = useCart();

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div onClick={() => dispatch({ type: 'CLOSE_CART' })}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, backdropFilter: 'blur(2px)' }} />
      )}

      {/* Sidebar */}
      <div style={{
        position: 'fixed', top: 0, right: 0, width: 420, height: '100vh', background: '#fdfbf7', zIndex: 201,
        transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 40px rgba(0,0,0,0.12)'
      }}>
        {/* Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #e5e0d8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, margin: 0 }}>Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</h2>
          <button onClick={() => dispatch({ type: 'CLOSE_CART' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><X size={20} /></button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: 80 }}>
              <p style={{ color: '#999', fontSize: 14 }}>Your cart is empty</p>
              <button onClick={() => dispatch({ type: 'CLOSE_CART' })} style={{ marginTop: 20, background: '#1c1c1c', color: '#fff', border: 'none', padding: '12px 28px', cursor: 'pointer', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {cart.map(({ product, quantity }) => (
                <div key={product.id} style={{ display: 'flex', gap: 16 }}>
                  <img src={product.images[0]} alt={product.name} style={{ width: 80, height: 96, objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 600, margin: '0 0 4px' }}>{product.name}</h4>
                    <p style={{ color: '#bfa16d', fontSize: 13, fontWeight: 600, margin: '0 0 12px' }}>₹{product.price.toLocaleString()}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #e5e0d8' }}>
                        <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', productId: product.id, quantity: quantity - 1 })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px' }}><Minus size={12} /></button>
                        <span style={{ fontSize: 13, minWidth: 20, textAlign: 'center' }}>{quantity}</span>
                        <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', productId: product.id, quantity: quantity + 1 })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px' }}><Plus size={12} /></button>
                      </div>
                      <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', productId: product.id })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '24px 28px', borderTop: '1px solid #e5e0d8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Subtotal</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>₹{total.toLocaleString()}</span>
            </div>
            <p style={{ fontSize: 11, color: '#999', marginBottom: 20 }}>Shipping calculated at checkout</p>
            <button style={{ width: '100%', background: '#1c1c1c', color: '#fff', border: 'none', padding: '16px', cursor: 'pointer', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>
              Proceed to Checkout
            </button>
            <button onClick={() => dispatch({ type: 'CLOSE_CART' })} style={{ width: '100%', background: 'transparent', color: '#1c1c1c', border: '1px solid #e5e0d8', padding: '14px', cursor: 'pointer', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
