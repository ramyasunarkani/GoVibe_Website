import axios from "axios";
import { wishlistActions } from "./wishlistSlice";
import { toast } from "react-toastify";

export const fetchWishlist = (userId) => {
  return async (dispatch) => {
    try {
      const sanitizedUserId = userId.replace(/[@.]/g, "");
      
      const res = await axios.get(`https://stayfinder-website-default-rtdb.firebaseio.com/wishlist/${sanitizedUserId}.json`);
      
      const data = res.data || {}; 
      const transformed = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      dispatch(wishlistActions.replaceWishlist(transformed));
    } catch (error) {
      console.log(error)
    }
  };
};

export const sendWishlist = (userId, items) => {
  return async () => {
    try {
      const sanitizedUserId = userId.replace(/[@.]/g, "");

     
      await axios.put(
        `https://stayfinder-website-default-rtdb.firebaseio.com/wishlist/${sanitizedUserId}.json`,
        items
      );

    } catch (error) {
      toast.error("Failed to add wishlist.");
    }
  };
};
