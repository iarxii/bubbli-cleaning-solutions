import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faSave, faCancel, faUser } from "@fortawesome/free-solid-svg-icons";

// import media
import bubbliLogo from "../../assets/bubbli-icon_white.svg";
import agentProfileImage from "../../assets/profile_avatar.jpg";

// import authContext
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";

function AgentProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  // initialize agent state
  const [agentData, setAgentData] = useState({
    agentId: "",
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

  // Set agent data from context
  useEffect(() => {
    if (user) {
      console.log("User context:", user);
      setAgentData({
        agentId: user.agentId,
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
    setAgentData((prevAgentData) => ({
      ...prevAgentData,
      ...formData,
    }));
    setUser((prevUser) => ({
      ...prevUser,
      ...formData,
    }));
    setEditMode(false);
  };

  // Cancel edit
  const cancelEdit = () => {
    setFormData({
      firstName: agentData.firstName,
      middleName: agentData.middleName,
      lastName: agentData.lastName,
      contactNumberPrimary: agentData.contactNumberPrimary,
      contactNumberSecondary: agentData.contactNumberSecondary,
      email: agentData.email,
    });
    setEditMode(false);
  };

  return (
    <div className="glassmorphic">
      <div style={styles.container}>
        <div className="container mx-auto rounded-3xl bg-white p-4 mb-6 shadow-lg">
          <h1 className="my-4 text-center text-[#FB6F92]"><FontAwesomeIcon icon={faUser} /> Agent Profile</h1>
          {editMode ? (
            <div style={styles.form} className="rounded-3xl">
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
              <div style={styles.buttonGroup} className="mb-2 mt-4">
                <button onClick={cancelEdit} style={styles.cancelButton}>
                  <FontAwesomeIcon icon={faCancel} /> {" "}
                  Cancel
                </button>
                <button onClick={saveProfile} style={styles.saveButton}>
                  Save {" "}
                  <FontAwesomeIcon icon={faSave} />
                </button>
              </div>
            </div>
          ) : agentData.username ? (
            <div className="profile-card justify-center" style={styles.signupCard}>
              <h1 className="text-center font-boldz text-white truncate">Welcome back {agentData.firstName}.</h1>
              <div class="h-1 w-16 bg-[#fff] mx-auto rounded-xl"></div>
              <div className="flex items-start justify-between gap-2">
                {/* agent details */}
                <div style={{maxHeight:"200px", overflowY:"auto"}}>
                  <p>
                    <strong>First Name:</strong> {agentData.firstName}
                  </p>
                  <p>
                    <strong>Middle Name:</strong> {agentData.middleName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {agentData.lastName}
                  </p>
                  <p>
                    <strong>Primary Contact:</strong>{" "}
                    {agentData.contactNumberPrimary}
                  </p>
                  <p>
                    <strong>Secondary Contact:</strong>{" "}
                    {agentData.contactNumberSecondary}
                  </p>
                  <p>
                    <strong>Email:</strong> {agentData.email}
                  </p>
                </div>
                {/* profile image */}
                <div>
                  <img
                    src={agentProfileImage}
                    alt="profile image"
                    style={styles.signupCardProfileImage}
                  />
                </div>
              </div>

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
              <div className="my-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => navigate("/agents/signup")}
                  style={styles.signupButton}
                >
                  Sign Up
                </button>
                <span>Or</span>
                <button
                  onClick={() => navigate("/agents/login")}
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
  signupCardProfileImage: {
    backgroundColor: "#FB6F92",
    objectFit: "cover",
    borderRadius: "50%",
    height: "150px",
    width: "150px",
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
    backgroundColor: "#FB6F92",
    padding: "20px",
  },
  inputLabel: {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
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
    borderRadius: "8px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#fff",
    color: "#dc3545",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
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

export default AgentProfile;