import React, { useState } from 'react';
import './App.css';
import SignIn from './SignIn';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = () => {
    // Authentication logic
    if (username === 'admin' && password === '1234') {
      setLoggedIn(true);
      setLoginMessage('Login successful!');
    } else {
      setLoginMessage('Invalid credentials. Please try again.');
    }
  };

  const handleRegisterLinkClick = () => {
    setShowSignIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? (
          <>
            <p>Welcome, {username}!</p>
            <button onClick={() => setLoggedIn(false)}>Logout</button>
          </>
        ) : showSignIn ? (
          <SignIn onLoginLinkClick={() => setShowSignIn(false)} />
        ) : (
          <>
            <h1>Login Page</h1>
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
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button onClick={handleLogin}>Login</button>
            <p>{loginMessage}</p>
            <p>
              Not registered?{' '}
              <button onClick={handleRegisterLinkClick}>Register now</button>
            </p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
