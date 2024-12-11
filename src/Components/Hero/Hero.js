import React, { useState } from 'react';

const Hero = ({ setCurrentPage }) => {
  const [showTerms, setShowTerms] = useState(false);

  // Component styles
  const heroStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #8A2BE2, #E6E6FA)', // Violet to light lavender gradient
    color: '#333',
    textAlign: 'center',
    padding: '50px 20px',
    fontFamily: '"Montserrat", sans-serif',
  };

  const heroContentStyle = {
    maxWidth: '700px',
    width: '100%',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: 'white',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
  };

  const headingStyle = {
    fontSize: '3rem', // Larger font size for desktop
    fontWeight: '700',
    marginBottom: '20px',
    letterSpacing: '2px',
    lineHeight: '1.4',
    color: 'transparent',
    backgroundImage: 'linear-gradient(135deg, #8A2BE2, #9370DB)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.2)',
  };

  const paragraphStyle = {
    fontSize: '1.25rem', // Slightly larger paragraph text
    lineHeight: '1.8',
    marginBottom: '30px',
    color: '#666',
  };

  const buttonStyle = {
    backgroundColor: '#8A2BE2',
    color: 'white',
    padding: '15px 35px',
    fontSize: '1.2rem',
    fontWeight: '500',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    maxWidth: '800px',
    width: '80%',
    height: '80%',
    overflowY: 'scroll',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
  };

  const closeModalButtonStyle = {
    backgroundColor: '#8A2BE2',
    color: 'white',
    padding: '12px 25px',
    fontSize: '1.1rem',
    fontWeight: '500',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '30px',
  };

  const handleModalClose = () => {
    console.log("Modal closed, setting page to 'booking'");
    setShowTerms(false);
    setCurrentPage('booking');
  };

  return (
    <section style={heroStyle}>
      <div style={heroContentStyle}>
        <h1 style={headingStyle}>Welcome to TNF Event Center</h1>
        <p style={paragraphStyle}>
          Book your next event in just a few clicks. Enjoy a seamless and professional experience.
        </p>
        <button
          style={buttonStyle}
          onClick={() => {
            console.log('Opening terms modal');
            setShowTerms(true);
          }}
        >
          Book an Event
        </button>
      </div>

      {showTerms && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
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
            <button
              style={closeModalButtonStyle}
              onClick={handleModalClose}
            >
              I Agree and Proceed
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
