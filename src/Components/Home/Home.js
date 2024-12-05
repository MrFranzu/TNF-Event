import React from 'react';
import bandImage from './band.jpg';   // Import band image
import hollowImage from './hollow.jpg';  // Import hollow image
import birthImage from './birth.jpg';  // Import birth image

const Home = () => {
  return (
    <div style={styles.homeContainer}>
      <p style={styles.heading}>Discover and book exciting events easily!</p>
      
      <div style={styles.boxContainer}>
        <div style={styles.box}>
          <img src="/assets/background.png" alt="Event 1" style={styles.boxImage} />
          <p style={styles.boxDescription}>Parties</p>
        </div>
        <div style={styles.box}>
          <img src="/assets/balloon.png" alt="Weddings" style={styles.boxImage} />
          <p style={styles.boxDescription}>Weddings</p>
        </div>
        <div style={styles.box}>
          <img src={bandImage} alt="Event Band" style={styles.boxImage} />  {/* Use bandImage here */}
          <p style={styles.boxDescription}>KTVs</p>
        </div>
        <div style={styles.box}>
          <img src={birthImage} alt="Birthday Event" style={styles.boxImage} />  {/* Use birthImage for Birthdays */}
          <p style={styles.boxDescription}>Birthdays</p>
        </div>
        <div style={styles.box}>
          <img src={hollowImage} alt="Special Event" style={styles.boxImage} />  {/* Use hollowImage here */}
          <p style={styles.boxDescription}>Special Themes</p>
        </div>
        <div style={styles.box}>
          <img src="/assets/background.png" alt="More" style={styles.boxImage} />
          <p style={styles.boxDescription}>and more!</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  homeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',  // Take full height of the viewport
    backgroundColor: 'white',
    color: '#6a0dad', // violet color
    fontFamily: 'Arial, sans-serif',
    padding: '30px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '40px',
    color: '#6a0dad', // violet color
  },
  boxContainer: {
    display: 'grid',   // Use grid for better card organization
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Responsive grid
    gap: '20px',
    width: '100%',
    maxWidth: '1200px', // Increase max-width for wider dashboard
    padding: '0 20px',
    justifyItems: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#f9f9f9', // Lighter background for each card
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '100%',
    maxWidth: '350px',  // Consistent card size
    cursor: 'pointer',
  },
  boxImage: {
    width: '80%',   // Adjust width to be smaller than 100%
    height: '80px', // Significantly reduce the image height
    objectFit: 'cover',
    borderRadius: '10px',
  },
  boxDescription: {
    marginTop: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#6a0dad', // violet color
  },
};



export default Home;
