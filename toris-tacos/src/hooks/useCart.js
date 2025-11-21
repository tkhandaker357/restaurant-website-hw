import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [items, setItems] = useState([]);

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

  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  return (
    <CartContext.Provider value={{
      cartCount,
      totalPrice,
      items,
      addToCart,
      removeFromCart,
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