import React from 'react';

const Banner = () => {
  const bannerImages = [
    { src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod%2Fimages%2Fdelish-202104-birriatacos-014-1619806491.jpg%3Fcrop%3D0.6668421052631579xw%3A1xh%3Bcenter&f=1&nofb=1&ipt=3e81a59d9331ce39f8620c254ddffd7c41af8e3da9d95d4a3ae5acd1b58ae602", alt: "Birria Taco" },
    { src: "https://iamafoodblog.b-cdn.net/wp-content/uploads/2021/05/al-pastor-3507w.jpg", alt: "Al Pastor Taco" },
    { src: "https://gran.luchito.com/wp-content/uploads/2018/11/Carne-Asada-Tacos-1.jpg", alt: "Carne Asada Taco" },
    { src: "https://bakeitwithlove.com/wp-content/uploads/2023/02/steak-fajitas-sq.jpg", alt: "Steak Fajitas" },
    { src: "https://magazine.foodpanda.my/wp-content/uploads/sites/12/2019/10/cropped-Tostadas.jpg", alt: "Tostadas" },
    { src: "https://insanelygoodrecipes.com/wp-content/uploads/2024/10/chorizo-tacos.jpg", alt: "Chorizo Tacos" },
    { src: "https://www.nospoonnecessary.com/wp-content/uploads/2015/05/pork-carnitas-tacos.jpg", alt: "Carnita Tacos" }
  ];

  return (
    <section className="banner" aria-label="Tacos">
      {bannerImages.map((image, index) => (
        <a href="#" key={index}>
          <img src={image.src} alt={image.alt} />
        </a>
      ))}
    </section>
  );
};

export default Banner;