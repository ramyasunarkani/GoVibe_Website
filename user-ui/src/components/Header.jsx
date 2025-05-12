import React, { useState } from 'react';
import logo from '../assets/stayfinder.png';
import './Header.css';
import { CiUser } from 'react-icons/ci';
import { PiShoppingCartSimpleThin } from 'react-icons/pi';
import { GoHeart } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../Store/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.auth.userLogged);
  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(authActions.logout());
    setIsDropdownOpen(false)
    navigate('/signin');
  };

  return (
    <header className="header">
      <div className="logo-container" onClick={() => navigate('/')}>
        <img src={logo} alt="GoVibe Logo" width={50} height={50} />
        <span>GoVibe</span>
      </div>

      {userLogged ? (
        <div className="sub-section">
           <span onClick={() => { navigate('/goVibe/wishlist'); setIsDropdownOpen(false); }}>
            <GoHeart size={22} />
          </span>

          <span onClick={() =>{ navigate(`/${userName}/Booking`); setIsDropdownOpen(false); }}>
            <PiShoppingCartSimpleThin size={25} />
          </span>

          <span
            className="profile-icon"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <CiUser size={25} />
          </span>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="user-info">
                <p><strong>Name:</strong> {userName}</p>
                <p><strong>Email:</strong> {userEmail}</p>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => navigate('/signin')} className="sign-btn">
          Sign in
        </button>
      )}
    </header>
  );
};

export default Header;
