const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const registerUser = async (req, res) => {
  console.log("authController Debug User Registration::.req.body: \n", req.body); // DEBUG: log the request body

  const {
    firstName,
    lastName,
    gender,
    age,
    contactNumber,
    email,
  } = req.body;

  function generateRandomString(
    length,
    options = { type: "alphanumeric", case: "mixed" },
  ) {
    const alphaLower = "abcdefghijklmnopqrstuvwxyz";
    const alphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeric = "0123456789";

    let characters = "";

    switch (options.type) {
      case "alpha":
        characters = alphaLower + alphaUpper;
        break;
      case "numeric":
        characters = numeric;
        break;
      case "alphanumeric":
      default:
        characters = alphaLower + alphaUpper + numeric;
        break;
    }

    if (options.case === "lower") {
      characters = characters.toLowerCase();
    } else if (options.case === "upper") {
      characters = characters.toUpperCase();
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return result;
  }

  try {
    // autogenerate a password
    const autoPassword = generateRandomString(10, {
      type: "alphanumeric",
      case: "upper",
    });

    // debug log the generated password
    console.log("authController Debug User Registration::.autoPassword: \n", autoPassword);

    // Hash the password
    const passwordHash = await bcrypt.hash(autoPassword, 10);

    // derive birth year from age
    const birthYear = new Date().getFullYear() - age;

    // Create user object
    const user = {
      username: `${firstName}_${lastName}_r${new Date().getUTCDay()}${new Date().getUTCMonth()}${new Date().getUTCFullYear()}_${String(Math.floor(Math.random() * 1000)).padStart(4, '0')}`.toLowerCase(),
      passwordHash,
      firstName,
      lastName,
      gender,
      age,
      birthYear,
      contactNumber,
      email,
    };

    // Insert user into the database
    userModel.createUser(user, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: result.insertId }, "your_jwt_secret", {
        expiresIn: "1h",
      });

      res.status(201).json({ message: "User registered successfully", token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
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
  
        // Generate JWT token with user details
        const token = jwt.sign(
          { 
            userId: user.id,
            username: user.username,
            firstName: user.first_name,
            middleName: user.middle_name,
            lastName: user.last_name,
            contactNumberPrimary: user.contact_number_primary,
            contactNumberSecondary: user.contact_number_secondary,
            email: user.email,
            joinDate: user.created_at,
          }, 
          'your_jwt_secret', 
          { expiresIn: '1h' }
        );
  
        res.status(200).json({ message: 'Login successful', token });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

module.exports = {
  registerUser,
  loginUser,
};
