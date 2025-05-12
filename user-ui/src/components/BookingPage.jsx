import React from 'react';
import { RxCross2 } from "react-icons/rx";

const BookingPage = ({
  startDate,
  endDate,
  guests,
  userAddress,
  setStartDate,
  setEndDate,
  setGuests,
  setUserAddress,
  handleBookingSubmit,
  closeModal 
}) => {
  return (
    <form className="booking-modal">
      <span className="close-icon" onClick={closeModal}><RxCross2 /></span>
      <h3>Confirm Your Booking</h3>

      <label>
        Check-in:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>

      <label>
        Check-out:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>

      <label>
        Guests:
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </label>

      <label>
        Address:
        <textarea
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="Enter your address"
        />
      </label>

      <div className="modal-actions">
        <button type="button" onClick={handleBookingSubmit}>Proceed</button>
      </div>
    </form>
  );
};

export default BookingPage;
