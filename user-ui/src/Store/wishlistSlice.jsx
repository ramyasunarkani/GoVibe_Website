import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceWishlist(state, action) {
      state.items = action.payload;
      state.changed = false;
    },
    addItem(state, action) {
      state.items.push(action.payload);
      state.changed = true;
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.changed = true;
    },
  },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice.reducer;
