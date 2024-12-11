import React, { useState, useEffect, useRef } from 'react';
import './BookingForm.css';
import { db } from './firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { QRCodeCanvas } from 'qrcode.react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [numAttendees, setNumAttendees] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventTheme, setEventTheme] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [menuPackage, setMenuPackage] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [bookedDates, setBookedDates] = useState([]);
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const qrCodeRef = useRef();
const [customEventTheme, setCustomEventTheme] = useState("");


  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const q = query(collection(db, 'bookings'), where('eventDate', '>=', Timestamp.now()));
        const querySnapshot = await getDocs(q);

        const dates = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const startTime = data.startTime || '00:00';
          const endTime = data.endTime || '00:00';
          try {
            return {
              eventDate: data.eventDate?.toDate().toISOString().split('T')[0],
              startHour: parseInt(startTime.split(':')[0], 10),
              endHour: parseInt(endTime.split(':')[0], 10),
            };
          } catch (error) {
            console.error('Error processing booking time:', error, data);
            return null;
          }
        });

        setBookedDates(dates.filter(Boolean));
      } catch (error) {
        console.error('Error fetching booked dates:', error);
      }
    };

    fetchBookedDates();
  }, []);

  const handleContactNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setContactNumber(value);
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleNext = (e) => {
    e.preventDefault();
  
    if (step === 1 && contactNumber.length !== 11) {
      alert('Please enter exactly 11 digits for the contact number.');
      return;
    }
  
    if (step === 2) {
      const startHour = parseInt(startTime.split(':')[0]);
      const endHour = parseInt(endTime.split(':')[0]);
  
      if (startHour >= endHour) {
        setTimeError('Start time must be before end time.');
        return;
      }
  
      if (endHour > 24 || startHour < 8) {
        setTimeError('Time must be between 8:00 AM and 12:00 Midnight.');
        return;
      }
  
      const overlappingEvent = bookedDates.find((date) => {
        return (
          date.eventDate === eventDate &&
          ((startHour >= date.startHour && startHour < date.endHour) ||
            (endHour > date.startHour && endHour <= date.endHour) ||
            (startHour <= date.startHour && endHour >= date.endHour)) // Check full overlap
        );
      });
  
      if (overlappingEvent) {
        setTimeError('Time slot overlaps with another event.');
        return;
      }
  
      setTimeError('');
    }
  
    setStep((prevStep) => prevStep + 1);
  };
  

  const handlePrevious = (e) => {
    e.preventDefault();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetForm = () => {
    setName('');
    setContactNumber('');
    setEmail('');
    setPaymentMethod('');
    setNumAttendees('');
    setEventType('');
    setEventTheme('');
    setEventDate('');
    setStartTime('');
    setEndTime('');
    setMenuPackage('');
    setNotes('');
    setStep(1);
  };

  const handleDone = async () => {
    // Skip email validation if the email field is empty
    if (email && !isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    const uniqueCode = `${eventTheme}-${numAttendees}-${Date.now()}`;
    setQrCodeValue(uniqueCode);
  
    const bookingData = {
      name,
      contactNumber: Number(contactNumber),
      email, // Can be empty now
      paymentMethod,
      numAttendees: Number(numAttendees),
      eventType,
      eventTheme,
      eventDate: Timestamp.fromDate(new Date(eventDate)),
      startTime,
      endTime,
      menuPackage,
      notes,
      qrCode: uniqueCode,
    };
  
    setLoading(true);
    try {
      const bookingDocRef = doc(db, 'bookings', uniqueCode);
      await setDoc(bookingDocRef, bookingData);
      setIsBooked(true);
      resetForm();
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('There was an error creating your booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleCopyClick = () => {
    // Select the text of the QR code value directly
    navigator.clipboard.writeText(qrCodeValue).then(() => {
      alert('QR code text copied to clipboard!');
    }).catch((error) => {
      console.error('Error copying text: ', error);
      alert('Failed to copy QR code text.');
    });
  };
  

  const renderSummary = () => (
    <div className="summary">
      <h2>Summary</h2>
      <div className="summary-list">
        <div className="summary-item">
          <strong>Name:</strong> <span>{name}</span>
        </div>
        <div className="summary-item">
          <strong>Contact Number:</strong> <span>{contactNumber}</span>
        </div>
        <div className="summary-item">
          <strong>Email:</strong> <span>{email}</span>
        </div>
        <div className="summary-item">
          <strong>Payment Method:</strong> <span>{paymentMethod}</span>
        </div>
        <div className="summary-item">
          <strong>Number of pax:</strong> <span>{numAttendees}</span>
        </div>
        <div className="summary-item">
          <strong>Event Type:</strong> <span>{eventType}</span>
        </div>
        <div className="summary-item">
          <strong>Event Theme:</strong> <span>{eventTheme}</span>
        </div>
        <div className="summary-item">
          <strong>Event Date:</strong> <span>{eventDate}</span>
        </div>
        <div className="summary-item">
          <strong>Start Time:</strong> <span>{startTime}</span>
        </div>
        <div className="summary-item">
          <strong>End Time:</strong> <span>{endTime}</span>
        </div>
        <div className="summary-item">
          <strong>Menu Package:</strong> <span>{menuPackage}</span>
        </div>
        <div className="summary-item">
          <strong>Notes:</strong> <span>{notes || 'None'}</span>
        </div>
      </div> 
      <div className="button-container">
        <button type="button" onClick={handlePrevious}>
          Go Back
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button type="button" onClick={handleDone}>
            Confirm
          </button>
        )}
      </div>
      {isBooked && (
  <div className="qr-code-container">
    <p>
      <span className="highlight-title">Your QR Code Value:</span> <span className="highlight">{qrCodeValue}</span>
    </p>
    <p>Kindly copy it for your guests' attendance. The link is on the <span class="highlight">top right</span> of your screen. Thank you.</p>
    <button onClick={handleCopyClick}>Click to Copy QR Code Text</button>
  </div>
)}



    </div>
  );
  

  return (
    <div className="booking-form">
      {!isBooked ? (
        <>
          <div className="intro-text">
            <h1>Welcome!</h1>
            <p className="booking-intro">Book Your Event Now!</p>
          </div>
          {step === 1 ? (
            <form onSubmit={handleNext}>
              <div className="box-container">
                <h2>Personal Information</h2>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Contact Number</label>
                <input
                  type="tel"
                  placeholder="Your 11-digit Contact Number"
                  value={contactNumber}
                  onChange={handleContactNumberChange}
                  required
                  maxLength="11"
                />
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Your Email (Optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
/>

                <label>Payment Method</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                  <option value="" disabled>
                    Select Payment Method
                  </option>
                  <option value="gcash">Gcash</option>
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                </select>
                <label>Number of pax</label>
                <input
                  type="number"
                  placeholder="Number of pax"
                  value={numAttendees}
                  onChange={(e) => setNumAttendees(e.target.value)}
                  required
                />
              </div>
              <div className="button-container">
                <button type="submit">Next</button>
              </div>
            </form>
          ) : step === 2 ? (
            <form onSubmit={handleNext}>
              <div className="box-container">
                <h2>Event Information</h2>
                
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  required
                >
                  <option value="" disabled selected>Service Type</option>
                  <option value="Event Center">Event Center</option>
                  <option value="Catering">Catering</option>
                </select>


             

                <label>Event Theme</label>
<select
  value={eventTheme}
  onChange={(e) => {
    const selectedValue = e.target.value;
    setEventTheme(selectedValue);
  }}
  required
>
  <option value="" disabled>
    Select Event Theme
  </option>
  <option value="Birthday">Birthday</option>
  <option value="Wedding">Wedding</option>
  <option value="Anniversary">Anniversary</option>
  <option value="Other">Other</option>
</select>

{eventTheme === "Other" && (
  <input
    type="text"
    placeholder="Please specify the event theme"
    value={customEventTheme}
    onChange={(e) => setCustomEventTheme(e.target.value)}
    required
  />
)}



                <label>Event Date</label>
                <DatePicker
                  selected={eventDate ? new Date(eventDate) : null}
                  onChange={(date) => {
                    const selectedDate = date.toISOString().split('T')[0];
                    setEventDate(selectedDate);
                    const isFullyBooked = bookedDates.filter(
                      (d) => d.eventDate === selectedDate && d.endHour >= 24
                    ).length >= 3;

                    setDateError(isFullyBooked ? 'This date is fully booked.' : '');
                  }}
                  minDate={new Date()}
                  required
                />
                {dateError && <p className="error-message">{dateError}</p>}
                <label>Start Time</label>
                    <select value={startTime} onChange={(e) => setStartTime(e.target.value)} required>
                      <option value="" disabled>
                        Select Start Time
                      </option>
                      {Array.from({ length: 16 }, (_, i) => {
                        const hour = 8 + i; // Range from 8:00 AM to 12:00 Midnight
                        const timeLabel = hour < 12 ? `${hour}:00 AM` : `${hour === 12 ? 12 : hour - 12}:00 PM`;
                        const timeValue = `${hour}:00`;

                        // Check if this hour overlaps with any booked event
                        const isDisabled = bookedDates.some(
                          (date) =>
                            date.eventDate === eventDate &&
                            hour >= date.startHour &&
                            hour < date.endHour // Check if the hour falls within any booked range
                        );

                        return (
                          <option key={hour} value={timeValue} disabled={isDisabled}>
                            {timeLabel}
                          </option>
                        );
                      })}
                    </select>

                    <label>End Time</label>
                    <select value={endTime} onChange={(e) => setEndTime(e.target.value)} required>
                      <option value="" disabled>
                        Select End Time
                      </option>
                      {Array.from({ length: 16 }, (_, i) => {
                        const hour = 8 + i; // Range from 8:00 AM to 12:00 Midnight
                        const timeLabel = hour < 12 ? `${hour}:00 AM` : `${hour === 12 ? 12 : hour - 12}:00 PM`;
                        const timeValue = `${hour}:00`;

                        // Disable if it's not after the start time or overlaps with booked times
                        const isDisabled =
                          parseInt(startTime.split(':')[0], 10) >= hour || // Ensure it is after start time
                          bookedDates.some(
                            (date) =>
                              date.eventDate === eventDate &&
                              hour > date.startHour &&
                              hour <= date.endHour // Overlaps with any booking range
                          );

                        return (
                          <option key={hour} value={timeValue} disabled={isDisabled}>
                            {timeLabel}
                          </option>
                        );
                      })}
                    </select>

                {timeError && <p className="error-message">{timeError}</p>}
                <label>Menu Package
                
               </label>      
               <select value={menuPackage} onChange={(e) => setMenuPackage(e.target.value)} required>
                    <option value="" disabled>
                      Select Menu Package
                    </option>
                    <option value="250/pax: Bolognese, Pimento Sandwich, iced tea. Free: Coffee & Tea">250/pax: Bolognese, Pimento Sandwich, iced tea. Free: Coffee & Tea</option>
                    <option value="350/pax: Snacks: Spaghetti, & cucumber lemonade; Meal: Chicken teriyaki, fish fillet">350/pax: Snacks: Spaghetti, & cucumber lemonade; Meal: Chicken teriyaki, fish fillet</option>
                    <option value="450/pax: Pork caldereta, Grilled chicken barbecue with pineapple, red capsicum, onion, herb crusted fish fillet, chop suey (meat and chicken), plain rice, one round iced tea. DESSERT: Mango float">450/pax: Pork caldereta, Grilled chicken barbecue with pineapple, red capsicum, onion, herb crusted fish fillet, chop suey (meat and chicken), plain rice, one round iced tea. DESSERT: Mango float</option>
                    <option value="450/pax: Plain Rice, Pork Caldereta, Honey Pineapple Glazed Roasted Chicken, Herb crusted fish fillet, pancit guisado. Dessert: Mango float. One round iced tea">450/pax: Plain Rice, Pork Caldereta, Honey Pineapple Glazed Roasted Chicken, Herb crusted fish fillet, pancit guisado. Dessert: Mango float. One round iced tea</option>
                    <option value="500/pax: Pork ribs with grilled corn cob, chicken teriyaki, herb crusted fish fillet, plain rice, one round iced tea, pancit. Desserts: Choco Balls, Salad Bar. Appetizer: Crab meat roll">500/pax: Pork ribs with grilled corn cob, chicken teriyaki, herb crusted fish fillet, plain rice, one round iced tea, pancit. Desserts: Choco Balls, Salad Bar. Appetizer: Crab meat roll</option>
                    <option value="550/pax: Chow fan Rice, Beef Stroganoff, Cajun chicken roulade w/ buttered green beans, carrots and herbs jus, Herb crusted fish fillet, chap chae noodles, assorted maki, cream puff">550/pax: Chow fan Rice, Beef Stroganoff, Cajun chicken roulade w/ buttered green beans, carrots and herbs jus, Herb crusted fish fillet, chap chae noodles, assorted maki, cream puff</option>
                    <option value="600/pax: START: Appetizer- Vegetable Salad, LUNCH: Plain Rice, Beef Tenderloin churrasco, Fish Fillet w/ Lemon Sauce, Mashed Potato, Mango Float. DRINKS: Cucumber. SNACKS: Bolognese w/ Toasted Bread">600/pax: START: Appetizer- Vegetable Salad, LUNCH: Plain Rice, Beef Tenderloin churrasco, Fish Fillet w/ Lemon Sauce, Mashed Potato, Mango Float. DRINKS: Cucumber. SNACKS: Bolognese w/ Toasted Bread</option>
                    <option value="Custom menu (contact us for details)">Custom menu (contact us for details)</option>
                  </select>
                  <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
        Take note: this menu package can still be changed based on your preferences and availability of the menu.
      </p>
                <label>Notes</label>
                <textarea
                  placeholder="Notes (Optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
              <div className="button-container">
                <button type="button" onClick={handlePrevious}>
                  Previous
                </button>
                <button type="submit">Next</button>
              </div>
            </form>
          ) : (
            renderSummary()
          )}
        </>
      ) : (
        renderSummary()
      )}
    </div>
  );
};

export default BookingForm;
