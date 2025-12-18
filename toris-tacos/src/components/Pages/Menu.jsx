import React, { useEffect, useState } from 'react';
import Sidebar from '../Layout/Sidebar';
import MenuItem from '../UI/MenuItem';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        setMenuItems(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load menu', err);
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <Sidebar />
      <main className="menu">
        <h1>Menu</h1>
        {loading ? (
          <p>Loading menu...</p>
        ) : (
          menuItems.map((item, index) => (
            <MenuItem key={item.id || item._id || index} item={item} index={index} />
          ))
        )}
      </main>
    </>
  );
};

export default Menu;