import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = sessionStorage.getItem('smk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [checkoutDetails, setCheckoutDetails] = useState(() => {
    try {
      const saved = sessionStorage.getItem('smk_checkout');
      return saved ? JSON.parse(saved) : { name: '', phone: '', address: '', notes: '' };
    } catch {
      return { name: '', phone: '', address: '', notes: '' };
    }
  });

  const [lastOrder, setLastOrder] = useState(() => {
    try {
      const saved = sessionStorage.getItem('smk_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const saveCart = (items) => {
    setCartItems(items);
    try {
      sessionStorage.setItem('smk_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const updateCheckoutDetails = (details) => {
    const updated = { ...checkoutDetails, ...details };
    setCheckoutDetails(updated);
    try {
      sessionStorage.setItem('smk_checkout', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const saveLastOrder = (order) => {
    setLastOrder(order);
    try {
      sessionStorage.setItem('smk_last_order', JSON.stringify(order));
    } catch (e) {
      console.error(e);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      sessionStorage.removeItem('smk_cart');
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      let updated;
      if (existing) {
        updated = prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        updated = [...prev, { ...item, quantity: 1 }];
      }
      try {
        sessionStorage.setItem('smk_cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => {
      const updated = prev.filter(i => i.id !== id);
      try {
        sessionStorage.setItem('smk_cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => {
      const updated = prev.map(i => {
        if (i.id === id) {
          const newQty = i.quantity + delta;
          return { ...i, quantity: newQty > 0 ? newQty : 1 };
        }
        return i;
      });
      try {
        sessionStorage.setItem('smk_cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal, 
      cartCount,
      isCartOpen,
      setIsCartOpen,
      checkoutDetails,
      updateCheckoutDetails,
      lastOrder,
      saveLastOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};
