import React, { useState } from "react";

import meshBackgroundRed from "../../assets/brand/mesh-red-1.png";

function UserProfile() {
  // Mock user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated profile
  const saveProfile = () => {
    setUser(formData);
    setEditMode(false);
  };

  // Cancel edit
  const cancelEdit = () => {
    setFormData(user);
    setEditMode(false);
  };

  return (
    <div style={styles.container} className="glassmorphic">
      <div className="container mx-auto bg-white p-4">
        <h2 className="text-black">User Profile</h2>
        {editMode ? (
          <div style={styles.form}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label>
              Address:
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={styles.textarea}
              />
            </label>
            <div style={styles.buttonGroup}>
              <button onClick={saveProfile} style={styles.saveButton}>
                Save
              </button>
              <button onClick={cancelEdit} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <button onClick={() => setEditMode(true)} style={styles.editButton}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Styles
const styles = {
  // container: {
  //   maxWidth: "600px",
  //   margin: "0 auto",
  //   padding: "20px",
  //   backgroundColor: "#fff",
  //   borderRadius: "8px",
  //   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  // },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    // backgroundColor: "#fff",
    backgroundImage: `url(${meshBackgroundRed})`,
    backgroundClip: "padding-box",
    backgroundSize: "cover", // Ensures the background image covers the entire container
    backgroundPosition: "center", // Centers the background image
    // backgroundAttachment: "fixed", // Fixes the background image in place
    textAlign: "center",
    padding: "0px",
    color: "#000 !important",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
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
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UserProfile;
