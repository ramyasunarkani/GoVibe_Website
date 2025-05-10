import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../Store/authSlice';

const Profile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { userName, userEmail, userLogged } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <>
      {userLogged && (
        <div className="profile-icon" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <span>Profile</span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="user-info">
                <p><strong>Name:</strong> {userName}</p>
                <p><strong>Email:</strong> {userEmail}</p>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
