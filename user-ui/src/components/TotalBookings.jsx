import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../store/booking_actions'; // adjust path if needed
import './TotalBookings.css'; // CSS file for styles
import { useNavigate } from 'react-router-dom';

const TotalBookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const userEmail = useSelector((state) => state.auth.userEmail); // adjust if needed
  const navigate =useNavigate();

 

  if (!bookings || bookings.length === 0) return <p>No bookings found.</p>;
  
  return (
    <div className="bookings-container">
      <h2 className="bookings-title">Your Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className="booking-card">
          <img
            src={booking.image || 'https://via.placeholder.com/150'}
            alt={booking.placeName}
            className="booking-image"
          />
          <div className="booking-details">
            <h3>{booking.placeName}</h3>
            <p><strong>Price per Night:</strong> ${booking.pricePerNight}</p>
            <p><strong>Check-In:</strong> {booking.checkIn}</p>
            <p><strong>Check-Out:</strong> {booking.checkOut}</p>
            
            <button className='status'>{booking.status}</button> 
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalBookings;
