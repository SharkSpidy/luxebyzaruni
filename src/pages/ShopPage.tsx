import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ui/ProductCard';

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
];

export default function ShopPage() {
  const { state } = useStore();
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState('default');

  const activeCat = params.get('cat') || 'all';
  const query = params.get('q') || '';
  const cats = ['all', 'necklaces', 'earrings', 'rings', 'bracelets'];

  const filtered = useMemo(() => {
    let items = [...state.products];
    if (activeCat !== 'all') items = items.filter(p => p.category === activeCat);
    if (query) items = items.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
    switch (sort) {
      case 'price-asc': items.sort((a, b) => a.price - b.price); break;
      case 'price-desc': items.sort((a, b) => b.price - a.price); break;
      case 'name': items.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return items;
  }, [state.products, activeCat, query, sort]);

  const setCat = (cat: string) => {
    const p = new URLSearchParams(params);
    if (cat === 'all') p.delete('cat'); else p.set('cat', cat);
    p.delete('q');
    setParams(p);
  };

  return (
    <div style={{ background: '#fdfbf7', minHeight: '100vh' }}>
      <div style={{ background: '#f5f2ed', borderBottom: '1px solid #e5e0d8', padding: '60px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', margin: '0 0 12px' }}>Luxe by Zaruni</p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 48, fontStyle: 'italic', fontWeight: 300, margin: '0 0 4px' }}>
          {query ? `Search: "${query}"` : activeCat === 'all' ? 'All Pieces' : activeCat.charAt(0).toUpperCase() + activeCat.slice(1)}
        </h1>
        <p style={{ color: '#888', fontSize: 13, margin: 0 }}>{filtered.length} pieces</p>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 0', borderBottom: '1px solid #e5e0d8', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {cats.map(cat => (
              <button key={cat} onClick={() => setCat(cat)} style={{
                background: activeCat === cat ? '#1c1c1c' : 'transparent',
                color: activeCat === cat ? '#fff' : '#666',
                border: '1px solid ' + (activeCat === cat ? '#1c1c1c' : '#e5e0d8'),
                padding: '8px 18px', cursor: 'pointer', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, transition: 'all 0.2s',
              }}>
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {query && (
              <button onClick={() => setParams({})} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f5f2ed', border: '1px solid #e5e0d8', padding: '8px 14px', cursor: 'pointer', fontSize: 11 }}>
                <X size={12} /> Clear search
              </button>
            )}
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ border: '1px solid #e5e0d8', background: 'transparent', padding: '8px 14px', fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer', outline: 'none' }}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div style={{ padding: '56px 0 96px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px 28px' }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: '#888', fontSize: 16 }}>No pieces found.</p>
            </div>
          ) : filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
