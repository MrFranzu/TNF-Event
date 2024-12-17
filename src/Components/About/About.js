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

const About = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#fff',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
    color: '#333',
  };

  const sectionTitleStyle = {
    fontSize: '36px',
    color: '#6A0DAD',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: '700',
  };

  const descriptionStyle = {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.8',
    maxWidth: '800px',
    textAlign: 'center',
    marginBottom: '40px',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F7F5FA',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(106, 13, 173, 0.15)',
    padding: '20px',
    maxWidth: '300px',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 24px rgba(106, 13, 173, 0.3)',
  };

  const imageStyle = {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    marginTop: '20px',
    backgroundColor: '#6A0DAD',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#580a9c',
  };

  const partnersStyle = {
    backgroundColor: '#F3F1F5',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center',
    maxWidth: '800px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    margin: '40px 0',
  };

  return (
    <div style={containerStyle}>
      {/* Welcome Section */}
      <div>
        <h1 style={sectionTitleStyle}>Welcome to TNF Event Center</h1>
        <p style={descriptionStyle}>
          Step into a realm where celebrations transcend into timeless memories. TNF Event Center is more than just a venue—it’s a sanctuary where love, laughter, and life converge. Let your milestones unfold amidst our elegant ambiance, designed to breathe life into every cherished moment. Whether it's a jubilant wedding or a cozy gathering, this is where your story begins.
        </p>
        <img src={eventImage} alt="Event Center" style={{ ...imageStyle, Width: 'px', height: '400px' }} />
      </div>

      {/* Taste the Classics Section */}
      <h2 style={sectionTitleStyle}>Taste the Classics</h2>
      <p style={descriptionStyle}>
        Experience the flavors that have stood the test of time. Every bite brings comfort, nostalgia, and joy to your palate.
      </p>
      <div style={cardContainerStyle}>
        {[
          { img: adobo, desc: 'Tangy, savory Adobo—a taste of Filipino tradition.' },
          { img: choco, desc: 'Rich, velvety chocolate creations to delight your senses.' },
          { img: fishfillet, desc: 'Golden, crispy fish fillet for a light yet satisfying treat.' },
          { img: salad, desc: 'Fresh, vibrant salad bowls bursting with colors and crunch.' },
          { img: spag, desc: 'Classic spaghetti smothered in rich tomato sauce.' },
          { img: taco, desc: 'Zesty tacos filled with bold, mouthwatering flavors.' },
          { img: tambakol, desc: 'Succulent Tambakol (tuna) cooked to perfection.' },
        ].map((item, idx) => (
          <div
            key={idx}
            style={cardStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <img src={item.img} alt="Classic Dish" style={imageStyle} />
            <p style={{ fontSize: '16px', color: '#666' }}>{item.desc}</p>
           
          </div>
        ))}
      </div>

      {/* Explore the Varieties Section */}
      <h2 style={sectionTitleStyle}>Explore the Varieties</h2>
      <p style={descriptionStyle}>
        Dive into a world of adventurous cuisines crafted with passion and creativity.
      </p>
      <div style={cardContainerStyle}>
        {[
          { img: hawai, desc: 'Sweet and savory Hawaiian-inspired dishes await.' },
          { img: horror, desc: 'Spooky delights for those with adventurous tastes.' },
          { img: mex, desc: 'Mexican fusion flavors to ignite your taste buds.' },
          { img: motor, desc: 'Innovative dishes for the modern food enthusiast.' },
        ].map((item, idx) => (
          <div
            key={idx}
            style={cardStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <img src={item.img} alt="Variety Dish" style={imageStyle} />
            <p style={{ fontSize: '16px', color: '#666' }}>{item.desc}</p>
            
          </div>
        ))}
      </div>

      {/* Partners Section */}
      <div style={partnersStyle}>
        <h2 style={sectionTitleStyle}>Our Proud Partners</h2>
        <p style={{ fontSize: '16px', color: '#6A0DAD' }}>
          <a
            href="https://www.facebook.com/panjielutongbahay"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#6A0DAD' }}
          >
            Panjie - Lutong Bahay
          </a>
          <br />
          <a
            href="https://www.facebook.com/ailindsgrazingtable"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#6A0DAD' }}
          >
            Ailin D’s Grazing Table and Cabinet
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
