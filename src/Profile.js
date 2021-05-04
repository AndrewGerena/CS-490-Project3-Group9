import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { socket } from './App';
import './App.css';

export function Profile(props) {
  const { email } = props;
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const inputRef = useRef();
  const inputCountryRef = useRef();

  function zipButton() {
    // will add test for alphanumeric character later
    const zipcode = inputRef.current.value;
    // console.log(zipcode);
    // console.log(email);
    if (zipcode.length === 5) {
      const str = zipcode;
      let check = true;
      for (let i = 0; i < str.length; i += 1) {
        const string = '1234567890';
        if (!string.includes(str[i])) {
          check = false;
          break;
        }
      }
      if (check) {
        socket.emit('new_zip', {
          zip: zipcode,
          email,
        });
      } else {
        alert('Bad zipcode'); // eslint-disable-line no-undef
      }
    } else {
      alert('Bad zipcode'); // eslint-disable-line no-undef
    }
  }
  
  function countryButton() {
    const countryName = inputCountryRef.current.value;
    //will implement drop-down list later, so no need to put checks here
    socket.emit('new_country', {
      country: countryName,
      email,
    });
  }

  useEffect(() => {
    socket.on('new_zip', (data) => {
      // console.log('new_zip event received!');
      // console.log(data.zip);
      setZip(data.zip);
      console.log(zip);
    });
    socket.on('new_country', (data) => {
      // console.log('new_country event received!');
      // console.log(data.country);
      setCountry(data.country);
      console.log(country);
    });
  }, []);

  return (
    <div className="Profile_Div">
      <h1 className="ProfileHeader">Welcome to the Profile Page!</h1>
      <div className="Prof_Wrapper">
        <h3>Set your zipcode here</h3>
        <input ref={inputRef} type="text" aria-label="zipcode-input" className="Zip_input" />
        <button onClick={zipButton} type="submit" className="Confirm_btn">
          Confirm
        </button>
        <br></br>
        <h3>Set your home country here</h3>
        <input ref={inputCountryRef} type="text" aria-label="zipcode-input" className="Zip_input" />
        <button onClick={countryButton} type="submit" className="Confirm_btn">
          Confirm
        </button>
      </div>
    </div>
  );
}

Profile.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Profile;
