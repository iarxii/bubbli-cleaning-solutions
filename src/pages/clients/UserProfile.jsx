import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

// import media
import bubbliLogo from "../../assets/bubbli-icon_white.svg";

// import authContext
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";

function UserProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  // initialize user state
  const [userData, setUserData] = useState({
    userId: "",
    username: "",
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumberPrimary: "",
    contactNumberSecondary: "",
    email: "",
    joinDate: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumberPrimary: "",
    contactNumberSecondary: "",
    email: "",
  });

  // Set user data from context
  useEffect(() => {
    if (user) {
      console.log("User context:", user);
      setUserData({
        userId: user.userId,
        username: user.username,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        contactNumberPrimary: user.contactNumberPrimary,
        contactNumberSecondary: user.contactNumberSecondary,
        email: user.email,
        joinDate: user.joinDate,
      });
      setFormData({
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        contactNumberPrimary: user.contactNumberPrimary,
        contactNumberSecondary: user.contactNumberSecondary,
        email: user.email,
      });
    }
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Save updated profile
  const saveProfile = () => {
    // Save profile logic here
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...formData,
    }));
    setUser((prevUser) => ({
      ...prevUser,
      ...formData,
    }));
    // setUser(formData);
    setEditMode(false);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditMode({
      firstName: userData.firstName,
      middleName: userData.middleName,
      lastName: userData.lastName,
      contactNumberPrimary: userData.contactNumberPrimary,
      contactNumberSecondary: userData.contactNumberSecondary,
      email: userData.email,
    });
    setEditMode(false);
  };

  return (
    <div className="glassmorphic">
      <div style={styles.container}>
        <div className="container mx-auto rounded-3xl bg-white p-4 shadow-lg">
          <h1 className="my-4 text-center text-[#FB6F92]">User Profile</h1>
          {editMode ? (
            <div style={styles.form}>
              <label style={styles.inputLabel}>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  className="shadow-md"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <label style={styles.inputLabel}>
                Middle Name:
                <input
                  type="text"
                  name="middleName"
                  className="shadow-md"
                  value={formData.middleName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <label style={styles.inputLabel}>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  className="shadow-md"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <label style={styles.inputLabel}>
                Primary Contact:
                <input
                  type="text"
                  name="contactNumberPrimary"
                  className="shadow-md"
                  value={formData.contactNumberPrimary}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <label style={styles.inputLabel}>
                Secondary Contact:
                <input
                  type="text"
                  name="contactNumberSecondary"
                  className="shadow-md"
                  value={formData.contactNumberSecondary}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <label style={styles.inputLabel}>
                Email:
                <input
                  type="email"
                  name="email"
                  className="shadow-md"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              <div style={styles.buttonGroup} className="mt-4 mb-2">
                <button onClick={cancelEdit} style={styles.cancelButton}>
                  Cancel
                </button>
                <button onClick={saveProfile} style={styles.saveButton}>
                  Save
                </button>
              </div>
            </div>
          ) : userData.username ? (
            <div className="profile-card" style={styles.signupCard}>
              <p>
                <strong>First Name:</strong> {userData.firstName}
              </p>
              <p>
                <strong>Middle Name:</strong> {userData.middleName}
              </p>
              <p>
                <strong>Last Name:</strong> {userData.lastName}
              </p>
              <p>
                <strong>Primary Contact:</strong> {userData.contactNumberPrimary}
              </p>
              <p>
                <strong>Secondary Contact:</strong> {userData.contactNumberSecondary}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <button
                onClick={() => setEditMode(true)}
                style={styles.editButton}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div style={styles.signupCard}>
              <div className="flex justify-center">
                <img
                  src={bubbliLogo}
                  alt="bubbli logo"
                  style={styles.bubbliLogo}
                />
              </div>
              <h1 className="text-center text-[#fff]">
                Join today, it's <b>Free</b>!
              </h1>
              <p className="text-center text-[#fff]">
                Join us to enjoy exclusive benefits and features.
              </p>
              <div className="flex items-center justify-center gap-4 my-4">
                <button
                  onClick={() => navigate("/clients/signup")}
                  style={styles.signupButton}
                >
                  Sign Up
                </button>
                <span>Or</span>
                <button
                  onClick={() => navigate("/clients/login")}
                  style={styles.signupButton}
                >
                  Log in <FontAwesomeIcon icon={faRightToBracket} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
  },
  signupCard: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "16px",
    backgroundColor: "#FB6F92",
  },
  signupButton: {
    backgroundColor: "#fff",
    color: "#FB6F92",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  bubbliLogo: {
    backgroundColor: "#FB6F92",
    borderRadius: "16px",
    width: "200px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputLabel: {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#FB6F92",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    color: "#000",
    backgroundColor: "#f7f7f7",
    marginTop: "4px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#fff",
    color: "#FB6F92",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default UserProfile;
