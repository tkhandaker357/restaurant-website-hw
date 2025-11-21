import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../Layout/Banner';
import Title from '../Layout/Title';

const Home = () => {
  return (
    <>
      <Banner />
      <Title />
      <div id="restaurant-body">
        <h1>Welcome!</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Your Cart</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Home;