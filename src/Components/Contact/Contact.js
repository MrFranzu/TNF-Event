import React, { useState } from 'react';
import { FiPhone, FiFacebook, FiMapPin, FiCheckCircle } from 'react-icons/fi';

const Contact = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handlePhoneNumberClick = () => {
    const phoneNumber = '0927-848-2108'; // The phone number to copy
    navigator.clipboard.writeText(phoneNumber)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000); // Hide the notification after 2 seconds
      })
      .catch((error) => {
        console.error('Error copying text: ', error);
      });
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.header}>
        <h1 style={styles.headerText}> Contact Us</h1>
      </div>

      <div style={styles.contactCard}>
        {/* Phone Number Section */}
        <div style={styles.cardSection}>
          <div style={styles.iconWithLabel}>
            <FiPhone size={20} style={styles.icon} />
            <label style={styles.label}>Phone Number</label>
          </div>
          <div style={styles.phoneNumberContainer}>
            <h3
              onClick={handlePhoneNumberClick}
              style={styles.phoneNumber}
            >
              0927-848-2108
            </h3>
            {isCopied && (
              <div style={styles.copyNotification}>
                <FiCheckCircle style={styles.copyIcon} />
                Copied!
              </div>
            )}
          </div>
        </div>

        {/* Facebook Section */}
        <div style={styles.cardSection}>
          <div style={styles.iconWithLabel}>
            <FiFacebook size={20} style={styles.icon} />
            <label style={styles.label}>Facebook</label>
          </div>
          <h3>
            <a
              href="https://www.facebook.com/tnfeventcenter"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.externalLink}
            >
              TNF Event Center
            </a>
          </h3>
        </div>

        {/* Location Section */}
        <div style={styles.cardSection}>
          <div style={styles.iconWithLabel}>
            <FiMapPin size={20} style={styles.icon} />
            <label style={styles.label}>Location</label>
          </div>
          <h3>
            <a
              href="https://www.google.com/maps/place/TNF+Event+Center/@13.7671504,121.0597211,17z/data=!3m1!4b1!4m6!3m5!1s0x33bd05c4fdf15cef:0xff24b5bfb4044a9a!8m2!3d13.7671452!4d121.062296!16s%2Fg%2F11v5dkhqgs?entry=ttu&g_ep=EgoyMDI0MTExMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.externalLink}
            >
              Kumintang Ibaba, Batangas City (in front of main gate Capitol, beside Shell Gas Station)
            </a>
          </h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.0043039746024!2d121.0597211112829!3d13.767150410416278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd05c4fdf15cef%3A0xff24b5bfb4044a9a!2sTNF%20Event%20Center!5e0!3m2!1sen!2sph!4v1696694404761!5m2!1sen!2sph"
            title="Google Maps Location"
            style={styles.mapFrame}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    backgroundColor: '#f9f9fc',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  headerText: {
    fontSize: '2.5rem',
    color: '#6c63ff',
    margin: 0,
  },
  contactCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '600px',
    padding: '24px',
    color: '#333',
  },
  cardSection: {
    marginBottom: '24px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: '#6c63ff',
    marginLeft: '8px',
  },
  phoneNumberContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '8px',
  },
  phoneNumber: {
    cursor: 'pointer',
    color: '#6c63ff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: 0,
  },
  copyNotification: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '12px',
    fontSize: '0.9rem',
    color: 'green',
  },
  copyIcon: {
    marginRight: '4px',
  },
  externalLink: {
    textDecoration: 'none',
    color: '#6c63ff',
    fontWeight: 'bold',
  },
  mapFrame: {
    width: '100%',
    height: '300px',
    border: 'none',
    borderRadius: '12px',
    marginTop: '10px',
  },
  iconWithLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    color: '#6c63ff',
  },
};

export default Contact;
