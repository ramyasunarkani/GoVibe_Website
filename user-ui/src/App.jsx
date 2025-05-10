import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchListings } from './Store/actions';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryListings from './pages/CategoryListings';
import ListingDetail from './components/ListingDetail';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchWishlist, sendWishlist } from './Store/wishlist-actions';
import Wishlist from './components/Wishlist';
import TotalBookings from './components/TotalBookings';
import { fetchBookings } from './Store/booking_actions';

function App() {
  const userLogged = useSelector((state) => state.auth.userLogged);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userName = useSelector((state) => state.auth.userName);
  const wishlist = useSelector((state) => state.wishlist);
  const isInitial = useRef(true);

  const dispatch = useDispatch();

  // Fetch categories, listings, wishlist, and bookings for logged-in users
  useEffect(() => {
    if (userEmail) {
     
      dispatch(fetchWishlist(userEmail));
      dispatch(fetchBookings(userEmail));
    }
     dispatch(fetchCategories());
      dispatch(fetchListings());
  }, [dispatch, userEmail]);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    if (wishlist.changed) {
      dispatch(sendWishlist(userEmail, wishlist.items));
    }
  }, [wishlist.items, wishlist.changed, userEmail, dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/goVibe' />} />
        <Route path='/goVibe' element={<Home />} />
        <Route path="/signin" element={userLogged ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={userLogged ? <Navigate to="/" /> : <SignUp />} />
        <Route path='/goVibe/wishlist' element={userLogged ? <Wishlist /> : <Login />} />
        <Route path="/listings" element={<CategoryListings />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path={`/${userName}/Booking`} element={userLogged ? <TotalBookings /> : <Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
