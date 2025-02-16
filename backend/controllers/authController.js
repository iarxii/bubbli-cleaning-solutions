const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// utility function to generate a random string
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
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

// register user (customer)
const registerUser = async (req, res) => {
  console.log(
    "authController Debug User Registration::.req.body: \n",
    req.body,
  ); // DEBUG: log the request body

  const { firstName, lastName, gender, age, contactNumber, email } = req.body;

  try {
    // autogenerate a password
    const autoPassword = generateRandomString(10, {
      type: "alphanumeric",
      case: "upper",
    });

    // debug log the generated password
    console.log(
      "authController Debug User Registration::.autoPassword: \n",
      autoPassword,
    );

    // Hash the password
    const passwordHash = await bcrypt.hash(autoPassword, 10);

    // derive birth year from age
    const birthYear = new Date().getFullYear() - age;

    // Create user object
    const user = {
      username:
        `${firstName}_${lastName}_r${new Date().getUTCDay()}${new Date().getUTCMonth()}${new Date().getUTCFullYear()}_${String(Math.floor(Math.random() * 1000)).padStart(4, "0")}`.toLowerCase(),
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
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          firstName: user.firstName,
          middleName: null,
          lastName: user.lastName,
          contactNumberPrimary: user.contactNumber,
          contactNumberSecondary: null,
          email: user.email,
          joinDate: result.created_at,
        },
        "your_jwt_secret",
        {
          expiresIn: "1h",
        },
      );

      res.status(201).json({ message: "Admin registered successfully", token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// register admin
const registerAdmin = async (req, res) => {
  console.log(
    "authController Debug Admin Registration::.req.body: \n",
    req.body,
  ); // DEBUG: log the request body

  const {
    firstName,
    middleName,
    lastName,
    gender,
    age,
    contactNumberPrimary,
    contactNumberSecondary,
    email,
  } = req.body;

  try {
    // autogenerate a password
    const autoPassword = generateRandomString(10, {
      type: "alphanumeric",
      case: "upper",
    });

    // debug log the generated password
    console.log(
      "authController Debug Admin Registration::.autoPassword: \n",
      autoPassword,
    );

    // Hash the password
    const passwordHash = await bcrypt.hash(autoPassword, 10);

    // derive birth year from age
    const birthYear = new Date().getFullYear() - age;

    // Create user object
    const user = {
      username:
      `admin_${firstName}_${lastName}_r${new Date().getUTCDay()}${new Date().getUTCMonth()}${new Date().getUTCFullYear()}_${String(Math.floor(Math.random() * 1000)).padStart(4, "0")}`.toLowerCase(),
      email,
      firstName,
      middleName: middleName || null,
      lastName,
      contactNumberPrimary,
      contactNumberSecondary: contactNumberSecondary || null,
      gender,
      age,
      birthYear,
      passwordHash,
    };

    // Insert user into the database
    userModel.createAdmin(user, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      // Generate JWT token
      const token = jwt.sign({ 
        userId: user.id,
          username: user.username,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          contactNumberPrimary: user.contactNumber,
          contactNumberSecondary: user.contactNumberSecondary,
          email: user.email,
          joinDate: result.created_at,
       }, "your_jwt_secret", {
        expiresIn: "1h",
      });

      res.status(201).json({ message: "User registered successfully", token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login user (customer)
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by contact number or email
    userModel.findUserByContactOrEmail(
      username,
      username,
      async (err, user) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Database error" });
        }

        if (!user) {
          return res
            .status(401)
            .json({ error: "Invalid contact number or email" });
        }

        // Compare the password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
          return res.status(401).json({ error: "Invalid password" });
        }

        // Generate JWT token with user details
        console.log("DEBUG::.User data before signing JWT:", user);
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
          "your_jwt_secret",
          { expiresIn: "1h" },
        );

        res.status(200).json({ message: "Login successful", token });
      },
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// login admin
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin by username
    userModel.findAdminByUsername(username, async (err, admin) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      if (!admin) {
        return res.status(401).json({ error: "Invalid username" });
      }

      // Compare the password with the stored hash
      const isMatch = await bcrypt.compare(password, admin.password_hash);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Generate JWT token with admin details
      // console.log("DEBUG::.Admin data before signing JWT:", admin);
      const token = jwt.sign(
        {
          adminId: admin.id,
          username: admin.username,
          firstName: admin.first_name,
          middleName: admin.middle_name,
          lastName: admin.last_name,
          contactNumberPrimary: admin.contact_number_primary,
          contactNumberSecondary: admin.contact_number_secondary,
          email: admin.email,
          joinDate: admin.created_at,
        },
        "your_jwt_secret",
        { expiresIn: "1h" },
      );

      res.status(200).json({ message: "Login successful", token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerUser,
  registerAdmin,
  loginUser,
  loginAdmin,
};
