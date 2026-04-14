import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Product, CartItem } from '../types';
import { products as initialProducts } from '../data/products';

interface StoreState {
  products: Product[];
  cart: CartItem[];
  isCartOpen: boolean;
}

type Action =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'UPDATE_PRODUCT'; product: Product }
  | { type: 'CLEAR_CART' };

const STORAGE_KEY = 'luxebyzaruni_state';

function storeReducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(i => i.product.id === action.product.id);
      const newCart = existing
        ? state.cart.map(i => i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...state.cart, { product: action.product, quantity: 1 }];
      return { ...state, cart: newCart, isCartOpen: true };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.product.id !== action.productId) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: action.quantity === 0
          ? state.cart.filter(i => i.product.id !== action.productId)
          : state.cart.map(i => i.product.id === action.productId ? { ...i, quantity: action.quantity } : i),
      };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'CLOSE_CART':
      return { ...state, isCartOpen: false };
    case 'UPDATE_PRODUCT':
      return { ...state, products: state.products.map(p => p.id === action.product.id ? action.product : p) };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, {
    products: initialProducts,
    cart: [],
    isCartOpen: false,
  }, (initial) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initial, products: parsed.products || initial.products, cart: parsed.cart || [] };
      }
    } catch {}
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ products: state.products, cart: state.cart }));
  }, [state.products, state.cart]);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export function useCart() {
  const { state, dispatch } = useStore();
  const total = state.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const count = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  return { cart: state.cart, total, count, isCartOpen: state.isCartOpen, dispatch };
}
