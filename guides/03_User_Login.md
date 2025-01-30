To implement a proper login system, you need to:

1. **Set up the backend to handle login requests**.
2. **Verify user credentials against the database**.
3. **Generate a JWT token upon successful login**.
4. **Send the token to the frontend**.
5. **Store the token on the frontend and use it for authenticated requests**.

### Backend Setup

#### 1. Create a Login Route

Add a login route to your `auth.js` file:

```javascript
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser); // Add this line

module.exports = router;
```

#### 2. Implement the Login Controller

Add the `loginUser` function to your `authController.js` file:

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const registerUser = async (req, res) => {
  console.log("authController Debug User Registration::.req.body: \n", req.body); // DEBUG: log the request body

  const {
    firstName,
    lastName,
    gender,
    age,
    contactNumberPrimary,
    contactNumberSecondary,
    email,
    password,
  } = req.body;

  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user object
    const user = {
      username: `${firstName}_${lastName}_${generateRandomString(4, { type: 'numeric' })}`,
      email,
      firstName,
      middleName: '',
      lastName,
      contactNumberPrimary,
      contactNumberSecondary,
      passwordHash
    };

    // Insert user into the database
    userModel.createUser(user, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: result.insertId }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(201).json({ message: 'User registered successfully', token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    userModel.findUserByUsername(username, async (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Compare the password with the stored hash
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
```

#### 3. Implement the User Model

Add a function to find a user by username in your `userModel.js` file:

```javascript
const db = require('../config/db');

const createUser = (user, callback) => {
  const query = `
    INSERT INTO users (username, email, first_name, middle_name, last_name, contact_number_primary, contact_number_secondary, password_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [
    user.username,
    user.email,
    user.firstName,
    user.middleName,
    user.lastName,
    user.contactNumberPrimary,
    user.contactNumberSecondary,
    user.passwordHash
  ], callback);
};

const findUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    return callback(null, results[0]);
  });
};

module.exports = {
  createUser,
  findUserByUsername
};
```

### Frontend Setup

#### 1. Update the Login Form

Update the 

handleSubmit

 function in your 

CustomerLogin.jsx

 file to send the login request to the backend and handle the response:

```jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';

function CustomerLogin() {
  const navigate = useNavigate();

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
      localStorage.setItem('token', response.data.token); // Store the token
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

### Summary

1. **Backend**:
   - Add a login route and controller to handle login requests.
   - Verify user credentials against the database.
   - Generate a JWT token upon successful login.

2. **Frontend**:
   - Update the login form to send a login request to the backend.
   - Store the JWT token on the frontend and use it for authenticated requests.

This setup will allow you to implement a secure login system for your application.

Similar code found with 2 license types

--------------

Sure! Let's update the 

findUserByUsername

 function in the `userModel.js` file to find a user by their primary contact number or email. We'll also update the `loginUser` function in the 

authController.js

 file to use this updated function.

### Updated `userModel.js`

#### 

userModel.js



```javascript
const db = require('../config/db');

const createUser = (user, callback) => {
  const query = `
    INSERT INTO users (username, email, first_name, middle_name, last_name, contact_number_primary, contact_number_secondary, password_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [
    user.username,
    user.email,
    user.firstName,
    user.middleName,
    user.lastName,
    user.contactNumberPrimary,
    user.contactNumberSecondary,
    user.passwordHash
  ], callback);
};

const findUserByContactOrEmail = (contactNumberPrimary, email, callback) => {
  const query = 'SELECT * FROM users WHERE contact_number_primary = ? OR email = ?';
  db.query(query, [contactNumberPrimary, email], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    return callback(null, results[0]);
  });
};

module.exports = {
  createUser,
  findUserByContactOrEmail
};
```

### Updated 

authController.js



#### 

authController.js



```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const registerUser = async (req, res) => {
  console.log("authController Debug User Registration::.req.body: \n", req.body); // DEBUG: log the request body

  const {
    firstName,
    lastName,
    gender,
    age,
    contactNumberPrimary,
    contactNumberSecondary,
    email,
    password,
  } = req.body;

  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user object
    const user = {
      username: `${firstName}_${lastName}_${generateRandomString(4, { type: 'numeric' })}`,
      email,
      firstName,
      middleName: '',
      lastName,
      contactNumberPrimary,
      contactNumberSecondary,
      passwordHash
    };

    // Insert user into the database
    userModel.createUser(user, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: result.insertId }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(201).json({ message: 'User registered successfully', token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by contact number or email
    userModel.findUserByContactOrEmail(username, username, async (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid contact number or email' });
      }

      // Compare the password with the stored hash
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
```

### Summary

1. **Updated the `findUserByContactOrEmail` function** in `userModel.js` to find a user by their primary contact number or email.
2. **Updated the `loginUser` function** in 

authController.js

 to use the updated `findUserByContactOrEmail` function.

This setup will allow users to log in using either their primary contact number or email.

Similar code found with 1 license type

-----------

To update your header to show a User Profile button when a user is logged in, you can follow these steps:

1. **Decode the JWT token to get user information**.
2. **Store the user information in the state**.
3. **Conditionally render the User Profile button based on the user's login status**.

### Steps to Implement

1. **Install the `jwt-decode` package** to decode the JWT token:
   ```bash
   npm install jwt-decode
   ```

2. **Update the Header component** to check for the JWT token and decode it to get user information.

### Example Implementation

#### 

Header.jsx



```jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
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
            <div className="user-profile">
              <Link to="/clients/profile" className="profile-link">
                <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
                {user.username}
              </Link>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          ) : (
            <Link to="/clients/login" className="nav-link">Login</Link>
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
};

export default Header;
```

### Explanation

1. **Import `jwtDecode`**:
   - Import the `jwt-decode` package to decode the JWT token.

2. **Check for the JWT token**:
   - In the `useEffect` hook, check if the JWT token is present in `localStorage`.
   - If the token is present, decode it to get the user information and store it in the state.

3. **Conditionally render the User Profile button**:
   - If the user is logged in, render the User Profile button with the user's username and a logout button.
   - If the user is not logged in, render the Login link.

4. **Handle Logout**:
   - Remove the JWT token from `localStorage` and reset the user state.
   - Navigate to the login page.

### Summary

By following these steps, you can update your header to show a User Profile button when a user is logged in. The button will display the user's username and provide a logout option. This setup ensures that the header dynamically updates based on the user's login status.

--------------

