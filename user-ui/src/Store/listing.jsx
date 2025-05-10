import { createSlice } from "@reduxjs/toolkit";

const listingSlice = createSlice({
  name: "listings",
  initialState: {
    items: [],
    popular: [],
  },
  reducers: {
    setListings(state, action) {
      state.items = action.payload;
    },
    setPopularListings(state, action) {
      state.popular = action.payload;
    },
  },
});

export const { setListings, setPopularListings } = listingSlice.actions;
export default listingSlice.reducer;
