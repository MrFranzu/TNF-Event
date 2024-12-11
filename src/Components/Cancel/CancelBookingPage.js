import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';

const CancelBookingPage = () => {
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
    </div>
  );
};

export default CancelBookingPage;