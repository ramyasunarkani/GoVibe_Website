import axios from "axios";
import { categoryAction } from "./categories";
import { setListings, setPopularListings } from "./listing";

export function fetchCategories (){
    return async (dispatch) => {
      try {
        const res = await axios.get(
          'https://stayfinder-website-default-rtdb.firebaseio.com/categories.json'
        );
        const loaded = Object.entries(res.data || {}).map(([id, value]) => ({
          id,
          ...value,
        }));
        dispatch(categoryAction.replaceCategories(loaded));
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
}

 

export function fetchListings() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://stayfinder-website-default-rtdb.firebaseio.com/listings.json"
      );
      const data = response.data;

      const listingsArray = Object.entries(data || {}).map(([id, value]) => ({
        id,
        ...value,
      }));

      dispatch(setListings(listingsArray));

      const popularOnly = listingsArray.filter((item) => item.popular);
      dispatch(setPopularListings(popularOnly));
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };
}
