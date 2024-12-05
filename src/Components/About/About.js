import React from 'react';
import eventImage from './event.jpg'; // Import the image from the src folder

const About = () => {
  // Inline style for the main container
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    justifyContent: 'center', // Ensures it aligns vertically as well
  };

  // Card style
  const cardStyle = {
    display: 'flex',
    flexDirection: 'row', // Arrange content side by side
    justifyContent: 'space-between', // Space between image and text
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    maxWidth: '1200px',
    marginBottom: '40px',
    textAlign: 'left',
    transition: 'transform 0.3s ease-in-out', // Smooth hover effect
  };

  // Hover effect for the card
  const cardHoverStyle = {
    ...cardStyle,
    ':hover': {
      transform: 'translateY(-10px)', // Slight lift effect on hover
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    }
  };

  // Title style
  const titleStyle = {
    fontSize: '32px',
    color: '#6A0DAD', // Violet color
    marginBottom: '15px',
    fontWeight: 'bold',
  };

  // Paragraph text style
  const textStyle = {
    fontSize: '18px',
    color: '#333',
    lineHeight: '1.7',
    marginBottom: '20px',
  };

  // Image style
  const imageStyle = {
    width: '100%', // Adjust image width
    height: 'auto', // Let the height scale accordingly
    objectFit: 'cover', // Ensures image maintains aspect ratio
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adds shadow around image
  };

  // Partner Card styles
  const partnerCardStyle = {
    ...cardStyle,
    backgroundColor: '#f3f3f3',
    textAlign: 'left',
    padding: '20px 30px',
    borderColor: '#6A0DAD', // Border in violet
    borderWidth: '1px',
    borderStyle: 'solid',
  };

  const partnerHeadingStyle = {
    fontSize: '24px',
    color: '#6A0DAD', // Violet color
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const partnerLinksStyle = {
    fontSize: '16px',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <div style={cardHoverStyle}>
        {/* Image on the left */}
        <div style={{ width: '40%' }}>
          <img 
            src={eventImage} 
            alt="Event" 
            style={imageStyle} 
          />
        </div>

        <div style={{ width: '55%' }}>
          <h1 style={titleStyle}>About Us</h1>
          <p style={textStyle}>
            TNF Event Center offers a beautiful, customizable space for celebrations of all kinds — 
            from christenings to weddings and everything in between. Let us help you create unforgettable 
            memories in a setting that’s as unique as your event!
          </p>
        </div>
      </div>

      {/* Partner Card at the bottom */}
      <div style={partnerCardStyle}>
        <h2 style={partnerHeadingStyle}>Partners with:</h2>
        <p style={partnerLinksStyle}>
          <a href="https://www.facebook.com/panjielutongbahay" target="_blank" rel="noopener noreferrer" 
            style={{ color: '#6A0DAD', textDecoration: 'none' }}>
            Panjie - Lutong bahay
          </a>
         <br/>
          <a href="https://www.facebook.com/ailindsgrazingtable" target="_blank" rel="noopener noreferrer" 
            style={{ color: '#6A0DAD', textDecoration: 'none' }}>
            Ailin D’s Grazing Table and Cabinet
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
