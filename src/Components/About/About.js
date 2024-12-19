import React from 'react';
import eventImage from './tnf.jpg';
import adobo from './adobo.jpg';
import choco from './choco.jpg';
import fishfillet from './fishfillet.jpg';
import salad from './salad.jpg';
import spag from './spag.jpg';
import taco from './taco.jpg';
import tambakol from './tambakol.jpg';
import hawai from './hawai.jpg';
import horror from './horror.jpg';
import mex from './mex.jpg';
import motor from './motor.jpg';
import './About.css'; // Add your styles here or use TailwindCSS.

const About = () => {
  return (
    <div className="about-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <a href="#welcome" className="nav-link">Welcome</a>
        <a href="#classics" className="nav-link">Taste the Classics</a>
        <a href="#varieties" className="nav-link">Explore the Varieties</a>
        <a href="#partners" className="nav-link">Partners</a>
      </nav>

      {/* Welcome Section */}
      <section id="welcome" className="section">
        <h1 className="section-title">Welcome to TNF Event Center</h1>
        <p className="section-description">
          Step into a realm where celebrations transcend into timeless memories. TNF Event Center is more than just a venue—it’s a sanctuary where love, laughter, and life converge. Let your milestones unfold amidst our elegant ambiance, designed to breathe life into every cherished moment.
        </p>
        <img src={eventImage} alt="Event Center" className="section-image" />
      </section>

      {/* Taste the Classics Section */}
      <section id="classics" className="section">
        <h2 className="section-title">Taste the Classics</h2>
        <p className="section-description">
          Experience the flavors that have stood the test of time. Every bite brings comfort, nostalgia, and joy to your palate.
        </p>
        <div className="card-container">
          {[
            { img: adobo, desc: 'Tangy, savory Adobo—a taste of Filipino tradition.' },
            { img: choco, desc: 'Rich, velvety chocolate creations to delight your senses.' },
            { img: fishfillet, desc: 'Golden, crispy fish fillet for a light yet satisfying treat.' },
            { img: salad, desc: 'Fresh, vibrant salad bowls bursting with colors and crunch.' },
            { img: spag, desc: 'Classic spaghetti smothered in rich tomato sauce.' },
            { img: taco, desc: 'Zesty tacos filled with bold, mouthwatering flavors.' },
            { img: tambakol, desc: 'Succulent Tambakol (tuna) cooked to perfection.' },
          ].map((item, idx) => (
            <div key={idx} className="card">
              <img src={item.img} alt="Classic Dish" className="card-image" />
              <p className="card-description">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore the Varieties Section */}
      <section id="varieties" className="section">
        <h2 className="section-title">Explore the Varieties</h2>
        <p className="section-description">
          Dive into a world of adventurous cuisines crafted with passion and creativity.
        </p>
        <div className="card-container">
          {[
            { img: hawai, desc: 'Sweet and savory Hawaiian-inspired dishes await.' },
            { img: horror, desc: 'Spooky delights for those with adventurous tastes.' },
            { img: mex, desc: 'Mexican fusion flavors to ignite your taste buds.' },
            { img: motor, desc: 'Innovative dishes for the modern food enthusiast.' },
          ].map((item, idx) => (
            <div key={idx} className="card">
              <img src={item.img} alt="Variety Dish" className="card-image" />
              <p className="card-description">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="section">
        <h2 className="section-title">Our Proud Partners</h2>
        <div className="partners-container">
          <p className="partner-link">
            <a
              href="https://www.facebook.com/panjielutongbahay"
              target="_blank"
              rel="noopener noreferrer"
            >
              Panjie - Lutong Bahay
            </a>
          </p>
          <p className="partner-link">
            <a
              href="https://www.facebook.com/ailindsgrazingtable"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ailin D’s Grazing Table and Cabinet
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
