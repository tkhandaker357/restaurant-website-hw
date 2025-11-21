import React from 'react';
import Sidebar from '../Layout/Sidebar';

const About = () => {
  return (
    <>
      <Sidebar />
      <div id="about-body">
        <h1>About Us</h1>
        <h2>Our Story</h2>
        <p>
          The story behind Tori's Tacos begins when the founder, Tori,
          woke up one morning having slept extremely poorly the night before.
          They rotted away on their phone for hours, scrolling through Instagram Reels,
          and seeing beautiful tacos. Tori had a sudden craving for tacos, and decided to
          go out and get tacos when they'd come home from school and took their quiz.
          However, they bombed the quiz, and were extremely sad. They decided to go to their favorite taco
          place to cheer themselves up, but when they got there, they found out it was closed.
          Tori was devastated, and decided to make their own tacos at home. They made some
          delicious tacos, and decided to share them with their wife. Their wife loved them, and
          encouraged Tori to have their friends try the tacos, and their friends loved the tacos.
          After that, their friends encouraged Tori to open a taco restaurant. And thus, Tori's Tacos was born!
        </p>
        <h2>Our Mission</h2>
        <p>
          At Tori's Tacos, our mission is to provide authentic Mexican tacos at a fair price, using
          fresh, high-quality ingredients, and to create a welcoming and friendly atmosphere for all our customers.
          We believe that everyone deserves to enjoy the best tacos they can have, and we strive to make that happen 
          every day.
        </p>
      </div>
    </>
  );
};

export default About;