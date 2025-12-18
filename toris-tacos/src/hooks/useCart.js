import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [items, setItems] = useState([]);
  const [lastAdded, setLastAdded] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [clientId, setClientId] = useState(null);

  const recalcTotals = (itemsArray) => {
    const count = itemsArray.reduce((sum, it) => sum + (it.qty || 0), 0);
    const price = itemsArray.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 0), 0);
    setCartCount(count);
    setTotalPrice(price);
    return { count, price };
  };

  const addToCart = (itemName, itemPrice) => {
    const price = Number(itemPrice) || 0;
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(it => it.name === itemName);
      let newItems;
      
      if (existingIndex > -1) {
        newItems = [...prevItems];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          qty: (newItems[existingIndex].qty || 0) + 1
        };
      } else {
        newItems = [...prevItems, { name: itemName, price, qty: 1 }];
      }
      
      recalcTotals(newItems);
      return newItems;
    });
    // show toast
    setLastAdded(itemName);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1800);
  };

  const showToast = (msg) => {
    setLastAdded(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1800);
  };

  const removeFromCart = (itemName) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(it => it.name === itemName);
      if (existingIndex === -1) return prevItems;
      
      let newItems;
      if (prevItems[existingIndex].qty > 1) {
        newItems = [...prevItems];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          qty: newItems[existingIndex].qty - 1
        };
      } else {
        newItems = prevItems.filter((_, idx) => idx !== existingIndex);
      }
      
      recalcTotals(newItems);
      return newItems;
    });
  };

  const updateQuantity = (itemName, qty) => {
    const q = Number(qty) || 0;
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(it => it.name === itemName);
      if (existingIndex === -1) return prevItems;

      let newItems = [...prevItems];
      if (q <= 0) {
        newItems = newItems.filter((_, idx) => idx !== existingIndex);
      } else {
        newItems[existingIndex] = { ...newItems[existingIndex], qty: q };
      }
      recalcTotals(newItems);
      return newItems;
    });
  };

  const saveCartToStorage = (itemsToSave) => {
    try {
      const data = { items: itemsToSave, cartCount, totalPrice };
      localStorage.setItem('restaurantCart', JSON.stringify(data));
    } catch (err) {
      console.warn('Could not save cart to localStorage', err);
    }
  };

  const loadCartFromStorage = () => {
    try {
      const raw = localStorage.getItem('restaurantCart');
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.items)) {
          setItems(data.items);
          recalcTotals(data.items);
        }
      }
    } catch (err) {
      console.warn('Could not load cart from localStorage', err);
    }
  };

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // generate or load clientId and sync with server
  useEffect(() => {
    let id = localStorage.getItem('restaurantClientId');
    if (!id) {
      id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `cid-${Math.random().toString(36).slice(2,10)}`;
      localStorage.setItem('restaurantClientId', id);
    }
    setClientId(id);

    // fetch cart from server
    fetch(`/api/cart?clientId=${encodeURIComponent(id)}`)
      .then(r => r.json())
      .then(data => {
        if (data && Array.isArray(data.items)) {
          setItems(data.items);
          recalcTotals(data.items);
        }
      })
      .catch(err => {
        // leave local storage-based cart if server unreachable
        console.warn('Could not fetch cart from server', err);
      });
  }, []);

  useEffect(() => {
    saveCartToStorage(items);
    // persist cart to server when clientId available
    try {
      const id = localStorage.getItem('restaurantClientId');
      if (id) {
        fetch('/api/cart', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId: id, items })
        }).catch(err => console.warn('Could not save cart to server', err));
      }
    } catch (err) {
      console.warn('Cart persistence failed', err);
    }
  }, [items]);

  const clearCart = () => {
    setItems([]);
    setCartCount(0);
    setTotalPrice(0);
    const id = localStorage.getItem('restaurantClientId');
    if (id) {
      // ask server to delete cart (orders endpoint already deletes after order)
      fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: id, items: [] })
      }).catch(() => {});
    }
  };

  return (
    <CartContext.Provider value={{
      cartCount,
      totalPrice,
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      clientId,
      showToast,
      lastAdded,
      toastVisible,
      recalcTotals
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};