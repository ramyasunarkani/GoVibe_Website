import React from 'react'
import HeroSection from '../components/HeroSection'
import CategorySlider from '../components/CategorySlider'
import TopListing from '../components/TopListing'
import { Outlet, Route, Routes } from 'react-router-dom'
import Wishlist from '../components/Wishlist'

const Home = () => {
  return (
    <>
      <HeroSection/>
      <CategorySlider/>
      <TopListing/>
      
    </>
  )
}

export default Home