# User Authentication Guide

## High-Level Concepts

To authenticate users and manage their sessions, you typically follow these high-level steps:

1. **Set Up the Database**:
   - Choose a database (e.g., PostgreSQL, MySQL, MongoDB).
   - Create a database schema to store user information (e.g., username, password hash, email).

2. **Set Up the Backend**:
   - Choose a backend framework (e.g., Express.js for Node.js, Django for Python).
   - Implement user registration and login endpoints.
   - Use a library for password hashing (e.g., bcrypt).
   - Use a library for session management or token-based authentication (e.g., JWT).

3. **Set Up the Frontend**:
   - Create forms for user registration and login.
   - Implement API calls to the backend for registration and login.
   - Store authentication tokens or session information securely (e.g., in cookies or local storage).

4. **Implement Authentication Logic**:
   - **Registration**:
     - Collect user information from the registration form.
     - Hash the password and store the user information in the database.
   - **Login**:
     - Collect user credentials from the login form.
     - Verify the credentials against the stored information in the database.
     - If valid, generate a session or token and send it to the client.
   - **Session Management**:
     - Use cookies or local storage to store the session or token on the client side.
     - Implement middleware on the backend to verify the session or token for protected routes.

### Prerequisites

1. **Database Setup**:
   - Install and configure your chosen database.
   - Create a database and a table for users.

2. **Backend Setup**:
   - Set up a backend framework (e.g., Express.js).
   - Install necessary libraries (e.g., bcrypt for password hashing, JWT for token-based authentication).

3. **Frontend Setup**:
   - Set up a frontend framework (e.g., React).
   - Install necessary libraries (e.g., Axios for making API calls).

### Steps to Implement

1. **Database Schema**:

   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(255) UNIQUE NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. **Backend Implementation**:
   - **User Registration**:

     ```javascript
     const express = require('express');
     const bcrypt = require('bcrypt');
     const { Pool } = require('pg');
     const pool = new Pool();

     const app = express();
     app.use(express.json());

     app.post('/register', async (req, res) => {
       const { username, email, password } = req.body;
       const passwordHash = await bcrypt.hash(password, 10);
       const result = await pool.query(
         'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
         [username, email, passwordHash]
       );
       res.json(result.rows[0]);
     });
     ```

   - **User Login**:

     ```javascript
     const jwt = require('jsonwebtoken');

     app.post('/login', async (req, res) => {
       const { username, password } = req.body;
       const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
       const user = result.rows[0];

       if (user && await bcrypt.compare(password, user.password_hash)) {
         const token = jwt.sign({ userId: user.id }, 'your_jwt_secret');
         res.json({ token });
       } else {
         res.status(401).json({ error: 'Invalid credentials' });
       }
     });
     ```

   - **Middleware for Protected Routes**:

     ```javascript
     const authenticateToken = (req, res, next) => {
       const token = req.headers['authorization'];
       if (!token) return res.sendStatus(401);

       jwt.verify(token, 'your_jwt_secret', (err, user) => {
         if (err) return res.sendStatus(403);
         req.user = user;
         next();
       });
     };

     app.get('/protected', authenticateToken, (req, res) => {
       res.json({ message: 'This is a protected route' });
     });
     ```

3. **Frontend Implementation**:
   - **Login Form**:

     ```jsx
     import React, { useState } from 'react';
     import axios from 'axios';

     function CustomerLogin() {
       const [formData, setFormData] = useState({ username: '', password: '' });
       const [error, setError] = useState('');

       const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData({ ...formData, [name]: value });
       };

       const handleSubmit = async (e) => {
         e.preventDefault();
         try {
           const response = await axios.post('/login', formData);
           localStorage.setItem('token', response.data.token);
           // Redirect to protected route
         } catch (err) {
           setError('Invalid credentials');
         }
       };

       return (
         <form onSubmit={handleSubmit}>
           <input type="text" name="username" value={formData.username} onChange={handleChange} />
           <input type="password" name="password" value={formData.password} onChange={handleChange} />
           <button type="submit">Login</button>
           {error && <p>{error}</p>}
         </form>
       );
     }

     export default CustomerLogin;
     ```

By following these steps, you can set up user authentication and session management for your application.

--------
