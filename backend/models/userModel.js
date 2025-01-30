const db = require("../config/db");

const createUser = (user, callback) => {
  const query = `
    INSERT INTO users 
    (username, email, first_name, 
    middle_name, last_name, 
    contact_number_primary, contact_number_secondary, 
    gender, age, birth_year, password_hash)
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [
      user.username,
      user.email,
      user.firstName,
      null, // middle name
      user.lastName,
      user.contactNumber,
      null, // secondary contact number
      user.gender,
      user.age,
      user.birthYear,
      user.passwordHash,
    ],
    callback,
  );
};

const findUserByUsername = (username, callback) => {
  const query = "SELECT * FROM users WHERE username = ?";
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

const findUserByContactOrEmail = (contactNumberPrimary, email, callback) => {
  const query =
    "SELECT * FROM users WHERE contact_number_primary = ? OR email = ?";
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
  findUserByUsername,
  findUserByContactOrEmail,
};
