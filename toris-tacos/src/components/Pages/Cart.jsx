import React from 'react';
import Sidebar from '../Layout/Sidebar';
import { useCart } from '../../hooks/useCart';

const Cart = () => {
  const { cartCount, totalPrice, items, removeFromCart, updateQuantity, clientId, showToast, clearCart } = useCart();

  const handleRemoveClick = (itemName) => {
    removeFromCart(itemName);
  };

  const handleRemoveKeyDown = (e, itemName) => {
    if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      removeFromCart(itemName);
    }
  };

  const handlePlaceOrder = async () => {
    if (!items || items.length === 0) return;
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, items, totalPrice })
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Order placed');
        clearCart();
      } else {
        console.error('Order error', data);
        showToast('Order failed');
      }
    } catch (err) {
      console.error('Order request failed', err);
      showToast('Order failed');
    }
  };

  return (
    <>
      <Sidebar />
      <div id="cart-body">
        <h1>Your Cart</h1>
        <h2 id="cart-count">Items in Cart: {cartCount}</h2>
        <h3 id="total-price">Total Price: ${totalPrice.toFixed(2)}</h3>
        <div id="cart-items">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.name} className="cart-item">
                <span className="cart-item-name">{item.name}</span>
                <label className="cart-item-qty">
                  Qty:
                  <input
                    type="number"
                    min="0"
                    value={item.qty || 0}
                    onChange={(e) => updateQuantity(item.name, e.target.value)}
                    aria-label={`Quantity for ${item.name}`}
                  />
                </label>
                <span className="cart-item-price">
                  ${((item.price || 0) * (item.qty || 0)).toFixed(2)}
                </span>
                <button
                  className="remove-item"
                  onClick={() => handleRemoveClick(item.name)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button
            className="add-to-cart-button"
            onClick={handlePlaceOrder}
            disabled={items.length === 0}
            aria-disabled={items.length === 0}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;