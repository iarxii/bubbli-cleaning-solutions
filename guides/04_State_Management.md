To ensure that the header updates correctly when logging in and out without requiring a hard reload, you can use a combination of state management and context to manage the authentication state across your application.

### Steps to Implement

1. **Create an Auth Context** to manage the authentication state.
2. **Update the Header component** to use the Auth Context.
3. **Update the Login and Logout logic** to update the Auth Context.

### 1. Create an Auth Context

Create a new file `AuthContext.js` to manage the authentication state.

#### `src/context/AuthContext.js`

```javascript
import React, { createContext, useState, useEffect } from 'react';
import { decode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = decode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = decode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
```

### 2. Update the Header Component

Update the `Header` component to use the Auth Context.

#### 

Header.jsx



```javascript


"use client";

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/clients/login');
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-logo">Bubbli</Link>
        <div className="nav-links">
          <Link to="/clients/products" className="nav-link">Products</Link>
          {/* Other navigation links */}
          {user ? (
            <div className="user-profile shadow-md" style={styles.userProfileCard}>
              <Link to="/clients/profile" className="profile-link flex items-center gap-x-2">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="profile-icon size-10 text-[#FB6F92]"
                />
                {user.username}
              </Link>
              <button
                onClick={handleLogout}
                className="logout-button"
                style={styles.logoutButton}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/clients/login"
              className="flex items-center gap-x-2 text-sm/6 font-semibold shadow-md"
              style={styles.loginButton}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="icon-white h-6 w-6 text-white"
                style={{ color: "#fff" }}
              />
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    // Your header styles here
  },
  nav: {
    // Your nav styles here
  },
  navLogo: {
    // Your nav logo styles here
  },
  navLinks: {
    // Your nav links styles here
  },
  navLink: {
    // Your nav link styles here
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  profileLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    textDecoration: 'none',
    color: '#FB6F92',
  },
  profileIcon: {
    fontSize: '24px',
  },
  logoutButton: {
    backgroundColor: '#FB6F92',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  loginButton: {
    backgroundColor: '#FB6F92',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default Header;
```

### 3. Update the Login Component

Update the `CustomerLogin` component to use the Auth Context.

#### 

CustomerLogin.jsx



```javascript
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthContext';

function CustomerLogin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      console.log(response.data);
      login(response.data.token); // Use the login function from AuthContext
      navigate("/clients/home"); // Navigate to the home page on successful login
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <section className="glassmorphic h-full py-6">
      <div style={styles.container}>
        <div className="pt-4">
          <FontAwesomeIcon icon={faFingerprint} className="size-20 text-[#FB6F92]" />
        </div>
        <h1 className="mt-4" style={styles.inputLabel}>
          Welcome Back.
        </h1>
        <p style={styles.inputLabel} className="font-medium">Bubbli Customer Login</p>
        <hr className="mb-4 mt-6" />
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.inputLabel}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.inputLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" className="shadow-md" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  inputLabel: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#FB6F92",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default CustomerLogin;
```

### 4. Wrap Your Application with the AuthProvider

Wrap your application with the `AuthProvider` in your main entry file (e.g., `index.js` or `App.js`).

#### `src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

### Summary

1. **Create an Auth Context** to manage the authentication state.
2. **Update the Header component** to use the Auth Context.
3. **Update the Login component** to use the Auth Context.
4. **Wrap your application** with the `AuthProvider`.

This setup ensures that the header dynamically updates based on the user's login status without requiring a hard reload.

Similar code found with 2 license types
