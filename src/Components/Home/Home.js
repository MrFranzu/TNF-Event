import React, { useState } from 'react';
import bandImage from './band.jpg';
import hollowImage from './hollow.jpg';
import birthImage from './birth.jpg';
import { db } from './firebaseConfig';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';

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
            <p style={styles.paragraph}>Where unforgettable moments come to life! Whether you're planning a corporate gathering, a social celebration, or a special occasion, our venue offers the perfect setting for every event. With a seamless booking process and a wide range of exciting events to choose from, we make it easy for you to bring your vision to life. Discover unique experiences and create lasting memories with us—your next event starts here at TNF Event Center!</p>
            <button style={styles.primaryButton} onClick={() => setShowTerms(true)}>
              Book Now
            </button>
            



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
            <p>
              These Terms and Conditions ("Terms") govern your use of our event booking services ("Services") via the
              provided Booking Form application. By utilizing our Services, you agree to be bound by these Terms. Please
              read them carefully before proceeding with any booking.
            </p>
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing or using the Services, you signify that you have read, understood, and agree to be bound by
              these Terms.
            </p>
            <h3>2. User Responsibilities</h3>
            <p>
              You are responsible for providing accurate, complete, and up-to-date information in the booking form. The
              contact number provided must contain exactly 11 digits. You agree to provide a valid email address for all
              correspondence related to your booking. Ensure compliance with the chosen event type, themes, and menu
              preferences.
            </p>
            <h3>3. Event Booking</h3>
            <p>
              Event bookings are subject to date and time availability. Bookings are on a first-come, first-served basis,
              and overlapping time slots are not allowed. Events must occur between 8:00 AM and 12:00 Midnight. Changes
              to event details, such as menu packages, are subject to approval and must be requested at least 7 days
              prior to the event date. Fully booked dates cannot accommodate additional bookings.
            </p>
            <h3>4. Payments</h3>
            <p>
              Full or partial payment is required depending on the selected payment method (Gcash, Bank Transfer, or
              Cash). Failure to provide timely payment may result in the cancellation of the booking.
            </p>
            <h3>5. QR Code</h3>
            <p>
              Upon confirmation, a unique QR code is generated for the event. The QR code serves as proof of booking and
              can be used for guest check-in or other event-related verifications.
            </p>
            <h3>6. Cancellations and Refunds</h3>
            <p>
              Cancellations must be communicated at least 72 hours before the event for any consideration of partial
              refund. Refunds, if applicable, will exclude non-refundable deposits or administrative fees.
            </p>
            <h3>7. Menu Packages</h3>
            <p>
              Menu selections are customizable but subject to availability. Changes to the menu must be finalized 7 days
              prior to the event. Costs vary based on customization and the number of attendees.
            </p>
            <h3>8. Prohibited Activities</h3>
            <p>You agree not to submit false or misleading information or book events for unlawful purposes.</p>
            <h3>9. Limitation of Liability</h3>
            <p>
              We are not liable for inaccuracies in the provided information or disruptions caused by unforeseen
              circumstances. Our total liability is limited to the fees paid for the booking.
            </p>
            <h3>10. Indemnification</h3>
            <p>You agree to indemnify and hold us harmless from claims arising out of your use of the Services.</p>
            <h3>11. Modifications to Terms</h3>
            <p>
              We reserve the right to update these Terms. Users will be notified of significant changes. Continued use of
              the Services constitutes acceptance.
            </p>
            <h3>Contact Us</h3>
            <p>If you have any questions, please contact us at 0927-848-2108.</p>
            <button style={styles.closeModalButton} onClick={handleModalClose}>
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
            style={{ ...styles.primaryButton, backgroundColor: '#d9534f' }}
          >
            {loading ? 'Cancelling...' : 'Cancel Booking'}
          </button>
          <button style={styles.secondaryButton} onClick={() => setShowCancelForm(false)}>
            Back to Home
          </button>
        </div>
      )}
    </section>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #8A2BE2, #E6E6FA)',
    boxSizing: 'border-box',
  },
  mainContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1200px',
  },
  leftContent: {
    flex: '1 1 45%',
    padding: '20px',
    color: '#FFF',
    textAlign: 'center',
  },
  rightContent: {
    flex: '1 1 45%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    padding: '20px',
  },
  heading: {
    fontSize: 'clamp(2rem, 5vw, 3rem)', // Scales between 2rem and 3rem based on screen size
    marginBottom: '15px',
    color: '#FFF',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Adds depth for better readability
  },
  paragraph: {
    marginBottom: '20px',
    fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', // Scales based on screen size
    lineHeight: '1.6', // Improves text spacing for better readability
    color: '#EEE',
    textAlign: 'justify', // Makes text more professional-looking
  },
  
  primaryButton: {
    padding: '20px 40px',
    margin: '10px',
    backgroundColor: '#8A2BE2',
    color: '#FFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  primaryButtonHover: {
    backgroundColor: '#7A1FA1',
  },
  secondaryButton: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#6A0DAD',
    color: '#FFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  boxContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  box: {
    flex: '1 1 calc(33.333% - 10px)', // 3 boxes per row
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#FFF',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  boxImage: {
    width: '100%',
    maxHeight: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  boxDescription: {
    marginTop: '10px',
    fontWeight: 'bold',
    color: '#333',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '800px',  // Ensure the modal is not too wide
    width: '80%',  // Allow the modal to take 80% of the width on smaller screens
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
    overflowY: 'auto', // Ensures the modal is scrollable on small screens
    maxHeight: '90vh', // Ensure the modal doesn't exceed the viewport height
    boxSizing: 'border-box',
  },
  modalHeading: {
    fontSize: '1.8rem',
    marginBottom: '15px',
    color: '#333',
  },
  modalParagraph: {
    fontSize: '1rem',
    marginBottom: '20px',
    color: '#555',
  },
  sectionHeading: {
    fontSize: '1.2rem',
    marginTop: '20px',
    color: '#333',
  },
  sectionText: {
    fontSize: '1rem',
    color: '#555',
  },
  closeModalButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#FFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  cancelForm: {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  errorText: {
    color: 'red',
    marginBottom: '10px',
  },
  successText: {
    color: 'green',
    marginBottom: '10px',
  },
};

export default App;


