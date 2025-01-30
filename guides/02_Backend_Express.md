# Express.js and MySQL Backend Sevice

To set up the Express server, you typically create a separate directory for the backend within your project structure. This helps to keep the frontend and backend code organized and modular.

Here's a suggested project structure:

```fstructure
/bubbli-cleaning-solutions
  /src
    /assets
    /components
    /pages
      /clients
        CustomerSignUp.jsx
        CustomerLogin.jsx
    /styles
  /backend
    server.js
    /routes
      auth.js
    /controllers
      authController.js
    /models
      userModel.js
    /config
      db.js
  package.json
  package-lock.json
  README.md
```

### Steps to Set Up the Express Server

1. **Create the Backend Directory**:
   - Create a directory named `backend` at the root of your project.

2. **Initialize the Backend**:
   - Navigate to the `backend` directory and initialize a new Node.js project:

     ```bash
     cd backend
     npm init -y
     ```

3. **Install Dependencies**:
   - Install the necessary dependencies:

     ```bash
     npm install express bcrypt jsonwebtoken mysql2 body-parser
     ```

4. **Create the Server File**:
   - Create a file named `server.js` in the `backend` directory.

5. **Set Up the Database Configuration**:
   - Create a `config` directory inside `backend` and add a `db.js` file for the database connection.

6. **Create Routes and Controllers**:
   - Create `routes` and `controllers` directories inside `backend`.
   - Add an `auth.js` file in the `routes` directory.
   - Add an `authController.js` file in the `controllers` directory.
   - Add a `userModel.js` file in the `models` directory.

### Example Code

#### `backend/config/db.js`

```javascript
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'bubbli_orgdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = db;
```

#### `backend/models/userModel.js`

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

module.exports = {
  createUser
};
```

#### `backend/controllers/authController.js`

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const registerUser = async (req, res) => {
  const { username, email, firstName, middleName, lastName, contactNumberPrimary, contactNumberSecondary, password } = req.body;

  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user object
    const user = {
      username,
      email,
      firstName,
      middleName,
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

module.exports = {
  registerUser
};
```

#### `backend/routes/auth.js`

```javascript
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser);

module.exports = router;
```

#### `backend/server.js`

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const db = require('./config/db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Use auth routes
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### Summary

1. **Create the `backend` directory** and initialize a Node.js project.
2. **Install dependencies**: `express`, `bcrypt`, `jsonwebtoken`, `mysql2`, and `body-parser`.
3. **Set up the database configuration** in `backend/config/db.js`.
4. **Create models, controllers, and routes** for user registration.
5. **Set up the Express server** in `backend/server.js`.

This setup will allow you to handle user registration and store user records in the MySQL database. You can extend this setup to include additional functionality such as user login, session management, and more.
