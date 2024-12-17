import React, { useState, useEffect, useRef } from 'react';
import './BookingForm.css';
import { db } from './firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { QRCodeCanvas } from 'qrcode.react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

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
const [location, setLocation] = useState('');
const [event, setEvent] = useState("");
  const [customEvent, setCustomEvent] = useState("");
  const summaryRef = useRef();



  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const q = query(collection(db, 'bookings'), where('eventDate', '>=', Timestamp.now()));
        const querySnapshot = await getDocs(q);
  
        const dates = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const startTime = data.startTime || '00:00';
          const endTime = data.endTime || '00:00';
          return {
            eventDate: data.eventDate?.toDate().toISOString().split('T')[0], // Extract date in 'YYYY-MM-DD'
            startTime, // e.g., '08:00'
            endTime,   // e.g., '10:00'
          };
        });
  
        setBookedDates(dates);
      } catch (error) {
        console.error('Error fetching booked dates:', error);
      }
    };
  
    fetchBookedDates();
  }, []);

  const isTimeDisabled = (time, type) => {
    const selectedDate = eventDate;
    const hour = parseInt(time.split(':')[0], 10); // Extract hour from time
  
    return bookedDates.some((booking) => {
      if (booking.eventDate === selectedDate) {
        const startHour = parseInt(booking.startTime.split(':')[0], 10);
        const endHour = parseInt(booking.endTime.split(':')[0], 10);
  
        if (type === 'start') {
          // Disable start times overlapping with existing bookings
          return hour >= startHour && hour < endHour;
        } else if (type === 'end') {
          // Disable end times overlapping with existing bookings
          return hour > startHour && hour <= endHour;
        }
      }
      return false;
    });
  };
  
  

  const handleContactNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setContactNumber(value);
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleNext = (e) => {
    e.preventDefault();
  
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
          ((startHour >= parseInt(date.startTime.split(':')[0]) &&
            startHour < parseInt(date.endTime.split(':')[0])) ||
            (endHour > parseInt(date.startTime.split(':')[0]) &&
              endHour <= parseInt(date.endTime.split(':')[0])))
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
  if (email && !isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const themeToSave = eventTheme === "Other" ? customEventTheme : eventTheme;
  const eventToSave = event === "Other" ? customEvent : event;
  const uniqueCode = `${themeToSave}-${numAttendees}-${Date.now()}`;
  setQrCodeValue(uniqueCode);

  const bookingData = {
    name,
    contactNumber: Number(contactNumber),
    email,
    paymentMethod,
    numAttendees: Number(numAttendees),
    event: eventToSave,
    eventType,
    eventTheme: themeToSave,
    eventDate: Timestamp.fromDate(new Date(eventDate)),
    startTime,
    endTime,
    menuPackage,
    notes,
    location: eventType === 'Catering' ? location : null,
    qrCode: uniqueCode,
  };

  setLoading(true);
  try {
    const bookingDocRef = doc(db, 'bookings', uniqueCode);
    await setDoc(bookingDocRef, bookingData);

    // Generate PNG summary and trigger download
    await downloadAsPng();

    setIsBooked(true);
    resetForm();
  } catch (e) {
    console.error('Error adding document: ', e);
    alert('There was an error creating your booking. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const downloadAsPng = async () => {
  if (summaryRef.current) {
    try {
      const dataUrl = await toPng(summaryRef.current, {
        cacheBust: true,
        backgroundColor: "#FFFFFF", // Ensure white background
      });
      saveAs(dataUrl, `TNF Event Summary of ${name}.png`);
    } catch (error) {
      console.error('Failed to generate PNG:', error);
    }
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
  
<div ref={summaryRef} className="summary"></div>
 const renderSummary = () => (
  <div ref={summaryRef} className="summary">
    <h1 style={{ fontSize: '2.5rem', color: '#5A189A' }}>
      A Grand Event Awaits You at TNF Event Center!
    </h1>
    <p style={{ fontSize: '1.5rem', marginTop: '1rem', lineHeight: '1.8' }}>
      We are thrilled to confirm your booking! Below are the details of your momentous occasion:
    </p>
    <div className="summary-list" style={{ fontSize: '1.2rem', marginTop: '2rem' }}>
      <div className="summary-item">
        <strong>Name:</strong> <span>{name}</span>
      </div>
      <div className="summary-item">
        <strong>Contact Number:</strong> <span>{contactNumber}</span>
      </div>
      <div className="summary-item">
        <strong>Email:</strong> <span>{email || 'Not Provided'}</span>
      </div>
      <div className="summary-item">
        <strong>Payment Method:</strong> <span>{paymentMethod}</span>
      </div>
      <div className="summary-item">
        <strong>Number of Guests:</strong> <span>{numAttendees}</span>
      </div>
      <div className="summary-item">
        <strong>Event Type:</strong> <span>{event}</span>
      </div>
      <div className="summary-item">
        <strong>Event Theme:</strong> <span>{eventTheme}</span>
      </div>
      <div className="summary-item">
        <strong>Date:</strong> <span>{eventDate}</span>
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
        <strong>Additional Notes:</strong> <span>{notes || 'No additional notes provided.'}</span>
      </div>
    </div>

    <div className="qr-code-container" style={{ marginTop: '2rem' }}>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007BFF' }}>
        Your QR Code Value: <span style={{ fontSize: '1.8rem', color: '#DC3545' }}>{qrCodeValue}</span>
      </p>
      <p>
        Kindly share this with your guests for attendance tracking. Thank you!
      </p>
      <button onClick={handleCopyClick} style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}>
        Copy QR Code Text
      </button>
    </div>

    <p style={{ marginTop: '2rem', fontStyle: 'italic', fontSize: '1rem', color: '#555' }}>
      Upon cancellation of your event, please contact us. Thank you.
    </p>

    <div className="button-container" style={{ marginTop: '2rem' }}>
      <button
        type="button"
        onClick={handlePrevious}
        style={{ fontSize: '1.2rem', padding: '0.7rem 1.5rem', marginRight: '1rem' }}
      >
        Go Back
      </button>
      {loading ? (
        <p style={{ fontSize: '1.2rem', color: '#FFC107' }}>Loading...</p>
      ) : (
        <button
          type="button"
          onClick={handleDone}
          style={{ fontSize: '1.2rem', padding: '0.7rem 1.5rem', backgroundColor: '#28A745', color: 'white' }}
        >
          Confirm
        </button>
      )}
    </div>
  </div>
);


  return (
    <div className="booking-form">
    {!isBooked ? (
      <>
        <div className="intro-text">
          <h1>Create Unforgettable Moments at TNF Event Center</h1>
          <p className="booking-intro">
            Whether it's a wedding, corporate event, or celebration, TNF Event Center is here to help you create cherished memories in an elegant and versatile space.
          </p>
        </div>
        {step === 1 ? (
          <form onSubmit={handleNext} className="two-column-form">
            <div className="column-left">
              <h2>Event Information</h2>
              <p>
                Let us know your event details, including type, theme, and date, so we can make your celebration extraordinary. Our customizable options ensure every moment is tailored just for you.
              </p>
              <select
                value={eventType}
                onChange={(e) => {
                  setEventType(e.target.value);
                  if (e.target.value === 'Catering') {
                    setLocation('');
                  }
                }}
                required
              >
                <option value="" disabled>
                  Select Service Type
                </option>
                <option value="Event Center">Event Center</option>
                <option value="Catering">Catering</option>
              </select>
              {eventType === 'Catering' && (
                <input
                  type="text"
                  placeholder="Event Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              )}
              <select value={event} onChange={(e) => setEvent(e.target.value)} required>
                <option value="" disabled>
                  Select Event Type
                </option>
                <option value="Disney">Disney</option>
                <option value="Horror">Horror</option>
                <option value="Retro">Retro</option>
                <option value="Other">Other</option>
              </select>
              {event === 'Other' && (
                <input
                  type="text"
                  placeholder="Specify Event Type"
                  value={customEvent}
                  onChange={(e) => setCustomEvent(e.target.value)}
                  required
                />
              )}
              <select value={eventTheme} onChange={(e) => setEventTheme(e.target.value)} required>
                <option value="" disabled>
                  Select Event Theme
                </option>
                <option value="Birthday">Birthday</option>
                <option value="Wedding">Wedding</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Other">Other</option>
              </select>
              {eventTheme === 'Other' && (
                <input
                  type="text"
                  placeholder="Specify Event Theme"
                  value={customEventTheme}
                  onChange={(e) => setCustomEventTheme(e.target.value)}
                  required
                />
              )}
              <DatePicker
                selected={eventDate ? new Date(eventDate) : null}
                onChange={(date) => {
                  
                  setEventDate(date.toISOString().split('T')[0]);
                  setDateError('');
                }}
                minDate={new Date()}
                required
                 placeholderText="Select a Date"
              />


              
                    <select value={startTime} onChange={(e) => setStartTime(e.target.value)} required>
                      <option value="" disabled>
                        Start Time
                      </option>
                      {Array.from({ length: 16 }, (_, i) => {
                        const hour = 8 + i;
                        const time = `${hour}:00`;
                        const isDisabled = isTimeDisabled(time, 'start');
                        return (
                          <option key={hour} value={time} disabled={isDisabled}>
                            {hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`}
                          </option>
                        );
                      })}
                    </select>

                    <select value={endTime} onChange={(e) => setEndTime(e.target.value)} required>
                      <option value="" disabled>
                        End Time
                      </option>
                      {Array.from({ length: 16 }, (_, i) => {
                        const hour = 8 + i;
                        const time = `${hour}:00`;
                        const isDisabled = isTimeDisabled(time, 'end');
                        return (
                          <option key={hour} value={time} disabled={isDisabled}>
                            {hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`}
                          </option>
                        );
                      })}
                    </select>

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
              <textarea
                placeholder="Notes (Optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
  
            <div className="column-right">
              <h2>Personal Information</h2>
              <p>
                We value your privacy. Please provide your personal information, so we can confirm your booking and keep in touch for updates and details about your event.
              </p>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Your 11-digit Contact Number"
                value={contactNumber}
                onChange={handleContactNumberChange}
                required
                maxLength="11"
              />
              <input
                type="email"
                placeholder="Your Email (Optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                <option value="" disabled>
                  Select Payment Method
                </option>
                <option value="gcash">Gcash</option>
                <option value="bank-transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
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
