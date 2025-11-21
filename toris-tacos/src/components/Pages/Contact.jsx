import React from 'react';
import Sidebar from '../Layout/Sidebar';

const Contact = () => {
  return (
    <>
      <Sidebar />
      <div id="contact-body">
        <h1>Contact Us</h1>
        <div id="map">
          <p></p>
          <iframe
            src="https://www.google.com/maps/place/The+Pentagon/@38.8718567,-77.0611378,17z/data=!3m2!4b1!5s0x89b7b7a32f363b2d:0x1c5f7b0ee3bc814d!4m6!3m5!1s0x89b7b6df29ed2c27:0xaf83d0f8c013532f!8m2!3d38.8718568!4d-77.0562669!16zL20vMDl3M2I?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwNi4wIKXMDSoASAFQAw%3D%3D"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Tori's Tacos Location"
          >
          </iframe>
          <p></p>
        </div>
        <form>
          <label htmlFor="name">Name:</label><br />
          <input type="text" id="name" name="name" required /><br />
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" required /><br />
          <label htmlFor="message">Message:</label><br />
          <textarea id="message" name="message" rows="4" cols="50" required></textarea><br />
          <input type="submit" value="Submit" />
        </form>
        <footer>
          <section className="social-media">
            <nav>
              <a href="https://www.instagram.com/cia/">
                <img src="https://static.vecteezy.com/system/resources/previews/022/227/316/original/facebook-logo-icon-free-png.png" height="30" width="30" alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/russian_kremlin/">
                <img src="https://static.vecteezy.com/system/resources/previews/022/227/304/non_2x/instagram-logo-icon-free-png.png" height="30" width="30" alt="Instagram" />
              </a>
            </nav>
          </section>
          <h3>Business Hours</h3>
          <p>Mon-Fri 11am - 11pm</p>
        </footer>
      </div>
    </>
  );
};

export default Contact;