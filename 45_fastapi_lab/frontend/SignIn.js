// Inside SignIn component (SignIn.js)
import React, { useState } from 'react';

const SignIn = ({ onLoginLinkClick }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
    // Perform frontend validation for minimum character constraints
    if (username.length <= 5) {
      setErrorMessage('Username must have more than five characters.');
      return;
    }
    if (password.length <= 6) {
      setErrorMessage('Password must have more than six characters.');
      return;
    }
    if (phoneNumber.length !== 11) {
      setErrorMessage('Phone number must have exactly 11 digits.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Prepare data to send to backend
    const userData = {
      username,
      password,
      email,
      phone_number: phoneNumber
    };

    // Send registration data to backend
    fetch('http://localhost:8000/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to register');
      }
      return response.json();
    })
    .then(data => {
      alert(data.message); // Show success message
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Registration failed');
    });
  };

  return (
    <>
      <h1>Sign In Page</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSignIn}>Sign In</button>
      <p>
        Already signed in?{' '}
        <button onClick={onLoginLinkClick}>Login</button>
      </p>
    </>
  );
};

export default SignIn;

