import { configureStore } from "@reduxjs/toolkit";

import categoriesReducers from "./categories";
import listingsReducer from "./listing";
import authReducer from './authSlice'
import wishReducers from './wishlistSlice'
import bookingsReducers from './bookingSlice'
const store=configureStore({
    reducer:{
        categories:categoriesReducers,
        listings: listingsReducer,
        auth:authReducer,
        wishlist:wishReducers,
        bookings:bookingsReducers,
    }
})
export default store