import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TopListing.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { wishlistActions } from "../Store/wishlistSlice";

const TopListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const popularListings = useSelector((state) => state.listings.popular);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const userLogged = useSelector((state) => state.auth.userLogged);

  const [imageIndexes, setImageIndexes] = useState({});

  useEffect(() => {
    const initialIndexes = {};
    popularListings.forEach((listing) => {
      initialIndexes[listing.id] = 0;
    });
    setImageIndexes(initialIndexes);
  }, [popularListings]);

  const handlePrev = (id, imagesLength) => {
    setImageIndexes((prev) => ({
      ...prev,
      [id]: (prev[id] - 1 + imagesLength) % imagesLength,
    }));
  };

  const handleNext = (id, imagesLength) => {
    setImageIndexes((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % imagesLength,
    }));
  };

 const handleLikeClick = (listing) => {
  if (!userLogged) {
    navigate("/signin");
  } else {
    const alreadyLiked = isLiked(listing.id);
    if (alreadyLiked) {
      dispatch(wishlistActions.removeItem(listing.id));
    } else {
      dispatch(wishlistActions.addItem(listing));
    }
  }
};


  const isLiked = (listingId) => {
    return wishlistItems.some((item) => item.id === listingId);
  };

  const handleViewMore = (id) => {
    navigate(`/listing/${id}`);
  };

  return (
    <div className="popular-listings-container">
      <h2>Popular stays for you</h2>
      <div className="listings-grid">
        {popularListings.map((listing) => {
          const images = listing.images || [];
          const currentIndex = imageIndexes[listing.id] || 0;
          const liked = isLiked(listing.id);

          return (
            <div key={listing.id} className="listing-card">
              <div className="image-container">
                {images.length > 0 && (
                  <img
                    src={images[currentIndex]}
                    alt={listing.placeName}
                    className="listing-image"
                  />
                )}
                <button
                  className="nav-arrow left"
                  onClick={() => handlePrev(listing.id, images.length)}
                >
                  ‹
                </button>
                <button
                  className="nav-arrow right"
                  onClick={() => handleNext(listing.id, images.length)}
                >
                  ›
                </button>
                <button
                  className={`like-btn ${liked ? "liked" : ""}`}
                  onClick={() => handleLikeClick(listing)}
                >
                  {liked ? <FaHeart /> : <CiHeart />}
                </button>
              </div>
              <div className="listing-details">
                <h3>{listing.placeName}</h3>
                <p>{listing.address?.city}</p>
              </div>
              <button className="view-more-btn" onClick={() => handleViewMore(listing.id)}>
                View More
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopListing;
