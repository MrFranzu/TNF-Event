import React, { useState } from 'react';
import bandImage from './band.jpg';   // Import band image
import hollowImage from './hollow.jpg';  // Import hollow image
import birthImage from './birth.jpg';  // Import birth image
import { db } from './firebaseConfig';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';

const Home = () => {
  const [showCancelForm, setShowCancelForm] = useState(false); // State to toggle the form
  const [qrCode, setQrCode] = useState('');
  const [confirmationText, setConfirmationText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCancelBooking = async () => {
    if (confirmationText !== 'CONFIRM') {
      setError('You must type CONFIRM to proceed with cancellation.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const bookingRef = doc(db, 'bookings', qrCode);
      const bookingSnapshot = await getDoc(bookingRef);

      if (!bookingSnapshot.exists()) {
        setError('Booking with the provided QR Code does not exist.');
        setLoading(false);
        return;
      }

      // Wait for 3 seconds before proceeding with the deletion
      setTimeout(async () => {
        await deleteDoc(bookingRef);
        setSuccess('Booking successfully cancelled.');
        setQrCode('');
        setConfirmationText('');
        setLoading(false);
      }, 3000);
    } catch (err) {
      setError('An error occurred while canceling the booking. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.homeContainer}>
      {!showCancelForm ? (
        <>
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
              <img src={bandImage} alt="Event Band" style={styles.boxImage} />  
              <p style={styles.boxDescription}>KTVs</p>
            </div>
            <div style={styles.box}>
              <img src={birthImage} alt="Birthday Event" style={styles.boxImage} />  
              <p style={styles.boxDescription}>Birthdays</p>
            </div>
            <div style={styles.box}>
              <img src={hollowImage} alt="Special Event" style={styles.boxImage} />  
              <p style={styles.boxDescription}>Special Themes</p>
            </div>
            <div style={styles.box}>
              <img src="/assets/background.png" alt="More" style={styles.boxImage} />
              <p style={styles.boxDescription}>and more!</p>
            </div>
          </div>
          <button
            onClick={() => setShowCancelForm(true)}
            style={styles.cancelButton}
          >
            Cancel Booking
          </button>
        </>
      ) : (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
          <h1>Cancel Booking</h1>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="qrCode">QR Code:</label>
            <input
              type="text"
              id="qrCode"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              placeholder="Enter QR Code"
              style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="confirmationText">Type "CONFIRM" to Cancel:</label>
            <input
              type="text"
              id="confirmationText"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Type CONFIRM"
              style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <button
            onClick={handleCancelBooking}
            disabled={loading}
            style={{
              padding: '10px 15px',
              backgroundColor: '#d9534f',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Cancelling...' : 'Cancel Booking'}
          </button>
          <button
            onClick={() => setShowCancelForm(false)}
            style={{ marginTop: '10px', padding: '10px', backgroundColor: '#6a0dad', color: '#fff', borderRadius: '5px', cursor: 'pointer' }}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  homeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'white',
    color: '#6a0dad',
    fontFamily: 'Arial, sans-serif',
    padding: '30px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '40px',
    color: '#6a0dad',
  },
  boxContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
    padding: '0 20px',
    justifyItems: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '100%',
    maxWidth: '350px',
    cursor: 'pointer',
  },
  boxImage: {
    width: '80%',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  boxDescription: {
    marginTop: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#6a0dad',
  },
  cancelButton: {
    marginTop: '30px',
    padding: '10px 20px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Home;
