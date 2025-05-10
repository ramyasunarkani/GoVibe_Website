import React from "react";
import { useParams } from "react-router-dom";
import AllListings from "../components/AllListings";

const CategoryListings = () => {
  const { categoryName } = useParams();

  return <AllListings defaultCategory={categoryName} />;
};

export default CategoryListings;
