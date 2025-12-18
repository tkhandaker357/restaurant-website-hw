import React from 'react';
import { useCart } from '../../hooks/useCart';

const Toast = () => {
  const { lastAdded, toastVisible } = useCart();

  return (
    <div aria-live="polite" aria-atomic="true">
      <div className={`toast ${toastVisible ? 'visible' : ''}`}>
        {lastAdded ? `${lastAdded} added to cart` : ''}
      </div>
    </div>
  );
};

export default Toast;
