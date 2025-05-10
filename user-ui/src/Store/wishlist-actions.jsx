import axios from "axios";
import { wishlistActions } from "./wishlistSlice";
import { toast } from "react-toastify";

// ✅ Fetch wishlist
export const fetchWishlist = (userId) => {
  return async (dispatch) => {
    try {
      // Sanitize userId by removing special characters
      const sanitizedUserId = userId.replace(/[@.]/g, "");
      
      // Fetch the data from Firebase
      const res = await axios.get(`https://stayfinder-website-default-rtdb.firebaseio.com/wishlist/${sanitizedUserId}.json`);
      
      // If data exists, transform it into an array of wishlist items
      const data = res.data || {};  // If no data, fallback to an empty object
      const transformed = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      // Dispatch the action to update the Redux store
      dispatch(wishlistActions.replaceWishlist(transformed));
    } catch (error) {
      // If there's an error, display a toast notification
      toast.error("Failed to fetch wishlist.");
    }
  };
};

// ✅ Send wishlist
export const sendWishlist = (userId, items) => {
  return async () => {
    try {
      // Sanitize userId by removing special characters
      const sanitizedUserId = userId.replace(/[@.]/g, "");

     
      await axios.put(
        `https://stayfinder-website-default-rtdb.firebaseio.com/wishlist/${sanitizedUserId}.json`,
        items
      );

      // If successful, show success notification
      toast.success("Wishlist synced!");
    } catch (error) {
      // If there's an error, show a failure notification
      toast.error("Failed to sync wishlist.");
    }
  };
};
