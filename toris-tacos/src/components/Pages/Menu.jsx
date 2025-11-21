import React from 'react';
import Sidebar from '../Layout/Sidebar';
import MenuItem from '../UI/MenuItem';

const Menu = () => {
  const menuItems = [
    {
      id: "birria-tacos",
      name: "BIRRIA TACOS",
      price: "6.77",
      description: "Tasty tacos filled with tender, slow-cooked beef, topped with melted cheese, onions, and cilantro. Served with a side of rich consomme for dipping.",
      image: "https://i.pinimg.com/originals/db/0d/8b/db0d8b438088b75d9e20796e3c0babbb.jpg",
      alt: "Birria Taco"
    },
    {
      id: "al-pastor-tacos",
      name: "AL PASTOR TACOS",
      price: "41.66",
      description: "Marinated pork cooked on a vertical spit, served with pineapple, onions, and cilantro. A perfect balance of sweet and savory flavors.",
      image: "https://iamafoodblog.b-cdn.net/wp-content/uploads/2021/05/al-pastor-3507w.jpg",
      alt: "Al Pastor Taco"
    },
    {
      id: "carne-asada-tacos",
      name: "CARNE ASADA TACOS",
      price: "4.20",
      description: "Grilled steak seasoned to perfection, topped with fresh onions and cilantro. Served with a side of tangy salsa.",
      image: "https://gran.luchito.com/wp-content/uploads/2018/11/Carne-Asada-Tacos-1.jpg",
      alt: "Carne Asada Taco"
    },
    {
      id: "steak-fajitas",
      name: "STEAK FAJITAS",
      price: "6.99",
      description: "Sizzling strips of marinated steak cooked with bell peppers and onions. Served with warm tortillas, guacamole, sour cream, and salsa.",
      image: "https://bakeitwithlove.com/wp-content/uploads/2023/02/steak-fajitas-sq.jpg",
      alt: "Steak Fajitas"
    },
    {
      id: "tostadas",
      name: "TOSTADAS",
      price: "9.00",
      description: "Crispy corn tortillas topped with refried beans, shredded lettuce, diced tomatoes, cheese, and your choice of meat (chicken, beef, or pork).",
      image: "https://magazine.foodpanda.my/wp-content/uploads/sites/12/2019/10/cropped-Tostadas.jpg",
      alt: "Tostadas"
    },
    {
      id: "chorizo-tacos",
      name: "CHORIZO TACOS",
      price: "10.00",
      description: "Spicy Mexican sausage cooked to perfection, topped with onions and cilantro. Served with a side of fresh lime wedges.",
      image: "https://insanelygoodrecipes.com/wp-content/uploads/2024/10/chorizo-tacos.jpg",
      alt: "Chorizo Tacos"
    },
    {
      id: "carnita-tacos",
      name: "CARNITA TACOS",
      price: "0.21",
      description: "Slow-cooked pork that is tender on the inside and crispy on the outside. Topped with onions, cilantro, and a squeeze of lime.",
      image: "https://www.nospoonnecessary.com/wp-content/uploads/2015/05/pork-carnitas-tacos.jpg",
      alt: "Carnita Tacos"
    }
  ];

  return (
    <>
      <Sidebar />
      <main className="menu">
        <h1>Menu</h1>
        {menuItems.map((item, index) => (
          <MenuItem key={item.id} item={item} index={index} />
        ))}
      </main>
    </>
  );
};

export default Menu;