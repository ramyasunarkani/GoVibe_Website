import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate=useNavigate();
  return (
    <div className="hero-section">
  <div className="overlay"></div>
  <div className="content">
    <h1>Find your perfect stay</h1>
    <button onClick={()=>navigate('/listings')}>Start exploring</button>
  </div>
</div>
  )
}

export default HeroSection