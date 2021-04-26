/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export function Logout(props) {
  const onSuccess = () => {
    console.log('You have successfully logged out.');
    alert('You have successfully logged out');
  };
  return (
    <div>
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
