import React, { useState } from 'react';
import bandImage from './band.jpg';
import hollowImage from './hollow.jpg';
import birthImage from './birth.jpg';
import { db } from './firebaseConfig';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import CalendarComponent from './CalendarComponent';

const App = ({ setCurrentPage }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [confirmationText, setConfirmationText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setQrCode('');
    setConfirmationText('');
    setError('');
    setSuccess('');
  };

  const handleModalClose = () => {
    setShowTerms(false);
    setCurrentPage('booking');
  };

  const handleCancelFormOpen = () => {
    resetForm();
    setShowCancelForm(true);
  };

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
        throw new Error('Booking with the provided QR Code does not exist.');
      }

      await deleteDoc(bookingRef);
      setSuccess('Booking successfully cancelled.');
      resetForm();
    } catch (err) {
      setError(err.message || 'An error occurred while cancelling the booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={styles.appContainer}>
      {!showCancelForm && !showTerms && (
        <div style={styles.mainContent}>
          <div style={styles.leftContent}>
            <h1 style={styles.heading}>Welcome to TNF Event Center</h1>
            <p style={styles.paragraph}>
              Where unforgettable moments come to life! Discover unique experiences and create lasting memories with us.
            </p>
            
            <button
              style={styles.primaryButton}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#7A1FA1')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#8A2BE2')}
              onClick={() => setShowTerms(true)}
            >
              Book Now
            </button>
            <div>
      <CalendarComponent />
    </div>
          </div>
          <div style={styles.rightContent}>
            <div style={styles.boxContainer}>
              {[
                { img: "/assets/background.png", text: "Parties" },
                { img: "/assets/balloon.png", text: "Weddings" },
                { img: bandImage, text: "KTVs" },
                { img: birthImage, text: "Birthdays" },
                { img: hollowImage, text: "Special Themes" },
                { img: "/assets/background.png", text: "and more!" },
              ].map((item, index) => (
                <div key={index} style={styles.box}>
                  <img src={item.img} alt={item.text} style={styles.boxImage} />
                  <p style={styles.boxDescription}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showTerms && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Terms and Conditions</h2>
            <p style={styles.modalParagraph}>
              Please review the terms carefully before proceeding with any bookings.
            </p>
            <button
              style={styles.closeModalButton}
              onClick={handleModalClose}
            >
              I Agree and Proceed
            </button>
          </div>
        </div>
      )}

      {showCancelForm && (
        <div style={styles.cancelForm}>
          <h1>Cancel Booking</h1>
          {error && <p style={styles.errorText}>{error}</p>}
          {success && <p style={styles.successText}>{success}</p>}
          <div style={styles.inputGroup}>
            <label htmlFor="qrCode">QR Code:</label>
            <input
              type="text"
              id="qrCode"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              placeholder="Enter QR Code"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="confirmationText">Type "CONFIRM" to Cancel:</label>
            <input
              type="text"
              id="confirmationText"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Type CONFIRM"
              style={styles.input}
            />
          </div>
          <button
            onClick={handleCancelBooking}
            disabled={loading}
            style={styles.cancelButton}
          >
            {loading ? 'Cancelling...' : 'Cancel Booking'}
          </button>
        </div>
      )}
    </section>
  );
};

const styles = {
  appContainer: {
    background: 'linear-gradient(to right,rgb(189, 141, 234), #8A2BE2)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif",
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    padding: '20px',
    width: '90%',
    maxWidth: '1200px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#fff',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: '#f0f0f0',
  },
  primaryButton: {
    padding: '15px 30px',
    backgroundColor: '#8A2BE2',
    color: '#fff',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  boxContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  box: {
    background: '#fff',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0px 5px 15px rgba(0,0,0,0.2)',
    textAlign: 'center',
    transition: 'transform 0.3s',
  },
  boxImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  boxDescription: {
    marginTop: '10px',
    fontWeight: '600',
    color: '#333',
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    background: '#fff',
    padding: '30px',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '80%',
  },
  closeModalButton: {
    backgroundColor: '#8A2BE2',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default App;
