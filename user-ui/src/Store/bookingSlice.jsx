import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
  },
  reducers: {
    replaceBookings(state, action) {
      state.bookings = action.payload;
    },
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },
  }
});

export const bookingAction = bookingSlice.actions;
export default bookingSlice.reducer;
