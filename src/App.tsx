import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartSidebar from './components/ui/CartSidebar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/admin/AdminPage';

function StoreFront() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <CartSidebar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<StoreFront />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
