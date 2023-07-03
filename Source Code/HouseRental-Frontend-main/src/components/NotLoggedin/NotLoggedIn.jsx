import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import './NotLoggedIn.css'; // Import the CSS file for styling

const NotLoggedIn = () => {
  const handleGoToLandingPage = () => {
    // Logic to navigate to the landing page
    window.location.href = '/landing';
  };

  return (
    <div className="not-logged-in-container">
      <FaExclamationCircle className="not-logged-in-icon" />
      <h2 className="not-logged-in-heading">You are not logged in.</h2>
      <p className="not-logged-in-text">Please log in to access the dashboard.</p>
      <button className="go-to-landing-btn" onClick={handleGoToLandingPage}>
        Go to Landing Page
      </button>
    </div>
  );
};

export default NotLoggedIn;
