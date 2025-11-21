import React from 'react';
import { useCart } from '../../hooks/useCart';

const MenuItem = ({ item, index }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    const name = e.currentTarget.dataset.name;
    const price = parseFloat(e.currentTarget.dataset.price) || 0;
    addToCart(name, price);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space') {
      e.preventDefault();
      e.currentTarget.click();
    }
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
        <h5 
          className="add-to-cart"
          data-name={item.name}
          data-price={item.price}
          onClick={handleAddToCart}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex="0"
        >
          Add to Cart
        </h5>
      </div>
    </article>
  );
};

export default MenuItem;