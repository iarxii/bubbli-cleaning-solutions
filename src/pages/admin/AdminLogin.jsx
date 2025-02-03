import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint, faShield, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { AuthContext } from "../../context/AuthContext";

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // State to manage form inputs and error message
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/admin/login",
        formData,
      );
      // console.log(response.data); // DEBUG: log the response data
      login(response.data.token); // Use the login function from AuthContext
      navigate("/admin/home"); // Navigate to the home page on successful login
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <section className="glassmorphic h-full py-6">
      <div style={styles.container}>
        <div className="pt-4">
          <FontAwesomeIcon
            icon={faShieldAlt}
            className="size-20 text-[#FB6F92]"
          />
        </div>
        <h1 className="mt-4" style={styles.inputLabel}>
          Admin Portal
        </h1>
        <p style={styles.inputLabel} className="font-medium">
          Bubbli Administrator Login
        </p>
        {/* <hr className="mb-4 mt-6" /> */}
        <div className="mx-auto my-4 h-1 w-16 rounded-xl bg-[#FB6F92]"></div>
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
              placeholder="Enter your admin username"
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
    margin: "50px auto",
    padding: "20px",
    // border: "1px solid #ccc",
    borderRadius: "16px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    textAlign: "left",
  },
  inputLabel: {
    color: "#FB6F92",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f7f7f7",
    color: "#000",
  },
  button: {
    padding: "10px",
    backgroundColor: "#FB6F92",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  googleLoginButton: {
    backgroundColor: "#fff",
    color: "#777",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

export default AdminLogin;
