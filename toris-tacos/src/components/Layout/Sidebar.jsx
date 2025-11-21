import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useMobileNav } from '../../hooks/useMobileNav';

const Sidebar = () => {
  const { cartCount } = useCart();
  const { isNavOpen, toggleNav } = useMobileNav();

  return (
    <section className="sidebar">
      <nav className={isNavOpen ? 'open' : ''}>
        <button 
          className="mobile-nav-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isNavOpen}
          onClick={toggleNav}
        >
          ☰
        </button>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <Link to="/cart">
              Your Cart
              {cartCount > 0 && <span className="cart-badge" aria-hidden="true"></span>}
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;