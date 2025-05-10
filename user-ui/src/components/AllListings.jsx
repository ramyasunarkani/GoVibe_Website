import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./AllListings.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { wishlistActions } from "../Store/wishlistSlice";

const AllListings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const listings = useSelector((state) => state.listings.items);
  const userLogged = useSelector((state) => state.auth.userLogged);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // Get initial filters from URL query params
  const queryParams = new URLSearchParams(location.search);
  const initialFilters = {
    search: queryParams.get("search") || "",
    category: queryParams.get("category") || "",
    maxPrice: queryParams.get("maxPrice") || "",
    available: queryParams.get("available") === "true",
  };

  const [filters, setFilters] = useState(initialFilters);

  // Update URL query string when filters change
  useEffect(() => {
    const query = new URLSearchParams();
    if (filters.search) query.set("search", filters.search);
    if (filters.category) query.set("category", filters.category);
    if (filters.maxPrice) query.set("maxPrice", filters.maxPrice);
    if (filters.available) query.set("available", "true");

    navigate(`/listings?${query.toString()}`, { replace: true });
  }, [filters, navigate]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const filterValue = type === "checkbox" ? checked : value;
    setFilters((prev) => ({ ...prev, [name]: filterValue }));
  };

  const handleCategoryClick = (category) => {
    setFilters((prev) => ({ ...prev, category }));
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

  const searchQuery = filters.search.toLowerCase();

  const filteredListings = listings.filter((listing) => {
    return (
      (filters.search === "" ||
        listing.placeName?.toLowerCase().includes(searchQuery) ||
        listing.address?.city?.toLowerCase().includes(searchQuery) ||
        listing.description?.toLowerCase().includes(searchQuery)) &&
      (!filters.category || listing.category === filters.category) &&
      (!filters.maxPrice || listing.pricePerNight <= Number(filters.maxPrice)) &&
      (!filters.available || listing.availability === true)
    );
  });

  const categoryOptions = categories.map((cat) => cat.name);

  return (
    <div className="listings-page">
      {/* Search Bar Header */}
      <header className="search-header">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search by place, city, or description"
          className="search-input"
        />
      </header>

      <div className="content-container">
        <aside className="sidebar">
          <h3>Filters</h3>

          <div className="category-buttons">
            <p>Category:</p>
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${filters.category === cat ? "active" : ""}`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <label>
            Max Price (per night):
            <input
              name="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="e.g. 5000"
            />
          </label>

          <label className="checkbox-label">
            <input
              name="available"
              type="checkbox"
              checked={filters.available}
              onChange={handleFilterChange}
            />
            Available
          </label>
        </aside>

        <main className="listing-rows">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div key={listing.id} className="listing-row">
                <div className="listing-image-container">
                  <img
                    src={listing.images?.[0]}
                    alt={listing.placeName}
                    className="listing-thumb"
                  />
                  <button
                    className={`like-btn ${isLiked(listing.id) ? "liked" : ""}`}
                    onClick={() => handleLikeClick(listing)}
                  >
                    {isLiked(listing.id) ? <FaHeart /> : <CiHeart />}
                  </button>
                </div>
                <div className="listing-info">
                  <h3>{listing.placeName}</h3>
                  <p>{listing.address?.city}</p>
                  <p>₹{listing.pricePerNight} / night</p>
                  <p>{listing.availability ? "Available" : "Unavailable"}</p>
                  <div className="listing-actions">
                    <button onClick={() => navigate(`/listing/${listing.id}`)}>
                      View More
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No listings found matching the filters.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllListings;
