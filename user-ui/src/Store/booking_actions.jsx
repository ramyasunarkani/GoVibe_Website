import axios from "axios";
import { bookingAction } from "./bookingSlice";

const sanitizeEmail = (email) => {
  if (typeof email !== 'string') {
    throw new Error('Invalid email: expected string but got ' + typeof email);
  }
  return email.replace(/\./g, '_');
};

export function fetchBookings(userEmail) {
  return async (dispatch) => {
    try {
      if (!userEmail) throw new Error("No user email provided for fetching bookings");
      const sanitizedEmail = sanitizeEmail(userEmail);

      const res = await axios.get(
        `https://stayfinder-website-default-rtdb.firebaseio.com/bookings/${sanitizedEmail}.json`
      );

      const loaded = Object.entries(res.data || {}).map(([id, value]) => ({
        id,
        ...value
      }));

      dispatch(bookingAction.replaceBookings(loaded));
    } catch (err) {
      console.error("Failed to fetch user bookings", err);
    }
  };
}

export function addNewBooking(userEmail, bookingData) {
  return async (dispatch) => {
    try {
      if (!userEmail) throw new Error("No user email provided for booking");
      const sanitizedEmail = sanitizeEmail(userEmail);

      const res = await axios.post(
        `https://stayfinder-website-default-rtdb.firebaseio.com/bookings/${sanitizedEmail}.json`,
        bookingData
      );

      const id = res.data.name;
      dispatch(bookingAction.addBooking({ id, ...bookingData }));
    } catch (err) {
      console.error("Failed to add new booking", err);
    }
  };
}
