import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from './UI/Modal';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ListingDetail.css";
import BookingPage from "./BookingPage";
import { toast } from "react-toastify/unstyled";
import { addNewBooking } from "../Store/booking_actions";

const ListingDetail = () => {
  const { id } = useParams();
  const listings = useSelector((state) => state.listings.items);
  const auth=useSelector((state)=>state.auth);
  const listing = listings.find((item) => item.id === id);
  const dispatch=useDispatch()

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [userAddress, setUserAddress] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
  };

  const handleBookingSubmit = () => {
    if (!startDate || !endDate || !guests || !userAddress) {
      alert("Please fill in all fields.");
      return;
    }

    const bookingData = {
      userName:auth.userName,
      userEmail:auth.userEmail,
      listingId: listing.id,
      checkIn: startDate,
      checkOut: endDate,
      guests,
      address: userAddress,
      status: "pending",
      placeName: listing.placeName,
      pricePerNight: listing.pricePerNight,
      image: listing.images?.[0],
      city: listing.address?.city,
    };

    dispatch(addNewBooking(auth.userEmail, bookingData));
    toast("Booking request submitted. Status: pending");
    setShowBookingModal(false);
    setStartDate('');
    setEndDate('');
    setGuests(1);
    setUserAddress('');

  };

  const closeModal = () => {
    setShowBookingModal(false);
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="listing-detail">
      <h2>{listing.placeName}</h2>

      <div className="carousel-container">
        <Slider {...sliderSettings}>
          {listing.images?.map((img, index) => (
            <div key={index} className="carousel-slide">
              <img src={img} alt={`Slide ${index + 1}`} className="carousel-image" />
            </div>
          ))}
        </Slider>
      </div>

     <p><strong>City:</strong> {listing.address?.city}, <strong>PIN:</strong> {listing.address?.pin}</p>

      <p>{listing.description}</p>
      <p><strong>Price per night:</strong> ₹{listing.pricePerNight} — Book now, pay later!</p>


      {listing.availability?(<button type="button" className="book-now-btn" onClick={() => setShowBookingModal(true)}>
        Book Now
      </button>):(<p>This property not Available right now!</p>)}

      {showBookingModal && (
        <Modal onClose={closeModal}>
          <BookingPage
            startDate={startDate}
            endDate={endDate}
            guests={guests}
            userAddress={userAddress}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setGuests={setGuests}
            setUserAddress={setUserAddress}
            handleBookingSubmit={handleBookingSubmit}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default ListingDetail;
