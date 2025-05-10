import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./Wishlist.css";
import { wishlistActions } from "../Store/wishlistSlice";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const navigate=useNavigate();

  // Handle delete from wishlist
  const handleDelete = (itemId) => {
    dispatch(wishlistActions.removeItem(itemId));
  };

  const handleViewMore = (id) => {
    navigate(`/listing/${id}`);
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <div className="wishlist-item-image">
                {/* Check if images array exists and has at least one item */}
                <img
                  src={item.images && item.images.length > 0 ? item.images[0] : "placeholder-image-url.jpg"}
                  alt={item.placeName}
                  className="item-image"
                />
              </div>
              <div className="wishlist-item-details">
                <h3>{item.placeName}</h3>
                <p>{item.address?.city}</p>
                <p>{item.availability?'Available':'Not Available'}</p>
              </div>
              <button
                className="remove-item-btn"
                onClick={() => handleDelete(item.id)}
              >
                X
              </button>
              <button
                className="view-more-btn"
                onClick={() => handleViewMore(item.id)}
              >
                View More
              </button>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
