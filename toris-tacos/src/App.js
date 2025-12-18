import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import Home from './components/Pages/Home';
import Menu from './components/Pages/Menu';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Cart from './components/Pages/Cart';
import Toast from './components/UI/Toast';
import './styles.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Toast />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;