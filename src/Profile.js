import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { socket } from './App';
import './App.css';

export function Profile(props) {
  const { email } = props;

  const [zip, setZip] = useState('');
  const inputRef = useRef();

  function zipButton() {
    // will add test for alphanumeric character later
    const zipcode = inputRef.current.value;
    // console.log(zipcode);
    // console.log(email);
    if (zipcode.length === 5) {
      socket.emit('new_zip', {
        zip: zipcode,
        email,
      });
    } else {
      alert('Bad zipcode'); // eslint-disable-line no-undef
    }
  }

  useEffect(() => {
    socket.on('new_zip', (data) => {
      // console.log('new_zip event received!');
      // console.log(data.zip);
      setZip(data.zip);
      console.log(zip);
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
        </div>
    </div>
  );
}

Profile.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Profile;
