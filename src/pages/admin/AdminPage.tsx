import { useState } from 'react';
import { Edit2, Plus, Save, X, Eye, BarChart2, Package, TrendingUp, DollarSign } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import type { Product } from '../../types';
import { Link } from 'react-router-dom';

type Tab = 'dashboard' | 'products';

const EMPTY: Omit<Product, 'id'> = {
  name: '', price: 0, category: 'necklaces', images: [''], description: '', details: [], inStock: true, featured: false,
};

export default function AdminPage() {
  const { state, dispatch } = useStore();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>(EMPTY);
  const [detailInput, setDetailInput] = useState('');
  const [saved, setSaved] = useState('');

  const totalCartValue = state.cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const inStockCount = state.products.filter(p => p.inStock).length;

  const saveEdit = () => {
    if (!editing) return;
    dispatch({ type: 'UPDATE_PRODUCT', product: editing });
    setEditing(null);
    setSaved('Product updated successfully!');
    setTimeout(() => setSaved(''), 3000);
  };

  const saveNew = () => {
    if (!newProduct.name || !newProduct.price) return;
    const product: Product = { ...newProduct, id: Date.now().toString() };
    dispatch({ type: 'UPDATE_PRODUCT', product });
    setAdding(false);
    setNewProduct(EMPTY);
    setSaved('Product added successfully!');
    setTimeout(() => setSaved(''), 3000);
  };

  const updateImg = (url: string, idx: number, isEditing: boolean) => {
    if (isEditing && editing) {
      const imgs = [...editing.images]; imgs[idx] = url;
      setEditing({ ...editing, images: imgs });
    } else {
      const imgs = [...newProduct.images]; imgs[idx] = url;
      setNewProduct({ ...newProduct, images: imgs });
    }
  };

  const addImg = (isEditing: boolean) => {
    if (isEditing && editing) setEditing({ ...editing, images: [...editing.images, ''] });
    else setNewProduct({ ...newProduct, images: [...newProduct.images, ''] });
  };

  const addDetail = (isEditing: boolean) => {
    if (!detailInput.trim()) return;
    if (isEditing && editing) setEditing({ ...editing, details: [...editing.details, detailInput] });
    else setNewProduct({ ...newProduct, details: [...newProduct.details, detailInput] });
    setDetailInput('');
  };

  const removeDetail = (i: number, isEditing: boolean) => {
    if (isEditing && editing) setEditing({ ...editing, details: editing.details.filter((_, j) => j !== i) });
    else setNewProduct({ ...newProduct, details: newProduct.details.filter((_, j) => j !== i) });
  };

  const s = {
    card: { background: '#fff', border: '1px solid #e5e0d8', padding: 24, borderRadius: 2 } as React.CSSProperties,
    label: { fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#888', display: 'block', marginBottom: 6, fontWeight: 700 },
    input: { width: '100%', border: '1px solid #e5e0d8', padding: '10px 14px', fontSize: 14, outline: 'none', background: '#fff', boxSizing: 'border-box' as const, fontFamily: 'inherit' },
    btn: (c: string, bg: string): React.CSSProperties => ({ background: bg, color: c, border: 'none', padding: '10px 22px', cursor: 'pointer', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }),
  };

  const ProductForm = ({ isEditing }: { isEditing: boolean }) => {
    const p = isEditing ? editing! : newProduct;
    const set = (key: string, val: unknown) => {
      if (isEditing && editing) setEditing({ ...editing, [key]: val });
      else setNewProduct({ ...newProduct, [key]: val });
    };
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={s.label}>Product Name *</label>
            <input style={s.input} value={p.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Golden Crescent Necklace" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={s.label}>Price (₹) *</label>
              <input style={s.input} type="number" value={p.price || ''} onChange={e => set('price', Number(e.target.value))} />
            </div>
            <div>
              <label style={s.label}>Original Price (₹)</label>
              <input style={s.input} type="number" value={(p as Product).originalPrice || ''} onChange={e => set('originalPrice', e.target.value ? Number(e.target.value) : undefined)} placeholder="Strike-through" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={s.label}>Category *</label>
              <select style={s.input} value={p.category} onChange={e => set('category', e.target.value)}>
                {['necklaces', 'earrings', 'rings', 'bracelets'].map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={s.label}>Badge</label>
              <select style={s.input} value={(p as Product).badge || ''} onChange={e => set('badge', e.target.value || undefined)}>
                <option value="">None</option>
                <option value="New">New</option>
                <option value="Sale">Sale</option>
                <option value="Bestseller">Bestseller</option>
              </select>
            </div>
          </div>
          <div>
            <label style={s.label}>Description *</label>
            <textarea style={{ ...s.input, minHeight: 100, resize: 'vertical' }} value={p.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
              <input type="checkbox" checked={p.inStock} onChange={e => set('inStock', e.target.checked)} /> In Stock
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
              <input type="checkbox" checked={p.featured || false} onChange={e => set('featured', e.target.checked)} /> Featured on Homepage
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={s.label}>Product Images (paste URLs)</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {p.images.map((img, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input style={{ ...s.input, flex: 1 }} value={img} onChange={e => updateImg(e.target.value, i, isEditing)} placeholder="https://..." />
                  {img && <img src={img} alt="" style={{ width: 44, height: 44, objectFit: 'cover', border: '1px solid #e5e0d8', flexShrink: 0 }} onError={e => (e.currentTarget.style.display = 'none')} />}
                </div>
              ))}
              <button onClick={() => addImg(isEditing)} style={{ background: 'transparent', border: '1px dashed #bfa16d', color: '#bfa16d', padding: '10px', cursor: 'pointer', fontSize: 11, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'inherit' }}>
                <Plus size={14} /> Add Image URL
              </button>
            </div>
          </div>
          <div>
            <label style={s.label}>Product Details / Features</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
              {p.details.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f5f2ed', padding: '8px 12px' }}>
                  <span style={{ flex: 1, fontSize: 13 }}>{d}</span>
                  <button onClick={() => removeDetail(i, isEditing)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d4545a', padding: 2 }}><X size={14} /></button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input style={{ ...s.input, flex: 1 }} value={detailInput} onChange={e => setDetailInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addDetail(isEditing)} placeholder="e.g. 22K gold plating — press Enter" />
              <button onClick={() => addDetail(isEditing)} style={s.btn('#fff', '#1c1c1c')}><Plus size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: '#f5f2ed', minHeight: '100vh' }}>
      {/* Top bar */}
      <div style={{ background: '#1c1c1c', color: '#fff', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: 20 }}>Luxe by Zaruni</span>
          <span style={{ color: '#555', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', borderLeft: '1px solid #333', paddingLeft: 20 }}>Admin Panel</span>
        </div>
        <Link to="/" style={{ color: '#bfa16d', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Eye size={14} /> View Store
        </Link>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: '#fff', borderRight: '1px solid #e5e0d8', padding: '32px 0', flexShrink: 0 }}>
          {([['dashboard', BarChart2, 'Dashboard'], ['products', Package, 'Products']] as [Tab, typeof BarChart2, string][]).map(([t, Icon, label]) => (
            <button key={t} onClick={() => setTab(t)} style={{
              width: '100%', background: tab === t ? '#fdfbf7' : 'none', border: 'none',
              borderLeft: tab === t ? '3px solid #bfa16d' : '3px solid transparent',
              padding: '14px 24px', cursor: 'pointer', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
              fontWeight: 700, color: tab === t ? '#1c1c1c' : '#888', display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'inherit',
            }}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 40, overflowY: 'auto' }}>
          {saved && (
            <div style={{ background: '#2d7a4f', color: '#fff', padding: '14px 20px', marginBottom: 24, fontSize: 13, display: 'flex', alignItems: 'center', gap: 10, borderRadius: 2 }}>
              <Save size={15} /> {saved}
            </div>
          )}

          {/* Dashboard tab */}
          {tab === 'dashboard' && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontStyle: 'italic', margin: '0 0 32px' }}>Dashboard</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
                {[
                  { label: 'Total Products', value: state.products.length, Icon: Package, color: '#bfa16d' },
                  { label: 'In Stock', value: inStockCount, Icon: TrendingUp, color: '#2d7a4f' },
                  { label: 'Cart Value', value: `₹${totalCartValue.toLocaleString()}`, Icon: DollarSign, color: '#1c1c1c' },
                  { label: 'Cart Items', value: state.cart.reduce((s, i) => s + i.quantity, 0), Icon: BarChart2, color: '#6366f1' },
                ].map(({ label, value, Icon, color }) => (
                  <div key={label} style={{ ...s.card, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ ...s.label, marginBottom: 0 }}>{label}</span>
                      <Icon size={20} color={color} />
                    </div>
                    <span style={{ fontSize: 32, fontWeight: 700, color }}>{value}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 20px' }}>Products Overview</h3>
              <div style={{ ...s.card, padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f5f2ed' }}>
                      {['Product', 'Category', 'Price', 'Stock', 'Action'].map(h => (
                        <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', fontWeight: 700 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {state.products.map((p, i) => (
                      <tr key={p.id} style={{ borderTop: '1px solid #e5e0d8', background: i % 2 === 0 ? '#fff' : '#fdfbf7' }}>
                        <td style={{ padding: '12px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <img src={p.images[0]} alt="" style={{ width: 40, height: 48, objectFit: 'cover' }} />
                            <span style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 20px', fontSize: 12, color: '#666', textTransform: 'capitalize' }}>{p.category}</td>
                        <td style={{ padding: '12px 20px', fontSize: 13, color: '#bfa16d', fontWeight: 700 }}>₹{p.price.toLocaleString()}</td>
                        <td style={{ padding: '12px 20px' }}>
                          <span style={{ background: p.inStock ? '#e8f5ee' : '#fde8e8', color: p.inStock ? '#2d7a4f' : '#d4545a', fontSize: 10, padding: '4px 10px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>
                            {p.inStock ? 'In Stock' : 'Sold Out'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 20px' }}>
                          <button onClick={() => { setEditing(p); setTab('products'); }} style={{ ...s.btn('#1c1c1c', 'transparent'), border: '1px solid #e5e0d8', padding: '6px 14px' }}>
                            <Edit2 size={12} /> Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products tab */}
          {tab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontStyle: 'italic', margin: 0 }}>Products</h2>
                <button onClick={() => { setAdding(true); setEditing(null); }} style={s.btn('#fff', '#bfa16d')}>
                  <Plus size={16} /> Add New Product
                </button>
              </div>

              {adding && (
                <div style={{ ...s.card, marginBottom: 32, borderColor: '#bfa16d', borderWidth: 2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>New Product</h3>
                    <button onClick={() => setAdding(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                  </div>
                  <ProductForm isEditing={false} />
                  <div style={{ display: 'flex', gap: 12, marginTop: 28, paddingTop: 24, borderTop: '1px solid #e5e0d8' }}>
                    <button onClick={saveNew} style={s.btn('#fff', '#1c1c1c')}><Save size={16} /> Save Product</button>
                    <button onClick={() => setAdding(false)} style={s.btn('#666', '#f5f2ed')}>Cancel</button>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {state.products.map(p => (
                  <div key={p.id}>
                    <div style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 20 }}>
                      <img src={p.images[0]} alt={p.name} style={{ width: 72, height: 88, objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                          <h4 style={{ margin: 0, fontSize: 15, fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>{p.name}</h4>
                          {p.badge && <span style={{ background: '#1c1c1c', color: '#fff', fontSize: 9, padding: '3px 8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.badge}</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#888', flexWrap: 'wrap' }}>
                          <span style={{ color: '#bfa16d', fontWeight: 700 }}>₹{p.price.toLocaleString()}</span>
                          <span style={{ textTransform: 'capitalize' }}>{p.category}</span>
                          <span style={{ color: p.inStock ? '#2d7a4f' : '#d4545a' }}>{p.inStock ? '✓ In Stock' : '✗ Out of Stock'}</span>
                          {p.featured && <span style={{ color: '#bfa16d' }}>★ Featured</span>}
                        </div>
                      </div>
                      <button onClick={() => setEditing(editing?.id === p.id ? null : p)}
                        style={{ ...s.btn('#1c1c1c', editing?.id === p.id ? '#f5f2ed' : 'transparent'), border: '1px solid #e5e0d8' }}>
                        <Edit2 size={14} /> {editing?.id === p.id ? 'Close' : 'Edit'}
                      </button>
                    </div>

                    {editing?.id === p.id && (
                      <div style={{ background: '#fafaf8', border: '1px solid #e5e0d8', borderTop: 'none', padding: 28 }}>
                        <h4 style={{ margin: '0 0 24px', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888' }}>Editing: {p.name}</h4>
                        <ProductForm isEditing={true} />
                        <div style={{ display: 'flex', gap: 12, marginTop: 28, paddingTop: 24, borderTop: '1px solid #e5e0d8' }}>
                          <button onClick={saveEdit} style={s.btn('#fff', '#1c1c1c')}><Save size={16} /> Save Changes</button>
                          <button onClick={() => setEditing(null)} style={s.btn('#666', '#f5f2ed')}>Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
