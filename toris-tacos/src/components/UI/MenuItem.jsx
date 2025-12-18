import React from 'react';
import { useCart } from '../../hooks/useCart';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const price = parseFloat(item.price) || 0;
    addToCart(item.name, price);
  };

  return (
    <article className="menu-item" id={item.id}>
      <div className="menu-img">
        <img src={item.image} alt={item.alt} />
      </div>
      <div className="menu-content">
        <h2>{item.name}</h2>
        <h3>${item.price}</h3>
        <p>{item.description}</p> 
        <button
          className="add-to-cart-button"
          type="button"
          onClick={handleAddToCart}
          aria-label={`Add ${item.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default MenuItem;