import React from 'react';
import Sidebar from '../Layout/Sidebar';
import { useCart } from '../../hooks/useCart';

const Cart = () => {
  const { cartCount, totalPrice, items, removeFromCart } = useCart();

  const handleRemoveClick = (itemName) => {
    removeFromCart(itemName);
  };

  const handleRemoveKeyDown = (e, itemName) => {
    if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      removeFromCart(itemName);
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
                <span className="cart-item-qty"> x{item.qty || 0}</span>
                <span className="cart-item-price">
                  ${((item.price || 0) * (item.qty || 0)).toFixed(2)}
                </span>
                <span
                  className="remove-item"
                  role="button"
                  tabIndex="0"
                  onClick={() => handleRemoveClick(item.name)}
                  onKeyDown={(e) => handleRemoveKeyDown(e, item.name)}
                >
                  Remove
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;